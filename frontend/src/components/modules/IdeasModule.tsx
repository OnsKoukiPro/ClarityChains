import { IdeasMain } from './ideas/IdeasMain';
import { IdeaDetail } from './ideas/IdeaDetail';

interface IdeasModuleProps {
  subPage: string;
  selectedApp: any;
  onSubPageChange: (page: string, appData?: any) => void;
}

export function IdeasModule({ subPage, selectedApp, onSubPageChange }: IdeasModuleProps) {
  switch (subPage) {
    case 'detail':
      return (
        <IdeaDetail 
          idea={selectedApp}
          onBack={() => onSubPageChange('')}
        />
      );
    default:
      return (
        <IdeasMain 
          onIdeaSelect={(idea) => onSubPageChange('detail', idea)}
        />
      );
  }
}