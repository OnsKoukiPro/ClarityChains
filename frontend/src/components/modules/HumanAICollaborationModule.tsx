import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft,
  Brain,
  Users,
  Zap,
  Target,
  CheckCircle,
  Clock,
  MessageSquare,
  User,
  Activity,
  TrendingUp,
  Lightbulb,
  FileText,
  Settings,
  Play,
  Pause,
  Send,
  Mic,
  Upload,
  Eye,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Star,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  ArrowRight,
  Plus,
  Filter,
  Download,
  Share,
  RefreshCw
} from 'lucide-react';

interface HumanAICollaborationModuleProps {
  subPage: string;
  onSubPageChange: (page: string, data?: any) => void;
}

// Intelligence Amplification Metrics
const collaborationMetrics = {
  activeCollaborations: 12,
  humanParticipants: 8,
  aiAgents: 5,
  consensusRate: 87,
  intelligenceAmplification: 3.4,
  plansGenerated: 24,
  avgSessionTime: 45,
  productivityMultiplier: 285
};

// Active Collaboration Sessions
const collaborationSessions = [
  {
    id: 1,
    title: 'Q1 Growth Strategy Planning',
    type: 'Growth Planning',
    status: 'active',
    participants: {
      humans: ['Sarah Chen', 'Mark Rodriguez'],
      ai: ['Strategic AI', 'Market Analyst AI']
    },
    progress: 78,
    phase: 'Consensus Building',
    metrics: {
      humanInputs: 23,
      aiSuggestions: 31,
      consensus: 18
    },
    timeline: '2 hours remaining',
    urgency: 'high',
    lastActivity: '2 minutes ago'
  },
  {
    id: 2,
    title: 'Feature Prioritization Matrix',
    type: 'Feature Planning',
    status: 'planning',
    participants: {
      humans: ['Alex Kim', 'Jennifer Wu'],
      ai: ['Product AI', 'User Research AI']
    },
    progress: 45,
    phase: 'Data Analysis',
    metrics: {
      humanInputs: 15,
      aiSuggestions: 28,
      consensus: 12
    },
    timeline: '1 day remaining',
    urgency: 'medium',
    lastActivity: '15 minutes ago'
  },
  {
    id: 3,
    title: 'A/B Testing Framework Design',
    type: 'AB Testing',
    status: 'completed',
    participants: {
      humans: ['David Park'],
      ai: ['Testing AI', 'Statistics AI']
    },
    progress: 100,
    phase: 'Implementation',
    metrics: {
      humanInputs: 18,
      aiSuggestions: 24,
      consensus: 20
    },
    timeline: 'Completed',
    urgency: 'low',
    lastActivity: 'Yesterday'
  },
  {
    id: 4,
    title: 'Revenue Optimization Strategy',
    type: 'Growth Planning',
    status: 'active',
    participants: {
      humans: ['Lisa Thompson', 'Michael Chang'],
      ai: ['Revenue AI', 'Pricing AI']
    },
    progress: 62,
    phase: 'Strategy Formation',
    metrics: {
      humanInputs: 20,
      aiSuggestions: 35,
      consensus: 16
    },
    timeline: '4 hours remaining',
    urgency: 'high',
    lastActivity: '5 minutes ago'
  }
];

// Live Activity Feed Data
const liveActivities = [
  {
    id: 1,
    type: 'human',
    participant: 'Sarah Chen',
    action: 'Added strategic insight on market positioning',
    timestamp: '2 minutes ago',
    content: 'Focus on emerging markets in Southeast Asia...'
  },
  {
    id: 2,
    type: 'ai',
    participant: 'Strategic AI',
    action: 'Generated market analysis report',
    timestamp: '3 minutes ago',
    content: 'Market opportunity analysis shows 34% growth potential...'
  },
  {
    id: 3,
    type: 'consensus',
    participant: 'Team Consensus',
    action: 'Reached agreement on pricing strategy',
    timestamp: '5 minutes ago',
    content: 'Consensus score: 92% - Strategy approved'
  }
];

