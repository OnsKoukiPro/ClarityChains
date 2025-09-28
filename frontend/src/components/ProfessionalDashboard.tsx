import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { WorkflowTriggers } from './WorkflowTriggers';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Star, 
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Zap
} from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const revenueData = [
  { month: 'Oct', revenue: 180 },
  { month: 'Nov', revenue: 220 },
  { month: 'Dec', revenue: 260 },
  { month: 'Jan', revenue: 310 },
  { month: 'Feb', revenue: 380 },
  { month: 'Mar', revenue: 420 }
];

const categoryData = [
  { name: 'Health & Fitness', value: 35, color: '#3B82F6' },
  { name: 'Productivity', value: 28, color: '#10B981' },
  { name: 'Finance', value: 18, color: '#F59E0B' },
  { name: 'Gaming', value: 12, color: '#EF4444' },
  { name: 'Education', value: 7, color: '#8B5CF6' }
];

const geographicData = [
  { region: 'North America', apps: 847, revenue: 1200 },
  { region: 'Europe', apps: 623, revenue: 890 },
  { region: 'Asia Pacific', apps: 512, revenue: 670 },
  { region: 'Latin America', apps: 298, revenue: 320 },
  { region: 'Others', apps: 187, revenue: 250 }
];

interface ProfessionalDashboardProps {
  onStartWorkflow?: (workflowId: string, initialData?: any) => void;
}

export function ProfessionalDashboard({ onStartWorkflow }: ProfessionalDashboardProps) {
  const handleStartWorkflow = (workflowId: string, initialData?: any) => {
    if (onStartWorkflow) {
      onStartWorkflow(workflowId, initialData);
    }
  };

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Apps Tracked</p>
                <p className="text-3xl font-bold">2,847</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12.5% from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Market Intelligence</p>
                <p className="text-3xl font-bold">$2.4B</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">Revenue opportunity tracked</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Insights Generated</p>
                <p className="text-3xl font-bold">15,678</p>
                <div className="flex items-center mt-2">
                  <Activity className="w-4 h-4 text-purple-500 mr-1" />
                  <span className="text-sm text-purple-600">94.2% accuracy rate</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Market Opportunities</p>
                <p className="text-3xl font-bold">234</p>
                <div className="flex items-center mt-2">
                  <Target className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600">High-value gaps identified</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Triggers */}
      {onStartWorkflow && (
        <WorkflowTriggers onStartWorkflow={handleStartWorkflow} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Market Revenue Growth
              <Badge variant="secondary" className="text-green-600 bg-green-50">
                +18.5% this quarter
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value}M`, 'Revenue']}
                    labelStyle={{ color: 'var(--foreground)' }}
                    contentStyle={{ 
                      backgroundColor: 'var(--background)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>App Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-8">
              <div className="h-48 w-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Share']}
                      contentStyle={{ 
                        backgroundColor: 'var(--background)', 
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{category.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Global Market Performance
            <Button variant="outline" size="sm">
              View Detailed Analysis
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={geographicData}>
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'apps' ? `${value} apps` : `$${value}M`,
                    name === 'apps' ? 'Apps Tracked' : 'Revenue'
                  ]}
                  contentStyle={{ 
                    backgroundColor: 'var(--background)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="apps" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">🔥 Trending This Week</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">AI Photo Editors</span>
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+67%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Voice Task Apps</span>
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+45%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Meditation & Sleep</span>
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+34%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">💰 Revenue Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="text-muted-foreground">Average Premium Conversion</p>
              <p className="text-xl font-semibold text-green-600">12.4%</p>
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">Lifetime Value Trend</p>
              <div className="flex items-center">
                <span className="text-xl font-semibold">$89</span>
                <TrendingUp className="w-4 h-4 text-green-500 ml-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">🎯 Market Opportunities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="font-medium">Brazil Meditation Apps</p>
              <p className="text-muted-foreground">$180M opportunity, low competition</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">India Fintech</p>
              <p className="text-muted-foreground">$340M market, fragmented players</p>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-2">
              Explore All Opportunities
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}