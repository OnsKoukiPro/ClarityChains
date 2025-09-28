import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { 
  ArrowLeft, 
  Save, 
  Share, 
  DollarSign, 
  TrendingUp,
  Target,
  BarChart3,
  Lightbulb,
  Eye,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  CreditCard,
  Zap
} from 'lucide-react';

interface PaywallDetailProps {
  app: any;
  onBack: () => void;
}

const conversionFunnelData = [
  { stage: 'App Install', percentage: 100, users: '100,000' },
  { stage: 'First Use', percentage: 78, users: '78,000' },
  { stage: 'Paywall View', percentage: 45, users: '45,000' },
  { stage: 'Trial Start', percentage: 34, users: '34,000' },
  { stage: 'Trial End', percentage: 28, users: '28,000' },
  { stage: 'Conversion', percentage: 12.4, users: '12,400' },
  { stage: 'Retention (6mo)', percentage: 89, users: '11,036' }
];

const paywallScreenshots = [
  { 
    name: 'Initial Paywall',
    conversion: '12.4%',
    description: 'First paywall encounter',
    strengths: ['Clear headline', 'Social proof', 'Limited time offer'],
    weaknesses: ['Too many options', 'Long trial period']
  },
  { 
    name: 'Plan Selection',
    conversion: '89%',
    description: 'Pricing plan choice',
    strengths: ['Clear comparison', 'Recommended badge', 'Annual savings highlighted'],
    weaknesses: ['No family plan prominence', 'Missing lifetime option']
  },
  { 
    name: 'Payment Flow',
    conversion: '94%',
    description: 'Checkout completion',
    strengths: ['Simple form', 'Trust badges', 'Multiple payment methods'],
    weaknesses: ['No exit-intent retention', 'Limited payment options']
  }
];

const optimizationRecommendations = [
  {
    priority: 'HIGH IMPACT',
    title: 'ADD LIFETIME OPTION',
    current: 'Only subscription models available',
    suggested: '$299-399 lifetime purchase option',
    impact: '+25% revenue from one-time purchasers',
    rationale: 'Health apps see 67% interest in lifetime options',
    effort: 'Medium',
    timeframe: '2-3 weeks'
  },
  {
    priority: 'HIGH IMPACT',
    title: 'TEST 3-DAY TRIAL vs 7-DAY',
    current: '7-day free trial period',
    suggested: 'A/B test 3-day trial option',
    impact: '+15% conversion rate (proven pattern)',
    rationale: 'Shorter trials create urgency and reduce churn',
    effort: 'Low',
    timeframe: '1 week'
  },
  {
    priority: 'MEDIUM IMPACT',
    title: 'IMPLEMENT GRADUATED PRICING',
    current: 'Single premium tier',
    suggested: 'Basic ($4.99), Premium ($9.99), Pro ($14.99)',
    impact: '+30% average revenue per user',
    rationale: 'User choice increases perceived value',
    effort: 'High',
    timeframe: '4-6 weeks'
  },
  {
    priority: 'MEDIUM IMPACT',
    title: 'ENHANCE RETENTION FLOW',
    current: 'Basic cancellation process',
    suggested: 'Exit-intent offers and win-back campaigns',
    impact: '+20% retention of churning users',
    rationale: 'Retention flows can recover 15-25% of cancellations',
    effort: 'Medium',
    timeframe: '2-3 weeks'
  }
];

const competitorComparison = [
  {
    name: 'Headspace',
    comparison: 'Similar pricing, but Calm has better UX',
    advantages: ['Better onboarding', 'Superior content quality', 'More personalization'],
    disadvantages: ['Lower brand recognition', 'Smaller content library', 'Less corporate penetration']
  },
  {
    name: 'Insight Timer',
    comparison: 'Freemium-heavy, lower conversion rates',
    advantages: ['Better premium positioning', 'Higher quality content', 'Superior user experience'],
    disadvantages: ['Less free content', 'Higher price point', 'Smaller community features']
  },
  {
    name: 'Ten Percent Happier',
    comparison: 'Higher price point, niche positioning',
    advantages: ['Broader market appeal', 'Better pricing strategy', 'More accessible content'],
    disadvantages: ['Less expert authority', 'Weaker premium positioning', 'Less targeted messaging']
  }
];

