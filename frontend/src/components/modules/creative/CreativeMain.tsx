import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { 
  Palette, 
  Eye, 
  TrendingUp, 
  BarChart3, 
  Search, 
  Zap,
  Target,
  Settings,
  Save,
  ChevronRight,
  Camera,
  Smartphone,
  Monitor,
  Image as ImageIcon,
  Star
} from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface CreativeMainProps {
  onAppSelect: (app: any) => void;
  onCompareApps: (apps: any[]) => void;
}

const featuredApps = [
  {
    id: 1,
    name: 'Calm',
    subtitle: 'Meditation & Sleep',
    category: 'Health & Fitness',
    rating: 4.8,
    reviews: '125K',
    icon: '/placeholder-icons/calm-icon.png',
    screenshots: [
      '/placeholder-screenshots/calm-home.png',
      '/placeholder-screenshots/calm-meditation.png',
      '/placeholder-screenshots/calm-sleep.png'
    ],
    colorHarmony: 94,
    uiScore: 87,
    description: 'Soothing blues + perfect white space balance',
    primaryColors: [
      { color: '#2D5AA0', name: 'Trust Blue', usage: 45 },
      { color: '#F8F9FA', name: 'Pure White', usage: 30 },
      { color: '#52C41A', name: 'Calm Green', usage: 15 },
      { color: '#1F1F1F', name: 'Deep Gray', usage: 10 }
    ],
    visualStyle: 'Professional',
    conversionRate: 12.4,
    revenue: '$70M'
  },
  {
    id: 2,
    name: 'Notion',
    subtitle: 'Productivity Workspace',
    category: 'Productivity',
    rating: 4.7,
    reviews: '89K',
    icon: '/placeholder-icons/notion-icon.png',
    screenshots: [
      '/placeholder-screenshots/notion-home.png',
      '/placeholder-screenshots/notion-editor.png',
      '/placeholder-screenshots/notion-templates.png'
    ],
    colorHarmony: 89,
    uiScore: 92,
    description: 'Clean layout with strategic color accents',
    primaryColors: [
      { color: '#000000', name: 'Pure Black', usage: 40 },
      { color: '#FFFFFF', name: 'Clean White', usage: 35 },
      { color: '#2F81F7', name: 'Focus Blue', usage: 15 },
      { color: '#F7F6F3', name: 'Warm Gray', usage: 10 }
    ],
    visualStyle: 'Minimal',
    conversionRate: 15.2,
    revenue: '$50M'
  },
  {
    id: 3,
    name: 'Duolingo',
    subtitle: 'Language Learning',
    category: 'Education',
    rating: 4.6,
    reviews: '234K',
    icon: '/placeholder-icons/duolingo-icon.png',
    screenshots: [
      '/placeholder-screenshots/duolingo-lesson.png',
      '/placeholder-screenshots/duolingo-progress.png',
      '/placeholder-screenshots/duolingo-league.png'
    ],
    colorHarmony: 91,
    uiScore: 85,
    description: 'Playful green brand with engaging animations',
    primaryColors: [
      { color: '#58CC02', name: 'Duo Green', usage: 50 },
      { color: '#FFFFFF', name: 'Clean White', usage: 25 },
      { color: '#FF9600', name: 'Energy Orange', usage: 15 },
      { color: '#1CB0F6', name: 'Cool Blue', usage: 10 }
    ],
    visualStyle: 'Playful',
    conversionRate: 8.9,
    revenue: '$35M'
  },
  {
    id: 4,
    name: 'Spotify',
    subtitle: 'Music Streaming',
    category: 'Music',
    rating: 4.5,
    reviews: '456K',
    icon: '/placeholder-icons/spotify-icon.png',
    screenshots: [
      '/placeholder-screenshots/spotify-home.png',
      '/placeholder-screenshots/spotify-player.png',
      '/placeholder-screenshots/spotify-discover.png'
    ],
    colorHarmony: 88,
    uiScore: 90,
    description: 'Bold brand green with dark theme mastery',
    primaryColors: [
      { color: '#1DB954', name: 'Spotify Green', usage: 35 },
      { color: '#191414', name: 'Rich Black', usage: 40 },
      { color: '#FFFFFF', name: 'Pure White', usage: 20 },
      { color: '#B3B3B3', name: 'Cool Gray', usage: 5 }
    ],
    visualStyle: 'Bold',
    conversionRate: 11.8,
    revenue: '$120M'
  }
];

const trendingElements = [
  { name: 'Dark Mode UI', growth: '+67%', description: 'adoption this month', color: 'bg-purple-500' },
  { name: 'Gradient Backgrounds', growth: '+45%', description: 'in productivity apps', color: 'bg-blue-500' },
  { name: 'Blue Color Schemes', growth: '+34%', description: 'conversion rates', color: 'bg-indigo-500' },
  { name: 'Minimalist Icons', growth: '+28%', description: 'user preference', color: 'bg-green-500' }
];

const categoryPerformance = [
  { category: 'Health', trend: 'Soft colors winning', color: 'text-green-600' },
  { category: 'Productivity', trend: 'Dark mode', color: 'text-blue-600' },
  { category: 'Finance', trend: 'Trust colors (blue)', color: 'text-indigo-600' },
  { category: 'Gaming', trend: 'Vibrant schemes', color: 'text-purple-600' }
];

