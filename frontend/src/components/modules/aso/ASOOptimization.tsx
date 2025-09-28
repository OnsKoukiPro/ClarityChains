import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Progress } from '../../ui/progress';
import { 
  ArrowLeft, 
  Save, 
  Share, 
  Copy,
  Mail,
  RefreshCw,
  Target,
  BarChart3,
  Lightbulb,
  CheckCircle,
  Zap,
  PenTool,
  Download,
  Settings
} from 'lucide-react';

interface ASOOptimizationProps {
  onBack: () => void;
}

const optimizedVariations = [
  {
    id: 'a',
    name: 'VARIATION A (Current)',
    title: 'TaskFlow Pro: Task Manager',
    subtitle: 'To-Do List & Daily Planner Organizer',
    titleLength: 29,
    subtitleLength: 38,
    recommendation: 'Recommended',
    expectedImprovement: '+25%'
  },
  {
    id: 'b',
    name: 'VARIATION B (Alternative)',
    title: 'TaskFlow: To-Do List Manager',
    subtitle: 'Daily Planner & Project Organizer',
    titleLength: 31,
    subtitleLength: 35,
    recommendation: 'Alternative',
    expectedImprovement: '+20%'
  },
  {
    id: 'c',
    name: 'VARIATION C (Aggressive)',
    title: 'TaskFlow - Best Task Manager',
    subtitle: 'Top To-Do List & Daily Planner App',
    titleLength: 33,
    subtitleLength: 37,
    recommendation: 'Test',
    expectedImprovement: '+15%'
  }
];

const keywordDensityAnalysis = [
  { keyword: 'task manager', mentions: 4, status: 'optimal', color: 'text-green-600' },
  { keyword: 'to do list', mentions: 3, status: 'good', color: 'text-green-600' },
  { keyword: 'productivity', mentions: 2, status: 'appropriate', color: 'text-blue-600' },
  { keyword: 'daily planner', mentions: 2, status: 'good', color: 'text-green-600' },
  { keyword: 'project manager', mentions: 1, status: 'low', color: 'text-yellow-600' }
];

const impactPredictions = [
  {
    metric: '"task manager" ranking',
    before: '#47',
    after: '#23',
    improvement: '+24 positions'
  },
  {
    metric: '"to do list" ranking',
    before: 'Unranked',
    after: '#35',
    improvement: 'New ranking'
  },
  {
    metric: 'Total keyword visibility',
    before: '32%',
    after: '67%',
    improvement: '+67%'
  },
  {
    metric: 'Organic downloads',
    before: '1,250/month',
    after: '1,688/month',
    improvement: '+35%'
  },
  {
    metric: 'App Store conversion',
    before: '2.4%',
    after: '2.8%',
    improvement: '+15%'
  }
];

