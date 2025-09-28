import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Smartphone, 
  Palette, 
  Eye, 
  Target, 
  ArrowRight,
  Star,
  Download,
  TrendingUp,
  Camera,
  Layout,
  MousePointer,
  Users,
  Zap,
  ArrowLeft
} from 'lucide-react';

interface UIUXModuleProps {
  subPage: string;
  selectedApp: any;
  onSubPageChange: (page: string, appData?: any) => void;
  appContext: any;
  welcomeContext?: any;
}

const uiElements = [
  { name: 'Primary Colors', score: 8.5, trend: '+12%', status: 'Excellent' },
  { name: 'Typography', score: 7.2, trend: '+5%', status: 'Good' },
  { name: 'Button Design', score: 6.8, trend: '-3%', status: 'Needs Work' },
  { name: 'Navigation', score: 9.1, trend: '+18%', status: 'Excellent' },
  { name: 'Visual Hierarchy', score: 7.9, trend: '+8%', status: 'Good' },
  { name: 'Icon System', score: 8.3, trend: '+15%', status: 'Excellent' }
];

const competitorComparison = [
  { app: 'Your App', design: 7.8, usability: 8.2, consistency: 7.5, overall: 7.8 },
  { app: 'Home AI', design: 8.9, usability: 7.6, consistency: 8.1, overall: 8.2 },
  { app: 'Room Planner', design: 8.1, usability: 9.2, consistency: 8.8, overall: 8.7 },
  { app: 'Planner 5D', design: 7.4, usability: 8.0, consistency: 7.2, overall: 7.5 },
  { app: 'AI Remodel', design: 8.7, usability: 7.1, consistency: 7.9, overall: 7.9 }
];

const quickInsights = [
  {
    id: 1,
    type: 'strength',
    title: 'Strong Navigation Design',
    description: 'Your bottom navigation performs 18% better than category average',
    impact: 'High',
    confidence: 92
  },
  {
    id: 2,
    type: 'opportunity',
    title: 'Button Consistency Gap',
    description: 'Inconsistent button styles may be reducing conversion by 8%',
    impact: 'Medium',
    confidence: 78
  },
  {
    id: 3,
    type: 'trend',
    title: 'Color Palette Advantage',
    description: 'Your color scheme aligns with 2024 design trends (+12% user preference)',
    impact: 'Medium',
    confidence: 85
  }
];

export function UIUXModule({ subPage, selectedApp, onSubPageChange, appContext }: UIUXModuleProps) {
  const [activeView, setActiveView] = useState('overview');

  if (subPage === 'detail') {
    return <UIUXDetail selectedApp={selectedApp} onBack={() => onSubPageChange('')} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">UI&UX Snapshot</h1>
          <p className="text-muted-foreground">Quick visual intelligence and interface insights for {appContext?.name}</p>
        </div>
        <Button onClick={() => onSubPageChange('detail', appContext)}>
          <Eye className="w-4 h-4 mr-2" />
          Deep Analysis
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall UI Score</p>
                <p className="text-2xl font-semibold">7.8</p>
                <p className="text-xs text-green-600">+0.3 vs last month</p>
              </div>
              <Smartphone className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Design Consistency</p>
                <p className="text-2xl font-semibold">7.5</p>
                <p className="text-xs text-yellow-600">Needs improvement</p>
              </div>
              <Layout className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">User Experience</p>
                <p className="text-2xl font-semibold">8.2</p>
                <p className="text-xs text-green-600">Above average</p>
              </div>
              <MousePointer className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Market Position</p>
                <p className="text-2xl font-semibold">#3</p>
                <p className="text-xs text-green-600">In category design</p>
              </div>
              <Target className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="elements">UI Elements</TabsTrigger>
          <TabsTrigger value="comparison">Competitor Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Quick UI/UX Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quickInsights.map((insight) => (
                  <div key={insight.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      insight.type === 'strength' ? 'bg-green-100 text-green-600' :
                      insight.type === 'opportunity' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {insight.type === 'strength' ? '💪' : insight.type === 'opportunity' ? '⚡' : '📈'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <Badge variant={insight.impact === 'High' ? 'default' : 'secondary'}>
                          {insight.impact} Impact
                        </Badge>
                        <span className="text-muted-foreground">Confidence: {insight.confidence}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Visual Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">🎨 Design Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Color Palette</span>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                      </div>
                      <Badge variant="outline" className="text-xs">Modern</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Typography</span>
                    <Badge variant="outline" className="text-xs">SF Pro / Roboto</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Icon Style</span>
                    <Badge variant="outline" className="text-xs">Outlined</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Layout Grid</span>
                    <Badge variant="outline" className="text-xs">12 Column</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">📱 User Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Navigation Type</span>
                    <Badge variant="outline" className="text-xs">Bottom Tab</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Interaction Style</span>
                    <Badge variant="outline" className="text-xs">Gesture + Touch</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Loading Pattern</span>
                    <Badge variant="outline" className="text-xs">Skeleton</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Feedback System</span>
                    <Badge variant="outline" className="text-xs">Haptic + Visual</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="elements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>UI Element Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uiElements.map((element) => (
                  <div key={element.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <Palette className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{element.name}</h4>
                        <p className="text-sm text-muted-foreground">Score: {element.score}/10</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={element.status === 'Excellent' ? 'default' : element.status === 'Good' ? 'secondary' : 'outline'}>
                        {element.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">{element.trend} trend</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Design Benchmarking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitorComparison.map((app) => (
                  <div key={app.app} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        app.app === 'Your App' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        📱
                      </div>
                      <div>
                        <h4 className="font-medium">{app.app}</h4>
                        <p className="text-sm text-muted-foreground">Overall: {app.overall}/10</p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-muted-foreground">Design</p>
                        <p className="font-medium">{app.design}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Usability</p>
                        <p className="font-medium">{app.usability}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Consistency</p>
                        <p className="font-medium">{app.consistency}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">⚡ Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start" onClick={() => onSubPageChange('detail', appContext)}>
              <Eye className="w-4 h-4 mr-2" />
              Deep UI Analysis
            </Button>
            <Button variant="outline" className="justify-start">
              <Camera className="w-4 h-4 mr-2" />
              Screenshot Analysis
            </Button>
            <Button variant="outline" className="justify-start">
              <Users className="w-4 h-4 mr-2" />
              User Testing Insights
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Detail page component
function UIUXDetail({ selectedApp, onBack }: { selectedApp: any, onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to UI&UX Snapshot
        </Button>
        <Badge variant="secondary">Deep Analysis</Badge>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Complete UI/UX Analysis</h1>
        <p className="text-muted-foreground">
          Comprehensive interface and experience analysis for {selectedApp?.name}
        </p>
      </div>

      {/* Detailed analysis would go here */}
      <Card>
        <CardHeader>
          <CardTitle>🔍 Detailed UI/UX Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Smartphone className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Deep UI/UX Analysis</h3>
            <p className="text-muted-foreground mb-4">
              Comprehensive interface analysis including accessibility, usability, and design patterns
            </p>
            <Button>
              <Camera className="w-4 h-4 mr-2" />
              Upload Screenshots for Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}