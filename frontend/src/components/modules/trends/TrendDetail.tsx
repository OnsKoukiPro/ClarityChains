import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Progress } from "../../ui/progress";
import { 
  ArrowLeft, 
  TrendingUp, 
  Star, 
  Download, 
  BarChart3,
  Eye,
  Lightbulb,
  Share,
  ExternalLink,
  Target,
  Users,
  Calendar
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar
} from 'recharts';

interface TrendDetailProps {
  app: any;
  onBack: () => void;
}

export function TrendDetail({ app, onBack }: TrendDetailProps) {
  // Mock detailed performance data for the trending app
  const performanceData = [
    { day: 'Day 1', downloads: 12000, revenue: 8500, rank: 45, rating: 4.3 },
    { day: 'Day 2', downloads: 15000, revenue: 10200, rank: 42, rating: 4.4 },
    { day: 'Day 3', downloads: 18500, revenue: 12800, rank: 38, rating: 4.5 },
    { day: 'Day 4', downloads: 22000, revenue: 15600, rank: 32, rating: 4.6 },
    { day: 'Day 5', downloads: 28000, revenue: 19200, rank: 25, rating: 4.6 },
    { day: 'Day 6', downloads: 34000, revenue: 23500, rank: 18, rating: 4.7 },
    { day: 'Day 7', downloads: 41000, revenue: 28900, rank: 15, rating: 4.8 }
  ];

  const trendFactors = [
    {
      factor: "New AI features launched in v3.2 update",
      impact: "High",
      confidence: 92,
      icon: "🎯"
    },
    {
      factor: "Improved UI design increased user engagement 34%",
      impact: "High", 
      confidence: 89,
      icon: "📱"
    },
    {
      factor: "Featured in App Store 'Best New Apps' section",
      impact: "Medium",
      confidence: 85,
      icon: "🌟"
    },
    {
      factor: "Strong social media campaign on Instagram/TikTok",
      impact: "Medium",
      confidence: 78,
      icon: "📊"
    },
    {
      factor: "Seasonal boost from spring photography trends",
      impact: "Low",
      confidence: 65,
      icon: "🔄"
    }
  ];

  const similarTrendingApps = [
    { name: "Photo Lab", growth: 45, category: "Photo & Video" },
    { name: "VSCO", growth: 23, category: "Photo & Video" },
    { name: "Canva", growth: 19, category: "Photo & Video" },
    { name: "PicsArt", growth: 16, category: "Photo & Video" }
  ];

  const competitorComparison = [
    { name: app.name, growth: app.growth, rank: app.rank.to, downloads: app.downloads.to },
    { name: "Photo Lab", growth: 45, rank: 8, downloads: "2.8M" },
    { name: "VSCO", growth: 23, rank: 5, downloads: "4.2M" },
    { name: "Canva", growth: 19, rank: 3, downloads: "6.1M" }
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
          {app.name} Trend Analysis
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* App Overview */}
      <Card>
        <CardContent className="p-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl flex-shrink-0">
              {app.icon}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-2xl font-semibold">{app.name}</h1>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-lg font-medium ${
                  app.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  📈 {app.growth > 0 ? '+' : ''}{app.growth}% (7 days)
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-1">{app.category} • {app.developer}</p>
              
              <div className="grid grid-cols-4 gap-6 mt-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Downloads</p>
                  <p className="text-xl font-semibold">+1.4M</p>
                  <p className="text-xs text-muted-foreground">{app.downloads.from} → {app.downloads.to}</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Revenue</p>
                  <p className="text-xl font-semibold">+$89K</p>
                  <p className="text-xs text-muted-foreground">estimated increase</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Rank Change</p>
                  <p className="text-xl font-semibold">#{app.rank.from} → #{app.rank.to}</p>
                  <p className="text-xs text-muted-foreground">category ranking</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Reviews</p>
                  <p className="text-xl font-semibold">+234 (4.6★)</p>
                  <p className="text-xs text-muted-foreground">new reviews</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📈 Performance Chart (7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={[50, 0]}
                />
                <Tooltip content={customTooltip} />
                <Legend />
                
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="downloads"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.2}
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  name="Downloads"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  name="Revenue ($)"
                />
                <Bar
                  yAxisId="right"
                  dataKey="rank"
                  fill="hsl(var(--chart-3))"
                  name="Rank"
                  opacity={0.7}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="rating"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                  name="Rating"
                  domain={[4.0, 5.0]}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Why is this app trending? */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🤖 Why is this app trending?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground mb-4">
              This app is trending due to:
            </p>
            
            {trendFactors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-2xl">{factor.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium mb-1">{factor.factor}</p>
                    <div className="flex items-center gap-3">
                      <Badge variant={
                        factor.impact === 'High' ? 'destructive' : 
                        factor.impact === 'Medium' ? 'default' : 'secondary'
                      }>
                        {factor.impact} Impact
                      </Badge>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Confidence:</span>
                        <Progress value={factor.confidence} className="w-16" />
                        <span className="text-sm font-medium">{factor.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <span className="font-medium">Confidence Score:</span>
                <Badge variant="default" className="bg-green-50 text-green-700">
                  89%
                </Badge>
              </div>
              <Button variant="outline" size="sm">
                📊 View Sources
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Comparison & Similar Trending Apps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competitor Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🏆 Competitor Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {competitorComparison.map((competitor, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                  competitor.name === app.name ? 'bg-primary/5 border-primary/20' : 'border-border'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{competitor.name}</span>
                    {competitor.name === app.name && (
                      <Badge variant="default" className="text-xs">Current</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-600 font-medium">+{competitor.growth}%</span>
                    <span className="text-muted-foreground">#{competitor.rank}</span>
                    <span className="font-medium">{competitor.downloads}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Similar Trending Apps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔍 Similar Trending Apps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {similarTrendingApps.map((similar, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">{similar.name}</p>
                    <p className="text-sm text-muted-foreground">{similar.category}</p>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">+{similar.growth}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button size="lg">
          <Eye className="w-5 h-5 mr-2" />
          Analyze App
        </Button>
        <Button variant="outline" size="lg">
          <Lightbulb className="w-5 h-5 mr-2" />
          Get Ideas
        </Button>
        <Button variant="outline" size="lg">
          <BarChart3 className="w-5 h-5 mr-2" />
          Full Report
        </Button>
        <Button variant="outline" size="lg">
          <ExternalLink className="w-5 h-5 mr-2" />
          View in Store
        </Button>
      </div>
    </div>
  );
}