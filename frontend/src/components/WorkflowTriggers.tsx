import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Zap, 
  TrendingUp, 
  Target, 
  ArrowRight,
  BarChart3,
  Globe,
  Search
} from 'lucide-react';

interface WorkflowTriggersProps {
  onStartWorkflow: (workflowId: string, initialData?: any) => void;
  context?: {
    selectedApp?: any;
    selectedMarket?: any;
    selectedCategory?: string;
  };
}

export function WorkflowTriggers({ onStartWorkflow, context }: WorkflowTriggersProps) {
  const workflows = [
    {
      id: 'app-intelligence',
      name: 'Complete App Intelligence',
      description: 'Comprehensive analysis across all modules for deep app insights',
      icon: <Zap className="w-6 h-6" />,
      color: 'text-blue-600 bg-blue-50',
      steps: 11,
      duration: '45-60 min',
      suitable: context?.selectedApp ? 'Perfect for selected app' : 'Select an app to start',
      canStart: !!context?.selectedApp
    },
    {
      id: 'market-entry',
      name: 'Market Entry Strategy',
      description: 'Strategic planning for expanding into new markets and regions',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-green-600 bg-green-50',
      steps: 11,
      duration: '60-90 min',
      suitable: context?.selectedMarket ? 'Perfect for selected market' : 'Discover untapped markets first',
      canStart: true
    },
    {
      id: 'competitive-intelligence',
      name: 'Competitive Intelligence',
      description: 'Deep competitive analysis and strategic positioning insights',
      icon: <Target className="w-6 h-6" />,
      color: 'text-purple-600 bg-purple-50',
      steps: 9,
      duration: '30-45 min',
      suitable: context?.selectedCategory ? `Perfect for ${context.selectedCategory}` : 'Choose a category to compare',
      canStart: true
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          🚀 Start Intelligence Workflow
        </CardTitle>
        <p className="text-muted-foreground">
          Follow guided workflows for comprehensive analysis and strategic insights
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workflows.map((workflow) => (
            <div 
              key={workflow.id}
              className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${workflow.color}`}>
                    {workflow.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{workflow.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{workflow.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>📊 {workflow.steps} steps</span>
                      <span>⏱️ {workflow.duration}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => onStartWorkflow(workflow.id, context)}
                  disabled={!workflow.canStart}
                  size="sm"
                >
                  Start Workflow
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Context:</span>
                  <Badge 
                    variant={workflow.canStart ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {workflow.suitable}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              💡
            </div>
            <div>
              <h5 className="font-medium text-blue-900 mb-1">Workflow Benefits</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Guided step-by-step analysis process</li>
                <li>• Automatic data flow between modules</li>
                <li>• Comprehensive reporting and insights</li>
                <li>• Save progress and resume anytime</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}