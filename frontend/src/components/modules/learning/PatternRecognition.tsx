import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { 
  ArrowLeft,
  Brain,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  CheckCircle,
  AlertCircle,
  Eye,
  RefreshCw,
  Play,
  Pause,
  Settings
} from 'lucide-react';

interface PatternRecognitionProps {
  selectedModel?: any;
  onModelSelect: (model: any) => void;
  onBack: () => void;
}

const mlModels = [
  {
    id: 1,
    name: 'Trend Predictor',
    type: 'Prophet + LSTM Ensemble',
    accuracy: 87.3,
    status: 'active',
    lastTrained: '2 hours ago',
    dataPoints: '18 months',
    updateFreq: '6 hours',
    confidence: 91,
    description: 'Predicts app performance trends and market movements'
  },
  {
    id: 2,
    name: 'Revenue Model',
    type: 'Random Forest Regressor',
    accuracy: 83.1,
    status: 'active',
    lastTrained: '4 hours ago',
    dataPoints: '24 months',
    updateFreq: '12 hours',
    confidence: 85,
    description: 'Forecasts revenue potential and growth trajectories'
  },
  {
    id: 3,
    name: 'Sentiment Analyzer',
    type: 'BERT-based Classifier',
    accuracy: 94.2,
    status: 'active',
    lastTrained: '6 hours ago',
    dataPoints: '2.4M reviews',
    updateFreq: '24 hours',
    confidence: 96,
    description: 'Analyzes user sentiment from reviews and feedback'
  },
  {
    id: 4,
    name: 'ASO Optimizer',
    type: 'Gradient Boosting',
    accuracy: 89.1,
    status: 'retraining',
    lastTrained: '1 day ago',
    dataPoints: '500K keywords',
    updateFreq: '8 hours',
    confidence: 82,
    description: 'Optimizes app store presence and keyword strategies'
  },
  {
    id: 5,
    name: 'Churn Predictor',
    type: 'XGBoost Classifier',
    accuracy: 78.3,
    status: 'active',
    lastTrained: '3 hours ago',
    dataPoints: '12 months',
    updateFreq: '4 hours',
    confidence: 74,
    description: 'Predicts client retention and churn risk'
  },
  {
    id: 6,
    name: 'Opportunity Scorer',
    type: 'Neural Network',
    accuracy: 91.2,
    status: 'active',
    lastTrained: '5 hours ago',
    dataPoints: '36 months',
    updateFreq: '6 hours',
    confidence: 88,
    description: 'Scores market opportunities and app potential'
  }
];

const recentPredictions = [
  {
    id: 1,
    model: 'Trend Predictor',
    prediction: 'Health & Fitness category: +12% growth (next 30 days)',
    confidence: 87,
    impact: 'Medium',
    timestamp: '2 hours ago',
    status: 'active'
  },
  {
    id: 2,
    model: 'Revenue Model',
    prediction: 'AI-powered apps: +23% revenue growth potential',
    confidence: 91,
    impact: 'High',
    timestamp: '4 hours ago',
    status: 'validated'
  },
  {
    id: 3,
    model: 'Sentiment Analyzer',
    prediction: 'Dark mode requests correlate with +31% engagement',
    confidence: 78,
    impact: 'Medium',
    timestamp: '6 hours ago',
    status: 'active'
  },
  {
    id: 4,
    model: 'ASO Optimizer',
    prediction: 'Voice UI keywords showing +156% search volume',
    confidence: 84,
    impact: 'High',
    timestamp: '8 hours ago',
    status: 'active'
  }
];

const modelFeatures = [
  { name: 'Historical download velocity', importance: 0.23 },
  { name: 'Review sentiment momentum', importance: 0.19 },
  { name: 'Competitive landscape changes', importance: 0.16 },
  { name: 'Seasonal patterns', importance: 0.14 },
  { name: 'ASO keyword performance', importance: 0.12 },
  { name: 'User retention metrics', importance: 0.11 },
  { name: 'Monetization signals', importance: 0.05 }
];

