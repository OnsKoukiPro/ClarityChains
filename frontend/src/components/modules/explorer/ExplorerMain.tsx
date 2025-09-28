import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { 
  Search, 
  Filter, 
  Download, 
  Star, 
  TrendingUp, 
  X,
  ExternalLink,
  Eye,
  Bookmark,
  BarChart3
} from "lucide-react";

const mockApps = [
  {
    id: 1,
    name: "AI Photo Editor",
    developer: "PhotoTech Studios",
    category: "Health & Fitness",
    downloads: "2.1M",
    rating: 4.6,
    reviews: 2341,
    revenue: "$320K/mo",
    growth: 67,
    trend: "up",
    aiInsight: "Strong AI features driving user engagement",
    icon: "📱",
    hasAI: true
  },
  {
    id: 2,
    name: "Task Manager Pro",
    developer: "Productivity Inc",
    category: "Productivity",
    downloads: "890K",
    rating: 4.4,
    reviews: 1523,
    revenue: "$180K/mo",
    growth: 23,
    trend: "up",
    aiInsight: "Simple UI with powerful automation features",
    icon: "📱",
    hasAI: false
  },
  {
    id: 3,
    name: "MindfulAI",
    developer: "Wellness Corp",
    category: "Health & Fitness",
    downloads: "1.5M",
    rating: 4.8,
    reviews: 3456,
    revenue: "$245K/mo",
    growth: 45,
    trend: "up",
    aiInsight: "Personalized meditation with AI-driven recommendations",
    icon: "📱",
    hasAI: true
  },
  {
    id: 4,
    name: "CryptoTracker",
    developer: "FinTech Solutions",
    category: "Finance",
    downloads: "634K",
    rating: 4.2,
    reviews: 987,
    revenue: "$156K/mo",
    growth: -12,
    trend: "down",
    aiInsight: "Market volatility affecting user engagement",
    icon: "📱",
    hasAI: false
  },
  {
    id: 5,
    name: "Sleep Stories AI",
    developer: "Night Studios",
    category: "Health & Fitness",
    downloads: "2.8M",
    rating: 4.9,
    reviews: 5432,
    revenue: "$423K/mo",
    growth: 89,
    trend: "up",
    aiInsight: "AI-generated content creating viral growth",
    icon: "📱",
    hasAI: true
  },
  {
    id: 6,
    name: "Language Buddy",
    developer: "EduTech Global",
    category: "Education",
    downloads: "1.2M",
    rating: 4.7,
    reviews: 2876,
    revenue: "$201K/mo",
    growth: 34,
    trend: "up",
    aiInsight: "Adaptive learning algorithms improving retention",
    icon: "📱",
    hasAI: true
  }
];

const quickFilters = [
  { label: "Trending", active: false },
  { label: "High Revenue", active: false },
  { label: "New Apps", active: false },
  { label: "AI-Powered", active: false },
  { label: "Gaming", active: false }
];

const categories = [
  "All Categories",
  "Health & Fitness",
  "Productivity",
  "Finance",
  "Education",
  "Gaming",
  "Social",
  "Photo & Video",
  "Music",
  "Travel"
];

const revenueRanges = [
  "Any",
  "$0 - $50K",
  "$50K - $100K",
  "$100K - $500K",
  "$500K+"
];

const ratings = [
  "Any",
  "4.5+",
  "4.0+",
  "3.5+",
  "3.0+"
];

const countries = [
  "Global",
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "Japan",
  "Australia"
];

const platforms = [
  "Both",
  "iOS",
  "Android"
];

const sortOptions = [
  "Trending",
  "Revenue (High to Low)",
  "Revenue (Low to High)",
  "Downloads (High to Low)",
  "Downloads (Low to High)",
  "Rating (High to Low)",
  "Recently Added"
];

interface ExplorerMainProps {
  onAppSelect: (app: any) => void;
}

export function ExplorerMain({ onAppSelect }: ExplorerMainProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedRevenue, setSelectedRevenue] = useState("Any");
  const [selectedRating, setSelectedRating] = useState("Any");
  const [selectedCountry, setSelectedCountry] = useState("Global");
  const [selectedPlatform, setSelectedPlatform] = useState("Both");
  const [sortBy, setSortBy] = useState("Trending");
  const [showFilters, setShowFilters] = useState(true);

  const toggleQuickFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedCategory("All Categories");
    setSelectedRevenue("Any");
    setSelectedRating("Any");
    setSelectedCountry("Global");
    setSelectedPlatform("Both");
  };

  const filteredApps = mockApps.filter(app => {
    // Apply search filter
    if (searchQuery && !app.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !app.developer.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !app.category.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Apply quick filters
    if (activeFilters.includes("AI-Powered") && !app.hasAI) return false;
    if (activeFilters.includes("Trending") && app.growth < 30) return false;
    if (activeFilters.includes("High Revenue") && parseInt(app.revenue.replace(/[^\d]/g, '')) < 200000) return false;

    // Apply advanced filters
    if (selectedCategory !== "All Categories" && app.category !== selectedCategory) return false;

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search apps, developers, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-lg"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                🏷️ Quick Filters
              </h3>
              {activeFilters.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {quickFilters.map((filter) => (
                <Button
                  key={filter.label}
                  variant={activeFilters.includes(filter.label) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleQuickFilter(filter.label)}
                  className="transition-all"
                >
                  {filter.label}
                  {activeFilters.includes(filter.label) && (
                    <X className="w-3 h-3 ml-2" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                ⚙️ Advanced Filters
              </h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showFilters ? 'Hide' : 'Show'} Filters
                </Button>
              </div>
            </div>
            
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
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
                  <label className="text-sm font-medium mb-2 block">Revenue</label>
                  <Select value={selectedRevenue} onValueChange={setSelectedRevenue}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {revenueRanges.map(range => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Rating</label>
                  <Select value={selectedRating} onValueChange={setSelectedRating}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ratings.map(rating => (
                        <SelectItem key={rating} value={rating}>
                          {rating}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Country</label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(country => (
                        <SelectItem key={country} value={country}>
                          {country}
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
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="font-medium">📊 Results: {filteredApps.length.toLocaleString()} apps</h3>
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {activeFilters.map(filter => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => toggleQuickFilter(filter)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Sort:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Apps List */}
      <div className="space-y-4">
        {filteredApps.map((app) => (
          <Card key={app.id} className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl">
                    {app.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{app.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{app.rating}</span>
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          app.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                          <TrendingUp className={`w-3 h-3 ${app.trend === 'down' ? 'rotate-180' : ''}`} />
                          {app.growth > 0 ? '+' : ''}{app.growth}%
                        </div>
                        {app.hasAI && (
                          <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                            🤖 AI-Powered
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-3">
                      <span>{app.category}</span>
                      <span>•</span>
                      <span>{app.downloads} downloads</span>
                      <span>•</span>
                      <span>{app.revenue}</span>
                      <span>•</span>
                      <span>{app.reviews.toLocaleString()} reviews</span>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-blue-800">
                        🤖 "{app.aiInsight}"
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onAppSelect(app)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Analyze
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Compare
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Store
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Apps...
        </Button>
      </div>
    </div>
  );
}