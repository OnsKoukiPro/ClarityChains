import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Progress } from '../../ui/progress';
import { 
  ArrowLeft, 
  Target, 
  Download, 
  Settings,
  TrendingUp,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface FeaturePrioritizerProps {
  onBack: () => void;
}

const quickWins = [
  {
    feature: '🌙 Dark Mode Implementation',
    impact: 'High',
    impactScore: 95,
    effort: 'Low',
    effortDays: '2-3 dev days',
    competition: '89% of competitors have this',
    roi: '95% - Essential for user satisfaction',
    userDemand: '67% user requests'
  },
  {
    feature: '📱 Widget Support (iOS/Android)',
    impact: 'Medium-High',
    impactScore: 87,
    effort: 'Medium',
    effortDays: '5-7 dev days',
    competition: 'Only 34% have good widgets',
    roi: '87% - Increases daily engagement',
    userDemand: '45% user requests'
  }
];

const mediumTerm = [
  {
    feature: '🤖 AI Task Suggestions',
    impact: 'Very High',
    impactScore: 142,
    effort: 'High',
    effortDays: '15-20 dev days',
    competition: 'Only 20% have AI features',
    roi: '142% - Major differentiation opportunity',
    userDemand: '85% want smart features'
  },
  {
    feature: '🎤 Voice Task Creation',
    impact: 'High',
    impactScore: 118,
    effort: 'Medium-High',
    effortDays: '10-12 dev days',
    competition: 'Only 4% have voice features',
    roi: '118% - First-mover advantage',
    userDemand: '78% interested in voice'
  },
  {
    feature: '📅 Smart Calendar Integration',
    impact: 'High',
    impactScore: 98,
    effort: 'Medium',
    effortDays: '8-10 dev days',
    competition: '60% have basic, 15% have smart',
    roi: '98% - Workflow improvement',
    userDemand: '72% want better calendar sync'
  }
];

const longTerm = [
  {
    feature: '🏢 Team Collaboration Features',
    impact: 'Very High',
    impactScore: 156,
    effort: 'Very High',
    effortDays: '25-30 dev days',
    competition: '78% have team features',
    roi: '156% - Revenue expansion opportunity',
    userDemand: 'B2B expansion opportunity'
  },
  {
    feature: '📊 Advanced Analytics Dashboard',
    impact: 'Medium-High',
    impactScore: 89,
    effort: 'High',
    effortDays: '18-22 dev days',
    competition: '45% have analytics',
    roi: '89% - User retention improvement',
    userDemand: 'Productivity insights'
  }
];

const costAnalysis = {
  phase1: {
    name: 'Phase 1 (Quick Wins)',
    cost: '$8,500',
    timeline: '2-4 weeks'
  },
  phase2: {
    name: 'Phase 2 (Medium Term)',
    cost: '$24,000',
    timeline: '6-8 weeks'
  },
  phase3: {
    name: 'Phase 3 (Long Term)',
    cost: '$35,000',
    timeline: '12-16 weeks'
  },
  total: {
    investment: '$67,500',
    revenueImpact: '+185% within 12 months',
    projectedROI: '340%'
  }
};

export function FeaturePrioritizer({ onBack }: FeaturePrioritizerProps) {
  const [appContext, setAppContext] = useState({
    category: 'productivity',
    userBase: '50k-100k',
    teamSize: '2-5',
    targetMarket: 'b2c',
    budget: '10k-50k'
  });

  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerated(true);
  };

  const getEffortColor = (effort: string) => {
    switch (effort.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'medium-high': return 'text-orange-600 bg-orange-50';
      case 'high': return 'text-red-600 bg-red-50';
      case 'very high': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'very high': return 'text-green-600 bg-green-50';
      case 'high': return 'text-blue-600 bg-blue-50';
      case 'medium-high': return 'text-purple-600 bg-purple-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Features Hub
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            📋 Export Roadmap
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            💾 Save Template
          </Button>
        </div>
      </div>

      {/* Page Title */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🎯 AI-Powered Feature Prioritization Tool</CardTitle>
          <p className="text-muted-foreground">
            Generate data-driven feature roadmaps based on your app context and competitive analysis
          </p>
        </CardHeader>
      </Card>

      {/* App Context Form */}
      <Card>
        <CardHeader>
          <CardTitle>📱 Your App Context</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">App Category</label>
              <Select value={appContext.category} onValueChange={(value) => setAppContext({...appContext, category: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="health">Health & Fitness</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Current User Base</label>
              <Select value={appContext.userBase} onValueChange={(value) => setAppContext({...appContext, userBase: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1k-10k">1K - 10K</SelectItem>
                  <SelectItem value="10k-50k">10K - 50K</SelectItem>
                  <SelectItem value="50k-100k">50K - 100K</SelectItem>
                  <SelectItem value="100k-500k">100K - 500K</SelectItem>
                  <SelectItem value="500k+">500K+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Development Team Size</label>
              <Select value={appContext.teamSize} onValueChange={(value) => setAppContext({...appContext, teamSize: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 developer</SelectItem>
                  <SelectItem value="2-5">2-5 developers</SelectItem>
                  <SelectItem value="5-10">5-10 developers</SelectItem>
                  <SelectItem value="10+">10+ developers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Target Market</label>
              <Select value={appContext.targetMarket} onValueChange={(value) => setAppContext({...appContext, targetMarket: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="b2c">B2C</SelectItem>
                  <SelectItem value="b2b">B2B</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Budget</label>
              <Select value={appContext.budget} onValueChange={(value) => setAppContext({...appContext, budget: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5k-10k">$5K - $10K</SelectItem>
                  <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                  <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                  <SelectItem value="100k+">$100K+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleGenerate} className="w-full">
            <Target className="w-4 h-4 mr-2" />
            🎯 Generate Feature Roadmap
          </Button>
        </CardContent>
      </Card>

      {isGenerated && (
        <>
          {/* Priority 1 - Quick Wins */}
          <Card>
            <CardHeader>
              <CardTitle>🚀 PRIORITY 1 - QUICK WINS (1-2 weeks)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {quickWins.map((feature, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{feature.feature}</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">Impact:</span>
                              <Badge className={getImpactColor(feature.impact)}>
                                {feature.impact}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{feature.userDemand}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">Effort:</span>
                              <Badge className={getEffortColor(feature.effort)}>
                                {feature.effort}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{feature.effortDays}</p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Competition:</span> {feature.competition}</p>
                          <p><span className="font-medium">ROI:</span> <span className="text-green-600">{feature.roi}</span></p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 mb-1">{feature.impactScore}%</div>
                        <div className="text-xs text-muted-foreground">ROI Score</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Priority 2 - Medium Term */}
          <Card>
            <CardHeader>
              <CardTitle>⚡ PRIORITY 2 - MEDIUM TERM (1-2 months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mediumTerm.map((feature, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{feature.feature}</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">Impact:</span>
                              <Badge className={getImpactColor(feature.impact)}>
                                {feature.impact}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{feature.userDemand}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">Effort:</span>
                              <Badge className={getEffortColor(feature.effort)}>
                                {feature.effort}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{feature.effortDays}</p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Competition:</span> {feature.competition}</p>
                          <p><span className="font-medium">ROI:</span> <span className="text-green-600">{feature.roi}</span></p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{feature.impactScore}%</div>
                        <div className="text-xs text-muted-foreground">ROI Score</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Priority 3 - Long Term */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 PRIORITY 3 - LONG TERM (3-6 months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {longTerm.map((feature, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{feature.feature}</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">Impact:</span>
                              <Badge className={getImpactColor(feature.impact)}>
                                {feature.impact}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{feature.userDemand}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">Effort:</span>
                              <Badge className={getEffortColor(feature.effort)}>
                                {feature.effort}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{feature.effortDays}</p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Competition:</span> {feature.competition}</p>
                          <p><span className="font-medium">ROI:</span> <span className="text-green-600">{feature.roi}</span></p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600 mb-1">{feature.impactScore}%</div>
                        <div className="text-xs text-muted-foreground">ROI Score</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Development Cost Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>💰 Development Cost Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-4">TOTAL ROADMAP INVESTMENT:</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{costAnalysis.phase1.name}:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-green-600">{costAnalysis.phase1.cost}</span>
                        <span className="text-sm text-muted-foreground">({costAnalysis.phase1.timeline})</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{costAnalysis.phase2.name}:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-blue-600">{costAnalysis.phase2.cost}</span>
                        <span className="text-sm text-muted-foreground">({costAnalysis.phase2.timeline})</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{costAnalysis.phase3.name}:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-purple-600">{costAnalysis.phase3.cost}</span>
                        <span className="text-sm text-muted-foreground">({costAnalysis.phase3.timeline})</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600 mb-1">{costAnalysis.total.investment}</div>
                        <div className="text-sm text-muted-foreground">Total 6-Month Investment</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">{costAnalysis.total.revenueImpact}</div>
                        <div className="text-sm text-muted-foreground">Expected Revenue Impact</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600 mb-1">{costAnalysis.total.projectedROI}</div>
                        <div className="text-sm text-muted-foreground">Projected ROI</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-900">🎯 RECOMMENDED: Focus on Phase 1 + 2 first</span>
                    </div>
                    <p className="text-sm text-green-800 mt-1">
                      Quick wins establish foundation for major features
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <Button>
              <Download className="w-4 h-4 mr-2" />
              📋 Export Roadmap
            </Button>
            <Button variant="outline">
              <Target className="w-4 h-4 mr-2" />
              📊 Detailed Analysis
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              💡 Custom Plan
            </Button>
            <Button variant="outline">
              <CheckCircle className="w-4 h-4 mr-2" />
              🎯 Start Development
            </Button>
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              📈 Track Progress
            </Button>
            <Button variant="outline">
              <Clock className="w-4 h-4 mr-2" />
              🔄 Update Priorities
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}