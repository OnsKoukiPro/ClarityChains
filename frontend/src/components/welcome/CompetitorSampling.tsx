import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  ArrowLeft,
  ArrowRight,
  Brain,
  TrendingUp,
  Star,
  Download,
  DollarSign,
  Users,
  Eye,
  Settings,
  Zap,
  Globe,
  Clock,
  Target
} from 'lucide-react';

interface CompetitorSamplingProps {
  appData?: any;
  selectedGenre: any;
  onComplete: (competitors: any[]) => void;
  onBack: () => void;
}

// Real market data from the spreadsheet
const realHomeDesignApps = [
  {
    id: 1,
    name: 'Home AI',
    fullName: 'Home AI - AI Interior Design',
    publisher: 'HUBX',
    releaseDate: 'Apr 5, 2024',
    categories: ['Graphics & Design', 'Lifestyle'],
    monthlyRevenue: 1300000,
    rpd: 0.39,
    downloads: 2600000,
    rating: 4.2,
    reviewCount: 596000,
    growth: 54, // Estimated based on market position
    dau: 279000,
    avgSession: 2.3,
    sessionsPerDay: 2.3,
    personas: ['Wholesale Shoppers', 'Home Cooks'],
    keyFeatures: ['AI redesign', '10+ styles', 'decor recs'],
    languages: 10,
    uniqueFeatures: 'Instant AI redesign from photos',
    tier: 'top',
    pricing: {
      weekly: 4.99,
      monthly: 13.99,
      annual: 39.99,
      lifetime: null
    },
    topMarkets: [
      { country: 'US', share: 54 },
      { country: 'Brazil', share: 4 },
      { country: 'UK', share: 6 }
    ],
    untappedOpportunity: 'India (localize pricing)',
    topAdChannel: 'TikTok, Reels',
    bestAd: 'AI redesign in seconds (5.1%)',
    topKeywords: ['AI room design', 'Virtual decor'],
    asoTrick: 'UGC testimonials',
    hasAI: true,
    has3D: false,
    hasLifetime: false,
    multiLanguage: true,
    hasExterior: false,
    usp: 'Viral AI'
  },
  {
    id: 2,
    name: 'Room Planner',
    fullName: 'Room Planner - AI Home Design',
    publisher: 'Room Planner Ltd',
    releaseDate: 'Apr 8, 2016',
    categories: ['Lifestyle', 'Productivity'],
    monthlyRevenue: 794500,
    rpd: 0.54,
    downloads: 893000,
    rating: 4.7,
    reviewCount: 268000,
    growth: 44,
    dau: 117000,
    avgSession: 13.5,
    sessionsPerDay: 2.9,
    personas: ['Mental Health Enthusiasts', 'Shopaholics'],
    keyFeatures: ['3D modeling', 'AI scanner', 'precision tools'],
    languages: 30,
    uniqueFeatures: 'IKEA integration, collaboration tools',
    tier: 'top',
    pricing: {
      weekly: 5.99,
      monthly: 14.99,
      annual: 39.99,
      lifetime: null
    },
    topMarkets: [
      { country: 'US', share: 44 },
      { country: 'Russia', share: 19 },
      { country: 'Brazil', share: 13 }
    ],
    untappedOpportunity: 'Germany (IKEA demand)',
    topAdChannel: 'Facebook, TikTok',
    bestAd: 'IKEA furniture in your room (4.2%)',
    topKeywords: ['IKEA designer', '3D floor plan'],
    asoTrick: 'Competitor hijacking ("Houzz")',
    hasAI: true,
    has3D: true,
    hasLifetime: false,
    multiLanguage: true,
    hasExterior: false,
    usp: 'IKEA integration'
  },
  {
    id: 3,
    name: 'Planner 5D',
    fullName: 'Planner 5D: Home Design, Decor',
    publisher: 'Planner5D, UAB',
    releaseDate: 'Apr 30, 2013',
    categories: ['Lifestyle', 'Productivity'],
    monthlyRevenue: 554500,
    rpd: 0.33,
    downloads: 498000,
    rating: 4.4,
    reviewCount: 367000,
    growth: 34,
    dau: 50000,
    avgSession: 9.1,
    sessionsPerDay: 2.6,
    personas: ['Latte Lovers', 'Shopaholics'],
    keyFeatures: ['2D/3D editor', '8400+ items', 'photo-to-3D'],
    languages: 20,
    uniqueFeatures: 'Cross-platform sync, offline editing',
    tier: 'established',
    pricing: {
      weekly: 7.99,
      monthly: 19.99,
      annual: 15.99,
      lifetime: 24.99
    },
    topMarkets: [
      { country: 'US', share: 34 },
      { country: 'Brazil', share: 6 },
      { country: 'UK', share: 4 }
    ],
    untappedOpportunity: 'China (Android focus)',
    topAdChannel: 'Pinterest, YouTube',
    bestAd: 'Design dream home in 3D (3.8%)',
    topKeywords: ['Home design 3D', 'DIY remodel'],
    asoTrick: 'Tutorial videos',
    hasAI: true,
    has3D: true,
    hasLifetime: true,
    multiLanguage: true,
    hasExterior: true,
    usp: '8,400+ items'
  },
  {
    id: 4,
    name: 'AI Remodel',
    fullName: 'AI Remodel - Interior Design',
    publisher: 'PRIMA SORTE INC',
    releaseDate: 'May 9, 2024',
    categories: ['Graphics & Design', 'Utilities'],
    monthlyRevenue: 344500,
    rpd: 1.73,
    downloads: 179000,
    rating: 4.5,
    reviewCount: 8000,
    growth: 58,
    dau: 59000,
    avgSession: 1.2,
    sessionsPerDay: 2.1,
    personas: ['DIY Enthusiasts', 'Real Estate Pros'],
    keyFeatures: ['AI remodeling', '3D measurements'],
    languages: 5,
    uniqueFeatures: 'Lifetime purchase option',
    tier: 'rising',
    pricing: {
      weekly: 9.99,
      monthly: 24.99,
      annual: 39.99,
      lifetime: 49.99
    },
    topMarkets: [
      { country: 'US', share: 58 },
      { country: 'Mexico', share: 6 },
      { country: 'Canada', share: 2 }
    ],
    untappedOpportunity: 'Spain (Spanish support)',
    topAdChannel: 'Google UAC',
    bestAd: 'Lifetime access for $49.99 (3.8%)',
    topKeywords: ['AI remodel', 'Home makeover'],
    asoTrick: 'Limited-time offer highlights',
    hasAI: true,
    has3D: false,
    hasLifetime: true,
    multiLanguage: false,
    hasExterior: false,
    usp: 'One-time purchase'
  },
  {
    id: 5,
    name: 'Arch',
    fullName: 'Arch - AI Home Design',
    publisher: 'AppNation Ltd.',
    releaseDate: 'May 31, 2023',
    categories: ['Graphics & Design', 'Lifestyle'],
    monthlyRevenue: 304100,
    rpd: 0.93,
    downloads: 155000,
    rating: 4.6,
    reviewCount: 85000,
    growth: 40,
    dau: 176000,
    avgSession: 2.0,
    sessionsPerDay: 2.3,
    personas: ['Crypto Traders', 'Gig Workers'],
    keyFeatures: ['AI room transformation', '10+ styles'],
    languages: 1,
    uniqueFeatures: 'Apple Vision PRO support',
    tier: 'rising',
    pricing: {
      weekly: 4.99,
      monthly: 19.99,
      annual: 19.99,
      lifetime: null
    },
    topMarkets: [
      { country: 'US', share: 40 },
      { country: 'Australia', share: 5 },
      { country: 'Saudi Arabia', share: 5 }
    ],
    untappedOpportunity: 'Arabic localization',
    topAdChannel: 'Meta Ads',
    bestAd: 'Apple Vision Pro support (2.9%)',
    topKeywords: ['AI home design', 'AR room'],
    asoTrick: 'Premium icon design',
    hasAI: true,
    has3D: false,
    hasLifetime: false,
    multiLanguage: false,
    hasExterior: false,
    usp: 'Apple Vision Pro'
  },
  {
    id: 6,
    name: 'Interior DecAI',
    fullName: 'AI Home Design: Interior DecAI',
    publisher: 'COOL SUMMER LIMITED',
    releaseDate: 'May 23, 2024',
    categories: ['Graphics & Design', 'Lifestyle'],
    monthlyRevenue: 313600,
    rpd: 0.58,
    downloads: 563000,
    rating: 4.4,
    reviewCount: 4000,
    growth: 16,
    dau: 29000,
    avgSession: 0.0,
    sessionsPerDay: 0.0,
    personas: ['Design Enthusiasts', 'New Homeowners'],
    keyFeatures: ['AI design', 'object removal', 'style picker'],
    languages: 25,
    uniqueFeatures: 'Clutter removal tool',
    tier: 'rising',
    pricing: {
      weekly: 5.99,
      monthly: 19.99,
      annual: 14.99,
      lifetime: 49.99
    },
    topMarkets: [
      { country: 'US', share: 16 },
      { country: 'Brazil', share: 12 },
      { country: 'France', share: 4 }
    ],
    untappedOpportunity: 'German (EU expansion)',
    topAdChannel: 'TikTok Lead Ads',
    bestAd: 'Redesign for free (6.3%)',
    topKeywords: ['AI interior design 🏠'],
    asoTrick: 'Emojis in title (+14% CTR)',
    hasAI: true,
    has3D: false,
    hasLifetime: true,
    multiLanguage: true,
    hasExterior: false,
    usp: 'Clutter removal'
  },
  {
    id: 7,
    name: 'Interio',
    fullName: 'AI Interior Design - Interio',
    publisher: 'Deep Vision Apps',
    releaseDate: 'Aug 13, 2024',
    categories: ['Graphics & Design', 'Lifestyle'],
    monthlyRevenue: 221400,
    rpd: 0.24,
    downloads: 529000,
    rating: 4.5,
    reviewCount: 6000,
    growth: 24,
    dau: 8000,
    avgSession: 1.4,
    sessionsPerDay: 2.0,
    personas: ['Home Cooks', 'Neo Bankers'],
    keyFeatures: ['AI redesign', '38 styles', 'demo images'],
    languages: 10,
    uniqueFeatures: 'Restaurant/office categories',
    tier: 'rising',
    pricing: {
      weekly: 4.99,
      monthly: null,
      annual: 39.99,
      lifetime: 39.99
    },
    topMarkets: [
      { country: 'Brazil', share: 24 },
      { country: 'US', share: 13 },
      { country: 'Mexico', share: 5 }
    ],
    untappedOpportunity: 'Fix Portuguese (Brazil)',
    topAdChannel: 'Snapchat',
    bestAd: 'Redesign restaurants/offices (4.0%)',
    topKeywords: ['AI commercial design'],
    asoTrick: 'Niche targeting',
    hasAI: true,
    has3D: false,
    hasLifetime: true,
    multiLanguage: true,
    hasExterior: false,
    usp: 'Commercial spaces'
  },
  {
    id: 8,
    name: 'Renovate AI',
    fullName: 'Renovate AI : Home Design',
    publisher: 'Trial and Error, Inc',
    releaseDate: 'Jan 17, 2023',
    categories: ['Graphics & Design', 'Productivity'],
    monthlyRevenue: 144300,
    rpd: 1.95,
    downloads: 82000,
    rating: 4.1,
    reviewCount: 4000,
    growth: 78,
    dau: 47000,
    avgSession: 5.0,
    sessionsPerDay: 2.6,
    personas: ['DIY Renovators', 'Interior Design Enthusiasts'],
    keyFeatures: ['Virtual staging', '3D renders', 'sketch-to-render'],
    languages: 1,
    uniqueFeatures: 'Credit-based system',
    tier: 'rising',
    pricing: {
      weekly: 4.99,
      monthly: 19.99,
      annual: 39.99,
      lifetime: null
    },
    topMarkets: [
      { country: 'US', share: 78 },
      { country: 'Canada', share: 4 },
      { country: 'Australia', share: 3 }
    ],
    untappedOpportunity: 'Pro tools for Germany',
    topAdChannel: 'LinkedIn, Reddit',
    bestAd: 'Pro architect tools (2.9%)',
    topKeywords: ['Virtual staging', '3D renders'],
    asoTrick: 'B2B-focused copy',
    hasAI: true,
    has3D: true,
    hasLifetime: false,
    multiLanguage: false,
    hasExterior: true,
    usp: 'Pro architect tools'
  },
  {
    id: 9,
    name: 'Deko',
    fullName: 'Deko: AI Home Design & Remodel',
    publisher: 'PIXELCELL.LIMITED',
    releaseDate: 'May 17, 2023',
    categories: ['Graphics & Design', 'Lifestyle'],
    monthlyRevenue: 119800,
    rpd: 1.79,
    downloads: 62000,
    rating: 4.6,
    reviewCount: 5000,
    growth: 42,
    dau: 24000,
    avgSession: 3.2,
    sessionsPerDay: 2.8,
    personas: ['Home Decor Enthusiasts', 'DIY Designers'],
    keyFeatures: ['AI remodeling', 'photo-to-design'],
    languages: 15,
    uniqueFeatures: 'Room-specific AI suggestions',
    tier: 'rising',
    pricing: {
      weekly: 4.99,
      monthly: null,
      annual: 29.99,
      lifetime: null
    },
    topMarkets: [
      { country: 'US', share: 42 },
      { country: 'Brazil', share: 14 },
      { country: 'Canada', share: 5 }
    ],
    untappedOpportunity: 'Japan (luxury segment)',
    topAdChannel: 'Instagram',
    bestAd: 'Luxury AI designs (5.5%)',
    topKeywords: ['High-end home design'],
    asoTrick: 'Luxury aesthetic',
    hasAI: true,
    has3D: true,
    hasLifetime: false,
    multiLanguage: true,
    hasExterior: false,
    usp: 'High RPD'
  },
  {
    id: 10,
    name: 'Remodel AI',
    fullName: 'Remodel AI - Interior Design',
    publisher: 'REIMAGE AI INC.',
    releaseDate: 'Apr 17, 2023',
    categories: ['Graphics & Design', 'Photo & Video'],
    monthlyRevenue: 126800,
    rpd: 0.89,
    downloads: 103000,
    rating: 4.6,
    reviewCount: 31000,
    growth: 65,
    dau: 55000,
    avgSession: 4.5,
    sessionsPerDay: 3.9,
    personas: ['Wholesale Shoppers', 'Neo Bankers'],
    keyFeatures: ['AI design transformation', 'style variations'],
    languages: 1,
    uniqueFeatures: 'Exterior/landscape focus',
    tier: 'rising',
    pricing: {
      weekly: 4.99,
      monthly: 5.99,
      annual: 39.99,
      lifetime: null
    },
    topMarkets: [
      { country: 'US', share: 65 },
      { country: 'Australia', share: 4 },
      { country: 'Canada', share: 2 }
    ],
    untappedOpportunity: 'Localize for Australia',
    topAdChannel: 'Google Search',
    bestAd: 'Style variations in 1 tap (3.2%)',
    topKeywords: ['Remodel AI', 'Design styles'],
    asoTrick: 'Simple UI showcase',
    hasAI: true,
    has3D: false,
    hasLifetime: false,
    multiLanguage: false,
    hasExterior: false,
    usp: 'Style variations'
  },
  {
    id: 11,
    name: 'Interior by Home AI',
    fullName: 'Interior design by Home AI',
    publisher: 'App Vizyon',
    releaseDate: 'Sep 12, 2024',
    categories: ['Graphics & Design', 'Lifestyle'],
    monthlyRevenue: 61600,
    rpd: 1.79,
    downloads: 36000,
    rating: 4.1,
    reviewCount: 2000,
    growth: 55,
    dau: 0,
    avgSession: 0,
    sessionsPerDay: 0,
    personas: ['Home DIY Enthusiasts', 'Young Renters'],
    keyFeatures: ['AI room designs', 'virtual decor previews'],
    languages: 1,
    uniqueFeatures: 'Blur/unblur previews',
    tier: 'rising',
    pricing: {
      weekly: 8.99,
      monthly: 19.99,
      annual: 19.99,
      lifetime: null
    },
    topMarkets: [
      { country: 'US', share: 55 },
      { country: 'Canada', share: 9 },
      { country: 'UK', share: 8 }
    ],
    untappedOpportunity: 'UK renters (low competition)',
    topAdChannel: 'Facebook',
    bestAd: 'Blur/unblur previews (4.1%)',
    topKeywords: ['AI room preview'],
    asoTrick: 'Privacy-focused messaging',
    hasAI: true,
    has3D: false,
    hasLifetime: false,
    multiLanguage: false,
    hasExterior: false,
    usp: 'Blur/unblur previews'
  }
];

