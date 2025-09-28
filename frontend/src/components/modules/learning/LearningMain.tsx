import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { 
  Brain, 
  Database, 
  TrendingUp, 
  Target,
  Zap,
  BarChart3,
  GitBranch,
  Cpu,
  Eye,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Activity,
  Users,
  Settings
} from 'lucide-react';

interface LearningMainProps {
  onNavigate: (page: string, data?: any) => void;
}

const learningMetrics = [
  { 
    label: 'Data Processing Accuracy', 
    value: '94.2%', 
    change: '+1.8%',
    trend: 'up',
    icon: Database, 
    color: 'text-blue-500',
    description: 'Real-time data ingestion quality'
  },
  { 
    label: 'Model Prediction Accuracy', 
    value: '87.3%', 
    change: '+3.2%',
    trend: 'up',
    icon: Brain, 
    color: 'text-purple-500',
    description: 'Average across all ML models'
  },
  { 
    label: 'Learning Velocity', 
    value: '2.3x', 
    change: '+0.4x',
    trend: 'up',
    icon: Zap, 
    color: 'text-green-500',
    description: 'Model updates per week vs baseline'
  },
  { 
    label: 'Intelligence Amplification', 
    value: '84%', 
    change: '+12%',
    trend: 'up',
    icon: TrendingUp, 
    color: 'text-orange-500',
    description: 'Client success rate improvement'
  }
];

const systemStatus = [
  {
    component: 'Data Ingestion Pipeline',
    status: 'healthy',
    performance: 98.1,
    description: 'Processing 2.3M data points daily',
    lastUpdate: '2 minutes ago'
  },
  {
    component: 'Pattern Recognition Engine',
    status: 'healthy',
    performance: 87.3,
    description: 'Trend prediction accuracy stable',
    lastUpdate: '1 hour ago'
  },
  {
    component: 'Feedback Loop System',
    status: 'warning',
    performance: 71.0,
    description: 'Pending outcome validation: 355 cases',
    lastUpdate: '3 hours ago'
  },
  {
    component: 'Knowledge Graph Builder',
    status: 'healthy',
    performance: 91.2,
    description: 'Relationship mapping up to date',
    lastUpdate: '30 minutes ago'
  },
  {
    component: 'Predictive Analytics',
    status: 'healthy',
    performance: 78.5,
    description: 'Revenue forecasting models active',
    lastUpdate: '45 minutes ago'
  },
  {
    component: 'Model Optimization',
    status: 'healthy',
    performance: 84.7,
    description: 'A/B testing 3 model variants',
    lastUpdate: '2 hours ago'
  }
];

const recentInsights = [
  {
    type: 'pattern',
    title: 'New Pattern Detected',
    description: 'Productivity apps with AI chat features showing +67% growth',
    confidence: 84,
    impact: 'High',
    time: '2 hours ago',
    icon: Brain,
    color: 'text-purple-500'
  },
  {
    type: 'prediction',
    title: 'Model Improvement',
    description: 'Revenue prediction accuracy increased by +12% after retraining',
    confidence: 91,
    impact: 'Medium',
    time: '4 hours ago',
    icon: TrendingUp,
    color: 'text-green-500'
  },
  {
    type: 'feedback',
    title: 'Outcome Validation',
    description: 'TaskMaster Pro exceeded revenue predictions by 7%',
    confidence: 95,
    impact: 'Medium',
    time: '6 hours ago',
    icon: CheckCircle,
    color: 'text-blue-500'
  },
  {
    type: 'knowledge',
    title: 'Relationship Discovered',
    description: 'Dark mode requests correlate with 31% higher engagement',
    confidence: 78,
    impact: 'Medium',
    time: '8 hours ago',
    icon: GitBranch,
    color: 'text-orange-500'
  }
];

const activeModels = [
  { name: 'Trend Predictor', accuracy: 87.3, status: 'active', lastTrained: '2h ago' },
  { name: 'Revenue Model', accuracy: 83.1, status: 'active', lastTrained: '4h ago' },
  { name: 'Sentiment Analyzer', accuracy: 94.2, status: 'active', lastTrained: '6h ago' },
  { name: 'ASO Optimizer', accuracy: 89.1, status: 'retraining', lastTrained: '1d ago' },
  { name: 'Churn Predictor', accuracy: 78.3, status: 'active', lastTrained: '3h ago' },
  { name: 'Opportunity Scorer', accuracy: 91.2, status: 'active', lastTrained: '5h ago' }
];

export function LearningMain({ onNavigate }: LearningMainProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

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
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getModelStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'retraining': return 'text-blue-600 bg-blue-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {learningMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <metric.icon className={`w-4 h-4 ${metric.color}`} />
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                  </div>
                  <p className="text-2xl font-semibold">{metric.value}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">{metric.change}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* System Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  🧠 Learning Engine System Status
                </CardTitle>
                <Button variant="outline" onClick={() => onNavigate('data')}>
                  View Data Pipeline
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemStatus.map((system, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(system.status)}
                      <div>
                        <h4 className="font-medium text-sm">{system.component}</h4>
                        <p className="text-xs text-muted-foreground">{system.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{system.performance}%</span>
                        <Badge className={getStatusColor(system.status)}>
                          {system.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{system.lastUpdate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💡 Recent AI Insights & Discoveries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInsights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${insight.color.replace('text-', 'bg-').replace('-500', '-100')}`}>
                      <insight.icon className={`w-4 h-4 ${insight.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{insight.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className={getImpactColor(insight.impact)}>
                            {insight.impact}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{insight.confidence}% confidence</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{insight.description}</p>
                      <p className="text-xs text-muted-foreground">{insight.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">⚡ Learning Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onNavigate('patterns')}
              >
                <Brain className="w-4 h-4 mr-2" />
                Pattern Recognition
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onNavigate('feedback')}
              >
                <GitBranch className="w-4 h-4 mr-2" />
                Feedback Loops
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onNavigate('knowledge')}
              >
                <Eye className="w-4 h-4 mr-2" />
                Knowledge Graph
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onNavigate('prediction')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Predictive Analytics
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onNavigate('optimization')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Model Optimization
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onNavigate('amplification')}
              >
                <Users className="w-4 h-4 mr-2" />
                Intelligence Amplification
              </Button>
            </CardContent>
          </Card>

          {/* Active Models */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🤖 Active ML Models</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeModels.map((model, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{model.name}</span>
                      <Badge className={getModelStatusColor(model.status)}>
                        {model.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Accuracy:</span>
                      <span className="text-xs font-medium">{model.accuracy}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{model.lastTrained}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Learning Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📊 Learning Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Data Quality</span>
                  <span className="font-medium">94.2%</span>
                </div>
                <Progress value={94.2} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Model Accuracy</span>
                  <span className="font-medium">87.3%</span>
                </div>
                <Progress value={87.3} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Prediction Confidence</span>
                  <span className="font-medium">82.1%</span>
                </div>
                <Progress value={82.1} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Learning Velocity</span>
                  <span className="font-medium">91.5%</span>
                </div>
                <Progress value={91.5} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Learning Highlights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🏆 Learning Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Models Improved:</span>
                  <span className="font-medium text-green-600">+6 this week</span>
                </div>
                <div className="flex justify-between">
                  <span>Patterns Discovered:</span>
                  <span className="font-medium text-blue-600">3 new</span>
                </div>
                <div className="flex justify-between">
                  <span>Accuracy Gains:</span>
                  <span className="font-medium text-purple-600">+3.2% avg</span>
                </div>
                <div className="flex justify-between">
                  <span>Client Success:</span>
                  <span className="font-medium text-orange-600">84% rate</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}