import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import {
  ArrowLeft,
  Search,
  TrendingUp,
  Users,
  Target,
  Phone,
  Mail,
  BarChart3,
  Zap,
  AlertCircle,
  CheckCircle,
  Eye,
  Calendar,
  FileText,
  Star
} from 'lucide-react';

interface LeadGenerationProps {
  selectedLead?: any;
  onLeadSelect: (lead: any) => void;
  onBack: () => void;
}

const leadSources = [
  { name: 'Intelligence Engine', count: 12, color: 'text-blue-600 bg-blue-50' },
  { name: 'Inbound Requests', count: 8, color: 'text-green-600 bg-green-50' },
  { name: 'Referral Program', count: 6, color: 'text-purple-600 bg-purple-50' },
  { name: 'Outbound Outreach', count: 23, color: 'text-orange-600 bg-orange-50' },
  { name: 'Content Marketing', count: 15, color: 'text-teal-600 bg-teal-50' },
  { name: 'Social Media', count: 9, color: 'text-pink-600 bg-pink-50' }
];

const leadOpportunities = [
  { level: 'High', count: 8, color: 'text-red-600 bg-red-50' },
  { level: 'Medium', count: 15, color: 'text-yellow-600 bg-yellow-50' },
  { level: 'Low', count: 18, color: 'text-green-600 bg-green-50' }
];

const leads = [
  {
    id: 1,
    name: 'TaskMaster Pro',
    contact: 'John Smith',
    email: 'john@taskmaster.com',
    company: 'Solo Developer',
    revenue: '$2.3K MRR',
    growth: '+15%',
    score: 87,
    source: 'Intelligence Engine',
    stage: 'Qualified',
    lastActivity: '2 hours ago',
    insights: 'Growing 15% monthly, ASO struggles, pricing confusion',
    painPoints: ['ASO ranking dropped 15 positions', 'Competitor launched similar features', 'User reviews mention dark mode requests'],
    budgetSignals: ['Mentioned hiring contractor', 'Asked about ROI metrics', 'Discussed scaling challenges'],
    nextActions: ['Schedule demo call', 'Send ASO case study', 'Generate ROI report']
  },
  {
    id: 2,
    name: 'FitnessFlow',
    contact: 'Sarah Johnson',
    email: 's.johnson@fitnessflow.com',
    company: 'Wellness Studio',
    revenue: '$4.8K MRR',
    growth: '+22%',
    score: 92,
    source: 'Inbound Request',
    stage: 'Demo Scheduled',
    lastActivity: '4 hours ago',
    insights: 'High engagement, budget confirmed, scaling phase',
    painPoints: ['User retention declining', 'Paywall conversion low', 'Competitor pressure'],
    budgetSignals: ['Confirmed $500/month budget', 'Mentioned growth team', 'Asked about enterprise features'],
    nextActions: ['Prepare demo materials', 'Research competitors', 'Create custom proposal']
  },
  {
    id: 3,
    name: 'MealPlanner Pro',
    contact: 'Mike Chen',
    email: 'mike@mealplanner.com',
    company: 'Food Tech Inc',
    revenue: '$1.9K MRR',
    growth: '+8%',
    score: 78,
    source: 'Referral',
    stage: 'Initial Contact',
    lastActivity: '1 day ago',
    insights: 'Early scaling, needs guidance on market positioning',
    painPoints: ['Market saturation concerns', 'Feature prioritization', 'Limited marketing budget'],
    budgetSignals: ['Bootstrapped but growing', 'Mentioned investment round', 'Asked about revenue share'],
    nextActions: ['Qualification call', 'Market analysis', 'Competitor research']
  },
  {
    id: 4,
    name: 'StudyBuddy',
    contact: 'Emily Rodriguez',
    email: 'emily@studybuddy.app',
    company: 'EduTech Startup',
    revenue: '$3.2K MRR',
    growth: '+28%',
    score: 84,
    source: 'Content Marketing',
    stage: 'Proposal Sent',
    lastActivity: '6 hours ago',
    insights: 'Fast growing, strong product-market fit, needs optimization',
    painPoints: ['Seasonal usage patterns', 'User acquisition costs', 'Feature complexity'],
    budgetSignals: ['VC backed', 'Growth team of 3', 'Asked about scaling solutions'],
    nextActions: ['Follow up on proposal', 'Schedule stakeholder call', 'Prepare implementation plan']
  }
];

