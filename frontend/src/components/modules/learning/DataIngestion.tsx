import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { 
  ArrowLeft,
  Database,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Zap,
  Settings,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

interface DataIngestionProps {
  onBack: () => void;
}

const dataSources = [
  {
    name: 'App Store Connect',
    status: 'healthy',
    uptime: 99.8,
    lastSync: '2 minutes ago',
    recordsToday: 45623,
    errorRate: 0.2,
    latency: 1.2
  },
  {
    name: 'Google Play Console',
    status: 'healthy',
    uptime: 99.9,
    lastSync: '1 minute ago',
    recordsToday: 52134,
    errorRate: 0.1,
    latency: 0.8
  },
  {
    name: 'Sensor Tower API',
    status: 'warning',
    uptime: 97.3,
    lastSync: '5 minutes ago',
    recordsToday: 23456,
    errorRate: 2.7,
    latency: 3.4
  },
  {
    name: 'Reviews & Ratings',
    status: 'healthy',
    uptime: 99.2,
    lastSync: '30 seconds ago',
    recordsToday: 89234,
    errorRate: 0.8,
    latency: 1.1
  },
  {
    name: 'Ad Intelligence',
    status: 'healthy',
    uptime: 98.7,
    lastSync: '3 minutes ago',
    recordsToday: 34567,
    errorRate: 1.3,
    latency: 2.1
  },
  {
    name: 'Social Media APIs',
    status: 'error',
    uptime: 89.4,
    lastSync: '2 hours ago',
    recordsToday: 12345,
    errorRate: 10.6,
    latency: 8.2
  }
];

const processingQueue = [
  { id: 1, app: 'TaskMaster Pro', type: 'Metadata Update', status: 'processing', progress: 67, eta: '2 min' },
  { id: 2, app: 'FitnessFlow', type: 'Review Analysis', status: 'processing', progress: 34, eta: '5 min' },
  { id: 3, app: 'MealPlanner', type: 'ASO Data', status: 'queued', progress: 0, eta: '8 min' },
  { id: 4, app: 'StudyBuddy', type: 'Revenue Data', status: 'completed', progress: 100, eta: 'Done' },
  { id: 5, app: 'PhotoEdit Pro', type: 'Full Sync', status: 'failed', progress: 0, eta: 'Retry' }
];

const qualityAlerts = [
  {
    id: 1,
    priority: 'high',
    title: 'App Store scraper getting blocked',
    description: 'Success rate dropped to 67% for iOS app metadata. Action: Rotate proxy servers and implement delays',
    timestamp: '15 minutes ago',
    status: 'active'
  },
  {
    id: 2,
    priority: 'medium',
    title: 'Sensor Tower API response time increased',
    description: 'Response time increased 40% in last hour. Possible rate limiting. Action: Switch to backup data source',
    timestamp: '1 hour ago',
    status: 'active'
  },
  {
    id: 3,
    priority: 'resolved',
    title: 'Google Play review processing back to normal',
    description: 'Previous parsing errors for non-English reviews fixed. Current success rate: 97.3%',
    timestamp: '2 hours ago',
    status: 'resolved'
  }
];

const dataQualityMetrics = {
  accuracy: 94.2,
  completeness: 89.1,
  freshness: 96.3,
  consistency: 91.7,
  reliability: 93.4
};

export function DataIngestion({ onBack }: DataIngestionProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getProcessingStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'processing': return 'text-blue-600 bg-blue-50';
      case 'queued': return 'text-gray-600 bg-gray-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      case 'resolved': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">📊 Data Ingestion Dashboard</h1>
          <p className="text-muted-foreground">Multi-source data collection and processing pipeline</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learning Engine
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Daily Data Volume</p>
                    <p className="text-2xl font-semibold">2.3M</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">+12% vs yesterday</span>
                    </div>
                  </div>
                  <Database className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Processing Rate</p>
                    <p className="text-2xl font-semibold">847/min</p>
                    <div className="flex items-center mt-1">
                      <Activity className="w-3 h-3 text-blue-500 mr-1" />
                      <span className="text-xs text-blue-600">Avg throughput</span>
                    </div>
                  </div>
                  <Zap className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-semibold">98.1%</p>
                    <div className="flex items-center mt-1">
                      <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">Within target</span>
                    </div>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Latency</p>
                    <p className="text-2xl font-semibold">1.2s</p>
                    <div className="flex items-center mt-1">
                      <Clock className="w-3 h-3 text-yellow-500 mr-1" />
                      <span className="text-xs text-yellow-600">+0.3s vs target</span>
                    </div>
                  </div>
                  <Clock className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Quality Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Data Quality Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {Object.entries(dataQualityMetrics).map(([metric, value]) => (
                  <div key={metric} className="text-center">
                    <p className="text-sm font-medium mb-2 capitalize">{metric}</p>
                    <p className="text-2xl font-semibold mb-2">{value}%</p>
                    <Progress value={value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Source Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(source.status)}
                      <div>
                        <h4 className="font-medium">{source.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {source.recordsToday.toLocaleString()} records today • {source.lastSync}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={getStatusColor(source.status)}>
                          {source.status}
                        </Badge>
                        <span className="text-sm font-medium">{source.uptime}%</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span>Error: {source.errorRate}%</span>
                        <span className="ml-2">Latency: {source.latency}s</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Processing Queue</CardTitle>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Queue
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processingQueue.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{item.app}</span>
                        <Badge className={getProcessingStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{item.type}</p>
                      {item.status === 'processing' && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{item.progress}%</span>
                          </div>
                          <Progress value={item.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm font-medium">{item.eta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Data Quality Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qualityAlerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(alert.priority)}>
                          {alert.priority}
                        </Badge>
                        <h4 className="font-medium">{alert.title}</h4>
                      </div>
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                    <div className="flex gap-2">
                      {alert.status === 'active' && (
                        <>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Take Action
                          </Button>
                        </>
                      )}
                      {alert.status === 'resolved' && (
                        <Button size="sm" variant="outline">
                          View Resolution
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}