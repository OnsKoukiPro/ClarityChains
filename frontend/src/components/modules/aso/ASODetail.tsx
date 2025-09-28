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
  Search, 
  TrendingUp,
  Target,
  BarChart3,
  Lightbulb,
  Eye,
  AlertTriangle,
  CheckCircle,
  Hash,
  Users,
  DollarSign,
  Star,
  Copy,
  Download
} from 'lucide-react';

interface ASODetailProps {
  app: any;
  onBack: () => void;
}

const keywordData = [
  {
    keyword: 'task manager',
    currentRank: 47,
    volume: '12K/mo',
    difficulty: 'Medium',
    trend: 'up',
    trendValue: '+5',
    opportunity: 'high'
  },
  {
    keyword: 'productivity',
    currentRank: 23,
    volume: '8.5K/mo',
    difficulty: 'High',
    trend: 'stable',
    trendValue: '0',
    opportunity: 'medium'
  },
  {
    keyword: 'task planner',
    currentRank: 89,
    volume: '3.2K/mo',
    difficulty: 'Low',
    trend: 'down',
    trendValue: '-12',
    opportunity: 'low'
  },
  {
    keyword: 'work organizer',
    currentRank: 156,
    volume: '1.8K/mo',
    difficulty: 'Low',
    trend: 'down',
    trendValue: '-8',
    opportunity: 'low'
  },
  {
    keyword: 'to do list',
    currentRank: null,
    volume: '25K/mo',
    difficulty: 'High',
    trend: 'opportunity',
    trendValue: 'New',
    opportunity: 'high'
  },
  {
    keyword: 'project manager',
    currentRank: null,
    volume: '15K/mo',
    difficulty: 'Medium',
    trend: 'opportunity',
    trendValue: 'New',
    opportunity: 'high'
  }
];

const competitorAnalysis = [
  {
    name: 'Todoist',
    rank: 3,
    asoScore: 92,
    strongPoints: ['Uses "organize projects" in subtitle', 'Heavy keyword density in description', '8 screenshots vs your 5'],
    weakPoints: ['Doesn\'t target "daily planner"', 'Limited long-tail keywords'],
    opportunity: 'They don\'t target "daily planner" - you could own this 8K/month search term'
  },
  {
    name: 'Any.do',
    rank: 8,
    asoScore: 78,
    strongPoints: ['Strong brand recognition', 'Good visual screenshots', 'Clear value proposition'],
    weakPoints: ['Weak keyword optimization', 'Generic description', 'Missing trending terms'],
    opportunity: 'Weak keyword game - easy to outrank with better optimization'
  },
  {
    name: 'Microsoft To Do',
    rank: 12,
    asoScore: 85,
    strongPoints: ['Microsoft brand power', 'Integration keywords', 'Business focus'],
    weakPoints: ['Generic title', 'Limited consumer appeal', 'Technical language'],
    opportunity: 'Focus on consumer vs business language for differentiation'
  }
];

const optimizationRecommendations = [
  {
    type: 'high',
    priority: 'HIGH IMPACT',
    title: 'UPDATE SUBTITLE',
    current: 'Organize your work and life efficiently',
    suggested: 'Task Manager & To-Do List Organizer',
    impact: 'Target "to do list" (25K searches/month)',
    effort: 'Low',
    timeframe: '1 day'
  },
  {
    type: 'high',
    priority: 'HIGH IMPACT',
    title: 'ADD MISSING KEYWORDS',
    current: 'productivity,tasks,planner,organizer,workflow',
    suggested: 'Add: "to do list, project manager, daily planner"',
    impact: 'Access to 40K+ additional monthly searches',
    effort: 'Low',
    timeframe: '1 day'
  },
  {
    type: 'medium',
    priority: 'MEDIUM IMPACT',
    title: 'OPTIMIZE DESCRIPTION',
    current: 'Generic productivity description',
    suggested: 'Include "task manager" 3x, "to do list" 2x',
    impact: 'Improve relevance scoring for target keywords',
    effort: 'Medium',
    timeframe: '3 days'
  },
  {
    type: 'medium',
    priority: 'MEDIUM IMPACT',
    title: 'ADD SCREENSHOTS',
    current: '5 screenshots',
    suggested: 'Add 3 more screenshots showing key features',
    impact: 'Match competitor screenshot count, improve conversion',
    effort: 'High',
    timeframe: '1 week'
  }
];

