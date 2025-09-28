import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Checkbox } from '../../ui/checkbox';
import { Progress } from '../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { 
  ArrowLeft, 
  RefreshCw, 
  Download, 
  Plus,
  CheckCircle,
  X,
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  Target,
  BarChart3
} from 'lucide-react';

interface FeatureComparisonProps {
  category?: string;
  onBack: () => void;
}

const taskManagementApps = [
  { id: 'todoist', name: 'Todoist', selected: true },
  { id: 'asana', name: 'Asana', selected: true },
  { id: 'notion', name: 'Notion', selected: true },
  { id: 'clickup', name: 'ClickUp', selected: true },
  { id: 'monday', name: 'Monday.com', selected: true }
];

const featureMatrix = [
  {
    feature: '📝 Basic Tasks',
    category: 'Core',
    todoist: 'full',
    asana: 'full',
    notion: 'full',
    clickup: 'full',
    monday: 'full'
  },
  {
    feature: '📅 Calendar Sync',
    category: 'Integration',
    todoist: 'full',
    asana: 'full',
    notion: 'partial',
    clickup: 'full',
    monday: 'full'
  },
  {
    feature: '👥 Team Collaboration',
    category: 'Team',
    todoist: 'partial',
    asana: 'full',
    notion: 'full',
    clickup: 'full',
    monday: 'full'
  },
  {
    feature: '📊 Project Templates',
    category: 'Productivity',
    todoist: 'none',
    asana: 'full',
    notion: 'full',
    clickup: 'full',
    monday: 'full'
  },
  {
    feature: '🔄 Automation Rules',
    category: 'Advanced',
    todoist: 'partial',
    asana: 'full',
    notion: 'none',
    clickup: 'full',
    monday: 'full'
  },
  {
    feature: '📈 Time Tracking',
    category: 'Analytics',
    todoist: 'none',
    asana: 'full',
    notion: 'none',
    clickup: 'full',
    monday: 'full'
  },
  {
    feature: '📱 Mobile App',
    category: 'Platform',
    todoist: 'full',
    asana: 'full',
    notion: 'full',
    clickup: 'full',
    monday: 'full'
  },
  {
    feature: '🔌 API Access',
    category: 'Developer',
    todoist: 'full',
    asana: 'full',
    notion: 'full',
    clickup: 'full',
    monday: 'full'
  },
  {
    feature: '🌙 Dark Mode',
    category: 'UX',
    todoist: 'full',
    asana: 'full',
    notion: 'full',
    clickup: 'full',
    monday: 'none'
  },
  {
    feature: '🎤 Voice Commands',
    category: 'AI',
    todoist: 'none',
    asana: 'none',
    notion: 'none',
    clickup: 'partial',
    monday: 'none'
  },
  {
    feature: '🤖 AI Features',
    category: 'AI',
    todoist: 'none',
    asana: 'partial',
    notion: 'full',
    clickup: 'partial',
    monday: 'none'
  },
  {
    feature: '📴 Offline Mode',
    category: 'Platform',
    todoist: 'full',
    asana: 'partial',
    notion: 'partial',
    clickup: 'full',
    monday: 'none'
  },
  {
    feature: '🔐 Security Features',
    category: 'Security',
    todoist: 'full',
    asana: 'full',
    notion: 'full',
    clickup: 'full',
    monday: 'full'
  },
  {
    feature: '💰 Pricing (Basic)',
    category: 'Pricing',
    todoist: 'Free',
    asana: 'Free',
    notion: 'Free',
    clickup: 'Free',
    monday: '$8/mo'
  },
  {
    feature: '💳 Pricing (Pro)',
    category: 'Pricing',
    todoist: '$4/mo',
    asana: '$11/mo',
    notion: '$8/mo',
    clickup: '$7/mo',
    monday: '$10/mo'
  }
];

const featureGaps = [
  {
    title: 'VOICE COMMANDS (96% missing)',
    description: 'Only ClickUp has partial voice support',
    demand: 'User demand: 78% want voice task creation',
    advantage: 'Competitive advantage: High',
    priority: 'Major'
  },
  {
    title: 'AI TASK SUGGESTIONS (80% missing)',
    description: 'Only Notion has basic AI features',
    demand: 'User demand: 85% want smart recommendations',
    advantage: 'Technical feasibility: Medium',
    priority: 'Major'
  },
  {
    title: 'ADVANCED OFFLINE MODE (60% missing)',
    description: 'Most apps have limited offline functionality',
    demand: 'User demand: 72% work offline regularly',
    advantage: 'Implementation cost: Low',
    priority: 'Major'
  }
];

