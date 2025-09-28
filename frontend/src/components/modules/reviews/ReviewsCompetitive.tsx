import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { 
  ArrowLeft, 
  Download, 
  Star,
  Trophy,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Target,
  Users,
  Smile,
  Meh,
  Frown
} from 'lucide-react';

interface ReviewsCompetitiveProps {
  onBack: () => void;
}

const competitiveComparison = [
  {
    app: 'Notion',
    rating: 4.3,
    reviews: 12847,
    sentiment: 73,
    topComplaint: 'Mobile app slow',
    position: 'current'
  },
  {
    app: 'Todoist',
    rating: 4.4,
    reviews: 8234,
    sentiment: 78,
    topComplaint: 'Limited features',
    position: 'leader'
  },
  {
    app: 'Asana',
    rating: 4.2,
    reviews: 15678,
    sentiment: 71,
    topComplaint: 'Complex UI',
    position: 'competitor'
  },
  {
    app: 'ClickUp',
    rating: 4.1,
    reviews: 6789,
    sentiment: 69,
    topComplaint: 'Too many options',
    position: 'competitor'
  },
  {
    app: 'Monday.com',
    rating: 4.0,
    reviews: 9456,
    sentiment: 66,
    topComplaint: 'Expensive pricing',
    position: 'competitor'
  }
];

const sentimentLeaderInsights = {
  leader: 'Todoist',
  percentage: 78,
  successFactors: [
    'Simple, focused feature set reduces confusion',
    'Consistent mobile/desktop experience',
    'Strong customer support responsiveness',
    'Clear value proposition for personal productivity'
  ],
  challenges: 'Monday.com',
  challengePercentage: 66,
  keyIssues: [
    'Pricing complexity confuses users',
    'Feature bloat overwhelming new users',
    'B2B focus alienates individual users',
    'Steep learning curve for basic functionality'
  ]
};

const notionPosition = {
  percentage: 73,
  advantages: [
    'Flexibility praised more than any competitor',
    'Database features unique in category',
    'Strong developer community and templates'
  ],
  weaknesses: [
    'Mobile app significantly behind competitors',
    'Complexity intimidates casual users',
    'Performance issues more common than rivals'
  ]
};

const featureGaps = [
  {
    feature: 'Smart Task Prioritization (AI-powered)',
    mentions: 2345,
    coverage: 'none',
    opportunity: 'First-mover advantage in AI features'
  },
  {
    feature: 'Voice Task Creation & Commands',
    mentions: 1789,
    coverage: 'basic support in ClickUp',
    opportunity: 'Mobile-first productivity revolution'
  },
  {
    feature: 'Context-Aware Workspace Switching',
    mentions: 1234,
    coverage: 'no app provides this',
    opportunity: 'Seamless work/personal boundaries'
  },
  {
    feature: 'True Mobile-Desktop Feature Parity',
    mentions: 3456,
    coverage: 'all apps have mobile limitations',
    opportunity: 'Mobile-first redesign advantage'
  }
];

const themeComparison = [
  { theme: 'Easy to use', notion: 2847, todoist: 4234, asana: 2156, clickup: 1789, monday: 1234 },
  { theme: 'Too complex', notion: 1567, todoist: 234, asana: 2345, clickup: 3456, monday: 2789 },
  { theme: 'Great features', notion: 3234, todoist: 2789, asana: 3567, clickup: 4123, monday: 2456 },
  { theme: 'Expensive', notion: 987, todoist: 456, asana: 1234, clickup: 567, monday: 3789 },
  { theme: 'Mobile issues', notion: 1567, todoist: 234, asana: 567, clickup: 789, monday: 1234 },
  { theme: 'Slow performance', notion: 1234, todoist: 123, asana: 456, clickup: 678, monday: 567 },
  { theme: 'Love the team', notion: 2345, todoist: 1789, asana: 4567, clickup: 2234, monday: 1678 },
  { theme: 'Need AI features', notion: 1456, todoist: 1234, asana: 1789, clickup: 1567, monday: 1345 }
];

const marketInsights = [
  'Users frustrated with having multiple tools',
  'AI features becoming expected, not optional',
  'Mobile experience critical for user satisfaction',
  'Pricing transparency increasingly important',
  'Simplicity beats feature richness for most users'
];

const notionRecommendations = [
  'Mobile app rebuild should be top priority',
  'Simplify onboarding with guided setup flows',
  'Introduce AI features gradually to match demand',
  'Performance optimization critical for retention',
  'Consider simplified "Notion Lite" for casual users'
];

const competitiveOpportunities = [
  { competitor: 'Todoist', opportunity: 'Add database/relational features' },
  { competitor: 'Asana', opportunity: 'Simplify UI and improve individual use' },
  { competitor: 'ClickUp', opportunity: 'Focus on core features, reduce complexity' },
  { competitor: 'Monday', opportunity: 'Transparent pricing, better individual plans' }
];