export function PaywallDetail({ app, onBack }: PaywallDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Default app data if none provided
  const appData = app || {
    name: 'Calm',
    category: 'Meditation & Sleep',
    company: 'Calm.com Inc.',
    rating: 4.8,
    reviews: '125K',
    paywallScore: 89,
    model: 'Freemium + Premium',
    yearlyPrice: '$69.99/year',
    monthlyPrice: '$12.99/month',
    trialPeriod: '7 days free',
    conversionRate: 12.4,
    monthlyConversionRate: 8.1
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getPriorityColor = (priority: string) => {
    if (priority.includes('HIGH')) return 'bg-red-50 text-red-600';
    if (priority.includes('MEDIUM')) return 'bg-yellow-50 text-yellow-600';
    return 'bg-blue-50 text-blue-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Paywall Hub
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <DollarSign className="w-4 h-4 mr-2" />
            💰 Pricing Recommendations
          </Button>
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            📊 Export Analysis
          </Button>
        </div>
      </div>

      {/* App Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white font-semibold">
                  📱
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl mb-1">
                  {appData.name} - {appData.category}
                </CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <span>{appData.company}</span>
                  <span>•</span>
                  <span>⭐ {appData.rating} ({appData.reviews} reviews)</span>
                </div>
                <Badge className="text-blue-600 bg-blue-50">
                  Paywall Performance Score: {appData.paywallScore}/100
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Monetization Model Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>💰 Monetization Model Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Model Type</p>
              <p className="text-lg font-semibold mb-2">{appData.model}</p>
              <Badge variant="outline" className="text-purple-600 bg-purple-50">Premium Focus</Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Price Point</p>
              <p className="text-lg font-semibold mb-2">{appData.yearlyPrice}</p>
              <p className="text-sm text-muted-foreground">{appData.monthlyPrice}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Trial Period</p>
              <p className="text-lg font-semibold mb-2">{appData.trialPeriod}</p>
              <Badge variant="outline" className="text-blue-600 bg-blue-50">Standard Length</Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Conversion</p>
              <p className="text-lg font-semibold mb-2 text-green-600">{appData.conversionRate}% CVR</p>
              <p className="text-sm text-muted-foreground">{appData.monthlyConversionRate}% (monthly)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Paywall Analysis</TabsTrigger>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="recommendations">AI Insights</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Paywall Screen Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>🖼️ Paywall Screen Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {paywallScreenshots.map((screen, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg mb-4 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center text-white">
                          📱
                        </div>
                        <p className="text-sm text-muted-foreground">{screen.name}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{screen.name}</h4>
                        <Badge className="text-green-600 bg-green-50">
                          {screen.conversion}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{screen.description}</p>
                      
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="font-medium text-green-600">✅ Strengths:</span>
                          <ul className="mt-1 space-y-1">
                            {screen.strengths.map((strength, idx) => (
                              <li key={idx} className="text-muted-foreground">• {strength}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="font-medium text-red-600">⚠️ Areas to improve:</span>
                          <ul className="mt-1 space-y-1">
                            {screen.weaknesses.map((weakness, idx) => (
                              <li key={idx} className="text-muted-foreground">• {weakness}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Paywall Strategy Elements */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 Paywall Strategy Elements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-600">✅ STRENGTHS:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Clear value proposition in headline</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Social proof: "50M+ users trust Calm"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Limited time offer creates urgency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Multiple payment options reduce friction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Progress indicator shows journey completion</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-yellow-600">⚠️ OPTIMIZATION OPPORTUNITIES:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span>Trial period (7 days) could be reduced to 3 days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span>Lifetime option missing (trending +45% in category)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span>Family plan not prominent enough</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span>Cancel flow could include retention offers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                      <span>No graduated pricing tiers available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-6">
          {/* Conversion Funnel Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Conversion Funnel Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {conversionFunnelData.slice(0, 4).map((stage, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-lg font-semibold text-blue-600">{stage.percentage}%</span>
                      </div>
                      <p className="font-medium text-sm">{stage.stage}</p>
                      <p className="text-xs text-muted-foreground">{stage.users} users</p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {conversionFunnelData.slice(4).map((stage, index) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-lg font-semibold text-green-600">{stage.percentage}%</span>
                        </div>
                        <p className="font-medium text-sm">{stage.stage}</p>
                        <p className="text-xs text-muted-foreground">{stage.users} users</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4">🎯 OPTIMIZATION FOCUS:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span>• Paywall view rate: Industry avg 52% vs your 45%</span>
                      <Badge className="text-yellow-600 bg-yellow-100">Opportunity</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span>• Trial conversion: Industry avg 15% vs your 12.4%</span>
                      <Badge className="text-yellow-600 bg-yellow-100">Opportunity</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span>• Retention rate: Industry avg 78% vs your 89%</span>
                      <Badge className="text-green-600 bg-green-100">Strength</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          {/* AI Monetization Insights */}
          <Card>
            <CardHeader>
              <CardTitle>🤖 AI Monetization Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">REVENUE OPTIMIZATION RECOMMENDATIONS:</h4>
                <p className="text-sm text-blue-800">
                  Our AI analyzed 10,000+ similar apps and identified these high-impact optimizations for your monetization strategy.
                </p>
              </div>

              <div className="space-y-4">
                {optimizationRecommendations.map((rec, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority}
                          </Badge>
                          <span className="font-semibold">{rec.title}</span>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Current:</span>
                            <p className="text-muted-foreground ml-2">{rec.current}</p>
                          </div>
                          <div>
                            <span className="font-medium">Suggested:</span>
                            <p className="text-green-700 ml-2">{rec.suggested}</p>
                          </div>
                          <div>
                            <span className="font-medium">Impact:</span>
                            <p className="text-blue-700 ml-2">{rec.impact}</p>
                          </div>
                          <div>
                            <span className="font-medium">Rationale:</span>
                            <p className="text-muted-foreground ml-2">{rec.rationale}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right text-sm">
                        <Badge variant="outline" className="mb-1">{rec.effort} Effort</Badge>
                        <p className="text-muted-foreground">{rec.timeframe}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold mb-3">📈 ESTIMATED TOTAL IMPACT:</h4>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-lg font-semibold text-green-700 mb-2">+40% revenue within 90 days</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Conversion Rate:</p>
                      <p className="text-green-600">12.4% → 18.5%</p>
                    </div>
                    <div>
                      <p className="font-medium">Average Revenue/User:</p>
                      <p className="text-green-600">$47.50 → $66.50</p>
                    </div>
                    <div>
                      <p className="font-medium">Retention Rate:</p>
                      <p className="text-green-600">89% → 94%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6">
          {/* Competitive Paywall Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>🏆 Competitive Paywall Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {competitorComparison.map((competitor, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">vs {competitor.name}</h4>
                      <Badge variant="outline">Market Comparison</Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">{competitor.comparison}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-green-600 mb-2">✅ Your Advantages:</h5>
                        <ul className="text-sm space-y-1">
                          {competitor.advantages.map((advantage, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-green-500 rounded-full mt-2"></span>
                              <span>{advantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-red-600 mb-2">⚠️ Their Advantages:</h5>
                        <ul className="text-sm space-y-1">
                          {competitor.disadvantages.map((disadvantage, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-red-500 rounded-full mt-2"></span>
                              <span>{disadvantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-6">
                  <Button variant="outline" className="w-full">
                    🔍 Full Competitive Analysis →
                  </Button>
                </div>
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
              <DollarSign className="w-4 h-4 mr-2" />
              💰 Pricing Recommendations
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              📊 A/B Test Ideas
            </Button>
            <Button variant="outline">
              <Target className="w-4 h-4 mr-2" />
              🎯 Conversion Optimization
            </Button>
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              📈 Revenue Forecast
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}