export function ASODetail({ app, onBack }: ASODetailProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Default app data if none provided
  const appData = app || {
    name: 'TaskFlow Pro',
    category: 'Productivity',
    rating: 4.4,
    reviews: '2,891',
    asoScore: 73,
    currentTitle: 'TaskFlow Pro - Smart Task Manager',
    currentSubtitle: 'Organize your work and life efficiently',
    currentKeywords: 'productivity,tasks,planner,organizer,workflow',
    currentDescription: 'The ultimate productivity app for busy professionals...'
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      case 'opportunity': return <Target className="w-4 h-4 text-blue-500" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Low': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'High': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to ASO Hub
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Hash className="w-4 h-4 mr-2" />
            🔤 Generate Optimized Copy
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
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
                  {appData.name}
                </CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <span>{appData.category}</span>
                  <span>•</span>
                  <span>⭐ {appData.rating} ({appData.reviews} reviews)</span>
                </div>
                <Badge className="text-blue-600 bg-blue-50">
                  Current ASO Score: {appData.asoScore}/100
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* ASO Component Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>🔤 ASO Component Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">App Title</p>
              <p className="text-2xl font-semibold mb-2 text-green-600">8/10</p>
              <Badge className="text-green-600 bg-green-50 mb-2">✅ Good</Badge>
              <Progress value={80} className="h-2" />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Keywords</p>
              <p className="text-2xl font-semibold mb-2 text-yellow-600">6/10</p>
              <Badge className="text-yellow-600 bg-yellow-50 mb-2">⚠️ Improve</Badge>
              <Progress value={60} className="h-2" />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Description</p>
              <p className="text-2xl font-semibold mb-2 text-yellow-600">7/10</p>
              <Badge className="text-yellow-600 bg-yellow-50 mb-2">⚠️ Improve</Badge>
              <Progress value={70} className="h-2" />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Screenshots</p>
              <p className="text-2xl font-semibold mb-2 text-green-600">8/10</p>
              <Badge className="text-green-600 bg-green-50 mb-2">✅ Good</Badge>
              <Progress value={80} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current App Store Listing */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Current App Store Listing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="space-y-3">
              <div>
                <span className="font-medium">Title:</span>
                <p className="text-sm text-muted-foreground mt-1">"{appData.currentTitle}"</p>
              </div>
              <div>
                <span className="font-medium">Subtitle:</span>
                <p className="text-sm text-muted-foreground mt-1">"{appData.currentSubtitle}"</p>
              </div>
              <div>
                <span className="font-medium">Keywords:</span>
                <p className="text-sm text-muted-foreground mt-1">{appData.currentKeywords}</p>
              </div>
              <div>
                <span className="font-medium">Description:</span>
                <p className="text-sm text-muted-foreground mt-1">"{appData.currentDescription}"</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Keywords & Rankings</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Keyword Analysis & Rankings */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 Keyword Analysis & Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Keyword</th>
                      <th className="text-center p-3 font-medium">Current Rank</th>
                      <th className="text-center p-3 font-medium">Volume</th>
                      <th className="text-center p-3 font-medium">Difficulty</th>
                      <th className="text-center p-3 font-medium">Trend</th>
                      <th className="text-center p-3 font-medium">Opportunity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywordData.map((keyword, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">"{keyword.keyword}"</td>
                        <td className="text-center p-3">
                          {keyword.currentRank ? (
                            <span className="font-medium">#{keyword.currentRank}</span>
                          ) : (
                            <Badge variant="outline" className="text-blue-600 bg-blue-50">Not ranked</Badge>
                          )}
                        </td>
                        <td className="text-center p-3">{keyword.volume}</td>
                        <td className="text-center p-3">
                          <Badge className={getDifficultyColor(keyword.difficulty)}>
                            {keyword.difficulty}
                          </Badge>
                        </td>
                        <td className="text-center p-3">
                          <div className="flex items-center justify-center gap-1">
                            {getTrendIcon(keyword.trend)}
                            <span className="text-sm">{keyword.trendValue}</span>
                          </div>
                        </td>
                        <td className="text-center p-3">
                          <Badge className={getOpportunityColor(keyword.opportunity)}>
                            {keyword.opportunity === 'high' ? '🔥' : keyword.opportunity === 'medium' ? '⚠️' : '❌'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          {/* AI ASO Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>🤖 AI ASO Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">🚀 OPTIMIZATION PLAN</h4>
                <p className="text-sm text-blue-800">
                  Our AI analyzed 10,000+ similar apps and identified these high-impact optimizations for your app.
                </p>
              </div>

              <div className="space-y-4">
                {optimizationRecommendations.map((rec, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={rec.type === 'high' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'}>
                            {rec.priority}
                          </Badge>
                          <span className="font-semibold">{rec.title}</span>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Current:</span>
                            <p className="text-muted-foreground ml-2">"{rec.current}"</p>
                          </div>
                          <div>
                            <span className="font-medium">Suggested:</span>
                            <p className="text-green-700 ml-2">"{rec.suggested}"</p>
                          </div>
                          <div>
                            <span className="font-medium">Impact:</span>
                            <p className="text-blue-700 ml-2">{rec.impact}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right text-sm">
                        <Badge variant="outline" className="mb-1">{rec.effort} Effort</Badge>
                        <p className="text-muted-foreground">{rec.timeframe}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4 mr-1" />
                        Copy Suggestion
                      </Button>
                      <Button variant="outline" size="sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold mb-3">📈 ESTIMATED IMPACT:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg text-center">
                    <p className="text-lg font-semibold text-green-700">+15-25</p>
                    <p className="text-sm text-green-600">Ranking positions</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <p className="text-lg font-semibold text-blue-700">+35%</p>
                    <p className="text-sm text-blue-600">Organic downloads in 30 days</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg text-center">
                    <p className="text-lg font-semibold text-purple-700">+67%</p>
                    <p className="text-sm text-purple-600">Search visibility improvement</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6">
          {/* Competitor Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>🏆 Competitor Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {competitorAnalysis.map((competitor, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{competitor.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Rank #{competitor.rank}</span>
                          <span>•</span>
                          <span>ASO Score: {competitor.asoScore}/100</span>
                        </div>
                      </div>
                      <Badge className="text-green-600 bg-green-50">
                        Market Leader
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-medium text-green-600 mb-2">✅ Strong Points:</h5>
                        <ul className="text-sm space-y-1">
                          {competitor.strongPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-green-500 rounded-full mt-2"></span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-red-600 mb-2">⚠️ Weak Points:</h5>
                        <ul className="text-sm space-y-1">
                          {competitor.weakPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-red-500 rounded-full mt-2"></span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-1">💡 Opportunity:</h5>
                      <p className="text-sm text-blue-800">{competitor.opportunity}</p>
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
            <Button variant="outline">
              <Hash className="w-4 h-4 mr-2" />
              🔤 Generate Optimized Copy
            </Button>
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              📊 Keyword Tracker Setup
            </Button>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              🏆 Spy on Competitors
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              📈 Track Progress
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              💾 Save Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}