import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';
import { 
  MessageSquare, 
  TrendingUp, 
  TrendingDown,
  Target, 
  BarChart3, 
  Eye,
  Search,
  AlertTriangle,
  Users,
  Smile,
  Meh,
  Frown,
  Star,
  Heart,
  ThumbsUp,
  Zap
} from 'lucide-react';

interface ReviewsMainProps {
  onAnalysisSelect: (app: any) => void;
  onCompetitiveView: () => void;
  onMonitoringView: () => void;
}

const reviewsMetrics = [
  { label: 'Reviews Analyzed', value: '2.4M', icon: MessageSquare, color: 'text-blue-500' },
  { label: 'Sentiment Accuracy', value: '94.2%', icon: Target, color: 'text-green-500' },
  { label: 'Languages Supported', value: '23', icon: Users, color: 'text-purple-500' },
  { label: 'Insights Generated', value: '8,967', icon: BarChart3, color: 'text-primary' }
];

const trendingThemes = [
  {
    theme: 'Dark mode',
    type: 'requests',
    growth: '+156%',
    mentions: '2,347x',
    trend: 'up',
    insight: 'Users increasingly want dark theme options across all app categories',
    category: 'UI/UX'
  },
  {
    theme: 'AI features',
    type: 'praise',
    growth: '+134%',
    mentions: 'positive sentiment',
    trend: 'up',
    insight: 'AI integration highly appreciated when implemented thoughtfully',
    category: 'Features'
  },
  {
    theme: 'Subscription fatigue',
    type: 'complaints',
    growth: '+89%',
    mentions: 'pricing complaints',
    trend: 'up',
    insight: 'Users showing resistance to subscription models, prefer one-time payments',
    category: 'Pricing'
  },
  {
    theme: 'Voice commands',
    type: 'requests',
    growth: '+67%',
    mentions: 'feature requests',
    trend: 'up',
    insight: 'Voice interface demand growing, especially for productivity apps',
    category: 'Features'
  },
  {
    theme: 'App crashes',
    type: 'complaints',
    growth: '+45%',
    mentions: 'stability issues',
    trend: 'down',
    insight: 'Technical issues remain top user frustration, immediate attention needed',
    category: 'Technical'
  }
];

const sentimentDistribution = {
  positive: { percentage: 68, change: '+3', trend: 'up' },
  neutral: { percentage: 19, change: '0', trend: 'stable' },
  negative: { percentage: 13, change: '-3', trend: 'down' }
};

const featuredAnalysis = [
  {
    id: 1,
    name: 'Notion',
    category: 'Productivity Workspace',
    company: 'Notion Labs, Inc.',
    reviews: '12,847',
    sentiment: 73,
    rating: 4.3,
    topInsight: 'Users love flexibility but want better mobile app',
    topComplaint: 'Mobile app slow and limited',
    topPraise: 'Incredible customization options'
  },
  {
    id: 2,
    name: 'Calm',
    category: 'Meditation & Sleep',
    company: 'Calm.com, Inc.',
    reviews: '18,234',
    sentiment: 81,
    rating: 4.5,
    topInsight: 'High satisfaction but expensive pricing concerns',
    topComplaint: 'Too expensive for features offered',
    topPraise: 'Life-changing meditation content'
  },
  {
    id: 3,
    name: 'Todoist',
    category: 'Task Management',
    company: 'Doist Inc.',
    reviews: '8,956',
    sentiment: 78,
    rating: 4.4,
    topInsight: 'Simple but powerful, users want more AI features',
    topComplaint: 'Limited natural language processing',
    topPraise: 'Clean interface and reliable sync'
  }
];

const quickActions = [
  { title: '💬 Analyze Reviews', description: 'Deep dive into app sentiment' },
  { title: '😊 Sentiment Tracker', description: 'Monitor sentiment changes' },
  { title: '🔍 Keyword Search', description: 'Search specific review themes' },
  { title: '📊 Category Analysis', description: 'Review by topic categories' },
  { title: '🎯 Feature Requests', description: 'Track user feature demands' },
  { title: '⚠️ Issue Monitor', description: 'Alert on critical problems' }
];

const categoryInsights = [
  {
    category: 'Health',
    insight: '"Habit tracking" most requested',
    trend: 'up',
    volume: '2,847 mentions'
  },
  {
    category: 'Productivity',
    insight: '"AI help" trending',
    trend: 'up',
    volume: '3,456 mentions'
  },
  {
    category: 'Finance',
    insight: '"Security" top concern',
    trend: 'stable',
    volume: '1,789 mentions'
  },
  {
    category: 'Gaming',
    insight: '"Fair monetization" key',
    trend: 'up',
    volume: '4,123 mentions'
  }
];

