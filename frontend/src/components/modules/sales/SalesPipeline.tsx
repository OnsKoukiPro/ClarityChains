import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { 
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  Clock,
  Target,
  BarChart3,
  Eye,
  Edit,
  Plus
} from 'lucide-react';

interface SalesPipelineProps {
  selectedDeal?: any;
  onDealSelect: (deal: any) => void;
  onBack: () => void;
}

const pipelineStages = [
  {
    name: 'Prospecting',
    deals: 15,
    value: 45000,
    probability: 10,
    color: 'text-gray-600 bg-gray-50'
  },
  {
    name: 'Discovery',
    deals: 8,
    value: 32000,
    probability: 35,
    color: 'text-blue-600 bg-blue-50'
  },
  {
    name: 'Proposal',
    deals: 4,
    value: 18000,
    probability: 65,
    color: 'text-purple-600 bg-purple-50'
  },
  {
    name: 'Closing',
    deals: 2,
    value: 12000,
    probability: 85,
    color: 'text-green-600 bg-green-50'
  }
];

const deals = [
  {
    id: 1,
    name: 'TaskMaster Pro',
    contact: 'John Smith',
    company: 'Solo Developer',
    value: 2400,
    stage: 'Proposal',
    probability: 65,
    closeDate: '2025-03-15',
    lastActivity: '2 hours ago',
    nextAction: 'Contract review',
    appMetrics: {
      mrr: '$2.3K',
      growth: '+15%',
      users: '12K',
      rating: 4.1
    },
    opportunities: [
      'ASO optimization (+40% downloads)',
      'Paywall redesign (+25% conversion)',
      'Review sentiment fix (+0.3 rating)'
    ],
    activities: [
      { type: 'demo', date: '2025-03-08', outcome: 'Positive, requested proposal' },
      { type: 'email', date: '2025-03-06', outcome: 'Sent competitor comparison' },
      { type: 'call', date: '2025-03-04', outcome: 'Qualification call completed' }
    ]
  },
  {
    id: 2,
    name: 'FitnessFlow',
    contact: 'Sarah Johnson',
    company: 'Wellness Studio',
    value: 4800,
    stage: 'Discovery',
    probability: 40,
    closeDate: '2025-03-20',
    lastActivity: '4 hours ago',
    nextAction: 'Send proposal',
    appMetrics: {
      mrr: '$4.8K',
      growth: '+22%',
      users: '28K',
      rating: 4.3
    },
    opportunities: [
      'User retention optimization',
      'Paywall conversion improvement',
      'Competitive positioning'
    ],
    activities: [
      { type: 'demo', date: '2025-03-10', outcome: 'Demo scheduled for tomorrow' },
      { type: 'email', date: '2025-03-09', outcome: 'Sent pre-demo materials' },
      { type: 'call', date: '2025-03-07', outcome: 'Budget confirmed' }
    ]
  },
  {
    id: 3,
    name: 'MealPlanner Pro',
    contact: 'Mike Chen',
    company: 'Food Tech Inc',
    value: 7200,
    stage: 'Closing',
    probability: 85,
    closeDate: '2025-03-12',
    lastActivity: '30 minutes ago',
    nextAction: 'Final contract signature',
    appMetrics: {
      mrr: '$1.9K',
      growth: '+8%',
      users: '15K',
      rating: 4.4
    },
    opportunities: [
      'Market expansion strategy',
      'Feature prioritization',
      'Revenue optimization'
    ],
    activities: [
      { type: 'contract', date: '2025-03-11', outcome: 'Contract terms agreed' },
      { type: 'call', date: '2025-03-10', outcome: 'Stakeholder approval' },
      { type: 'proposal', date: '2025-03-08', outcome: 'Proposal accepted' }
    ]
  },
  {
    id: 4,
    name: 'StudyBuddy',
    contact: 'Emily Rodriguez',
    company: 'EduTech Startup',
    value: 3600,
    stage: 'Prospecting',
    probability: 15,
    closeDate: '2025-03-25',
    lastActivity: '1 day ago',
    nextAction: 'Schedule qualification call',
    appMetrics: {
      mrr: '$3.2K',
      growth: '+28%',
      users: '22K',
      rating: 4.2
    },
    opportunities: [
      'Seasonal usage optimization',
      'User acquisition cost reduction',
      'Feature simplification'
    ],
    activities: [
      { type: 'email', date: '2025-03-09', outcome: 'Initial outreach sent' },
      { type: 'research', date: '2025-03-08', outcome: 'Company research completed' }
    ]
  }
];

