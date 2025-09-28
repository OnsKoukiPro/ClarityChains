import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { 
  ArrowLeft, 
  Save, 
  Download, 
  DollarSign, 
  TrendingUp,
  Target,
  BarChart3,
  Zap,
  Calculator,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  PieChart
} from 'lucide-react';

interface PricingOptimizationProps {
  app: any;
  onBack: () => void;
}

const optimizationRecommendations = [
  {
    priority: 'HIGH IMPACT',
    title: 'INCREASE MONTHLY PRICE TO $3.99',
    current: '$2.99/month pricing',
    suggested: 'Test $3.99/month (33% increase)',
    impact: '+35% revenue within 60 days',
    confidence: 92,
    rationale: 'Still 20% below category average, minimal churn expected',
    effort: 'Low',
    timeframe: '1 week',
    abTestSuggestion: 'Split test 50/50 for 2 weeks'
  },
  {
    priority: 'HIGH IMPACT',
    title: 'ADD LIFETIME PRICING OPTION',
    current: 'Only subscription models',
    suggested: '$49.99 lifetime purchase option',
    impact: '+25% revenue from one-time buyers',
    confidence: 89,
    rationale: '40% of productivity apps offer lifetime, high user demand',
    effort: 'Medium',
    timeframe: '2-3 weeks',
    abTestSuggestion: 'Test $49.99 vs $59.99 lifetime price'
  },
  {
    priority: 'MEDIUM IMPACT',
    title: 'EXTEND FREE TRIAL TO 7 DAYS',
    current: '3-day free trial',
    suggested: '7-day free trial period',
    impact: '+15% trial-to-paid conversion',
    confidence: 85,
    rationale: 'Industry standard, allows habit formation',
    effort: 'Low',
    timeframe: '3 days',
    abTestSuggestion: '3-day vs 7-day trial comparison'
  },
  {
    priority: 'MEDIUM IMPACT',
    title: 'IMPROVE ANNUAL DISCOUNT TO 45%',
    current: '33% annual discount',
    suggested: '45% annual discount (industry standard)',
    impact: '+20% annual plan adoption',
    confidence: 78,
    rationale: 'Better LTV, reduced churn with annual commitment',
    effort: 'Low',
    timeframe: '1 day',
    abTestSuggestion: 'Test 40% vs 45% vs 50% discounts'
  }
];

const revenueProjections = {
  currentMonthly: 45000,
  optimizedMonthly: 60750,
  increase: 35,
  timeframe: '60 days',
  breakdown: [
    { factor: 'Price increase ($2.99 → $3.99)', impact: '+$12,600', percentage: '+28%' },
    { factor: 'Lifetime option revenue', impact: '+$2,800', percentage: '+6%' },
    { factor: 'Better trial conversion', impact: '+$350', percentage: '+1%' }
  ]
};

const abTestFramework = [
  {
    test: 'Monthly Price Point',
    variants: ['$2.99 (Control)', '$3.49 (Test A)', '$3.99 (Test B)'],
    duration: '2 weeks',
    sampleSize: '1,000 users per variant',
    primaryMetric: 'Conversion rate',
    secondaryMetrics: ['Revenue per user', 'Churn rate', 'Trial start rate'],
    expectedImpact: '+20-35% revenue'
  },
  {
    test: 'Lifetime Pricing',
    variants: ['No Lifetime (Control)', '$49.99 Lifetime (Test A)', '$59.99 Lifetime (Test B)'],
    duration: '3 weeks',
    sampleSize: '800 users per variant',
    primaryMetric: 'Total revenue',
    secondaryMetrics: ['Average order value', 'Payment method preference'],
    expectedImpact: '+15-25% revenue'
  },
  {
    test: 'Trial Length',
    variants: ['3 days (Control)', '7 days (Test A)', '14 days (Test B)'],
    duration: '4 weeks',
    sampleSize: '1,200 users per variant',
    primaryMetric: 'Trial-to-paid conversion',
    secondaryMetrics: ['Feature usage', 'Support ticket volume'],
    expectedImpact: '+10-20% conversion'
  },
  {
    test: 'Annual Discount',
    variants: ['33% (Control)', '40% (Test A)', '45% (Test B)', '50% (Test C)'],
    duration: '2 weeks',
    sampleSize: '600 users per variant',
    primaryMetric: 'Annual plan adoption',
    secondaryMetrics: ['Customer lifetime value', 'Retention rate'],
    expectedImpact: '+15-30% annual adoption'
  }
];

