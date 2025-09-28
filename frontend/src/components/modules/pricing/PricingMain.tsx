import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Eye,
  Search,
  Settings,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Calculator,
  PieChart
} from 'lucide-react';

interface PricingMainProps {
  onAnalysisSelect: (app: any) => void;
  onOptimizationSelect: (app: any) => void;
}

const pricingMetrics = [
  { label: 'Apps Analyzed', value: '3,247', icon: BarChart3, color: 'text-blue-500' },
  { label: 'Pricing Models', value: '18 types', icon: PieChart, color: 'text-purple-500' },
  { label: 'Revenue Tracked', value: '$2.8B', icon: DollarSign, color: 'text-green-500' },
  { label: 'Optimizations', value: '1,567', icon: Target, color: 'text-primary' }
];

const pricingTrends = [
  {
    trend: 'Subscription Fatigue',
    growth: '+34%',
    description: 'users prefer lifetime options',
    insight: 'One-time payments gaining popularity across categories',
    impact: 'High'
  },
  {
    trend: 'Freemium Models',
    growth: '+28%',
    description: 'apps adopting free tiers',
    insight: 'Try-before-buy reduces acquisition friction',
    impact: 'Medium'
  },
  {
    trend: 'Regional Pricing',
    growth: '+67%',
    description: 'apps with geographic pricing',
    insight: 'Local purchasing power optimization critical',
    impact: 'High'
  },
  {
    trend: 'Family Plans',
    growth: '+45%',
    description: 'revenue from shared accounts',
    insight: 'Higher LTV and retention rates',
    impact: 'Medium'
  }
];

const pricingInsights = [
  {
    insight: 'Apps with 7-day trials convert 23% better than 14-day trials',
    category: 'Trial Strategy',
    confidence: 94,
    apps: '2,847 apps analyzed'
  },
  {
    insight: 'Annual discounts of 40-50% maximize lifetime value',
    category: 'Pricing Psychology',
    confidence: 87,
    apps: '1,956 apps analyzed'
  },
  {
    insight: 'Soft paywalls outperform hard paywalls by 18% in productivity',
    category: 'Paywall Timing',
    confidence: 92,
    apps: '1,234 apps analyzed'
  },
  {
    insight: 'Lifetime options increase revenue 35% in health category',
    category: 'Revenue Models',
    confidence: 89,
    apps: '856 apps analyzed'
  }
];

const featuredAnalysis = [
  {
    id: 1,
    name: 'Todoist',
    category: 'Productivity',
    currentPrice: '$4/mo, $36/year',
    marketPosition: 'Below Average',
    conversionRate: 3.2,
    arpu: '$28.50',
    revenueGap: '+$1.2M potential',
    optimization: 'Add lifetime option, test $5 monthly'
  },
  {
    id: 2,
    name: 'Calm',
    category: 'Health & Fitness',
    currentPrice: '$13/mo, $70/year',
    marketPosition: 'Competitive',
    conversionRate: 12.4,
    arpu: '$47.80',
    revenueGap: '+$890K potential',
    optimization: 'Test shorter trial, add family plan'
  },
  {
    id: 3,
    name: 'Duolingo',
    category: 'Education',
    currentPrice: '$7/mo, $84/year',
    marketPosition: 'Premium',
    conversionRate: 8.9,
    arpu: '$31.20',
    optimization: 'Strong position, test regional pricing'
  }
];

const quickActions = [
  { title: '💰 Analyze Pricing', description: 'Deep dive into app pricing strategy' },
  { title: '🎯 Optimize Revenue', description: 'Get AI pricing recommendations' },
  { title: '📊 Compare Models', description: 'Benchmark against competitors' },
  { title: '⚡ A/B Test Ideas', description: 'Generate pricing experiments' },
  { title: '🌍 Regional Pricing', description: 'Geographic optimization analysis' },
  { title: '📈 Revenue Forecast', description: 'Predict pricing impact' }
];

const revenueModels = [
  {
    model: 'Freemium + Premium',
    adoption: '47%',
    avgRevenue: '$2.8M',
    conversionRate: '4.2%',
    bestFor: 'SaaS, Productivity'
  },
  {
    model: 'Subscription Only',
    adoption: '31%',
    avgRevenue: '$3.4M',
    conversionRate: '7.8%',
    bestFor: 'Content, Utilities'
  },
  {
    model: 'One-time Purchase',
    adoption: '12%',
    avgRevenue: '$1.9M',
    conversionRate: '2.1%',
    bestFor: 'Games, Creative Tools'
  },
  {
    model: 'In-App Purchases',
    adoption: '10%',
    avgRevenue: '$4.1M',
    conversionRate: '12.3%',
    bestFor: 'Gaming, Entertainment'
  }
];

