import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { 
  ArrowLeft, 
  Save, 
  Share, 
  Globe, 
  TrendingUp,
  Target,
  BarChart3,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Map,
  Flag
} from 'lucide-react';

interface MarketDetailProps {
  market: any;
  onBack: () => void;
}

const marketSizeData = [
  { metric: 'Total Users', value: '45M potential', description: 'meditation app users' },
  { metric: 'Smartphone Penetration', value: '89%', description: 'high mobile adoption' },
  { metric: 'App Spending per User', value: '$12.40/year', description: 'average annual spend' },
  { metric: 'Growth Rate', value: '+67% annual', description: 'category expansion' }
];

const competitors = [
  {
    name: 'Zen App (Local)',
    marketShare: 28,
    strengths: ['Local language support', 'Cultural adaptation', 'Lower pricing'],
    weaknesses: ['Limited AI features', 'Basic content library', 'Poor user experience'],
    position: 'Market Leader'
  },
  {
    name: 'Calm (US)',
    marketShare: 15,
    strengths: ['Premium content quality', 'Strong brand recognition', 'Advanced features'],
    weaknesses: ['No Portuguese localization', 'High pricing', 'Cultural disconnect'],
    position: 'International Player'
  },
  {
    name: 'Headspace (US)',
    marketShare: 12,
    strengths: ['Scientific approach', 'Good UI/UX', 'Corporate partnerships'],
    weaknesses: ['Limited local cultural adaptation', 'Premium pricing', 'English-only'],
    position: 'International Player'
  }
];

const entryStrategies = [
  {
    strategy: 'Localization-First Approach',
    priority: 'RECOMMENDED',
    timeline: '6-9 months',
    investment: '$150K-300K',
    description: 'Full Portuguese localization with cultural adaptation',
    advantages: [
      'Immediate competitive advantage over international apps',
      'Better user engagement through cultural relevance',
      'Lower customer acquisition costs'
    ],
    challenges: [
      'Requires deep cultural understanding',
      'Need local content creators',
      'Ongoing localization maintenance'
    ],
    successProbability: 85
  },
  {
    strategy: 'Partnership Strategy',
    priority: 'ALTERNATIVE',
    timeline: '3-6 months',
    investment: '$75K-150K',
    description: 'Partner with local wellness brands and influencers',
    advantages: [
      'Faster market entry',
      'Established trust and credibility',
      'Local market knowledge'
    ],
    challenges: [
      'Dependency on partner performance',
      'Revenue sharing requirements',
      'Limited control over brand positioning'
    ],
    successProbability: 70
  },
  {
    strategy: 'Freemium + Premium Strategy',
    priority: 'AGGRESSIVE',
    timeline: '4-8 months',
    investment: '$200K-500K',
    description: 'Launch with generous free tier to build user base',
    advantages: [
      'Rapid user acquisition',
      'Market share capture',
      'Data collection for optimization'
    ],
    challenges: [
      'High initial costs',
      'Conversion rate uncertainty',
      'Pressure on unit economics'
    ],
    successProbability: 60
  }
];

const marketBarriers = [
  {
    barrier: 'Language Localization',
    severity: 'High',
    impact: 'User adoption severely limited without Portuguese',
    solution: 'Full localization including voice content and cultural adaptation'
  },
  {
    barrier: 'Payment Infrastructure',
    severity: 'Medium',
    impact: 'Brazilian payment preferences (PIX, Boleto) not supported',
    solution: 'Integrate local payment methods and pricing in BRL'
  },
  {
    barrier: 'Cultural Adaptation',
    severity: 'Medium',
    impact: 'Western meditation approaches may not resonate',
    solution: 'Research local wellness practices and incorporate them'
  },
  {
    barrier: 'Marketing Channels',
    severity: 'Low',
    impact: 'Limited knowledge of effective local marketing channels',
    solution: 'Partner with local marketing agencies and influencers'
  }
];