export function ReviewsMain({ onAnalysisSelect, onCompetitiveView, onMonitoringView }: ReviewsMainProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-500" /> : 
           trend === 'down' ? <TrendingDown className="w-4 h-4 text-red-500" /> : 
           <div className="w-4 h-4 rounded-full bg-gray-400" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600 bg-green-50' : 
           trend === 'down' ? 'text-red-600 bg-red-50' : 
           'text-gray-600 bg-gray-50';
  };

  const getSentimentIcon = (sentiment: number) => {
    if (sentiment >= 75) return <Smile className="w-5 h-5 text-green-500" />;
    if (sentiment >= 60) return <Meh className="w-5 h-5 text-yellow-500" />;
    return <Frown className="w-5 h-5 text-red-500" />;
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 75) return 'text-green-600';
    if (sentiment >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search apps for review analysis..."
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
            <SelectItem value="gaming">Gaming</SelectItem>
            <SelectItem value="education">Education</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={onMonitoringView} variant="outline">
          <AlertTriangle className="w-4 h-4 mr-2" />
          🔔 Alerts
        </Button>
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {reviewsMetrics.map((metric, index) => (
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
          {/* Trending Review Themes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  🔥 Trending Review Themes This Week
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingThemes.map((theme, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTrendIcon(theme.trend)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">📈 "{theme.theme}" {theme.type}</p>
                          <Badge className={getTrendColor(theme.trend)}>
                            {theme.growth} {theme.mentions}
                          </Badge>
                          <Badge variant="outline">{theme.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{theme.insight}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                😊😐😞 Sentiment Distribution Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smile className="w-5 h-5 text-green-500" />
                      <span>Positive: {sentimentDistribution.positive.percentage}%</span>
                    </div>
                    <Badge className="text-green-600 bg-green-50">
                      ↗️ {sentimentDistribution.positive.change}% vs last week
                    </Badge>
                  </div>
                  <Progress value={sentimentDistribution.positive.percentage} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Meh className="w-5 h-5 text-yellow-500" />
                      <span>Neutral: {sentimentDistribution.neutral.percentage}%</span>
                    </div>
                    <Badge variant="outline">
                      ↔️ same as last week
                    </Badge>
                  </div>
                  <Progress value={sentimentDistribution.neutral.percentage} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Frown className="w-5 h-5 text-red-500" />
                      <span>Negative: {sentimentDistribution.negative.percentage}%</span>
                    </div>
                    <Badge className="text-green-600 bg-green-50">
                      ↘️ {sentimentDistribution.negative.change}% vs last week
                    </Badge>
                  </div>
                  <Progress value={sentimentDistribution.negative.percentage} className="h-2" />
                </div>

                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    🎯 <strong>Overall sentiment improving across all categories</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Review Analysis */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  📊 Featured Review Analysis
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
                    onClick={() => onAnalysisSelect(app)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">📱 {app.name}</h4>
                          <Badge variant="outline">{app.category}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{app.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3 text-sm">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4 text-blue-500" />
                            <span>{app.reviews} reviews analyzed</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {getSentimentIcon(app.sentiment)}
                            <span className={getSentimentColor(app.sentiment)}>
                              Sentiment: {app.sentiment}% positive
                            </span>
                          </div>
                        </div>

                        <div className="p-3 bg-blue-50 rounded-lg mb-3">
                          <span className="text-blue-800 text-sm">
                            🎯 <strong>Key Insight:</strong> {app.topInsight}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAnalysisSelect(app);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        🔍 Deep Dive
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        📊 Sentiment
                      </Button>
                      <Button variant="outline" size="sm">
                        <Target className="w-4 h-4 mr-1" />
                        💡 Insights
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
                ⚡ Quick Review Actions
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
          {/* Review Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">💬 Review Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={onMonitoringView}>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Alert Monitor
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={onCompetitiveView}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Competitive Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Search className="w-4 h-4 mr-2" />
                Keyword Explorer
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Sentiment Trends
              </Button>
            </CardContent>
          </Card>

          {/* Category Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📈 Category Review Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryInsights.map((insight, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{insight.category}:</span>
                    {getTrendIcon(insight.trend)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    💬 {insight.insight}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {insight.volume}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sentiment Score */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🎯 Today's Sentiment Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                68%
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Positive sentiment across all reviews
              </p>
              <Badge className="text-green-600 bg-green-50">
                ↗️ +3% improvement this week
              </Badge>
            </CardContent>
          </Card>

          {/* Insights Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">💡 Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Dark mode is the #1 feature request across categories</p>
              <p>• AI features drive highest user satisfaction</p>
              <p>• Mobile app quality directly impacts ratings</p>
              <p>• Pricing transparency crucial for retention</p>
              <p>• Voice interfaces becoming table stakes</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}