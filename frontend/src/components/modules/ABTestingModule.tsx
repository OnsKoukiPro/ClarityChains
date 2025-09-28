import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { 
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Play,
  Calendar,
  CheckCircle,
  Brain,
  Sparkles,
  TrendingUp,
  DollarSign,
  Target,
  Users,
  Zap,
  Edit,
  MoreHorizontal,
  Filter,
  Search,
  Download,
  Settings,
  Eye,
  BarChart3,
  PieChart,
  Activity,
  Rocket,
  Clock,
  Star
} from 'lucide-react';

interface ABTestingModuleProps {
  subPage: string;
  selectedApp: any;
  onSubPageChange: (page: string, appData?: any) => void;
  appContext: any;
  welcomeContext?: any;
}

// AB Test data structure
const abTests = [
  {
    id: 1,
    name: 'Premium Tier Pricing - MealPlanner',
    app: 'MealPlanner Pro',
    category: 'Paywall & Pricing',
    status: 'planned',
    priority: 'urgent',
    estimatedImpact: 23100,
    roi: 890,
    effort: 'low',
    effortScore: 2,
    confidence: 92,
    duration: '2 weeks',
    startDate: '2024-07-25',
    description: 'Test 3-tier pricing structure vs current 2-tier model',
    hypothesis: 'Adding a premium tier at $19.99/month will increase ARPU by 34% based on competitor analysis in Health & Fitness category',
    aiInsight: 'Competitor analysis shows 3-tier pricing increases ARPU by 34% in Health & Fitness category',
    metrics: {
      primaryMetric: 'Monthly Recurring Revenue',
      secondaryMetrics: ['ARPU', 'Conversion Rate', 'Churn Rate']
    },
    variants: [
      { name: 'Control', description: 'Current 2-tier pricing ($4.99, $9.99)' },
      { name: 'Variant A', description: '3-tier pricing ($4.99, $9.99, $19.99)' },
      { name: 'Variant B', description: '3-tier pricing ($2.99, $7.99, $14.99)' }
    ]
  },
  {
    id: 2,
    name: 'Paywall Pricing Test - FitTracker Pro',
    app: 'FitTracker Pro',
    category: 'Paywall & Pricing',
    status: 'urgent',
    priority: 'urgent',
    estimatedImpact: 12500,
    roi: 340,
    effort: 'medium',
    effortScore: 3,
    confidence: 85,
    duration: '3 weeks',
    startDate: '2024-07-18',
    description: 'Test weekly vs monthly pricing emphasis',
    hypothesis: 'Emphasizing weekly pricing ($2.99/week) vs monthly ($9.99/month) will increase conversion by 25%',
    aiInsight: 'Apps with weekly pricing emphasis show 23% higher conversion rates in fitness category',
    metrics: {
      primaryMetric: 'Subscription Conversion Rate',
      secondaryMetrics: ['Revenue Per User', 'Trial to Paid']
    },
    variants: [
      { name: 'Control', description: 'Monthly pricing emphasis ($9.99/month)' },
      { name: 'Variant', description: 'Weekly pricing emphasis ($2.99/week)' }
    ]
  },
  {
    id: 3,
    name: 'Onboarding Flow - StudyBuddy',
    app: 'StudyBuddy',
    category: 'Onboarding Flow',
    status: 'urgent',
    priority: 'urgent',
    estimatedImpact: 8200,
    roi: 180,
    effort: 'high',
    effortScore: 4,
    confidence: 78,
    duration: '4 weeks',
    startDate: '2024-07-20',
    description: 'Simplified 3-step vs current 6-step onboarding',
    hypothesis: 'Reducing onboarding from 6 steps to 3 steps will improve completion rate by 40%',
    aiInsight: 'Education apps with 3-step onboarding show 42% higher completion rates',
    metrics: {
      primaryMetric: 'Onboarding Completion Rate',
      secondaryMetrics: ['Time to First Value', 'Day 1 Retention']
    },
    variants: [
      { name: 'Control', description: '6-step onboarding with detailed setup' },
      { name: 'Variant', description: '3-step simplified onboarding' }
    ]
  },
  {
    id: 4,
    name: 'Push Notification Timing',
    app: 'TaskFlow Pro',
    category: 'Push Notifications',
    status: 'running',
    priority: 'high',
    estimatedImpact: 15600,
    roi: 280,
    effort: 'low',
    effortScore: 1,
    confidence: 88,
    duration: '2 weeks',
    startDate: '2024-07-10',
    description: 'Optimal timing for productivity reminders',
    hypothesis: 'Sending productivity reminders at 9 AM vs 2 PM will increase app opens by 35%',
    aiInsight: 'Productivity apps show 31% higher engagement with morning notifications',
    progress: 65,
    currentResults: {
      'Morning (9 AM)': { opens: 2840, conversion: '23.5%' },
      'Afternoon (2 PM)': { opens: 2156, conversion: '18.2%' }
    },
    metrics: {
      primaryMetric: 'App Opens from Notifications',
      secondaryMetrics: ['Session Duration', 'Task Completion']
    }
  },
  {
    id: 5,
    name: 'Feature Discovery Banner',
    app: 'PhotoEdit Pro',
    category: 'UI/UX Elements',
    status: 'running',
    priority: 'medium',
    estimatedImpact: 5400,
    roi: 120,
    effort: 'low',
    effortScore: 2,
    confidence: 72,
    duration: '1 week',
    startDate: '2024-07-12',
    description: 'AI feature discovery banner placement',
    hypothesis: 'Top banner vs bottom sheet for AI feature discovery will increase feature adoption by 20%',
    aiInsight: 'Photo editing apps see 18% higher feature adoption with persistent top banners',
    progress: 85,
    currentResults: {
      'Top Banner': { adoption: '34.2%', dismissal: '12.8%' },
      'Bottom Sheet': { adoption: '28.7%', dismissal: '8.4%' }
    },
    metrics: {
      primaryMetric: 'Feature Adoption Rate',
      secondaryMetrics: ['Banner CTR', 'Feature Engagement']
    }
  },
  {
    id: 6,
    name: 'App Store Screenshots A/B',
    app: 'MindfulMoments',
    category: 'App Store Listing',
    status: 'completed',
    priority: 'medium',
    estimatedImpact: 9800,
    roi: 450,
    effort: 'medium',
    effortScore: 3,
    confidence: 95,
    duration: '3 weeks',
    startDate: '2024-06-15',
    endDate: '2024-07-06',
    description: 'Screenshots with user testimonials vs feature-focused',
    hypothesis: 'Screenshots featuring user testimonials will increase app store conversion by 30%',
    aiInsight: 'Meditation apps with testimonial screenshots show 28% higher ASO conversion',
    finalResults: {
      winner: 'Testimonial Screenshots',
      uplift: '+32.4%',
      significance: '98.5%',
      'Control (Feature-focused)': { installs: 1247, cvr: '3.2%' },
      'Variant (Testimonials)': { installs: 1651, cvr: '4.2%' }
    },
    metrics: {
      primaryMetric: 'App Store Conversion Rate',
      secondaryMetrics: ['Install Rate', 'Screenshot CTR']
    }
  }
];

