import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Circle, 
  Download,
  Save,
  Zap,
  TrendingUp,
  Target
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  module: string;
  subPage?: string;
  description: string;
  completed: boolean;
  current: boolean;
}

interface WorkflowData {
  selectedApp?: any;
  selectedMarket?: any;
  selectedCategory?: string;
  analysisData?: any;
  [key: string]: any;
}

interface WorkflowManagerProps {
  activeWorkflow: string | null;
  currentStep: number;
  workflowData: WorkflowData;
  onStepChange: (step: number, module: string, subPage?: string, data?: any) => void;
  onWorkflowComplete: (workflowId: string, data: WorkflowData) => void;
  onWorkflowExit: () => void;
}

const workflows = {
  'app-intelligence': {
    name: 'Complete App Intelligence',
    description: 'Comprehensive analysis across all intelligence modules',
    steps: [
      { id: 'select-app', title: 'Select App', module: 'explorer', description: 'Choose app for analysis' },
      { id: 'overview', title: 'Basic Overview', module: 'explorer', subPage: 'detail', description: 'App performance overview' },
      { id: 'creative', title: 'Creative Analysis', module: 'creative', subPage: 'detail', description: 'Visual performance analysis' },
      { id: 'aso', title: 'ASO Analysis', module: 'aso', subPage: 'detail', description: 'App store optimization' },
      { id: 'paywall', title: 'Paywall Study', module: 'paywall', subPage: 'detail', description: 'Monetization analysis' },
      { id: 'features', title: 'Feature Comparison', module: 'features', subPage: 'comparison', description: 'Feature competitive analysis' },
      { id: 'market', title: 'Market Opportunity', module: 'markets', subPage: 'detail', description: 'Market expansion analysis' },
      { id: 'reviews', title: 'Review Intelligence', module: 'reviews', subPage: 'analysis', description: 'User sentiment analysis' },
      { id: 'cross-analysis', title: 'AI Summary', module: 'cross-analysis', subPage: 'report', description: 'Cross-module insights' },
      { id: 'recommendations', title: 'Recommendations', module: 'cross-analysis', subPage: 'strategy', description: 'Strategic planning' },
      { id: 'export', title: 'Export Report', module: 'cross-analysis', subPage: 'report', description: 'Download complete analysis' }
    ]
  },
  'market-entry': {
    name: 'Market Entry Strategy',
    description: 'Comprehensive market expansion planning workflow',
    steps: [
      { id: 'select-market', title: 'Select Region', module: 'markets', description: 'Choose target market' },
      { id: 'market-analysis', title: 'Market Analysis', module: 'markets', subPage: 'detail', description: 'Market size and demographics' },
      { id: 'competition', title: 'Competition Study', module: 'features', subPage: 'comparison', description: 'Competitive landscape' },
      { id: 'feature-gaps', title: 'Feature Gaps', module: 'features', subPage: 'prioritizer', description: 'Feature development needs' },
      { id: 'paywall-strategy', title: 'Paywall Strategy', module: 'paywall', subPage: 'comparison', description: 'Monetization localization' },
      { id: 'creative-local', title: 'Creative Localization', module: 'creative', subPage: 'comparison', description: 'Visual adaptation needs' },
      { id: 'aso-local', title: 'ASO Localization', module: 'aso', subPage: 'detail', description: 'Local keyword strategy' },
      { id: 'entry-plan', title: 'Entry Plan', module: 'markets', subPage: 'detail', description: 'Go-to-market strategy' },
      { id: 'investment', title: 'Investment Requirements', module: 'pricing', subPage: 'analysis', description: 'Budget and resource planning' },
      { id: 'timeline', title: 'Timeline & Milestones', module: 'cross-analysis', subPage: 'strategy', description: 'Implementation roadmap' },
      { id: 'export-plan', title: 'Export Plan', module: 'markets', subPage: 'detail', description: 'Download market entry plan' }
    ]
  },
  'competitive-intelligence': {
    name: 'Competitive Intelligence',
    description: 'Deep competitive analysis and strategic positioning',
    steps: [
      { id: 'select-category', title: 'Select Category', module: 'features', description: 'Choose competitive category' },
      { id: 'feature-matrix', title: 'Feature Matrix', module: 'features', subPage: 'comparison', description: 'Side-by-side feature analysis' },
      { id: 'gap-analysis', title: 'Gap Analysis', module: 'features', subPage: 'prioritizer', description: 'Competitive gaps identification' },
      { id: 'creative-bench', title: 'Creative Benchmarking', module: 'creative', subPage: 'comparison', description: 'Visual competitive analysis' },
      { id: 'paywall-comp', title: 'Paywall Comparison', module: 'paywall', subPage: 'comparison', description: 'Monetization benchmarking' },
      { id: 'market-position', title: 'Market Position', module: 'markets', subPage: 'discovery', description: 'Competitive positioning' },
      { id: 'review-intel', title: 'Review Intelligence', module: 'reviews', subPage: 'competitive', description: 'User sentiment comparison' },
      { id: 'dev-priorities', title: 'Development Priorities', module: 'features', subPage: 'prioritizer', description: 'Strategic roadmap' },
      { id: 'strategy-rec', title: 'Strategic Recommendations', module: 'cross-analysis', subPage: 'competitive', description: 'Competitive strategy plan' }
    ]
  }
};

