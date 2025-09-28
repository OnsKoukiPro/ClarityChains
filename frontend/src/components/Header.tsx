import { Badge } from './ui/badge';
import { Star } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
  workflowBadge?: {
    name: string;
    step: number;
    total: number;
  };
  appBadge?: {
    name: string;
    category: string;
    rating: number;
  };
}

export function Header({ title, subtitle, workflowBadge, appBadge }: HeaderProps) {
  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-semibold">{title}</h1>
            {workflowBadge && (
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                {workflowBadge.name} - Step {workflowBadge.step}/{workflowBadge.total}
              </Badge>
            )}
            {appBadge && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-primary/20 bg-primary/5">
                  📱 {appBadge.name}
                </Badge>
                <Badge variant="outline" className="border-muted-foreground/20">
                  {appBadge.category}
                </Badge>
                <Badge variant="outline" className="border-yellow-300 bg-yellow-50 text-yellow-700">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  {appBadge.rating}
                </Badge>
              </div>
            )}
          </div>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm font-medium">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}