import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { 
  ArrowLeft, 
  Download, 
  Search,
  AlertTriangle,
  Target,
  TrendingUp,
  TrendingDown,
  Bug,
  Lightbulb,
  Heart,
  DollarSign,
  GraduationCap,
  Building
} from 'lucide-react';

interface ReviewsCategoriesProps {
  app: any;
  onBack: () => void;
}

const categoryDistribution = [
  { category: 'Bugs & Issues', percentage: 28, count: 3597, icon: Bug, color: 'text-red-500' },
  { category: 'Feature Requests', percentage: 24, count: 3083, icon: Lightbulb, color: 'text-blue-500' },
  { category: 'General Praise', percentage: 22, count: 2826, icon: Heart, color: 'text-green-500' },
  { category: 'Pricing Feedback', percentage: 12, count: 1542, icon: DollarSign, color: 'text-purple-500' },
  { category: 'Usability/Learning', percentage: 8, count: 1028, icon: GraduationCap, color: 'text-yellow-500' },
  { category: 'Business Use Cases', percentage: 6, count: 771, icon: Building, color: 'text-gray-500' }
];

const criticalIssues = [
  {
    issue: 'Mobile App Crashes',
    count: 456,
    trend: 'up',
    growth: '+89%',
    severity: 'Critical',
    description: 'App crashing frequently after latest update'
  },
  {
    issue: 'Slow Loading Times',
    count: 234,
    trend: 'up',
    growth: '+45%',
    severity: 'High',
    description: 'Pages taking too long to load, especially on mobile'
  },
  {
    issue: 'Offline Sync Issues',
    count: 189,
    trend: 'up',
    growth: '+67%',
    severity: 'High',
    description: 'Changes not syncing properly when offline'
  },
  {
    issue: 'Login Problems',
    count: 123,
    trend: 'down',
    growth: '-12%',
    severity: 'High',
    description: 'Users unable to log in or frequent logouts'
  },
  {
    issue: 'Data Loss Reports',
    count: 45,
    trend: 'up',
    growth: '+156%',
    severity: 'Critical',
    description: 'Users reporting lost data after syncing'
  },
  {
    issue: 'Search Not Working',
    count: 89,
    trend: 'up',
    growth: '+23%',
    severity: 'Medium',
    description: 'Search function returning incorrect results'
  },
  {
    issue: 'Image Upload Fails',
    count: 67,
    trend: 'stable',
    growth: '0%',
    severity: 'Medium',
    description: 'Images failing to upload or display properly'
  }
];

const featureRequests = [
  {
    feature: 'Better Mobile App',
    mentions: 1456,
    impact: 'High',
    priority: 'P0',
    description: 'Mobile version needs feature parity with desktop'
  },
  {
    feature: 'Improved Offline Mode',
    mentions: 987,
    impact: 'Medium',
    priority: 'P1',
    description: 'Better offline functionality and sync capabilities'
  },
  {
    feature: 'AI Writing Assistant',
    mentions: 834,
    impact: 'Low',
    priority: 'P2',
    description: 'AI-powered content creation and editing assistance'
  },
  {
    feature: 'More Templates',
    mentions: 567,
    impact: 'Low',
    priority: 'P3',
    description: 'Industry-specific templates and examples'
  },
  {
    feature: 'API Integrations',
    mentions: 445,
    impact: 'Medium',
    priority: 'P2',
    description: 'Better integration with third-party services'
  },
  {
    feature: 'Advanced Analytics',
    mentions: 389,
    impact: 'Low',
    priority: 'P3',
    description: 'More detailed usage analytics and insights'
  },
  {
    feature: 'Audio/Video Support',
    mentions: 234,
    impact: 'Low',
    priority: 'P4',
    description: 'Native audio and video playback support'
  },
  {
    feature: 'Dark Mode Improvements',
    mentions: 189,
    impact: 'Low',
    priority: 'P4',
    description: 'Better dark mode implementation and customization'
  }
];

const positiveThemes = [
  {
    theme: 'Flexibility & Customization',
    mentions: 2847,
    description: 'Can adapt Notion to any workflow or use case',
    keyPhrases: ['flexible', 'customizable', 'adaptable']
  },
  {
    theme: 'All-in-One Solution',
    mentions: 2156,
    description: 'Replaces multiple tools, everything in one place',
    keyPhrases: ['replaces everything', 'one tool']
  },
  {
    theme: 'Team Collaboration',
    mentions: 1923,
    description: 'Great for team projects and knowledge sharing',
    keyPhrases: ['team friendly', 'collaboration']
  },
  {
    theme: 'Database Functionality',
    mentions: 1445,
    description: 'Powerful database features with simple interface',
    keyPhrases: ['databases', 'relations', 'powerful']
  }
];

const quickSearches = [
  { label: '🐛 Recent Bugs', count: 456 },
  { label: '💡 Feature Ideas', count: 834 },
  { label: '😞 Complaints', count: 567 },
  { label: '😊 Praise', count: 2826 },
  { label: '💰 Pricing', count: 1542 },
  { label: '📱 Mobile Issues', count: 789 }
];

