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
  MessageSquare, 
  TrendingUp,
  Target,
  BarChart3,
  Users,
  Star,
  Smile,
  Meh,
  Frown,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Lightbulb,
  Eye,
  Clock
} from 'lucide-react';

interface ReviewsAnalysisProps {
  app: any;
  onBack: () => void;
  onSentimentView: () => void;
  onCategoriesView: () => void;
}

const reviewOverview = {
  totalReviews: 12847,
  monthlyReviews: 1234,
  ratingTrend: { from: 4.3, to: 4.4 },
  responseRate: 89
};

const sentimentData = {
  positive: {
    percentage: 73,
    change: '+5',
    examples: [
      'Love the flexibility and customization options',
      'Great for teams, replaces multiple tools',
      'Powerful database features'
    ]
  },
  neutral: {
    percentage: 15,
    change: '0',
    description: 'General usage questions and feature clarifications'
  },
  negative: {
    percentage: 12,
    change: '-5',
    examples: [
      'Mobile app is slow and limited',
      'Steep learning curve for new users',
      'Offline functionality needs improvement'
    ]
  }
};

const topKeywords = {
  positive: [
    { keyword: 'flexible', mentions: 2847, growth: '+23%' },
    { keyword: 'powerful', mentions: 2156, growth: '+18%' },
    { keyword: 'customizable', mentions: 1923, growth: '+31%' },
    { keyword: 'replaces everything', mentions: 1445, growth: '+67%' },
    { keyword: 'team collaboration', mentions: 1289, growth: '+12%' }
  ],
  negative: [
    { keyword: 'slow mobile app', mentions: 1567, growth: '+89%' },
    { keyword: 'confusing', mentions: 1234, growth: '-12%' },
    { keyword: 'expensive', mentions: 987, growth: '+34%' },
    { keyword: 'offline issues', mentions: 876, growth: '+156%' },
    { keyword: 'learning curve', mentions: 734, growth: '-8%' }
  ]
};

const featureRequests = [
  {
    feature: 'Improved Mobile App',
    requests: 1456,
    priority: 'Critical',
    description: 'Mobile version needs to match desktop functionality',
    color: 'text-red-600 bg-red-50'
  },
  {
    feature: 'Better Offline Mode',
    requests: 987,
    priority: 'High',
    description: 'Need to work offline and sync when connected',
    color: 'text-yellow-600 bg-yellow-50'
  },
  {
    feature: 'Faster Loading Times',
    requests: 834,
    priority: 'High',
    description: 'App takes too long to load large databases',
    color: 'text-yellow-600 bg-yellow-50'
  },
  {
    feature: 'More Templates',
    requests: 567,
    priority: 'Medium',
    description: 'Need industry-specific templates and examples',
    color: 'text-green-600 bg-green-50'
  },
  {
    feature: 'AI Writing Assistant',
    requests: 445,
    priority: 'Medium',
    description: 'Would love AI help with content creation',
    color: 'text-green-600 bg-green-50'
  }
];

const aiInsights = {
  workingWell: [
    'Core value proposition strongly resonates with users',
    'Team collaboration features highly appreciated',
    'Flexibility and customization are key differentiators',
    'Power users become strong advocates and refer others'
  ],
  criticalIssues: [
    'Mobile app performance gap hurting user experience',
    'Offline functionality becoming table stakes',
    'Pricing perception issues in competitive market',
    'Onboarding complexity creating early churn'
  ],
  recommendations: [
    'Prioritize mobile app redesign and performance',
    'Implement robust offline-first architecture',
    'Create guided onboarding for different user types',
    'Consider value-based pricing communication',
    'Develop industry-specific templates for faster wins'
  ],
  estimatedImpact: {
    ratingImprovement: 4.6,
    sentimentReduction: 60
  }
};

const ratingDistribution = [
  { stars: 5, percentage: 45, count: 5781 },
  { stars: 4, percentage: 28, count: 3597 },
  { stars: 3, percentage: 15, count: 1927 },
  { stars: 2, percentage: 7, count: 899 },
  { stars: 1, percentage: 5, count: 643 }
];

