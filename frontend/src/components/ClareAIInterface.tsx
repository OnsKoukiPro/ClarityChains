import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import {
  Send,
  Sparkles,
  Upload as UploadIcon,
  FileText,
  Image as ImageIcon,
  X,
  Paperclip,
  BarChart3,
  FileSpreadsheet,
  Mail,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  files?: File[];
  metadata?: any;
}

interface ClareAIInterfaceProps {
  onNavigate?: (view: string) => void;
}

// Fixed apiService to match agent response format
const apiService = {
  // Send message to agent service (POST format)
  async sendMessage(message: string) {
    console.log('Sending message:', message);

    const response = await fetch('http://localhost:8001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response not OK:', response.status, errorText);
      throw new Error(`Failed to send message: ${response.status} ${errorText}`);
    }

    return response.json();
  },

  // Upload files for analysis
  async uploadFiles(files: File[]) {
    const formData = new FormData();

    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch('http://localhost:8001/api/add-offer', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload files');
    }

    return response.json();
  },

  // Process files with agent - for immediate chat response
  async processFilesWithAgent(files: File[]) {
    const formData = new FormData();

    files.forEach(file => {
      formData.append('files', file);
    });

    console.log('Sending files:', files.map(f => ({ name: f.name, size: f.size, type: f.type })));

    const response = await fetch('http://localhost:8001/api/process-files', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Process files response not OK:', response.status, errorText);
      throw new Error(`Failed to process files: ${response.status} ${errorText}`);
    }

    return response.json();
  },

  // Full analysis with weights
  async analyzeOffers(weights: any = {}) {
    const formData = new FormData();

    Object.keys(weights).forEach(key => {
      formData.append(key, weights[key].toString());
    });

    const response = await fetch('http://localhost:8001/api/analyze', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to analyze offers');
    }

    return response.json();
  }
};

