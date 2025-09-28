import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { 
  ArrowLeft, 
  Download, 
  Share, 
  Star,
  TrendingUp,
  Target,
  BarChart3,
  Users,
  DollarSign,
  MessageSquare,
  Palette,
  Type,
  Globe,
  Settings,
  Search,
  Zap,
  AlertTriangle,
  CheckCircle,
  Activity
} from 'lucide-react';

interface CrossAnalysisReportProps {
  app: any;
  onBack: () => void;
  onStrategyView: () => void;
}

const moduleAnalysis = {
  explorer: {
    icon: Search,
    score: 89,
    insights: [
      'Strong performance metrics with 180K downloads',
      'Above-average user retention at 89%',
      'Growing market position in health category'
    ],
    opportunities: ['Expand feature set', 'Improve onboarding', 'Add social features']
  },
  trends: {
    icon: TrendingUp,
    score: 78,
    insights: [
      'Aligned with AI personalization mega-trend',
      'Voice interface adoption ahead of curve',
      'Health tech momentum supporting growth'
    ],
    opportunities: ['Leverage AI trend', 'Expand voice features', 'Ride health wave']
  },
  creative: {
    icon: Palette,
    score: 65,
    insights: [
      'Clean design but lacks visual distinction',
      'Good color psychology usage',
      'Mobile experience needs improvement'
    ],
    opportunities: ['Distinctive branding', 'Mobile redesign', 'Visual hierarchy']
  },
  aso: {
    icon: Type,
    score: 91,
    insights: [
      'Excellent keyword optimization',
      'Strong app store presence',
      'Good description and screenshots'
    ],
    opportunities: ['Expand keyword coverage', 'A/B test screenshots', 'Localization']
  },
  paywall: {
    icon: DollarSign,
    score: 83,
    insights: [
      'Effective tiered pricing strategy',
      'Good conversion funnel design',
      'Strong value proposition clarity'
    ],
    opportunities: ['Family plans', 'Annual discounts', 'Premium features']
  },
  reviews: {
    icon: MessageSquare,
    score: 73,
    insights: [
      'Positive sentiment trending upward',
      'Users love personalization features',
      'Mobile complaints need addressing'
    ],
    opportunities: ['Mobile fixes', 'Feature requests', 'Support improvement']
  },
  markets: {
    icon: Globe,
    score: 69,
    insights: [
      'Strong potential in European markets',
      'Limited global presence currently',
      'Health trends favor expansion'
    ],
    opportunities: ['EU expansion', 'Localization', 'Cultural adaptation']
  },
  features: {
    icon: Settings,
    score: 92,
    insights: [
      'Comprehensive feature set',
      'Good user experience design',
      'Strong competitive positioning'
    ],
    opportunities: ['AI enhancements', 'Integration APIs', 'Advanced analytics']
  }
};

const crossModuleCorrelations = [
  {
    title: 'ASO Success Drives Review Positivity',
    modules: ['ASO', 'Reviews'],
    correlation: 0.87,
    insight: 'Strong app store optimization correlates with 87% better review sentiment',
    impact: 'High'
  },
  {
    title: 'Creative Design Affects Paywall Conversion',
    modules: ['Creative', 'Paywall'],
    correlation: 0.73,
    insight: 'Better visual design leads to 73% higher premium conversion rates',
    impact: 'High'
  },
  {
    title: 'Feature Depth Enables Market Expansion',
    modules: ['Features', 'Markets'],
    correlation: 0.69,
    insight: 'Comprehensive features make global expansion 69% more successful',
    impact: 'Medium'
  },
  {
    title: 'Trend Alignment Predicts Explorer Growth',
    modules: ['Trends', 'Explorer'],
    correlation: 0.82,
    insight: 'Apps aligned with trends show 82% better performance metrics',
    impact: 'High'
  }
];

