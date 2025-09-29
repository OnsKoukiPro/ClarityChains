import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Star, 
  CheckCircle, 
  AlertTriangle, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Shield,
  Award,
  FileCheck,
  Send,
  Download,
  Users
} from 'lucide-react';

interface SupplierRecommendationProps {
  onNavigate: (view: string) => void;
}

export default function SupplierRecommendation({ onNavigate }: SupplierRecommendationProps) {
  const [selectedStrategy, setSelectedStrategy] = useState('primary');

  const recommendationStrategies = {
    primary: {
      title: 'Single Source Award',
      subtitle: 'Global Supply Co - Primary Supplier',
      description: 'Award entire contract to Global Supply Co for maximum cost savings',
      totalSavings: '$487,000',
      savingsPercentage: '9.8%',
      riskLevel: 'Medium',
      confidence: 85,
      supplier: 'Global Supply Co',
      allocation: '100%',
      benefits: [
        'Maximum cost savings opportunity',
        'Simplified contract management',
        'Volume pricing advantages',
        'Single point of accountability'
      ],
      risks: [
        'Single source dependency',
        'Limited supply chain flexibility',
        'Higher risk if supplier issues arise'
      ]
    },
    split: {
      title: 'Split Award Strategy',
      subtitle: '70% Global Supply + 30% TechCorp',
      description: 'Balance cost savings with risk mitigation through dual sourcing',
      totalSavings: '$341,000',
      savingsPercentage: '6.9%',
      riskLevel: 'Low',
      confidence: 92,
      supplier: 'Global Supply Co + TechCorp',
      allocation: '70% / 30%',
      benefits: [
        'Risk mitigation through diversification',
        'Competitive pricing pressure',
        'Supply chain resilience',
        'Quality benchmark comparison'
      ],
      risks: [
        'Reduced volume discounts',
        'More complex contract management',
        'Coordination overhead'
      ]
    },
    premium: {
      title: 'Premium Quality Focus',
      subtitle: 'TechCorp Industries - Quality Leader',
      description: 'Prioritize quality and delivery speed over cost optimization',
      totalSavings: '$0',
      savingsPercentage: '0%',
      riskLevel: 'Very Low',
      confidence: 96,
      supplier: 'TechCorp Industries',
      allocation: '100%',
      benefits: [
        'Highest quality standards',
        'Fastest delivery times',
        'Lowest operational risk',
        'Proven track record'
      ],
      risks: [
        'No cost savings opportunity',
        'Premium pricing structure',
        'Potential over-specification'
      ]
    }
  };

  const currentStrategy = recommendationStrategies[selectedStrategy];

  const implementationPlan = [
    {
      phase: 'Contract Negotiation',
      duration: '2 weeks',
      tasks: [
        'Finalize pricing and terms with selected supplier(s)',
        'Negotiate payment terms and delivery schedules',
        'Establish service level agreements',
        'Define quality standards and acceptance criteria'
      ],
      owner: 'Procurement Team',
      status: 'pending'
    },
    {
      phase: 'Legal Review & Approval',
      duration: '1 week',
      tasks: [
        'Legal review of contract terms',
        'Risk assessment validation',
        'Compliance verification',
        'Executive approval process'
      ],
      owner: 'Legal & Finance',
      status: 'pending'
    },
    {
      phase: 'Supplier Onboarding',
      duration: '2 weeks',
      tasks: [
        'Supplier registration and setup',
        'Quality certification verification',
        'Delivery logistics coordination',
        'Communication protocols establishment'
      ],
      owner: 'Operations Team',
      status: 'pending'
    },
    {
      phase: 'Order Placement',
      duration: '1 week',
      tasks: [
        'Purchase order generation',
        'Delivery schedule confirmation',
        'Payment terms activation',
        'Project kickoff meeting'
      ],
      owner: 'Procurement Team',
      status: 'pending'
    }
  ];

  const keyDecisionFactors = [
    {
      factor: 'Cost Optimization',
      weight: 40,
      primaryScore: 95,
      splitScore: 75,
      premiumScore: 20,
      description: 'Total cost of ownership and savings potential'
    },
    {
      factor: 'Risk Management',
      weight: 25,
      primaryScore: 65,
      splitScore: 90,
      premiumScore: 95,
      description: 'Supply chain risk and business continuity'
    },
    {
      factor: 'Quality Standards',
      weight: 20,
      primaryScore: 75,
      splitScore: 85,
      premiumScore: 95,
      description: 'Product quality and compliance requirements'
    },
    {
      factor: 'Delivery Performance',
      weight: 15,
      primaryScore: 70,
      splitScore: 80,
      premiumScore: 90,
      description: 'Lead times and delivery reliability'
    }
  ];

  const stakeholderApprovals = [
    { role: 'Procurement Manager', name: 'Sarah Chen', status: 'approved', date: '2024-12-01' },
    { role: 'Finance Director', name: 'Michael Torres', status: 'pending', date: null },
    { role: 'Operations Manager', name: 'Lisa Zhang', status: 'pending', date: null },
    { role: 'CEO', name: 'David Kim', status: 'pending', date: null }
  ];

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Very Low': return 'text-green-600 bg-green-100';
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getApprovalStatus = (status: string) => {
    switch (status) {
      case 'approved': return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'pending': return <Badge className="bg-orange-100 text-orange-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'rejected': return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-w-0 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Supplier Recommendations</h1>
          <p className="text-muted-foreground">Strategic procurement recommendations and implementation plan</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onNavigate('report')}>
            Back to Report
          </Button>
          <Button onClick={() => onNavigate('dashboard')}>
            Submit for Approval
          </Button>
        </div>
      </div>

      {/* Strategy Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-primary" />
            <span>Recommended Strategies</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(recommendationStrategies).map(([key, strategy]) => (
              <Card 
                key={key} 
                className={`cursor-pointer transition-all ${
                  selectedStrategy === key 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'hover:shadow-sm'
                }`}
                onClick={() => setSelectedStrategy(key)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{strategy.title}</h4>
                    {key === 'primary' && (
                      <Badge className="bg-blue-100 text-blue-800">
                        <Star className="w-3 h-3 mr-1" />
                        Recommended
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{strategy.subtitle}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Savings:</span>
                      <span className={`font-medium ${strategy.totalSavings === '$0' ? 'text-gray-600' : 'text-green-600'}`}>
                        {strategy.totalSavings}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level:</span>
                      <Badge className={getRiskLevelColor(strategy.riskLevel)} variant="outline">
                        {strategy.riskLevel}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Confidence:</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={strategy.confidence} className="w-16 h-2" />
                        <span className="font-medium">{strategy.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Strategy Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Strategy Details: {currentStrategy.title}</span>
            <Badge className="bg-primary/10 text-primary">Selected</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{currentStrategy.totalSavings}</p>
                <p className="text-sm text-muted-foreground">Total Savings ({currentStrategy.savingsPercentage})</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{currentStrategy.riskLevel}</p>
                <p className="text-sm text-muted-foreground">Risk Level</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{currentStrategy.allocation}</p>
                <p className="text-sm text-muted-foreground">Allocation</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground mb-6">{currentStrategy.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-green-600 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Benefits
              </h4>
              <ul className="space-y-2">
                {currentStrategy.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-orange-600 mb-3 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Considerations
              </h4>
              <ul className="space-y-2">
                {currentStrategy.risks.map((risk, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Decision Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Decision Factor Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {keyDecisionFactors.map((factor, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{factor.factor}</h4>
                  <Badge variant="outline">Weight: {factor.weight}%</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{factor.description}</p>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Single Source</p>
                    <Progress value={factor.primaryScore} className="h-2 mb-1" />
                    <p className="text-xs font-medium">{factor.primaryScore}/100</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Split Award</p>
                    <Progress value={factor.splitScore} className="h-2 mb-1" />
                    <p className="text-xs font-medium">{factor.splitScore}/100</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Premium</p>
                    <Progress value={factor.premiumScore} className="h-2 mb-1" />
                    <p className="text-xs font-medium">{factor.premiumScore}/100</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {implementationPlan.map((phase, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{phase.phase}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{phase.duration}</Badge>
                      <Badge variant="outline">{phase.owner}</Badge>
                    </div>
                  </div>
                  
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Approval Workflow */}
      <Card>
        <CardHeader>
          <CardTitle>Stakeholder Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stakeholderApprovals.map((approval, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <span className="font-medium text-sm">{approval.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="font-medium">{approval.name}</p>
                    <p className="text-sm text-muted-foreground">{approval.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {approval.date && (
                    <span className="text-sm text-muted-foreground">{approval.date}</span>
                  )}
                  {getApprovalStatus(approval.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Final Actions */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-800">Ready for Final Decision</h3>
              <p className="text-sm text-blue-700 mt-1">
                Complete procurement analysis with {currentStrategy.title} recommendation. 
                Export findings or submit for stakeholder approval.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Package
              </Button>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Submit for Approval
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}