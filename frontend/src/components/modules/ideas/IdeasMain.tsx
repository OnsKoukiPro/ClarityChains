import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Checkbox } from '../../ui/checkbox';
import { 
  Lightbulb, 
  Dice6, 
  Save,
  Settings,
  BarChart3,
  Search,
  Eye,
  TrendingUp,
  Target,
  Zap,
  Folder,
  ChevronRight
} from 'lucide-react';

interface IdeasMainProps {
  onIdeaSelect: (idea: any) => void;
}

const categories = [
  'Any Category',
  'Health & Fitness',
  'Productivity',
  'Education',
  'Finance',
  'Entertainment',
  'Social Networking',
  'Games',
  'Business',
  'Travel',
  'Food & Drink',
  'Lifestyle'
];

const targetUsers = [
  'General',
  'Professionals',
  'Students',
  'Parents',
  'Seniors',
  'Millennials',
  'Gen Z',
  'Small Business',
  'Enterprises',
  'Creators'
];

const complexityLevels = [
  'Simple',
  'Medium',
  'Complex'
];

const recentIdeas = [
  {
    id: 1,
    name: 'AI Fitness Coach with Voice Commands',
    category: 'Health & Fitness',
    opportunityScore: 87,
    marketGap: 'Voice-first fitness apps underserved',
    description: 'AI-powered fitness coaching through voice commands for hands-free workouts',
    targetMarket: 'Busy professionals and home fitness enthusiasts',
    keyFeatures: ['Voice-controlled workouts', 'AI form analysis', 'Personalized coaching'],
    monetization: 'Freemium with $9.99/month premium',
    generatedDate: 'March 15, 2025'
  },
  {
    id: 2,
    name: 'Study Planner with AI Scheduling',
    category: 'Education',
    opportunityScore: 73,
    marketGap: 'Smart scheduling for students',
    description: 'AI-powered study planning that adapts to learning patterns and deadlines',
    targetMarket: 'College and high school students',
    keyFeatures: ['Adaptive scheduling', 'Progress tracking', 'Study streak gamification'],
    monetization: 'Student subscription $4.99/month',
    generatedDate: 'March 14, 2025'
  },
  {
    id: 3,
    name: 'Micro-Investment Gaming App',
    category: 'Finance',
    opportunityScore: 82,
    marketGap: 'Gamified investing for beginners',
    description: 'Turn investing into a game with micro-investments and achievement systems',
    targetMarket: 'Young adults new to investing',
    keyFeatures: ['Micro-investments', 'Achievement system', 'Educational quests'],
    monetization: 'Commission-free with premium insights',
    generatedDate: 'March 13, 2025'
  },
  {
    id: 4,
    name: 'Plant Care AI Assistant',
    category: 'Lifestyle',
    opportunityScore: 68,
    marketGap: 'Smart plant care guidance',
    description: 'AI-powered plant identification and care recommendations with IoT integration',
    targetMarket: 'Plant enthusiasts and urban gardeners',
    keyFeatures: ['Plant identification', 'Care reminders', 'Disease diagnosis'],
    monetization: 'Premium features $6.99/month',
    generatedDate: 'March 12, 2025'
  }
];

const trendingOpportunities = [
  { name: 'AI-powered productivity tools', growth: '+67%', category: 'Productivity' },
  { name: 'Voice-first interfaces', growth: '+45%', category: 'Technology' },
  { name: 'Sustainability tracking apps', growth: '+89%', category: 'Lifestyle' },
  { name: 'Mental health gamification', growth: '+34%', category: 'Health' }
];