export function ReviewsAnalysis({ app, onBack, onSentimentView, onCategoriesView }: ReviewsAnalysisProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Default app data if none provided
  const appData = app || {
    name: 'Notion',
    company: 'Notion Labs, Inc.',
    category: 'Productivity',
    rating: 4.3,
    reviews: 12847,
    analysisScore: 87
  };

  const getSentimentIcon = (type: string) => {
    switch (type) {
      case 'positive': return <Smile className="w-5 h-5 text-green-500" />;
      case 'neutral': return <Meh className="w-5 h-5 text-yellow-500" />;
      case 'negative': return <Frown className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  const getGrowthColor = (growth: string) => {
    if (growth.startsWith('+')) return 'text-red-600';
    if (growth.startsWith('-')) return 'text-green-600';
    return 'text-gray-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-yellow-600 bg-yellow-50';
      case 'medium': return 'text-green-600 bg-green-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Reviews Hub
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onSentimentView}>
            <BarChart3 className="w-4 h-4 mr-2" />
            📊 Sentiment Timeline
          </Button>
          <Button variant="outline" onClick={onCategoriesView}>
            <Target className="w-4 h-4 mr-2" />
            🏷️ Categories
          </Button>
          <Button variant="outline">
            <Share className="w-4 h-4 mr-2" />
            📤 Export
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
                  {appData.name} - Review Intelligence Analysis
                </CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <span>{appData.company}</span>
                  <span>•</span>
                  <span>{appData.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">{appData.rating}</span>
                    <span className="text-muted-foreground">({appData.reviews.toLocaleString()})</span>
                  </div>
                  <Badge className="text-blue-600 bg-blue-50">
                    Review Analysis Score: {appData.analysisScore}/100
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Review Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Reviews</p>
            <p className="text-2xl font-semibold">{reviewOverview.totalReviews.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">This Month New Reviews</p>
            <p className="text-2xl font-semibold">{reviewOverview.monthlyReviews.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Avg Rating Trend</p>
            <p className="text-2xl font-semibold text-green-600">
              {reviewOverview.ratingTrend.from} → {reviewOverview.ratingTrend.to}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Response Rate</p>
            <p className="text-2xl font-semibold">{reviewOverview.responseRate}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="keywords">Keywords & Themes</TabsTrigger>
          <TabsTrigger value="features">Feature Requests</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Sentiment Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>😊😐😞 Sentiment Analysis (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Positive Sentiment */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Smile className="w-5 h-5 text-green-500" />
                        <span className="font-medium">Positive: {sentimentData.positive.percentage}%</span>
                      </div>
                      <Badge className="text-green-600 bg-green-50">
                        ↗️ {sentimentData.positive.change}% vs previous month
                      </Badge>
                    </div>
                    <Progress value={sentimentData.positive.percentage} className="h-2 mb-3" />
                    <div className="space-y-1">
                      {sentimentData.positive.examples.map((example, index) => (
                        <p key={index} className="text-sm text-green-700">• "{example}"</p>
                      ))}
                    </div>
                  </div>

                  {/* Neutral Sentiment */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Meh className="w-5 h-5 text-yellow-500" />
                        <span className="font-medium">Neutral: {sentimentData.neutral.percentage}%</span>
                      </div>
                      <Badge variant="outline">↔️ stable</Badge>
                    </div>
                    <Progress value={sentimentData.neutral.percentage} className="h-2 mb-3" />
                    <p className="text-sm text-muted-foreground">• {sentimentData.neutral.description}</p>
                  </div>

                  {/* Negative Sentiment */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Frown className="w-5 h-5 text-red-500" />
                        <span className="font-medium">Negative: {sentimentData.negative.percentage}%</span>
                      </div>
                      <Badge className="text-green-600 bg-green-50">
                        ↘️ {sentimentData.negative.change}% improvement
                      </Badge>
                    </div>
                    <Progress value={sentimentData.negative.percentage} className="h-2 mb-3" />
                    <div className="space-y-1">
                      {sentimentData.negative.examples.map((example, index) => (
                        <p key={index} className="text-sm text-red-700">• "{example}"</p>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rating Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>⭐ Rating Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ratingDistribution.map((rating) => (
                    <div key={rating.stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-12">
                        <span className="text-sm">{rating.stars}</span>
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      </div>
                      <div className="flex-1">
                        <Progress value={rating.percentage} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground w-16 text-right">
                        {rating.percentage}%
                      </div>
                      <div className="text-sm text-muted-foreground w-16 text-right">
                        ({rating.count})
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          {/* Keywords Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>🔍 Top Keywords & Themes Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Most Praised */}
                <div>
                  <h4 className="font-semibold text-green-700 mb-4">👍 MOST PRAISED (Positive Keywords):</h4>
                  <div className="space-y-3">
                    {topKeywords.positive.map((keyword, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium">{index + 1}. "{keyword.keyword}"</p>
                          <p className="text-sm text-muted-foreground">
                            mentioned {keyword.mentions.toLocaleString()}x
                          </p>
                        </div>
                        <Badge className={getGrowthColor(keyword.growth) + ' bg-white'}>
                          {keyword.growth}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Most Criticized */}
                <div>
                  <h4 className="font-semibold text-red-700 mb-4">👎 MOST CRITICIZED (Negative Keywords):</h4>
                  <div className="space-y-3">
                    {topKeywords.negative.map((keyword, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium">{index + 1}. "{keyword.keyword}"</p>
                          <p className="text-sm text-muted-foreground">
                            mentioned {keyword.mentions.toLocaleString()}x
                          </p>
                        </div>
                        <Badge className={getGrowthColor(keyword.growth) + ' bg-white'}>
                          {keyword.growth}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          {/* Feature Requests */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Feature Request Analysis</CardTitle>
              <p className="text-muted-foreground">
                User-driven feature prioritization based on review analysis
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featureRequests.map((feature, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{index + 1}. {feature.feature}</h4>
                          <span className="text-muted-foreground">({feature.requests} requests)</span>
                          <Badge className={getPriorityColor(feature.priority)}>
                            {feature.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          "{feature.description}"
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${Math.min((feature.requests / 1500) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle>🤖 AI Review Insights & Recommendations</CardTitle>
              <p className="text-muted-foreground">
                Machine learning analysis of review patterns and strategic recommendations
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* What's Working Well */}
              <div>
                <h4 className="font-semibold text-green-700 mb-3">📈 WHAT'S WORKING WELL:</h4>
                <ul className="space-y-2">
                  {aiInsights.workingWell.map((insight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span className="text-sm">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Critical Issues */}
              <div>
                <h4 className="font-semibold text-red-700 mb-3">⚠️ CRITICAL ISSUES TO ADDRESS:</h4>
                <ul className="space-y-2">
                  {aiInsights.criticalIssues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span className="text-sm">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Strategic Recommendations */}
              <div>
                <h4 className="font-semibold text-blue-700 mb-3">🎯 STRATEGIC RECOMMENDATIONS:</h4>
                <ol className="space-y-2">
                  {aiInsights.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">{index + 1}.</span>
                      <span className="text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Estimated Impact */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">📊 ESTIMATED IMPACT:</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    Addressing top 3 issues could improve rating to{' '}
                    <span className="font-semibold text-blue-700">
                      {aiInsights.estimatedImpact.ratingImprovement}⭐
                    </span>
                  </p>
                  <p>
                    and reduce negative sentiment by{' '}
                    <span className="font-semibold text-blue-700">
                      {aiInsights.estimatedImpact.sentimentReduction}%
                    </span>
                  </p>
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
              <MessageSquare className="w-4 h-4 mr-2" />
              💬 View Raw Reviews
            </Button>
            <Button variant="outline" onClick={onSentimentView}>
              <BarChart3 className="w-4 h-4 mr-2" />
              📊 Sentiment Timeline
            </Button>
            <Button variant="outline">
              <Target className="w-4 h-4 mr-2" />
              🔍 Keyword Deep Dive
            </Button>
            <Button variant="outline" onClick={onCategoriesView}>
              <AlertTriangle className="w-4 h-4 mr-2" />
              ⚠️ Issue Tracker
            </Button>
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              📈 Competitor Comparison
            </Button>
            <Button variant="outline">
              <Lightbulb className="w-4 h-4 mr-2" />
              💡 Action Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}