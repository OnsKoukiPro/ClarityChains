import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { 
  Globe, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Eye,
  DollarSign,
  Users,
  ChevronRight,
  Map,
  Zap,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';

interface MarketsMainProps {
  onMarketSelect: (market: any) => void;
  onDiscoverySelect?: () => void;
}

const topOpportunities = [
  {
    id: 1,
    country: 'Brazil',
    flag: '🇧🇷',
    category: 'AI Meditation Apps',
    users: '45M smartphone users',
    competition: 'Low',
    revenue: '$180M',
    competitors: 'only 3 major competitors',
    opportunity: 'high',
    insight: 'Portuguese localization gap in wellness apps',
    marketGap: '85% of top apps are US-based',
    growthRate: '+67%'
  },
  {
    id: 2,
    country: 'India',
    flag: '🇮🇳',
    category: 'Personal Finance Apps',
    users: '280M digital payment users',
    competition: 'Medium',
    revenue: '$340M',
    competitors: 'fragmented market',
    opportunity: 'high',
    insight: 'Digital payment boom creates fintech opportunity',
    marketGap: 'No major international player dominates',
    growthRate: '+89%'
  },
  {
    id: 3,
    country: 'Germany',
    flag: '🇩🇪',
    category: 'Productivity B2B Apps',
    users: '12M business users',
    competition: 'Low',
    revenue: '$220M',
    competitors: 'privacy-focused preferences',
    opportunity: 'high',
    insight: 'GDPR compliance creates trust advantage',
    marketGap: 'Privacy-first productivity tools underserved',
    growthRate: '+34%'
  },
  {
    id: 4,
    country: 'Mexico',
    flag: '🇲🇽',
    category: 'Food Delivery Apps',
    users: '35M urban users',
    competition: 'Medium',
    revenue: '$120M',
    competitors: 'growing rapidly',
    opportunity: 'medium',
    insight: 'Rising middle class drives delivery demand',
    marketGap: 'Local food preferences not well served',
    growthRate: '+78%'
  }
];

const marketInsights = [
  {
    insight: 'LATAM shows 67% growth in health app adoption but 85% of top apps are US-based. Localization gap.',
    region: 'Latin America',
    opportunity: 'Localization',
    impact: 'High'
  },
  {
    insight: 'Southeast Asia productivity market underserved: 45M business users, only 8 major local players.',
    region: 'Southeast Asia',
    opportunity: 'B2B Productivity',
    impact: 'High'
  },
  {
    insight: 'European fintech regulations create barriers but also trust advantages for compliant apps.',
    region: 'Europe',
    opportunity: 'Regulatory Advantage',
    impact: 'Medium'
  },
  {
    insight: 'African mobile-first generation skips desktop entirely, creating unique app opportunities.',
    region: 'Africa',
    opportunity: 'Mobile-First',
    impact: 'High'
  }
];

const categoryMaturity = [
  { 
    category: 'Health & Fitness', 
    mature: 'US/EU', 
    growing: 'LATAM/APAC',
    insight: 'Wellness trends spreading globally',
    growth: '+67%'
  },
  { 
    category: 'Fintech', 
    mature: 'China/US', 
    growing: 'Emerging everywhere else',
    insight: 'Digital payments revolution expanding',
    growth: '+89%'
  },
  { 
    category: 'Productivity', 
    mature: 'US', 
    growing: 'EU/APAC',
    insight: 'Remote work driving global adoption',
    growth: '+45%'
  },
  { 
    category: 'Education', 
    mature: 'US/EU', 
    growing: 'Global expansion',
    insight: 'Online learning becoming mainstream',
    growth: '+78%'
  }
];

const quickActions = [
  { title: '🌍 Discover Markets', description: 'Find untapped opportunities' },
  { title: '📊 Size Opportunity', description: 'Calculate market potential' },
  { title: '🏆 Analyze Gaps', description: 'Identify competition weaknesses' },
  { title: '💡 Entry Strategies', description: 'Plan market entry approach' },
  { title: '📈 Growth Potential', description: 'Forecast market expansion' },
  { title: '🎯 Target Users', description: 'Define audience segments' }
];

export function MarketsMain({ onMarketSelect, onDiscoverySelect }: MarketsMainProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('global');

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Markets Analyzed</p>
                <p className="text-2xl font-semibold">147 regions</p>
              </div>
              <Globe className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Opportunities</p>
                <p className="text-2xl font-semibold">89 high-value</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-semibold">23 verticals</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue Gap</p>
                <p className="text-2xl font-semibold">$2.4B total</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Market Opportunities */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  🔥 Top Market Opportunities
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="fintech">Fintech</SelectItem>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="sm">
                    View All →
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topOpportunities.map((opportunity) => (
                  <div 
                    key={opportunity.id}
                    className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={() => onMarketSelect(opportunity)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{opportunity.flag}</span>
                          <h4 className="font-semibold">{opportunity.country} - {opportunity.category}</h4>
                          <Badge className={getOpportunityColor(opportunity.opportunity)}>
                            {opportunity.opportunity === 'high' ? '🔥 High Opportunity' : '⚡ Medium Opportunity'}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">📊 Market Size:</span>
                            <p className="font-medium">{opportunity.users}, {opportunity.competitors}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">💰 Revenue Opportunity:</span>
                            <p className="font-medium text-green-600">{opportunity.revenue}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm">
                          <div>
                            <Badge className={getCompetitionColor(opportunity.competition)}>
                              Competition: {opportunity.competition}
                            </Badge>
                          </div>
                          <div>
                            <Badge variant="outline" className="text-green-600 bg-green-50">
                              Growth: {opportunity.growthRate}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-blue-600">💡 Key Insight:</span>
                            <p className="text-muted-foreground">{opportunity.insight}</p>
                          </div>
                          <div>
                            <span className="font-medium text-purple-600">🎯 Market Gap:</span>
                            <p className="text-muted-foreground">{opportunity.marketGap}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        🔍 Analyze
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        📊 Deep Dive
                      </Button>
                      <Button variant="outline" size="sm">
                        <Target className="w-4 h-4 mr-1" />
                        💡 Entry Strategy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geographic Heat Map */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  🗺️ Geographic Heat Map
                </CardTitle>
                <Button variant="ghost" size="sm">
                  Full Map →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-blue-200">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                      <Map className="w-12 h-12 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">🌍 Interactive World Map</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Visual representation of global market opportunities by region and category
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>🔥 Hot opportunities</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span>⚠️ Medium potential</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>✅ Saturated markets</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <span>❌ Low opportunity</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-4">
                      <span className="text-sm text-muted-foreground">Filter by:</span>
                      <Button variant="outline" size="sm">Category ▼</Button>
                      <Button variant="outline" size="sm">User Base ▼</Button>
                      <Button variant="outline" size="sm">Revenue ▼</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Intelligence Insights */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  🎯 Market Intelligence Insights
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketInsights.map((insight, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-blue-600 bg-blue-50">
                            {insight.region}
                          </Badge>
                          <Badge className={
                            insight.impact === 'High' ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50'
                          }>
                            {insight.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">
                          💡 "{insight.insight}"
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Opportunity Focus:</span>
                          <Badge variant="outline" className="text-xs text-purple-600">
                            {insight.opportunity}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        📊 Market Reports
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Market Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚡ Quick Market Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {quickActions.map((action, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className="h-16 flex-col gap-1"
                    onClick={action.title === '🌍 Discover Markets' ? onDiscoverySelect : undefined}
                  >
                    <span className="text-base">{action.title}</span>
                    <span className="text-xs text-muted-foreground">{action.description}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Market Research Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🌍 Market Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Search className="w-4 h-4 mr-2" />
                Market Finder
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Size Calculator
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Entry Planner
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Growth Forecaster
              </Button>
            </CardContent>
          </Card>

          {/* Category Market Maturity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📈 Category Market Maturity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryMaturity.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{item.category}:</span>
                    <Badge variant="secondary" className="text-green-600 bg-green-50">
                      {item.growth}
                    </Badge>
                  </div>
                  <div className="text-xs space-y-1">
                    <p>🌍 Mature: {item.mature}</p>
                    <p>📈 Growing: {item.growing}</p>
                    <p className="text-muted-foreground">{item.insight}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Regional Highlights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🎯 Regional Highlights</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="space-y-2">
                <div className="font-medium">🇧🇷 Brazil:</div>
                <p className="text-muted-foreground">Largest Portuguese-speaking market. Health apps underserved.</p>
              </div>
              <div className="space-y-2">
                <div className="font-medium">🇮🇳 India:</div>
                <p className="text-muted-foreground">Digital payment boom. 280M users seeking fintech solutions.</p>
              </div>
              <div className="space-y-2">
                <div className="font-medium">🇩🇪 Germany:</div>
                <p className="text-muted-foreground">Privacy-focused B2B market. GDPR compliance advantage.</p>
              </div>
              <div className="space-y-2">
                <div className="font-medium">🌍 Southeast Asia:</div>
                <p className="text-muted-foreground">Mobile-first generation. Growing middle class.</p>
              </div>
            </CardContent>
          </Card>

          {/* Market Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📊 Global Metrics</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Total Markets:</span>
                <span className="font-medium">147 regions</span>
              </div>
              <div className="flex justify-between">
                <span>High Opportunity:</span>
                <span className="font-medium text-green-600">89 markets</span>
              </div>
              <div className="flex justify-between">
                <span>Revenue Potential:</span>
                <span className="font-medium">$2.4B uncaptured</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Growth Rate:</span>
                <span className="font-medium text-green-600">+67% annually</span>
              </div>
            </CardContent>
          </Card>

          {/* Market Expansion Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">💡 Expansion Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Research local payment preferences and regulations</p>
              <p>• Invest in native language localization</p>
              <p>• Partner with local influencers and brands</p>
              <p>• Adapt pricing to local purchasing power</p>
              <p>• Study cultural nuances and user behaviors</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}