export function PatternRecognition({ selectedModel, onModelSelect, onBack }: PatternRecognitionProps) {
  const [activeTab, setActiveTab] = useState('models');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'retraining': return 'text-blue-600 bg-blue-50';
      case 'error': return 'text-red-600 bg-red-50';
      case 'paused': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'retraining': return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'paused': return <Pause className="w-4 h-4 text-yellow-500" />;
      default: return <Eye className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPredictionStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-600 bg-blue-50';
      case 'validated': return 'text-green-600 bg-green-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
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

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (selectedModel) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pattern Recognition
        </Button>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">🤖 {selectedModel.name}</CardTitle>
                <p className="text-muted-foreground">{selectedModel.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
                <Button>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retrain
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Model Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Type:</span> {selectedModel.type}</p>
                    <p><span className="font-medium">Accuracy:</span> {selectedModel.accuracy}%</p>
                    <p><span className="font-medium">Confidence:</span> {selectedModel.confidence}%</p>
                    <p><span className="font-medium">Training Data:</span> {selectedModel.dataPoints}</p>
                    <p><span className="font-medium">Update Frequency:</span> {selectedModel.updateFreq}</p>
                    <p><span className="font-medium">Last Trained:</span> {selectedModel.lastTrained}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Performance Metrics</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Accuracy</span>
                        <span className={getAccuracyColor(selectedModel.accuracy)}>
                          {selectedModel.accuracy}%
                        </span>
                      </div>
                      <Progress value={selectedModel.accuracy} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Confidence</span>
                        <span className={getAccuracyColor(selectedModel.confidence)}>
                          {selectedModel.confidence}%
                        </span>
                      </div>
                      <Progress value={selectedModel.confidence} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Feature Importance</h3>
                  <div className="space-y-2">
                    {modelFeatures.map((feature, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="truncate">{feature.name}</span>
                          <span className="font-medium">{(feature.importance * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={feature.importance * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">🧠 Pattern Recognition Engine</h1>
          <p className="text-muted-foreground">Machine learning models for trend detection and prediction</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learning Engine
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="models">ML Models</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Machine Learning Models Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mlModels.map((model) => (
                  <Card key={model.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onModelSelect(model)}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Brain className="w-5 h-5 text-purple-500" />
                          <h3 className="font-medium">{model.name}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(model.status)}
                          <Badge className={getStatusColor(model.status)}>
                            {model.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{model.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Accuracy:</span>
                          <span className={`font-medium ${getAccuracyColor(model.accuracy)}`}>
                            {model.accuracy}%
                          </span>
                        </div>
                        <Progress value={model.accuracy} className="h-2" />
                        
                        <div className="flex justify-between text-sm">
                          <span>Type:</span>
                          <span className="font-medium">{model.type}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span>Last Trained:</span>
                          <span className="font-medium">{model.lastTrained}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Predictions & Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPredictions.map((prediction) => (
                  <div key={prediction.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{prediction.model}</Badge>
                        <Badge className={getPredictionStatusColor(prediction.status)}>
                          {prediction.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <Badge className={getImpactColor(prediction.impact)}>
                          {prediction.impact} Impact
                        </Badge>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-2">{prediction.prediction}</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Confidence: {prediction.confidence}%</span>
                        <span>•</span>
                        <span>{prediction.timestamp}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Target className="w-4 h-4 mr-1" />
                          Take Action
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Performance Cards */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">🎯 Overall Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Average Accuracy</span>
                    <span className="font-medium">87.3%</span>
                  </div>
                  <Progress value={87.3} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Model Reliability</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Prediction Confidence</span>
                    <span className="font-medium">82.1%</span>
                  </div>
                  <Progress value={82.1} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">📊 Model Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Active Models:</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retraining:</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Predictions:</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Rate:</span>
                    <span className="font-medium text-green-600">91.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Training Time:</span>
                    <span className="font-medium">2.3 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">⚡ Learning Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Accuracy Improvement:</span>
                    <span className="font-medium text-green-600">+3.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Model Updates/Week:</span>
                    <span className="font-medium">2.3x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pattern Discovery:</span>
                    <span className="font-medium">3 new</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prediction Lag:</span>
                    <span className="font-medium">2.3 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Coverage:</span>
                    <span className="font-medium">91%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}