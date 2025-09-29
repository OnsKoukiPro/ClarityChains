import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { 
  FileText, 
  Download, 
  Edit2, 
  Save, 
  Eye, 
  Mail,
  Printer,
  Share,
  Star,
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface ExecutiveReportProps {
  onNavigate: (view: string) => void;
}

export default function ExecutiveReport({ onNavigate }: ExecutiveReportProps) {
  const [customNotes, setCustomNotes] = useState('');
  const [reportTitle, setReportTitle] = useState('Industrial Equipment Procurement Analysis - RFX-2024-001');

  const reportData = {
    projectId: 'RFX-2024-001',
    projectTitle: 'Industrial Equipment Procurement',
    totalValue: '$4,970,000',
    recommendedSaving: '$487,000',
    savingsPercentage: '9.8%',
    recommendedSupplier: 'Global Supply Co',
    alternativeSupplier: 'TechCorp Industries',
    analysisDate: new Date().toLocaleDateString(),
    buyerName: 'Sarah Chen',
    buyerTitle: 'Procurement Manager'
  };

  const executiveSummary = `This procurement analysis evaluated three supplier proposals for industrial equipment totaling $4.97M. Through comprehensive TCO analysis, risk assessment, and commercial term evaluation, we recommend Global Supply Co as the primary supplier, delivering $487,000 in savings (9.8%) while maintaining acceptable risk levels and full compliance standards.

Key findings include significant price variations across suppliers (up to 45% for control panels), freight cost estimates requiring verification, and one supplier missing critical ISO certifications. The recommended split-award strategy balances cost optimization with supply chain risk mitigation.`;

  const keyFindings = [
    {
      type: 'savings',
      title: 'Cost Optimization Opportunity',
      description: '$487,000 potential savings through strategic supplier selection',
      impact: 'High',
      icon: TrendingDown,
      color: 'text-green-600'
    },
    {
      type: 'risk',
      title: 'Compliance Gap Identified',
      description: 'Premier Solutions missing ISO certification for critical components',
      impact: 'High',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      type: 'opportunity',
      title: 'Price Outlier Detection',
      description: '45% price variation on control panels requires verification',
      impact: 'Medium',
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      type: 'positive',
      title: 'Strong Supplier Pool',
      description: 'All suppliers demonstrate financial stability and delivery capability',
      impact: 'Positive',
      icon: CheckCircle,
      color: 'text-green-600'
    }
  ];

  const supplierSummary = [
    {
      name: 'Global Supply Co',
      recommendation: 'Primary',
      totalCost: '$4,625,000',
      savings: '$487,000',
      leadTime: '2.8 weeks',
      riskScore: 85,
      strengths: ['Lowest TCO', 'Full compliance', 'Competitive terms'],
      concerns: ['Longer lead time', 'Lower risk score than TechCorp']
    },
    {
      name: 'TechCorp Industries',
      recommendation: 'Alternative',
      totalCost: '$5,112,000',
      savings: '$0',
      leadTime: '2.1 weeks',
      riskScore: 92,
      strengths: ['Fastest delivery', 'Highest quality', 'Best risk profile'],
      concerns: ['Higher cost', 'Premium pricing']
    },
    {
      name: 'Premier Solutions',
      recommendation: 'Not Recommended',
      totalCost: '$5,387,000',
      savings: '-$417,000',
      leadTime: '2.6 weeks',
      riskScore: 78,
      strengths: ['Competitive on some items'],
      concerns: ['Missing certifications', 'Highest cost', 'Compliance gaps']
    }
  ];

  const actionItems = [
    { priority: 'High', task: 'Verify Premier Solutions ISO certification status', owner: 'Procurement Team', due: '2024-12-05' },
    { priority: 'High', task: 'Confirm freight estimates with Global Supply Co', owner: 'Sarah Chen', due: '2024-12-06' },
    { priority: 'Medium', task: 'Negotiate payment terms with recommended supplier', owner: 'Finance Team', due: '2024-12-10' },
    { priority: 'Medium', task: 'Request updated Control Panel pricing verification', owner: 'Technical Team', due: '2024-12-08' }
  ];

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case 'Primary':
        return <Badge className="bg-green-100 text-green-800"><Star className="w-3 h-3 mr-1" />Primary</Badge>;
      case 'Alternative':
        return <Badge className="bg-blue-100 text-blue-800">Alternative</Badge>;
      case 'Not Recommended':
        return <Badge className="bg-red-100 text-red-800">Not Recommended</Badge>;
      default:
        return <Badge variant="secondary">{recommendation}</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-w-0 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Executive Report</h1>
          <p className="text-muted-foreground">Comprehensive procurement analysis and recommendations</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onNavigate('analysis')}>
            Back to Analysis
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Word Report
          </Button>
        </div>
      </div>

      {/* Report Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <Input 
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                className="text-xl font-semibold border-none p-0 bg-transparent"
              />
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <span>Project ID: {reportData.projectId}</span>
                <span>•</span>
                <span>Analysis Date: {reportData.analysisDate}</span>
                <span>•</span>
                <span>Prepared by: {reportData.buyerName}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-accent/50 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{reportData.totalValue}</p>
              <p className="text-sm text-muted-foreground">Total Project Value</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{reportData.recommendedSaving}</p>
              <p className="text-sm text-muted-foreground">Potential Savings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{reportData.savingsPercentage}</p>
              <p className="text-sm text-muted-foreground">Savings Percentage</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-blue-600">{reportData.recommendedSupplier}</p>
              <p className="text-sm text-muted-foreground">Recommended Supplier</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">{executiveSummary}</p>
            
            <div className="border-l-4 border-primary pl-4">
              <p className="font-medium text-primary">Recommendation Summary:</p>
              <p className="text-sm text-muted-foreground mt-1">
                Award primary contract to <strong>{reportData.recommendedSupplier}</strong> for ${reportData.totalValue} 
                with potential for {reportData.savingsPercentage} cost reduction. Consider {reportData.alternativeSupplier} 
                as backup supplier for risk mitigation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Findings */}
      <Card>
        <CardHeader>
          <CardTitle>Key Findings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keyFindings.map((finding, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <finding.icon className={`w-5 h-5 mt-0.5 ${finding.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{finding.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {finding.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{finding.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Supplier Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Supplier Comparison Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {supplierSummary.map((supplier, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-lg">{supplier.name}</h4>
                    {getRecommendationBadge(supplier.recommendation)}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{supplier.totalCost}</p>
                    <p className="text-sm text-muted-foreground">Total Landed Cost</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-green-600 mb-1">Strengths:</p>
                    <ul className="space-y-1">
                      {supplier.strengths.map((strength, i) => (
                        <li key={i} className="flex items-center text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-orange-600 mb-1">Concerns:</p>
                    <ul className="space-y-1">
                      {supplier.concerns.map((concern, i) => (
                        <li key={i} className="flex items-center text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                          {concern}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle>Action Items & Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {actionItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                  <div>
                    <p className="font-medium">{item.task}</p>
                    <p className="text-sm text-muted-foreground">Assigned to: {item.owner}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Due: {item.due}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Notes & Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add any additional insights, context, or special considerations for this procurement decision..."
            value={customNotes}
            onChange={(e) => setCustomNotes(e.target.value)}
            className="min-h-32"
          />
          <div className="flex justify-end mt-3">
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Notes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export & Share Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center">
              <FileText className="w-6 h-6 mb-2" />
              <span>Word Document</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Printer className="w-6 h-6 mb-2" />
              <span>PDF Report</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Mail className="w-6 h-6 mb-2" />
              <span>Email Report</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Share className="w-6 h-6 mb-2" />
              <span>Share Link</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Final Actions */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-green-800">Report Complete</h3>
              <p className="text-sm text-green-700 mt-1">
                Executive report is ready for export and distribution to stakeholders.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => onNavigate('recommendation')}>
                View Final Recommendations
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Final Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}