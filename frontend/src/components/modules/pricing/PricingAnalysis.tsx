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
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Calculator,
  PieChart,
  Zap
} from 'lucide-react';

interface PricingAnalysisProps {
  app: any;
  onBack: () => void;
}

const currentPricing = {
  free: true,
  monthly: '$2.99',
  annual: '$19.99',
  lifetime: 'None',
  freeTrial: '3 days',
  paywallType: 'Soft',
  paywallTiming: 'Day 3',
  paywallFeatures: '3 core features locked',
  ctaText: 'Upgrade to Pro'
};

const competitorAnalysis = {
  avgMonthly: '$4.99',
  avgAnnual: '$29.99',
  lifetimeOptions: '40% of apps',
  freeTrial: '7 days (most common)',
  freemium: '60% offer free tier',
  annualDiscount: '42% average'
};

const revenueAnalysis = {
  estRevenue: '$45K/month',
  arpu: '$1.80',
  conversion: '2.5%',
  churnRate: '15%/month',
  ltv: '$12.00',
  cac: '$8.50'
};

const paywallElements = [
  {
    element: 'Timing Strategy',
    current: 'Day 3 soft paywall',
    benchmark: 'Day 5-7 is optimal',
    recommendation: 'Test Day 5 timing',
    impact: 'Medium'
  },
  {
    element: 'Feature Limitations',
    current: '3 core features locked',
    benchmark: '2-4 features typical',
    recommendation: 'Good balance maintained',
    impact: 'Low'
  },
  {
    element: 'Pricing Psychology',
    current: '$2.99 price point',
    benchmark: '$4.99 category average',
    recommendation: 'Test $3.99 pricing',
    impact: 'High'
  },
  {
    element: 'Trial Strategy',
    current: '3-day free trial',
    benchmark: '7-day industry standard',
    recommendation: 'Extend to 7 days',
    impact: 'High'
  },
  {
    element: 'Upgrade Prompts',
    current: '"Upgrade to Pro" CTA',
    benchmark: 'Value-focused CTAs',
    recommendation: 'Test "Unlock Full Power"',
    impact: 'Medium'
  },
  {
    element: 'Cancellation Flow',
    current: 'Basic cancellation',
    benchmark: 'Retention offers standard',
    recommendation: 'Add win-back flow',
    impact: 'Medium'
  }
];

const pricingComparison = [
  {
    competitor: 'Todoist Premium',
    monthly: '$4.00',
    annual: '$36.00',
    discount: '25%',
    trial: '30 days',
    features: 'Labels, Filters, Comments',
    position: 'Premium'
  },
  {
    competitor: 'Any.do Premium',
    monthly: '$2.99',
    annual: '$26.99',
    discount: '25%',
    trial: '7 days',
    features: 'Calendar, Reminders, Themes',
    position: 'Competitive'
  },
  {
    competitor: 'TickTick Premium',
    monthly: '$2.79',
    annual: '$27.99',
    discount: '17%',
    trial: '7 days',
    features: 'Calendar, Habits, Timeline',
    position: 'Value'
  },
  {
    competitor: 'Things 3',
    monthly: 'N/A',
    annual: 'N/A',
    discount: 'N/A',
    trial: 'None',
    features: 'One-time purchase: $49.99',
    position: 'Premium One-time'
  }
];

const seasonalPricing = [
  {
    season: 'Holiday Season (Nov-Dec)',
    strategy: '50% off annual plans',
    impact: '+78% conversions',
    timing: 'Black Friday through New Year'
  },
  {
    season: 'Back to School (Aug-Sep)',
    strategy: 'Student discounts',
    impact: '+34% student signups',
    timing: 'August 1 - September 30'
  },
  {
    season: 'New Year (Jan)',
    strategy: 'Resolution pricing',
    impact: '+45% trial starts',
    timing: 'January 1-31'
  },
  {
    season: 'Summer (Jun-Aug)',
    strategy: 'Family plan promotions',
    impact: '+23% family conversions',
    timing: 'Summer vacation period'
  }
];