export function PricingMain({ onAnalysisSelect, onOptimizationSelect }: PricingMainProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Premium': return 'text-purple-600 bg-purple-50';
      case 'Competitive': return 'text-green-600 bg-green-50';
      case 'Below Average': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search apps for pricing analysis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="productivity">Productivity</SelectItem>
            <SelectItem value="health">Health & Fitness</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="gaming">Gaming</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {pricingMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-semibold">{metric.value}</p>
                </div>
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pricing Trends */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  🔥 Pricing Market Trends
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pricingTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">📈 {trend.trend}</p>
                          <Badge className="text-green-600 bg-green-50">
                            {trend.growth} {trend.description}
                          </Badge>
                          <Badge className={getImpactColor(trend.impact)}>
                            {trend.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{trend.insight}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pricing Intelligence Insights */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  💡 Pricing Intelligence Insights
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pricingInsights.map((insight, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-blue-600 bg-blue-50">
                            {insight.category}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">Confidence:</span>
                            <span className="text-xs font-medium text-green-600">{insight.confidence}%</span>
                          </div>
                        </div>
                        <p className="text-sm mb-2">
                          💡 "{insight.insight}"
                        </p>
                        <p className="text-xs text-muted-foreground">{insight.apps}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Pricing Analysis */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  📊 Featured Pricing Analysis
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredAnalysis.map((app) => (
                  <div 
                    key={app.id}
                    className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">📱 {app.name}</h4>
                          <Badge variant="outline">{app.category}</Badge>
                          <Badge className={getPositionColor(app.marketPosition)}>
                            {app.marketPosition}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Current Price:</span>
                            <p className="font-medium">{app.currentPrice}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Conversion:</span>
                            <p className="font-medium">{app.conversionRate}%</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">ARPU:</span>
                            <p className="font-medium">{app.arpu}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Revenue Gap:</span>
                            <p className="font-medium text-green-600">{app.revenueGap}</p>
                          </div>
                        </div>

                        <div className="p-3 bg-blue-50 rounded-lg mb-3">
                          <span className="text-blue-800 text-sm">
                            🎯 <strong>Optimization:</strong> {app.optimization}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onAnalysisSelect(app)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        💰 Full Analysis
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onOptimizationSelect(app)}
                      >
                        <Target className="w-4 h-4 mr-1" />
                        🎯 Optimize
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        📊 Compare
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚡ Quick Pricing Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {quickActions.map((action, index) => (
                  <Button key={index} variant="outline" className="h-16 flex-col gap-1">
                    <span className="text-base">{action.title}</span>
                    <span className="text-xs text-muted-foreground">{action.description}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">💰 Pricing Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Calculator className="w-4 h-4 mr-2" />
                Price Calculator
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Revenue Predictor
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                A/B Test Designer
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Market Benchmarks
              </Button>
            </CardContent>
          </Card>

          {/* Revenue Model Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📈 Revenue Model Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {revenueModels.map((model, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{model.model}</span>
                    <Badge variant="secondary">{model.adoption}</Badge>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Avg Revenue:</span>
                      <span className="font-medium">{model.avgRevenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion:</span>
                      <span className="font-medium">{model.conversionRate}</span>
                    </div>
                    <p className="text-muted-foreground">Best for: {model.bestFor}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Market Benchmarks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🎯 Market Benchmarks</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Avg Monthly Price:</span>
                  <span className="font-medium">$7.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Annual Discount:</span>
                  <span className="font-medium text-green-600">42%</span>
                </div>
                <div className="flex justify-between">
                  <span>Trial Conversion:</span>
                  <span className="font-medium">8.4%</span>
                </div>
                <div className="flex justify-between">
                  <span>Freemium Adoption:</span>
                  <span className="font-medium">47%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Optimization Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">💡 Optimization Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Test 40-50% annual discounts for maximum LTV</p>
              <p>• 7-day trials convert better than 14-day</p>
              <p>• Lifetime options work best in health/productivity</p>
              <p>• Family plans increase retention by 35%</p>
              <p>• Regional pricing can boost revenue 25%</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}