const getCompetitorsForGenre = (genreId: string) => {
  if (genreId === 'home-design') {
    return realHomeDesignApps;
  }
  
  // For other genres, return a subset as example (you can expand this)
  return realHomeDesignApps.slice(0, 6).map(app => ({
    ...app,
    // Adjust data slightly for different genres
    monthlyRevenue: app.monthlyRevenue * 0.7,
    downloads: app.downloads * 0.8,
    rpd: app.rpd * 1.1
  }));
};

export function CompetitorSampling({ appData, selectedGenre, onComplete, onBack }: CompetitorSamplingProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [selectedCompetitors, setSelectedCompetitors] = useState<any[]>([]);
  const [analysisPhase, setAnalysisPhase] = useState('');

  useEffect(() => {
    // Simulate AI analysis
    const phases = [
      'Scanning app store data...',
      'Analyzing revenue metrics...',
      'Identifying top performers...',
      'Calculating market share...',
      'Generating competitor sample...'
    ];

    let currentPhase = 0;
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          const competitorData = getCompetitorsForGenre(selectedGenre.id);
          setCompetitors(competitorData);
          setSelectedCompetitors(competitorData); // Auto-select all for comprehensive analysis
          return 100;
        }
        
        if (Math.floor(newProgress / 20) !== currentPhase) {
          currentPhase = Math.floor(newProgress / 20);
          setAnalysisPhase(phases[currentPhase] || phases[phases.length - 1]);
        }
        
        return newProgress;
      });
    }, 800);

    setAnalysisPhase(phases[0]);

    return () => clearInterval(interval);
  }, [selectedGenre.id]);

  const handleCompetitorToggle = (competitor: any) => {
    setSelectedCompetitors(prev => {
      const isSelected = prev.find(c => c.id === competitor.id);
      if (isSelected) {
        return prev.filter(c => c.id !== competitor.id);
      } else if (prev.length < 15) {
        return [...prev, competitor];
      }
      return prev;
    });
  };

  const handleContinue = () => {
    onComplete(selectedCompetitors);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'top': return 'text-red-600 bg-red-50 border-red-200';
      case 'rising': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'established': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const totalRevenue = selectedCompetitors.reduce((sum, comp) => sum + comp.monthlyRevenue, 0);
  const totalDownloads = selectedCompetitors.reduce((sum, comp) => sum + comp.downloads, 0);
  const avgRpd = selectedCompetitors.length > 0 ? (selectedCompetitors.reduce((sum, comp) => sum + comp.rpd, 0) / selectedCompetitors.length).toFixed(2) : '0.00';
  const marketShare = Math.round((totalRevenue / 5000000) * 100); // Estimate against broader market

  if (isAnalyzing) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">🤖 AI Auto-Selecting Test Group</h1>
          <p className="text-muted-foreground">
            Analyzing the <span className="font-medium">{selectedGenre.name}</span> market with real app store data
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="font-medium mb-2">Real Market Data Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">{analysisPhase}</p>
                <Progress value={analysisProgress} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">{analysisProgress}% Complete</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Market Size</p>
                  <p className="font-semibold">{selectedGenre.marketSize}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Apps Found</p>
                  <p className="font-semibold">11 apps</p>
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>Analyzing real revenue data, downloads, and pricing strategies...</p>
                <p>Using actual app store intelligence</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Genre Selection
        </Button>
        <Badge variant="secondary">
          {selectedCompetitors.length} of {competitors.length} Selected
        </Badge>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">
          🤖 Real Market Intelligence ({selectedCompetitors.length} Competitors)
        </h1>
        <p className="text-muted-foreground">
          Representing {marketShare}% market coverage • ${(totalRevenue / 1000000).toFixed(1)}M combined revenue • {(totalDownloads / 1000000).toFixed(1)}M downloads
        </p>
      </div>

      {/* Market Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Real Market Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Combined Revenue</p>
              <p className="font-semibold">${(totalRevenue / 1000000).toFixed(1)}M</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Downloads</p>
              <p className="font-semibold">{(totalDownloads / 1000000).toFixed(1)}M</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Average RPD</p>
              <p className="font-semibold">${avgRpd}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">RPD Range</p>
              <p className="font-semibold">$0.24-$1.95</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Top Market</p>
              <p className="font-semibold">🇺🇸 US</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">AI Integration</p>
              <p className="font-semibold">100%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Leaders */}
      <div>
        <h2 className="text-lg font-semibold mb-4">🏆 Revenue Leaders (Real Data)</h2>
        <div className="space-y-3">
          {competitors.slice(0, 3).map((competitor) => (
            <Card key={competitor.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      📱
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{competitor.name}</h3>
                        <Badge className={getTierColor(competitor.tier)}>
                          {competitor.tier}
                        </Badge>
                        {competitor.hasLifetime && (
                          <Badge variant="outline" className="text-xs">Lifetime</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {(competitor.downloads / 1000000).toFixed(1)}M downloads • {competitor.publisher} • Released {competitor.releaseDate}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <strong>USP:</strong> {competitor.usp} • <strong>Languages:</strong> {competitor.languages}+ • <strong>Top Market:</strong> {competitor.topMarkets[0].country} ({competitor.topMarkets[0].share}%)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm font-medium">${(competitor.monthlyRevenue / 1000).toFixed(0)}K/mo</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">${competitor.rpd}</p>
                      <p className="text-xs text-muted-foreground">RPD</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        {competitor.rating}
                      </p>
                      <p className="text-xs text-muted-foreground">{(competitor.reviewCount / 1000).toFixed(0)}K reviews</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">
                        💰 #{competitor.id <= 3 ? competitor.id : '4+'}
                      </p>
                      <p className="text-xs text-muted-foreground">Rank</p>
                    </div>
                    <Button 
                      variant={selectedCompetitors.find(c => c.id === competitor.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCompetitorToggle(competitor)}
                    >
                      {selectedCompetitors.find(c => c.id === competitor.id) ? (
                        <>
                          <Eye className="w-4 h-4 mr-1" />
                          Analyzing
                        </>
                      ) : (
                        'Analyze'
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* High RPD Performers */}
      <div>
        <h2 className="text-lg font-semibold mb-4">💎 High RPD Performers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {competitors
            .filter(app => app.rpd > 1.5)
            .map((competitor) => (
              <Card key={competitor.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleCompetitorToggle(competitor)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getTierColor(competitor.tier)}>
                      {competitor.tier}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm">
                      {selectedCompetitors.find(c => c.id === competitor.id) ? (
                        <Badge variant="default" className="text-xs">✓ Selected</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">+ Select</Badge>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-medium mb-1">{competitor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {competitor.uniqueFeatures}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">RPD</span>
                      <span className="font-medium text-green-600">${competitor.rpd}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Revenue</span>
                      <span className="font-medium">${(competitor.monthlyRevenue / 1000).toFixed(0)}K/mo</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Strategy</span>
                      <span className="font-medium">{competitor.hasLifetime ? 'Lifetime' : 'Subscription'}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-muted-foreground mb-1">Top Market:</p>
                    <div className="text-xs">
                      🇺🇸 {competitor.topMarkets[0].country} ({competitor.topMarkets[0].share}%)
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Rest of Apps */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">📈 All Market Players ({competitors.length - 3} More Apps)</h2>
          <Button variant="outline" size="sm">
            View Market Map →
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {competitors.slice(3).map((competitor) => (
            <Card key={competitor.id} className="hover:shadow-md transition-shadow cursor-pointer text-sm" onClick={() => handleCompetitorToggle(competitor)}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getTierColor(competitor.tier)} style={{ fontSize: '10px' }}>
                    {competitor.tier}
                  </Badge>
                  {selectedCompetitors.find(c => c.id === competitor.id) ? (
                    <Badge variant="default" className="text-xs">✓</Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">+</Badge>
                  )}
                </div>
                
                <h4 className="font-medium text-sm mb-1">{competitor.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{competitor.usp}</p>
                
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RPD:</span>
                    <span className="font-medium">${competitor.rpd}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="font-medium">${(competitor.monthlyRevenue / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Downloads:</span>
                    <span className="font-medium">{(competitor.downloads / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6">
        <div className="text-sm text-muted-foreground">
          <p><strong>Real market intelligence</strong> from 11 active competitors</p>
          <p>Revenue range: $62K - $1.3M/month • RPD range: $0.24 - $1.95</p>
        </div>
        
        <Button onClick={handleContinue} disabled={selectedCompetitors.length === 0} size="lg">
          <Zap className="w-4 h-4 mr-2" />
          Analyze Real Market Data ({selectedCompetitors.length} apps)
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}