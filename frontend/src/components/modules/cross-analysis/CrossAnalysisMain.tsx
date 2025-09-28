import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Zap,
  Search,
  Eye,
  ArrowRight,
  Star,
  Activity,
  PieChart,
  Users,
  DollarSign,
  MessageSquare,
  Palette,
  Type,
  Globe,
  Settings
} from 'lucide-react';

interface CrossAnalysisMainProps {
  onReportSelect: (app: any) => void;
  onCompetitiveView: () => void;
  onStrategyView: () => void;
}

const crossAnalysisMetrics = [
  { label: 'Apps Analyzed', value: '2,847', icon: BarChart3, color: 'text-blue-500' },
  { label: 'Cross-Module Insights', value: '15,678', icon: Target, color: 'text-green-500' },
  { label: 'Predictive Models', value: '23', icon: TrendingUp, color: 'text-purple-500' },
  { label: 'Success Patterns', value: '456', icon: Zap, color: 'text-primary' }
];

const moduleIntegrations = [
  { 
    module: 'Explorer', 
    icon: Search, 
    color: 'text-blue-500 bg-blue-50', 
    insights: '2,847 apps',
    connection: 'Performance data and app metrics'
  },
  { 
    module: 'Trends', 
    icon: TrendingUp, 
    color: 'text-green-500 bg-green-50', 
    insights: '15,678 trends',
    connection: 'Market trend correlation and timing'
  },
  { 
    module: 'Creative', 
    icon: Palette, 
    color: 'text-purple-500 bg-purple-50', 
    insights: '8,934 designs',
    connection: 'Visual performance and design impact'
  },
  { 
    module: 'ASO', 
    icon: Type, 
    color: 'text-indigo-500 bg-indigo-50', 
    insights: '45,123 keywords',
    connection: 'Search optimization and discoverability'
  },
  { 
    module: 'Paywall', 
    icon: DollarSign, 
    color: 'text-yellow-500 bg-yellow-50', 
    insights: '1,234 strategies',
    connection: 'Monetization effectiveness and pricing'
  },
  { 
    module: 'Reviews', 
    icon: MessageSquare, 
    color: 'text-red-500 bg-red-50', 
    insights: '2.4M reviews',
    connection: 'User sentiment and satisfaction drivers'
  },
  { 
    module: 'Markets', 
    icon: Globe, 
    color: 'text-teal-500 bg-teal-50', 
    insights: '67 markets',
    connection: 'Global opportunities and expansion'
  },
  { 
    module: 'Features', 
    icon: Settings, 
    color: 'text-gray-500 bg-gray-50', 
    insights: '12,456 features',
    connection: 'Feature effectiveness and user demand'
  }
];

const holisticInsights = [
  {
    title: 'AI Features Drive 3.4x Higher Engagement',
    modules: ['Explorer', 'Trends', 'Reviews'],
    confidence: 94,
    impact: 'High',
    description: 'Apps with AI features show 3.4x higher user engagement across all categories, with 89% positive review sentiment when properly implemented.'
  },
  {
    title: 'Dark Mode Increases Retention by 23%',
    modules: ['Creative', 'Reviews', 'Features'],
    confidence: 87,
    impact: 'Medium',
    description: 'Visual analysis shows dark mode implementation correlates with 23% better retention and 156% more positive design feedback.'
  },
  {
    title: 'Voice Commands = 45% Higher Premium Conversion',
    modules: ['ASO', 'Paywall', 'Trends'],
    confidence: 91,
    impact: 'High',
    description: 'Apps with voice features see 45% higher premium conversion rates and rank higher for modern UX keywords.'
  },
  {
    title: 'Mobile-First Design Critical in APAC Markets',
    modules: ['Markets', 'Creative', 'Reviews'],
    confidence: 96,
    impact: 'Critical',
    description: 'APAC markets show 3x higher churn for apps without mobile-optimized experiences, especially in productivity category.'
  }
];

const featuredApps = [
  {
    id: 1,
    name: 'Notion',
    category: 'Productivity',
    overallScore: 87,
    modules: {
      explorer: 89,
      trends: 78,
      creative: 65,
      aso: 91,
      paywall: 83,
      reviews: 73,
      markets: 69,
      features: 92
    },
    keyInsight: 'Strong feature depth but mobile experience gaps limit growth',
    opportunities: ['Mobile optimization', 'Simplified onboarding', 'AI features']
  },
  {
    id: 2,
    name: 'Calm',
    category: 'Health & Wellness',
    overallScore: 94,
    modules: {
      explorer: 96,
      trends: 89,
      creative: 98,
      aso: 87,
      paywall: 91,
      reviews: 81,
      markets: 76,
      features: 85
    },
    keyInsight: 'Premium positioning with excellent design and strong monetization',
    opportunities: ['Global expansion', 'AI personalization', 'Community features']
  },
  {
    id: 3,
    name: 'Duolingo',
    category: 'Education',
    overallScore: 96,
    modules: {
      explorer: 94,
      trends: 91,
      creative: 89,
      aso: 98,
      paywall: 87,
      reviews: 83,
      markets: 95,
      features: 92
    },
    keyInsight: 'Gamification leader with strong global presence and engagement',
    opportunities: ['Advanced AI tutoring', 'Business market', 'Voice features']
  }
];

