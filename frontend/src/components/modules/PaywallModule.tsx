import { PaywallMain } from './paywall/PaywallMain';
import { PaywallDetail } from './paywall/PaywallDetail';
import { PaywallComparison } from './paywall/PaywallComparison';

interface PaywallModuleProps {
  subPage: string;
  selectedApp: any;
  onSubPageChange: (page: string, appData?: any) => void;
}

export function PaywallModule({ subPage, selectedApp, onSubPageChange }: PaywallModuleProps) {
  switch (subPage) {
    case 'detail':
      return (
        <PaywallDetail 
          app={selectedApp}
          onBack={() => onSubPageChange('')}
        />
      );
    case 'comparison':
      return (
        <PaywallComparison 
          onBack={() => onSubPageChange('')}
        />
      );
    default:
      return (
        <PaywallMain 
          onAppSelect={(app) => onSubPageChange('detail', app)}
          onComparisonSelect={() => onSubPageChange('comparison')}
        />
      );
  }
}