export function ReviewsCategories({ app, onBack }: ReviewsCategoriesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedSentiment, setSelectedSentiment] = useState('all');
  const [selectedDate, setSelectedDate] = useState('30d');

  // Default app data if none provided
  const appData = app || {
    name: 'Notion',
    category: 'Productivity'
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-yellow-600 bg-yellow-50';
      case 'medium': return 'text-green-600 bg-green-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'P0') return 'text-red-600 bg-red-50';
    if (priority === 'P1') return 'text-orange-600 bg-orange-50';
    if (priority === 'P2') return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-green-500" />;
    return <div className="w-4 h-4 rounded-full bg-gray-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Review Analysis
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <AlertTriangle className="w-4 h-4 mr-2" />
            ⚠️ Create Issue Alert
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            📊 Export Category Report
          </Button>
        </div>
      </div>

      {/* Page Title */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🏷️ Automated Review Categorization System</CardTitle>
          <p className="text-muted-foreground">
            AI-powered review classification and issue tracking for {appData.name}
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Review Categories Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <p className="text-sm text-muted-foreground">Donut Chart showing category breakdown</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryDistribution.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <category.icon className={`w-5 h-5 ${category.color}`} />
                        <div>
                          <p className="font-medium">{category.category}:</p>
                          <p className="text-sm text-muted-foreground">
                            {category.count.toLocaleString()} reviews
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {category.percentage}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Critical Issues Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle>🐛 Critical Issues Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Issue Category</th>
                      <th className="text-center p-3">Count</th>
                      <th className="text-center p-3">Trend</th>
                      <th className="text-center p-3">Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {criticalIssues.map((issue, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">📱 {issue.issue}</p>
                            <p className="text-xs text-muted-foreground">{issue.description}</p>
                          </div>
                        </td>
                        <td className="p-3 text-center font-medium">{issue.count}</td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {getTrendIcon(issue.trend)}
                            <span className={issue.trend === 'up' ? 'text-red-600' : issue.trend === 'down' ? 'text-green-600' : 'text-gray-600'}>
                              {issue.growth}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <Badge className={getSeverityColor(issue.severity)}>
                            {issue.severity === 'Critical' && '🔴'} {issue.severity}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Feature Request Prioritization */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Feature Request Prioritization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Feature Request</th>
                      <th className="text-center p-3">Mentions</th>
                      <th className="text-center p-3">User Impact</th>
                      <th className="text-center p-3">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featureRequests.map((request, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">📱 {request.feature}</p>
                            <p className="text-xs text-muted-foreground">{request.description}</p>
                          </div>
                        </td>
                        <td className="p-3 text-center font-medium">{request.mentions}</td>
                        <td className="p-3 text-center">
                          <Badge className={getImpactColor(request.impact)}>
                            {request.impact === 'High' && '🔴'} {request.impact}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          <Badge className={getPriorityColor(request.priority)}>
                            {request.priority}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Positive Feedback Themes */}
          <Card>
            <CardHeader>
              <CardTitle>😊 Positive Feedback Themes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-semibold text-green-700">🎯 WHAT USERS LOVE MOST:</h4>
                
                {positiveThemes.map((theme, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{index + 1}. {theme.theme}</h5>
                        <Badge variant="outline">{theme.mentions.toLocaleString()} mentions</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        "{theme.description}"
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-sm font-medium">Key phrases:</span>
                        {theme.keyPhrases.map((phrase, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            "{phrase}"
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    💡 <strong>INSIGHT:</strong> Users value flexibility above all else. 
                    This should remain the core value proposition.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Search & Filtering */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🔍 Review Search & Filtering</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search reviews for keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Filters:</label>
                  <div className="grid grid-cols-1 gap-2 mt-1">
                    <Select value={selectedRating} onValueChange={setSelectedRating}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Rating: All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="5">5 stars</SelectItem>
                        <SelectItem value="4">4 stars</SelectItem>
                        <SelectItem value="3">3 stars</SelectItem>
                        <SelectItem value="2">2 stars</SelectItem>
                        <SelectItem value="1">1 star</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Sentiment: All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sentiment</SelectItem>
                        <SelectItem value="positive">Positive</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="negative">Negative</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedDate} onValueChange={setSelectedDate}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Date: Last 30d" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                        <SelectItem value="90d">Last 90 days</SelectItem>
                        <SelectItem value="1y">Last year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Quick Searches:</label>
                  <div className="grid grid-cols-1 gap-1 mt-1">
                    {quickSearches.map((search, index) => (
                      <Button key={index} variant="ghost" size="sm" className="justify-start text-xs h-8">
                        {search.label} ({search.count})
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📊 Category Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Critical Issues:</span>
                  <span className="font-medium text-red-600">701</span>
                </div>
                <div className="flex justify-between">
                  <span>Feature Requests:</span>
                  <span className="font-medium text-blue-600">3,083</span>
                </div>
                <div className="flex justify-between">
                  <span>Positive Mentions:</span>
                  <span className="font-medium text-green-600">2,826</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Response Time:</span>
                  <span className="font-medium">18.7 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">⚡ Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-sm">
                <Lightbulb className="w-4 h-4 mr-2" />
                💡 Generate Action Plan
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                <Target className="w-4 h-4 mr-2" />
                📈 Track Progress
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                ⚠️ Set Issue Alerts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}