import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { 
  ArrowLeft, 
  Download, 
  Calendar,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Smile,
  Meh,
  Frown
} from 'lucide-react';

interface ReviewsSentimentProps {
  app: any;
  onBack: () => void;
}

const sentimentEvents = [
  {
    date: 'November 15, 2024',
    type: 'negative',
    change: '-12%',
    event: 'Major mobile app update with bugs',
    impact: '1,234 negative reviews about crashes',
    recovery: '3 weeks with hotfix releases'
  },
  {
    date: 'January 8, 2025',
    type: 'positive',
    change: '+18%',
    event: 'AI features beta launch',
    impact: '2,567 positive reviews about innovation',
    recovery: 'High sentiment maintained for 6 weeks'
  },
  {
    date: 'March 3, 2025',
    type: 'neutral',
    change: '0%',
    event: 'Pricing model changes announced',
    impact: 'Mixed reactions, neutral trend',
    recovery: 'Monitoring pricing feedback closely'
  }
];

const versionReleases = [
  { version: 'v2.18', date: 'Oct 12, 2024', sentiment: '+8%', rating: '4.1 → 4.2', type: 'positive' },
  { version: 'v2.19', date: 'Nov 15, 2024', sentiment: '-12%', rating: '4.2 → 3.9', type: 'negative' },
  { version: 'v2.20', date: 'Dec 3, 2024', sentiment: '+15%', rating: '3.9 → 4.1', type: 'positive' },
  { version: 'v2.21', date: 'Jan 8, 2025', sentiment: '+18%', rating: '4.1 → 4.3', type: 'positive' },
  { version: 'v2.22', date: 'Feb 14, 2025', sentiment: '+5%', rating: '4.3 → 4.4', type: 'positive' },
  { version: 'v2.23', date: 'Mar 20, 2025', sentiment: '-2%', rating: '4.4 → 4.3', type: 'neutral' }
];

const sentimentDrivers = {
  positive: [
    { driver: 'New feature announcements', impact: '+25%' },
    { driver: 'Performance improvements', impact: '+18%' },
    { driver: 'UI/UX enhancements', impact: '+15%' },
    { driver: 'Customer support interactions', impact: '+12%' }
  ],
  negative: [
    { driver: 'App crashes and bugs', impact: '-35%' },
    { driver: 'Feature removals or changes', impact: '-28%' },
    { driver: 'Pricing increases', impact: '-22%' },
    { driver: 'Slow response to user feedback', impact: '-15%' }
  ]
};

const recoveryPatterns = [
  { issue: 'Bug fixes', recovery: '2-3 weeks recovery time' },
  { issue: 'Feature rollbacks', recovery: '4-6 weeks recovery time' },
  { issue: 'Pricing issues', recovery: '6-8 weeks recovery time' },
  { issue: 'Communication gaps', recovery: '8-12 weeks recovery time' }
];

