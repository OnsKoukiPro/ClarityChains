# -------------------
# backend/apps/procurement/views.py
# -------------------
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from django.conf import settings
import requests
import logging

from .models import Offer, OfferDocument, Analysis, ChatMessage
from .serializers import (
    OfferSerializer, AnalysisSerializer, ChatMessageSerializer
)

logger = logging.getLogger(__name__)

class ProcurementViewSet(viewsets.ViewSet):
    """Procurement operations viewset"""
    permission_classes = [IsAuthenticated]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.agent_url = settings.AGENT_API_URL

    @action(detail=False, methods=['post'])
    def add_offer(self, request):
        """Add an offer with files"""
        try:
            files = request.FILES.getlist('files')

            if not files:
                return Response(
                    {'error': 'No files provided'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Create offer
            offer = Offer.objects.create(user=request.user)

            # Save documents
            for file in files:
                OfferDocument.objects.create(
                    offer=offer,
                    file=file,
                    original_filename=file.name,
                    file_size=file.size
                )

            # Forward to agent API for staging
            agent_files = []
            for doc in offer.documents.all():
                agent_files.append(('files', (doc.original_filename, doc.file.open('rb'))))

            try:
                agent_response = requests.post(
                    f"{self.agent_url}/api/add-offer",
                    files=agent_files,
                    timeout=60
                )
                agent_response.raise_for_status()
            except Exception as e:
                logger.error(f"Agent API error: {str(e)}")
                # Continue even if agent staging fails
            finally:
                # Close file handles
                for _, (_, file_handle) in agent_files:
                    file_handle.close()

            serializer = OfferSerializer(offer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f"Error adding offer: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def analyze(self, request):
        """Analyze staged offers"""
        try:
            eval_criteria = request.data.get('eval_criteria', '')
            weights = {
                'tco_weight': request.data.get('tco_weight', 25),
                'payment_terms_weight': request.data.get('payment_terms_weight', 10),
                'price_stability_weight': request.data.get('price_stability_weight', 5),
                'lead_time_weight': request.data.get('lead_time_weight', 20),
                'tech_spec_weight': request.data.get('tech_spec_weight', 25),
                'certifications_weight': request.data.get('certifications_weight', 5),
                'incoterms_weight': request.data.get('incoterms_weight', 5),
                'warranty_weight': request.data.get('warranty_weight', 5),
                'delivery_risk_weight': request.data.get('delivery_risk_weight', 10),
                'financial_risk_weight': request.data.get('financial_risk_weight', 10),
                'technical_risk_weight': request.data.get('technical_risk_weight', 10),
                'quality_risk_weight': request.data.get('quality_risk_weight', 10),
                'hse_compliance_risk_weight': request.data.get('hse_compliance_risk_weight', 10),
                'geopolitical_supply_risk_weight': request.data.get('geopolitical_supply_risk_weight', 10),
                'esg_reputation_risk_weight': request.data.get('esg_reputation_risk_weight', 10),
            }

            # Create analysis record
            analysis = Analysis.objects.create(
                user=request.user,
                eval_criteria=eval_criteria,
                weights=weights,
                status='processing'
            )

            # Call agent API
            agent_data = {
                'eval_criteria': eval_criteria,
                **weights
            }

            try:
                agent_response = requests.post(
                    f"{self.agent_url}/api/analyze",
                    data=agent_data,
                    timeout=300  # 5 minutes for analysis
                )
                agent_response.raise_for_status()
                result = agent_response.json()

                # Update analysis with results
                analysis.analysis_data = result.get('analysis', [])
                analysis.comparison_summary = result.get('comparison_summary', {})
                analysis.status = 'completed'
                analysis.completed_at = timezone.now()
                analysis.save()

                serializer = AnalysisSerializer(analysis)
                return Response(serializer.data, status=status.HTTP_200_OK)

            except requests.exceptions.RequestException as e:
                analysis.status = 'failed'
                analysis.error_message = str(e)
                analysis.save()

                return Response(
                    {'error': f'Agent API error: {str(e)}'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        except Exception as e:
            logger.error(f"Error during analysis: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['get'])
    def analysis_results(self, request):
        """Get user's analysis results"""
        analyses = Analysis.objects.filter(user=request.user)
        serializer = AnalysisSerializer(analyses, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def chat(self, request):
        """Chat with AI about analysis"""
        try:
            message = request.data.get('message', '')
            analysis_id = request.data.get('analysis_id')

            if not message:
                return Response(
                    {'error': 'Message is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Call agent API
            agent_response = requests.post(
                f"{self.agent_url}/api/chat",
                json={'message': message},
                timeout=60
            )
            agent_response.raise_for_status()
            result = agent_response.json()

            # Save chat messages if analysis_id provided
            if analysis_id:
                try:
                    analysis = Analysis.objects.get(id=analysis_id, user=request.user)
                    ChatMessage.objects.create(
                        analysis=analysis,
                        role='user',
                        content=message
                    )
                    ChatMessage.objects.create(
                        analysis=analysis,
                        role='assistant',
                        content=result.get('content', '')
                    )
                except Analysis.DoesNotExist:
                    pass

            return Response(result, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Chat error: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['delete'])
    def clear_offers(self, request):
        """Clear agent's staged offers"""
        try:
            requests.delete(f"{self.agent_url}/api/clear-offers", timeout=30)
            return Response({'message': 'Offers cleared'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'])
    def staged_offers(self, request):
        """Get agent's staged offers"""
        try:
            response = requests.get(f"{self.agent_url}/api/staged-offers", timeout=30)
            response.raise_for_status()
            return Response(response.json(), status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)