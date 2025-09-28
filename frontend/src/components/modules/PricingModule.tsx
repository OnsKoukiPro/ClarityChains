import { PricingMain } from './pricing/PricingMain';
import { PricingAnalysis } from './pricing/PricingAnalysis';
import { PricingOptimization } from './pricing/PricingOptimization';

interface PricingModuleProps {
  subPage: string;
  selectedApp: any;
  onSubPageChange: (page: string, appData?: any) => void;
}

export function PricingModule({ subPage, selectedApp, onSubPageChange }: PricingModuleProps) {
  switch (subPage) {
    case 'analysis':
      return (
        <PricingAnalysis 
          app={selectedApp}
          onBack={() => onSubPageChange('')}
        />
      );
    case 'optimization':
      return (
        <PricingOptimization 
          app={selectedApp}
          onBack={() => onSubPageChange('')}
        />
      );
    default:
      return (
        <PricingMain 
          onAnalysisSelect={(app) => onSubPageChange('analysis', app)}
          onOptimizationSelect={(app) => onSubPageChange('optimization', app)}
        />
      );
  }
}