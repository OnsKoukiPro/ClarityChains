import { FeaturesMain } from './features/FeaturesMain';
import { FeatureComparison } from './features/FeatureComparison';
import { FeaturePrioritizer } from './features/FeaturePrioritizer';

interface FeaturesModuleProps {
  subPage: string;
  selectedApp: any;
  onSubPageChange: (page: string, appData?: any) => void;
}

export function FeaturesModule({ subPage, selectedApp, onSubPageChange }: FeaturesModuleProps) {
  switch (subPage) {
    case 'comparison':
      return (
        <FeatureComparison 
          category={selectedApp?.category}
          onBack={() => onSubPageChange('')}
        />
      );
    case 'prioritizer':
      return (
        <FeaturePrioritizer 
          onBack={() => onSubPageChange('')}
        />
      );
    default:
      return (
        <FeaturesMain 
          onComparisonSelect={(category) => onSubPageChange('comparison', { category })}
          onPrioritizerSelect={() => onSubPageChange('prioritizer')}
        />
      );
  }
}