export function SalesPipeline({ selectedDeal, onDealSelect, onBack }: SalesPipelineProps) {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [selectedStage, setSelectedStage] = useState('all');

  const totalPipelineValue = pipelineStages.reduce((sum, stage) => sum + stage.value, 0);
  const weightedValue = pipelineStages.reduce((sum, stage) => sum + (stage.value * stage.probability / 100), 0);

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'prospecting': return 'text-gray-600 bg-gray-50';
      case 'discovery': return 'text-blue-600 bg-blue-50';
      case 'proposal': return 'text-purple-600 bg-purple-50';
      case 'closing': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-green-600';
    if (probability >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredDeals = selectedStage === 'all' 
    ? deals 
    : deals.filter(deal => deal.stage.toLowerCase() === selectedStage.toLowerCase());

  if (selectedDeal) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pipeline
        </Button>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">📋 Deal: {selectedDeal.name}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getStageColor(selectedDeal.stage)}>
                    {selectedDeal.stage}
                  </Badge>
                  <Badge variant="outline">
                    ${selectedDeal.value}/year
                  </Badge>
                  <Badge className={getProbabilityColor(selectedDeal.probability)}>
                    {selectedDeal.probability}% probability
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Deal
                </Button>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Deal Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Contact:</span> {selectedDeal.contact}</p>
                    <p><span className="font-medium">Company:</span> {selectedDeal.company}</p>
                    <p><span className="font-medium">Value:</span> ${selectedDeal.value.toLocaleString()}/year</p>
                    <p><span className="font-medium">Close Date:</span> {selectedDeal.closeDate}</p>
                    <p><span className="font-medium">Last Activity:</span> {selectedDeal.lastActivity}</p>
                    <p><span className="font-medium">Next Action:</span> {selectedDeal.nextAction}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">App Intelligence Insights</h3>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">MRR:</span> {selectedDeal.appMetrics.mrr}
                      </div>
                      <div>
                        <span className="font-medium">Growth:</span> {selectedDeal.appMetrics.growth}
                      </div>
                      <div>
                        <span className="font-medium">Users:</span> {selectedDeal.appMetrics.users}
                      </div>
                      <div>
                        <span className="font-medium">Rating:</span> {selectedDeal.appMetrics.rating}⭐
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Opportunity Areas</h3>
                  <div className="space-y-2">
                    {selectedDeal.opportunities.map((opportunity: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{opportunity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Sales Playbook</h3>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Recommended Approach:</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Lead with ASO quick wins</li>
                      <li>• Show competitor comparison</li>
                      <li>• Emphasize revenue-share model</li>
                      <li>• Highlight similar success stories</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Activity Timeline</h3>
                  <div className="space-y-3">
                    {selectedDeal.activities.map((activity: any, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-2 border rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium capitalize">{activity.type}</span>
                            <span className="text-xs text-muted-foreground">{activity.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.outcome}</p>
                        </div>
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
          <h1 className="text-2xl font-semibold">💼 Sales Pipeline - Q1 2025</h1>
          <p className="text-muted-foreground">Deal tracking and pipeline management</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sales
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      {/* Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Overview</CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Total Pipeline: ${totalPipelineValue.toLocaleString()}</span>
            <span>•</span>
            <span>Weighted: ${Math.round(weightedValue).toLocaleString()}</span>
            <span>•</span>
            <span>Close Rate: 28%</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {pipelineStages.map((stage, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedStage(stage.name)}>
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="font-medium text-sm mb-2">{stage.name}</h3>
                    <p className="text-2xl font-semibold">{stage.deals}</p>
                    <p className="text-sm text-muted-foreground">
                      ${(stage.value / 1000).toFixed(0)}K • {stage.probability}% prob
                    </p>
                    <Badge className={stage.color}>
                      {stage.name}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
          <TabsTrigger value="deals">Deal List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Button 
              variant={selectedStage === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedStage('all')}
              size="sm"
            >
              All Stages
            </Button>
            {pipelineStages.map((stage) => (
              <Button 
                key={stage.name}
                variant={selectedStage === stage.name ? 'default' : 'outline'}
                onClick={() => setSelectedStage(stage.name)}
                size="sm"
              >
                {stage.name} ({stage.deals})
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredDeals.map((deal) => (
              <Card key={deal.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onDealSelect(deal)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{deal.name}</h3>
                        <Badge className={getStageColor(deal.stage)}>
                          {deal.stage}
                        </Badge>
                        <Badge variant="outline">
                          ${deal.value.toLocaleString()}/year
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Contact: {deal.contact}</p>
                          <p className="text-sm text-muted-foreground">Company: {deal.company}</p>
                          <p className="text-sm text-muted-foreground">Close Date: {deal.closeDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">MRR: {deal.appMetrics.mrr}</p>
                          <p className="text-sm text-muted-foreground">Growth: {deal.appMetrics.growth}</p>
                          <p className="text-sm text-muted-foreground">Last Activity: {deal.lastActivity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Probability:</span>
                        <Progress value={deal.probability} className="h-2 w-32" />
                        <span className={`text-sm font-medium ${getProbabilityColor(deal.probability)}`}>
                          {deal.probability}%
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deals" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {deals.map((deal) => (
              <Card key={deal.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onDealSelect(deal)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{deal.name}</h3>
                        <Badge className={getStageColor(deal.stage)}>
                          {deal.stage}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {deal.contact} • {deal.company} • ${deal.value.toLocaleString()}/year
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{deal.probability}% probability</p>
                      <p className="text-xs text-muted-foreground">{deal.nextAction}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Win Rate</p>
                    <p className="text-2xl font-semibold">28%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Deal Size</p>
                    <p className="text-2xl font-semibold">$4.2K</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Sales Cycle</p>
                    <p className="text-2xl font-semibold">28 days</p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Deals</p>
                    <p className="text-2xl font-semibold">29</p>
                  </div>
                  <Users className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pipeline Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pipelineStages.map((stage, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{stage.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {stage.deals} deals • ${(stage.value / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <Progress value={stage.probability} className="h-2" />
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