const implementationRoadmap = [
  {
    week: 'Week 1',
    tasks: [
      'Implement $3.99 monthly price A/B test',
      'Set up analytics tracking for price changes',
      'Update payment processing for new pricing'
    ],
    effort: 'Low',
    owner: 'Engineering + Product'
  },
  {
    week: 'Week 2-3',
    tasks: [
      'Develop lifetime pricing option',
      'Create new pricing page layouts',
      'Test payment flows for one-time purchases'
    ],
    effort: 'Medium',
    owner: 'Engineering + Design'
  },
  {
    week: 'Week 4',
    tasks: [
      'Extend trial period to 7 days',
      'Update onboarding flow',
      'Monitor trial conversion metrics'
    ],
    effort: 'Low',
    owner: 'Product + Marketing'
  },
  {
    week: 'Week 5-6',
    tasks: [
      'Optimize annual discount percentage',
      'Update pricing communication',
      'Launch comprehensive pricing page redesign'
    ],
    effort: 'Medium',
    owner: 'Marketing + Design'
  }
];

const riskAssessment = [
  {
    risk: 'Price sensitivity causing churn',
    probability: 'Medium',
    impact: 'High',
    mitigation: 'Grandfather existing users, gradual rollout to new users only',
    monitoring: 'Daily churn rate tracking for 30 days'
  },
  {
    risk: 'Competitive response to pricing',
    probability: 'Low',
    impact: 'Medium',
    mitigation: 'Strong feature differentiation, customer communication',
    monitoring: 'Weekly competitor pricing monitoring'
  },
  {
    risk: 'Implementation technical issues',
    probability: 'Low',
    impact: 'Low',
    mitigation: 'Thorough testing, staged rollout, rollback plan',
    monitoring: 'Payment success rate tracking'
  }
];

