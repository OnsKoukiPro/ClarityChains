from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import json
from typing import List, Dict, Any
import datetime
import traceback

from offer_agent import create_analysis_agent, create_chat_agent

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://frontend:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# In-memory storage for staged offers and chains
staged_offers: List[List[str]] = []
chain_state: Dict[str, Any] = {}
current_run_dir: str = None

@app.get("/health")
async def health_check():
    """Health check endpoint for Docker"""
    return {"status": "healthy", "service": "agent-api"}

@app.post("/api/chat")
async def chat_api(request: Dict[str, Any]):
    """Chat endpoint that accepts JSON (matches frontend expectation)"""
    global chain_state

    try:
        user_text = request.get("message", "")
        if not user_text:
            return JSONResponse(
                content={"role": "assistant", "content": "Please enter a question."}
            )

        # If no analysis has been done yet, provide general assistance
        if not chain_state or "chat_agent" not in chain_state:
            return JSONResponse(
                content={
                    "role": "assistant",
                    "content": "I can help you with procurement tasks! You can:\n\n• Upload supplier offers for analysis\n• Create RFXs\n• Compare bids and generate insights\n• Create executive reports\n\nWhat would you like to work on today?",
                }
            )

        chat_agent = chain_state["chat_agent"]
        result = chat_agent.invoke({"question": user_text})
        answer = result.get("answer", "")

        return JSONResponse(content={"role": "assistant", "content": answer})

    except Exception as e:
        print(f"ERROR in chat_api: {str(e)}")
        print(traceback.format_exc())
        return JSONResponse(
            content={
                "role": "assistant",
                "content": f"Sorry, an error occurred: {str(e)}",
            }
        )

@app.post("/api/process-files")
async def process_files_api(files: List[UploadFile] = File(...)):
    """Process files directly for chat interface - UPDATED to trigger analysis"""
    global staged_offers, chain_state, current_run_dir

    try:
        print(f"DEBUG: Processing {len(files)} files in process-files endpoint")

        if not current_run_dir:
            now = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            current_run_dir = os.path.join("runs", now)
            os.makedirs(current_run_dir, exist_ok=True)
            staged_offers = []

        # Save files
        offer_files = []
        for file in files:
            file_path = os.path.join(current_run_dir, file.filename)
            with open(file_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)
                print(f"DEBUG: Saved {len(content)} bytes for {file.filename}")
            offer_files.append(file_path)

        staged_offers.append(offer_files)

        # Provide immediate feedback about the files
        file_names = [file.filename for file in files]
        file_types = {}
        for file in files:
            ext = os.path.splitext(file.filename)[1].lower()
            file_types[ext] = file_types.get(ext, 0) + 1

        type_summary = ", ".join([f"{count} {ext.upper()[1:] if ext else 'file'}"
                                for ext, count in file_types.items()])

        # AUTO-TRIGGER ANALYSIS AFTER FILE UPLOAD
        print("DEBUG: Auto-triggering analysis after file upload...")
        analysis_result = await trigger_analysis()

        if analysis_result.get("success"):
            analysis_data = analysis_result.get("analysis", [])
            comparison_data = analysis_result.get("comparison_summary", {})

            return JSONResponse(
                content={
                    "role": "assistant",
                    "content": f"I've received {len(files)} file(s) ({type_summary}) and completed the analysis! I found {len(analysis_data)} supplier offers. You can now ask me questions about these offers, compare suppliers, or request specific insights.",
                    "metadata": {
                        "files_received": len(files),
                        "file_types": file_types,
                        "analysis_completed": True,
                        "offers_analyzed": len(analysis_data),
                        "analysis_data": analysis_data,
                        "comparison_summary": comparison_data
                    }
                }
            )
        else:
            return JSONResponse(
                content={
                    "role": "assistant",
                    "content": f"I've received {len(files)} file(s) ({type_summary}) but encountered an issue during analysis: {analysis_result.get('error', 'Unknown error')}. The files are saved and you can try analyzing them again.",
                    "metadata": {
                        "files_received": len(files),
                        "file_types": file_types,
                        "analysis_completed": False,
                        "error": analysis_result.get('error')
                    }
                }
            )

    except Exception as e:
        print(f"ERROR in process_files_api: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Failed to process files: {str(e)}")

