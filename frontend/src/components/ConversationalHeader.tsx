import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  SidebarTrigger,
} from './ui/sidebar';
import {
  LayoutDashboard,
  Bell,
  Search,
  Sparkles,
} from 'lucide-react';
import { Logo } from './Logo';

interface ConversationalHeaderProps {
  onNavigate?: (view: string) => void;
}

export default function ConversationalHeader({ onNavigate }: ConversationalHeaderProps) {
  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Logo size="sm" />
        <Badge variant="outline" className="gap-1 text-xs">
          <Sparkles className="w-3 h-3" />
          Clare AI
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Search className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate?.('dashboard')}
          className="gap-2"
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard View
        </Button>
      </div>
    </header>
  );
}