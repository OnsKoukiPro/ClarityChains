import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { 
  Settings, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Eye,
  Search,
  Filter,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Users,
  Clock
} from 'lucide-react';

interface FeaturesMainProps {
  onComparisonSelect: (category: string) => void;
  onPrioritizerSelect: () => void;
}

const trendingFeatures = [
  {
    feature: 'AI Integration',
    growth: '+89%',
    description: 'apps adding AI features',
    insight: 'Machine learning becoming essential across categories',
    adoption: 67
  },
  {
    feature: 'Dark Mode',
    growth: '+67%',
    description: 'user requests in reviews',
    insight: 'Now expected as standard feature by users',
    adoption: 89
  },
  {
    feature: 'Voice Commands',
    growth: '+45%',
    description: 'productivity apps adopt',
    insight: 'Hands-free interaction gaining popularity',
    adoption: 34
  },
  {
    feature: 'Offline Mode',
    growth: '+34%',
    description: 'users demand offline',
    insight: 'Reliability concerns drive offline functionality',
    adoption: 56
  },
  {
    feature: 'Widget Support',
    growth: '+28%',
    description: 'home screen integration',
    insight: 'Quick access increases daily engagement',
    adoption: 43
  }
];

const featureGaps = [
  {
    gap: 'Only 23% of meditation apps have sleep tracking integration, but 67% of users request this feature',
    category: 'Health & Fitness',
    opportunity: 'Sleep Integration',
    demandGap: '44%',
    priority: 'High'
  },
  {
    gap: '45% of productivity apps lack calendar sync, creating major workflow friction for users',
    category: 'Productivity',
    opportunity: 'Calendar Sync',
    demandGap: '55%',
    priority: 'High'
  },
  {
    gap: '78% of fintech apps missing biometric authentication, security concerns rising',
    category: 'Finance',
    opportunity: 'Biometric Auth',
    demandGap: '78%',
    priority: 'Critical'
  },
  {
    gap: '89% of gaming apps lack accessibility features, excluding disabled users',
    category: 'Gaming',
    opportunity: 'Accessibility',
    demandGap: '89%',
    priority: 'Medium'
  }
];

const featuredComparisons = [
  {
    id: 1,
    category: 'Task Management Apps',
    title: 'Core Features',
    apps: ['Todoist', 'Asana', 'Notion', 'ClickUp'],
    insight: 'Notion leads in flexibility, Todoist in simplicity',
    missingFeatures: ['Voice Commands', 'AI Suggestions', 'Advanced Offline'],
    completeness: 78
  },
  {
    id: 2,
    category: 'Meditation Apps',
    title: 'AI Features',
    apps: ['Calm', 'Headspace', 'Insight Timer', 'Ten Percent'],
    insight: 'Major AI opportunity - only 12% have smart features',
    missingFeatures: ['Mood Detection', 'Personalized Sessions', 'Voice Analysis'],
    completeness: 34
  },
  {
    id: 3,
    category: 'Finance Apps',
    title: 'Security Features',
    apps: ['Mint', 'YNAB', 'Personal Capital', 'Tiller'],
    insight: 'Security gaps create user trust issues',
    missingFeatures: ['Biometric Auth', '2FA', 'Device Verification'],
    completeness: 67
  }
];

const categoryMaturity = [
  { 
    category: 'Productivity', 
    maturity: 'AI integration emerging', 
    coverage: 45,
    trend: 'up',
    insight: 'Voice commands and AI assistance becoming standard'
  },
  { 
    category: 'Health', 
    maturity: 'Wearables standard', 
    coverage: 78,
    trend: 'up',
    insight: 'Integration with health devices now expected'
  },
  { 
    category: 'Finance', 
    maturity: 'Biometric auth required', 
    coverage: 89,
    trend: 'stable',
    insight: 'Security features mandatory for user trust'
  },
  { 
    category: 'Gaming', 
    maturity: 'Social features key', 
    coverage: 67,
    trend: 'up',
    insight: 'Multiplayer and social sharing essential'
  }
];