async def trigger_analysis():
    """Helper function to trigger analysis with default weights"""
    global staged_offers, chain_state, current_run_dir

    try:
        print(f"DEBUG: Starting auto-analysis with {len(staged_offers)} staged offers")

        if not staged_offers:
            return {"success": False, "error": "No offers to analyze"}

        # Verify files exist
        for offer_group in staged_offers:
            for file_path in offer_group:
                if not os.path.exists(file_path):
                    return {"success": False, "error": f"File not found: {file_path}"}

        # Use default weights for auto-analysis
        weights = {
            "Total Cost of Ownership (TCO)": 25,
            "Payment Terms": 10,
            "Price Stability": 5,
            "Lead Time": 20,
            "Technical Specifications": 25,
            "Certifications": 5,
            "Incoterms": 5,
            "Warranty": 5,
        }

        risk_weights = {
            "Delivery Risk": 15,
            "Financial Risk": 15,
            "Technical Risk": 15,
            "Quality Risk": 15,
            "HSE / Compliance Risk": 15,
            "Geopolitical / Supply Risk": 10,
            "ESG / Reputation Risk": 15,
        }

        print("DEBUG: Creating multi-agent analysis system...")
        result = create_analysis_agent(
            weights=weights,
            risk_weights=risk_weights,
            num_offers=len(staged_offers),
            offer_files=staged_offers
        )

        print("DEBUG: Parsing analysis results...")
        answer = result.get("output", "[]").strip()
        comparison_summary_str = result.get("comparison_summary", "{}").strip()
        retriever = result.get("retriever")

        try:
            analysis_json = json.loads(answer)
            print(f"DEBUG: Successfully parsed analysis JSON with {len(analysis_json)} offers")
        except json.JSONDecodeError as e:
            print(f"DEBUG: JSON Parse Error: {e}")
            return {"success": False, "error": f"Could not parse analysis results: {str(e)}"}

        try:
            comparison_json = json.loads(comparison_summary_str)
            print("DEBUG: Successfully parsed comparison summary")
        except json.JSONDecodeError as e:
            print(f"DEBUG: Comparison JSON Parse Error: {e}")
            comparison_json = {}

        # Post-process to set the best offer
        if analysis_json and isinstance(analysis_json, list) and len(analysis_json) > 0:
            try:
                best_offer = max(
                    analysis_json,
                    key=lambda x: float(x.get("total_weighted_score", "0") or "0"),
                )
                for offer in analysis_json:
                    if offer is best_offer:
                        offer["recommendation"] = "Best Offer"
                    elif offer.get("recommendation") == "Best Offer":
                        offer["recommendation"] = "Good Alternative"
                print(f"DEBUG: Best offer determined: {best_offer.get('supplier_name', 'Unknown')}")
            except (ValueError, TypeError) as e:
                print(f"DEBUG: Could not determine best offer: {e}")

        print("DEBUG: Creating chat agent...")
        chat_agent = create_chat_agent(analysis_json, retriever)

        chain_state = {
            "chat_agent": chat_agent,
            "analysis": analysis_json,
            "retriever": retriever,
            "comparison_summary": comparison_json
        }

        number_of_offers = len(staged_offers)
        staged_offers = []  # Clear staged offers after analysis

        print(f"DEBUG: ✓ Auto-analysis complete! Processed {number_of_offers} offers successfully")

        return {
            "success": True,
            "analysis": analysis_json,
            "comparison_summary": comparison_json
        }

    except Exception as e:
        print(f"ERROR in trigger_analysis: {str(e)}")
        print(traceback.format_exc())
        return {"success": False, "error": str(e)}

@app.post("/api/add-offer")
async def add_offer_api(files: List[UploadFile] = File(...)):
    global staged_offers, chain_state, current_run_dir

    try:
        if not current_run_dir:
            now = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            current_run_dir = os.path.join("runs", now)
            os.makedirs(current_run_dir, exist_ok=True)
            staged_offers = []
            chain_state = {}

        offer_files = []
        for file in files:
            file_path = os.path.join(current_run_dir, file.filename)
            with open(file_path, "wb") as buffer:
                buffer.write(await file.read())
            offer_files.append(file_path)

        staged_offers.append(offer_files)

        return JSONResponse(
            content={
                "message": f"Offer with {len(offer_files)} file(s) added.",
                "staged_offers": staged_offers,
            }
        )
    except Exception as e:
        print(f"ERROR in add_offer_api: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Failed to add offer: {str(e)}")

