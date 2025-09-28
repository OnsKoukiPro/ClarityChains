import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  ArrowRight,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Brain,
  Search,
  Palette,
  Type,
  MessageSquare,
  Globe,
  Settings,
  Lightbulb,
  Bot,
  BarChart3,
  TestTube2,
  Activity,
  Eye,
  Star,
  Clock,
  Zap,
  CheckCircle,
  AlertTriangle,
  Play,
  Calendar
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (module: string) => void;
}

// Quick Access Module Groups (organized by new structure)
const moduleCategories = [
  {
    title: 'Enterprise Tools',
    description: 'Sales and learning management',
    modules: [
      { id: 'sales', label: 'Sales Engine', icon: Users, description: 'Lead generation and pipeline management', badge: null },
      { id: 'learning', label: 'Learning Engine', icon: Brain, description: 'AI model training and optimization', badge: null }
    ]
  },
  {
    title: 'Analytics Hub',
    description: 'Core analytics and data insights',
    modules: [
      { id: 'explorer', label: 'App Explorer', icon: Search, description: 'Discover and analyze apps', badge: null },
      { id: 'trends', label: 'Market Trends', icon: TrendingUp, description: 'Real-time market intelligence', badge: 'Live' },
      { id: 'cross-analysis', label: 'Cross Analysis', icon: BarChart3, description: 'Multi-module intelligence synthesis', badge: null }
    ]
  },
  {
    title: 'Intelligence Modules',
    description: 'Specialized app intelligence',
    modules: [
      { id: 'creative', label: 'Creative Analysis', icon: Palette, description: 'Visual design intelligence', badge: null },
      { id: 'aso', label: 'ASO Optimization', icon: Type, description: 'App store optimization', badge: null },
      { id: 'paywall', label: 'Paywall Scanner', icon: DollarSign, description: 'Monetization intelligence', badge: null },
      { id: 'reviews', label: 'Review Analytics', icon: MessageSquare, description: 'User feedback analysis', badge: null }
    ]
  },
  {
    title: 'Strategy & Growth',
    description: 'Growth optimization and planning',
    modules: [
      { id: 'ab-testing', label: 'AB Testing', icon: TestTube2, description: 'Data-driven growth experiments', badge: 'New' },
      { id: 'markets', label: 'Market Discovery', icon: Globe, description: 'Geographic opportunity analysis', badge: null },
      { id: 'features', label: 'Feature Intelligence', icon: Settings, description: 'Product feature analysis', badge: null }
    ]
  },
  {
    title: 'AI & Automation',
    description: 'Intelligent assistance and automation',
    modules: [
      { id: 'ideas', label: 'Ideas Generator', icon: Lightbulb, description: 'AI-powered improvement ideas', badge: 'AI' },
      { id: 'assistant', label: 'AI Assistant', icon: Bot, description: 'Intelligent workflow assistance', badge: null }
    ]
  }
];

// Sample data for dashboard overview
const dashboardStats = {
  totalApps: 2847,
  monthlyGrowth: 23.5,
  activeClients: 156,
  revenueImpact: 847200,
  aiRecommendations: 89,
  completedAnalyses: 1243
};

const recentActivities = [
  {
    id: 1,
    type: 'analysis',
    title: 'Instagram deep analysis completed',
    module: 'Explorer',
    time: '2 minutes ago',
    status: 'completed',
    icon: Eye
  },
  {
    id: 2,
    type: 'trend',
    title: 'Social Media apps trending upward +15%',
    module: 'Trends',
    time: '5 minutes ago',
    status: 'live',
    icon: TrendingUp
  },
  {
    id: 3,
    type: 'recommendation',
    title: 'New paywall strategy identified for FitTracker',
    module: 'Paywall',
    time: '8 minutes ago',
    status: 'new',
    icon: DollarSign
  },
  {
    id: 4,
    type: 'ab-test',
    title: 'Pricing experiment shows +34% conversion',
    module: 'AB Testing',
    time: '12 minutes ago',
    status: 'winning',
    icon: TestTube2
  },
  {
    id: 5,
    type: 'sale',
    title: 'New lead: MealPlanner Pro developer',
    module: 'Sales',
    time: '15 minutes ago',
    status: 'prospect',
    icon: Users
  }
];