export function ASOOptimization({ onBack }: ASOOptimizationProps) {
  const [appName, setAppName] = useState('TaskFlow Pro');
  const [category, setCategory] = useState('productivity');
  const [mainFeature, setMainFeature] = useState('Task Management & Organization');
  const [targetKeywords, setTargetKeywords] = useState('task manager, to do list, productivity');
  const [activeTab, setActiveTab] = useState('generator');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const getLengthColor = (length: number, type: 'title' | 'subtitle') => {
    const optimal = type === 'title' ? 30 : 40;
    if (length <= optimal) return 'text-green-600';
    if (length <= optimal + 10) return 'text-yellow-600';
    return 'text-red-600';
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
            <PenTool className="w-4 h-4 mr-2" />
            📝 Save Template
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            📤 Export Copy
          </Button>
        </div>
      </div>

      {/* Page Title */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🤖 AI-Powered ASO Copy Generator</CardTitle>
          <p className="text-muted-foreground">
            Generate optimized app store metadata using advanced AI analysis and keyword intelligence
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generator">Copy Generator</TabsTrigger>
          <TabsTrigger value="variations">A/B Variations</TabsTrigger>
          <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          {/* App Information Input */}
          <Card>
            <CardHeader>
              <CardTitle>📱 App Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="appName">App Name</Label>
                  <Input 
                    id="appName"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="TaskFlow Pro"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="health">Health & Fitness</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="mainFeature">Main Feature</Label>
                <Input 
                  id="mainFeature"
                  value={mainFeature}
                  onChange={(e) => setMainFeature(e.target.value)}
                  placeholder="Task Management & Organization"
                />
              </div>
              
              <div>
                <Label htmlFor="targetKeywords">Target Keywords</Label>
                <Textarea 
                  id="targetKeywords"
                  value={targetKeywords}
                  onChange={(e) => setTargetKeywords(e.target.value)}
                  placeholder="task manager, to do list, productivity"
                  rows={3}
                />
              </div>

              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    🤖 Generating AI Copy...
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4 mr-2" />
                    🎯 Generate Optimized Copy
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated ASO Copy */}
          <Card>
            <CardHeader>
              <CardTitle>✨ Generated ASO Copy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Optimized App Title */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">📱 OPTIMIZED APP TITLE:</h4>
                    <Badge variant="outline" className="text-green-600 bg-green-50">
                      29 characters - optimal length
                    </Badge>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="font-medium text-lg">"TaskFlow Pro: Task Manager"</p>
                  </div>
                </div>

                {/* Optimized Subtitle */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">📝 OPTIMIZED SUBTITLE:</h4>
                    <Badge variant="outline" className="text-green-600 bg-green-50">
                      38 characters - includes high-volume keywords
                    </Badge>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="font-medium">"To-Do List & Daily Planner Organizer"</p>
                  </div>
                </div>

                {/* Optimized Keywords */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">🔤 OPTIMIZED KEYWORDS:</h4>
                    <Badge variant="outline" className="text-green-600 bg-green-50">
                      98 characters - maximized keyword density
                    </Badge>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm font-mono">
                      "to do list,daily planner,project manager,productivity,work organizer,team tasks,goal tracker,task planner"
                    </p>
                  </div>
                </div>

                {/* Optimized Description */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">📄 OPTIMIZED DESCRIPTION (First 2 lines):</h4>
                    <Badge variant="outline" className="text-blue-600 bg-blue-50">
                      Keyword optimized
                    </Badge>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm">
                      "The ultimate task manager and to-do list app for busy professionals. Organize projects, plan daily tasks, and boost productivity with our powerful project manager tools..."
                    </p>
                  </div>
                </div>

                {/* Keyword Density Analysis */}
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-3">📊 KEYWORD DENSITY ANALYSIS:</h4>
                  <div className="space-y-2">
                    {keywordDensityAnalysis.map((analysis, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">• "{analysis.keyword}": {analysis.mentions} mentions</span>
                        <Badge variant="outline" className={analysis.color}>
                          ({analysis.status})
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  📧 Email Copy
                </Button>
                <Button variant="outline">
                  <Save className="w-4 h-4 mr-2" />
                  💾 Save Variations
                </Button>
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  🔄 Generate More
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variations" className="space-y-6">
          {/* A/B Test Variations */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 A/B Test Variations</CardTitle>
              <p className="text-muted-foreground">
                Multiple optimized versions to test and find the best performing copy
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {optimizedVariations.map((variation) => (
                  <div key={variation.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{variation.name}:</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={
                          variation.recommendation === 'Recommended' ? 'text-green-600 bg-green-50' :
                          variation.recommendation === 'Alternative' ? 'text-blue-600 bg-blue-50' :
                          'text-yellow-600 bg-yellow-50'
                        }>
                          {variation.recommendation}
                        </Badge>
                        <Badge variant="outline" className="text-green-600">
                          {variation.expectedImprovement} expected
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Title:</span>
                          <span className={`text-xs ${getLengthColor(variation.titleLength, 'title')}`}>
                            {variation.titleLength} chars
                          </span>
                        </div>
                        <p className="text-sm p-2 bg-muted/30 rounded">{variation.title}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Subtitle:</span>
                          <span className={`text-xs ${getLengthColor(variation.subtitleLength, 'subtitle')}`}>
                            {variation.subtitleLength} chars
                          </span>
                        </div>
                        <p className="text-sm p-2 bg-muted/30 rounded">{variation.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Test
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900 mb-1">🤖 AI Recommendation:</h5>
                    <p className="text-sm text-blue-800">
                      Test Variation A first - it has the optimal balance of keyword coverage and length constraints. 
                      Expected improvement: +25% keyword rankings within 2-4 weeks.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          {/* Impact Prediction */}
          <Card>
            <CardHeader>
              <CardTitle>📈 Impact Prediction</CardTitle>
              <p className="text-muted-foreground">
                Estimated performance improvements based on AI analysis of similar optimizations
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-4">BEFORE → AFTER OPTIMIZATION:</h4>
                  
                  <div className="space-y-4">
                    {impactPredictions.map((prediction, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex-1">
                          <span className="font-medium text-sm">{prediction.metric}:</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">{prediction.before}</span>
                          <span>→</span>
                          <span className="font-medium">{prediction.after}</span>
                          <Badge className="text-green-600 bg-green-50 ml-2">
                            {prediction.improvement}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ROI Timeline */}
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-4">🗓️ ROI Timeline:</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                        1-2
                      </div>
                      <div>
                        <p className="font-medium">Week 1-2: Initial ranking improvements</p>
                        <p className="text-sm text-muted-foreground">App store algorithms begin recognizing optimized keywords</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold text-sm">
                        3-4
                      </div>
                      <div>
                        <p className="font-medium">Week 3-4: Download volume increase</p>
                        <p className="text-sm text-muted-foreground">Improved visibility translates to more organic downloads</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-sm">
                        2M
                      </div>
                      <div>
                        <p className="font-medium">Month 2: Full optimization impact visible</p>
                        <p className="text-sm text-muted-foreground">Complete keyword ranking improvements and sustained growth</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confidence Score */}
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-green-900">🎯 Confidence Score</h4>
                    <Badge className="text-green-600 bg-green-100">87% Confidence</Badge>
                  </div>
                  <p className="text-sm text-green-800 mb-3">
                    Based on analysis of 10,000+ similar ASO optimizations in the productivity category
                  </p>
                  <Progress value={87} className="h-2" />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  📱 Apply to App Store
                </Button>
                <Button variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  📊 Set Up Tracking
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  📤 Export Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}