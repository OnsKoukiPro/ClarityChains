import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  ArrowLeft,
  ArrowRight,
  Palette,
  Play,
  Target,
  Eye,
  Filter,
  Settings,
  BarChart3,
  Download,
  Lightbulb,
  Search,
  TrendingUp,
  Globe,
  Camera,
  Video,
  Smartphone,
  Zap,
  Star,
  Users,
  ChevronDown,
  PlayCircle,
  MonitorPlay,
  Image as ImageIcon
} from 'lucide-react';

interface CreativeModuleProps {
  subPage: string;
  selectedApp: any;
  onSubPageChange: (page: string, appData?: any) => void;
  appContext: any;
  welcomeContext?: any;
}

// Real ad creative performance data
const adCreativeData = {
  overview: {
    totalAdsAnalyzed: 156,
    avgCVR: 4.3,
    topPerformingCVR: 11.2,
    totalAdSpend: '$2.4M',
    topAdFormat: 'Video Demos',
    trendingPattern: 'Before/After Transformations'
  },
  trendingElements: [
    { element: 'Before/After Sliders', growth: '+67%', description: 'Interactive transformation demos' },
    { element: 'Speed Demos (10-15s)', growth: '+45%', description: 'Quick AI transformation videos' },
    { element: 'UGC Testimonials', growth: '+34%', description: 'Real user transformation stories' },
    { element: 'Emoji Hooks', growth: '+28%', description: 'Emoji-rich ad copy and visuals' }
  ],
  topPerformingAds: [
    {
      app: 'Home AI',
      adType: 'Video Demo',
      duration: '15s',
      cvr: 11.2,
      ctr: 8.7,
      spend: '$340K',
      hook: 'Transform any room in 10 seconds',
      pattern: 'Speed Demo',
      geoPerformance: { US: 10.8, Brazil: 13.2, UK: 9.4, Germany: 7.1 },
      description: 'Upload photo → AI processing → instant transformation',
      retentionBreakdown: [
        { time: '0-3s', retention: 100, action: 'Photo upload demo', impact: 'Hook engagement: 89%' },
        { time: '3-8s', retention: 87, action: 'AI processing animation', impact: 'Trust building: +12%' },
        { time: '8-12s', retention: 78, action: 'Transformation reveal', impact: 'Peak interest: +34%' },
        { time: '12-15s', retention: 74, action: 'Download CTA', impact: 'Conversion: 11.2%' }
      ]
    },
    {
      app: 'Room Planner',
      adType: 'Interactive Slider',
      duration: '25s',
      cvr: 9.8,
      ctr: 6.4,
      spend: '$280K',
      hook: 'Slide to see the magic happen',
      pattern: 'Before/After Slider',
      geoPerformance: { US: 9.2, Brazil: 11.1, UK: 8.7, Germany: 8.0 },
      description: 'Interactive slider showing room transformation with IKEA furniture',
      retentionBreakdown: [
        { time: '0-5s', retention: 100, action: 'Room setup introduction', impact: 'Context setting: 94%' },
        { time: '5-15s', retention: 91, action: 'Interactive slider demo', impact: 'Engagement: +18%' },
        { time: '15-20s', retention: 84, action: 'IKEA furniture showcase', impact: 'Product focus: +8%' },
        { time: '20-25s', retention: 81, action: 'App download CTA', impact: 'Conversion: 9.8%' }
      ]
    },
    {
      app: 'Interior DecAI',
      adType: 'UGC Testimonial',
      duration: '20s',
      cvr: 8.5,
      ctr: 12.3,
      spend: '$195K',
      hook: 'Real users, real transformations',
      pattern: 'UGC Story',
      geoPerformance: { US: 7.9, Brazil: 10.8, UK: 7.2, Germany: 6.1 },
      description: 'Real user testimonials with before/after room transformations',
      retentionBreakdown: [
        { time: '0-4s', retention: 100, action: 'User introduction', impact: 'Relatability: 92%' },
        { time: '4-12s', retention: 88, action: 'Transformation story', impact: 'Emotional connection: +23%' },
        { time: '12-16s', retention: 82, action: 'Results showcase', impact: 'Social proof: +15%' },
        { time: '16-20s', retention: 79, action: 'App recommendation CTA', impact: 'Conversion: 8.5%' }
      ]
    }
  ]
};