export function WorkflowManager({ 
  activeWorkflow, 
  currentStep, 
  workflowData, 
  onStepChange, 
  onWorkflowComplete,
  onWorkflowExit 
}: WorkflowManagerProps) {
  if (!activeWorkflow || !workflows[activeWorkflow as keyof typeof workflows]) {
    return null;
  }

  const workflow = workflows[activeWorkflow as keyof typeof workflows];
  const steps = workflow.steps.map((step, index) => ({
    ...step,
    completed: index < currentStep,
    current: index === currentStep
  }));
  
  const progress = ((currentStep + 1) / workflow.steps.length) * 100;
  const currentStepData = workflow.steps[currentStep];
  const isLastStep = currentStep === workflow.steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNextStep = () => {
    if (isLastStep) {
      onWorkflowComplete(activeWorkflow, workflowData);
    } else {
      const nextStep = workflow.steps[currentStep + 1];
      onStepChange(currentStep + 1, nextStep.module, nextStep.subPage);
    }
  };

  const handlePreviousStep = () => {
    if (!isFirstStep) {
      const prevStep = workflow.steps[currentStep - 1];
      onStepChange(currentStep - 1, prevStep.module, prevStep.subPage);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    const step = workflow.steps[stepIndex];
    onStepChange(stepIndex, step.module, step.subPage);
  };

  const getWorkflowIcon = (workflowId: string) => {
    switch (workflowId) {
      case 'app-intelligence': return <Zap className="w-5 h-5" />;
      case 'market-entry': return <TrendingUp className="w-5 h-5" />;
      case 'competitive-intelligence': return <Target className="w-5 h-5" />;
      default: return <Circle className="w-5 h-5" />;
    }
  };

  return (
    <Card className="mb-6 border-primary/20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              {getWorkflowIcon(activeWorkflow)}
            </div>
            <div>
              <CardTitle className="text-lg">{workflow.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{workflow.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-primary">
              Step {currentStep + 1} of {workflow.steps.length}
            </Badge>
            <Button variant="ghost" size="sm" onClick={onWorkflowExit}>
              Exit Workflow
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>{currentStepData.title}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workflow Steps */}
          <div className="lg:col-span-2">
            <h4 className="font-medium mb-3">Workflow Progress</h4>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                    step.current 
                      ? 'bg-primary/10 border border-primary/20' 
                      : step.completed 
                        ? 'bg-green-50 hover:bg-green-100 dark:bg-green-950/20' 
                        : 'bg-muted/50 hover:bg-muted'
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  <div className="flex-shrink-0">
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : step.current ? (
                      <Circle className="w-5 h-5 text-primary fill-current" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${step.current ? 'text-primary' : ''}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {step.module}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Info & Actions */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Current Step</h4>
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium text-sm mb-1">{currentStepData.title}</h5>
                <p className="text-xs text-muted-foreground mb-3">{currentStepData.description}</p>
                <Badge variant="secondary" className="text-xs">
                  {currentStepData.module} module
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Workflow Actions</h4>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePreviousStep}
                  disabled={isFirstStep}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleNextStep}
                  className="flex-1"
                >
                  {isLastStep ? (
                    <>
                      <Download className="w-4 h-4 mr-1" />
                      Complete
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Progress
              </Button>
            </div>

            {workflowData.selectedApp && (
              <div>
                <h4 className="font-medium text-sm mb-2">Analysis Context</h4>
                <div className="p-3 border rounded-lg text-sm">
                  <p className="font-medium">{workflowData.selectedApp.name}</p>
                  <p className="text-muted-foreground">{workflowData.selectedApp.category}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}