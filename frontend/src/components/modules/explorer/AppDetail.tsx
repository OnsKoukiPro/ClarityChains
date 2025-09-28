import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Progress } from "../../ui/progress";
import { 
  ArrowLeft, 
  Star, 
  Download, 
  TrendingUp, 
  Bookmark, 
  Share, 
  Settings,
  Eye,
  BarChart3,
  Lightbulb,
  ExternalLink,
  Play,
  Image as ImageIcon
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface AppDetailProps {
  app: any;
  onBack: () => void;
}

export function AppDetail({ app, onBack }: AppDetailProps) {
  const screenshots = [
    { type: 'image', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=600', title: 'Main Interface' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=600', title: 'Edit Screen' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=600', title: 'Gallery View' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=300&h=600', title: 'Settings' },
    { type: 'video', url: '#', title: 'Demo Video' }
  ];

  // Mock performance data with realistic growth patterns
  const downloadsData = [
    { month: 'Jan', downloads: 320000, newUsers: 280000, returning: 40000 },
    { month: 'Feb', downloads: 425000, newUsers: 365000, returning: 60000 },
    { month: 'Mar', downloads: 580000, newUsers: 485000, returning: 95000 },
    { month: 'Apr', downloads: 720000, newUsers: 590000, returning: 130000 },
    { month: 'May', downloads: 920000, newUsers: 745000, returning: 175000 },
    { month: 'Jun', downloads: 1200000, newUsers: 950000, returning: 250000 },
    { month: 'Jul', downloads: 1450000, newUsers: 1100000, returning: 350000 },
    { month: 'Aug', downloads: 1680000, newUsers: 1250000, returning: 430000 },
    { month: 'Sep', downloads: 1850000, newUsers: 1350000, returning: 500000 },
    { month: 'Oct', downloads: 2100000, newUsers: 1500000, returning: 600000 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 85000, subscriptions: 65000, iap: 15000, ads: 5000 },
    { month: 'Feb', revenue: 125000, subscriptions: 95000, iap: 22000, ads: 8000 },
    { month: 'Mar', revenue: 180000, subscriptions: 140000, iap: 30000, ads: 10000 },
    { month: 'Apr', revenue: 240000, subscriptions: 185000, iap: 42000, ads: 13000 },
    { month: 'May', revenue: 290000, subscriptions: 225000, iap: 50000, ads: 15000 },
    { month: 'Jun', revenue: 320000, subscriptions: 250000, iap: 55000, ads: 15000 },
    { month: 'Jul', revenue: 365000, subscriptions: 285000, iap: 62000, ads: 18000 },
    { month: 'Aug', revenue: 420000, subscriptions: 325000, iap: 75000, ads: 20000 },
    { month: 'Sep', revenue: 480000, subscriptions: 370000, iap: 85000, ads: 25000 },
    { month: 'Oct', revenue: 520000, subscriptions: 400000, iap: 95000, ads: 25000 }
  ];

  const rankingsData = [
    { month: 'Jan', overall: 145, category: 23, paid: 67 },
    { month: 'Feb', overall: 98, category: 15, paid: 45 },
    { month: 'Mar', overall: 67, category: 8, paid: 28 },
    { month: 'Apr', overall: 45, category: 5, paid: 18 },
    { month: 'May', overall: 32, category: 3, paid: 12 },
    { month: 'Jun', overall: 28, category: 2, paid: 8 },
    { month: 'Jul', overall: 24, category: 2, paid: 6 },
    { month: 'Aug', overall: 19, category: 1, paid: 4 },
    { month: 'Sep', overall: 16, category: 1, paid: 3 },
    { month: 'Oct', overall: 12, category: 1, paid: 2 }
  ];

  const reviewsData = [
    { month: 'Jan', positive: 65, neutral: 25, negative: 10, total: 234 },
    { month: 'Feb', positive: 72, neutral: 20, negative: 8, total: 456 },
    { month: 'Mar', positive: 78, neutral: 18, negative: 4, total: 678 },
    { month: 'Apr', positive: 82, neutral: 15, negative: 3, total: 892 },
    { month: 'May', positive: 85, neutral: 12, negative: 3, total: 1123 },
    { month: 'Jun', positive: 88, neutral: 10, negative: 2, total: 1456 },
    { month: 'Jul', positive: 90, neutral: 8, negative: 2, total: 1678 },
    { month: 'Aug', positive: 91, neutral: 7, negative: 2, total: 1892 },
    { month: 'Sep', positive: 92, neutral: 6, negative: 2, total: 2103 },
    { month: 'Oct', positive: 93, neutral: 5, negative: 2, total: 2341 }
  ];

  const sentimentData = [
    { name: 'Positive', value: 93, color: 'hsl(var(--chart-1))' },
    { name: 'Neutral', value: 5, color: 'hsl(var(--chart-2))' },
    { name: 'Negative', value: 2, color: 'hsl(var(--chart-3))' }
  ];

  const competitorAnalysis = [
    { name: 'PhotoPro', rating: 4.3, downloads: '1.8M', revenue: '$280K', marketShare: 22 },
    { name: 'EditMaster', rating: 4.5, downloads: '2.3M', revenue: '$340K', marketShare: 28 },
    { name: 'SnapEdit', rating: 4.1, downloads: '1.5M', revenue: '$210K', marketShare: 18 }
  ];

  const featureAnalysis = [
    { feature: 'AI Background Removal', adoption: 89, satisfaction: 4.7, trend: 'up' },
    { feature: 'Smart Filters', adoption: 76, satisfaction: 4.5, trend: 'up' },
    { feature: 'Batch Processing', adoption: 45, satisfaction: 4.2, trend: 'stable' },
    { feature: 'Cloud Sync', adoption: 67, satisfaction: 4.1, trend: 'down' }
  ];

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          {app.name}
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bookmark className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* App Overview */}
      <Card>
        <CardContent className="p-8">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-4xl flex-shrink-0">
              {app.icon}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-3xl font-semibold">{app.name}</h1>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-medium">{app.rating}</span>
                  <span className="text-muted-foreground">({app.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-2">{app.developer}</p>
              <Badge variant="outline" className="mb-4">{app.category}</Badge>
              
              <div className="grid grid-cols-4 gap-8">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Downloads</p>
                  <p className="text-2xl font-semibold">{app.downloads}</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Revenue</p>
                  <p className="text-2xl font-semibold">{app.revenue}</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Growth</p>
                  <p className="text-2xl font-semibold text-green-600">+{app.growth}%</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Trend Score</p>
                  <p className="text-2xl font-semibold">94/100</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🤖 AI Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 rounded-lg p-6">
            <p className="text-blue-900 leading-relaxed">
              This app succeeds due to its advanced AI photo editing features and intuitive UI design. 
              Recent updates have improved user retention by 23%. Strong monetization through premium 
              filters and cloud storage subscriptions. The app's AI-powered background removal feature 
              has become a key differentiator, with 89% adoption rate among active users. Market position 
              is strong with growing user base in the 18-35 demographic.
            </p>
            <Button variant="outline" className="mt-4" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              View More Analysis
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Screenshots & Media */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            📱 Screenshots & Media
          </CardTitle>
          <Button variant="ghost" size="sm">
            View All →
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="flex-shrink-0 group cursor-pointer">
                {screenshot.type === 'video' ? (
                  <div className="w-32 h-56 bg-muted rounded-lg flex items-center justify-center relative">
                    <Play className="w-8 h-8 text-muted-foreground" />
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-56 bg-muted rounded-lg overflow-hidden relative">
                    <img 
                      src={screenshot.url} 
                      alt={screenshot.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}
                <p className="text-xs text-center mt-2 text-muted-foreground">{screenshot.title}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📈 Performance Charts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="downloads" className="space-y-4">
            <TabsList>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="rankings">Rankings</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="downloads" className="space-y-4">
              <div className="h-80">
                <h4 className="font-medium mb-4">Download Trends - Last 10 Months</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={downloadsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip content={customTooltip} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="downloads"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.2}
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={3}
                      name="Total Downloads"
                    />
                    <Line
                      type="monotone"
                      dataKey="newUsers"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      name="New Users"
                    />
                    <Line
                      type="monotone"
                      dataKey="returning"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={2}
                      name="Returning Users"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="revenue" className="space-y-4">
              <div className="h-80">
                <h4 className="font-medium mb-4">Revenue Analytics - Monthly Breakdown</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip content={customTooltip} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="subscriptions"
                      stackId="1"
                      fill="hsl(var(--chart-1))"
                      stroke="hsl(var(--chart-1))"
                      name="Subscriptions"
                    />
                    <Area
                      type="monotone"
                      dataKey="iap"
                      stackId="1"
                      fill="hsl(var(--chart-2))"
                      stroke="hsl(var(--chart-2))"
                      name="In-App Purchases"
                    />
                    <Area
                      type="monotone"
                      dataKey="ads"
                      stackId="1"
                      fill="hsl(var(--chart-3))"
                      stroke="hsl(var(--chart-3))"
                      name="Ads"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="rankings" className="space-y-4">
              <div className="h-80">
                <h4 className="font-medium mb-4">App Store Rankings (Lower is Better)</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={rankingsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      domain={[0, 200]}
                      reversed
                    />
                    <Tooltip content={customTooltip} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="overall"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={3}
                      name="Overall Ranking"
                    />
                    <Line
                      type="monotone"
                      dataKey="category"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={3}
                      name="Category Ranking"
                    />
                    <Line
                      type="monotone"
                      dataKey="paid"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={3}
                      name="Paid Apps Ranking"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-80">
                  <h4 className="font-medium mb-4">Review Volume Trends</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reviewsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="month" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <Tooltip content={customTooltip} />
                      <Legend />
                      <Bar 
                        dataKey="positive" 
                        fill="hsl(var(--chart-1))" 
                        name="Positive"
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar 
                        dataKey="neutral" 
                        fill="hsl(var(--chart-2))" 
                        name="Neutral"
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar 
                        dataKey="negative" 
                        fill="hsl(var(--chart-3))" 
                        name="Negative"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="h-80">
                  <h4 className="font-medium mb-4">Current Sentiment Distribution</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Percentage']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Feature Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>⚙️ Feature Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featureAnalysis.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{feature.feature}</h4>
                    <Badge variant={feature.trend === 'up' ? 'default' : feature.trend === 'down' ? 'destructive' : 'secondary'}>
                      {feature.trend === 'up' ? '↗️' : feature.trend === 'down' ? '↘️' : '➡️'} {feature.trend}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Adoption Rate</p>
                      <div className="flex items-center gap-2">
                        <Progress value={feature.adoption} className="flex-1" />
                        <span className="text-sm font-medium">{feature.adoption}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">User Satisfaction</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{feature.satisfaction}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monetization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💰 Monetization Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Pricing Model</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span>Freemium model with premium subscription</span>
                  <Badge variant="secondary">Primary</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span>$9.99/month or $59.99/year</span>
                  <Badge variant="outline">Subscription</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span>In-app purchases for filter packs</span>
                  <Badge variant="outline">IAP</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span>14-day free trial</span>
                  <Badge variant="outline">Trial</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Revenue Breakdown</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Subscriptions</span>
                  <div className="flex items-center gap-2">
                    <Progress value={75} className="w-20" />
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">In-app purchases</span>
                  <div className="flex items-center gap-2">
                    <Progress value={20} className="w-20" />
                    <span className="text-sm font-medium">20%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ads</span>
                  <div className="flex items-center gap-2">
                    <Progress value={5} className="w-20" />
                    <span className="text-sm font-medium">5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button size="lg">
          <Eye className="w-5 h-5 mr-2" />
          Deep Analysis
        </Button>
        <Button variant="outline" size="lg">
          <BarChart3 className="w-5 h-5 mr-2" />
          Full Report
        </Button>
        <Button variant="outline" size="lg">
          <Lightbulb className="w-5 h-5 mr-2" />
          Get Ideas
        </Button>
        <Button variant="outline" size="lg">
          <ExternalLink className="w-5 h-5 mr-2" />
          View in Store
        </Button>
      </div>
    </div>
  );
}