export function FeaturesMain({ onComparisonSelect, onPrioritizerSelect }: FeaturesMainProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getGrowthColor = (growth: string) => {
    const value = parseInt(growth.replace('%', '').replace('+', ''));
    if (value >= 60) return 'text-green-600 bg-green-50';
    if (value >= 30) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
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

  const getTrendIcon = (trend: string) => {
    return <TrendingUp className="w-4 h-4 text-green-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Apps Analyzed</p>
                <p className="text-2xl font-semibold">2,847</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Features</p>
                <p className="text-2xl font-semibold">15,678</p>
              </div>
              <Settings className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Comparisons</p>
                <p className="text-2xl font-semibold">892 studies</p>
              </div>
              <Eye className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Gaps Found</p>
                <p className="text-2xl font-semibold">1,234 gaps</p>
              </div>
              <Target className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trending Feature Patterns */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  🔥 Trending Feature Patterns
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">📈 {feature.feature}</p>
                          <Badge className={getGrowthColor(feature.growth)}>
                            {feature.growth} {feature.description}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{feature.insight}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Adoption Rate:</span>
                          <Progress value={feature.adoption} className="w-20 h-2" />
                          <span className="text-xs font-medium">{feature.adoption}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Feature Gap Opportunities */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  🎯 Feature Gap Opportunities
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featureGaps.map((gap, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-blue-600 bg-blue-50">
                            {gap.category}
                          </Badge>
                          <Badge className={getPriorityColor(gap.priority)}>
                            {gap.priority} Priority
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">
                          💡 "{gap.gap}"
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Opportunity:</span>
                            <Badge variant="outline" className="text-xs text-purple-600">
                              {gap.opportunity}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Demand Gap:</span>
                            <span className="text-xs font-medium text-red-600">{gap.demandGap}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  📊 Gap Analysis →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Featured Feature Comparisons */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  📊 Featured Feature Comparisons
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredComparisons.map((comparison) => (
                  <div 
                    key={comparison.id}
                    className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={() => onComparisonSelect(comparison.category)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">⚙️ {comparison.category} - {comparison.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Compared: {comparison.apps.join(', ')}
                        </p>
                        <p className="text-sm mb-3">
                          🎯 "{comparison.insight}"
                        </p>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Feature Coverage:</span>
                            <Progress value={comparison.completeness} className="w-16 h-2" />
                            <span className="text-xs font-medium">{comparison.completeness}%</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Missing Features:</span>
                            <div className="flex gap-1">
                              {comparison.missingFeatures.slice(0, 3).map((feature, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs text-red-600">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        🔍 View
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        📊 Full Compare
                      </Button>
                      <Button variant="outline" size="sm">
                        <Lightbulb className="w-4 h-4 mr-1" />
                        💡 Insights
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Feature Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚡ Quick Feature Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button variant="outline" className="h-12 justify-start" onClick={() => onComparisonSelect('general')}>
                  <Settings className="w-5 h-5 mr-2" />
                  ⚙️ Compare Apps
                </Button>
                <Button variant="outline" className="h-12 justify-start">
                  <Search className="w-5 h-5 mr-2" />
                  🔍 Feature Research
                </Button>
                <Button variant="outline" className="h-12 justify-start">
                  <Target className="w-5 h-5 mr-2" />
                  💡 Gap Analysis
                </Button>
                <Button variant="outline" className="h-12 justify-start">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  📊 Feature Trends
                </Button>
                <Button variant="outline" className="h-12 justify-start" onClick={onPrioritizerSelect}>
                  <BarChart3 className="w-5 h-5 mr-2" />
                  🎯 Build Comparison
                </Button>
                <Button variant="outline" className="h-12 justify-start">
                  <Eye className="w-5 h-5 mr-2" />
                  📈 Track Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Feature Analysis Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">⚙️ Feature Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Search className="w-4 h-4 mr-2" />
                Feature Finder
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Comparison Builder
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={onPrioritizerSelect}>
                <Target className="w-4 h-4 mr-2" />
                Priority Planner
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trend Tracker
              </Button>
            </CardContent>
          </Card>

          {/* Category Feature Maturity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📈 Category Feature Maturity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryMaturity.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{item.category}:</span>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(item.trend)}
                      <span className="text-xs text-green-600">{item.coverage}%</span>
                    </div>
                  </div>
                  <div className="text-xs space-y-1">
                    <p>⚙️ {item.maturity}</p>
                    <p className="text-muted-foreground">{item.insight}</p>
                  </div>
                  <Progress value={item.coverage} className="h-1" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Feature Adoption Rates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📊 Feature Adoption</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Dark Mode:</span>
                  <span className="font-medium text-green-600">89% adoption</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Features:</span>
                  <span className="font-medium text-blue-600">34% adoption</span>
                </div>
                <div className="flex justify-between">
                  <span>Voice Commands:</span>
                  <span className="font-medium text-purple-600">23% adoption</span>
                </div>
                <div className="flex justify-between">
                  <span>Offline Mode:</span>
                  <span className="font-medium text-yellow-600">56% adoption</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Difficulty */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">⚙️ Implementation</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Dark Mode:</span>
                  <Badge className="text-green-600 bg-green-50">Easy</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Widget Support:</span>
                  <Badge className="text-yellow-600 bg-yellow-50">Medium</Badge>
                </div>
                <div className="flex justify-between">
                  <span>AI Integration:</span>
                  <Badge className="text-red-600 bg-red-50">Hard</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Voice Commands:</span>
                  <Badge className="text-yellow-600 bg-yellow-50">Medium</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Development Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">💡 Development Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Start with high-impact, low-effort features first</p>
              <p>• Test AI features with small user groups initially</p>
              <p>• Dark mode is now expected as table stakes</p>
              <p>• Voice commands work best for task-oriented apps</p>
              <p>• Offline mode increases user satisfaction by 40%</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}