import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { 
  ArrowLeft, 
  DollarSign, 
  TrendingUp,
  Target,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  X,
  Crown,
  Gift
} from 'lucide-react';

interface PaywallComparisonProps {
  onBack: () => void;
}

const comparisonApps = [
  {
    name: 'Calm',
    category: 'Health & Fitness',
    model: 'Freemium',
    yearlyPrice: '$69.99',
    monthlyPrice: '$12.99',
    trialPeriod: '7 days',
    conversionRate: 12.4,
    features: {
      lifetimeOption: false,
      familyPlan: true,
      studentDiscount: true,
      freeTrial: '7d',
      multipleTiers: false,
      socialProof: true,
      limitedOffers: true,
      retentionFlow: false
    },
    screenshot: '📱 Calm Paywall'
  },
  {
    name: 'Headspace',
    category: 'Health & Fitness',
    model: 'Freemium',
    yearlyPrice: '$94.99',
    monthlyPrice: '$15.99',
    trialPeriod: '14 days',
    conversionRate: 9.8,
    features: {
      lifetimeOption: false,
      familyPlan: true,
      studentDiscount: true,
      freeTrial: '14d',
      multipleTiers: false,
      socialProof: true,
      limitedOffers: false,
      retentionFlow: true
    },
    screenshot: '📱 Headspace Paywall'
  },
  {
    name: 'MyFitnessPal',
    category: 'Health & Fitness',
    model: 'Freemium+',
    yearlyPrice: '$79.99',
    monthlyPrice: '$11.99',
    trialPeriod: '30 days',
    conversionRate: 15.2,
    features: {
      lifetimeOption: true,
      familyPlan: true,
      studentDiscount: false,
      freeTrial: '30d',
      multipleTiers: true,
      socialProof: true,
      limitedOffers: true,
      retentionFlow: true
    },
    screenshot: '📱 MyFitnessPal Paywall'
  },
  {
    name: 'Strava',
    category: 'Health & Fitness',
    model: 'Freemium',
    yearlyPrice: '$59.99',
    monthlyPrice: '$7.99',
    trialPeriod: '7 days',
    conversionRate: 8.1,
    features: {
      lifetimeOption: false,
      familyPlan: true,
      studentDiscount: true,
      freeTrial: '7d',
      multipleTiers: true,
      socialProof: true,
      limitedOffers: false,
      retentionFlow: true
    },
    screenshot: '📱 Strava Paywall'
  }
];

const featuresList = [
  { key: 'lifetimeOption', label: 'Lifetime Option', icon: '♾️' },
  { key: 'familyPlan', label: 'Family Plan', icon: '👨‍👩‍👧‍👦' },
  { key: 'studentDiscount', label: 'Student Discount', icon: '🎓' },
  { key: 'multipleTiers', label: 'Multiple Tiers', icon: '📊' },
  { key: 'socialProof', label: 'Social Proof', icon: '👥' },
  { key: 'limitedOffers', label: 'Limited Offers', icon: '⏰' },
  { key: 'retentionFlow', label: 'Retention Flow', icon: '🔄' }
];

const strategyInsights = [
  {
    title: 'HIGHEST CONVERSION: MyFitnessPal (15.2%)',
    factors: [
      'Longer trial period builds habit (30 days)',
      'Multiple pricing tiers capture different segments',
      'Lifetime option appeals to committed users'
    ],
    type: 'success'
  },
  {
    title: 'REVENUE LEADER: Headspace ($94.99 price point)',
    factors: [
      'Premium positioning with higher prices',
      'Strong brand recognition supports pricing power',
      'Corporate B2B subscriptions supplement consumer'
    ],
    type: 'revenue'
  },
  {
    title: 'BALANCED APPROACH: Calm (best overall performance)',
    factors: [
      'Competitive pricing with good conversion',
      'Strong onboarding drives trial starts',
      'Excellent retention rates (89% monthly)'
    ],
    type: 'balanced'
  }
];

const aiRecommendations = [
  'Proven Patterns',
  [
    '7-14 day trials perform best (not 30+ days)',
    'Annual pricing with 40-50% discount from monthly',
    'Social proof crucial for trust in wellness space',
    'Family plans essential for user acquisition'
  ]
];

const emergingTrends = [
  'Emerging Trends',
  [
    'Lifetime options gaining popularity (+67% interest)',
    'Corporate wellness partnerships growing',
    'Graduated pricing tiers increase ARPU',
    'Retention flows can recover 15-25% of churning users'
  ]
];

