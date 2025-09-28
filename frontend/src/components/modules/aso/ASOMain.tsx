import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { 
  Search, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Eye,
  Settings,
  Save,
  Lightbulb,
  Users,
  ChevronRight,
  KeyRound,
  Zap,
  AlertCircle,
  CheckCircle,
  Hash
} from 'lucide-react';

interface ASOMainProps {
  onAppSelect: (app: any) => void;
}

const trendingKeywords = [
  {
    keyword: 'meditation app',
    growth: '+89%',
    volume: '45K/mo',
    difficulty: 'Medium',
    difficultyColor: 'bg-yellow-500'
  },
  {
    keyword: 'habit tracker',
    growth: '+67%',
    volume: '32K/mo',
    difficulty: 'Low',
    difficultyColor: 'bg-green-500'
  },
  {
    keyword: 'ai photo editor',
    growth: '+56%',
    volume: '78K/mo',
    difficulty: 'High',
    difficultyColor: 'bg-red-500'
  },
  {
    keyword: 'productivity tool',
    growth: '+34%',
    volume: '25K/mo',
    difficulty: 'Medium',
    difficultyColor: 'bg-yellow-500'
  }
];

const asoOpportunities = [
  {
    type: 'Low-hanging fruit',
    count: 23,
    description: 'apps could improve ranking',
    icon: <Target className="w-5 h-5 text-green-500" />,
    color: 'text-green-600'
  },
  {
    type: 'Missing keywords',
    count: 156,
    description: 'optimization opportunities',
    icon: <Hash className="w-5 h-5 text-blue-500" />,
    color: 'text-blue-600'
  },
  {
    type: 'Competitor gaps',
    count: 89,
    description: 'keyword stealing chances',
    icon: <Eye className="w-5 h-5 text-purple-500" />,
    color: 'text-purple-600'
  },
  {
    type: 'Description updates',
    count: 67,
    description: 'apps need optimization',
    icon: <AlertCircle className="w-5 h-5 text-orange-500" />,
    color: 'text-orange-600'
  }
];

const featuredApps = [
  {
    id: 1,
    name: 'TaskFlow Pro',
    category: 'Productivity',
    asoScore: 73,
    currentRank: 47,
    previousRank: 23,
    trending: 'improving',
    insight: 'Strong title, weak keywords. Add "task manager"',
    keywords: ['productivity', 'task', 'planner', 'organizer'],
    monthlySearches: 45000,
    competitorPosition: 'Behind Todoist, Ahead of Any.do'
  },
  {
    id: 2,
    name: 'FitnessTracker',
    category: 'Health & Fitness',
    asoScore: 68,
    currentRank: 89,
    previousRank: 67,
    trending: 'improving',
    insight: 'Good keywords, improve app description content',
    keywords: ['fitness', 'workout', 'health', 'tracker'],
    monthlySearches: 32000,
    competitorPosition: 'Behind MyFitnessPal, Ahead of Strava'
  },
  {
    id: 3,
    name: 'Budget Buddy',
    category: 'Finance',
    asoScore: 81,
    currentRank: 12,
    previousRank: 18,
    trending: 'improving',
    insight: 'Excellent keyword coverage, optimize screenshots',
    keywords: ['budget', 'finance', 'money', 'expense'],
    monthlySearches: 28000,
    competitorPosition: 'Behind Mint, Ahead of YNAB'
  }
];

const emergingTrends = [
  {
    keyword: 'ai task manager',
    status: 'NEW trending',
    growth: '+156%',
    volume: '8.2K/mo',
    insight: 'Low competition, high potential for early movers',
    opportunity: 'high'
  },
  {
    keyword: 'voice task app',
    status: 'Emerging trend',
    growth: '+89%',
    volume: '3.4K/mo',
    insight: 'Voice commands becoming popular in productivity',
    opportunity: 'medium'
  },
  {
    keyword: 'habit task combo',
    status: 'Growing niche',
    growth: '+67%',
    volume: '2.1K/mo',
    insight: 'Users want task + habit tracking in one app',
    opportunity: 'medium'
  }
];

const competitorGaps = [
  {
    keyword: 'simple task manager',
    competitor: 'Todoist',
    competitorRank: 8,
    yourRank: 'unranked',
    volume: '4.2K/mo',
    opportunity: 'medium'
  },
  {
    keyword: 'team tasks',
    competitor: 'Asana',
    competitorRank: 12,
    yourRank: 'unranked',
    volume: '6.8K/mo',
    opportunity: 'high'
  },
  {
    keyword: 'quick notes',
    competitor: 'Any.do',
    competitorRank: 15,
    yourRank: 'unranked',
    volume: '2.9K/mo',
    opportunity: 'low'
  },
  {
    keyword: 'project planner',
    competitor: 'Monday',
    competitorRank: 6,
    yourRank: 'unranked',
    volume: '8.1K/mo',
    opportunity: 'high'
  }
];