const competitivePositioning = [
  {
    competitor: 'MyFitnessPal',
    overallScore: 84,
    strengths: ['Larger user base', 'Established brand', 'Comprehensive database'],
    weaknesses: ['Outdated UX', 'Limited AI features', 'Complex interface'],
    advantage: 'AI personalization and voice interface'
  },
  {
    competitor: 'Lose It!',
    overallScore: 79,
    strengths: ['Simple interface', 'Good barcode scanning', 'Social features'],
    weaknesses: ['Limited personalization', 'Basic analytics', 'No voice features'],
    advantage: 'Advanced AI and better personalization'
  },
  {
    competitor: 'Noom',
    overallScore: 91,
    strengths: ['Psychology-based approach', 'Personal coaching', 'Strong retention'],
    weaknesses: ['High cost', 'Complex onboarding', 'Limited features'],
    advantage: 'Better feature-to-price ratio with AI'
  }
];

const strategicRecommendations = [
  {
    priority: 'Critical',
    title: 'Mobile Experience Overhaul',
    impact: '+45% retention',
    confidence: 94,
    timeline: '3 months',
    modules: ['Creative', 'Reviews', 'Explorer'],
    description: 'Cross-module analysis shows mobile experience is the #1 barrier to growth',
    actions: [
      'Redesign mobile interface with better typography',
      'Implement gesture-based navigation',
      'Optimize for one-handed usage',
      'Add offline functionality'
    ]
  },
  {
    priority: 'High',
    title: 'AI Personalization Enhancement',
    impact: '+67% engagement',
    confidence: 89,
    timeline: '4 months',
    modules: ['Trends', 'Features', 'Paywall'],
    description: 'AI trend momentum + feature gaps + premium positioning opportunity',
    actions: [
      'Implement advanced meal learning algorithms',
      'Add predictive nutrition suggestions',
      'Create personalized workout integration',
      'Build habit tracking with AI coaching'
    ]
  },
  {
    priority: 'Medium',
    title: 'European Market Expansion',
    impact: '+156% TAM',
    confidence: 76,
    timeline: '6 months',
    modules: ['Markets', 'ASO', 'Features'],
    description: 'Strong market opportunity with localization and cultural adaptation',
    actions: [
      'Localize for German, French, Spanish markets',
      'Adapt cultural food preferences',
      'Optimize ASO for local keywords',
      'Partner with local fitness influencers'
    ]
  }
];

