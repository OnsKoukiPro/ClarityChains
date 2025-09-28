import { ReviewsMain } from './reviews/ReviewsMain';
import { ReviewsAnalysis } from './reviews/ReviewsAnalysis';
import { ReviewsSentiment } from './reviews/ReviewsSentiment';
import { ReviewsCategories } from './reviews/ReviewsCategories';
import { ReviewsCompetitive } from './reviews/ReviewsCompetitive';
import { ReviewsMonitoring } from './reviews/ReviewsMonitoring';

interface ReviewsModuleProps {
  subPage: string;
  selectedApp: any;
  onSubPageChange: (page: string, appData?: any) => void;
}

export function ReviewsModule({ subPage, selectedApp, onSubPageChange }: ReviewsModuleProps) {
  switch (subPage) {
    case 'analysis':
      return (
        <ReviewsAnalysis 
          app={selectedApp}
          onBack={() => onSubPageChange('')}
          onSentimentView={() => onSubPageChange('sentiment', selectedApp)}
          onCategoriesView={() => onSubPageChange('categories', selectedApp)}
        />
      );
    case 'sentiment':
      return (
        <ReviewsSentiment 
          app={selectedApp}
          onBack={() => onSubPageChange('analysis', selectedApp)}
        />
      );
    case 'categories':
      return (
        <ReviewsCategories 
          app={selectedApp}
          onBack={() => onSubPageChange('analysis', selectedApp)}
        />
      );
    case 'competitive':
      return (
        <ReviewsCompetitive 
          onBack={() => onSubPageChange('')}
        />
      );
    case 'monitoring':
      return (
        <ReviewsMonitoring 
          onBack={() => onSubPageChange('')}
        />
      );
    default:
      return (
        <ReviewsMain 
          onAnalysisSelect={(app) => onSubPageChange('analysis', app)}
          onCompetitiveView={() => onSubPageChange('competitive')}
          onMonitoringView={() => onSubPageChange('monitoring')}
        />
      );
  }
}