export function PricingAnalysis({ app, onBack }: PricingAnalysisProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Default app data if none provided
  const appData = app || {
    name: 'TaskMaster Pro',
    category: 'Productivity',
    company: 'ProductiveTech Inc.',
    users: '125K',
    revenue: '$45K/month'
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPositionColor = (position: string) => {
    if (position.includes('Premium')) return 'text-purple-600 bg-purple-50';
    if (position.includes('Competitive')) return 'text-green-600 bg-green-50';
    if (position.includes('Value')) return 'text-blue-600 bg-blue-50';
    return 'text-gray-600 bg-gray-50';
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
            <Target className="w-4 h-4 mr-2" />
            🎯 Get Optimization Plan
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
                  {appData.name} - Pricing Analysis
                </CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <span>{appData.company}</span>
                  <span>•</span>
                  <span>{appData.category}</span>
                  <span>•</span>
                  <span>{appData.users} users</span>
                </div>
                <Badge className="text-blue-600 bg-blue-50">
                  Monthly Revenue: {appData.revenue}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Pricing Overview Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>💰 Current Pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Free Tier:</span>
                <p className="font-medium">{currentPricing.free ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Monthly:</span>
                <p className="font-medium">{currentPricing.monthly}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Annual:</span>
                <p className="font-medium">{currentPricing.annual}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Lifetime:</span>
                <p className="font-medium text-red-600">{currentPricing.lifetime}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Free Trial:</span>
                <p className="font-medium">{currentPricing.freeTrial}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Annual Discount:</span>
                <p className="font-medium">33%</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h5 className="font-medium mb-3">💳 Paywall Info</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <Badge variant="outline">{currentPricing.paywallType}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Timing:</span>
                  <span>{currentPricing.paywallTiming}</span>
                </div>
                <div className="flex justify-between">
                  <span>Features Locked:</span>
                  <span>{currentPricing.paywallFeatures}</span>
                </div>
                <div className="flex justify-between">
                  <span>CTA Text:</span>
                  <span>"{currentPricing.ctaText}"</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Competitor Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>🏆 Competitor Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Average Monthly:</span>
                <p className="font-medium text-red-600">{competitorAnalysis.avgMonthly}</p>
                <span className="text-xs text-red-600">67% higher than yours</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Average Annual:</span>
                <p className="font-medium text-red-600">{competitorAnalysis.avgAnnual}</p>
                <span className="text-xs text-red-600">50% higher than yours</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Lifetime Options:</span>
                <p className="font-medium text-yellow-600">{competitorAnalysis.lifetimeOptions}</p>
                <span className="text-xs text-yellow-600">Missing opportunity</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Free Trial:</span>
                <p className="font-medium text-yellow-600">{competitorAnalysis.freeTrial}</p>
                <span className="text-xs text-yellow-600">Yours is shorter</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Freemium:</span>
                <p className="font-medium text-green-600">{competitorAnalysis.freemium}</p>
                <span className="text-xs text-green-600">You're aligned</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Annual Discount:</span>
                <p className="font-medium text-yellow-600">{competitorAnalysis.annualDiscount}</p>
                <span className="text-xs text-yellow-600">Yours is lower</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Analysis */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>📈 Revenue Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Est. Revenue</p>
                <p className="text-xl font-semibold text-green-600">{revenueAnalysis.estRevenue}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">ARPU</p>
                <p className="text-xl font-semibold">{revenueAnalysis.arpu}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Conversion</p>
                <p className="text-xl font-semibold text-red-600">{revenueAnalysis.conversion}</p>
                <span className="text-xs text-red-600">Below 4% target</span>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Churn Rate</p>
                <p className="text-xl font-semibold text-yellow-600">{revenueAnalysis.churnRate}</p>
                <span className="text-xs text-yellow-600">Above 10% target</span>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">LTV</p>
                <p className="text-xl font-semibold">{revenueAnalysis.ltv}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">CAC</p>
                <p className="text-xl font-semibold">{revenueAnalysis.cac}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Paywall Strategy</TabsTrigger>
          <TabsTrigger value="competitors">Price Comparison</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Pricing</TabsTrigger>
          <TabsTrigger value="geographic">Geographic Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Paywall Strategy Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 Paywall Strategy Analysis</CardTitle>
              <p className="text-muted-foreground">
                Comprehensive analysis of your paywall elements against industry benchmarks
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paywallElements.map((element, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{element.element}</h4>
                          <Badge className={getImpactColor(element.impact)}>
                            {element.impact} Impact
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-blue-600">Current:</span>
                            <p className="text-muted-foreground">{element.current}</p>
                          </div>
                          <div>
                            <span className="font-medium text-purple-600">Benchmark:</span>
                            <p className="text-muted-foreground">{element.benchmark}</p>
                          </div>
                          <div>
                            <span className="font-medium text-green-600">Recommendation:</span>
                            <p className="text-green-700">{element.recommendation}</p>
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

        <TabsContent value="competitors" className="space-y-6">
          {/* Competitive Pricing Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>🏆 Competitive Pricing Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Competitor</th>
                      <th className="text-center p-3">Monthly</th>
                      <th className="text-center p-3">Annual</th>
                      <th className="text-center p-3">Discount</th>
                      <th className="text-center p-3">Trial</th>
                      <th className="text-left p-3">Key Features</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-blue-50">
                      <td className="p-3 font-medium">
                        {appData.name} (You)
                        <Badge className="ml-2 text-blue-600 bg-blue-100">Your App</Badge>
                      </td>
                      <td className="text-center p-3">{currentPricing.monthly}</td>
                      <td className="text-center p-3">{currentPricing.annual}</td>
                      <td className="text-center p-3">33%</td>
                      <td className="text-center p-3">{currentPricing.freeTrial}</td>
                      <td className="p-3">Smart Lists, Sync, Reminders</td>
                    </tr>
                    {pricingComparison.map((competitor, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">
                          {competitor.competitor}
                          <Badge className={`ml-2 ${getPositionColor(competitor.position)}`}>
                            {competitor.position}
                          </Badge>
                        </td>
                        <td className="text-center p-3">{competitor.monthly}</td>
                        <td className="text-center p-3">{competitor.annual}</td>
                        <td className="text-center p-3">{competitor.discount}</td>
                        <td className="text-center p-3">{competitor.trial}</td>
                        <td className="p-3">{competitor.features}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h5 className="font-medium text-yellow-900 mb-2">📊 Key Insights:</h5>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Your pricing is 40% below category average</li>
                  <li>• Most competitors offer 7+ day trials vs your 3 days</li>
                  <li>• Things 3's one-time purchase model shows lifetime demand</li>
                  <li>• Consider testing $3.99 monthly to stay competitive</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seasonal" className="space-y-6">
          {/* Seasonal Pricing Strategies */}
          <Card>
            <CardHeader>
              <CardTitle>🗓️ Seasonal Pricing Strategies</CardTitle>
              <p className="text-muted-foreground">
                Optimize pricing throughout the year based on user behavior patterns
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seasonalPricing.map((season, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{season.season}</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-blue-600">Strategy:</span>
                            <p className="text-muted-foreground">{season.strategy}</p>
                          </div>
                          <div>
                            <span className="font-medium text-green-600">Impact:</span>
                            <p className="text-green-700">{season.impact}</p>
                          </div>
                          <div>
                            <span className="font-medium text-purple-600">Timing:</span>
                            <p className="text-muted-foreground">{season.timing}</p>
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

        <TabsContent value="geographic" className="space-y-6">
          {/* Geographic Pricing Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>🌍 Geographic Pricing Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-3">💡 Regional Pricing Opportunities:</h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-blue-800 mb-2">Emerging Markets:</h6>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• India: $1.99/month (67% discount)</li>
                        <li>• Brazil: $2.49/month (17% discount)</li>
                        <li>• Mexico: $2.79/month (7% discount)</li>
                        <li>• Eastern Europe: $2.39/month (20% discount)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="font-medium text-blue-800 mb-2">Premium Markets:</h6>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Switzerland: $4.99/month (+67% premium)</li>
                        <li>• Norway: $4.49/month (+50% premium)</li>
                        <li>• Australia: $3.99/month (+33% premium)</li>
                        <li>• Japan: $3.79/month (+27% premium)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-border rounded-lg text-center">
                    <h6 className="font-medium mb-2">Revenue Increase</h6>
                    <p className="text-2xl font-bold text-green-600">+25%</p>
                    <p className="text-sm text-muted-foreground">With regional pricing</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg text-center">
                    <h6 className="font-medium mb-2">User Growth</h6>
                    <p className="text-2xl font-bold text-blue-600">+40%</p>
                    <p className="text-sm text-muted-foreground">In emerging markets</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg text-center">
                    <h6 className="font-medium mb-2">Market Penetration</h6>
                    <p className="text-2xl font-bold text-purple-600">+60%</p>
                    <p className="text-sm text-muted-foreground">Price-sensitive regions</p>
                  </div>
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
              <Target className="w-4 h-4 mr-2" />
              🎯 Get Optimization Plan
            </Button>
            <Button variant="outline">
              <Calculator className="w-4 h-4 mr-2" />
              📊 Revenue Calculator
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              💡 A/B Test Ideas
            </Button>
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              📈 Market Benchmarks
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}