const strategicRecommendations = [
  {
    priority: 'Critical',
    title: 'Implement AI-Powered Personalization',
    impact: '+234% user engagement',
    effort: 'High',
    timeline: '3-6 months',
    modules: ['Trends', 'Reviews', 'Features'],
    description: 'AI personalization is becoming table stakes across all categories'
  },
  {
    priority: 'High',
    title: 'Optimize Mobile Experience',
    impact: '+45% retention',
    effort: 'Medium',
    timeline: '2-4 months',
    modules: ['Creative', 'Reviews', 'Markets'],
    description: 'Mobile-first design critical for global market success'
  },
  {
    priority: 'Medium',
    title: 'Add Voice Interface',
    impact: '+67% premium conversion',
    effort: 'Medium',
    timeline: '4-8 months',
    modules: ['ASO', 'Paywall', 'Trends'],
    description: 'Voice commands driving higher monetization and modern UX perception'
  }
];

export function CrossAnalysisMain({ onReportSelect, onCompetitiveView, onStrategyView }: CrossAnalysisMainProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getModuleScore = (app: any, module: string) => {
    return app.modules[module] || 0;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
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
            placeholder="Search cross-module insights..."
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
          </SelectContent>
        </Select>
        <Button onClick={onCompetitiveView} variant="outline">
          <BarChart3 className="w-4 h-4 mr-2" />
          Competitive Analysis
        </Button>
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {crossAnalysisMetrics.map((metric, index) => (
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
          {/* Module Integration Matrix */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔄 Cross-Module Intelligence Matrix
              </CardTitle>
              <p className="text-muted-foreground">
                Unified insights from all 8 intelligence modules
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {moduleIntegrations.map((integration, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${integration.color}`}>
                      <integration.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{integration.module}</p>
                      <p className="text-sm text-muted-foreground">{integration.insights}</p>
                      <p className="text-xs text-muted-foreground mt-1">{integration.connection}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Holistic Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💡 Holistic Market Insights
              </CardTitle>
              <p className="text-muted-foreground">
                Cross-validated insights from multiple intelligence sources
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {holisticInsights.map((insight, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">{insight.title}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-muted-foreground">Connected modules:</span>
                          <div className="flex gap-1">
                            {insight.modules.map((module, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {module}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">Confidence:</span>
                            <span className="text-sm text-green-600">{insight.confidence}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">Impact:</span>
                            <Badge className={getImpactColor(insight.impact)}>
                              {insight.impact}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Multi-Module App Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎯 Featured Cross-Module App Analysis
              </CardTitle>
              <p className="text-muted-foreground">
                Comprehensive analysis across all intelligence modules
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredApps.map((app) => (
                  <div 
                    key={app.id}
                    className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={() => onReportSelect(app)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">📱 {app.name}</h4>
                          <Badge variant="outline">{app.category}</Badge>
                          <div className="flex items-center gap-1">
                            <span className="text-sm">Overall Score:</span>
                            <span className={`font-medium ${getScoreColor(app.overallScore)}`}>
                              {app.overallScore}/100
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-2 mb-3">
                          {Object.entries(app.modules).map(([module, score]) => (
                            <div key={module} className="text-center">
                              <p className="text-xs text-muted-foreground capitalize">{module}</p>
                              <p className={`text-sm font-medium ${getScoreColor(score as number)}`}>
                                {score}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="p-3 bg-blue-50 rounded-lg mb-3">
                          <p className="text-sm text-blue-800">
                            🎯 <strong>Key Insight:</strong> {app.keyInsight}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          <span className="text-sm font-medium">Opportunities:</span>
                          {app.opportunities.map((opportunity, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {opportunity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onReportSelect(app);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        📊 Full Report
                      </Button>
                      <Button variant="outline" size="sm">
                        <Target className="w-4 h-4 mr-1" />
                        💡 Strategy
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        📈 Compare
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Strategic Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🎯 Strategic Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {strategicRecommendations.map((rec, index) => (
                <div key={index} className="border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{rec.timeline}</span>
                  </div>
                  <h5 className="font-medium text-sm mb-1">{rec.title}</h5>
                  <p className="text-xs text-green-600 mb-2">{rec.impact}</p>
                  <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {rec.modules.map((module, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {module}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Analysis Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🔧 Analysis Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={onCompetitiveView}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Competitive Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={onStrategyView}>
                <Target className="w-4 h-4 mr-2" />
                Strategic Planning
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trend Correlation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <PieChart className="w-4 h-4 mr-2" />
                Market Mapping
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📊 Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Cross-Module Insights:</span>
                  <span className="font-medium">15,678</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Patterns:</span>
                  <span className="font-medium">456</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Analysis Score:</span>
                  <span className="font-medium text-green-600">87/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Opportunities Found:</span>
                  <span className="font-medium">2,347</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}