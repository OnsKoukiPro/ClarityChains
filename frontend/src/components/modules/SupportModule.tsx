import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  ArrowLeft,
  HeadphonesIcon,
  MessageCircle,
  FileText,
  Search,
  Send,
  Bot,
  User,
  Phone,
  Mail,
  MessageSquare,
  HelpCircle,
  BookOpen,
  Video,
  ExternalLink,
  Clock,
  CheckCircle
} from 'lucide-react';

interface SupportModuleProps {
  subPage: string;
  onSubPageChange: (page: string) => void;
}

export function SupportModule({ subPage, onSubPageChange }: SupportModuleProps) {
  if (subPage === 'chatbot') {
    return <ChatbotInterface onBack={() => onSubPageChange('')} />;
  }

  if (subPage === 'documentation') {
    return <DocumentationCenter onBack={() => onSubPageChange('')} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">🎧 Support Center</h1>
          <p className="text-muted-foreground">
            Get help, access documentation, and connect with our support team
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Phone className="w-4 h-4 mr-2" />
            Schedule Call
          </Button>
          <Button>
            <MessageCircle className="w-4 h-4 mr-2" />
            Live Chat
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSubPageChange('chatbot')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">AI Help Chat</h3>
                <p className="text-sm text-muted-foreground">Get instant answers</p>
                <Badge className="bg-green-100 text-green-800 mt-1">Live</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSubPageChange('documentation')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Documentation</h3>
                <p className="text-sm text-muted-foreground">Browse guides & tutorials</p>
                <Badge variant="outline" className="mt-1">Updated</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Video Tutorials</h3>
                <p className="text-sm text-muted-foreground">Watch step-by-step guides</p>
                <Badge variant="outline" className="mt-1">25+ Videos</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeadphonesIcon className="w-5 h-5" />
              Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Live Chat</span>
                </div>
                <span className="text-sm text-green-600">Available now</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Email Support</span>
                </div>
                <span className="text-sm text-blue-600">~2h response</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">Phone Support</span>
                </div>
                <span className="text-sm text-purple-600">Schedule call</span>
              </div>
            </div>

            <Button className="w-full" onClick={() => onSubPageChange('chatbot')}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Chat
            </Button>
          </CardContent>
        </Card>

        {/* Recent Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                <div>
                  <p className="font-medium text-sm">New AB Testing Module</p>
                  <p className="text-xs text-muted-foreground">Enhanced split testing capabilities</p>
                  <span className="text-xs text-muted-foreground">2 days ago</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                <div>
                  <p className="font-medium text-sm">Creative Analysis Updates</p>
                  <p className="text-xs text-muted-foreground">Improved visual intelligence features</p>
                  <span className="text-xs text-muted-foreground">1 week ago</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                <div>
                  <p className="font-medium text-sm">API Rate Limits Increased</p>
                  <p className="text-xs text-muted-foreground">Better performance for all users</p>
                  <span className="text-xs text-muted-foreground">2 weeks ago</span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              View All Updates
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                question: "How do I connect my app to ClarityChains?",
                answer: "Use the App Store Connect integration in your dashboard to sync your app data automatically."
              },
              {
                question: "What's included in the Growth Capital program?",
                answer: "Marketing budget, ASO optimization, creative production, and technical improvements with profit sharing."
              },
              {
                question: "How accurate is the competitor analysis?",
                answer: "Our AI analyzes real-time app store data with 95%+ accuracy using multiple data sources."
              },
              {
                question: "Can I export my analytics data?",
                answer: "Yes, all analytics can be exported in CSV, PDF, or API format from any module."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Chatbot Interface Component
function ChatbotInterface({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hi! I'm ClarityChains AI Assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    // Simulate bot response
    const botResponse = {
      id: messages.length + 2,
      type: 'bot',
      message: getBotResponse(inputMessage),
      timestamp: new Date()
    };

    setMessages([...messages, userMessage, botResponse]);
    setInputMessage('');
  };

  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();

    if (input.includes('revenue') || input.includes('money')) {
      return "I can help you understand your revenue analytics! Check the Revenue Dashboard for detailed insights on your app's financial performance, or explore the Growth Capital program for investment opportunities.";
    }

    if (input.includes('competitor') || input.includes('analysis')) {
      return "Great question! Use the Creative Analysis and Cross Analysis modules to get comprehensive competitor insights. You can compare features, pricing, and market positioning.";
    }

    if (input.includes('aso') || input.includes('optimization')) {
      return "For App Store Optimization, visit the ASO module where you'll find keyword analysis, optimization suggestions, and performance tracking tools.";
    }

    if (input.includes('help') || input.includes('support')) {
      return "I'm here to help! You can also contact our support team via live chat, email, or schedule a call. Is there a specific feature you'd like to learn about?";
    }

    return "Thanks for your question! I can help you with analytics, revenue optimization, competitor analysis, ASO, and more. What specific area would you like to explore?";
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Support
        </Button>
        <Badge variant="secondary">AI Help Chat</Badge>
      </div>

      {/* Chat Interface */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            ClarityChains AI Assistant
            <Badge className="bg-green-100 text-green-800 ml-2">Online</Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[400px]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-3 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {msg.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    <span className={`text-xs ${
                      msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about analytics, revenue, competitors, or anything else..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Documentation Center Component
function DocumentationCenter({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Support
        </Button>
        <Badge variant="secondary">Documentation</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>📚 Documentation Center</CardTitle>
          <p className="text-muted-foreground">
            Comprehensive guides and tutorials for all ClarityChains features
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Documentation Center</h3>
            <p className="text-muted-foreground mb-4">
              Complete guides, tutorials, and API documentation
            </p>
            <Button>
              <ExternalLink className="w-4 h-4 mr-2" />
              Browse Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}