export function LeadGeneration({ selectedLead, onLeadSelect, onBack }: LeadGenerationProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedScore, setSelectedScore] = useState('all');
  const [activeTab, setActiveTab] = useState('dashboard');

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'qualified': return 'text-blue-600 bg-blue-50';
      case 'demo scheduled': return 'text-purple-600 bg-purple-50';
      case 'proposal sent': return 'text-orange-600 bg-orange-50';
      case 'initial contact': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = selectedSource === 'all' || lead.source === selectedSource;
    const matchesScore = selectedScore === 'all' ||
                        (selectedScore === 'high' && lead.score >= 85) ||
                        (selectedScore === 'medium' && lead.score >= 70 && lead.score < 85) ||
                        (selectedScore === 'low' && lead.score < 70);

    return matchesSearch && matchesSource && matchesScore;
  });

  if (selectedLead) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lead Generation
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">🤖 AI Lead Score: {selectedLead.score}/100</CardTitle>
                <Badge className={selectedLead.score >= 85 ? 'text-red-600 bg-red-50' : selectedLead.score >= 70 ? 'text-yellow-600 bg-yellow-50' : 'text-green-600 bg-green-50'}>
                  {selectedLead.score >= 85 ? 'HIGH PRIORITY' : selectedLead.score >= 70 ? 'MEDIUM PRIORITY' : 'LOW PRIORITY'}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button>
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Call
                </Button>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Contact:</span> {selectedLead.contact}</p>
                    <p><span className="font-medium">Email:</span> {selectedLead.email}</p>
                    <p><span className="font-medium">Company:</span> {selectedLead.company}</p>
                    <p><span className="font-medium">App Revenue:</span> {selectedLead.revenue}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Scoring Breakdown</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>App Revenue (25 pts)</span>
                        <span className="text-green-600">✅ 22/25</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Engagement Pattern (20 pts)</span>
                        <span className="text-green-600">✅ 18/20</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Pain Points (15 pts)</span>
                        <span className="text-yellow-600">⚠️ 12/15</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Budget Signals (15 pts)</span>
                        <span className="text-green-600">✅ 13/15</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">AI Recommendation</h3>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      "High-value prospect. Focus on ASO improvements and revenue optimization.
                      Mention case study of similar app that increased MRR by 340% using ClarityChain insights."
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Pain Points</h3>
                  <div className="space-y-2">
                    {selectedLead.painPoints.map((point: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Budget Signals</h3>
                  <div className="space-y-2">
                    {selectedLead.budgetSignals.map((signal: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{signal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-3">Next Actions</h3>
              <div className="flex gap-2">
                {selectedLead.nextActions.map((action: string, index: number) => (
                  <Button key={index} variant="outline" size="sm">
                    {action}
                  </Button>
                ))}
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
          <h1 className="text-2xl font-semibold">🎯 Lead Generation Dashboard</h1>
          <p className="text-muted-foreground">AI-powered prospect identification and qualification</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sales
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="leads">Lead List</TabsTrigger>
          <TabsTrigger value="scoring">AI Scoring</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Lead Sources */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leadSources.map((source, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{source.name}</p>
                      <p className="text-2xl font-semibold">{source.count}</p>
                    </div>
                    <Badge className={source.color}>
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Opportunity Levels */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Opportunity Scoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {leadOpportunities.map((opp, index) => (
                  <div key={index} className="text-center p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">{opp.level} Priority</p>
                    <p className="text-3xl font-semibold">{opp.count}</p>
                    <Badge className={opp.color}>
                      {opp.level} Score
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="Intelligence Engine">Intelligence Engine</SelectItem>
                <SelectItem value="Inbound Request">Inbound Request</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="Content Marketing">Content Marketing</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedScore} onValueChange={setSelectedScore}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by score" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Scores</SelectItem>
                <SelectItem value="high">High (85+)</SelectItem>
                <SelectItem value="medium">Medium (70-84)</SelectItem>
                <SelectItem value="low">Low (&lt;70)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Leads List */}
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <Card key={lead.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onLeadSelect(lead)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{lead.name}</h3>
                        <Badge className={getScoreColor(lead.score)}>
                          {lead.score}/100
                        </Badge>
                        <Badge className={getStageColor(lead.stage)}>
                          {lead.stage}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Contact: {lead.contact}</p>
                          <p className="text-sm text-muted-foreground">Company: {lead.company}</p>
                          <p className="text-sm text-muted-foreground">Source: {lead.source}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Revenue: {lead.revenue}</p>
                          <p className="text-sm text-muted-foreground">Growth: {lead.growth}</p>
                          <p className="text-sm text-muted-foreground">Last Activity: {lead.lastActivity}</p>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>AI Insight:</strong> {lead.insights}
                        </p>
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>🤖 AI Lead Scoring Algorithm</CardTitle>
              <p className="text-muted-foreground">
                Automated qualification based on app performance, engagement patterns, and buying signals
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Scoring Criteria</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">App Revenue (25 pts)</span>
                        <span className="text-sm text-muted-foreground">$500+ MRR threshold</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Engagement Pattern (20 pts)</span>
                        <span className="text-sm text-muted-foreground">Platform usage & activity</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Pain Points (15 pts)</span>
                        <span className="text-sm text-muted-foreground">Identified challenges</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Budget Signals (15 pts)</span>
                        <span className="text-sm text-muted-foreground">Spending indicators</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Timing (12 pts)</span>
                        <span className="text-sm text-muted-foreground">Growth phase & urgency</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Authority (13 pts)</span>
                        <span className="text-sm text-muted-foreground">Decision-making power</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Score Ranges</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span className="text-sm">High Priority: 85-100 points</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                        <span className="text-sm">Medium Priority: 70-84 points</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-sm">Low Priority: Below 70 points</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">AI Qualification Process</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>• Analyzes app performance data from intelligence engine</p>
                    <p>• Monitors platform usage patterns and engagement levels</p>
                    <p>• Identifies pain points from user behavior and support requests</p>
                    <p>• Detects budget signals from conversations and actions</p>
                    <p>• Assesses timing based on growth phase and market conditions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}