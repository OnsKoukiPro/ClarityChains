import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { 
  ArrowLeft, 
  Save, 
  Share, 
  BarChart3, 
  Eye, 
  Users, 
  DollarSign,
  Star,
  AlertTriangle,
  Target,
  TrendingUp,
  FileText,
  Lightbulb,
  Search
} from 'lucide-react';

interface IdeaDetailProps {
  idea: any;
  onBack: () => void;
}

const competitiveAnalysis = [
  { name: 'Nike Training Club', score: 92, features: 'Video workouts, tracking' },
  { name: 'MyFitnessPal', score: 89, features: 'Nutrition, basic workouts' },
  { name: 'Freeletics', score: 76, features: 'AI coaching, no voice' },
  { name: 'Sworkit', score: 71, features: 'Customizable workouts' }
];

const marketData = {
  totalMarketSize: '$96B',
  annualGrowth: '14.7%',
  competitorCount: 2847,
  averageRating: 4.2,
  topCountries: ['US', 'UK', 'Germany', 'Canada', 'Australia']
};

const developmentTimeline = [
  { phase: 'MVP Development', duration: '3-4 months', effort: 'High' },
  { phase: 'Voice Integration', duration: '2-3 months', effort: 'Medium' },
  { phase: 'AI Form Analysis', duration: '4-6 months', effort: 'High' },
  { phase: 'Beta Testing', duration: '2 months', effort: 'Medium' },
  { phase: 'Market Launch', duration: '1 month', effort: 'Low' }
];

export function IdeaDetail({ idea, onBack }: IdeaDetailProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 65) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 65) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Ideas
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            💾 Save
          </Button>
          <Button variant="outline">
            <Share className="w-4 h-4 mr-2" />
            📤 Share
          </Button>
        </div>
      </div>

      {/* Idea Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">
                💡 {idea.name}
              </CardTitle>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Badge variant="secondary">{idea.category}</Badge>
                <span>•</span>
                <span>Generated {idea.generatedDate}</span>
              </div>
            </div>
            <Badge className={`${getScoreColor(idea.opportunityScore)} bg-green-50 text-lg px-3 py-1`}>
              📊 Opportunity Score: {idea.opportunityScore}/100
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Market Demand</p>
              <p className="text-2xl font-semibold text-green-600 mb-1">92/100</p>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Competition</p>
              <p className="text-2xl font-semibold text-yellow-600 mb-1">74/100</p>
              <Progress value={74} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Tech Complexity</p>
              <p className="text-2xl font-semibold text-orange-600 mb-1">68/100</p>
              <Progress value={68} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Revenue Potential</p>
              <p className="text-2xl font-semibold text-green-600 mb-1">85/100</p>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Concept Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💭 Concept Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">
                A fitness app that uses voice commands and AI to provide personalized workout guidance, 
                form corrections, and motivation. Users can work out hands-free while receiving real-time 
                coaching through voice interactions. The app combines computer vision for form analysis 
                with natural language processing for conversational coaching.
              </p>
            </CardContent>
          </Card>

          {/* Target Market */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                🎯 Target Market
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Busy professionals who prefer voice interaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Home fitness enthusiasts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Visually impaired fitness users</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>Users who want hands-free workout guidance</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Market Size:</strong> {marketData.totalMarketSize} fitness app market growing at {marketData.annualGrowth} annually
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                🌟 Key Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  'Voice-controlled workout selection',
                  'AI form analysis through camera',
                  'Personalized coaching based on fitness level',
                  'Progress tracking with voice commands',
                  'Integration with fitness wearables'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monetization Strategy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                💰 Monetization Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium mb-2">Freemium Model:</p>
                <p className="text-sm text-muted-foreground">Basic workouts free, premium AI coaching paid</p>
              </div>
              
              <div>
                <p className="font-medium mb-2">Subscription Pricing:</p>
                <p className="text-sm text-muted-foreground">$9.99/month or $79.99/year</p>
              </div>
              
              <div>
                <p className="font-medium mb-2">Estimated ARPU:</p>
                <p className="text-sm text-muted-foreground">$4.20/month based on similar apps</p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-900">
                  <strong>Revenue Projection:</strong> $150K ARR with 3,000 active users in year one
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Competitive Advantage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                🏆 Competitive Advantage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>First voice-first fitness coaching app</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>AI-powered form correction</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Accessibility-focused design</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Potential Challenges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                ⚠️ Potential Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Voice recognition accuracy during workouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Camera-based form analysis complexity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>User adoption of voice-first interface</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Competitive Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                📊 Competitive Landscape
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {competitiveAnalysis.map((competitor, index) => (
                  <div key={index} className="border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{competitor.name}</span>
                      <Badge variant="outline">{competitor.score}/100</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{competitor.features}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Development Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                ⏱️ Development Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {developmentTimeline.map((phase, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-sm">{phase.phase}</p>
                      <p className="text-xs text-muted-foreground">{phase.duration}</p>
                    </div>
                    <Badge variant={phase.effort === 'High' ? 'destructive' : phase.effort === 'Medium' ? 'secondary' : 'outline'}>
                      {phase.effort}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Total Development Time:</strong> 12-16 months for full feature set
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              🔍 Market Research
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              📊 Similar Apps
            </Button>
            <Button variant="outline">
              <Lightbulb className="w-4 h-4 mr-2" />
              💡 Refine Idea
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              📝 Business Plan
            </Button>
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              👥 Share
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              💾 Save to Collection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}