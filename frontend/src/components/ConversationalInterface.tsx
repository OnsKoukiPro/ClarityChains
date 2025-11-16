import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { Send, Sparkles, FileUp, BarChart3, FileText, CheckCircle2, Zap, TrendingUp, Package, Users, ShieldCheck } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actionCard?: {
    type: 'rfx-creation' | 'offer-upload' | 'analysis' | 'report' | 'review' | 'insights';
    data?: any;
  };
}

interface ConversationalInterfaceProps {
  onNavigate: (view: string) => void;
  onSelectRFX?: (rfx: any) => void;
}

export default function ConversationalInterface({ onNavigate, onSelectRFX }: ConversationalInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm Clare AI, your intelligent procurement assistant. I can help you with creating RFXs, analyzing supplier offers, generating reports, and much more. What would you like to work on today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(input);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): Message => {
    const lowerInput = userInput.toLowerCase();

    // RFX Creation
    if (lowerInput.includes('create') && (lowerInput.includes('rfx') || lowerInput.includes('rfq') || lowerInput.includes('rfp'))) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Great! I'll help you create a new RFX. I can guide you through setting up the basic information, items & requirements, supplier requirements, evaluation criteria, and timeline. Would you like to start with the wizard, or would you prefer to tell me about your requirements conversationally?",
        timestamp: new Date(),
        actionCard: {
          type: 'rfx-creation',
        }
      };
    }

    // Offer Upload
    if (lowerInput.includes('upload') && (lowerInput.includes('offer') || lowerInput.includes('quote') || lowerInput.includes('proposal'))) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Perfect! I can help you upload and process supplier offers. I support PDF, DOCX, XLSX, .eml, images, and zip files. I'll extract line items, normalize data, and run comprehensive analyses including TCO, commercial terms, and compliance checks. Ready to upload?",
        timestamp: new Date(),
        actionCard: {
          type: 'offer-upload',
        }
      };
    }

    // Analysis
    if (lowerInput.includes('analyz') || lowerInput.includes('analys') || lowerInput.includes('compare')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I'll help you analyze your supplier offers. I can perform TCO analysis, commercial terms comparison, compliance checks, anomaly detection, and more. I'll also handle currency conversion, freight estimation, and Incoterm analysis. Let me show you the analysis dashboard.",
        timestamp: new Date(),
        actionCard: {
          type: 'analysis',
        }
      };
    }

    // Report
    if (lowerInput.includes('report') || lowerInput.includes('summary') || lowerInput.includes('executive')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I can generate a comprehensive executive report with supplier recommendations, key findings, risk assessments, and actionable insights. Would you like me to create one based on your latest analysis?",
        timestamp: new Date(),
        actionCard: {
          type: 'report',
        }
      };
    }

    // Review
    if (lowerInput.includes('review') || lowerInput.includes('validate') || lowerInput.includes('check')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I'll help you review and validate the extracted line items. Human-in-the-loop validation ensures data quality before running analyses. Let me show you the items that need your attention.",
        timestamp: new Date(),
        actionCard: {
          type: 'review',
        }
      };
    }

    // Insights and dashboard
    if (lowerInput.includes('insight') || lowerInput.includes('dashboard') || lowerInput.includes('overview')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Here's a quick overview of your procurement activity. I'm tracking 12 active RFXs, 3 pending analyses, and 5 items requiring your review. Your team has achieved 23% cost savings this quarter!",
        timestamp: new Date(),
        actionCard: {
          type: 'insights',
        }
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: "I can help you with several procurement tasks:\n\n• **Create RFX** - Set up new RFPs, RFQs, or RFIs\n• **Upload Offers** - Process supplier proposals and quotes\n• **Analyze Offers** - Run TCO, compliance, and comparative analyses\n• **Review Data** - Validate extracted line items\n• **Generate Reports** - Create executive summaries with recommendations\n• **View Insights** - See your procurement metrics and activity\n\nWhat would you like to do?",
      timestamp: new Date(),
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
    textareaRef.current?.focus();
  };

  const renderActionCard = (actionCard: Message['actionCard']) => {
    if (!actionCard) return null;

    switch (actionCard.type) {
      case 'rfx-creation':
        return (
          <Card className="mt-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-2">Create New RFX</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Launch the guided wizard to create your RFP, RFQ, or RFI with all required details.
                </p>
                <Button onClick={() => onNavigate('create-rfx')} className="bg-blue-600 hover:bg-blue-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Start RFX Wizard
                </Button>
              </div>
            </div>
          </Card>
        );

      case 'offer-upload':
        return (
          <Card className="mt-4 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center flex-shrink-0">
                <FileUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-2">Upload Supplier Offers</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload PDF, DOCX, XLSX, .eml, images, or zip files. AI will extract and normalize all data.
                </p>
                <Button onClick={() => onNavigate('upload')} className="bg-green-600 hover:bg-green-700">
                  <FileUp className="w-4 h-4 mr-2" />
                  Upload Offers
                </Button>
              </div>
            </div>
          </Card>
        );

      case 'analysis':
        return (
          <Card className="mt-4 p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-2">Analyze Offers</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Run comprehensive analyses including TCO, compliance checks, and anomaly detection.
                </p>
                <Button onClick={() => onNavigate('analysis')} className="bg-purple-600 hover:bg-purple-700">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analysis
                </Button>
              </div>
            </div>
          </Card>
        );

      case 'report':
        return (
          <Card className="mt-4 p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-2">Executive Report</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate comprehensive reports with supplier recommendations and key insights.
                </p>
                <Button onClick={() => onNavigate('report')} className="bg-orange-600 hover:bg-orange-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          </Card>
        );

      case 'review':
        return (
          <Card className="mt-4 p-6 bg-gradient-to-br from-cyan-50 to-sky-50 border-cyan-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-2">Review Line Items</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Validate and edit extracted data with human-in-the-loop quality control.
                </p>
                <Button onClick={() => onNavigate('review')} className="bg-cyan-600 hover:bg-cyan-700">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Review Items
                </Button>
              </div>
            </div>
          </Card>
        );

      case 'insights':
        return (
          <Card className="mt-4 p-6 bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
            <div className="mb-4">
              <h3 className="text-lg mb-4">Your Procurement Overview</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-muted-foreground">Active RFXs</span>
                  </div>
                  <p className="text-2xl">12</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm text-muted-foreground">Cost Savings</span>
                  </div>
                  <p className="text-2xl">23%</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Package className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm text-muted-foreground">Pending Analysis</span>
                  </div>
                  <p className="text-2xl">3</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                      <Users className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-sm text-muted-foreground">Active Suppliers</span>
                  </div>
                  <p className="text-2xl">47</p>
                </div>
              </div>
            </div>
            <Button onClick={() => onNavigate('dashboard')} variant="outline" className="w-full">
              View Full Dashboard
            </Button>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-background">
      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* Messages */}
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </Avatar>
                )}
                <div className={`flex-1 ${message.role === 'user' ? 'max-w-[80%]' : 'max-w-full'}`}>
                  <div className={`${message.role === 'user' ? 'bg-blue-600 text-white ml-auto px-4 py-3 rounded-2xl rounded-tr-sm' : 'bg-muted/50 px-4 py-3 rounded-2xl rounded-tl-sm'}`}>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                  </div>
                  {message.role === 'assistant' && message.actionCard && renderActionCard(message.actionCard)}
                  <div className="mt-1 px-2">
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white text-sm">
                      You
                    </div>
                  </Avatar>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-4 justify-start">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </Avatar>
                <div className="bg-muted/50 px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="border-t bg-muted/30 px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-muted-foreground mb-3">Quick actions:</p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="px-3 py-1.5 cursor-pointer hover:bg-muted transition-colors"
                onClick={() => handleQuickAction('Create a new RFX')}
              >
                Create a new RFX
              </Badge>
              <Badge
                variant="outline"
                className="px-3 py-1.5 cursor-pointer hover:bg-muted transition-colors"
                onClick={() => handleQuickAction('Upload supplier offers')}
              >
                Upload supplier offers
              </Badge>
              <Badge
                variant="outline"
                className="px-3 py-1.5 cursor-pointer hover:bg-muted transition-colors"
                onClick={() => handleQuickAction('Analyze offers')}
              >
                Analyze offers
              </Badge>
              <Badge
                variant="outline"
                className="px-3 py-1.5 cursor-pointer hover:bg-muted transition-colors"
                onClick={() => handleQuickAction('Generate report')}
              >
                Generate report
              </Badge>
              <Badge
                variant="outline"
                className="px-3 py-1.5 cursor-pointer hover:bg-muted transition-colors"
                onClick={() => handleQuickAction('Show me insights')}
              >
                Show me insights
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t bg-background px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-end gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about procurement..."
              className="min-h-[52px] max-h-[200px] resize-none pr-12 py-3 rounded-2xl"
              rows={1}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              size="icon"
              className="absolute right-2 bottom-2 h-8 w-8 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}