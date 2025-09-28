import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Star, 
  TrendingUp, 
  TrendingDown,
  ArrowUpDown,
  Eye,
  BarChart3
} from "lucide-react";

const apps = [
  { 
    name: "MindfulAI", 
    category: "Health & Fitness", 
    downloads: "2.1M", 
    rating: 4.8, 
    revenue: "$245K", 
    growth: 34.2,
    trend: "up",
    country: "US",
    lastUpdated: "2h ago"
  },
  { 
    name: "TaskFlow Pro", 
    category: "Productivity", 
    downloads: "1.8M", 
    rating: 4.6, 
    revenue: "$189K", 
    growth: 23.1,
    trend: "up",
    country: "UK",
    lastUpdated: "4h ago"
  },
  { 
    name: "SleepCycle Plus", 
    category: "Health & Fitness", 
    downloads: "3.2M", 
    rating: 4.9, 
    revenue: "$423K", 
    growth: 18.7,
    trend: "up",
    country: "CA",
    lastUpdated: "6h ago"
  },
  { 
    name: "CryptoTracker", 
    category: "Finance", 
    downloads: "1.2M", 
    rating: 4.2, 
    revenue: "$156K", 
    growth: -8.3,
    trend: "down",
    country: "US",
    lastUpdated: "1h ago"
  },
  { 
    name: "PhotoEditor AI", 
    category: "Photo & Video", 
    downloads: "4.1M", 
    rating: 4.7, 
    revenue: "$567K", 
    growth: 42.6,
    trend: "up",
    country: "DE",
    lastUpdated: "3h ago"
  },
  { 
    name: "WeatherPro", 
    category: "Weather", 
    downloads: "856K", 
    rating: 4.4, 
    revenue: "$89K", 
    growth: 12.3,
    trend: "up",
    country: "AU",
    lastUpdated: "5h ago"
  }
];

export function Explorer() {
  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search by app name, developer, category, or keywords..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Sort
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <BarChart3 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Apps</p>
                <p className="text-lg font-semibold">2,847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Trending</p>
                <p className="text-lg font-semibold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Star className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-lg font-semibold">4.6</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Download className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
                <p className="text-lg font-semibold">127M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Apps Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>App Intelligence Database</span>
            <Badge variant="secondary">{apps.length} of 2,847 apps</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="cards">Card View</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-medium">App</th>
                      <th className="text-left p-3 font-medium">Category</th>
                      <th className="text-left p-3 font-medium">Downloads</th>
                      <th className="text-left p-3 font-medium">Rating</th>
                      <th className="text-left p-3 font-medium">Revenue</th>
                      <th className="text-left p-3 font-medium">Growth</th>
                      <th className="text-left p-3 font-medium">Market</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apps.map((app, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-medium text-sm">{app.name.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="font-medium">{app.name}</p>
                              <p className="text-xs text-muted-foreground">Updated {app.lastUpdated}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline">{app.category}</Badge>
                        </td>
                        <td className="p-3 font-medium">{app.downloads}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{app.rating}</span>
                          </div>
                        </td>
                        <td className="p-3 font-medium">{app.revenue}</td>
                        <td className="p-3">
                          <div className={`flex items-center gap-1 ${
                            app.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {app.trend === 'up' ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            <span className="font-medium">{Math.abs(app.growth)}%</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="secondary">{app.country}</Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="cards" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {apps.map((app, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-medium">{app.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{app.name}</h3>
                          <p className="text-sm text-muted-foreground">{app.category}</p>
                        </div>
                        <Badge variant={app.trend === 'up' ? 'default' : 'destructive'}>
                          {app.trend === 'up' ? '+' : ''}{app.growth}%
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Downloads</p>
                          <p className="font-medium">{app.downloads}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Revenue</p>
                          <p className="font-medium">{app.revenue}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Rating</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{app.rating}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Market</p>
                          <p className="font-medium">{app.country}</p>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4" size="sm">
                        Analyze App
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Advanced analytics and visualization charts</p>
                  <p className="text-sm text-muted-foreground">Performance metrics, trend analysis, and competitive intelligence</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}