import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  BarChart3, 
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Filter
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const mockTrendingApps = [
  {
    id: 1,
    name: "AI Photo Editor",
    developer: "PhotoTech Studios",
    category: "Health & Fitness",
    growth: 67,
    downloads: { from: "2.1M", to: "3.5M" },
    rank: { from: 45, to: 15 },
    trend: "up",
    icon: "📱",
    confidenceScore: 89
  },
  {
    id: 2,
    name: "Task Manager Pro",
    developer: "Productivity Inc",
    category: "Productivity",
    growth: 23,
    downloads: { from: "890K", to: "1.1M" },
    rank: { from: 89, to: 67 },
    trend: "up",
    icon: "📱",
    confidenceScore: 78
  },
  {
    id: 3,
    name: "Meal Planner",
    developer: "Wellness Corp",
    category: "Health & Fitness",
    growth: 19,
    downloads: { from: "1.2M", to: "1.4M" },
    rank: { from: 34, to: 28 },
    trend: "up",
    icon: "📱",
    confidenceScore: 85
  },
  {
    id: 4,
    name: "Budget Tracker",
    developer: "FinanceApp",
    category: "Finance",
    growth: -15,
    downloads: { from: "756K", to: "643K" },
    rank: { from: 23, to: 41 },
    trend: "down",
    icon: "📱",
    confidenceScore: 72
  },
  {
    id: 5,
    name: "Music Studio",
    developer: "AudioTech",
    category: "Music",
    growth: -8,
    downloads: { from: "2.3M", to: "2.1M" },
    rank: { from: 12, to: 18 },
    trend: "down",
    icon: "📱",
    confidenceScore: 68
  }
];

const categoryPerformance = [
  { name: "Health & Fitness", growth: 34, trend: "up", apps: 567 },
  { name: "Productivity", growth: 12, trend: "up", apps: 442 },
  { name: "Education", growth: 8, trend: "up", apps: 361 },
  { name: "Finance", growth: -8, trend: "down", apps: 301 },
  { name: "Entertainment", growth: -12, trend: "down", apps: 241 },
  { name: "Social", growth: -5, trend: "down", apps: 189 }
];

const searchTrends = [
  { term: "AI photo editor", growth: 156, searches: "2.3M" },
  { term: "habit tracker", growth: 89, searches: "1.8M" },
  { term: "meditation app", growth: 67, searches: "1.5M" },
  { term: "task manager", growth: 45, searches: "1.2M" },
  { term: "budget planner", growth: -23, searches: "980K" }
];

const weeklyTrendData = [
  { day: 'Mon', gainers: 45, losers: 23 },
  { day: 'Tue', gainers: 52, losers: 18 },
  { day: 'Wed', gainers: 67, losers: 15 },
  { day: 'Thu', gainers: 73, losers: 12 },
  { day: 'Fri', gainers: 89, losers: 8 },
  { day: 'Sat', gainers: 67, losers: 21 },
  { day: 'Sun', gainers: 54, losers: 28 }
];

const timePeriods = [
  "Last 24 Hours",
  "Last 7 Days", 
  "Last 30 Days",
  "Last 3 Months",
  "Custom Range"
];

const categories = [
  "All Categories",
  "Health & Fitness",
  "Productivity", 
  "Education",
  "Finance",
  "Entertainment",
  "Social",
  "Music",
  "Photo & Video",
  "Games"
];

const platforms = [
  "Both",
  "iOS Only",
  "Android Only"
];

interface TrendsMainProps {
  onTrendSelect: (app: any) => void;
}

export function TrendsMain({ onTrendSelect }: TrendsMainProps) {
  const [timePeriod, setTimePeriod] = useState("Last 7 Days");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPlatform, setSelectedPlatform] = useState("Both");
  const [viewMode, setViewMode] = useState<"gainers" | "losers">("gainers");

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const trendingUpApps = mockTrendingApps.filter(app => app.trend === "up");
  const trendingDownApps = mockTrendingApps.filter(app => app.trend === "down");
  const displayApps = viewMode === "gainers" ? trendingUpApps : trendingDownApps;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                📅 Time Period
              </label>
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timePeriods.map(period => (
                    <SelectItem key={period} value={period}>
                      {period}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                🏷️ Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Platform</label>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map(platform => (
                    <SelectItem key={platform} value={platform}>
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trend Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant={viewMode === "gainers" ? "default" : "outline"}
            onClick={() => setViewMode("gainers")}
            className="flex items-center gap-2"
          >
            🔥 Trending Up ({trendingUpApps.length} apps)
          </Button>
          <Button 
            variant={viewMode === "losers" ? "default" : "outline"}
            onClick={() => setViewMode("losers")}
            className="flex items-center gap-2"
          >
            📉 Trending Down ({trendingDownApps.length} apps)
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Advanced
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Gainers/Losers */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {viewMode === "gainers" ? (
                <>📈 TOP GAINERS</>
              ) : (
                <>📉 TOP LOSERS</>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {displayApps.map((app, index) => (
                <div 
                  key={app.id} 
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                  onClick={() => onTrendSelect(app)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-medium text-muted-foreground">
                        {index + 1}.
                      </span>
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl">{app.icon}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium">{app.name}</h3>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          app.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                          {app.trend === 'up' ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {app.growth > 0 ? '+' : ''}{app.growth}%
                        </div>
                        <Badge variant="outline" className="text-xs">
                          📊 {app.category}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{app.downloads.from} downloads → {app.downloads.to}</span>
                        <span>•</span>
                        <span>Rank: #{app.rank.from} → #{app.rank.to}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Analyze
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Weekly Trend Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip content={customTooltip} />
                  <Bar 
                    dataKey="gainers" 
                    fill="hsl(var(--chart-1))" 
                    name="Gainers"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar 
                    dataKey="losers" 
                    fill="hsl(var(--chart-3))" 
                    name="Losers"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Trend Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🤖 AI Trend Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 rounded-lg p-6">
            <p className="text-blue-900 leading-relaxed mb-4">
              📊 Health & Fitness category is experiencing 34% growth this week, driven by AI-enhanced apps and 
              spring fitness trends. Apps with social features are outperforming solo experiences by 40%. 
              The productivity category shows steady 12% growth with task management apps leading the surge.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                Learn More →
              </Button>
              <Badge variant="secondary">
                Confidence: 94%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Performance & Search Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Category Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryPerformance.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {category.apps} apps
                    </Badge>
                  </div>
                  <div className={`flex items-center gap-2 ${
                    category.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {category.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span className="font-medium">
                      {category.growth > 0 ? '+' : ''}{category.growth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search Trends */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              🔍 Search Trends
            </CardTitle>
            <Button variant="ghost" size="sm">
              View All →
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {searchTrends.map((search, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">"{search.term}"</p>
                    <p className="text-sm text-muted-foreground">{search.searches} searches</p>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    search.growth > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {search.growth > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{search.growth > 0 ? '+' : ''}{search.growth}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}