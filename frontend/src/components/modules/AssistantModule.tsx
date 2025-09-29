import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { ScrollArea } from '../ui/scroll-area';
import {
  Send,
  Mic,
  Paperclip,
  Lightbulb,
  RefreshCw,
  Settings,
  BarChart3,
  Eye,
  TrendingUp,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: Array<{ label: string; icon: React.ReactNode; onClick: () => void }>;
}

const quickSuggestions = [
  "What are the top trends in productivity apps?",
  "Compare Notion vs productivity apps",
  "What pricing works best for task managers?",
  "Show me apps similar to Todoist",
  "Analyze TaskFlow Pro's latest performance",
  "Show me apps trending in Health & Fitness",
  "What's the best pricing for productivity apps?",
  "Generate ideas for meditation app features"
];

const quickActions = [
  { label: "Analyze Any App", icon: "📱" },
  { label: "Generate Report", icon: "📊" },
  { label: "Get Ideas", icon: "💡" },
  { label: "Check Trends", icon: "📈" },
  { label: "Pricing Analysis", icon: "💰" },
  { label: "Search Apps", icon: "🔍" }
];

const mockResponses = {
  "What are the top trends in productivity apps?": {
    content: `Based on my analysis of 1,247 productivity apps over the past 30 days, here are the key trends:

📈 **AI Integration** (+45% mentions in reviews)
Apps with AI features see 34% higher user engagement. Users particularly value AI-powered task prioritization and smart scheduling.

🎨 **Minimalist UI Design** (top 10 apps use this)
Clean, simple interfaces are outperforming complex ones by 28% in user satisfaction scores. Less cognitive load leads to better productivity outcomes.

💰 **Subscription Fatigue** (complaints up 23%)
Users prefer lifetime purchases over monthly subscriptions. Apps offering one-time payments see 67% less churn in the first 3 months.

🔗 **Calendar Integration** (most requested feature)
67% of new productivity apps now offer calendar sync. Apps with native calendar integration have 45% higher daily active usage.

🌙 **Focus & Wellbeing Features** (emerging trend)
Productivity apps adding meditation, break reminders, and focus modes see 31% increase in session duration.

Would you like me to analyze specific apps or dive deeper into any of these trends?`,
    actions: [
      { label: "📊 Show Apps", icon: <BarChart3 className="w-4 h-4" />, onClick: () => {} },
      { label: "💡 Get Ideas", icon: <Lightbulb className="w-4 h-4" />, onClick: () => {} },
      { label: "📈 Deep Dive", icon: <TrendingUp className="w-4 h-4" />, onClick: () => {} }
    ]
  },
  "Compare Notion vs productivity apps": {
    content: `Here's a comprehensive comparison of Notion against the productivity app landscape:

**Notion Performance:**
• Monthly Active Users: 20M+ (up 67% YoY)
• Revenue: ~$100M ARR (estimated)
• Market Position: #1 in all-in-one workspace category

**Key Differentiators:**
📋 **Database Functionality**: Unique among productivity apps - 89% of power users cite this as primary retention factor
🎨 **Customization Depth**: 5x more customization options than closest competitor (Airtable)
👥 **Team Collaboration**: 78% higher team adoption rate vs traditional task managers

**Competitive Landscape:**
• vs. Todoist: Notion wins on flexibility (-23% task-focused users)
• vs. Obsidian: Similar power users, Notion better for teams (+45%)
• vs. Clickup: Notion simpler onboarding (-67% feature complexity)

**Market Gaps Notion Doesn't Fill:**
🚀 **Simple Task Management**: 34% of users find Notion "too complex" for basic todos
📱 **Mobile Experience**: 28% lower mobile satisfaction vs dedicated mobile-first apps
⚡ **Speed**: 45% slower load times than lightweight alternatives

**Opportunities for Competitors:**
Focus on simplicity, mobile-first design, or specific verticals (project management, note-taking, etc.)`,
    actions: [
      { label: "📱 Analyze Notion", icon: <Eye className="w-4 h-4" />, onClick: () => {} },
      { label: "📊 Competitor Report", icon: <BarChart3 className="w-4 h-4" />, onClick: () => {} },
      { label: "💡 Gap Analysis", icon: <Lightbulb className="w-4 h-4" />, onClick: () => {} }
    ]
  },
  "default": {
    content: "I understand you're asking about app market insights. Let me analyze the current data and trends to provide you with actionable intelligence. What specific aspect would you like me to focus on - user behavior, monetization strategies, feature adoption, or competitive analysis?",
    actions: [
      { label: "📊 Show Data", icon: <BarChart3 className="w-4 h-4" />, onClick: () => {} },
      { label: "💡 Get Insights", icon: <Lightbulb className="w-4 h-4" />, onClick: () => {} }
    ]
  }
};

