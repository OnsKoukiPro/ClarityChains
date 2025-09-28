import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Eye,
  Settings,
  Users,
  ChevronRight,
  CreditCard,
  Zap,
  Gift,
  Crown,
  Clock,
  CheckCircle
} from 'lucide-react';

interface PaywallMainProps {
  onAppSelect: (app: any) => void;
  onComparisonSelect: () => void;
}

const trendingStrategies = [
  {
    strategy: 'Lifetime Options',
    growth: '+45%',
    description: 'apps adding this model',
    trend: 'up',
    insight: 'Subscription fatigue drives lifetime interest'
  },
  {
    strategy: 'Graduated Pricing',
    growth: '+34%',
    description: 'using tier strategies',
    trend: 'up',
    insight: 'More choice increases perceived value'
  },
  {
    strategy: 'Freemium + Premium',
    growth: '+28%',
    description: 'hybrid approach growth',
    trend: 'up',
    insight: 'Try-before-buy reduces purchase friction'
  },
  {
    strategy: 'Family Plans',
    growth: '+23%',
    description: 'family subscription opts',
    trend: 'up',
    insight: 'Higher LTV through shared accounts'
  }
];

const paywallInsights = [
  {
    insight: '3-day trials convert 23% better than 7-day',
    type: 'conversion',
    icon: <Clock className="w-5 h-5 text-blue-500" />
  },
  {
    insight: 'Yearly discounts of 40-50% optimize LTV',
    type: 'pricing',
    icon: <DollarSign className="w-5 h-5 text-green-500" />
  },
  {
    insight: 'Social proof increases conversion by 31%',
    type: 'psychology',
    icon: <Users className="w-5 h-5 text-purple-500" />
  },
  {
    insight: 'Limited-time offers boost urgency by 67%',
    type: 'urgency',
    icon: <Zap className="w-5 h-5 text-orange-500" />
  }
];

const featuredApps = [
  {
    id: 1,
    name: 'Calm',
    category: 'Meditation & Sleep',
    model: 'Freemium + Premium',
    price: '$69.99/year',
    conversionRate: 12.4,
    insight: '7-day trial + compelling onboarding = 12% CVR',
    trialPeriod: '7 days',
    monthlyPrice: '$12.99/month',
    features: ['Social proof', 'Limited offers', 'Clear value prop'],
    weaknesses: ['No lifetime option', 'Long trial period']
  },
  {
    id: 2,
    name: 'Notion',
    category: 'Productivity Workspace',
    model: 'Freemium + Tiers',
    price: '$8-16/mo',
    conversionRate: 15.2,
    insight: 'Generous free tier with clear upgrade path',
    trialPeriod: 'Unlimited free',
    monthlyPrice: 'Freemium model',
    features: ['Generous free tier', 'Clear upgrade path', 'Team features'],
    weaknesses: ['Complex pricing', 'Feature confusion']
  },
  {
    id: 3,
    name: 'Duolingo',
    category: 'Language Learning',
    model: 'Freemium + Super',
    price: '$83.99/year',
    conversionRate: 8.9,
    insight: 'Gamification drives premium upgrade desire',
    trialPeriod: 'Free forever',
    monthlyPrice: '$6.99/month',
    features: ['Gamification', 'Progress streaks', 'Family plan'],
    weaknesses: ['Heavy ads pressure', 'Limited premium features']
  }
];

const categoryTrends = [
  { 
    category: 'Health & Fitness', 
    trend: 'Lifetime gaining popularity', 
    growth: '+67%',
    insight: 'Users prefer one-time payment for wellness'
  },
  { 
    category: 'Productivity', 
    trend: 'Tiered pricing popular', 
    growth: '+45%',
    insight: 'Business users need different feature sets'
  },
  { 
    category: 'Finance', 
    trend: 'Trust equals premium pricing', 
    growth: '+34%',
    insight: 'Security features justify higher prices'
  },
  { 
    category: 'Gaming', 
    trend: 'IAP still dominates', 
    growth: '+12%',
    insight: 'Freemium with cosmetics/power-ups'
  }
];

