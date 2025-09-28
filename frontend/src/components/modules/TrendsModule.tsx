import { TrendsMain } from './trends/TrendsMain';
import { TrendDetail } from './trends/TrendDetail';

interface TrendsModuleProps {
  subPage: string;
  selectedApp: any;
  onSubPageChange: (page: string, appData?: any) => void;
}

export function TrendsModule({ subPage, selectedApp, onSubPageChange }: TrendsModuleProps) {
  if (subPage === 'detail' && selectedApp) {
    return <TrendDetail app={selectedApp} onBack={() => onSubPageChange('')} />;
  }
  
  return <TrendsMain onTrendSelect={(app) => onSubPageChange('detail', app)} />;
}