export function CreativeMain({ onAppSelect, onCompareApps }: CreativeMainProps) {
  const [selectedApps, setSelectedApps] = useState<any[]>([]);

  const handleAppSelection = (app: any) => {
    if (selectedApps.find(a => a.id === app.id)) {
      setSelectedApps(selectedApps.filter(a => a.id !== app.id));
    } else if (selectedApps.length < 4) {
      setSelectedApps([...selectedApps, app]);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Apps Analyzed</p>
                <p className="text-2xl font-semibold">2,847</p>
              </div>
              <Smartphone className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Color Palettes</p>
                <p className="text-2xl font-semibold">1,234</p>
              </div>
              <Palette className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">UI Patterns</p>
                <p className="text-2xl font-semibold">567</p>
              </div>
              <Monitor className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Screenshots</p>
                <p className="text-2xl font-semibold">15,678</p>
              </div>
              <Camera className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trending Visual Elements */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  🔥 Trending Visual Elements
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingElements.map((element, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${element.color}`}></div>
                      <div>
                        <p className="font-medium">🎨 {element.name}</p>
                        <p className="text-sm text-muted-foreground">{element.description}</p>
                      </div>
                    </div>
                    <Badge className="text-green-600 bg-green-50">
                      📈 {element.growth}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Creative Analysis */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  🖼️ Featured Creative Analysis
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredApps.map((app) => (
                  <div 
                    key={app.id}
                    className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* App Icon */}
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <ImageWithFallback 
                          src={app.icon}
                          alt={app.name}
                          className="w-12 h-12 rounded-lg"
                        />
                      </div>
                      
                      {/* App Info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">📱 {app.name} - {app.subtitle}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{app.category}</span>
                              <span>•</span>
                              <span>⭐ {app.rating} ({app.reviews})</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getScoreColor(app.colorHarmony)}>
                              🎨 Color: {app.colorHarmony}/100
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <Badge className={getScoreColor(app.uiScore)}>
                            📱 UI Score: {app.uiScore}/100
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            🌟 "{app.description}"
                          </span>
                        </div>

                        {/* Color Palette Preview */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm text-muted-foreground">Colors:</span>
                          {app.primaryColors.slice(0, 4).map((colorData, idx) => (
                            <div 
                              key={idx}
                              className="w-6 h-6 rounded-full border border-border"
                              style={{ backgroundColor: colorData.color }}
                              title={`${colorData.name} (${colorData.usage}%)`}
                            ></div>
                          ))}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onAppSelect(app)}
                          >
                            <BarChart3 className="w-4 h-4 mr-1" />
                            🔍 Analyze
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAppSelection(app)}
                            className={selectedApps.find(a => a.id === app.id) ? 'bg-primary text-primary-foreground' : ''}
                          >
                            <Palette className="w-4 h-4 mr-1" />
                            🎨 Extract Colors
                          </Button>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="w-4 h-4 mr-1" />
                            📊 Compare
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Creative Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔍 Quick Creative Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button variant="outline" className="h-12 justify-start">
                  <Palette className="w-5 h-5 mr-2" />
                  🎨 Analyze App Visuals
                </Button>
                <Button variant="outline" className="h-12 justify-start">
                  <Palette className="w-5 h-5 mr-2" />
                  🌈 Color Palette Tool
                </Button>
                <Button variant="outline" className="h-12 justify-start">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  📱 UI Benchmark
                </Button>
                <Button variant="outline" className="h-12 justify-start">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  🎯 Creative Trends
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Apps for Comparison */}
          {selectedApps.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">🔄 Compare Apps ({selectedApps.length}/4)</CardTitle>
                  <Button 
                    size="sm"
                    onClick={() => onCompareApps(selectedApps)}
                    disabled={selectedApps.length < 2}
                  >
                    Compare
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {selectedApps.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-2 border border-border rounded">
                    <span className="text-sm">{app.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedApps(selectedApps.filter(a => a.id !== app.id))}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Quick Analysis Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">⚡ Quick Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <ImageIcon className="w-4 h-4 mr-2" />
                Screenshot Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Palette className="w-4 h-4 mr-2" />
                Color Extractor
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                UI Pattern Search
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Brand Analyzer
              </Button>
            </CardContent>
          </Card>

          {/* Category Visual Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📈 Category Visual Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categoryPerformance.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{item.category}:</span>
                  <span className={`text-sm ${item.color}`}>🎨 {item.trend}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Creative Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">💡 Creative Insights</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Dark mode adoption increased 67% this month</p>
              <p>• Blue color schemes show 34% higher conversion rates</p>
              <p>• Minimalist icons preferred by 73% of users</p>
              <p>• Gradient backgrounds trending in productivity apps</p>
            </CardContent>
          </Card>

          {/* Performance Benchmarks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🏆 Top Performers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <div className="flex justify-between">
                  <span>Highest UI Score:</span>
                  <span className="font-medium">Notion (92/100)</span>
                </div>
                <div className="flex justify-between">
                  <span>Best Color Harmony:</span>
                  <span className="font-medium">Calm (94/100)</span>
                </div>
                <div className="flex justify-between">
                  <span>Top Conversion:</span>
                  <span className="font-medium">Notion (15.2%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Highest Revenue:</span>
                  <span className="font-medium">Spotify ($120M)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}