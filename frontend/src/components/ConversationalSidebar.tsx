import React from 'react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import {
  Plus,
  MessageSquare,
  Clock,
  FolderOpen,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';

interface ConversationalSidebarProps {
  onNavigate?: (view: string) => void;
}

export default function ConversationalSidebar({ onNavigate }: ConversationalSidebarProps) {
  const recentConversations = [
    { id: '1', title: 'Q3 Office Supplies RFQ', date: 'Today', unread: 2 },
    { id: '2', title: 'IT Equipment Analysis', date: 'Yesterday', unread: 0 },
    { id: '3', title: 'Logistics Provider Comparison', date: '2 days ago', unread: 0 },
    { id: '4', title: 'Marketing Services RFP', date: 'Nov 14', unread: 0 },
    { id: '5', title: 'Manufacturing Parts Review', date: 'Nov 13', unread: 0 },
  ];

  const recentRFXs = [
    { id: '1', title: 'RFQ-2024-089', status: 'active', type: 'RFQ' },
    { id: '2', title: 'RFP-2024-034', status: 'analysis', type: 'RFP' },
    { id: '3', title: 'RFI-2024-012', status: 'draft', type: 'RFI' },
  ];

  return (
    <div className="w-64 border-r bg-background flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <Button className="w-full justify-start gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => onNavigate?.('conversational')}>
          <Plus className="w-4 h-4" />
          New Conversation
        </Button>
      </div>

      {/* Main Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Recent Conversations */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm text-muted-foreground">Recent</h3>
            </div>
            <div className="space-y-1">
              {recentConversations.map((conv) => (
                <button
                  key={conv.id}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-muted transition-colors text-left group"
                >
                  <MessageSquare className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{conv.title}</p>
                    <p className="text-xs text-muted-foreground">{conv.date}</p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge variant="default" className="h-5 w-5 p-0 flex items-center justify-center text-xs bg-blue-600">
                      {conv.unread}
                    </Badge>
                  )}
                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Active RFXs */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FolderOpen className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm text-muted-foreground">Active RFXs</h3>
            </div>
            <div className="space-y-1">
              {recentRFXs.map((rfx) => (
                <button
                  key={rfx.id}
                  onClick={() => onNavigate?.('dashboard')}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-muted transition-colors text-left group"
                >
                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{rfx.title}</p>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs h-4 px-1">
                        {rfx.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">• {rfx.status}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Quick Links */}
          <div>
            <div className="space-y-1">
              <button
                onClick={() => onNavigate?.('dashboard')}
                className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-muted transition-colors text-left"
              >
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">All Projects</span>
              </button>
              <button className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-muted transition-colors text-left">
                <Settings className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Settings</span>
              </button>
              <button className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-muted transition-colors text-left">
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Help & Support</span>
              </button>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">Procurement Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}