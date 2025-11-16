import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Send, Sparkles, X, Minimize2, Maximize2, Paperclip, FileText, FileSpreadsheet, Image as ImageIcon, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  files?: File[];
}

interface ClareAssistantProps {
  onNavigate?: (view: string) => void;
}

export default function ClareAssistant({ onNavigate }: ClareAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Clare AI. How can I help you with procurement today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

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

    setTimeout(() => {
      const response = generateAIResponse(input, selectedFiles);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 800);
  };

  const generateAIResponse = (userInput: string, files: File[]): Message => {
    const lowerInput = userInput.toLowerCase();

    if (files.length > 0) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `I've received ${files.length} file${files.length > 1 ? 's' : ''}. I can analyze supplier offers, extract line items, and compare pricing. Would you like me to proceed with the analysis?`,
        timestamp: new Date(),
      };
    }

    if (lowerInput.includes('create') && (lowerInput.includes('rfx') || lowerInput.includes('rfq') || lowerInput.includes('rfp'))) {
      setTimeout(() => onNavigate?.('create-rfx'), 500);
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I'll help you create a new RFX. Opening the RFX wizard now...",
        timestamp: new Date(),
      };
    }

    if (lowerInput.includes('upload') && (lowerInput.includes('offer') || lowerInput.includes('quote') || lowerInput.includes('proposal'))) {
      setTimeout(() => onNavigate?.('upload'), 500);
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Opening the offer upload page where you can add supplier proposals...",
        timestamp: new Date(),
      };
    }

    if (lowerInput.includes('analyz') || lowerInput.includes('analys')) {
      setTimeout(() => onNavigate?.('analysis'), 500);
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Taking you to the analysis dashboard...",
        timestamp: new Date(),
      };
    }

    if (lowerInput.includes('report')) {
      setTimeout(() => onNavigate?.('report'), 500);
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Opening the executive report view...",
        timestamp: new Date(),
      };
    }

    if (lowerInput.includes('dashboard') || lowerInput.includes('overview')) {
      setTimeout(() => onNavigate?.('dashboard'), 500);
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Showing your RFX dashboard...",
        timestamp: new Date(),
      };
    }

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: "I can help you:\n• Create new RFXs\n• Upload supplier offers\n• Analyze bids\n• Generate reports\n• Review line items\n\nWhat would you like to do?",
      timestamp: new Date(),
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getFileIcon = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
      case 'doc':
      case 'docx':
        return <FileText className="w-3 h-3 text-blue-600" />;
      case 'xls':
      case 'xlsx':
        return <FileSpreadsheet className="w-3 h-3 text-green-600" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <ImageIcon className="w-3 h-3 text-purple-600" />;
      case 'eml':
      case 'msg':
        return <Mail className="w-3 h-3 text-orange-600" />;
      default:
        return <Paperclip className="w-3 h-3 text-gray-600" />;
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 relative group"
            >
              <Sparkles className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
            </Button>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-0 right-16 bg-background border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <p className="text-sm">Ask Clare AI</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-[9999] w-96"
            style={{ height: isMinimized ? 'auto' : '600px' }}
          >
            <Card className="h-full flex flex-col border bg-background shadow-2xl overflow-hidden">
              {/* Header - Always visible */}
              <div className="flex-shrink-0 bg-primary p-4 flex items-center justify-between rounded-t-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <div className="w-full h-full bg-white flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                  </Avatar>
                  <div>
                    <h3 className="text-primary-foreground">Clare AI</h3>
                    <p className="text-xs text-primary-foreground/80">Procurement Assistant</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages - Only show when not minimized */}
              {!isMinimized && (
                <>
                  {/* Scroll Area with fixed height */}
                  <div className="flex-1 min-h-0 overflow-hidden">
                    <ScrollArea className="h-full" ref={scrollAreaRef}>
                      <div className="p-4 space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            {message.role === 'assistant' && (
                              <Avatar className="w-7 h-7 flex-shrink-0">
                                <div className="w-full h-full bg-primary flex items-center justify-center">
                                  <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                                </div>
                              </Avatar>
                            )}
                            <div className={`max-w-[75%] ${message.role === 'user' ? 'order-first' : ''}`}>
                              {message.files && message.files.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {message.files.map((file, index) => (
                                    <Badge key={index} variant="secondary" className="gap-1.5 px-2 py-1">
                                      {getFileIcon(file)}
                                      <span className="text-xs max-w-[100px] truncate">{file.name}</span>
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              <div
                                className={`px-3 py-2 rounded-2xl text-sm ${
                                  message.role === 'user'
                                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                                    : 'bg-muted rounded-tl-sm'
                                }`}
                              >
                                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                              </div>
                              <p className="text-[10px] text-muted-foreground mt-1 px-2">
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            {message.role === 'user' && (
                              <Avatar className="w-7 h-7 flex-shrink-0">
                                <div className="w-full h-full bg-slate-600 flex items-center justify-center text-white text-[10px]">
                                  You
                                </div>
                              </Avatar>
                            )}
                          </div>
                        ))}

                        {isTyping && (
                          <div className="flex gap-2 justify-start">
                            <Avatar className="w-7 h-7 flex-shrink-0">
                              <div className="w-full h-full bg-primary flex items-center justify-center">
                                <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                              </div>
                            </Avatar>
                            <div className="bg-muted px-3 py-2 rounded-2xl rounded-tl-sm">
                              <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Input - Always at bottom */}
                  <div className="flex-shrink-0 p-4 border-t bg-background">
                    {selectedFiles.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {selectedFiles.map((file, index) => (
                          <Badge key={index} variant="secondary" className="gap-1.5 pr-1 pl-2 py-1">
                            {getFileIcon(file)}
                            <span className="text-xs max-w-[120px] truncate">{file.name}</span>
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
                        placeholder="Ask Clare anything..."
                        className="min-h-[44px] max-h-[120px] resize-none pr-20 py-2.5 text-sm rounded-lg"
                        rows={1}
                      />
                      <div className="absolute right-1.5 bottom-1.5 flex items-center gap-1">
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
                          className="h-7 w-7 rounded-lg"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Paperclip className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          onClick={handleSend}
                          disabled={!input.trim() && selectedFiles.length === 0}
                          size="icon"
                          className="h-7 w-7 rounded-lg disabled:opacity-50"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}