export function MarketDetail({ market, onBack }: MarketDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Default market data if none provided
  const marketData = market || {
    country: 'Brazil',
    flag: '🇧🇷',
    category: 'AI Meditation Apps',
    opportunityScore: 94,
    totalUsers: '45M potential meditation users',
    smartphonePenetration: '89%',
    appSpending: '$12.40/year',
    growthRate: '+67% annual',
    revenue: '$180M',
    marketGap: '45% market share uncaptured',
    aiMeditationServed: 'completely underserved'
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 75) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'RECOMMENDED': return 'bg-green-50 text-green-600';
      case 'ALTERNATIVE': return 'bg-blue-50 text-blue-600';
      case 'AGGRESSIVE': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
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
            <Target className="w-4 h-4 mr-2" />
            💡 Entry Strategy Plan
          </Button>
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            📊 Export Analysis
          </Button>
        </div>
      </div>

      {/* Market Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <span className="text-4xl">{marketData.flag}</span>
              </div>
              <div>
                <CardTitle className="text-2xl mb-1">
                  {marketData.country} - {marketData.category} Market Analysis
                </CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <span>Global Market Opportunity</span>
                  <span>•</span>
                  <span>Revenue Potential: {marketData.revenue}</span>
                </div>
                <Badge className={getScoreColor(marketData.opportunityScore)}>
                  Market Opportunity Score: {marketData.opportunityScore}/100 (Excellent)
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Market Size & Demographics */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Market Size & Demographics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {marketSizeData.map((item, index) => (
              <div key={index} className="text-center">
                <p className="text-sm text-muted-foreground mb-2">{item.metric}</p>
                <p className="text-2xl font-semibold mb-2">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Competition</TabsTrigger>
          <TabsTrigger value="opportunity">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="strategy">Entry Strategies</TabsTrigger>
          <TabsTrigger value="barriers">Market Barriers</TabsTrigger>
          <TabsTrigger value="behavior">User Behavior</TabsTrigger>
          <TabsTrigger value="risks">Entry Risks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Competition Landscape */}
          <Card>
            <CardHeader>
              <CardTitle>🏆 Competition Landscape</CardTitle>
              <p className="text-muted-foreground">Current major players analysis (Only 3 significant competitors)</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {competitors.map((competitor, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{competitor.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Market Share: {competitor.marketShare}%</span>
                          <Badge variant="outline">{competitor.position}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                          <span className="font-semibold text-blue-600">{competitor.marketShare}%</span>
                        </div>
                        <Progress value={competitor.marketShare} className="w-16 h-2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-green-600 mb-2">✅ Strengths:</h5>
                        <ul className="text-sm space-y-1">
                          {competitor.strengths.map((strength, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-green-500 rounded-full mt-2"></span>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-red-600 mb-2">⚠️ Weaknesses:</h5>
                        <ul className="text-sm space-y-1">
                          {competitor.weaknesses.map((weakness, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-red-500 rounded-full mt-2"></span>
                              <span>{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-900 mb-1">🎯 Market Gap Opportunity:</h5>
                      <p className="text-sm text-blue-800 mb-2">
                        {marketData.marketGap} market share uncaptured
                      </p>
                      <p className="text-sm text-blue-800">
                        🔥 {marketData.aiMeditationServed}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunity" className="space-y-6">
          {/* Revenue Opportunity Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>💰 Revenue Opportunity Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">TOTAL ADDRESSABLE MARKET (TAM):</h4>
                    <p className="text-2xl font-semibold text-blue-700 mb-1">$558M</p>
                    <p className="text-sm text-blue-800">45M potential users × $12.40 avg spend</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">SERVICEABLE ADDRESSABLE MARKET (SAM):</h4>
                    <p className="text-2xl font-semibold text-green-700 mb-1">$270M</p>
                    <p className="text-sm text-green-800">15M active meditation seekers × $18</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">SERVICEABLE OBTAINABLE MARKET (SOM):</h4>
                    <p className="text-2xl font-semibold text-purple-700 mb-1">$21.6M</p>
                    <p className="text-sm text-purple-800">Realistic 3-year capture: 8% market share</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4">🎯 REVENUE PROJECTIONS:</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border border-border rounded-lg">
                      <h5 className="font-medium text-green-600 mb-3">Conservative Estimate (Year 1):</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Target Users:</span>
                          <span className="font-medium">200K users</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average Revenue/User:</span>
                          <span className="font-medium">$15/year</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span>Total ARR:</span>
                          <span className="font-semibold text-green-600">$3M</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-border rounded-lg">
                      <h5 className="font-medium text-blue-600 mb-3">Optimistic Scenario (Year 1):</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Target Users:</span>
                          <span className="font-medium">500K users</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average Revenue/User:</span>
                          <span className="font-medium">$18/year</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span>Total ARR:</span>
                          <span className="font-semibold text-blue-600">$9M</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <h5 className="font-medium text-green-900 mb-2">💡 Revenue Optimization Opportunities:</h5>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Lifetime pricing model appeals to 67% of Brazilian users</li>
                    <li>• Family plans can increase ARPU by 45% in Latin markets</li>
                    <li>• Portuguese content commands 25% premium over translated content</li>
                    <li>• Corporate wellness programs represent $50M additional opportunity</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          {/* Entry Strategies */}
          <Card>
            <CardHeader>
              <CardTitle>🚀 Market Entry Strategies</CardTitle>
              <p className="text-muted-foreground">
                AI-recommended approaches based on analysis of 100+ successful market entries
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {entryStrategies.map((strategy, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getPriorityColor(strategy.priority)}>
                            {strategy.priority}
                          </Badge>
                          <h4 className="font-semibold">{strategy.strategy}</h4>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Timeline:</span>
                            <p className="font-medium">{strategy.timeline}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Investment:</span>
                            <p className="font-medium">{strategy.investment}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Success Rate:</span>
                            <p className="font-medium text-green-600">{strategy.successProbability}%</p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">{strategy.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-green-600 mb-2">✅ Advantages:</h5>
                            <ul className="text-sm space-y-1">
                              {strategy.advantages.map((advantage, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 text-green-500 mt-1" />
                                  <span>{advantage}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-red-600 mb-2">⚠️ Challenges:</h5>
                            <ul className="text-sm space-y-1">
                              {strategy.challenges.map((challenge, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <AlertTriangle className="w-3 h-3 text-red-500 mt-1" />
                                  <span>{challenge}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">Success Probability:</span>
                        <Progress value={strategy.successProbability} className="flex-1 h-2" />
                        <span className="text-sm font-medium text-green-600">{strategy.successProbability}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="barriers" className="space-y-6">
          {/* Market Barriers */}
          <Card>
            <CardHeader>
              <CardTitle>🚧 Market Entry Barriers & Solutions</CardTitle>
              <p className="text-muted-foreground">
                Key challenges and recommended solutions for successful market entry
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketBarriers.map((barrier, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{barrier.barrier}</h4>
                          <Badge className={getSeverityColor(barrier.severity)}>
                            {barrier.severity} Impact
                          </Badge>
                        </div>
                        
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="font-medium text-red-600">🚨 Impact:</span>
                            <p className="text-muted-foreground ml-2">{barrier.impact}</p>
                          </div>
                          <div>
                            <span className="font-medium text-green-600">💡 Solution:</span>
                            <p className="text-green-700 ml-2">{barrier.solution}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900 mb-2">🎯 Strategic Recommendations:</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Prioritize language localization as the highest impact barrier to address</li>
                      <li>• Partner with local payment providers to reduce friction</li>
                      <li>• Invest in cultural research and local content creation</li>
                      <li>• Consider acquiring local competitors for faster market entry</li>
                      <li>• Build relationships with local wellness influencers and practitioners</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          {/* User Behavior & Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>📈 User Behavior & Preferences</CardTitle>
              <p className="text-muted-foreground">
                Market research insights about Brazilian user preferences and behaviors
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Market Research Insights */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-4">🔍 MARKET RESEARCH INSIGHTS:</h4>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between p-2 bg-white rounded">
                      <span>• 78% prefer Portuguese content over English dubbed</span>
                      <Badge className="text-green-600 bg-green-100">High Priority</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white rounded">
                      <span>• 65% want meditation sessions under 15 minutes</span>
                      <Badge className="text-blue-600 bg-blue-100">User Experience</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white rounded">
                      <span>• 82% interested in stress/anxiety focus vs general</span>
                      <Badge className="text-purple-600 bg-purple-100">Content Strategy</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white rounded">
                      <span>• 71% would pay for AI-personalized recommendations</span>
                      <Badge className="text-orange-600 bg-orange-100">AI Opportunity</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white rounded">
                      <span>• 89% want nature sounds from Brazilian environments</span>
                      <Badge className="text-green-600 bg-green-100">Localization</Badge>
                    </div>
                  </div>
                </div>

                {/* Platform Preferences */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-4">📱 PLATFORM PREFERENCES:</h4>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Android dominance:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">87% Android vs 13% iOS</span>
                        <Badge className="text-green-600 bg-green-100">Android Priority</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>WhatsApp integration:</span>
                      <Badge className="text-green-600 bg-green-100">Highly Valued</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Social sharing:</span>
                      <Badge className="text-blue-600 bg-blue-100">Important for Engagement</Badge>
                    </div>
                  </div>
                </div>

                {/* Payment Preferences */}
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-4">💳 PAYMENT PREFERENCES:</h4>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>PIX payments:</span>
                      <div className="flex items-center gap-2">
                        <Badge className="text-red-600 bg-red-100">Essential</Badge>
                        <span className="text-purple-800">(Brazilian instant payment)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Credit card installments:</span>
                      <Badge className="text-green-600 bg-green-100">Popular</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Carrier billing:</span>
                      <Badge className="text-blue-600 bg-blue-100">Mobile Users</Badge>
                    </div>
                  </div>
                </div>

                {/* Recommended Strategy */}
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-4">🎯 RECOMMENDED APPROACH:</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-green-800 mb-2">1. LOCALIZATION ADVANTAGE</h5>
                      <ul className="text-sm text-green-700 ml-4 space-y-1">
                        <li>• Full Portuguese content with Brazilian cultural references (carnival, football, local music)</li>
                        <li>• Partner with local mindfulness teachers</li>
                        <li>• Brazilian Portuguese voice guides</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-blue-800 mb-2">2. AI DIFFERENTIATION</h5>
                      <ul className="text-sm text-blue-700 ml-4 space-y-1">
                        <li>• Personalized meditation based on mood/stress</li>
                        <li>• Voice emotion analysis for session recommendations</li>
                        <li>• AI-generated nature sounds from Brazilian biomes</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-purple-800 mb-2">3. PRICING STRATEGY</h5>
                      <ul className="text-sm text-purple-700 ml-4 space-y-1">
                        <li>• Freemium model: R$ 19.90/month (vs Calm's R$ 45)</li>
                        <li>• Student discount: 50% off (huge student population)</li>
                        <li>• Family plans: R$ 29.90 for up to 6 users</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-orange-800 mb-2">4. DISTRIBUTION CHANNELS</h5>
                      <ul className="text-sm text-orange-700 ml-4 space-y-1">
                        <li>• Partnership with local wellness influencers</li>
                        <li>• Corporate wellness programs (growing trend)</li>
                        <li>• Healthcare provider partnerships</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">⏱️ TIME TO MARKET:</span>
                      <span className="text-green-600 font-medium">6-9 months for localized MVP</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="font-medium">💰 INVESTMENT NEEDED:</span>
                      <span className="text-blue-600 font-medium">$150K-300K for market entry</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          {/* Market Entry Risks & Mitigation */}
          <Card>
            <CardHeader>
              <CardTitle>⚠️ Market Entry Risks & Mitigation</CardTitle>
              <p className="text-muted-foreground">
                Key risks and strategic mitigation approaches for successful market entry
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* High Risks */}
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-4">🚨 HIGH RISKS:</h4>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg border-l-4 border-red-500">
                      <h5 className="font-medium text-red-800 mb-1">Economic volatility affecting subscription spending</h5>
                      <p className="text-sm text-red-700">Brazil's economic instability can impact discretionary spending on app subscriptions</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border-l-4 border-red-500">
                      <h5 className="font-medium text-red-800 mb-1">Incumbent players may lower prices</h5>
                      <p className="text-sm text-red-700">Existing competitors could start price wars to defend market share</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border-l-4 border-red-500">
                      <h5 className="font-medium text-red-800 mb-1">Cultural meditation practices differ from US/EU</h5>
                      <p className="text-sm text-red-700">Brazilian wellness culture may not align with Western meditation approaches</p>
                    </div>
                  </div>
                </div>

                {/* Mitigation Strategies */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-4">🛡️ MITIGATION STRATEGIES:</h4>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg border-l-4 border-green-500">
                      <h5 className="font-medium text-green-800 mb-1">Flexible pricing tiers for economic conditions</h5>
                      <p className="text-sm text-green-700">
                        • Implement dynamic pricing based on economic indicators<br/>
                        • Offer student and low-income discounts<br/>
                        • Create micro-subscription options (weekly/daily)
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border-l-4 border-green-500">
                      <h5 className="font-medium text-green-800 mb-1">Strong differentiation through AI and localization</h5>
                      <p className="text-sm text-green-700">
                        • Build unique AI features competitors can't easily copy<br/>
                        • Create deep cultural content that's hard to replicate<br/>
                        • Establish strong local partnerships and brand presence
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border-l-4 border-green-500">
                      <h5 className="font-medium text-green-800 mb-1">Deep cultural research and local partnerships</h5>
                      <p className="text-sm text-green-700">
                        • Partner with Brazilian wellness experts and practitioners<br/>
                        • Conduct extensive user research on local preferences<br/>
                        • Adapt content to Brazilian cultural context and values
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border-l-4 border-green-500">
                      <h5 className="font-medium text-green-800 mb-1">Gradual market entry starting with São Paulo/Rio</h5>
                      <p className="text-sm text-green-700">
                        • Test in major metropolitan areas first<br/>
                        • Validate product-market fit before national expansion<br/>
                        • Build local brand recognition in key markets
                      </p>
                    </div>
                  </div>
                </div>

                {/* Risk Assessment Matrix */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-4">📊 RISK ASSESSMENT MATRIX:</h4>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="p-3 bg-white rounded-lg text-center">
                        <h5 className="font-medium text-red-600 mb-1">HIGH RISK</h5>
                        <p className="text-red-700">Economic Volatility</p>
                        <p className="text-xs text-red-600">Probability: 70%</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg text-center">
                        <h5 className="font-medium text-yellow-600 mb-1">MEDIUM RISK</h5>
                        <p className="text-yellow-700">Competitive Response</p>
                        <p className="text-xs text-yellow-600">Probability: 45%</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg text-center">
                        <h5 className="font-medium text-green-600 mb-1">LOW RISK</h5>
                        <p className="text-green-700">Cultural Misalignment</p>
                        <p className="text-xs text-green-600">Probability: 25%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <Button>
              <Target className="w-4 h-4 mr-2" />
              🎯 Create Entry Plan
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              📊 Market Research
            </Button>
            <Button variant="outline">
              <Lightbulb className="w-4 h-4 mr-2" />
              💡 Localization Guide
            </Button>
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              🤝 Find Partners
            </Button>
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              📈 Track Competitors
            </Button>
            <Button variant="outline">
              <DollarSign className="w-4 h-4 mr-2" />
              💰 Investment Deck
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}