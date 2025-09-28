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
  Eye, 
  Palette,
  BarChart3,
  Lightbulb,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  Star,
  Smartphone
} from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface CreativeDetailProps {
  app: any;
  onBack: () => void;
  onCompare: (apps: any[]) => void;
}

const competitorApps = [
  { name: 'Headspace', score: 86, style: 'Playful colors, lower conversion' },
  { name: 'Insight Timer', score: 78, style: 'Darker theme, meditation-focused' },
  { name: 'Ten Percent Happier', score: 74, style: 'Similar blues, less visual hierarchy' }
];

const uiPatterns = [
  { pattern: 'Card-based Layout', usage: '89%', trend: '+12%' },
  { pattern: 'Bottom Navigation', usage: '76%', trend: '+8%' },
  { pattern: 'Floating Action Button', usage: '45%', trend: '+23%' },
  { pattern: 'Progressive Disclosure', usage: '67%', trend: '+15%' }
];

const colorPsychology = {
  trustBlue: {
    hex: '#2D5AA0',
    name: 'Trust Blue',
    psychology: 'Builds trust and credibility, reduces anxiety',
    industries: 'Finance, Healthcare, Productivity',
    conversion: '+23% vs warm colors'
  },
  calmGreen: {
    hex: '#52C41A',
    name: 'Calm Green',
    psychology: 'Promotes relaxation and positive energy',
    industries: 'Health, Meditation, Environmental',
    conversion: '+15% for wellness apps'
  }
};

