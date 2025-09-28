import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Target,
  Phone,
  Calendar,
  FileText,
  CheckCircle,
  ArrowRight,
  BarChart3,
  UserCheck,
  Zap,
  TrendingDown
} from 'lucide-react';

interface SalesMainProps {
  onNavigate: (page: string, data?: any) => void;
}

const salesMetrics = [
  { 
    label: 'Monthly Recurring Revenue', 
    value: '$28,340', 
    change: '+18%',
    trend: 'up',
    icon: DollarSign, 
    color: 'text-green-500',
    description: 'Total MRR from all revenue streams'
  },
  { 
    label: 'Active Pipeline', 
    value: '$127K', 
    change: '+12%',
    trend: 'up',
    icon: Target, 
    color: 'text-blue-500',
    description: 'Total value of deals in pipeline'
  },
  { 
    label: 'Lead Conversion Rate', 
    value: '28%', 
    change: '+5%',
    trend: 'up',
    icon: TrendingUp, 
    color: 'text-purple-500',
    description: 'Leads converting to paying customers'
  },
  { 
    label: 'Active Clients', 
    value: '47', 
    change: '+8',
    trend: 'up',
    icon: Users, 
    color: 'text-orange-500',
    description: 'Total active paying clients'
  }
];

const recentActivity = [
  {
    type: 'deal',
    title: 'TaskMaster Pro - Proposal Sent',
    description: 'Revenue optimization proposal ($2.4K/year)',
    time: '2 hours ago',
    status: 'pending',
    icon: FileText,
    color: 'text-blue-500'
  },
  {
    type: 'demo',
    title: 'FitnessFlow - Demo Completed',
    description: 'Successful demo, moving to proposal stage',
    time: '4 hours ago',
    status: 'completed',
    icon: CheckCircle,
    color: 'text-green-500'
  },
  {
    type: 'lead',
    title: 'New High-Value Lead',
    description: 'MealPlanner Pro - 87/100 score, $3.2K MRR',
    time: '6 hours ago',
    status: 'new',
    icon: UserCheck,
    color: 'text-purple-500'
  },
  {
    type: 'call',
    title: 'Follow-up Call Scheduled',
    description: 'StudyBuddy App - Discovery call tomorrow',
    time: '1 day ago',
    status: 'scheduled',
    icon: Phone,
    color: 'text-orange-500'
  }
];

const topLeads = [
  {
    id: 1,
    name: 'TaskMaster Pro',
    contact: 'John Smith',
    company: 'Solo Developer',
    score: 87,
    revenue: '$2.3K MRR',
    stage: 'Proposal',
    probability: 65,
    nextAction: 'Contract review',
    insights: 'Growing 15% monthly, needs ASO help'
  },
  {
    id: 2,
    name: 'FitnessFlow',
    contact: 'Sarah Johnson',
    company: 'Wellness Studio',
    score: 92,
    revenue: '$4.8K MRR',
    stage: 'Discovery',
    probability: 40,
    nextAction: 'Send proposal',
    insights: 'High engagement, budget confirmed'
  },
  {
    id: 3,
    name: 'MealPlanner Pro',
    contact: 'Mike Chen',
    company: 'Food Tech Inc',
    score: 78,
    revenue: '$1.9K MRR',
    stage: 'Demo',
    probability: 25,
    nextAction: 'Schedule demo',
    insights: 'Scaling challenges, competitor pressure'
  }
];

const actionQueue = [
  { action: 'Follow-up calls', count: 5, priority: 'high' },
  { action: 'Demos scheduled', count: 3, priority: 'medium' },
  { action: 'Proposals sent', count: 2, priority: 'medium' },
  { action: 'Contracts pending', count: 1, priority: 'high' }
];

export function SalesMain({ onNavigate }: SalesMainProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'scheduled': return 'text-blue-600 bg-blue-50';
      case 'new': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {salesMetrics.map((metric, index) => (
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
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                    )}
                    <span className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
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
          {/* Sales Pipeline Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  🔄 Sales Pipeline - Q1 2025
                </CardTitle>
                <Button variant="outline" onClick={() => onNavigate('pipeline')}>
                  View Pipeline
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Total Pipeline: $127K</span>
                <span>•</span>
                <span>Weighted: $38.4K</span>
                <span>•</span>
                <span>Close Rate: 28%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Prospecting</p>
                  <p className="text-2xl font-semibold">15</p>
                  <p className="text-sm">$45K • 10% prob</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Discovery</p>
                  <p className="text-2xl font-semibold">8</p>
                  <p className="text-sm">$32K • 35% prob</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Proposal</p>
                  <p className="text-2xl font-semibold">4</p>
                  <p className="text-sm">$18K • 65% prob</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {topLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{lead.name}</span>
                        <Badge className={getScoreColor(lead.score)}>
                          {lead.score}/100
                        </Badge>
                        <Badge variant="outline">{lead.stage}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {lead.contact} • {lead.revenue} • {lead.insights}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{lead.probability}% prob</p>
                      <p className="text-xs text-muted-foreground">{lead.nextAction}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📋 Recent Sales Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color.replace('text-', 'bg-').replace('-500', '-100')}`}>
                      <activity.icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{activity.title}</h4>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Queue */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🎯 Action Queue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {actionQueue.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.action}</p>
                    <Badge className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{item.count}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">⚡ Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onNavigate('leads')}
              >
                <Users className="w-4 h-4 mr-2" />
                Lead Generation
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onNavigate('tools')}
              >
                <Zap className="w-4 h-4 mr-2" />
                Sales Tools
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onNavigate('forecasting')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Revenue Forecasting
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onNavigate('success')}
              >
                <UserCheck className="w-4 h-4 mr-2" />
                Client Success
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onNavigate('automation')}
              >
                <Target className="w-4 h-4 mr-2" />
                Sales Automation
              </Button>
            </CardContent>
          </Card>

          {/* Revenue Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">💰 Revenue Streams</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Revenue-Share</span>
                  <span className="font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">SaaS Subscriptions</span>
                  <span className="font-medium">30%</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Enterprise</span>
                  <span className="font-medium">5%</span>
                </div>
                <Progress value={5} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Performance Highlights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🏆 This Month's Wins</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>New Clients Added:</span>
                  <span className="font-medium text-green-600">+8</span>
                </div>
                <div className="flex justify-between">
                  <span>Revenue Growth:</span>
                  <span className="font-medium text-green-600">+18%</span>
                </div>
                <div className="flex justify-between">
                  <span>Pipeline Value:</span>
                  <span className="font-medium text-blue-600">$127K</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversion Rate:</span>
                  <span className="font-medium text-purple-600">28%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}