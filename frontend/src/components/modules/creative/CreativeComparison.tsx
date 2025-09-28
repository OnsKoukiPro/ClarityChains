import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { 
  ArrowLeft, 
  BarChart3, 
  Palette,
  TrendingUp,
  DollarSign,
  Users,
  Star,
  Download
} from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface CreativeComparisonProps {
  apps: any[];
  onBack: () => void;
  onAppSelect: (app: any) => void;
}

const defaultApps = [
  {
    id: 1,
    name: 'Calm',
    category: 'Meditation',
    rating: 4.8,
    revenue: '$70M',
    conversionRate: 12.4,
    sessionLength: '18min',
    subscriptionRate: 8.9,
    visualStyle: 'Professional',
    primaryColor: '#2D5AA0',
    colorScheme: ['#2D5AA0', '#F8F9FA', '#52C41A'],
    uiScore: 87,
    colorHarmony: 94
  },
  {
    id: 2,
    name: 'Headspace',
    category: 'Meditation',
    rating: 4.6,
    revenue: '$50M',
    conversionRate: 9.8,
    sessionLength: '14min',
    subscriptionRate: 6.7,
    visualStyle: 'Playful',
    primaryColor: '#FF9600',
    colorScheme: ['#FF9600', '#1CB0F6', '#FFFFFF'],
    uiScore: 82,
    colorHarmony: 86
  },
  {
    id: 3,
    name: 'Insight Timer',
    category: 'Meditation',
    rating: 4.5,
    revenue: '$15M',
    conversionRate: 7.2,
    sessionLength: '22min',
    subscriptionRate: 4.2,
    visualStyle: 'Spiritual',
    primaryColor: '#6B46C1',
    colorScheme: ['#6B46C1', '#1F2937', '#8B5CF6'],
    uiScore: 78,
    colorHarmony: 81
  },
  {
    id: 4,
    name: 'Ten Percent Happier',
    category: 'Meditation',
    rating: 4.4,
    revenue: '$8M',
    conversionRate: 6.1,
    sessionLength: '11min',
    subscriptionRate: 5.1,
    visualStyle: 'Minimal',
    primaryColor: '#2563EB',
    colorScheme: ['#2563EB', '#FFFFFF', '#1F2937'],
    uiScore: 74,
    colorHarmony: 79
  }
];

const performanceMetrics = [
  { key: 'conversionRate', label: 'App Store CVR', format: (val: number) => `${val}%` },
  { key: 'sessionLength', label: 'Session Length', format: (val: string) => val },
  { key: 'subscriptionRate', label: 'Subscription Rate', format: (val: number) => `${val}%` },
  { key: 'rating', label: 'User Rating', format: (val: number) => `${val}⭐` }
];

