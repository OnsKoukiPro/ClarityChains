import { ExplorerMain } from './explorer/ExplorerMain';
import { AppDetail } from './explorer/AppDetail';

interface ExplorerModuleProps {
  subPage: string;
  selectedApp: any;
  onSubPageChange: (page: string, appData?: any) => void;
}

export function ExplorerModule({ subPage, selectedApp, onSubPageChange }: ExplorerModuleProps) {
  if (subPage === 'detail' && selectedApp) {
    return <AppDetail app={selectedApp} onBack={() => onSubPageChange('')} />;
  }
  
  return <ExplorerMain onAppSelect={(app) => onSubPageChange('detail', app)} />;
}