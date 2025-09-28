import { DataIngestion } from './learning/DataIngestion';
import { PatternRecognition } from './learning/PatternRecognition';
import { FeedbackLoop } from './learning/FeedbackLoop';
import { KnowledgeGraph } from './learning/KnowledgeGraph';
import { PredictiveAnalytics } from './learning/PredictiveAnalytics';
import { ModelOptimization } from './learning/ModelOptimization';
import { IntelligenceAmplification } from './learning/IntelligenceAmplification';
import { LearningMain } from './learning/LearningMain';

interface LearningModuleProps {
  subPage: string;
  selectedModel?: any;
  selectedPattern?: any;
  onSubPageChange: (page: string, data?: any) => void;
}

export function LearningModule({ subPage, selectedModel, selectedPattern, onSubPageChange }: LearningModuleProps) {
  switch (subPage) {
    case 'data':
      return (
        <DataIngestion 
          onBack={() => onSubPageChange('')}
        />
      );
    case 'patterns':
      return (
        <PatternRecognition 
          selectedModel={selectedModel}
          onModelSelect={(model) => onSubPageChange('patterns', model)}
          onBack={() => onSubPageChange('')}
        />
      );
    case 'feedback':
      return (
        <FeedbackLoop 
          onBack={() => onSubPageChange('')}
        />
      );
    case 'knowledge':
      return (
        <KnowledgeGraph 
          selectedPattern={selectedPattern}
          onPatternSelect={(pattern) => onSubPageChange('knowledge', pattern)}
          onBack={() => onSubPageChange('')}
        />
      );
    case 'prediction':
      return (
        <PredictiveAnalytics 
          onBack={() => onSubPageChange('')}
        />
      );
    case 'optimization':
      return (
        <ModelOptimization 
          onBack={() => onSubPageChange('')}
        />
      );
    case 'amplification':
      return (
        <IntelligenceAmplification 
          onBack={() => onSubPageChange('')}
        />
      );
    default:
      return (
        <LearningMain 
          onNavigate={(page, data) => onSubPageChange(page, data)}
        />
      );
  }
}