import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Globe, 
  TrendingUp,
  Target,
  BarChart3,
  Eye,
  DollarSign,
  Users,
  Lightbulb,
  Map
} from 'lucide-react';

interface MarketDiscoveryProps {
  onBack: () => void;
  onMarketSelect: (market: any) => void;
}

const discoveredMarkets = [
  {
    rank: 1,
    country: 'Brazil',
    flag: '🇧🇷',
    category: 'Meditation',
    score: 94,
    revenue: '$180M',
    users: '45M users',
    competition: 'Low',
    opportunity: 'Portuguese localization gap in wellness apps'
  },
  {
    rank: 2,
    country: 'India',
    flag: '🇮🇳',
    category: 'Personal Finance',
    score: 92,
    revenue: '$340M',
    users: '280M users',
    competition: 'Medium',
    opportunity: 'Digital payment boom creates fintech opportunity'
  },
  {
    rank: 3,
    country: 'Germany',
    flag: '🇩🇪',
    category: 'B2B Productivity',
    score: 89,
    revenue: '$220M',
    users: '12M users',
    competition: 'Low',
    opportunity: 'GDPR-compliant productivity tools missing'
  },
  {
    rank: 4,
    country: 'Mexico',
    flag: '🇲🇽',
    category: 'Language Learning',
    score: 87,
    revenue: '$95M',
    users: '85M users',
    competition: 'Medium',
    opportunity: 'Professional English learning gap beyond Duolingo'
  },
  {
    rank: 5,
    country: 'Thailand',
    flag: '🇹🇭',
    category: 'Food Delivery',
    score: 85,
    revenue: '$78M',
    users: '35M users',
    competition: 'Medium',
    opportunity: 'Local cuisine preferences not well served'
  },
  {
    rank: 6,
    country: 'South Africa',
    flag: '🇿🇦',
    category: 'Fintech',
    score: 83,
    revenue: '$65M',
    users: '28M users',
    competition: 'Low',
    opportunity: 'Mobile-first financial services for emerging market'
  },
  {
    rank: 7,
    country: 'Egypt',
    flag: '🇪🇬',
    category: 'Education',
    score: 81,
    revenue: '$89M',
    users: '45M users',
    competition: 'Low',
    opportunity: 'Arabic educational content severely underserved'
  },
  {
    rank: 8,
    country: 'Vietnam',
    flag: '🇻🇳',
    category: 'E-commerce',
    score: 79,
    revenue: '$156M',
    users: '62M users',
    competition: 'Medium',
    opportunity: 'Growing middle class drives online shopping'
  }
];

const quickIntelligence = [
  {
    country: 'India',
    flag: '🇮🇳',
    category: 'Personal Finance Apps',
    description: 'Opportunity: 280M digital payment users but only 12 major personal finance apps. Most focus on payments, not budgeting/investment. Gap in AI-powered financial advice and automated savings.',
    actions: ['📊 Full Analysis', '💡 Entry Strategy']
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    category: 'B2B Productivity Apps',
    description: 'Opportunity: 12M business users with high privacy standards. GDPR-compliant productivity tools missing. Most solutions are US-based, creating trust gap.',
    actions: ['📊 Full Analysis', '💡 Entry Strategy']
  },
  {
    country: 'Mexico',
    flag: '🇲🇽',
    category: 'Language Learning Apps',
    description: 'Opportunity: 85M Spanish speakers wanting English, but Duolingo dominates. Gap in professional/business English and AI conversation practice.',
    actions: ['📊 Full Analysis', '💡 Entry Strategy']
  }
];

const regionalTrends = [
  {
    region: 'AMERICAS',
    emoji: '🌎',
    trends: [
      'LATAM: Health/Wellness apps growing +67% annually',
      'Brazil: AI features highly desired but underserved',
      'Mexico: B2B productivity market emerging'
    ]
  },
  {
    region: 'EUROPE',
    emoji: '🌍',
    trends: [
      'Germany: Privacy-first apps premium opportunity',
      'France: Local content regulation creates barriers',
      'Eastern Europe: Fintech expansion accelerating'
    ]
  },
  {
    region: 'ASIA-PACIFIC',
    emoji: '🌏',
    trends: [
      'India: Digital payment revolution creates fintech gaps',
      'Southeast Asia: E-commerce tools fragmented',
      'Japan: Aging population needs accessibility apps'
    ]
  }
];

