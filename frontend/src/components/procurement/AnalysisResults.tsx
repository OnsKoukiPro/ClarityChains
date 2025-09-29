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
  Star
} from 'lucide-react';

interface AnalysisResultsProps {
  onNavigate: (view: string) => void;
}

export default function AnalysisResults({ onNavigate }: AnalysisResultsProps) {
  const [selectedAnalysis, setSelectedAnalysis] = useState('overview');

  const analysisResults = {
    totalValue: '$4,970,000',
    potentialSavings: '$487,000',
    savingsPercentage: 9.8,
    recommendedSupplier: 'Global Supply Co',
    riskScore: 'Medium',
    averageLeadTime: '2.5 weeks'
  };

  const supplierComparison = [
    {
      name: 'Global Supply Co',
      totalCost: '$4,483,000',
      landedCost: '$4,625,000',
      savings: '$487,000',
      leadTime: '2.8 weeks',
      riskScore: 85,
      compliance: 'Full',
      recommended: true
    },
    {
      name: 'TechCorp Industries',
      totalCost: '$4,970,000',
      landedCost: '$5,112,000',
      savings: '$0',
      leadTime: '2.1 weeks',
      riskScore: 92,
      compliance: 'Full',
      recommended: false
    },
    {
      name: 'Premier Solutions',
      totalCost: '$5,240,000',
      landedCost: '$5,387,000',
      savings: '-$417,000',
      leadTime: '2.6 weeks',
      riskScore: 78,
      compliance: 'Partial',
      recommended: false
    }
  ];

  const riskAnalysis = [
    {
      category: 'Supplier Financial Risk',
      level: 'Low',
      score: 85,
      description: 'All suppliers show strong financial health',
      color: 'text-green-600'
    },
    {
      category: 'Delivery Risk',
      level: 'Medium',
      score: 72,
      description: 'Some suppliers have longer lead times',
      color: 'text-orange-600'
    },
    {
      category: 'Compliance Risk',
      level: 'Low',
      score: 88,
      description: 'Most suppliers meet compliance requirements',
      color: 'text-green-600'
    },
    {
      category: 'Price Volatility',
      level: 'High',
      score: 45,
      description: 'Significant price variations detected',
      color: 'text-red-600'
    }
  ];

  const tcoBreakdown = [
    { category: 'Base Price', amount: '$4,483,000', percentage: 89.2 },
    { category: 'Freight & Shipping', amount: '$89,600', percentage: 1.8, estimated: true },
    { category: 'Insurance', amount: '$44,800', percentage: 0.9, estimated: true },
    { category: 'Duties & Taxes', amount: '$22,400', percentage: 0.5, estimated: true },
    { category: 'Handling & Processing', amount: '$13,440', percentage: 0.3, estimated: true },
    { category: 'Currency Risk (3%)', amount: '$134,490', percentage: 2.7, estimated: true }
  ];

  const redFlags = [
    {
      severity: 'High',
      issue: 'Premier Solutions missing ISO certification for critical components',
      impact: 'Compliance risk',
      recommendation: 'Request certification or exclude from selection'
    },
    {
      severity: 'Medium',
      issue: 'Price outlier detected: Control Panel prices vary by 45%',
      impact: 'Potential pricing error',
      recommendation: 'Verify pricing with suppliers'
    },
    {
      severity: 'Low',
      issue: 'TechCorp payment terms require 50% upfront',
      impact: 'Cash flow impact',
      recommendation: 'Negotiate better payment terms'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Low': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-w-0 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Analysis Results</h1>
          <p className="text-muted-foreground">Comprehensive analysis of supplier offers and recommendations</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onNavigate('review')}>
            Back to Review
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
                <p className="text-sm text-muted-foreground">Total Project Value</p>
                <p className="text-2xl font-semibold">{analysisResults.totalValue}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Potential Savings</p>
                <p className="text-2xl font-semibold text-green-600">{analysisResults.potentialSavings}</p>
                <p className="text-xs text-green-600">↓ {analysisResults.savingsPercentage}%</p>
              </div>
              <TrendingDown className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Lead Time</p>
                <p className="text-2xl font-semibold">{analysisResults.averageLeadTime}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <p className="text-2xl font-semibold">{analysisResults.riskScore}</p>
              </div>
              <Shield className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Tabs */}
      <Tabs value={selectedAnalysis} onValueChange={setSelectedAnalysis}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="tco">TCO Analysis</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Supplier Ranking */}
          <Card>
            <CardHeader>
              <CardTitle>Supplier Ranking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplierComparison.map((supplier, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${supplier.recommended ? 'border-green-200 bg-green-50' : 'border-border'}`}>
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
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{supplier.landedCost}</p>
                        <p className="text-sm text-muted-foreground">Landed Cost</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Savings</p>
                        <p className={`font-medium ${supplier.savings.startsWith('-') ? 'text-red-600' : supplier.savings === '$0' ? 'text-gray-600' : 'text-green-600'}`}>
                          {supplier.savings}
                        </p>
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Red Flags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span>Red Flags & Issues</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {redFlags.map((flag, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getSeverityColor(flag.severity)}>
                        {flag.severity}
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
                      <th className="text-right py-3 px-4 font-medium">Base Cost</th>
                      <th className="text-right py-3 px-4 font-medium">Landed Cost</th>
                      <th className="text-center py-3 px-4 font-medium">Lead Time</th>
                      <th className="text-center py-3 px-4 font-medium">Risk Score</th>
                      <th className="text-center py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplierComparison.map((supplier, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="py-3 px-4 font-medium">{supplier.name}</td>
                        <td className="py-3 px-4 text-right">{supplier.totalCost}</td>
                        <td className="py-3 px-4 text-right font-medium">{supplier.landedCost}</td>
                        <td className="py-3 px-4 text-center">{supplier.leadTime}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <span>{supplier.riskScore}</span>
                            <Progress value={supplier.riskScore} className="w-16 h-2" />
                          </div>
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

        <TabsContent value="tco" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Cost of Ownership Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tcoBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{item.category}</span>
                      {item.estimated && (
                        <Badge variant="outline" className="text-xs">Estimated</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">{item.amount}</p>
                        <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                      </div>
                      <div className="w-24">
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Cost Estimation Note</span>
                </div>
                <p className="text-sm text-blue-700">
                  Freight, insurance, and handling costs are estimated based on location, weight, and industry standards.
                  Please verify these costs with suppliers for accurate TCO calculation.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {riskAnalysis.map((risk, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{risk.category}</h4>
                      <Badge className={
                        risk.level === 'Low' ? 'bg-green-100 text-green-800' :
                        risk.level === 'Medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }>
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

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Procurement Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <Star className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">Primary Recommendation</h4>
                  </div>
                  <p className="text-green-700 mb-3">
                    <strong>Global Supply Co</strong> offers the best overall value with $487,000 in savings (9.8%)
                    while maintaining acceptable risk levels and compliance standards.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-600 font-medium">Pros:</span>
                      <ul className="list-disc list-inside text-green-700 mt-1">
                        <li>Lowest total cost of ownership</li>
                        <li>Full compliance certification</li>
                        <li>Competitive lead times</li>
                      </ul>
                    </div>
                    <div>
                      <span className="text-orange-600 font-medium">Considerations:</span>
                      <ul className="list-disc list-inside text-orange-700 mt-1">
                        <li>Slightly longer lead time than TechCorp</li>
                        <li>Lower risk score than TechCorp</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Alternative Strategies</h4>

                  <div className="p-4 border border-border rounded-lg">
                    <h5 className="font-medium mb-2">Split Award Strategy</h5>
                    <p className="text-sm text-muted-foreground mb-2">
                      Consider awarding 70% to Global Supply Co and 30% to TechCorp Industries to balance cost savings with risk mitigation.
                    </p>
                    <Badge variant="outline">Savings: $341,000 | Risk: Lower</Badge>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <h5 className="font-medium mb-2">Premium Quality Option</h5>
                    <p className="text-sm text-muted-foreground mb-2">
                      TechCorp Industries offers the highest quality and fastest delivery, suitable for critical timeline requirements.
                    </p>
                    <Badge variant="outline">Premium: $142,000 | Risk: Lowest</Badge>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">Action Items</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Verify Premier Solutions ISO certification status</li>
                    <li>• Confirm freight estimates with Global Supply Co</li>
                    <li>• Negotiate payment terms with TechCorp if selected</li>
                    <li>• Request updated pricing for Control Panel items</li>
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