export function PaywallMain({ onAppSelect, onComparisonSelect }: PaywallMainProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getConversionColor = (rate: number) => {
    if (rate >= 12) return 'text-green-600 bg-green-50';
    if (rate >= 8) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getTrendIcon = (trend: string) => {
    return <TrendingUp className="w-4 h-4 text-green-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Apps Analyzed</p>
                <p className="text-2xl font-semibold">2,847</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Strategies</p>
                <p className="text-2xl font-semibold">67 patterns</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversions Tracked</p>
                <p className="text-2xl font-semibold">125K</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue Models</p>
                <p className="text-2xl font-semibold">23 types</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trending Monetization Strategies */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  🔥 Trending Monetization Strategies
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingStrategies.map((strategy, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">📈 {strategy.strategy}</p>
                          <Badge className="text-green-600 bg-green-50">
                            {strategy.growth} {strategy.description}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{strategy.insight}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Paywall Strategy Insights */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  💡 Paywall Strategy Insights
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium text-green-600 mb-3">🎯 High Converting Patterns:</h4>
              </div>
              <div className="space-y-3">
                {paywallInsights.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    {item.icon}
                    <p className="text-sm">• {item.insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Paywall Analysis */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  📊 Featured Paywall Analysis
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredApps.map((app) => (
                  <div 
                    key={app.id}
                    className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={() => onAppSelect(app)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">📱 {app.name} - {app.category}</h4>
                        <div className="flex items-center gap-4 mb-2">
                          <Badge variant="outline" className="text-purple-600 bg-purple-50">
                            💰 Model: {app.model}
                          </Badge>
                          <Badge variant="outline" className="text-green-600 bg-green-50">
                            💵 Price: {app.price}
                          </Badge>
                          <Badge className={getConversionColor(app.conversionRate)}>
                            CVR: {app.conversionRate}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          🎯 "{app.insight}"
                        </p>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Trial Period:</span>
                        <p className="font-medium">{app.trialPeriod}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Monthly Price:</span>
                        <p className="font-medium">{app.monthlyPrice}</p>
                      </div>
                    </div>
                    
                    {/* Strengths and Weaknesses */}
                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-green-600 font-medium">✅ Strengths:</span>
                        <ul className="text-xs text-muted-foreground mt-1">
                          {app.features.slice(0, 2).map((feature, idx) => (
                            <li key={idx}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-red-600 font-medium">⚠️ Weaknesses:</span>
                        <ul className="text-xs text-muted-foreground mt-1">
                          {app.weaknesses.slice(0, 2).map((weakness, idx) => (
                            <li key={idx}>• {weakness}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        🔍 Analyze
                      </Button>
                      <Button variant="outline" size="sm">
                        <DollarSign className="w-4 h-4 mr-1" />
                        💰 Study Model
                      </Button>
                      <Button variant="outline" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        onComparisonSelect();
                      }}>
                        <BarChart3 className="w-4 h-4 mr-1" />
                        📊 Compare
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Paywall Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚡ Quick Paywall Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button variant="outline" className="h-12 justify-start">
                  <DollarSign className="w-5 h-5 mr-2" />
                  💰 Analyze Paywall
                </Button>
                <Button variant="outline" className="h-12 justify-start" onClick={onComparisonSelect}>
                  <BarChart3 className="w-5 h-5 mr-2" />
                  📊 Strategy Compare
                </Button>
                <Button variant="outline" className="h-12 justify-start">
                  <Target className="w-5 h-5 mr-2" />
                  🎯 Optimize
                </Button>
                <Button variant="outline" className="h-12 justify-start">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  📈 Conversion Study
                </Button>
                <Button variant="outline" className="h-12 justify-start">
                  <Gift className="w-5 h-5 mr-2" />
                  💡 Model Ideas
                </Button>
                <Button variant="outline" className="h-12 justify-start">
                  <Eye className="w-5 h-5 mr-2" />
                  🔍 A/B Examples
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Monetization Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">💰 Monetization Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="w-4 h-4 mr-2" />
                Pricing Calculator
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Conversion Funnel
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                A/B Test Designer
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Revenue Forecaster
              </Button>
            </CardContent>
          </Card>

          {/* Category Monetization Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📈 Category Monetization Trends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryTrends.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{item.category}:</span>
                    <Badge variant="secondary" className="text-green-600 bg-green-50">
                      {item.growth}
                    </Badge>
                  </div>
                  <p className="text-xs text-green-600">💰 {item.trend}</p>
                  <p className="text-xs text-muted-foreground">{item.insight}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Conversion Benchmarks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🎯 Conversion Benchmarks</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Health & Fitness:</span>
                  <span className="font-medium text-green-600">12.4% avg</span>
                </div>
                <div className="flex justify-between">
                  <span>Productivity:</span>
                  <span className="font-medium text-blue-600">15.2% avg</span>
                </div>
                <div className="flex justify-between">
                  <span>Education:</span>
                  <span className="font-medium text-purple-600">8.9% avg</span>
                </div>
                <div className="flex justify-between">
                  <span>Finance:</span>
                  <span className="font-medium text-yellow-600">18.7% avg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">💡 Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Test 3-day vs 7-day trials for optimal conversion</p>
              <p>• Use social proof to build trust and credibility</p>
              <p>• Offer 40-50% annual discounts to maximize LTV</p>
              <p>• Include family plans for higher retention rates</p>
              <p>• A/B test pricing tiers to find optimal strategy</p>
            </CardContent>
          </Card>

          {/* Revenue Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📊 Revenue Insights</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Avg Revenue/User:</span>
                <span className="font-medium">$47.50/year</span>
              </div>
              <div className="flex justify-between">
                <span>Top Converting Model:</span>
                <span className="font-medium">Freemium + Tiers</span>
              </div>
              <div className="flex justify-between">
                <span>Best Trial Length:</span>
                <span className="font-medium">3-7 days</span>
              </div>
              <div className="flex justify-between">
                <span>Optimal Discount:</span>
                <span className="font-medium">45% annual</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}