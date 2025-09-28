import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { 
  ArrowLeft, 
  Download, 
  Target,
  TrendingUp,
  Clock,
  Users,
  DollarSign,
  CheckCircle
} from 'lucide-react';

interface CrossAnalysisStrategyProps {
  app: any;
  onBack: () => void;
}

const strategicInitiatives = [
  {
    title: 'Mobile Experience Revolution',
    priority: 'Critical',
    impact: 'High',
    effort: 'High',
    timeline: '3-6 months',
    investment: '$150K-$300K',
    roi: '340%',
    modules: ['Creative', 'Reviews', 'Explorer'],
    description: 'Complete mobile app redesign and optimization based on cross-module insights',
    phases: [
      {
        name: 'Phase 1: UX Research & Design',
        duration: '4 weeks',
        tasks: ['User journey mapping', 'Mobile-first design system', 'Prototype development'],
        deliverables: ['Design system', 'Interactive prototypes', 'User testing results']
      },
      {
        name: 'Phase 2: Core Development',
        duration: '8 weeks',
        tasks: ['Native mobile components', 'Performance optimization', 'Offline functionality'],
        deliverables: ['Beta app', 'Performance benchmarks', 'Testing framework']
      },
      {
        name: 'Phase 3: Testing & Launch',
        duration: '4 weeks',
        tasks: ['Quality assurance', 'Beta testing', 'App store optimization'],
        deliverables: ['Production app', 'Launch plan', 'Success metrics']
      }
    ]
  },
  {
    title: 'AI Personalization Engine',
    priority: 'High',
    impact: 'High',
    effort: 'Medium',
    timeline: '4-8 months',
    investment: '$200K-$400K',
    roi: '280%',
    modules: ['Trends', 'Features', 'Paywall'],
    description: 'Advanced AI system for personalized user experiences and recommendations',
    phases: [
      {
        name: 'Phase 1: AI Foundation',
        duration: '6 weeks',
        tasks: ['Data pipeline setup', 'ML model development', 'Recommendation engine'],
        deliverables: ['AI infrastructure', 'Base models', 'API framework']
      },
      {
        name: 'Phase 2: Personalization Features',
        duration: '8 weeks',
        tasks: ['Smart recommendations', 'Predictive insights', 'Adaptive UI'],
        deliverables: ['Personalization system', 'User analytics', 'A/B testing']
      },
      {
        name: 'Phase 3: Advanced AI',
        duration: '6 weeks',
        tasks: ['Natural language processing', 'Voice commands', 'Contextual awareness'],
        deliverables: ['Advanced AI features', 'Voice interface', 'Context engine']
      }
    ]
  },
  {
    title: 'Global Market Expansion',
    priority: 'Medium',
    impact: 'Medium',
    effort: 'Medium',
    timeline: '6-12 months',
    investment: '$100K-$250K',
    roi: '190%',
    modules: ['Markets', 'ASO', 'Features'],
    description: 'Strategic expansion into European and APAC markets with localization',
    phases: [
      {
        name: 'Phase 1: Market Research',
        duration: '4 weeks',
        tasks: ['Market analysis', 'Competitor research', 'Localization planning'],
        deliverables: ['Market reports', 'Localization strategy', 'Partner identification']
      },
      {
        name: 'Phase 2: Localization',
        duration: '12 weeks',
        tasks: ['Translation & adaptation', 'Cultural customization', 'Local partnerships'],
        deliverables: ['Localized apps', 'Cultural adaptations', 'Partnership agreements']
      },
      {
        name: 'Phase 3: Launch & Scale',
        duration: '8 weeks',
        tasks: ['Market entry', 'Marketing campaigns', 'Growth optimization'],
        deliverables: ['Market presence', 'User acquisition', 'Revenue growth']
      }
    ]
  }
];

const riskAssessment = [
  {
    risk: 'Technical complexity overwhelming team',
    probability: 'Medium',
    impact: 'High',
    mitigation: 'Phased approach, external expertise, training programs',
    monitoring: 'Weekly progress reviews, technical debt tracking'
  },
  {
    risk: 'Market conditions change during development',
    probability: 'Low',
    impact: 'Medium',
    mitigation: 'Agile methodology, regular market monitoring, pivot capability',
    monitoring: 'Monthly market analysis, competitor tracking'
  },
  {
    risk: 'User adoption slower than expected',
    probability: 'Medium',
    impact: 'Medium',
    mitigation: 'Extensive user testing, gradual rollout, feedback loops',
    monitoring: 'User metrics tracking, satisfaction surveys'
  }
];