export function HumanAICollaborationModule({ subPage, onSubPageChange }: HumanAICollaborationModuleProps) {
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [collaborationMode, setCollaborationMode] = useState('hybrid');
  const [showActivityFeed, setShowActivityFeed] = useState(true);

  if (subPage === 'workspace' && selectedSession) {
    return <CollaborationWorkspace session={selectedSession} onBack={() => onSubPageChange('')} />;
  }

  if (subPage === 'plan-builder') {
    return <PlanBuilderInterface onBack={() => onSubPageChange('')} />;
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-600" />
            Intelligence Amplification System
          </h1>
          <p className="text-muted-foreground">
            Human-AI collaboration for strategic planning and growth optimization
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button 
              variant={collaborationMode === 'human' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCollaborationMode('human')}
              className="text-xs"
            >
              Human-Led
            </Button>
            <Button 
              variant={collaborationMode === 'hybrid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCollaborationMode('hybrid')}
              className="text-xs bg-purple-600 text-white"
            >
              Hybrid
            </Button>
            <Button 
              variant={collaborationMode === 'ai' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCollaborationMode('ai')}
              className="text-xs"
            >
              AI-Led
            </Button>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Plans
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Collaboration
          </Button>
        </div>
      </div>

      {/* Intelligence Amplification Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Collaborations</p>
                <p className="text-3xl font-bold text-purple-600">{collaborationMetrics.activeCollaborations}</p>
                <p className="text-xs text-purple-600">{collaborationMetrics.humanParticipants} humans, {collaborationMetrics.aiAgents} AI agents</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Human-AI Consensus</p>
                <p className="text-3xl font-bold text-green-600">{collaborationMetrics.consensusRate}%</p>
                <p className="text-xs text-green-600">Average across all sessions</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Intelligence Amplification</p>
                <p className="text-3xl font-bold text-amber-600">{collaborationMetrics.intelligenceAmplification}x</p>
                <p className="text-xs text-amber-600">vs human-only planning</p>
              </div>
              <Zap className="w-8 h-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Plans Generated</p>
                <p className="text-3xl font-bold text-blue-600">{collaborationMetrics.plansGenerated}</p>
                <p className="text-xs text-blue-600">This month</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collaboration Sessions */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Active Collaboration Sessions
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {collaborationSessions.map((session) => (
                <Card key={session.id} className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => { setSelectedSession(session); onSubPageChange('workspace'); }}>
                  <CardContent className="p-6">
                    {/* Session Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{session.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <SessionTypeBadge type={session.type} />
                          <SessionStatusBadge status={session.status} />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{session.timeline}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last activity: {session.lastActivity}
                        </div>
                      </div>
                    </div>

                    {/* Participants */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Participants</p>
                      <div className="flex flex-wrap gap-2">
                        {session.participants.humans.map((human, index) => (
                          <Badge key={index} className="bg-purple-100 text-purple-800 border-purple-300">
                            <User className="w-3 h-3 mr-1" />
                            {human}
                          </Badge>
                        ))}
                        {session.participants.ai.map((ai, index) => (
                          <Badge key={index} className="bg-cyan-100 text-cyan-800 border-cyan-300">
                            <Brain className="w-3 h-3 mr-1" />
                            {ai}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-bold">{session.progress}%</span>
                      </div>
                      <Progress value={session.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Current Phase: {session.phase}</p>
                    </div>

                    {/* Collaboration Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-lg font-bold text-purple-600">{session.metrics.humanInputs}</p>
                        <p className="text-xs text-muted-foreground">Human Inputs</p>
                      </div>
                      <div className="text-center p-3 bg-cyan-50 rounded-lg">
                        <p className="text-lg font-bold text-cyan-600">{session.metrics.aiSuggestions}</p>
                        <p className="text-xs text-muted-foreground">AI Suggestions</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-lg font-bold text-green-600">{session.metrics.consensus}</p>
                        <p className="text-xs text-muted-foreground">Consensus</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                        <Play className="w-4 h-4 mr-2" />
                        Continue Session
                      </Button>
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Live Activity Feed */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Live Activity
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {liveActivities.map((activity) => (
                <div key={activity.id} className={`p-3 rounded-lg ${
                  activity.type === 'human' ? 'bg-purple-50 border-l-4 border-purple-500' :
                  activity.type === 'ai' ? 'bg-cyan-50 border-l-4 border-cyan-500' :
                  'bg-green-50 border-l-4 border-green-500'
                }`}>
                  <div className="flex items-start gap-2">
                    {activity.type === 'human' ? 
                      <User className="w-4 h-4 text-purple-600 mt-0.5" /> :
                      activity.type === 'ai' ?
                      <Brain className="w-4 h-4 text-cyan-600 mt-0.5" /> :
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    }
                    <div className="flex-1">
                      <p className="text-xs font-semibold">{activity.participant}</p>
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" onClick={() => onSubPageChange('plan-builder')}>
                <Lightbulb className="w-4 h-4 mr-2" />
                Start New Plan
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Configure AI Agents
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Session Type Badge Component
function SessionTypeBadge({ type }: { type: string }) {
  const typeConfig = {
    'Growth Planning': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
    'AB Testing': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
    'Feature Planning': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' }
  };

  const config = typeConfig[type as keyof typeof typeConfig] || typeConfig['Growth Planning'];

  return (
    <Badge className={`${config.bg} ${config.text} ${config.border} border`}>
      {type}
    </Badge>
  );
}

// Session Status Badge Component
function SessionStatusBadge({ status }: { status: string }) {
  const statusConfig = {
    active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active', dot: 'bg-green-500' },
    planning: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Planning', dot: 'bg-amber-500' },
    completed: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Completed', dot: 'bg-gray-500' }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;

  return (
    <Badge className={`${config.bg} ${config.text} flex items-center gap-1`}>
      <div className={`w-2 h-2 rounded-full ${config.dot}`}></div>
      {config.label}
    </Badge>
  );
}

// Collaboration Workspace Component
function CollaborationWorkspace({ session, onBack }: { session: any, onBack: () => void }) {
  const [humanInput, setHumanInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sessions
        </Button>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live Session
          </Badge>
          <div className="text-sm text-muted-foreground">
            {session.participants.humans.length + session.participants.ai.length} participants
          </div>
        </div>
      </div>

      {/* Workspace Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{session.title}</CardTitle>
              <p className="text-muted-foreground">Collaborative Intelligence Workspace</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">87%</div>
                <div className="text-xs text-muted-foreground">Consensus</div>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-center">
                <div className="text-lg font-bold text-amber-600">3.2x</div>
                <div className="text-xs text-muted-foreground">Amplification</div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Three-Panel Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Human Input Panel */}
        <Card className="bg-purple-50/50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <User className="w-5 h-5" />
              Human Expert Input
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Share your insights, strategies, and expert knowledge..."
              value={humanInput}
              onChange={(e) => setHumanInput(e.target.value)}
              className="min-h-32 border-purple-300 focus:border-purple-500"
            />
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className={`${isRecording ? 'bg-red-100 border-red-300' : ''}`}
                onClick={() => setIsRecording(!isRecording)}
              >
                <Mic className="w-4 h-4 mr-1" />
                {isRecording ? 'Stop' : 'Record'}
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-1" />
                Upload
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Recent Inputs:</h4>
              <div className="space-y-2">
                <div className="p-2 bg-white rounded border-l-4 border-purple-500">
                  <p className="text-sm">Market positioning strategy for Q1</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
                <div className="p-2 bg-white rounded border-l-4 border-purple-500">
                  <p className="text-sm">User acquisition cost analysis</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis Panel */}
        <Card className="bg-cyan-50/50 border-cyan-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-700">
              <Brain className="w-5 h-5" />
              AI Intelligence & Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-white rounded border-l-4 border-cyan-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Market Analysis</h4>
                    <p className="text-sm text-muted-foreground">Based on current market data, there's a 34% growth opportunity in Southeast Asian markets.</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white rounded border-l-4 border-cyan-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Pricing Strategy</h4>
                    <p className="text-sm text-muted-foreground">Optimize pricing with a freemium model to increase conversion by 23%.</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-cyan-100 rounded">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">AI analyzing...</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Consensus Building Panel */}
        <Card className="bg-green-50/50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              Collaborative Output
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-green-100 rounded border-l-4 border-green-500">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Agreed: Market Focus
                </h4>
                <p className="text-sm text-muted-foreground">Target Southeast Asian markets with localized content strategy.</p>
              </div>

              <div className="p-3 bg-amber-100 rounded border-l-4 border-amber-500">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Needs Review: Budget Allocation
                </h4>
                <p className="text-sm text-muted-foreground">Marketing budget distribution requires further discussion.</p>
              </div>

              <div className="p-3 bg-blue-100 rounded border-l-4 border-blue-500">
                <h4 className="font-medium text-sm">Final Strategy</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Focus on mobile-first approach</li>
                  <li>• Implement freemium pricing model</li>
                  <li>• Target 25-35 demographic initially</li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Consensus Level</span>
                <span className="text-sm font-bold text-green-600">87%</span>
              </div>
              <Progress value={87} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Control Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Submit Input
              </Button>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh AI Analysis
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Session Quality: <span className="font-medium text-green-600">High</span>
              </div>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Generate Plan
              </Button>
              <Button variant="destructive">
                End Session
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Plan Builder Interface Component
function PlanBuilderInterface({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <Badge variant="secondary">Plan Builder</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🎯 Strategic Plan Builder</CardTitle>
          <p className="text-muted-foreground">
            AI-assisted strategic planning and roadmap generation
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Plan Builder Interface</h3>
            <p className="text-muted-foreground mb-4">
              Collaborative planning workspace with AI assistance
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Start New Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}