const growthMetrics = {
  activeTests: abTests.filter(t => t.status === 'running' || t.status === 'urgent').length,
  totalRevenueImpact: abTests.reduce((sum, test) => sum + test.estimatedImpact, 0),
  winRate: 72,
  avgImpact: 23,
  completedTests: abTests.filter(t => t.status === 'completed').length,
  totalROI: abTests.reduce((sum, test) => sum + (test.roi * test.estimatedImpact / 100), 0) / 1000
};

const aiRecommendations = [
  {
    id: 1,
    title: 'Freemium Model Test for TaskFlow Pro',
    description: 'Based on competitor analysis, testing a freemium model for TaskFlow Pro could increase signup conversion by 45%. Similar apps saw average revenue lift of $15K+ monthly.',
    confidence: 87,
    estimatedImpact: 15200,
    roi: 320,
    effort: 'high',
    category: 'Monetization Strategy',
    reasoning: 'Competitor apps with freemium models show 45% higher signup rates and 23% improvement in LTV'
  },
  {
    id: 2,
    title: 'Social Proof Integration',
    description: 'Adding user count and recent activity indicators could boost conversion by 28%. Apps in productivity category with social proof see consistent engagement increases.',
    confidence: 82,
    estimatedImpact: 8900,
    roi: 240,
    effort: 'medium',
    category: 'UI/UX Elements',
    reasoning: '73% of productivity apps with social proof elements report improved conversion metrics'
  },
  {
    id: 3,
    title: 'Progressive Disclosure Onboarding',
    description: 'Implementing progressive disclosure in onboarding could reduce drop-off by 35%. Education and productivity apps benefit most from this approach.',
    confidence: 79,
    estimatedImpact: 6700,
    roi: 190,
    effort: 'medium',
    category: 'Onboarding Flow',
    reasoning: 'Progressive disclosure reduces cognitive load and improves completion rates by 35% on average'
  }
];