const successMetrics = [
  {
    category: 'User Experience',
    metrics: [
      { name: 'Mobile app rating', target: '4.5+ stars', current: '3.8 stars' },
      { name: 'User retention (30-day)', target: '65%', current: '45%' },
      { name: 'Feature adoption rate', target: '80%', current: '60%' }
    ]
  },
  {
    category: 'Business Impact',
    metrics: [
      { name: 'Monthly recurring revenue', target: '$50K', current: '$35K' },
      { name: 'Premium conversion rate', target: '18%', current: '12%' },
      { name: 'Customer lifetime value', target: '$120', current: '$85' }
    ]
  },
  {
    category: 'Market Position',
    metrics: [
      { name: 'Market share', target: '8%', current: '5%' },
      { name: 'Brand awareness', target: '35%', current: '22%' },
      { name: 'Competitive advantage', target: 'Strong', current: 'Moderate' }
    ]
  }
];

export function CrossAnalysisStrategy({ app, onBack }: CrossAnalysisStrategyProps) {
  const [activeTab, setActiveTab] = useState('initiatives');

  // Default app data if none provided
  const appData = app || {
    name: 'MindfulMeals',
    category: 'Health & Fitness'
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
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

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cross Analysis Report
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            📋 Export Strategy
          </Button>
        </div>
      </div>

      {/* Page Title */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🎯 Strategic Implementation Plan</CardTitle>
          <p className="text-muted-foreground">
            Cross-module strategic roadmap for {appData.name} based on AI intelligence analysis
          </p>
        </CardHeader>
      </Card>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="initiatives">Strategic Initiatives</TabsTrigger>
          <TabsTrigger value="timeline">Implementation Timeline</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
          <TabsTrigger value="metrics">Success Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="initiatives" className="space-y-6">
          {/* Strategic Initiatives */}
          <div className="space-y-6">
            {strategicInitiatives.map((initiative, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      {initiative.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(initiative.priority)}>
                        {initiative.priority}
                      </Badge>
                      <Badge className={getImpactColor(initiative.impact)}>
                        {initiative.impact} Impact
                      </Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{initiative.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <Clock className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Timeline</p>
                      <p className="font-medium">{initiative.timeline}</p>
                    </div>
                    <div className="text-center">
                      <DollarSign className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Investment</p>
                      <p className="font-medium">{initiative.investment}</p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Expected ROI</p>
                      <p className="font-medium text-green-600">{initiative.roi}</p>
                    </div>
                    <div className="text-center">
                      <Users className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Team Size</p>
                      <p className="font-medium">5-8 people</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="font-medium mb-2">Connected Modules:</h5>
                    <div className="flex gap-2">
                      {initiative.modules.map((module, idx) => (
                        <Badge key={idx} variant="outline">{module}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-medium">Implementation Phases:</h5>
                    {initiative.phases.map((phase, phaseIdx) => (
                      <div key={phaseIdx} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h6 className="font-medium">{phase.name}</h6>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium mb-1">Tasks:</p>
                            <ul className="text-sm space-y-1">
                              {phase.tasks.map((task, taskIdx) => (
                                <li key={taskIdx} className="flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                  {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">Deliverables:</p>
                            <ul className="text-sm space-y-1">
                              {phase.deliverables.map((deliverable, delIdx) => (
                                <li key={delIdx} className="flex items-start gap-2">
                                  <span className="text-blue-500 mt-0.5">•</span>
                                  {deliverable}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          {/* Implementation Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>📅 12-Month Implementation Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <p className="text-sm text-muted-foreground">Interactive Gantt Chart</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Showing parallel execution of strategic initiatives
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">Q1 2025</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Mobile UX research</li>
                      <li>• AI foundation setup</li>
                      <li>• Market research</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">Q2 2025</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Mobile app development</li>
                      <li>• AI personalization</li>
                      <li>• Localization start</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">Q3 2025</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Mobile app launch</li>
                      <li>• Advanced AI features</li>
                      <li>• Market expansion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle>⚠️ Risk Assessment & Mitigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskAssessment.map((risk, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <h5 className="font-medium mb-2">{risk.risk}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="text-sm font-medium">Probability:</span>
                        <Badge className={getRiskColor(risk.probability)} size="sm">
                          {risk.probability}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Impact:</span>
                        <Badge className={getRiskColor(risk.impact)} size="sm">
                          {risk.impact}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-green-600">Mitigation:</span>
                        <p className="text-sm text-green-700">{risk.mitigation}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-600">Monitoring:</span>
                        <p className="text-sm text-blue-700">{risk.monitoring}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          {/* Success Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>📈 Success Metrics & KPIs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {successMetrics.map((category, index) => (
                  <div key={index}>
                    <h4 className="font-medium mb-3">{category.category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {category.metrics.map((metric, metricIdx) => (
                        <div key={metricIdx} className="p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">{metric.name}</h5>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Current:</span>
                              <span className="text-sm">{metric.current}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Target:</span>
                              <span className="text-sm font-medium text-green-600">{metric.target}</span>
                            </div>
                          </div>
                        </div>
                      ))}
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