export function IdeasMain({ onIdeaSelect }: IdeasMainProps) {
  const [category, setCategory] = useState('Any Category');
  const [targetUser, setTargetUser] = useState('General');
  const [complexity, setComplexity] = useState('Medium');
  const [basedOnTrends, setBasedOnTrends] = useState(true);
  const [includeUserFeedback, setIncludeUserFeedback] = useState(true);
  const [considerMonetization, setConsiderMonetization] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateIdeas = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      // For now, just scroll to recent ideas
      document.getElementById('recent-ideas')?.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  };

  const getOpportunityScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 65) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ideas Generated</p>
                <p className="text-2xl font-semibold">1,247</p>
              </div>
              <Lightbulb className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Opportunity</p>
                <p className="text-2xl font-semibold">89</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Saved Ideas</p>
                <p className="text-2xl font-semibold">12</p>
              </div>
              <Save className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-semibold">94%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Generator */}
        <div className="lg:col-span-2 space-y-6">
          {/* Idea Generator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💡 Generate New App Ideas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Input Preferences */}
              <div className="space-y-4">
                <div>
                  <h4 className="mb-3 flex items-center gap-2">
                    🎯 What type of app are you interested in?
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm mb-2 block">Category:</label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm mb-2 block">Target Users:</label>
                      <Select value={targetUser} onValueChange={setTargetUser}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {targetUsers.map((user) => (
                            <SelectItem key={user} value={user}>{user}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm mb-2 block">Complexity:</label>
                      <Select value={complexity} onValueChange={setComplexity}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {complexityLevels.map((level) => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="trends" 
                      checked={basedOnTrends}
                      onCheckedChange={(checked) => setBasedOnTrends(checked as boolean)}
                    />
                    <label htmlFor="trends" className="text-sm">
                      🔍 Based on current trends
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="feedback" 
                      checked={includeUserFeedback}
                      onCheckedChange={(checked) => setIncludeUserFeedback(checked as boolean)}
                    />
                    <label htmlFor="feedback" className="text-sm">
                      💬 Include user feedback analysis
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="monetization" 
                      checked={considerMonetization}
                      onCheckedChange={(checked) => setConsiderMonetization(checked as boolean)}
                    />
                    <label htmlFor="monetization" className="text-sm">
                      💰 Consider monetization potential
                    </label>
                  </div>
                </div>

                {/* Generate Button */}
                <Button 
                  onClick={handleGenerateIdeas}
                  disabled={isGenerating}
                  className="w-full h-12"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Ideas...
                    </>
                  ) : (
                    <>
                      <Dice6 className="w-5 h-5 mr-2" />
                      🎲 Generate Ideas
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Ideas */}
          <Card id="recent-ideas">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💡 Recent Ideas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentIdeas.map((idea) => (
                  <div 
                    key={idea.id}
                    className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={() => onIdeaSelect(idea)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1 flex items-center gap-2">
                          🏃 "{idea.name}"
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <span>{idea.category}</span>
                          <span>•</span>
                          <span>Opportunity Score: <span className={`font-medium ${getOpportunityScoreColor(idea.opportunityScore).split(' ')[0]}`}>
                            {idea.opportunityScore}/100
                          </span></span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Market Gap: {idea.marketGap}
                        </p>
                      </div>
                      <Badge className={getOpportunityScoreColor(idea.opportunityScore)}>
                        {idea.opportunityScore}/100
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        📊 View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Save className="w-4 h-4 mr-1" />
                        💾 Save
                      </Button>
                      <Button variant="outline" size="sm">
                        <Search className="w-4 h-4 mr-1" />
                        🔍 Research
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
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">⚡ Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={handleGenerateIdeas}>
                <Zap className="w-4 h-4 mr-2" />
                Quick Generate
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Find Market Gaps
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending Ideas
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analyze Competitors
              </Button>
            </CardContent>
          </Card>

          {/* Saved Ideas */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  📁 Saved Ideas (12)
                </CardTitle>
                <Button variant="ghost" size="sm">
                  Manage →
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 border border-border rounded hover:bg-muted/50">
                  <span>AI Fitness Coach</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between p-2 border border-border rounded hover:bg-muted/50">
                  <span>Study Planner AI</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between p-2 border border-border rounded hover:bg-muted/50">
                  <span>Plant Care Assistant</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trending Opportunities */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">🔥 Trending Opportunities</CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingOpportunities.map((opportunity, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{opportunity.name}</span>
                      <Badge variant="secondary" className="text-green-600 bg-green-50">
                        {opportunity.growth}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{opportunity.category}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generation Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">💡 Generation Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Be specific about your target users for better results</p>
              <p>• Enable trend analysis for market-relevant ideas</p>
              <p>• Consider monetization early in the ideation process</p>
              <p>• Save promising ideas for detailed analysis</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}