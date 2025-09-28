import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  MessageSquare,
  X,
  Maximize2,
  Send,
  Mic,
  Paperclip,
  Lightbulb
} from 'lucide-react';

interface FloatingAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigateToAssistant: () => void;
}

const quickSuggestions = [
  "What are the top trends in productivity apps?",
  "Compare Notion vs productivity apps",
  "What pricing works best for task managers?",
  "Show me apps similar to Todoist"
];

const quickActions = [
  { label: "Analyze Any App", icon: "📱" },
  { label: "Generate Report", icon: "📊" },
  { label: "Get Ideas", icon: "💡" },
  { label: "Check Trends", icon: "📈" },
  { label: "Pricing Analysis", icon: "💰" },
  { label: "Search Apps", icon: "🔍" }
];

export function FloatingAssistant({ isOpen, onToggle, onNavigateToAssistant }: FloatingAssistantProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Navigate to full assistant with the query
      onNavigateToAssistant();
    }
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onToggle}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
          size="lg"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 shadow-2xl border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              🤖 ClarityChains AI Assistant
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onNavigateToAssistant}
                className="h-8 w-8 p-0"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Quick Status */}
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-blue-900 text-sm">
              👋 Ready to help! Ask me about app trends, market insights, or competitive analysis.
            </p>
          </div>

          {/* Quick Suggestions */}
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              💡 Quick Questions
            </h4>
            <div className="space-y-2">
              {quickSuggestions.slice(0, 2).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickSuggestion(suggestion)}
                  className="w-full text-left p-2 text-sm border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  "{suggestion}"
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="font-medium mb-2">⚡ Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.slice(0, 4).map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-auto p-2 flex-col gap-1"
                  onClick={onNavigateToAssistant}
                >
                  <span className="text-lg">{action.icon}</span>
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                size="sm"
                className="px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Button variant="ghost" size="sm" className="h-6 px-2">
                <Mic className="w-3 h-3 mr-1" />
                Voice
              </Button>
              <Button variant="ghost" size="sm" className="h-6 px-2">
                <Paperclip className="w-3 h-3 mr-1" />
                Attach
              </Button>
              <Button variant="ghost" size="sm" className="h-6 px-2">
                <Lightbulb className="w-3 h-3 mr-1" />
                Ideas
              </Button>
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="link"
              size="sm"
              onClick={onNavigateToAssistant}
              className="text-xs"
            >
              Open Full Assistant →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}