export function ABTestingModule({ subPage, selectedApp, onSubPageChange, appContext, welcomeContext }: ABTestingModuleProps) {
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('roi');
  const [searchQuery, setSearchQuery] = useState('');

  if (subPage === 'test-detail' && selectedTest) {
    return <TestDetail test={selectedTest} onBack={() => onSubPageChange('')} />;
  }

  if (subPage === 'create-test') {
    return <CreateTest onBack={() => onSubPageChange('')} />;
  }

  // Filter and sort tests
  const filteredTests = abTests
    .filter(test => {
      const matchesStatus = statusFilter === 'all' || test.status === statusFilter;
      const matchesSearch = searchQuery === '' || 
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.app.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'roi':
          return b.roi - a.roi;
        case 'impact':
          return b.estimatedImpact - a.estimatedImpact;
        case 'priority':
          const priorityOrder = { urgent: 3, high: 2, medium: 1, low: 0 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

  const urgentTests = abTests.filter(test => test.priority === 'urgent');
  const runningTests = abTests.filter(test => test.status === 'running');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">🧪 AB Testing - Strategy & Growth</h1>
          <p className="text-muted-foreground">
            Data-driven growth optimization for mobile app success
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Zap className="w-4 h-4 mr-2" />
            Create Test
          </Button>
        </div>
      </div>

      {/* Quick Access Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button variant={statusFilter === 'urgent' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('urgent')}>
          🚨 Urgent Tests ({urgentTests.length})
        </Button>
        <Button variant={statusFilter === 'running' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('running')}>
          📈 Running ({runningTests.length})
        </Button>
        <Button variant={statusFilter === 'planned' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('planned')}>
          📋 Planned
        </Button>
        <Button variant={statusFilter === 'completed' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('completed')}>
          ✅ Completed
        </Button>
        <Button variant="outline" size="sm">
          💡 AI Ideas
        </Button>
      </div>

      {/* Urgent Priority Tests */}
      {urgentTests.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h2 className="text-lg font-semibold text-red-900">URGENT PRIORITY TESTS</h2>
            <Badge className="bg-red-100 text-red-800 border-red-300">
              {urgentTests.length} active
            </Badge>
          </div>
          
          <div className="space-y-4">
            {urgentTests.map((test) => (
              <Card key={test.id} className="bg-white border-red-200 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{test.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>🎯 {test.app}</span>
                        <Badge variant="outline">{test.category}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                      <Button className="bg-red-600 hover:bg-red-700">
                        <Rocket className="w-4 h-4 mr-1" />
                        Launch Test
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-lg font-bold text-green-600">+${(test.estimatedImpact / 1000).toFixed(1)}K/mo</p>
                      <p className="text-xs text-muted-foreground">Est. Revenue Impact</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-lg font-bold text-purple-600">{test.roi}%</p>
                      <p className="text-xs text-muted-foreground">ROI</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <p className="text-lg font-bold text-orange-600 capitalize">{test.effort}</p>
                      <p className="text-xs text-muted-foreground">Effort Level</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded">
                    <div className="flex items-start gap-2">
                      <Brain className="w-4 h-4 text-purple-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-700">
                          <strong>AI Insight:</strong> {test.aiInsight}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {test.confidence}% confidence
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Duration: {test.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Growth Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">🧪 Active Tests</p>
                <p className="text-2xl font-bold">{growthMetrics.activeTests}</p>
                <p className="text-xs text-muted-foreground">Running</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">💰 Revenue Impact</p>
                <p className="text-2xl font-bold">+${(growthMetrics.totalRevenueImpact / 1000).toFixed(0)}K/mo</p>
                <p className="text-xs text-green-600">Potential</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">🎯 Win Rate</p>
                <p className="text-2xl font-bold">{growthMetrics.winRate}%</p>
                <p className="text-xs text-muted-foreground">Success rate</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">📈 Avg Impact</p>
                <p className="text-2xl font-bold">+{growthMetrics.avgImpact}%</p>
                <p className="text-xs text-muted-foreground">Revenue lift</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="bg-gradient-to-r from-gray-50 to-purple-50 border-purple-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <CardTitle className="text-purple-900">🤖 AI Recommendations</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              View All →
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiRecommendations.slice(0, 2).map((rec) => (
              <div key={rec.id} className="p-4 bg-white border border-purple-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{rec.title}</h4>
                    <Badge variant="outline" className="text-xs mt-1">{rec.category}</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">+${(rec.estimatedImpact / 1000).toFixed(1)}K/mo</p>
                    <p className="text-xs text-purple-600">{rec.roi}% ROI</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {rec.confidence}% confidence
                    </Badge>
                    <span className="text-xs text-muted-foreground capitalize">{rec.effort} effort</span>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Zap className="w-4 h-4 mr-1" />
                    Create Test
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search tests or apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="urgent">🚨 Urgent</SelectItem>
            <SelectItem value="running">📈 Running</SelectItem>
            <SelectItem value="planned">📋 Planned</SelectItem>
            <SelectItem value="completed">✅ Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="roi">ROI Desc</SelectItem>
            <SelectItem value="impact">Impact Desc</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Test List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">📈 All Tests by Priority</h2>
          <div className="text-sm text-muted-foreground">
            Sort: {sortBy === 'roi' ? 'ROI Desc' : sortBy === 'impact' ? 'Impact Desc' : 'Priority'} ▼
          </div>
        </div>

        {filteredTests.map((test, index) => (
          <Card key={test.id} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{test.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-muted-foreground">🎯 {test.app}</span>
                      <Badge variant="outline">{test.category}</Badge>
                      <StatusBadge status={test.status} />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-lg font-bold text-green-600">+${(test.estimatedImpact / 1000).toFixed(1)}K/mo</p>
                  <p className="text-xs text-muted-foreground">Est. Impact</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-lg font-bold text-purple-600">{test.roi}%</p>
                  <p className="text-xs text-muted-foreground">ROI</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <EffortPill effort={test.effort} />
                  <p className="text-xs text-muted-foreground mt-1">Effort Level</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-lg font-bold text-blue-600">{test.confidence}%</p>
                  <p className="text-xs text-muted-foreground">Confidence</p>
                </div>
              </div>

              {test.status === 'running' && test.progress && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Test Progress</span>
                    <span className="text-sm text-muted-foreground">{test.progress}% complete</span>
                  </div>
                  <Progress value={test.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Started: {test.startDate} • Duration: {test.duration}
                  </p>
                </div>
              )}

              {test.status === 'planned' && (
                <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Start: {test.startDate} • Duration: {test.duration}</span>
                </div>
              )}

              <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded mb-4">
                <div className="flex items-start gap-2">
                  <Brain className="w-4 h-4 text-purple-600 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    <strong>AI Insight:</strong> {test.aiInsight}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {test.status === 'planned' && (
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Rocket className="w-4 h-4 mr-1" />
                    Start Test
                  </Button>
                )}
                {test.status === 'running' && (
                  <Button variant="outline">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    View Results
                  </Button>
                )}
                {test.status === 'completed' && (
                  <Button variant="outline">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Final Results
                  </Button>
                )}
                <Button variant="outline">
                  <Brain className="w-4 h-4 mr-1" />
                  AI Insights
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTests.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No tests found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 'Try adjusting your search or filters' : 'Create your first AB test to start optimizing'}
            </p>
            <Button>
              <Zap className="w-4 h-4 mr-2" />
              Create Your First Test
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    urgent: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', icon: '🚨', label: 'Urgent' },
    running: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', icon: '▶️', label: 'Running' },
    planned: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300', icon: '📋', label: 'Planned' },
    completed: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', icon: '✅', label: 'Completed' }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.planned;

  return (
    <Badge className={`${config.bg} ${config.text} ${config.border} border`}>
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  );
}

// Effort Pill Component
function EffortPill({ effort }: { effort: string }) {
  const effortConfig = {
    low: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
    high: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' }
  };

  const config = effortConfig[effort as keyof typeof effortConfig] || effortConfig.medium;

  return (
    <span className={`px-2 py-1 rounded text-sm font-medium ${config.bg} ${config.text} ${config.border} border capitalize`}>
      {effort}
    </span>
  );
}

// Test Detail Component
function TestDetail({ test, onBack }: { test: any, onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to AB Testing
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit Test
          </Button>
          <Button>
            <Rocket className="w-4 h-4 mr-2" />
            Launch Test
          </Button>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">{test.name}</h1>
        <p className="text-muted-foreground">Detailed test configuration and results</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Test Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Hypothesis</h4>
                <p className="text-sm text-muted-foreground">{test.hypothesis}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Test Variants</h4>
                <div className="space-y-2">
                  {test.variants.map((variant: any, index: number) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <h5 className="font-medium">{variant.name}</h5>
                      <p className="text-sm text-muted-foreground">{variant.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Success Metrics</h4>
                <div className="space-y-1">
                  <p className="text-sm"><strong>Primary:</strong> {test.metrics.primaryMetric}</p>
                  <p className="text-sm"><strong>Secondary:</strong> {test.metrics.secondaryMetrics.join(', ')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Test Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <StatusBadge status={test.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Priority</span>
                <Badge className="capitalize">{test.priority}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Estimated Impact</span>
                <span className="font-medium">+${(test.estimatedImpact / 1000).toFixed(1)}K/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">ROI</span>
                <span className="font-medium">{test.roi}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Effort</span>
                <EffortPill effort={test.effort} />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Duration</span>
                <span className="font-medium">{test.duration}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded">
                <div className="flex items-start gap-2">
                  <Brain className="w-4 h-4 text-purple-600 mt-0.5" />
                  <p className="text-sm text-gray-700">{test.aiInsight}</p>
                </div>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    {test.confidence}% confidence
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Create Test Component
function CreateTest({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to AB Testing
        </Button>
        <Button>
          <Rocket className="w-4 h-4 mr-2" />
          Launch Test
        </Button>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Create New AB Test</h1>
        <p className="text-muted-foreground">
          Set up your test configuration and variants
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🧪 Test Creation Wizard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Zap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">AB Test Creation</h3>
            <p className="text-muted-foreground mb-4">
              Step-by-step wizard to create and configure your AB test
            </p>
            <Button>
              <Sparkles className="w-4 h-4 mr-2" />
              Start Test Wizard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}