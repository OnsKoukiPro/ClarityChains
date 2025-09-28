import { MarketsMain } from './markets/MarketsMain';
import { MarketDetail } from './markets/MarketDetail';
import { MarketDiscovery } from './markets/MarketDiscovery';

interface MarketsModuleProps {
  subPage: string;
  selectedApp: any;
  onSubPageChange: (page: string, appData?: any) => void;
}

export function MarketsModule({ subPage, selectedApp, onSubPageChange }: MarketsModuleProps) {
  switch (subPage) {
    case 'detail':
      return (
        <MarketDetail 
          market={selectedApp}
          onBack={() => onSubPageChange('')}
        />
      );
    case 'discovery':
      return (
        <MarketDiscovery 
          onBack={() => onSubPageChange('')}
          onMarketSelect={(market) => onSubPageChange('detail', market)}
        />
      );
    default:
      return (
        <MarketsMain 
          onMarketSelect={(market) => onSubPageChange('detail', market)}
          onDiscoverySelect={() => onSubPageChange('discovery')}
        />
      );
  }
}