const longTailSuggestions = [
  { keyword: 'best task manager for teams', volume: '1,200/mo', difficulty: 'Medium' },
  { keyword: 'simple to do list app', volume: '980/mo', difficulty: 'Low' },
  { keyword: 'offline task manager', volume: '760/mo', difficulty: 'Low' },
  { keyword: 'free project planning tool', volume: '1,400/mo', difficulty: 'Medium' },
  { keyword: 'task manager with calendar', volume: '2,100/mo', difficulty: 'High' }
];

const categoryPerformance = [
  { category: 'Productivity', trend: '"AI" keywords trending', growth: '+45%' },
  { category: 'Health', trend: 'Voice queries up', growth: '+67%' },
  { category: 'Finance', trend: '"secure" trust terms work', growth: '+23%' },
  { category: 'Gaming', trend: '"free" still wins', growth: '+12%' }
];

export function ASOMain({ onAppSelect }: ASOMainProps) {
  const [selectedApps, setSelectedApps] = useState<any[]>([]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 65) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getTrendIcon = (trending: string) => {
    return trending === 'improving' ? 
      <TrendingUp className="w-4 h-4 text-green-500" /> : 
      <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Apps Tracked</p>
                <p className="text-2xl font-semibold">1,247</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Keywords</p>
                <p className="text-2xl font-semibold">15,678</p>
              </div>
              <Hash className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rankings Monitored</p>
                <p className="text-2xl font-semibold">8,945</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Opportunities Found</p>
                <p className="text-2xl font-semibold">234</p>
              </div>
              <Target className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trending Keywords */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  🔥 Trending Keywords This Week
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingKeywords.map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">📈 "{keyword.keyword}"</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{keyword.growth} searches</span>
                          <span>•</span>
                          <span>{keyword.volume}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(keyword.difficulty)}>
                      Difficulty: {keyword.difficulty}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ASO Opportunities */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  🎯 ASO Opportunities
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {asoOpportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      {opportunity.icon}
                      <div>
                        <p className="font-medium">
                          🔍 {opportunity.type}: <span className={opportunity.color}>{opportunity.count}</span> {opportunity.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured ASO Analysis */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  📊 Featured ASO Analysis
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
                          <Badge className={getScoreColor(app.asoScore)}>
                            🔤 ASO Score: {app.asoScore}/100
                          </Badge>
                          <div className="flex items-center gap-1 text-sm">
                            {getTrendIcon(app.trending)}
                            <span>Rank: #{app.currentRank} → #{app.previousRank} ({app.trending})</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          🎯 "{app.insight}"
                        </p>
                      </div>
                    </div>

                    {/* Keywords Preview */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-muted-foreground">Keywords:</span>
                      {app.keywords.slice(0, 4).map((keyword, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Search className="w-4 h-4 mr-1" />
                        🔍 Analyze
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        📝 Optimize
                      </Button>
                      <Button variant="outline" size="sm">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        📊 Track Keywords
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emerging Trends */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  🚀 Emerging Keyword Trends
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergingTrends.map((trend, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">🚀 "{trend.keyword}"</h4>
                          <Badge className="text-blue-600 bg-blue-50">
                            {trend.status}
                          </Badge>
                          <Badge className="text-green-600 bg-green-50">
                            {trend.growth} growth
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{trend.insight}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Volume: {trend.volume}</span>
                          <Badge className={getOpportunityColor(trend.opportunity)}>
                            {trend.opportunity === 'high' ? '🔥 High Opportunity' : 
                             trend.opportunity === 'medium' ? '⚡ Medium Opportunity' : 
                             '💡 Low Opportunity'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Competitor Keyword Gaps */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  🏆 Competitor Keyword Gaps
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Keywords your competitors rank for but you don't:
              </p>
              <div className="space-y-3">
                {competitorGaps.map((gap, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">"{gap.keyword}"</span>
                        <Badge variant="outline" className="text-xs">{gap.volume}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {gap.competitor} ranks #{gap.competitorRank}, you: {gap.yourRank}
                      </div>
                    </div>
                    <Badge className={getOpportunityColor(gap.opportunity)}>
                      {gap.opportunity === 'high' ? '🔥' : gap.opportunity === 'medium' ? '⚡' : '💡'}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Opportunity:</strong> Target these to steal their traffic
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Long-tail Keyword Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 Long-tail Keyword Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {longTailSuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span className="font-medium">"{suggestion.keyword}"</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{suggestion.volume}</Badge>
                      <Badge className={getDifficultyColor(suggestion.difficulty)}>
                        {suggestion.difficulty}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Keyword Strategy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🤖 AI Keyword Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-4">RECOMMENDED KEYWORD STRATEGY:</h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Primary Target (Title/Subtitle):</h5>
                    <ul className="text-sm text-blue-700 ml-4 space-y-1">
                      <li>• "task manager" (main focus keyword)</li>
                      <li>• "to do list" (high volume opportunity)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Secondary Targets (Keywords field):</h5>
                    <ul className="text-sm text-blue-700 ml-4 space-y-1">
                      <li>• daily planner, project manager, productivity app</li>
                      <li>• work organizer, team tasks, goal tracker</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Long-tail Targets (Description):</h5>
                    <ul className="text-sm text-blue-700 ml-4 space-y-1">
                      <li>• "best task manager for teams"</li>
                      <li>• "simple to do list app"</li>
                      <li>• "task manager with calendar integration"</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Emerging Bets (Future updates):</h5>
                    <ul className="text-sm text-blue-700 ml-4 space-y-1">
                      <li>• "ai task manager" (prepare for AI features)</li>
                      <li>• "voice task app" (if voice features planned)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  📋 Generate Keyword List
                </Button>
                <Button variant="outline" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  📊 Track Rankings
                </Button>
                <Button variant="outline" size="sm">
                  <Target className="w-4 h-4 mr-2" />
                  🎯 Create ASO Plan
                </Button>
                <Button variant="outline" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  📤 Export Research
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick ASO Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚡ Quick ASO Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button variant="outline" className="h-12 justify-start">
                  <Search className="w-5 h-5 mr-2" />
                  🔍 Keyword Research
                </Button>
                <Button variant="outline" className="h-12 justify-start">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  📱 App Analysis
                </Button>
                <Button variant="outline" className="h-12 justify-start">
                  <Eye className="w-5 h-5 mr-2" />
                  🏆 Competitor Spy
                </Button>
                <Button variant="outline" className="h-12 justify-start">
                  <Settings className="w-5 h-5 mr-2" />
                  📝 Content Optimizer
                </Button>
                <Button variant="outline" className="h-12 justify-start">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  📊 Rank Tracker
                </Button>
                <Button variant="outline" className="h-12 justify-start" onClick={() => onAppSelect({ name: 'Copy Generator', type: 'generator' })}>
                  <Lightbulb className="w-5 h-5 mr-2" />
                  🤖 ASO Copy Generator
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Keyword Research Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🔍 Keyword Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Search className="w-4 h-4 mr-2" />
                Keyword Explorer
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Competitor Keywords
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending Terms
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Volume Checker
              </Button>
            </CardContent>
          </Card>

          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📈 Category ASO Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categoryPerformance.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{item.category}:</span>
                    <Badge variant="secondary" className="text-green-600 bg-green-50">
                      {item.growth}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">🔤 {item.trend}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* ASO Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">💡 ASO Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Use target keywords in your app title for maximum impact</p>
              <p>• Research competitor keywords to find gaps</p>
              <p>• Update app descriptions regularly with trending terms</p>
              <p>• Monitor rankings weekly to track improvements</p>
              <p>• A/B test different metadata combinations</p>
            </CardContent>
          </Card>

          {/* Performance Highlights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🏆 This Week's Wins</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <div className="flex justify-between items-center">
                  <span>Best Rank Jump:</span>
                  <span className="font-medium text-green-600">+24 positions</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Top Keyword Win:</span>
                  <span className="font-medium">"task manager"</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Downloads Boost:</span>
                  <span className="font-medium text-green-600">+67%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>New Opportunities:</span>
                  <span className="font-medium">45 found</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📊 Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Avg ASO Score:</span>
                <span className="font-medium">74/100</span>
              </div>
              <div className="flex justify-between">
                <span>Apps Improving:</span>
                <span className="font-medium text-green-600">89%</span>
              </div>
              <div className="flex justify-between">
                <span>Keywords Tracked:</span>
                <span className="font-medium">15,678</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Rank Improvement:</span>
                <span className="font-medium text-green-600">+12 positions</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}