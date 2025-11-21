import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import {
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Clock,
  Shield,
  Truck,
  FileBarChart,
  Eye,
  Download,
  Star,
  FileText,
  BarChart3,
  Users,
  Flag
} from 'lucide-react';

interface AnalysisResultsProps {
  onNavigate: (view: string) => void;
  analysisData?: any; // Data from the agent analysis
}

export default function AnalysisResults({ onNavigate, analysisData }: AnalysisResultsProps) {
  const [selectedAnalysis, setSelectedAnalysis] = useState('overview');

  // Use actual analysis data or fallback to mock data
  const actualData = analysisData || {
    offers_analyzed: 1,
    analysis_data: [
      {
        offer_name: "Offer 1",
        supplier_name: "OneSubsea",
        summary_metrics: {
          "Total Price": "N/A",
          "Lead Time": "N/A",
          "Payment Terms": "N/A"
        },
        risk: {
          total_risk_score: 4.2,
          risk_level: "High",
          dimension_scores: {
            "Delivery Risk": 4.5,
            "Financial Risk": 3.5,
            "Technical Risk": 4.5,
            "Quality Risk": 4.0,
            "HSE / Compliance Risk": 4.5,
            "Geopolitical / Supply Risk": 3.5,
            "ESG / Reputation Risk": 4.0
          }
        },
        recommendation: "Best Offer",
        total_weighted_score: 16
      }
    ],
    comparison_summary: {
      comparison_summary: {
        comparison_table: [],
        ai_insights: "No analysis data available.",
        action_list: []
      }
    }
  };

  const { analysis_data, comparison_summary, offers_analyzed } = actualData;
  const bestOffer = analysis_data.find((offer: any) => offer.recommendation === "Best Offer");
  const riskData = bestOffer?.risk;

  // Transform data for display
  const supplierComparison = analysis_data.map((offer: any) => ({
    name: offer.supplier_name,
    totalCost: offer.summary_metrics?.["Total Price"] || "N/A",
    landedCost: offer.summary_metrics?.["Total Price"] || "N/A",
    savings: "N/A",
    leadTime: offer.summary_metrics?.["Lead Time"] || "N/A",
    riskScore: Math.round((offer.risk?.total_risk_score || 0) * 20), // Convert 0-5 to 0-100
    compliance: offer.risk?.dimension_scores?.["HSE / Compliance Risk"] <= 2.5 ? "Full" :
                offer.risk?.dimension_scores?.["HSE / Compliance Risk"] <= 3.5 ? "Partial" : "Low",
    recommended: offer.recommendation === "Best Offer",
    rawData: offer
  }));

  const riskAnalysis = riskData ? Object.entries(riskData.dimension_scores || {}).map(([category, score]) => ({
    category,
    level: (score as number) <= 1.5 ? "Low" : (score as number) <= 3.5 ? "Medium" : "High",
    score: Math.round((score as number) * 20), // Convert to 0-100 scale
    description: getRiskDescription(category, score as number),
    color: (score as number) <= 1.5 ? "text-green-600" : (score as number) <= 3.5 ? "text-orange-600" : "text-red-600"
  })) : [];

  const redFlags = riskData?.detailed_risk_analysis?.rows?.map((row: any[]) => ({
    severity: (row[1] as number) <= 1.5 ? "Low" : (row[1] as number) <= 3.5 ? "Medium" : "High",
    issue: row[2] || "No data available",
    impact: row[0] || "Unknown risk factor",
    recommendation: row[3] || "No recommendation available"
  })) || [];

  const gapAnalysis = bestOffer?.detailed_gap_analysis?.rows?.map((row: any[]) => ({
    category: row[0] || "Unknown",
    details: row[1] || "N/A",
    gap: row[2] || "No gap analysis available"
  })) || [];

  const actionItems = comparison_summary?.comparison_summary?.action_list || [];

  function getRiskDescription(category: string, score: number): string {
    if (score <= 1.5) return `Low ${category.toLowerCase()} risk`;
    if (score <= 3.5) return `Moderate ${category.toLowerCase()} risk`;
    return `High ${category.toLowerCase()} risk requiring immediate attention`;
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Low': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-w-0 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Analysis Results</h1>
          <p className="text-muted-foreground">
            {offers_analyzed} offer{offers_analyzed !== 1 ? 's' : ''} analyzed with AI-powered risk assessment
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onNavigate('upload')}>
            Back to Upload
          </Button>
          <Button onClick={() => onNavigate('report')}>
            <FileBarChart className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Offers Analyzed</p>
                <p className="text-2xl font-semibold">{offers_analyzed}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Risk</p>
                <p className="text-2xl font-semibold">{riskData?.risk_level || "Unknown"}</p>
                <p className="text-xs text-muted-foreground">Score: {riskData?.total_risk_score || "N/A"}/5</p>
              </div>
              <Shield className={`w-8 h-8 ${
                riskData?.risk_level === "Low" ? "text-green-600" :
                riskData?.risk_level === "Medium" ? "text-orange-600" : "text-red-600"
              }`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Best Offer</p>
                <p className="text-2xl font-semibold">{bestOffer?.supplier_name || "N/A"}</p>
                <p className="text-xs text-muted-foreground">Weighted Score: {bestOffer?.total_weighted_score || "N/A"}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Data Quality</p>
                <p className="text-2xl font-semibold">
                  {gapAnalysis.filter(gap => gap.details !== "N/A").length > 0 ? "Partial" : "Limited"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {gapAnalysis.filter(gap => gap.details !== "N/A").length}/{gapAnalysis.length} metrics
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Tabs */}
      <Tabs value={selectedAnalysis} onValueChange={setSelectedAnalysis}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="actions">Action Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Supplier Ranking */}
          <Card>
            <CardHeader>
              <CardTitle>Supplier Ranking & Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplierComparison.map((supplier, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    supplier.recommended ? 'border-green-200 bg-green-50' : 'border-border'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                          {index + 1}
                        </div>
                        <h4 className="font-medium">{supplier.name}</h4>
                        {supplier.recommended && (
                          <Badge className="bg-green-100 text-green-800">
                            <Star className="w-3 h-3 mr-1" />
                            Recommended
                          </Badge>
                        )}
                        <Badge className={getRiskLevelColor(
                          supplier.rawData.risk?.risk_level || "Unknown"
                        )}>
                          {supplier.rawData.risk?.risk_level || "Unknown"} Risk
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">Score: {supplier.rawData.total_weighted_score}</p>
                        <p className="text-sm text-muted-foreground">Weighted Total</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total Price</p>
                        <p className="font-medium">{supplier.totalCost}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Lead Time</p>
                        <p className="font-medium">{supplier.leadTime}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Risk Score</p>
                        <p className="font-medium">{supplier.riskScore}/100</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Compliance</p>
                        <p className="font-medium">{supplier.compliance}</p>
                      </div>
                    </div>

                    {/* Risk Summary */}
                    {supplier.rawData.risk?.summary && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{supplier.rawData.risk.summary}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          {comparison_summary?.comparison_summary?.ai_insights && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>AI Insights & Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800">{comparison_summary.comparison_summary.ai_insights}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Red Flags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span>Risk Flags & Critical Issues</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {redFlags.map((flag, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getSeverityColor(flag.severity)}>
                        {flag.severity} Risk
                      </Badge>
                      <span className="text-sm text-muted-foreground">{flag.impact}</span>
                    </div>
                    <h4 className="font-medium mb-2">{flag.issue}</h4>
                    <p className="text-sm text-muted-foreground">{flag.recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Supplier Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium">Supplier</th>
                      <th className="text-right py-3 px-4 font-medium">Total Price</th>
                      <th className="text-right py-3 px-4 font-medium">Lead Time</th>
                      <th className="text-center py-3 px-4 font-medium">Risk Score</th>
                      <th className="text-center py-3 px-4 font-medium">Risk Level</th>
                      <th className="text-center py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplierComparison.map((supplier, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="py-3 px-4 font-medium">{supplier.name}</td>
                        <td className="py-3 px-4 text-right">{supplier.totalCost}</td>
                        <td className="py-3 px-4 text-right">{supplier.leadTime}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <span>{supplier.riskScore}</span>
                            <Progress value={supplier.riskScore} className="w-16 h-2" />
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge className={getRiskLevelColor(supplier.rawData.risk?.risk_level || "Unknown")}>
                            {supplier.rawData.risk?.risk_level || "Unknown"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {supplier.recommended ? (
                            <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                          ) : (
                            <Badge variant="secondary">Alternative</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gapAnalysis.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-medium">{item.category}</span>
                        {item.details === "N/A" && (
                          <Badge variant="outline" className="text-xs bg-red-50 text-red-700">Missing Data</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.gap}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className={`font-medium ${
                        item.details === "N/A" ? "text-red-600" : "text-green-600"
                      }`}>
                        {item.details}
                      </p>
                      <p className="text-xs text-muted-foreground">Current Value</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Flag className="w-4 h-4 text-orange-600" />
                  <span className="font-medium text-orange-800">Data Quality Alert</span>
                </div>
                <p className="text-sm text-orange-700">
                  Multiple data gaps detected. The analysis is limited by missing critical information from supplier documents.
                  Consider requesting complete documentation for more accurate assessment.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {riskAnalysis.map((risk, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{risk.category}</h4>
                      <Badge className={getRiskLevelColor(risk.level)}>
                        {risk.level} Risk
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mb-2">
                      <Progress value={risk.score} className="flex-1 h-3" />
                      <span className={`font-medium ${risk.color}`}>{risk.score}/100</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{risk.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Recommended Action Plan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Primary Risk Summary */}
                <div className="p-4 border-2 border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h4 className="font-semibold text-red-800">Critical Risk Alert</h4>
                  </div>
                  <p className="text-red-700 mb-3">
                    <strong>High overall risk score ({riskData?.total_risk_score}/5)</strong> due to significant data gaps
                    across multiple risk dimensions. Immediate action required to mitigate critical risks.
                  </p>
                </div>

                {/* Action Items */}
                <div className="space-y-4">
                  <h4 className="font-medium">Required Actions</h4>

                  {actionItems.length > 0 ? (
                    actionItems.map((action: any, index: number) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium flex-1">{action.action}</h5>
                          <Badge variant="outline" className="ml-2">
                            {action.responsible}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Due: {action.due_date}</span>
                          <Badge className={
                            action.status === "Open" ? "bg-orange-100 text-orange-800" :
                            action.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                            "bg-green-100 text-green-800"
                          }>
                            {action.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 border border-border rounded-lg">
                      <p className="text-muted-foreground">No specific action items generated. Address the identified data gaps first.</p>
                    </div>
                  )}
                </div>

                {/* Data Improvement Strategy */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Data Improvement Strategy</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Request complete and accessible documentation from all suppliers</li>
                    <li>• Prioritize collection of pricing, lead time, and payment terms data</li>
                    <li>• Verify supplier certifications and compliance documentation</li>
                    <li>• Establish data quality standards for future procurement processes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}