export function PaywallComparison({ onBack }: PaywallComparisonProps) {
  const [selectedCategory, setSelectedCategory] = useState('health');

  const getConversionColor = (rate: number) => {
    if (rate >= 12) return 'text-green-600';
    if (rate >= 9) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getFeatureIcon = (hasFeature: boolean) => {
    return hasFeature ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <X className="w-4 h-4 text-red-500" />
    );
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'revenue': return 'text-blue-600 bg-blue-50';
      case 'balanced': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Paywall Hub
        </Button>
        <div className="flex items-center gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="health">Health & Fitness</SelectItem>
              <SelectItem value="productivity">Productivity</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            📊 Download Comparison
          </Button>
        </div>
      </div>

      {/* Page Title */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">💰 Monetization Model Comparison: Health & Fitness</CardTitle>
          <p className="text-muted-foreground">
            Side-by-side analysis of leading apps' paywall strategies and conversion performance
          </p>
        </CardHeader>
      </Card>

      {/* App Comparison Grid */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Strategy Overview Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {comparisonApps.map((app, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h4 className="font-semibold mb-1">{app.name}</h4>
                  <p className="text-sm text-muted-foreground">{app.category}</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Model:</span>
                    <Badge variant="outline" className="text-purple-600">{app.model}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Yearly:</span>
                    <span className="font-medium">{app.yearlyPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly:</span>
                    <span className="font-medium">{app.monthlyPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trial:</span>
                    <span className="font-medium">{app.trialPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CVR:</span>
                    <span className={`font-medium ${getConversionColor(app.conversionRate)}`}>
                      {app.conversionRate}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strategy Element Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Strategy Element Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Feature</th>
                  {comparisonApps.map((app, index) => (
                    <th key={index} className="text-center p-3 font-medium">{app.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featuresList.map((feature, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">
                      {feature.icon} {feature.label}
                    </td>
                    {comparisonApps.map((app, appIndex) => (
                      <td key={appIndex} className="text-center p-3">
                        {feature.key === 'freeTrial' ? (
                          <span className="text-sm font-medium">{app.features.freeTrial}</span>
                        ) : (
                          getFeatureIcon(app.features[feature.key as keyof typeof app.features] as boolean)
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3 font-medium">⭐ Conversion Rate</td>
                  {comparisonApps.map((app, appIndex) => (
                    <td key={appIndex} className="text-center p-3">
                      <Badge className={getConversionColor(app.conversionRate).includes('green') ? 'text-green-600 bg-green-50' : 
                                      getConversionColor(app.conversionRate).includes('yellow') ? 'text-yellow-600 bg-yellow-50' : 
                                      'text-red-600 bg-red-50'}>
                        {app.conversionRate}%
                      </Badge>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Key Strategy Insights */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Key Strategy Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {strategyInsights.map((insight, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={getBadgeColor(insight.type)}>
                    🏆 {insight.title}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium">Success Factors:</h5>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {insight.factors.map((factor, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mt-2"></span>
                        <span>• {factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Paywall Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>🤖 AI Paywall Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-4">FOR MEDITATION/WELLNESS APPS:</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-green-800 mb-2">✅ PROVEN PATTERNS:</h5>
                  <ul className="text-sm text-blue-700 ml-4 space-y-1">
                    <li>• 7-14 day trials perform best (not 30+ days)</li>
                    <li>• Annual pricing with 40-50% discount from monthly</li>
                    <li>• Social proof crucial for trust in wellness space</li>
                    <li>• Family plans essential for user acquisition</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-orange-800 mb-2">🔥 EMERGING TRENDS:</h5>
                  <ul className="text-sm text-blue-700 ml-4 space-y-1">
                    <li>• Lifetime options gaining popularity (+67% interest)</li>
                    <li>• Corporate wellness partnerships growing</li>
                    <li>• Graduated pricing tiers increase ARPU</li>
                    <li>• Retention flows can recover 15-25% of churning users</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-purple-800 mb-2">💰 OPTIMAL PRICING STRATEGY:</h5>
                  <div className="text-sm text-blue-700 ml-4 space-y-1">
                    <p>Basic: $4.99/mo, Premium: $9.99/mo, Pro: $14.99/mo</p>
                    <p>Annual: 45% discount, Lifetime: $199-299</p>
                    <p>Trial: 7 days (optimal conversion window)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <Button>
              <DollarSign className="w-4 h-4 mr-2" />
              💰 Generate Pricing Strategy
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              📊 Download Comparison
            </Button>
            <Button variant="outline">
              <Target className="w-4 h-4 mr-2" />
              🎯 A/B Test Framework
            </Button>
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              💡 Custom Recommendations
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}