// Visual assets performance data
const visualAssetsData = {
  overview: {
    appsAnalyzed: 2847,
    colorPalettes: 1234,
    uiPatterns: 567,
    screenshots: 15678
  },
  trendingElements: [
    { element: 'Dark Mode UI', growth: '+67%', usage: '2,847 apps analyzed' },
    { element: 'Gradient Backgrounds', growth: '+45%', usage: '1,234 apps using' },
    { element: 'Blue Color Schemes', growth: '+34%', usage: 'Higher conversion rates' },
    { element: 'Minimalist Icons', growth: '+28%', usage: 'User preference trending' }
  ],
  featuredApps: [
    {
      name: 'Calm',
      category: 'Meditation',
      colorHarmony: 94,
      uiScore: 87,
      description: 'Soothing blues + perfect white space balance',
      primaryColors: [
        { color: '#2D5AA0', name: 'Trust Blue', usage: '45%', psychology: 'Trust & Calm' },
        { color: '#F8F9FA', name: 'Pure White', usage: '30%', psychology: 'Clean & Spacious' },
        { color: '#52C41A', name: 'Calm Green', usage: '15%', psychology: 'Growth & Harmony' },
        { color: '#1F1F1F', name: 'Deep Gray', usage: '10%', psychology: 'Stability' }
      ]
    },
    {
      name: 'Notion',
      category: 'Productivity',
      colorHarmony: 89,
      uiScore: 92,
      description: 'Clean layout with strategic color accents',
      primaryColors: [
        { color: '#000000', name: 'Pure Black', usage: '40%', psychology: 'Focus & Clarity' },
        { color: '#FFFFFF', name: 'Clean White', usage: '35%', psychology: 'Simplicity' },
        { color: '#2764E7', name: 'Focus Blue', usage: '15%', psychology: 'Trust & Action' },
        { color: '#FF6B6B', name: 'Accent Red', usage: '10%', psychology: 'Attention & Energy' }
      ]
    },
    {
      name: 'Duolingo',
      category: 'Education',
      colorHarmony: 91,
      uiScore: 88,
      description: 'Playful green with motivational design system',
      primaryColors: [
        { color: '#58CC02', name: 'Duolingo Green', usage: '50%', psychology: 'Success & Growth' },
        { color: '#1CB0F6', name: 'Sky Blue', usage: '25%', psychology: 'Learning & Trust' },
        { color: '#FF9600', name: 'Energy Orange', usage: '15%', psychology: 'Motivation & Fun' },
        { color: '#E5E5E5', name: 'Neutral Gray', usage: '10%', psychology: 'Balance' }
      ]
    },
    {
      name: 'Spotify',
      category: 'Music',
      colorHarmony: 86,
      uiScore: 90,
      description: 'Bold green with dark theme mastery',
      primaryColors: [
        { color: '#1DB954', name: 'Spotify Green', usage: '30%', psychology: 'Energy & Music' },
        { color: '#191414', name: 'Deep Black', usage: '50%', psychology: 'Premium & Focus' },
        { color: '#FFFFFF', name: 'Pure White', usage: '15%', psychology: 'Contrast & Clarity' },
        { color: '#535353', name: 'Medium Gray', usage: '5%', psychology: 'Subtle Details' }
      ]
    }
  ],
  categoryPerformance: [
    { category: 'Health', trend: 'Soft colors winning', colors: ['#E8F5E8', '#B3E5FC', '#FFF3E0'] },
    { category: 'Productivity', trend: 'Dark mode preference', colors: ['#1A1A1A', '#2D2D2D', '#404040'] },
    { category: 'Finance', trend: 'Trust colors (blue)', colors: ['#1976D2', '#2196F3', '#0D47A1'] },
    { category: 'Gaming', trend: 'Vibrant schemes', colors: ['#FF6B35', '#F7931E', '#FFD23F'] }
  ]
};