export function PricingOptimization({ app, onBack }: PricingOptimizationProps) {
  const [activeTab, setActiveTab] = useState('recommendations');

  // Default app data if none provided
  const appData = app || {
    name: 'TaskMaster Pro',
    category: 'Productivity',
    currentRevenue: '$45K/month',
    users: '125K'
  };

  const getPriorityColor = (priority: string) => {
    if (priority.includes('HIGH')) return 'bg-red-50 text-red-600';
    if (priority.includes('MEDIUM')) return 'bg-yellow-50 text-yellow-600';
    return 'bg-blue-50 text-blue-600';
  };

  const getEffortColor = (effort: string) => {
    switch (effort.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pricing Hub
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            📋 Export Plan
          </Button>
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            💾 Save Strategy
          </Button>
        </div>
      </div>

      {/* Page Title */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🤖 Pricing Optimization Engine</CardTitle>
          <p className="text-muted-foreground">
            AI-powered pricing recommendations and revenue optimization strategy for {appData.name}
          </p>
        </CardHeader>
      </Card>

      {/* Current Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Current Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Current Monthly Revenue</p>
              <p className="text-2xl font-semibold">{appData.currentRevenue}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Pricing vs Market</p>
              <p className="text-2xl font-semibold text-red-600">40% below</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl font-semibold text-yellow-600">2.5%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Revenue Potential</p>
              <p className="text-2xl font-semibold text-green-600">+35%</p>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-red-50 to-yellow-50 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2">🚨 Key Issues Identified:</h4>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• Your pricing is 40% below category average</li>
              <li>• Annual conversion rate: 12% (category avg: 18%)</li>
              <li>• No lifetime option (missed revenue opportunity)</li>
              <li>• Short trial period may limit habit formation</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="testing">A/B Testing</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-6">
          {/* AI Optimization Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 Pricing Optimization Recommendations</CardTitle>
              <p className="text-muted-foreground">
                AI-analyzed recommendations based on 3,247 similar apps and market data
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {optimizationRecommendations.map((rec, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority}
                          </Badge>
                          <span className="font-semibold">{rec.title}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">Confidence:</span>
                            <span className="text-xs font-medium text-green-600">{rec.confidence}%</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm">
                          <div>
                            <span className="font-medium text-red-600">Current:</span>
                            <p className="text-muted-foreground">{rec.current}</p>
                          </div>
                          <div>
                            <span className="font-medium text-green-600">Suggested:</span>
                            <p className="text-green-700">{rec.suggested}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm">
                          <div>
                            <span className="font-medium text-blue-600">Impact:</span>
                            <p className="text-blue-700">{rec.impact}</p>
                          </div>
                          <div>
                            <span className="font-medium text-purple-600">Effort:</span>
                            <Badge className={getEffortColor(rec.effort)}>
                              {rec.effort}
                            </Badge>
                          </div>
                          <div>
                            <span className="font-medium text-orange-600">Timeline:</span>
                            <p className="text-muted-foreground">{rec.timeframe}</p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Rationale:</span>
                            <p className="text-muted-foreground">{rec.rationale}</p>
                          </div>
                          <div>
                            <span className="font-medium text-blue-600">A/B Test:</span>
                            <p className="text-blue-700">{rec.abTestSuggestion}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Revenue Projection */}
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4">📈 Revenue Impact Projection</h4>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Current Revenue</p>
                      <p className="text-xl font-semibold">${revenueProjections.currentMonthly.toLocaleString()}/mo</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Projected Revenue</p>
                      <p className="text-xl font-semibold text-green-600">${revenueProjections.optimizedMonthly.toLocaleString()}/mo</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Increase</p>
                      <p className="text-xl font-semibold text-green-600">+{revenueProjections.increase}%</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-medium text-green-900">Impact Breakdown:</h5>
                    {revenueProjections.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-white rounded">
                        <span className="text-sm">{item.factor}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-green-600">{item.impact}</span>
                          <Badge className="text-green-600 bg-green-100">{item.percentage}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>💡 Expected Timeline:</strong> Full optimization impact realized within {revenueProjections.timeframe}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          {/* A/B Testing Framework */}
          <Card>
            <CardHeader>
              <CardTitle>🧪 A/B Testing Framework</CardTitle>
              <p className="text-muted-foreground">
                Structured testing approach to validate pricing optimizations
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {abTestFramework.map((test, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{test.test}</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <span className="font-medium text-blue-600">Duration:</span>
                            <p className="text-muted-foreground">{test.duration}</p>
                          </div>
                          <div>
                            <span className="font-medium text-purple-600">Sample Size:</span>
                            <p className="text-muted-foreground">{test.sampleSize}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <span className="font-medium text-green-600">Test Variants:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {test.variants.map((variant, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {variant}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-red-600">Primary Metric:</span>
                              <p className="text-muted-foreground">{test.primaryMetric}</p>
                            </div>
                            <div>
                              <span className="font-medium text-orange-600">Secondary Metrics:</span>
                              <p className="text-muted-foreground">{test.secondaryMetrics.join(', ')}</p>
                            </div>
                          </div>

                          <div className="p-3 bg-blue-50 rounded-lg">
                            <span className="font-medium text-blue-800">Expected Impact:</span>
                            <p className="text-blue-700">{test.expectedImpact}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="space-y-6">
          {/* Implementation Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle>🗓️ Implementation Roadmap</CardTitle>
              <p className="text-muted-foreground">
                Step-by-step execution plan for pricing optimization
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {implementationRoadmap.map((phase, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{phase.week}</h4>
                          <Badge className={getEffortColor(phase.effort)}>
                            {phase.effort} Effort
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 mb-3">
                          {phase.tasks.map((task, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm">{task}</span>
                            </div>
                          ))}
                        </div>

                        <div className="text-sm">
                          <span className="font-medium text-purple-600">Owner:</span>
                          <span className="text-muted-foreground ml-2">{phase.owner}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">🎯 Success Metrics to Track:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <ul className="text-blue-800 space-y-1">
                    <li>• Monthly recurring revenue (MRR)</li>
                    <li>• Conversion rate by pricing tier</li>
                    <li>• Customer lifetime value (LTV)</li>
                    <li>• Trial-to-paid conversion rate</li>
                  </ul>
                  <ul className="text-blue-800 space-y-1">
                    <li>• Churn rate by cohort</li>
                    <li>• Average revenue per user (ARPU)</li>
                    <li>• Payment method preferences</li>
                    <li>• Customer acquisition cost (CAC)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle>⚠️ Risk Assessment & Mitigation</CardTitle>
              <p className="text-muted-foreground">
                Potential risks and proactive mitigation strategies
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskAssessment.map((risk, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{risk.risk}</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm">
                          <div>
                            <span className="font-medium text-red-600">Probability:</span>
                            <Badge className={getRiskColor(risk.probability)}>
                              {risk.probability}
                            </Badge>
                          </div>
                          <div>
                            <span className="font-medium text-orange-600">Impact:</span>
                            <Badge className={getRiskColor(risk.impact)}>
                              {risk.impact}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-green-600">Mitigation:</span>
                            <p className="text-green-700">{risk.mitigation}</p>
                          </div>
                          <div>
                            <span className="font-medium text-blue-600">Monitoring:</span>
                            <p className="text-blue-700">{risk.monitoring}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h5 className="font-medium text-green-900 mb-2">✅ Risk Mitigation Best Practices:</h5>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Grandfather existing customers during price changes</li>
                  <li>• Implement gradual rollouts to monitor impact</li>
                  <li>• Maintain clear communication about value improvements</li>
                  <li>• Have rollback plans ready for each optimization</li>
                  <li>• Monitor competitor responses and market changes</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <Button>
              <Zap className="w-4 h-4 mr-2" />
              🚀 Start Implementation
            </Button>
            <Button variant="outline">
              <Calculator className="w-4 h-4 mr-2" />
              📊 Revenue Calculator
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              🧪 Set Up A/B Tests
            </Button>
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              📈 Track Results
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}