const urgentTasks = [
  {
    id: 1,
    title: 'Review AB test results for FitTracker pricing',
    priority: 'high',
    module: 'AB Testing',
    dueIn: '2 hours',
    progress: 85
  },
  {
    id: 2,
    title: 'Update competitor analysis for Social Media category',
    priority: 'medium',
    module: 'Trends',
    dueIn: '4 hours',
    progress: 60
  },
  {
    id: 3,
    title: 'Follow up with Turkish developer leads',
    priority: 'high',
    module: 'Sales',
    dueIn: '6 hours',
    progress: 40
  }
];

export function Dashboard({ onNavigate }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Apps</p>
                <p className="text-2xl font-semibold">{dashboardStats.totalApps.toLocaleString()}</p>
              </div>
              <Search className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Growth</p>
                <p className="text-2xl font-semibold">+{dashboardStats.monthlyGrowth}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Clients</p>
                <p className="text-2xl font-semibold">{dashboardStats.activeClients}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue Impact</p>
                <p className="text-2xl font-semibold">${(dashboardStats.revenueImpact / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Insights</p>
                <p className="text-2xl font-semibold">{dashboardStats.aiRecommendations}</p>
              </div>
              <Brain className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Analyses</p>
                <p className="text-2xl font-semibold">{dashboardStats.completedAnalyses.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="modules">Quick Access</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Recent Activities & Urgent Tasks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{activity.module}</Badge>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                      </div>
                      <StatusDot status={activity.status} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Urgent Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {urgentTasks.map((task) => (
                    <div key={task.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium text-sm">{task.title}</p>
                        <PriorityBadge priority={task.priority} />
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">{task.module}</Badge>
                        <span className="text-xs text-muted-foreground">Due in {task.dueIn}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="modules" className="space-y-6">
          {/* Module Categories - Organized by new structure */}
          {moduleCategories.map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <p className="text-muted-foreground">{category.description}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {category.modules.map((module) => (
                    <div 
                      key={module.id} 
                      className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => onNavigate(module.id)}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <module.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{module.label}</h3>
                            {module.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {module.badge}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                      <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Open Module
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{activity.module}</Badge>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                    <StatusDot status={activity.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enterprise Workflows</CardTitle>
              <p className="text-muted-foreground">Automated workflows and integrations</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Complete App Intelligence</h3>
                  <p className="text-sm text-muted-foreground mb-3">11-step comprehensive analysis workflow</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">11 steps</Badge>
                    <Badge variant="secondary" className="text-xs">Active</Badge>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Market Entry Strategy</h3>
                  <p className="text-sm text-muted-foreground mb-3">Strategic market analysis and planning</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">11 steps</Badge>
                    <Badge variant="secondary" className="text-xs">Ready</Badge>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Competitive Intelligence</h3>
                  <p className="text-sm text-muted-foreground mb-3">Multi-dimensional competitor analysis</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">9 steps</Badge>
                    <Badge variant="secondary" className="text-xs">Ready</Badge>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Growth Optimization</h3>
                  <p className="text-sm text-muted-foreground mb-3">AB testing and growth strategy workflow</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">8 steps</Badge>
                    <Badge className="text-xs bg-green-100 text-green-800">New</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper Components
function StatusDot({ status }: { status: string }) {
  const colors = {
    completed: 'bg-green-500',
    live: 'bg-blue-500',
    new: 'bg-purple-500',
    winning: 'bg-green-500',
    prospect: 'bg-orange-500'
  };
  
  return (
    <div className={`w-2 h-2 rounded-full ${colors[status as keyof typeof colors] || 'bg-gray-500'}`} />
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const config = {
    high: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
    low: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' }
  };
  
  const style = config[priority as keyof typeof config] || config.medium;
  
  return (
    <Badge className={`${style.bg} ${style.text} ${style.border} border capitalize text-xs`}>
      {priority}
    </Badge>
  );
}