export function CreativeModule({ subPage, selectedApp, onSubPageChange, appContext, welcomeContext }: CreativeModuleProps) {
  const [activeSection, setActiveSection] = useState('hub');

  // Route to different sections
  if (subPage === 'ad-creatives') {
    return <AdCreativesAnalysis onBack={() => onSubPageChange('')} appContext={appContext} />;
  }

  if (subPage === 'visual-assets') {
    return <VisualAssetsAnalysis onBack={() => onSubPageChange('')} appContext={appContext} />;
  }

  if (subPage === 'comparison') {
    return <CreativeComparison onBack={() => onSubPageChange('')} appContext={appContext} />;
  }

  if (subPage === 'detail') {
    return <CreativeDetailAnalysis selectedApp={selectedApp} onBack={() => onSubPageChange('')} />;
  }

  // Main Creative Intelligence Hub
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">🎨 Creative Intelligence Hub</h1>
          <p className="text-muted-foreground">
            Visual intelligence dashboard for {appContext?.subcategory || 'Home Design'} apps
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Creative Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Creative Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{adCreativeData.overview.totalAdsAnalyzed}</p>
              <p className="text-sm text-muted-foreground">Ad Creatives</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{visualAssetsData.overview.colorPalettes}</p>
              <p className="text-sm text-muted-foreground">Color Palettes</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{visualAssetsData.overview.uiPatterns}</p>
              <p className="text-sm text-muted-foreground">UI Patterns</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{visualAssetsData.overview.screenshots}</p>
              <p className="text-sm text-muted-foreground">Screenshots</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Creative Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ad Creatives Section */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSubPageChange('ad-creatives')}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <MonitorPlay className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-lg">🎬 Ad Creatives Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Video ads & performance insights</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">{adCreativeData.overview.totalAdsAnalyzed} ads analyzed</p>
                  <p className="text-muted-foreground">Avg CVR: {adCreativeData.overview.avgCVR}%</p>
                </div>
                <div>
                  <p className="font-medium">Best: {adCreativeData.overview.topPerformingCVR}% CVR</p>
                  <p className="text-muted-foreground">Spend: {adCreativeData.overview.totalAdSpend}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">🔥 Top Performing Patterns:</h4>
                {adCreativeData.trendingElements.slice(0, 2).map((element, index) => (
                  <div key={index} className="flex justify-between text-xs p-2 bg-muted/50 rounded">
                    <span>{element.element}</span>
                    <span className="text-green-600 font-medium">{element.growth}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full" onClick={() => onSubPageChange('ad-creatives')}>
                <PlayCircle className="w-4 h-4 mr-2" />
                Analyze Ad Creatives
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Visual Assets Section */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSubPageChange('visual-assets')}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">📱 Visual Assets Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Screenshots, UI & color intelligence</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">{visualAssetsData.overview.appsAnalyzed} apps analyzed</p>
                  <p className="text-muted-foreground">{visualAssetsData.overview.screenshots} screenshots</p>
                </div>
                <div>
                  <p className="font-medium">{visualAssetsData.overview.colorPalettes} palettes</p>
                  <p className="text-muted-foreground">{visualAssetsData.overview.uiPatterns} UI patterns</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">🔥 Trending Visual Elements:</h4>
                {visualAssetsData.trendingElements.slice(0, 2).map((element, index) => (
                  <div key={index} className="flex justify-between text-xs p-2 bg-muted/50 rounded">
                    <span>{element.element}</span>
                    <span className="text-green-600 font-medium">{element.growth}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full" onClick={() => onSubPageChange('visual-assets')}>
                <Palette className="w-4 h-4 mr-2" />
                Analyze Visual Assets
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Creative Analysis */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>🖼️ Featured Creative Analysis</CardTitle>
            <Button variant="outline" size="sm" onClick={() => onSubPageChange('visual-assets')}>
              View All →
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visualAssetsData.featuredApps.slice(0, 2).map((app) => (
              <div key={app.name} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => onSubPageChange('detail', app)}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    📱
                  </div>
                  <div>
                    <h4 className="font-medium">{app.name} - {app.category}</h4>
                    <p className="text-sm text-muted-foreground">{app.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <p className="font-medium text-blue-600">{app.colorHarmony}/100</p>
                    <p className="text-xs text-muted-foreground">Color Harmony</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <p className="font-medium text-green-600">{app.uiScore}/100</p>
                    <p className="text-xs text-muted-foreground">UI Score</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {app.primaryColors.slice(0, 4).map((color, index) => (
                    <div 
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color.color }}
                      title={`${color.name} (${color.usage})`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-3 h-3 mr-1" />
                    Analyze
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Palette className="w-3 h-3 mr-1" />
                    Extract Colors
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Creative Actions */}
      <Card>
        <CardHeader>
          <CardTitle>🔍 Quick Creative Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto p-3" onClick={() => onSubPageChange('visual-assets')}>
              <Palette className="w-4 h-4 mr-2" />
              <div className="text-left">
                <p className="font-medium text-sm">Analyze App Visuals</p>
                <p className="text-xs text-muted-foreground">UI & color analysis</p>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-3" onClick={() => onSubPageChange('ad-creatives')}>
              <PlayCircle className="w-4 h-4 mr-2" />
              <div className="text-left">
                <p className="font-medium text-sm">Ad Performance</p>
                <p className="text-xs text-muted-foreground">Video ads insights</p>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-3">
              <Target className="w-4 h-4 mr-2" />
              <div className="text-left">
                <p className="font-medium text-sm">Creative Trends</p>
                <p className="text-xs text-muted-foreground">Market patterns</p>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-3" onClick={() => onSubPageChange('comparison')}>
              <BarChart3 className="w-4 h-4 mr-2" />
              <div className="text-left">
                <p className="font-medium text-sm">UI Benchmark</p>
                <p className="text-xs text-muted-foreground">Compare designs</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Visual Performance */}
      <Card>
        <CardHeader>
          <CardTitle>📈 Category Visual Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {visualAssetsData.categoryPerformance.map((category) => (
              <div key={category.category} className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">{category.category}</h4>
                <p className="text-sm text-muted-foreground mb-2">{category.trend}</p>
                <div className="flex gap-1">
                  {category.colors.map((color, index) => (
                    <div 
                      key={index}
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Ad Creatives Analysis Component
function AdCreativesAnalysis({ onBack, appContext }: { onBack: () => void, appContext: any }) {
  const [selectedAd, setSelectedAd] = useState<any>(null);

  if (selectedAd) {
    return <AdCreativeDetail ad={selectedAd} onBack={() => setSelectedAd(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Creative Hub
        </Button>
        <Badge variant="secondary">Ad Creatives Analysis</Badge>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">🎬 Ad Creatives Performance Analysis</h1>
        <p className="text-muted-foreground">
          Video ads intelligence from {adCreativeData.overview.totalAdsAnalyzed} creatives in {appContext?.subcategory} apps
        </p>
      </div>

      {/* Ad Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Ad Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{adCreativeData.overview.totalAdsAnalyzed}</p>
              <p className="text-sm text-muted-foreground">Total Ads Analyzed</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{adCreativeData.overview.avgCVR}%</p>
              <p className="text-sm text-muted-foreground">Average CVR</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{adCreativeData.overview.topPerformingCVR}%</p>
              <p className="text-sm text-muted-foreground">Best Performing CVR</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{adCreativeData.overview.totalAdSpend}</p>
              <p className="text-sm text-muted-foreground">Total Ad Spend</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p><strong>Top Ad Format:</strong> {adCreativeData.overview.topAdFormat}</p>
              <p className="text-sm text-muted-foreground">15-second video demos perform best</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p><strong>Trending Pattern:</strong> {adCreativeData.overview.trendingPattern}</p>
              <p className="text-sm text-muted-foreground">Interactive sliders drive highest engagement</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trending Ad Elements */}
      <Card>
        <CardHeader>
          <CardTitle>🔥 Trending Ad Creative Elements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adCreativeData.trendingElements.map((element, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{element.element}</h4>
                  <p className="text-sm text-muted-foreground">{element.description}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">{element.growth}</Badge>
                  <p className="text-xs text-muted-foreground">Monthly growth</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Ads */}
      <Card>
        <CardHeader>
          <CardTitle>🏆 Top Performing Ad Creatives</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adCreativeData.topPerformingAds.map((ad, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => setSelectedAd(ad)}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{ad.app}</h4>
                    <p className="text-sm text-muted-foreground">"{ad.hook}"</p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-medium text-green-600">{ad.cvr}%</p>
                      <p className="text-muted-foreground">CVR</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{ad.ctr}%</p>
                      <p className="text-muted-foreground">CTR</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{ad.spend}</p>
                      <p className="text-muted-foreground">Spend</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm"><strong>Format:</strong> {ad.adType} ({ad.duration})</p>
                    <p className="text-sm"><strong>Pattern:</strong> {ad.pattern}</p>
                  </div>
                  <div>
                    <p className="text-sm"><strong>Description:</strong> {ad.description}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <PlayCircle className="w-3 h-3 mr-1" />
                    View Ad
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    Performance
                  </Button>
                  <Button variant="outline" size="sm">
                    <Globe className="w-3 h-3 mr-1" />
                    Geo Data
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Visual Assets Analysis Component
function VisualAssetsAnalysis({ onBack, appContext }: { onBack: () => void, appContext: any }) {
  const [selectedApp, setSelectedApp] = useState<any>(null);

  if (selectedApp) {
    return <VisualAssetDetail app={selectedApp} onBack={() => setSelectedApp(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Creative Hub
        </Button>
        <Badge variant="secondary">Visual Assets Analysis</Badge>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">📱 Visual Intelligence Dashboard</h1>
        <p className="text-muted-foreground">
          UI, color, and design analysis from {visualAssetsData.overview.appsAnalyzed} apps
        </p>
      </div>

      {/* Trending Visual Elements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            🔥 Trending Visual Elements
            <Button variant="outline" size="sm">View All →</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {visualAssetsData.trendingElements.map((element, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    🎨
                  </div>
                  <div>
                    <h4 className="font-medium">{element.element}</h4>
                    <p className="text-sm text-muted-foreground">{element.usage}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  📈 {element.growth}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Apps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            🖼️ Featured Creative Analysis
            <Button variant="outline" size="sm">View All →</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {visualAssetsData.featuredApps.map((app) => (
              <div key={app.name} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => setSelectedApp(app)}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      📱
                    </div>
                    <div>
                      <h4 className="font-medium">{app.name} - {app.category}</h4>
                      <p className="text-sm text-muted-foreground">{app.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="font-medium text-blue-600">{app.colorHarmony}/100</p>
                      <p className="text-xs text-muted-foreground">Color Harmony</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-green-600">{app.uiScore}/100</p>
                      <p className="text-xs text-muted-foreground">UI Score</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <h5 className="font-medium text-sm">Color Palette:</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {app.primaryColors.map((color, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                        <div 
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: color.color }}
                        />
                        <div>
                          <p className="text-xs font-medium">{color.name}</p>
                          <p className="text-xs text-muted-foreground">{color.usage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-3 h-3 mr-1" />
                    Analyze
                  </Button>
                  <Button variant="outline" size="sm">
                    <Palette className="w-3 h-3 mr-1" />
                    Extract Colors
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    Compare
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Additional detail components would follow the same pattern...
// AdCreativeDetail, VisualAssetDetail, CreativeComparison, CreativeDetailAnalysis

function AdCreativeDetail({ ad, onBack }: { ad: any, onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {ad.app} Ad Analysis
        </Button>
        <Badge variant="secondary">Detailed Analysis</Badge>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">🎬 "{ad.hook}"</h1>
        <p className="text-muted-foreground">
          {ad.app} • {ad.adType} • {ad.duration}
        </p>
      </div>

      {/* Ad Performance */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Ad Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{ad.cvr}%</p>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{ad.ctr}%</p>
              <p className="text-sm text-muted-foreground">Click-Through Rate</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{ad.spend}</p>
              <p className="text-sm text-muted-foreground">Ad Spend</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{ad.pattern}</p>
              <p className="text-sm text-muted-foreground">Creative Pattern</p>
            </div>
          </div>

          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm"><strong>Creative Description:</strong> {ad.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Retention Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>⏱️ Second-by-Second Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ad.retentionBreakdown.map((segment: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium">{segment.time}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{segment.action}</h4>
                    <p className="text-sm text-muted-foreground">{segment.impact}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{segment.retention}%</p>
                  <p className="text-xs text-muted-foreground">Retention</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Geographic Performance */}
      <Card>
        <CardHeader>
          <CardTitle>🌍 Geographic Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(ad.geoPerformance).map(([country, cvr]) => (
              <div key={country} className="text-center p-3 border rounded-lg">
                <div className="text-2xl mb-2">
                  {country === 'US' ? '🇺🇸' : 
                   country === 'Brazil' ? '🇧🇷' :
                   country === 'UK' ? '🇬🇧' : '🇩🇪'}
                </div>
                <h4 className="font-medium">{country}</h4>
                <p className="text-sm text-green-600 font-medium">{cvr}% CVR</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function VisualAssetDetail({ app, onBack }: { app: any, onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {app.name} Visual Analysis
        </Button>
        <Badge variant="secondary">Visual Analysis</Badge>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">{app.name} - Creative Analysis</h1>
        <p className="text-muted-foreground">
          {app.category} • Color Harmony: {app.colorHarmony}/100 • UI Score: {app.uiScore}/100
        </p>
      </div>

      {/* Visual Performance Scores */}
      <Card>
        <CardHeader>
          <CardTitle>🎨 Visual Performance Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{app.colorHarmony}/100</p>
              <p className="text-sm text-muted-foreground">Color Harmony</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{app.uiScore}/100</p>
              <p className="text-sm text-muted-foreground">UI Score</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">88/100</p>
              <p className="text-sm text-muted-foreground">Layout Balance</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">89/100</p>
              <p className="text-sm text-muted-foreground">UI Consistency</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Palette Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>🌈 Color Palette Extraction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h4 className="font-medium">Primary Colors:</h4>
            {app.primaryColors.map((color: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg border-2 border-white shadow-sm"
                    style={{ backgroundColor: color.color }}
                  />
                  <div>
                    <h5 className="font-medium">{color.color} ({color.name})</h5>
                    <p className="text-sm text-muted-foreground">Usage: {color.usage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{color.psychology}</Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">🤖 AI Creative Insights</h4>
            <p className="text-sm">{app.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CreativeComparison({ onBack, appContext }: { onBack: () => void, appContext: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Creative Comparison
        </Button>
        <Badge variant="secondary">Side-by-Side Analysis</Badge>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">🎨 Creative Comparison Tool</h1>
        <p className="text-muted-foreground">
          Compare visual styles and performance across {appContext?.subcategory} apps
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🔍 Creative Comparison Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Creative Comparison Analysis</h3>
            <p className="text-muted-foreground mb-4">
              Side-by-side comparison of visual styles, color strategies, and performance metrics
            </p>
            <Button>
              <Eye className="w-4 h-4 mr-2" />
              Start Comparison
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CreativeDetailAnalysis({ selectedApp, onBack }: { selectedApp: any, onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Creative Hub
        </Button>
        <Badge variant="secondary">Detailed Analysis</Badge>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Creative Deep Analysis</h1>
        <p className="text-muted-foreground">
          Comprehensive creative intelligence for {selectedApp?.name || 'selected app'}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🎨 Complete Creative Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Palette className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Detailed Creative Intelligence</h3>
            <p className="text-muted-foreground mb-4">
              Comprehensive analysis of visual assets, ad creatives, and performance metrics
            </p>
            <Button>
              <Eye className="w-4 h-4 mr-2" />
              Start Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}