export default function ClareAIInterface({ onNavigate }: ClareAIInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if (!input.trim() && selectedFiles.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      files: selectedFiles.length > 0 ? [...selectedFiles] : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedFiles([]);
    setIsTyping(true);

    try {
      let response;

      if (selectedFiles.length > 0) {
        console.log('Processing files:', selectedFiles.map(f => f.name));
        response = await apiService.processFilesWithAgent(selectedFiles);
      } else {
        console.log('Sending text message:', input);
        response = await apiService.sendMessage(input);
      }

      console.log('Received response:', response);

      // Handle different response formats from agent
      let responseContent = '';
      let responseMetadata = {};

      if (response.content) {
        // Agent response format from /api/chat and /api/process-files
        responseContent = response.content;
        responseMetadata = response.metadata || {};
      } else if (response.message) {
        // Alternative format from other endpoints
        responseContent = response.message;
        responseMetadata = response.metadata || {};
      } else if (typeof response === 'string') {
        // Fallback for string responses
        responseContent = response;
      } else {
        // Fallback for any other format
        responseContent = "I've processed your request successfully.";
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
        metadata: responseMetadata,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Handle navigation based on keywords in user input
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('create') && (lowerInput.includes('rfx') || lowerInput.includes('rfq') || lowerInput.includes('rfp'))) {
        setTimeout(() => onNavigate?.('create-rfx'), 500);
      } else if (lowerInput.includes('upload') && (lowerInput.includes('offer') || lowerInput.includes('quote') || lowerInput.includes('proposal'))) {
        setTimeout(() => onNavigate?.('upload'), 500);
      } else if (lowerInput.includes('analyz') || lowerInput.includes('analys')) {
        setTimeout(() => onNavigate?.('analysis'), 500);
      } else if (lowerInput.includes('report')) {
        setTimeout(() => onNavigate?.('report'), 500);
      } else if (lowerInput.includes('dashboard') || lowerInput.includes('overview')) {
        setTimeout(() => onNavigate?.('dashboard'), 500);
      }

    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'm having trouble connecting to my services. Please check if the backend and agent services are running. Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    {
      icon: FileText,
      title: 'Create RFX',
      description: 'Start a new Request for X',
      action: () => {
        const userMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: 'Create a new RFX',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setTimeout(() => onNavigate?.('create-rfx'), 500);
      },
    },
    {
      icon: UploadIcon,
      title: 'Upload Offers',
      description: 'Add supplier proposals',
      action: () => {
        const userMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: 'Upload supplier offers',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setTimeout(() => onNavigate?.('upload'), 500);
      },
    },
    {
      icon: BarChart3,
      title: 'Analyze Bids',
      description: 'Compare and evaluate offers',
      action: () => {
        const userMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: 'Analyze bids and offers',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setTimeout(() => onNavigate?.('analysis'), 500);
      },
    },
    {
      icon: FileSpreadsheet,
      title: 'Generate Report',
      description: 'Create executive summary',
      action: () => {
        const userMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: 'Generate executive report',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setTimeout(() => onNavigate?.('report'), 500);
      },
    },
  ];

  const getFileIcon = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
      case 'doc':
      case 'docx':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'xls':
      case 'xlsx':
        return <FileSpreadsheet className="w-4 h-4 text-green-600" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <ImageIcon className="w-4 h-4 text-purple-600" />;
      case 'eml':
      case 'msg':
        return <Mail className="w-4 h-4 text-orange-600" />;
      default:
        return <Paperclip className="w-4 h-4 text-gray-600" />;
    }
  };

  // Show welcome screen if no messages
  if (messages.length === 0) {
    return (
      <div className="h-full bg-background flex items-center justify-center p-8">
        <div className="max-w-4xl w-full space-y-12">
          {/* Welcome Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 mb-4">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl">Welcome to Clare AI</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your intelligent procurement assistant. Upload supplier offers, analyze bids, create RFXs,
              and get instant insights powered by AI.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="p-6 cursor-pointer hover:bg-accent/50 transition-colors border-2"
                onClick={action.action}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <action.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Input Area */}
          <div className="space-y-4">
            <Card className="p-1">
              <div className="space-y-3 p-3">
                {selectedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedFiles.map((file, index) => (
                      <Badge key={index} variant="secondary" className="gap-2 pr-1 pl-3 py-1.5">
                        {getFileIcon(file)}
                        <span className="text-xs max-w-[150px] truncate">{file.name}</span>
                        <button
                          onClick={() => removeFile(index)}
                          className="hover:bg-background rounded p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="relative flex items-end gap-2">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Clare anything or upload files to analyze..."
                    className="min-h-[80px] resize-none pr-24 text-base border-0 focus-visible:ring-0 shadow-none"
                    rows={3}
                  />
                  <div className="absolute right-2 bottom-2 flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.eml,.msg,.jpg,.jpeg,.png"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handleSend}
                      disabled={!input.trim() && selectedFiles.length === 0}
                      size="icon"
                      className="h-9 w-9"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
            <p className="text-xs text-muted-foreground text-center">
              Supported formats: PDF, Word, Excel, Email (.eml, .msg), Images
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Conversational view after first message
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Messages Area */}
      <ScrollArea className="flex-1 px-8 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </Avatar>
              )}
              <div className={`max-w-[70%] space-y-2 ${message.role === 'user' ? 'order-first' : ''}`}>
                {message.files && message.files.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {message.files.map((file, index) => (
                      <Badge key={index} variant="secondary" className="gap-2 px-3 py-1.5">
                        {getFileIcon(file)}
                        <span className="text-xs">{file.name}</span>
                      </Badge>
                    ))}
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-muted rounded-tl-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground px-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.role === 'user' && (
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <div className="w-full h-full bg-slate-600 flex items-center justify-center text-white">
                    You
                  </div>
                </Avatar>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 justify-start">
              <Avatar className="w-10 h-10 flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </Avatar>
              <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm">
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
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-1">
            <div className="space-y-3 p-3">
              {selectedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedFiles.map((file, index) => (
                    <Badge key={index} variant="secondary" className="gap-2 pr-1 pl-3 py-1.5">
                      {getFileIcon(file)}
                      <span className="text-xs max-w-[150px] truncate">{file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="hover:bg-background rounded p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <div className="relative flex items-end gap-2">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Clare anything or upload files..."
                  className="min-h-[60px] resize-none pr-24 border-0 focus-visible:ring-0 shadow-none"
                  rows={2}
                />
                <div className="absolute right-2 bottom-2 flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.eml,.msg,.jpg,.jpeg,.png"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() && selectedFiles.length === 0}
                    size="icon"
                    className="h-9 w-9"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}