const nicheOpportunities = [
  'Calendar-first task management (workflow gap)',
  'Industry-specific templates (healthcare, legal)',
  'Habit tracking integration',
  'Wellness/break reminders'
];

const featureAdoption = [
  {
    trend: 'Rising Fast (Next 6 months)',
    features: [
      'AI task suggestions: +89% user interest',
      'Voice commands: +67% productivity app adoption',
      'Widget customization: +45% mobile user requests'
    ]
  },
  {
    trend: 'Becoming Standard',
    features: [
      'Dark mode: 89% of apps now offer this',
      'Calendar integration: 78% have basic sync',
      'Mobile apps: 96% feature parity with web'
    ]
  },
  {
    trend: 'Declining',
    features: [
      'Basic kanban boards: oversaturated feature',
      'Simple reminder notifications: users want smarter'
    ]
  }
];

export function FeatureComparison({ category = 'Task Management Apps', onBack }: FeatureComparisonProps) {
  const [selectedApps, setSelectedApps] = useState(taskManagementApps);
  const [activeTab, setActiveTab] = useState('matrix');

  const getFeatureIcon = (status: string) => {
    switch (status) {
      case 'full': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'partial': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'none': return <X className="w-4 h-4 text-red-500" />;
      default: return <span className="text-sm font-medium">{status}</span>;
    }
  };

  const getFeatureSymbol = (status: string) => {
    switch (status) {
      case 'full': return '✅';
      case 'partial': return '⚠️';
      case 'none': return '❌';
      default: return status;
    }
  };

  const handleAppToggle = (appId: string) => {
    setSelectedApps(prev => 
      prev.map(app => 
        app.id === appId ? { ...app, selected: !app.selected } : app
      )
    );
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
            <RefreshCw className="w-4 h-4 mr-2" />
            🔄 Update Analysis
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            📤 Export Comparison
          </Button>
        </div>
      </div>

      {/* Page Title */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">⚙️ Feature Comparison: {category}</CardTitle>
          <p className="text-muted-foreground">
            Comprehensive feature analysis and competitive intelligence across leading apps
          </p>
        </CardHeader>
      </Card>

      {/* App Selection */}
      <Card>
        <CardHeader>
          <CardTitle>📱 Apps in Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            {selectedApps.map((app) => (
              <div key={app.id} className="flex items-center space-x-2">
                <Checkbox
                  id={app.id}
                  checked={app.selected}
                  onCheckedChange={() => handleAppToggle(app.id)}
                />
                <label htmlFor={app.id} className="text-sm font-medium cursor-pointer">
                  {app.name}
                </label>
              </div>
            ))}
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add more apps...
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="matrix">Feature Matrix</TabsTrigger>
          <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
          <TabsTrigger value="trends">Adoption Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="matrix" className="space-y-6">
          {/* Core Features Comparison Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Core Features Comparison Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Feature</th>
                      {selectedApps.filter(app => app.selected).map((app) => (
                        <th key={app.id} className="text-center p-3 font-medium">{app.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {featureMatrix.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">{row.feature}</td>
                        {selectedApps.filter(app => app.selected).map((app) => (
                          <td key={app.id} className="text-center p-3">
                            {getFeatureSymbol(row[app.id as keyof typeof row] as string)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-6">
          {/* Feature Gap Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 Feature Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-4">🔥 MAJOR OPPORTUNITIES:</h4>
                  
                  <div className="space-y-4">
                    {featureGaps.map((gap, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg border-l-4 border-red-500">
                        <h5 className="font-medium text-red-800 mb-2">{gap.title}</h5>
                        <div className="space-y-1 text-sm">
                          <p className="text-red-700">{gap.description}</p>
                          <p className="text-blue-700">{gap.demand}</p>
                          <p className="text-green-700">{gap.advantage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-4">💡 NICHE OPPORTUNITIES:</h4>
                  
                  <div className="space-y-2">
                    {nicheOpportunities.map((opportunity, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white rounded">
                        <Lightbulb className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-800">• {opportunity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Feature Adoption Trends */}
          <Card>
            <CardHeader>
              <CardTitle>📈 Feature Adoption Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {featureAdoption.map((category, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <h4 className="font-semibold mb-3 text-green-600">{category.trend}:</h4>
                    <ul className="space-y-2">
                      {category.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <TrendingUp className="w-4 h-4 text-green-500 mt-0.5" />
                          <span>• {feature}</span>
                        </li>
                      ))}
                    </ul>
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
            <Button>
              <Lightbulb className="w-4 h-4 mr-2" />
              💡 Generate Feature Ideas
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              📊 Detailed Comparison
            </Button>
            <Button variant="outline">
              <Target className="w-4 h-4 mr-2" />
              🎯 Build Feature Strategy
            </Button>
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              📈 Track Feature Trends
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}