export function ReviewsCompetitive({ onBack }: ReviewsCompetitiveProps) {
  const [selectedCategory, setSelectedCategory] = useState('productivity');

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'current': return 'text-blue-600 bg-blue-50';
      case 'leader': return 'text-green-600 bg-green-50';
      case 'competitor': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 75) return 'text-green-600';
    if (sentiment >= 65) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSentimentIcon = (sentiment: number) => {
    if (sentiment >= 75) return <Smile className="w-4 h-4 text-green-500" />;
    if (sentiment >= 65) return <Meh className="w-4 h-4 text-yellow-500" />;
    return <Frown className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Reviews Hub
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Target className="w-4 h-4 mr-2" />
            💡 Strategic Recommendations
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            🏆 Full Competitive Report
          </Button>
        </div>
      </div>

      {/* Page Title */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🏆 Cross-App Review Intelligence</CardTitle>
          <p className="text-muted-foreground">
            Competitive sentiment analysis and market positioning insights
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm">Category:</span>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="productivity">Productivity Category</SelectItem>
                <SelectItem value="health">Health & Fitness</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Competitive Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Competitive Review Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">App</th>
                      <th className="text-center p-3">Rating</th>
                      <th className="text-center p-3">Reviews</th>
                      <th className="text-center p-3">Sentiment</th>
                      <th className="text-left p-3">Top Complaint</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitiveComparison.map((app, index) => (
                      <tr key={index} className={`border-b hover:bg-muted/50 ${app.position === 'current' ? 'bg-blue-50' : ''}`}>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{app.app}</span>
                            {app.position === 'current' && (
                              <Badge className="text-blue-600 bg-blue-100">You</Badge>
                            )}
                            {app.position === 'leader' && (
                              <Trophy className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{app.rating}</span>
                          </div>
                        </td>
                        <td className="p-3 text-center">{app.reviews.toLocaleString()}</td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {getSentimentIcon(app.sentiment)}
                            <span className={getSentimentColor(app.sentiment)}>
                              {app.sentiment}%
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-muted-foreground">{app.topComplaint}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Competitive Sentiment Insights */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 Competitive Sentiment Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Sentiment Leader */}
              <div>
                <h4 className="font-semibold text-green-700 mb-3">
                  🏅 SENTIMENT LEADER: {sentimentLeaderInsights.leader} ({sentimentLeaderInsights.percentage}% positive)
                </h4>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="font-medium mb-2">Success Factors:</p>
                  <ul className="space-y-1">
                    {sentimentLeaderInsights.successFactors.map((factor, index) => (
                      <li key={index} className="text-sm text-green-800">• {factor}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sentiment Challenges */}
              <div>
                <h4 className="font-semibold text-red-700 mb-3">
                  📉 SENTIMENT CHALLENGES: {sentimentLeaderInsights.challenges} ({sentimentLeaderInsights.challengePercentage}% positive)
                </h4>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="font-medium mb-2">Key Issues:</p>
                  <ul className="space-y-1">
                    {sentimentLeaderInsights.keyIssues.map((issue, index) => (
                      <li key={index} className="text-sm text-red-800">• {issue}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Notion's Position */}
              <div>
                <h4 className="font-semibold text-blue-700 mb-3">
                  🎯 NOTION'S POSITION: Middle ground ({notionPosition.percentage}% positive)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-800 mb-2">Competitive Advantages:</p>
                    <ul className="space-y-1">
                      {notionPosition.advantages.map((advantage, index) => (
                        <li key={index} className="text-sm text-green-700">• {advantage}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="font-medium text-red-800 mb-2">Competitive Weaknesses:</p>
                    <ul className="space-y-1">
                      {notionPosition.weaknesses.map((weakness, index) => (
                        <li key={index} className="text-sm text-red-700">• {weakness}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Gap Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Feature Gap Analysis from Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-semibold">FEATURES USERS WANT BUT COMPETITORS DON'T HAVE:</h4>
                
                {featureGaps.map((gap, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{index + 1}. 🤖 {gap.feature}</h5>
                        <Badge variant="outline">{gap.mentions.toLocaleString()}x mentioned</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Current Coverage:</strong> {gap.coverage}
                      </p>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Opportunity:</strong> {gap.opportunity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Review Theme Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>🔍 Review Theme Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Theme</th>
                      <th className="text-center p-3">Notion</th>
                      <th className="text-center p-3">Todoist</th>
                      <th className="text-center p-3">Asana</th>
                      <th className="text-center p-3">ClickUp</th>
                      <th className="text-center p-3">Monday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {themeComparison.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">"{row.theme}"</td>
                        <td className="p-3 text-center font-medium text-blue-600">{row.notion.toLocaleString()}</td>
                        <td className="p-3 text-center">{row.todoist.toLocaleString()}</td>
                        <td className="p-3 text-center">{row.asana.toLocaleString()}</td>
                        <td className="p-3 text-center">{row.clickup.toLocaleString()}</td>
                        <td className="p-3 text-center">{row.monday.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Strategic Intelligence */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🎯 Strategic Review Intelligence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h5 className="font-medium text-blue-700 mb-2">📊 MARKET INSIGHTS FROM REVIEWS:</h5>
                <ul className="space-y-1 text-sm">
                  {marketInsights.map((insight, index) => (
                    <li key={index} className="text-blue-800">• {insight}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-green-700 mb-2">🎯 NOTION-SPECIFIC RECOMMENDATIONS:</h5>
                <ol className="space-y-1 text-sm">
                  {notionRecommendations.map((rec, index) => (
                    <li key={index} className="text-green-800">{index + 1}. {rec}</li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Competitive Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📈 Competitive Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {competitiveOpportunities.map((opp, index) => (
                  <div key={index} className="text-sm">
                    <div className="font-medium text-purple-700">• {opp.competitor}:</div>
                    <div className="text-muted-foreground ml-2">{opp.opportunity}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Market Position */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🏆 Your Position</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                #3
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                in sentiment ranking
              </p>
              <Badge className="text-blue-600 bg-blue-50">
                73% positive sentiment
              </Badge>
              <div className="mt-3 text-xs text-muted-foreground">
                5 points behind leader
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">⚡ Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                📈 Monitor Changes
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                <Download className="w-4 h-4 mr-2" />
                📊 Export Comparison
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                <Lightbulb className="w-4 h-4 mr-2" />
                💡 Strategic Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}