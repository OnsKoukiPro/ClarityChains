import { ASOMain } from './aso/ASOMain';
import { ASODetail } from './aso/ASODetail';
import { ASOOptimization } from './aso/ASOOptimization';

interface ASOModuleProps {
  subPage: string;
  selectedApp: any;
  onSubPageChange: (page: string, appData?: any) => void;
}

export function ASOModule({ subPage, selectedApp, onSubPageChange }: ASOModuleProps) {
  switch (subPage) {
    case 'detail':
      // Handle copy generator special case
      if (selectedApp?.type === 'generator') {
        return (
          <ASOOptimization 
            onBack={() => onSubPageChange('')}
          />
        );
      }
      return (
        <ASODetail 
          app={selectedApp}
          onBack={() => onSubPageChange('')}
        />
      );
    default:
      return (
        <ASOMain 
          onAppSelect={(app) => onSubPageChange('detail', app)}
        />
      );
  }
}