export function CreativeDetail({ app, onBack, onCompare }: CreativeDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Default app data if none provided
  const appData = app || {
    name: 'Calm',
    subtitle: 'Meditation & Sleep',
    category: 'Health & Fitness',
    rating: 4.8,
    reviews: '125K',
    colorHarmony: 94,
    uiScore: 87,
    description: 'Soothing blues + perfect white space balance',
    primaryColors: [
      { color: '#2D5AA0', name: 'Trust Blue', usage: 45 },
      { color: '#F8F9FA', name: 'Pure White', usage: 30 },
      { color: '#52C41A', name: 'Calm Green', usage: 15 },
      { color: '#1F1F1F', name: 'Deep Gray', usage: 10 }
    ],
    visualStyle: 'Professional',
    conversionRate: 12.4,
    revenue: '$70M'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Creative Hub
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Palette className="w-4 h-4 mr-2" />
            🎨 Extract Palette
          </Button>
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            📤 Export Analysis
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
                  {appData.name} - {appData.subtitle}
                </CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{appData.category}</span>
                  <span>•</span>
                  <span>⭐ {appData.rating} ({appData.reviews})</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Visual Performance Scores */}
      <Card>
        <CardHeader>
          <CardTitle>🎨 Visual Performance Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Color Harmony</p>
              <p className={`text-3xl font-semibold mb-2 ${getScoreColor(94)}`}>94/100</p>
              <Progress value={94} className="h-2" />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Typography Readability</p>
              <p className={`text-3xl font-semibold mb-2 ${getScoreColor(91)}`}>91/100</p>
              <Progress value={91} className="h-2" />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Layout Balance</p>
              <p className={`text-3xl font-semibold mb-2 ${getScoreColor(88)}`}>88/100</p>
              <Progress value={88} className="h-2" />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">UI Elements Consistency</p>
              <p className={`text-3xl font-semibold mb-2 ${getScoreColor(89)}`}>89/100</p>
              <Progress value={89} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Screenshots</TabsTrigger>
          <TabsTrigger value="colors">Color Analysis</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="comparison">Competitive</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Screenshots Analysis */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  🖼️ Screenshots Analysis
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['Home Screen', 'Meditation', 'Sleep Stories', 'Profile'].map((screen, index) => (
                  <div key={index} className="space-y-2">
                    <div className="aspect-[9/16] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border border-border">
                      <div className="text-center p-4">
                        <Smartphone className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{screen}</p>
                      </div>
                    </div>
                    <p className="text-sm text-center font-medium">{screen}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* UI Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>📱 UI Patterns Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {uiPatterns.map((pattern, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{pattern.pattern}</span>
                      <Badge variant="outline">{pattern.usage}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Industry usage</span>
                      <Badge className="text-green-600 bg-green-50">{pattern.trend}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-6">
          {/* Color Palette Extraction */}
          <Card>
            <CardHeader>
              <CardTitle>🌈 Color Palette Extraction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-4">Primary Colors:</h4>
                <div className="space-y-4">
                  {appData.primaryColors.map((colorData, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                      <div 
                        className="w-16 h-16 rounded-lg border border-border"
                        style={{ backgroundColor: colorData.color }}
                      ></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm">{colorData.color}</span>
                          <span className="font-medium">({colorData.name})</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Usage: {colorData.usage}% • {colorData.usage > 30 ? 'Primary' : colorData.usage > 15 ? 'Secondary' : 'Accent'} color
                        </p>
                        <div className="mt-2">
                          <Progress value={colorData.usage} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold mb-3">Color Psychology Impact:</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>Trust Blue (#2D5AA0):</strong> Creates feelings of trust and calm. Studies show 23% higher conversion rates vs warm colors in wellness apps.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-900">
                      <strong>Calm Green (#52C41A):</strong> Promotes relaxation and positive energy. Increases session duration by 15% in meditation apps.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold mb-3">Performance Correlation:</h4>
                <div className="space-y-2 text-sm">
                  <p>• Apps with similar color schemes: <span className="font-medium text-green-600">+23% better ratings</span></p>
                  <p>• Blue-dominant meditation apps: <span className="font-medium text-green-600">+34% user retention</span></p>
                  <p>• This visual style: <span className="font-medium text-green-600">Premium positioning successful</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {/* AI Creative Insights */}
          <Card>
            <CardHeader>
              <CardTitle>🤖 AI Creative Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  ✅ STRENGTHS:
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                    <span>Consistent blue theme creates trust and calm feeling across all screens</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                    <span>Excellent white space usage reduces cognitive load and improves focus</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                    <span>Typography hierarchy guides user attention perfectly through content</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                    <span>Icon style consistent across all screens maintaining visual cohesion</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  ⚠️ OPPORTUNITIES:
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                    <span>Consider adding dark mode (67% of users request it in feedback)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                    <span>CTA buttons could be more prominent (A/B test with orange accents)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                    <span>Meditation timer could use more visual feedback for progress tracking</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  📊 PERFORMANCE CORRELATION:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg text-center">
                    <p className="text-lg font-semibold text-green-700">+23%</p>
                    <p className="text-sm text-green-600">Better ratings vs competitors</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <p className="text-lg font-semibold text-blue-700">+34%</p>
                    <p className="text-sm text-blue-600">User retention increase</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg text-center">
                    <p className="text-lg font-semibold text-purple-700">Premium</p>
                    <p className="text-sm text-purple-600">Positioning successful</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          {/* Competitive Visual Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>🏆 Competitive Visual Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitorApps.map((competitor, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">vs {competitor.name}</span>
                      <Badge variant="outline">{competitor.score}/100</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{competitor.style}</p>
                    <div className="mt-2">
                      <Progress value={competitor.score} className="h-2" />
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Full Comparison Report →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Position */}
          <Card>
            <CardHeader>
              <CardTitle>📈 Market Position</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Visual Style Ranking:</p>
                    <p className="text-muted-foreground">#1 in Health & Fitness</p>
                  </div>
                  <div>
                    <p className="font-medium">Color Harmony Score:</p>
                    <p className="text-muted-foreground">Top 5% globally</p>
                  </div>
                  <div>
                    <p className="font-medium">UI Consistency:</p>
                    <p className="text-muted-foreground">Above industry average</p>
                  </div>
                  <div>
                    <p className="font-medium">User Preference:</p>
                    <p className="text-muted-foreground">92% approval rating</p>
                  </div>
                </div>
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
              <Palette className="w-4 h-4 mr-2" />
              🎨 Extract Palette
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              📊 UI Benchmark
            </Button>
            <Button variant="outline">
              <Lightbulb className="w-4 h-4 mr-2" />
              💡 Get Ideas
            </Button>
            <Button variant="outline">
              <Target className="w-4 h-4 mr-2" />
              📱 Similar Apps
            </Button>
            <Button variant="outline">
              <Share className="w-4 h-4 mr-2" />
              📤 Export Analysis
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              💾 Save Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}