export function MarketDiscovery({ onBack, onMarketSelect }: MarketDiscoveryProps) {
  const [filters, setFilters] = useState({
    category: 'health',
    userBase: '10m',
    competition: 'low-medium',
    revenue: '50m',
    maturity: 'emerging',
    language: 'any'
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleDiscover = () => {
    // Simulate discovery process
    console.log('Discovering markets with filters:', filters);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Markets Hub
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Globe className="w-4 h-4 mr-2" />
            🌍 Global View
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            🔍 Advanced Filters
          </Button>
        </div>
      </div>

      {/* Page Title */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🌍 Untapped Market Discovery Engine</CardTitle>
          <p className="text-muted-foreground">
            AI-powered market opportunity discovery with advanced filtering and competitive intelligence
          </p>
        </CardHeader>
      </Card>

      {/* Market Discovery Filters */}
      <Card>
        <CardHeader>
          <CardTitle>🔍 Market Discovery Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health">Health & Fitness</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="userBase">User Base Size</Label>
              <Select value={filters.userBase} onValueChange={(value) => setFilters({...filters, userBase: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1M+</SelectItem>
                  <SelectItem value="10m">10M+</SelectItem>
                  <SelectItem value="50m">50M+</SelectItem>
                  <SelectItem value="100m">100M+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="competition">Competition Level</Label>
              <Select value={filters.competition} onValueChange={(value) => setFilters({...filters, competition: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="low-medium">Low to Medium</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="revenue">Revenue Potential</Label>
              <Select value={filters.revenue} onValueChange={(value) => setFilters({...filters, revenue: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10m">$10M+</SelectItem>
                  <SelectItem value="50m">$50M+</SelectItem>
                  <SelectItem value="100m">$100M+</SelectItem>
                  <SelectItem value="500m">$500M+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="maturity">Market Maturity</Label>
              <Select value={filters.maturity} onValueChange={(value) => setFilters({...filters, maturity: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emerging">Emerging</SelectItem>
                  <SelectItem value="growing">Growing</SelectItem>
                  <SelectItem value="mature">Mature</SelectItem>
                  <SelectItem value="declining">Declining</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={filters.language} onValueChange={(value) => setFilters({...filters, language: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="portuguese">Portuguese</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleDiscover} className="w-full">
            <Search className="w-4 h-4 mr-2" />
            🔍 Discover Opportunities
          </Button>
        </CardContent>
      </Card>

      {/* Discovered Market Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Discovered Market Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Rank</th>
                  <th className="text-left p-3">Country/Region</th>
                  <th className="text-left p-3">Category</th>
                  <th className="text-center p-3">Score</th>
                  <th className="text-center p-3">Revenue</th>
                  <th className="text-center p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {discoveredMarkets.map((market, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">#{market.rank}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{market.flag}</span>
                        <span className="font-medium">{market.country}</span>
                      </div>
                    </td>
                    <td className="p-3">{market.category}</td>
                    <td className="text-center p-3">
                      <Badge className={getScoreColor(market.score)}>
                        {market.score}/100
                      </Badge>
                    </td>
                    <td className="text-center p-3 font-medium">{market.revenue}</td>
                    <td className="text-center p-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onMarketSelect(market)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Market Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 Quick Market Intelligence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quickIntelligence.map((market, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{market.flag}</span>
                  <h4 className="font-semibold">{market.country} - {market.category}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{market.description}</p>
                <div className="flex gap-2">
                  {market.actions.map((action, idx) => (
                    <Button key={idx} variant="outline" size="sm">
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Trends by Region */}
      <Card>
        <CardHeader>
          <CardTitle>📈 Market Trends by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regionalTrends.map((region, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{region.emoji}</span>
                  <h4 className="font-semibold">{region.region}:</h4>
                </div>
                <ul className="space-y-2 text-sm">
                  {region.trends.map((trend, idx) => (
                    <li key={idx} className="text-muted-foreground">• {trend}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <Globe className="w-4 h-4 mr-2" />
              🌍 Detailed Market Reports
            </Button>
            <Button variant="outline">
              <Lightbulb className="w-4 h-4 mr-2" />
              💡 Entry Strategy Generator
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              📊 Competition Analysis
            </Button>
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              🎯 User Research Insights
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}