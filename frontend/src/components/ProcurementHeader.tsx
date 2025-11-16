import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Bell, Search, Plus, Filter, Download } from 'lucide-react';

interface ProcurementHeaderProps {
  onNavigate?: (view: string) => void;
}

export default function ProcurementHeader({ onNavigate }: ProcurementHeaderProps) {
  return (
    <header className="border-b border-border bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-xl mr-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search RFX, suppliers, or projects..."
              className="pl-10 pr-10 bg-background w-full border border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button size="sm" onClick={() => onNavigate?.('create-rfx')}>
            <Plus className="w-4 h-4 mr-2" />
            New RFX
          </Button>

          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <div className="relative">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                3
              </Badge>
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium">Sarah Chen</p>
              <p className="text-xs text-muted-foreground">Procurement Manager</p>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/placeholder/32/32" alt="Sarah Chen" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}