export function CrossAnalysisReport({ app, onBack, onStrategyView }: CrossAnalysisReportProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Default app data if none provided
  const appData = app || {
    name: 'MindfulMeals',
    category: 'Health & Fitness',
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
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-50';
    if (score >= 75) return 'bg-blue-50';
    if (score >= 60) return 'bg-yellow-50';
    return 'bg-red-50';
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

  const getCorrelationColor = (correlation: number) => {
    if (correlation >= 0.8) return 'text-green-600';
    if (correlation >= 0.6) return 'text-blue-600';
    if (correlation >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cross Analysis
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onStrategyView}>
            <Target className="w-4 h-4 mr-2" />
            🎯 Strategic Plan
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            📊 Export Report
          </Button>
          <Button variant="outline">
            <Share className="w-4 h-4 mr-2" />
            📤 Share
          </Button>
        </div>
      </div>

      {/* App Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center text-white font-semibold">
                  📱
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl mb-1">
                  {appData.name} - Cross-Module Intelligence Report
                </CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Badge variant="outline">{appData.category}</Badge>
                  <span>•</span>
                  <span>Overall Intelligence Score: {appData.overallScore}/100</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">4.7</span>
                    <span className="text-muted-foreground">(1,234 reviews)</span>
                  </div>
                  <Badge className={`${getScoreColor(appData.overallScore)} ${getScoreBackground(appData.overallScore)}`}>
                    {appData.overallScore >= 90 ? 'Excellent' : appData.overallScore >= 75 ? 'Good' : appData.overallScore >= 60 ? 'Average' : 'Needs Improvement'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Module Scores Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(moduleAnalysis).map(([moduleKey, analysis]) => (
          <Card key={moduleKey}>
            <CardContent className="p-4 text-center">
              <analysis.icon className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium capitalize mb-1">{moduleKey}</p>
              <p className={`text-2xl font-semibold ${getScoreColor(analysis.score)}`}>
                {analysis.score}
              </p>
              <p className="text-xs text-muted-foreground">
                {analysis.score >= 90 ? 'Excellent' : analysis.score >= 75 ? 'Good' : analysis.score >= 60 ? 'Average' : 'Poor'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Module Analysis</TabsTrigger>
          <TabsTrigger value="correlations">Cross-Module Insights</TabsTrigger>
          <TabsTrigger value="competitive">Competitive Position</TabsTrigger>
          <TabsTrigger value="recommendations">Strategic Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Module Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(moduleAnalysis).map(([moduleKey, analysis]) => (
              <Card key={moduleKey}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <analysis.icon className="w-5 h-5" />
                    {moduleKey.charAt(0).toUpperCase() + moduleKey.slice(1)} Analysis
                    <Badge className={`${getScoreColor(analysis.score)} ${getScoreBackground(analysis.score)}`}>
                      {analysis.score}/100
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-green-700 mb-2">✅ Key Insights:</h5>
                      <ul className="space-y-1">
                        {analysis.insights.map((insight, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-blue-700 mb-2">💡 Opportunities:</h5>
                      <ul className="space-y-1">
                        {analysis.opportunities.map((opportunity, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <Target className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                            {opportunity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="correlations" className="space-y-6">
          {/* Cross-Module Correlations */}
          <Card>
            <CardHeader>
              <CardTitle>🔄 Cross-Module Intelligence Correlations</CardTitle>
              <p className="text-muted-foreground">
                How different modules influence each other's performance
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {crossModuleCorrelations.map((correlation, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{correlation.title}</h4>
                          <Badge className={`${getCorrelationColor(correlation.correlation)} bg-white border`}>
                            {Math.round(correlation.correlation * 100)}% correlation
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-muted-foreground">Connected modules:</span>
                          <div className="flex gap-1">
                            {correlation.modules.map((module, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {module}
                              </Badge>
                            ))}
                          </div>
                          <Badge className={correlation.impact === 'High' ? 'text-red-600 bg-red-50' : 'text-yellow-600 bg-yellow-50'}>
                            {correlation.impact} Impact
                          </Badge>
                        </div>

                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            💡 <strong>Insight:</strong> {correlation.insight}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitive" className="space-y-6">
          {/* Competitive Positioning */}
          <Card>
            <CardHeader>
              <CardTitle>🏆 Cross-Module Competitive Analysis</CardTitle>
              <p className="text-muted-foreground">
                How you compare across all intelligence dimensions
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitivePositioning.map((competitor, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">vs {competitor.competitor}</h4>
                          <Badge className={`${getScoreColor(competitor.overallScore)} ${getScoreBackground(competitor.overallScore)}`}>
                            {competitor.overallScore}/100
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <h5 className="font-medium text-green-700 mb-1">Their Strengths:</h5>
                            <ul className="text-sm space-y-1">
                              {competitor.strengths.map((strength, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-green-600">•</span>
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-red-700 mb-1">Their Weaknesses:</h5>
                            <ul className="text-sm space-y-1">
                              {competitor.weaknesses.map((weakness, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-red-600">•</span>
                                  {weakness}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            🎯 <strong>Your Advantage:</strong> {competitor.advantage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          {/* Strategic Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 Cross-Module Strategic Recommendations</CardTitle>
              <p className="text-muted-foreground">
                AI-generated action plan based on cross-module analysis
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {strategicRecommendations.map((rec, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority}
                          </Badge>
                          <h4 className="font-medium">{rec.title}</h4>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-green-600">{rec.impact}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-blue-600">{rec.confidence}% confidence</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm text-muted-foreground">Timeline:</span>
                          <Badge variant="outline">{rec.timeline}</Badge>
                          <span className="text-sm text-muted-foreground">Based on modules:</span>
                          <div className="flex gap-1">
                            {rec.modules.map((module, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {module}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 bg-yellow-50 rounded-lg mb-3">
                          <p className="text-sm text-yellow-800">
                            💡 <strong>Why this matters:</strong> {rec.description}
                          </p>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">📋 Action Items:</h5>
                          <ul className="space-y-1">
                            {rec.actions.map((action, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <span className="text-blue-600">•</span>
                                {action}
                              </li>
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
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <Button onClick={onStrategyView}>
              <Target className="w-4 h-4 mr-2" />
              🎯 Strategic Planning
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              📊 Competitive Analysis
            </Button>
            <Button variant="outline">
              <Activity className="w-4 h-4 mr-2" />
              📈 Performance Tracking
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              📋 Export Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}