export function AssistantModule() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '👋 Hello! I\'m your ClarityChain AI Assistant. I can help you analyze app market trends, competitive intelligence, user behavior patterns, and monetization strategies. What would you like to explore today?',
      timestamp: new Date(),
      actions: [
        { label: "📈 Market Trends", icon: <TrendingUp className="w-4 h-4" />, onClick: () => {} },
        { label: "🔍 App Analysis", icon: <Eye className="w-4 h-4" />, onClick: () => {} },
        { label: "💡 Get Ideas", icon: <Lightbulb className="w-4 h-4" />, onClick: () => {} }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const response = mockResponses[inputValue as keyof typeof mockResponses] || mockResponses.default;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        actions: response.actions
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleQuickAction = (action: string) => {
    setInputValue(`Help me with ${action.toLowerCase()}`);
  };

  const formatMessageContent = (content: string) => {
    // Basic markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/(\d+%)/g, '<span class="font-medium text-green-600">$1</span>')
      .replace(/(📈|📊|💰|🔗|🎨|🌙|📋|👥|🚀|📱|⚡)/g, '<span class="text-lg">$1</span>')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('<br/>');
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      {/* Header */}
      <Card className="mb-4">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                🤖 ClarityChain AI Assistant
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Powered by GPT-4 • Analyzing 50M+ app data points • 94% accuracy rate
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-50 text-green-700">
                ● Online
              </Badge>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Clear
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Chat Area */}
        <Card className="lg:col-span-3 flex flex-col">
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      {/* Message Header */}
                      <div className={`flex items-center gap-2 mb-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-sm font-medium">
                          {message.type === 'user' ? 'You' : '🤖 Assistant'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {/* Message Content */}
                      <div
                        className={`rounded-lg p-4 ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted/50'
                        }`}
                      >
                        <div
                          className={`${message.type === 'assistant' ? 'leading-relaxed' : ''}`}
                          dangerouslySetInnerHTML={{
                            __html: message.type === 'assistant' ? formatMessageContent(message.content) : message.content
                          }}
                        />
                      </div>

                      {/* Action Buttons */}
                      {message.actions && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.actions.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={action.onClick}
                              className="h-8"
                            >
                              {action.icon}
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}

                      {/* Message Actions */}
                      {message.type === 'assistant' && (
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <ThumbsUp className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <ThumbsDown className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span className="text-sm text-muted-foreground">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-border p-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me about app trends, market insights, competitive analysis..."
                    className="min-h-[60px] resize-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Mic className="w-4 h-4 mr-1" />
                        Voice
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Paperclip className="w-4 h-4 mr-1" />
                        Attach
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Lightbulb className="w-4 h-4 mr-1" />
                        Suggestions
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Press Enter to send, Shift+Enter for new line
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="self-end"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Questions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                💡 Quick Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickSuggestions.slice(0, 4).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickSuggestion(suggestion)}
                  className="w-full text-left p-2 text-sm border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  "{suggestion}"
                </button>
              ))}
              <Button variant="ghost" size="sm" className="w-full mt-2">
                View All →
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">⚡ Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="justify-start h-auto p-3"
                    onClick={() => handleQuickAction(action.label)}
                  >
                    <span className="text-lg mr-2">{action.icon}</span>
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">📊 Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-2">
                <div className="p-2 border border-border rounded text-xs">
                  Analyzed TaskFlow Pro performance
                </div>
                <div className="p-2 border border-border rounded text-xs">
                  Generated productivity app trends report
                </div>
                <div className="p-2 border border-border rounded text-xs">
                  Compared pricing strategies
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}