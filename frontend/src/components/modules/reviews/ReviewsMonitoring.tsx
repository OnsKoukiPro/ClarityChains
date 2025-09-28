import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Switch } from '../../ui/switch';
import { Input } from '../../ui/input';
import { 
  ArrowLeft, 
  Download, 
  Bell,
  Settings,
  AlertTriangle,
  TrendingUp,
  Target,
  Eye,
  Phone,
  Mail,
  Activity
} from 'lucide-react';

interface ReviewsMonitoringProps {
  onBack: () => void;
}

const activeAlerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Notion mobile crashes up 156%',
    startTime: '3 hours ago',
    reviews: 45,
    action: 'Immediate development team notification',
    status: 'active'
  },
  {
    id: 2,
    type: 'high',
    title: '"Expensive" mentions increased 89%',
    startTime: '2 days ago',
    reviews: 67,
    action: 'Review pricing communication strategy',
    status: 'investigating'
  },
  {
    id: 3,
    type: 'positive',
    title: 'AI features praise up 234%',
    startTime: '1 week ago',
    reviews: 156,
    action: 'Amplify success in marketing materials',
    status: 'actioned'
  }
];

const alertConfig = {
  sentiment: [
    { label: 'Negative sentiment increase >20% in 24h', enabled: true },
    { label: 'Positive sentiment decrease >15% in 48h', enabled: true },
    { label: 'Overall rating drops >0.2 points in 1 week', enabled: true }
  ],
  keywords: [
    { label: '"Crash" mentions increase >50% in 24h', enabled: true },
    { label: '"Expensive" mentions increase >30% in 48h', enabled: true },
    { label: '"Love" mentions increase >100% in 24h', enabled: true },
    { label: 'Competitor names mentioned >25 times in 24h', enabled: true }
  ],
  volume: [
    { label: 'Review volume increases >200% from baseline', enabled: true },
    { label: 'Review volume decreases >50% from baseline', enabled: true },
    { label: '1-star reviews >10 in single day', enabled: true }
  ]
};

const predictiveInsights = [
  {
    issue: '"Slow loading" mentions trending up (+45%)',
    probability: 67,
    action: 'Proactive performance investigation'
  },
  {
    issue: '"Offline mode" requests increasing (+34%)',
    probability: 54,
    action: 'Consider offline feature roadmap'
  },
  {
    issue: '"Team collaboration" praise stable',
    probability: 78,
    action: 'Amplify this strength in marketing'
  }
];

export function ReviewsMonitoring({ onBack }: ReviewsMonitoringProps) {
  const [newKeyword, setNewKeyword] = useState('');

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return '🔴';
      case 'high': return '🟡';
      case 'positive': return '🟢';
      default: return '⚪';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-50';
      case 'investigating': return 'text-yellow-600 bg-yellow-50';
      case 'actioned': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-red-600 bg-red-50';
    if (probability >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
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
            <Mail className="w-4 h-4 mr-2" />
            📧 Email Digest Settings
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            📊 Alert Performance Report
          </Button>
        </div>
      </div>

      {/* Page Title */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🔔 Intelligent Review Monitoring System</CardTitle>
          <p className="text-muted-foreground">
            Real-time alerts and proactive issue detection for review sentiment changes
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Alerts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>⚠️ Active Alerts ({activeAlerts.length})</CardTitle>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeAlerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className={`border rounded-lg p-4 ${getAlertTypeColor(alert.type)}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{getAlertIcon(alert.type)}</span>
                          <span className="font-semibold uppercase text-sm">
                            {alert.type === 'positive' ? 'POSITIVE' : alert.type.toUpperCase()}:
                          </span>
                          <span className="font-medium">{alert.title}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <span className="font-medium">📅 Started:</span>
                            <span className="text-muted-foreground ml-1">{alert.startTime}</span>
                            <span className="ml-2">🔔 Alert triggered</span>
                          </div>
                          <div>
                            <span className="font-medium">📊 Impact:</span>
                            <span className="text-muted-foreground ml-1">{alert.reviews} new reviews</span>
                          </div>
                          <div>
                            <Badge className={getStatusColor(alert.status)}>
                              {alert.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="p-3 bg-white/80 rounded-lg mb-3">
                          <span className="text-sm">
                            🎯 <strong>Action:</strong> {alert.action}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        🔍 Investigate
                      </Button>
                      {alert.type === 'critical' && (
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-1" />
                          📞 Escalate
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Target className="w-4 h-4 mr-1" />
                        📊 View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alert Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>⚙️ Alert Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Sentiment Alerts */}
              <div>
                <h4 className="font-medium mb-3">SENTIMENT ALERTS:</h4>
                <div className="space-y-3">
                  {alertConfig.sentiment.map((config, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">{config.label}</span>
                      <Switch checked={config.enabled} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Keyword Alerts */}
              <div>
                <h4 className="font-medium mb-3">KEYWORD ALERTS:</h4>
                <div className="space-y-3">
                  {alertConfig.keywords.map((config, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">{config.label}</span>
                      <Switch checked={config.enabled} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Volume Alerts */}
              <div>
                <h4 className="font-medium mb-3">VOLUME ALERTS:</h4>
                <div className="space-y-3">
                  {alertConfig.volume.map((config, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">{config.label}</span>
                      <Switch checked={config.enabled} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Keywords */}
              <div>
                <h4 className="font-medium mb-3">Custom Keywords:</h4>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add keyword to monitor..."
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm">+ Add Alert</Button>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    ⚙️ Configure
                  </Button>
                  <Button variant="outline" size="sm">
                    📧 Email Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Proactive Issue Detection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🔮 Proactive Issue Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h5 className="font-medium">PREDICTIVE INSIGHTS (Next 7 Days):</h5>
                
                {predictiveInsights.map((insight, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">⚠️ {insight.issue}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs">Probability:</span>
                          <Badge className={getProbabilityColor(insight.probability)}>
                            {insight.probability}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-green-700 mb-1">
                      <strong>Recommended action:</strong> {insight.action}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alert Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📊 Alert Stats</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Active Alerts:</span>
                  <span className="font-medium text-red-600">{activeAlerts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Response:</span>
                  <span className="font-medium">2.3 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Accuracy Rate:</span>
                  <span className="font-medium text-green-600">87%</span>
                </div>
                <div className="flex justify-between">
                  <span>This Month:</span>
                  <span className="font-medium">23 alerts</span>
                </div>
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
                <Bell className="w-4 h-4 mr-2" />
                🔔 Configure New Alert
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                <Settings className="w-4 h-4 mr-2" />
                🤖 AI Alert Tuning
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                <Activity className="w-4 h-4 mr-2" />
                📊 View Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}