@app.post("/api/analyze")
async def analyze_offers_api(
    eval_criteria: str = Form(""),
    tco_weight: float = Form(25),
    payment_terms_weight: float = Form(10),
    price_stability_weight: float = Form(5),
    lead_time_weight: float = Form(20),
    tech_spec_weight: float = Form(25),
    certifications_weight: float = Form(5),
    incoterms_weight: float = Form(5),
    warranty_weight: float = Form(5),
    # Risk weights
    delivery_risk_weight: float = Form(15),
    financial_risk_weight: float = Form(15),
    technical_risk_weight: float = Form(15),
    quality_risk_weight: float = Form(15),
    hse_compliance_risk_weight: float = Form(15),
    geopolitical_supply_risk_weight: float = Form(10),
    esg_reputation_risk_weight: float = Form(15),
):
    global staged_offers, chain_state, current_run_dir

    try:
        print(f"DEBUG: Starting analysis with {len(staged_offers)} staged offers")

        if not staged_offers:
            raise HTTPException(
                status_code=400, detail="Please add at least one offer for analysis."
            )

        # Verify files exist
        for offer_group in staged_offers:
            for file_path in offer_group:
                if not os.path.exists(file_path):
                    raise HTTPException(
                        status_code=400,
                        detail=f"File not found: {file_path}. Please re-upload offers."
                    )

        # Prepare weights
        weights = {
            "Total Cost of Ownership (TCO)": tco_weight,
            "Payment Terms": payment_terms_weight,
            "Price Stability": price_stability_weight,
            "Lead Time": lead_time_weight,
            "Technical Specifications": tech_spec_weight,
            "Certifications": certifications_weight,
            "Incoterms": incoterms_weight,
            "Warranty": warranty_weight,
        }

        risk_weights = {
            "Delivery Risk": delivery_risk_weight,
            "Financial Risk": financial_risk_weight,
            "Technical Risk": technical_risk_weight,
            "Quality Risk": quality_risk_weight,
            "HSE / Compliance Risk": hse_compliance_risk_weight,
            "Geopolitical / Supply Risk": geopolitical_supply_risk_weight,
            "ESG / Reputation Risk": esg_reputation_risk_weight,
        }

        print("Creating multi-agent analysis system...")

        # The new multi-agent system returns a dictionary with output, comparison_summary, and retriever
        result = create_analysis_agent(
            weights=weights,
            risk_weights=risk_weights,
            num_offers=len(staged_offers),
            offer_files=staged_offers
        )

        print("Parsing analysis results...")

        # Parse the outputs
        answer = result.get("output", "[]").strip()
        comparison_summary_str = result.get("comparison_summary", "{}").strip()
        retriever = result.get("retriever")

        try:
            analysis_json = json.loads(answer)
            print(f"Successfully parsed analysis JSON with {len(analysis_json)} offers")
        except json.JSONDecodeError as e:
            print(f"JSON Parse Error: {e}")
            print(f"Raw output: {answer}")
            raise HTTPException(
                status_code=500,
                detail=f"Could not parse analysis JSON: {str(e)}"
            )

        try:
            comparison_json = json.loads(comparison_summary_str)
            print("Successfully parsed comparison summary")
        except json.JSONDecodeError as e:
            print(f"Comparison JSON Parse Error: {e}")
            comparison_json = {}

        # Post-process to set the best offer
        if analysis_json and isinstance(analysis_json, list) and len(analysis_json) > 0:
            try:
                best_offer = max(
                    analysis_json,
                    key=lambda x: float(x.get("total_weighted_score", "0") or "0"),
                )

                for offer in analysis_json:
                    if offer is best_offer:
                        offer["recommendation"] = "Best Offer"
                    elif offer.get("recommendation") == "Best Offer":
                        offer["recommendation"] = "Good Alternative"

                print(f"Best offer determined: {best_offer.get('supplier_name', 'Unknown')}")
            except (ValueError, TypeError) as e:
                print(f"Could not determine best offer: {e}")

        if isinstance(analysis_json, dict) and "error" in analysis_json:
            raise HTTPException(status_code=500, detail=analysis_json["error"])

        print("Creating chat agent...")
        chat_agent = create_chat_agent(analysis_json, retriever)

        chain_state = {
            "chat_agent": chat_agent,
            "analysis": analysis_json,
            "retriever": retriever,
            "comparison_summary": comparison_json
        }

        number_of_offers = len(staged_offers)
        staged_offers = []

        print(f"✓ Analysis complete! Processed {number_of_offers} offers successfully")

        return JSONResponse(
            content={
                "message": f"Successfully analyzed {number_of_offers} offers.",
                "analysis": analysis_json,
                "comparison_summary": comparison_json,
            }
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"ERROR in analyze_offers_api: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}\n\nCheck server logs for details."
        )

@app.get("/api/comparison-summary")
async def get_comparison_summary():
    """Get the comparison summary from the last analysis"""
    global chain_state

    if not chain_state or "comparison_summary" not in chain_state:
        return JSONResponse(
            content={"error": "No comparison summary available. Please run analysis first."},
            status_code=404
        )

    return JSONResponse(content=chain_state["comparison_summary"])

# Serve frontend
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("static/index.html") as f:
        return HTMLResponse(content=f.read(), status_code=200)

if __name__ == "__main__":
    import uvicorn

    if not os.path.exists("runs"):
        os.makedirs("runs")

    uvicorn.run(app, host="0.0.0.0", port=8001)