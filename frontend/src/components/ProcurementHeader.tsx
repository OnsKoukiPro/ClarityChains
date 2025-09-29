import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Bell, Search, Plus, Filter, Download } from 'lucide-react';

export default function ProcurementHeader() {
  return (
    <header className="border-b border-border bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search RFX, suppliers, or projects..."
              className="pl-10 bg-background"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Button size="sm">
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