import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Star, 
  Download, 
  MessageSquare, 
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Brain
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface PersonalizedDashboardProps {
  appData: any;
  onNavigate: (module: string, subPage?: string) => void;
}

const downloadTrend = [
  { month: 'Jan', downloads: 38200, revenue: 9800 },
  { month: 'Feb', downloads: 41500, revenue: 11200 },
  { month: 'Mar', downloads: 45200, revenue: 12400 },
  { month: 'Apr', downloads: 43800, revenue: 11900 },
  { month: 'May', downloads: 47300, revenue: 13100 },
  { month: 'Jun', downloads: 52100, revenue: 14800 }
];

const competitorData = [
  { name: 'HomeDesign Studio', downloads: 52100, color: '#8884d8' },
  { name: 'Houzz', downloads: 125000, color: '#82ca9d' },
  { name: 'Planner 5D', downloads: 89000, color: '#ffc658' },
  { name: 'SketchUp', downloads: 67000, color: '#ff7300' },
  { name: 'Roomstyler', downloads: 45000, color: '#ff0000' }
];

const reviewSentiment = [
  { name: 'Positive', value: 68, color: '#22c55e' },
  { name: 'Neutral', value: 22, color: '#94a3b8' },
  { name: 'Negative', value: 10, color: '#ef4444' }
];

const actionItems = [
  {
    id: 1,
    priority: 'high',
    title: 'ASO Optimization Opportunity',
    description: 'Keyword "home design app" has 45% less competition this month',
    module: 'aso',
    subPage: 'detail',
    impact: '+23% potential downloads',
    timeframe: '2 weeks'
  },
  {
    id: 2,
    priority: 'medium',
    title: 'Feature Gap Identified',
    description: 'AR furniture placement - 67% of competitors lack this feature',
    module: 'features',
    subPage: 'comparison',
    impact: '+15% user retention',
    timeframe: '6-8 weeks'
  },
  {
    id: 3,
    priority: 'medium',
    title: 'New Market Opportunity',
    description: 'Australian market shows 89% growth in interior design apps',
    module: 'markets',
    subPage: 'detail',
    impact: '+12K monthly downloads',
    timeframe: '4 weeks'
  },
  {
    id: 4,
    priority: 'low',
    title: 'Pricing Strategy Review',
    description: 'Premium tier adoption 23% below category average',
    module: 'pricing',
    subPage: 'analysis',
    impact: '+$2.3K MRR',
    timeframe: '3 weeks'
  }
];

const insights = [
  {
    id: 1,
    type: 'trend',
    title: 'User Acquisition Trending Up',
    description: 'Your app downloads increased 16% this month, outperforming 78% of Interior Design apps',
    confidence: 92,
    icon: TrendingUp,
    color: 'text-green-600'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Review Sentiment Declining',
    description: 'Recent reviews mention app crashes on iOS 17. Quick fix needed to maintain rating',
    confidence: 87,
    icon: AlertCircle,
    color: 'text-yellow-600'
  },
  {
    id: 3, 
    type: 'opportunity',
    title: 'Competitor Weakness Detected',
    description: 'Houzz users complaining about slow loading times. Opportunity to capture market share',
    confidence: 84,
    icon: Target,
    color: 'text-blue-600'
  }
];

export function PersonalizedDashboard({ appData, onNavigate }: PersonalizedDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('6m');

  const getMetricChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change > 0
    };
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const monthlyDownloadsChange = getMetricChange(52100, 47300);
  const revenueChange = getMetricChange(14800, 13100);
  const ratingChange = getMetricChange(4.3, 4.1);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Welcome back! 👋</h1>
            <p className="text-muted-foreground">
              Here's how <span className="font-medium">{appData.name}</span> is performing in the {appData.subcategory} market
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Market Position</div>
            <div className="text-xl font-semibold">#4</div>
            <div className="text-sm text-green-600">↑ 2 positions</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Downloads</p>
                <p className="text-2xl font-semibold">52.1K</p>
                <div className="flex items-center mt-1">
                  {monthlyDownloadsChange.isPositive ? (
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs ${monthlyDownloadsChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {monthlyDownloadsChange.value}% vs last month
                  </span>
                </div>
              </div>
              <Download className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-semibold">$14.8K</p>
                <div className="flex items-center mt-1">
                  {revenueChange.isPositive ? (
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs ${revenueChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {revenueChange.value}% vs last month
                  </span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">App Store Rating</p>
                <p className="text-2xl font-semibold">{appData.rating}</p>
                <div className="flex items-center mt-1">
                  {ratingChange.isPositive ? (
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs ${ratingChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    +{ratingChange.value}% vs last month
                  </span>
                </div>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-semibold">24.7K</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+8.3% vs last month</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Performance Overview</CardTitle>
                <div className="flex gap-2">
                  {['1m', '3m', '6m', '1y'].map((period) => (
                    <Button
                      key={period}
                      variant={selectedPeriod === period ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPeriod(period)}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={downloadTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="downloads" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      name="Downloads"
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      name="Revenue ($)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Competitor Analysis */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Competitive Position</CardTitle>
                <Button variant="outline" onClick={() => onNavigate('features', 'comparison')}>
                  View Full Analysis
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={competitorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${Number(value).toLocaleString()}`, 'Downloads']} />
                    <Bar dataKey="downloads" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Insights for Your App
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight) => (
                  <div key={insight.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${insight.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                      <insight.icon className={`w-4 h-4 ${insight.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Confidence: {insight.confidence}%</span>
                        <Badge variant="outline" className="text-xs">
                          AI Generated
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">⚡ Priority Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {actionItems.slice(0, 3).map((action) => (
                <div 
                  key={action.id} 
                  className={`p-3 border rounded-lg cursor-pointer hover:shadow-sm transition-all ${getPriorityColor(action.priority)}`}
                  onClick={() => onNavigate(action.module, action.subPage)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getPriorityColor(action.priority)}>
                      {action.priority}
                    </Badge>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <h4 className="font-medium text-sm mb-1">{action.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{action.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">{action.impact}</span>
                    <span className="text-muted-foreground">{action.timeframe}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Review Sentiment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📊 Review Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={reviewSentiment}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={60}
                      dataKey="value"
                    >
                      {reviewSentiment.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Reviews']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {reviewSentiment.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3"
                onClick={() => onNavigate('reviews', 'analysis')}
              >
                Analyze Reviews
              </Button>
            </CardContent>
          </Card>

          {/* Market Position */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🌍 Market Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Category Rank</span>
                <div className="text-right">
                  <span className="font-semibold">#4</span>
                  <div className="text-xs text-green-600">↑ 2</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Market Share</span>
                <span className="font-semibold">8.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Growth Rate</span>
                <span className="font-semibold text-green-600">+16%</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => onNavigate('markets', 'detail')}
              >
                Explore New Markets
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📈 This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>New Downloads:</span>
                <span className="font-medium">12,340</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Revenue:</span>
                <span className="font-medium">$3,450</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>New Reviews:</span>
                <span className="font-medium">47</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg. Rating:</span>
                <span className="font-medium">4.2 ⭐</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}