export function CreativeComparison({ apps, onBack, onAppSelect }: CreativeComparisonProps) {
  const comparisonApps = apps.length > 0 ? apps : defaultApps;

  const getBestPerformer = (metric: string) => {
    return comparisonApps.reduce((best, app) => {
      const currentValue = typeof app[metric] === 'string' ? 
        parseFloat(app[metric].replace(/[^\d.]/g, '')) : app[metric];
      const bestValue = typeof best[metric] === 'string' ? 
        parseFloat(best[metric].replace(/[^\d.]/g, '')) : best[metric];
      return currentValue > bestValue ? app : best;
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Creative Hub
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Palette className="w-4 h-4 mr-2" />
            🎨 Style Recommendations
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            📤 Export Comparison
          </Button>
        </div>
      </div>

      {/* Comparison Title */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            🎨 Visual Style Comparison: Meditation Apps
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Apps Comparison Grid */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {comparisonApps.slice(0, 4).map((app) => (
              <div key={app.id} className="space-y-4">
                {/* App Header */}
                <div className="text-center">
                  <h3 className="font-semibold">{app.name}</h3>
                  <p className="text-sm text-muted-foreground">{app.category}</p>
                </div>

                {/* Screenshot Placeholder */}
                <div 
                  className="aspect-[9/16] rounded-lg border border-border flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => onAppSelect(app)}
                >
                  <div className="text-center p-4">
                    <div className="w-12 h-12 rounded-lg mx-auto mb-2 flex items-center justify-center text-white text-xl"
                         style={{ backgroundColor: app.primaryColor }}>
                      📱
                    </div>
                    <p className="text-xs text-muted-foreground">Tap to analyze</p>
                  </div>
                </div>

                {/* Visual Style & Rating */}
                <div className="text-center space-y-2">
                  <Badge variant="outline">🎨 {app.visualStyle}</Badge>
                  <p className="text-sm">⭐ {app.rating} • {app.revenue} revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Strategy Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>🌈 Color Strategy Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {comparisonApps.slice(0, 4).map((app) => (
              <div key={app.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                <div className="w-24 font-medium">{app.name}:</div>
                <div className="flex items-center gap-2 flex-1">
                  {app.colorScheme.map((color: string, index: number) => (
                    <div 
                      key={index}
                      className="w-8 h-8 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                      title={color}
                    ></div>
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {app.visualStyle} {app.primaryColor.includes('#FF') ? 'orange' : 
                     app.primaryColor.includes('#2D5') ? 'blues' : 
                     app.primaryColor.includes('#6B4') ? 'purple' : 'blue'} + 
                    {app.visualStyle === 'Professional' ? ' white space' :
                     app.visualStyle === 'Playful' ? ' blue mix' :
                     app.visualStyle === 'Spiritual' ? ' earth tones' : ' monochrome'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Metric</th>
                  {comparisonApps.slice(0, 4).map((app) => (
                    <th key={app.id} className="text-center p-2 font-medium">{app.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {performanceMetrics.map((metric) => (
                  <tr key={metric.key} className="border-b">
                    <td className="p-2 font-medium">{metric.label}</td>
                    {comparisonApps.slice(0, 4).map((app) => {
                      const isTop = getBestPerformer(metric.key).id === app.id;
                      return (
                        <td key={app.id} className={`text-center p-2 ${isTop ? 'font-semibold text-green-600' : ''}`}>
                          {metric.format(app[metric.key as keyof typeof app] as any)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle>🤖 AI Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">🏆 Winner: Calm's professional blue strategy performs best</h4>
            <div className="space-y-2 text-sm text-green-800">
              <p>• Highest conversion and subscription rates across all metrics</p>
              <p>• Color psychology: Blue = trust + calm resonates with meditation users</p>
              <p>• Clean design reduces cognitive load during mindfulness sessions</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Key Insight: Trust colors outperform playful designs</h4>
            <p className="text-sm text-blue-800">
              Meditation apps benefit from trust colors rather than playful designs. Users prefer calm, 
              professional aesthetics when paying for wellness content. Blue schemes show 23% higher 
              conversion rates vs orange/playful color strategies.
            </p>
          </div>

          <div className="flex items-center justify-center pt-4">
            <Button variant="outline" className="w-full max-w-md">
              <BarChart3 className="w-4 h-4 mr-2" />
              Full Detailed Report →
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Design Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold mb-2">🎨 Color Strategy</h4>
              <p className="text-sm text-muted-foreground">
                Use trust-building blues as primary colors. Avoid overly bright or playful schemes 
                for premium wellness positioning.
              </p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold mb-2">📱 UI Approach</h4>
              <p className="text-sm text-muted-foreground">
                Focus on clean layouts with generous white space. Minimize visual clutter 
                to support meditation and focus.
              </p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold mb-2">💰 Monetization</h4>
              <p className="text-sm text-muted-foreground">
                Professional visual design correlates with higher subscription rates. 
                Invest in visual polish for better conversion.
              </p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold mb-2">🎯 Differentiation</h4>
              <p className="text-sm text-muted-foreground">
                Consider unique but calming color combinations to stand out while 
                maintaining trust and professionalism.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="outline">
              <Palette className="w-4 h-4 mr-2" />
              🎨 Style Recommendations
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              📊 Detailed Analysis
            </Button>
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              💡 Design Ideas
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              📤 Export Comparison
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}