export function ReviewsSentiment({ app, onBack }: ReviewsSentimentProps) {
  const [timeRange, setTimeRange] = useState('6months');
  const [granularity, setGranularity] = useState('weekly');

  // Default app data if none provided
  const appData = app || {
    name: 'Notion',
    category: 'Productivity'
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'positive': return <Smile className="w-5 h-5 text-green-500" />;
      case 'negative': return <Frown className="w-5 h-5 text-red-500" />;
      case 'neutral': return <Meh className="w-5 h-5 text-yellow-500" />;
      default: return null;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'negative': return 'text-red-600 bg-red-50';
      case 'neutral': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    if (sentiment.startsWith('+')) return 'text-green-600 bg-green-50';
    if (sentiment.startsWith('-')) return 'text-red-600 bg-red-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Review Analysis
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <AlertTriangle className="w-4 h-4 mr-2" />
            ⚠️ Set Sentiment Alerts
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            📊 Export Timeline Data
          </Button>
        </div>
      </div>

      {/* Page Title */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">📈 Review Sentiment Timeline - {appData.name}</CardTitle>
          <p className="text-muted-foreground">
            Temporal sentiment analysis with event correlation and recovery patterns
          </p>
        </CardHeader>
      </Card>

      {/* Time Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">⏱️ Time Period:</span>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                  <SelectItem value="2years">Last 2 Years</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">📊 Granularity:</span>
              <Select value={granularity} onValueChange={setGranularity}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sentiment Chart */}
          <Card>
            <CardHeader>
              <CardTitle>😊😐😞 Sentiment Trend Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    📊 Interactive Multi-Line Chart
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Showing positive, neutral, and negative sentiment trends over time
                  </p>
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>😊 Positive</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>😐 Neutral</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>😞 Negative</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Sentiment Events */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 Key Sentiment Events & Triggers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sentimentEvents.map((event, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      {getEventIcon(event.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">📅 {event.date}:</span>
                          <Badge className={getEventColor(event.type)}>
                            {event.type === 'positive' ? '😊' : event.type === 'negative' ? '😞' : '😐'} 
                            Sentiment {event.type === 'neutral' ? 'Plateau' : event.type === 'positive' ? 'Spike' : 'Dip'} ({event.change})
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Event:</span>
                            <span className="text-muted-foreground ml-2">{event.event}</span>
                          </div>
                          <div>
                            <span className="font-medium">Impact:</span>
                            <span className="text-muted-foreground ml-2">{event.impact}</span>
                          </div>
                          <div>
                            <span className="font-medium">
                              {event.type === 'negative' ? 'Recovery:' : event.type === 'positive' ? 'Sustained:' : 'Ongoing:'}
                            </span>
                            <span className="text-muted-foreground ml-2">{event.recovery}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Version Release Impact */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Version Release Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Version</th>
                      <th className="text-left p-2">Release Date</th>
                      <th className="text-center p-2">Sentiment Impact</th>
                      <th className="text-center p-2">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {versionReleases.map((release, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{release.version}</td>
                        <td className="p-2">{release.date}</td>
                        <td className="p-2 text-center">
                          <Badge className={getSentimentColor(release.sentiment)}>
                            {release.type === 'positive' ? '😊' : release.type === 'negative' ? '😞' : '😐'} {release.sentiment}
                          </Badge>
                        </td>
                        <td className="p-2 text-center">{release.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  🎯 <strong>Pattern:</strong> Major features boost sentiment significantly. 
                  Bug-heavy releases cause lasting damage (3+ weeks).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sentiment Drivers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🔍 Sentiment Drivers Deep Dive</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h5 className="font-medium text-green-700 mb-2">📈 POSITIVE SENTIMENT DRIVERS:</h5>
                <div className="space-y-2">
                  {sentimentDrivers.positive.map((driver, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex justify-between">
                        <span>{index + 1}. {driver.driver}</span>
                        <Badge className="text-green-600 bg-green-50 text-xs">
                          {driver.impact}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium text-red-700 mb-2">📉 NEGATIVE SENTIMENT DRIVERS:</h5>
                <div className="space-y-2">
                  {sentimentDrivers.negative.map((driver, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex justify-between">
                        <span>{index + 1}. {driver.driver}</span>
                        <Badge className="text-red-600 bg-red-50 text-xs">
                          {driver.impact}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recovery Patterns */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🎯 Sentiment Recovery Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recoveryPatterns.map((pattern, index) => (
                  <div key={index} className="text-sm">
                    <div className="font-medium text-blue-700">• {pattern.issue}:</div>
                    <div className="text-muted-foreground ml-2">{pattern.recovery}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Sentiment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📊 Current Sentiment</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                73%
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Positive sentiment
              </p>
              <Badge className="text-green-600 bg-green-50">
                ↗️ +5% this month
              </Badge>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">⚡ Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                🔍 Detailed Event Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                💡 Predictive Insights
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                ⚠️ Set Alerts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}