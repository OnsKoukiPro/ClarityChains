import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  ArrowLeft,
  ArrowRight,
  Users,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Target,
  Globe,
  Building2,
  User,
  MessageSquare,
  ExternalLink,
  Search,
  Filter,
  Download,
  Zap,
  DollarSign,
  MapPin,
  LinkedinIcon,
  Twitter,
  Eye,
  Plus,
  Clock,
  CheckCircle,
  Star,
  Smartphone,
  BarChart3,
  FileText,
  Settings,
  Activity,
  PieChart,
  Wallet,
  Briefcase,
  Monitor,
  Rss
} from 'lucide-react';

interface SalesModuleProps {
  subPage: string;
  selectedApp: any;
  onSubPageChange: (page: string, appData?: any) => void;
  appContext: any;
  welcomeContext?: any;
}

// Enhanced Turkish developer data with complete spreadsheet format
const turkishDevelopersComplete = [
  {
    id: 1,
    developerName: 'ALP KIZILTAN',
    developerApps: 'AI Baby Generator: Face Maker',
    actionItems: 'Facebook, Google, Snapchat audit, Service offering, General collaboration',
    meetingNotes: 'Linkedinden ulaştım, Wowoo apps te bunların',
    category: 'AI Art Generators',
    store: 'App Store',
    googlePlay: null,
    appstore: 'https://screensdesign.com/apps/ai-baby-generator-face-maker/?ts=0&vt=1&id=1201',
    downloads: 681000,
    revenues: 166000,
    topCountries: 'Brazil, Russia, US',
    competitor: 'HEYOS',
    website: 'https://wowooapps.com/',
    notes: 'https://app.sensortower.com/publisher/unified/666078745af27d023785761a/?page=1&page_size=25',
    linkedinInfo: 'https://screensdesign.com/apps/ai-baby-generator-face-maker/?ts=0&vt=1&id=1201',
    twitter: null,
    status: 'Met',
    priority: 'High',
    lastContact: '2024-01-15',
    nextFollowUp: '2024-02-01',
    revenueScore: 95,
    growthPotential: 'High',
    avgRPD: 0.24,
    company: 'Wowoo Apps',
    dealSize: 8300, // 5% of annual revenue
    conversionProbability: 85,
    estimatedCloseDate: '2024-03-01'
  },
  {
    id: 2,
    developerName: 'UNIVERLIST TEKNOLOJI SAN. VE TIC. AS.',
    developerApps: 'AI Video Generator - Clips AI',
    actionItems: 'Initial outreach, Product demo',
    meetingNotes: '',
    category: 'AI Art Generators',
    store: 'App Store',
    googlePlay: null,
    appstore: 'Link',
    downloads: 215000,
    revenues: 153000,
    topCountries: 'US, Germany, France',
    competitor: null,
    website: 'https://univenn.hrpanda.co/',
    notes: '',
    linkedinInfo: 'https://www.linkedin.com/in/mrtodemis/',
    twitter: null,
    status: 'Prospect',
    priority: 'High',
    lastContact: null,
    nextFollowUp: '2024-01-20',
    revenueScore: 92,
    growthPotential: 'High',
    avgRPD: 0.71,
    company: 'Univerlist Tech',
    dealSize: 7650,
    conversionProbability: 70,
    estimatedCloseDate: '2024-02-15'
  },
  {
    id: 3,
    developerName: 'Bots and Bolts',
    developerApps: 'Jupi AI Chat Fantasy Roleplay',
    actionItems: 'LinkedIn follow-up, Service proposal',
    meetingNotes: 'Zamanında güzel 2 app yapıp satmışlar, şimdi AI chat appleri yapıyorlar tanışılır',
    category: 'AI Chatbots',
    store: 'App Store',
    googlePlay: null,
    appstore: 'Link',
    downloads: 40000,
    revenues: 50000,
    topCountries: 'US, UK, Germany',
    competitor: null,
    website: null,
    notes: '',
    linkedinInfo: 'Sarp Erdag - Founder - Bots and Bolts | LinkedIn',
    twitter: null,
    status: 'Reached out',
    priority: 'Medium',
    lastContact: '2024-01-10',
    nextFollowUp: '2024-01-25',
    revenueScore: 78,
    growthPotential: 'Medium',
    avgRPD: 1.25,
    company: 'Bots and Bolts',
    dealSize: 2500,
    conversionProbability: 60,
    estimatedCloseDate: '2024-03-15'
  },
  {
    id: 4,
    developerName: 'HEYOS',
    developerApps: 'AI Baby Generator - TinyFaces',
    actionItems: 'Competitive analysis, AppNation connection research',
    meetingNotes: 'appnation ?',
    category: 'AI Art Generators',
    store: 'App Store',
    googlePlay: null,
    appstore: 'https://screensdesign.com/apps/ai-baby-generator-tinyfaces/?ts=0&vt=1&id=625',
    downloads: 25000,
    revenues: 106000,
    topCountries: 'US, Canada, Germany',
    competitor: 'ALP KIZILTAN',
    website: 'https://heyos.co/about',
    notes: 'appnation ?',
    linkedinInfo: 'https://screensdesign.com/apps/ai-baby-generator-tinyfaces/?ts=0&vt=1&id=625',
    twitter: null,
    status: 'Research',
    priority: 'Very High',
    lastContact: null,
    nextFollowUp: '2024-02-05',
    revenueScore: 98,
    growthPotential: 'Very High',
    avgRPD: 4.24,
    company: 'HEYOS',
    dealSize: 5300,
    conversionProbability: 90,
    estimatedCloseDate: '2024-02-28'
  },
  {
    id: 5,
    developerName: 'Superapp Labs',
    developerApps: 'Hex: AI Logo Maker & Generator',
    actionItems: 'Follow-up call, Proposal preparation',
    meetingNotes: 'Aradım - #50 in Graphics & Design',
    category: 'Graphics & Design',
    store: 'App Store',
    googlePlay: null,
    appstore: 'https://apps.apple.com/us/app/hexa-make-generate-ai-logo/id6738582006',
    downloads: 366000,
    revenues: 182000,
    topCountries: 'US, UK, Canada',
    competitor: null,
    website: 'https://superapplabs.co/privacy-policy',
    notes: '#50 in Graphics & Design',
    linkedinInfo: null,
    twitter: null,
    status: 'Called',
    priority: 'Very High',
    lastContact: '2024-01-12',
    nextFollowUp: '2024-01-18',
    revenueScore: 96,
    growthPotential: 'Very High',
    avgRPD: 0.50,
    company: 'Superapp Labs',
    dealSize: 9100,
    conversionProbability: 85,
    estimatedCloseDate: '2024-02-10'
  },
  {
    id: 6,
    developerName: 'Metaspeed',
    developerApps: 'Juds- AI Friend & Chat',
    actionItems: 'Company research, Initial outreach',
    meetingNotes: '',
    category: 'AI Chatbots',
    store: 'App Store',
    googlePlay: null,
    appstore: 'https://apps.apple.com/us/app/juds-ai-friend-chat/id6444159975',
    downloads: 79000,
    revenues: 149000,
    topCountries: 'US, UK, Germany',
    competitor: null,
    website: 'https://metaspeed.com.tr/',
    notes: '',
    linkedinInfo: null,
    twitter: null,
    status: 'Prospect',
    priority: 'High',
    lastContact: null,
    nextFollowUp: '2024-01-28',
    revenueScore: 94,
    growthPotential: 'High',
    avgRPD: 1.89,
    company: 'Metaspeed',
    dealSize: 7450,
    conversionProbability: 75,
    estimatedCloseDate: '2024-03-10'
  },
  {
    id: 7,
    developerName: 'Codespace Dijital Hizmetler AS',
    developerApps: 'Listen AI: Text to Speech',
    actionItems: 'Market analysis, Contact strategy',
    meetingNotes: '',
    category: 'Productivity',
    store: 'Google Play',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.codespaceapps.listeningapp&gl=IN',
    appstore: null,
    downloads: 659000,
    revenues: 115000,
    topCountries: 'US, India, UK',
    competitor: null,
    website: null,
    notes: '',
    linkedinInfo: null,
    twitter: null,
    status: 'Prospect',
    priority: 'High',
    lastContact: null,
    nextFollowUp: '2024-02-02',
    revenueScore: 88,
    growthPotential: 'High',
    avgRPD: 0.17,
    company: 'Codespace Digital',
    dealSize: 5750,
    conversionProbability: 65,
    estimatedCloseDate: '2024-03-20'
  },
  {
    id: 8,
    developerName: 'MIA DIGITAL SOLUTIONS',
    developerApps: 'GetCode - Virtual Number SMS',
    actionItems: 'Market analysis, Contact strategy',
    meetingNotes: '',
    category: 'Utilities',
    store: 'App Store',
    googlePlay: null,
    appstore: 'https://apps.apple.com/us/app/virtual-number-2nd-wa-getcode/id6450923280',
    downloads: 300000,
    revenues: 70000,
    topCountries: 'US, UK, Canada',
    competitor: null,
    website: null,
    notes: '',
    linkedinInfo: 'https://www.linkedin.com/in/flysquare/',
    twitter: null,
    status: 'Prospect',
    priority: 'Medium',
    lastContact: null,
    nextFollowUp: '2024-02-02',
    revenueScore: 75,
    growthPotential: 'Medium',
    avgRPD: 0.23,
    company: 'MIA Digital',
    dealSize: 3500,
    conversionProbability: 55,
    estimatedCloseDate: '2024-04-01'
  }
];

// Sales metrics and forecasting data
const salesMetrics = {
  overview: {
    totalProspects: turkishDevelopersComplete.length,
    totalMarketValue: turkishDevelopersComplete.reduce((sum, dev) => sum + dev.revenues, 0),
    totalPipelineValue: turkishDevelopersComplete.reduce((sum, dev) => sum + dev.dealSize, 0),
    avgDealSize: turkishDevelopersComplete.reduce((sum, dev) => sum + dev.dealSize, 0) / turkishDevelopersComplete.length,
    avgConversionRate: turkishDevelopersComplete.reduce((sum, dev) => sum + dev.conversionProbability, 0) / turkishDevelopersComplete.length,
    forecastedRevenue: turkishDevelopersComplete.reduce((sum, dev) => sum + (dev.dealSize * dev.conversionProbability / 100), 0),
    quarterlyGrowth: 23.5,
    turkishMarketShare: 12.3
  },
  statusDistribution: [
    { status: 'Met', count: turkishDevelopersComplete.filter(d => d.status === 'Met').length, value: turkishDevelopersComplete.filter(d => d.status === 'Met').reduce((sum, d) => sum + d.dealSize, 0) },
    { status: 'Called', count: turkishDevelopersComplete.filter(d => d.status === 'Called').length, value: turkishDevelopersComplete.filter(d => d.status === 'Called').reduce((sum, d) => sum + d.dealSize, 0) },
    { status: 'Reached out', count: turkishDevelopersComplete.filter(d => d.status === 'Reached out').length, value: turkishDevelopersComplete.filter(d => d.status === 'Reached out').reduce((sum, d) => sum + d.dealSize, 0) },
    { status: 'Prospect', count: turkishDevelopersComplete.filter(d => d.status === 'Prospect').length, value: turkishDevelopersComplete.filter(d => d.status === 'Prospect').reduce((sum, d) => sum + d.dealSize, 0) },
    { status: 'Research', count: turkishDevelopersComplete.filter(d => d.status === 'Research').length, value: turkishDevelopersComplete.filter(d => d.status === 'Research').reduce((sum, d) => sum + d.dealSize, 0) }
  ],
  categoryPerformance: [
    { category: 'AI Art Generators', prospects: 3, totalRevenue: 451000, avgRPD: 1.73, conversionRate: 83 },
    { category: 'AI Chatbots', prospects: 2, totalRevenue: 199000, avgRPD: 1.57, conversionRate: 68 },
    { category: 'Graphics & Design', prospects: 1, totalRevenue: 182000, avgRPD: 0.50, conversionRate: 85 },
    { category: 'Productivity', prospects: 1, totalRevenue: 115000, avgRPD: 0.17, conversionRate: 65 },
    { category: 'Utilities', prospects: 1, totalRevenue: 70000, avgRPD: 0.23, conversionRate: 55 }
  ],
  revenueForecasting: {
    q1Target: 45000,
    q2Target: 62000,
    q3Target: 78000,
    q4Target: 95000,
    currentProgress: 28,
    monthlyRecurring: 12400,
    churnRate: 5.2,
    expansionRevenue: 18600
  }
};

const statusOptions = [
  { value: 'prospect', label: 'Prospect', color: 'bg-gray-100 text-gray-800' },
  { value: 'reached-out', label: 'Reached Out', color: 'bg-blue-100 text-blue-800' },
  { value: 'met', label: 'Met', color: 'bg-green-100 text-green-800' },
  { value: 'called', label: 'Called', color: 'bg-purple-100 text-purple-800' },
  { value: 'research', label: 'Research', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'growth', label: 'Growth', color: 'bg-orange-100 text-orange-800' },
  { value: 'connected', label: 'Connected', color: 'bg-teal-100 text-teal-800' },
  { value: 'hire', label: 'Hire', color: 'bg-red-100 text-red-800' },
  { value: 'publish', label: 'Publish', color: 'bg-indigo-100 text-indigo-800' }
];

const priorityOptions = [
  { value: 'very-high', label: 'Very High', color: 'bg-red-100 text-red-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' }
];

export function SalesModule({ subPage, selectedApp, onSubPageChange, appContext, welcomeContext }: SalesModuleProps) {
  const [selectedDeveloper, setSelectedDeveloper] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  if (subPage === 'pipeline') {
    return <SalesPipeline onBack={() => onSubPageChange('')} developers={turkishDevelopersComplete} />;
  }

  if (subPage === 'lead-generation') {
    return <LeadGeneration onBack={() => onSubPageChange('')} developers={turkishDevelopersComplete} />;
  }

  if (subPage === 'revenue-forecasting') {
    return <RevenueForecasting onBack={() => onSubPageChange('')} developers={turkishDevelopersComplete} salesMetrics={salesMetrics} />;
  }

  if (subPage === 'developer-detail' && selectedDeveloper) {
    return <DeveloperDetail developer={selectedDeveloper} onBack={() => onSubPageChange('')} />;
  }

  if (subPage === 'market-analysis') {
    return <MarketAnalysis onBack={() => onSubPageChange('')} developers={turkishDevelopersComplete} salesMetrics={salesMetrics} />;
  }

  if (subPage === 'database') {
    return <DeveloperDatabase onBack={() => onSubPageChange('')} developers={turkishDevelopersComplete} onViewDeveloper={(dev) => { setSelectedDeveloper(dev); onSubPageChange('developer-detail'); }} />;
  }

  // Filter developers based on current filters
  const filteredDevelopers = turkishDevelopersComplete.filter(dev => {
    const matchesStatus = statusFilter === 'all' || dev.status.toLowerCase().replace(' ', '-') === statusFilter;
    const matchesPriority = priorityFilter === 'all' || dev.priority.toLowerCase().replace(' ', '-') === priorityFilter;
    const matchesSearch = searchQuery === '' || 
      dev.developerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.developerApps.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">🇹🇷 Turkish Market Sales Engine</h1>
          <p className="text-muted-foreground">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">VALIDATION REGION</span>
            {' '}Comprehensive sales intelligence for Turkish indie developers
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Pipeline
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Developer
          </Button>
        </div>
      </div>

      {/* Turkey Validation Focus Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-red-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">🇹🇷 Turkey Market Validation</h3>
                <p className="text-blue-700">Primary market for model validation • {turkishDevelopersComplete.length} developers tracked • ${(salesMetrics.overview.totalMarketValue / 1000000).toFixed(1)}M market value</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{salesMetrics.overview.turkishMarketShare}%</p>
              <p className="text-sm text-blue-600">Market penetration</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="database">Full Database</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Prospects</p>
                    <p className="text-2xl font-semibold">{salesMetrics.overview.totalProspects}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Market Value</p>
                    <p className="text-2xl font-semibold">${(salesMetrics.overview.totalMarketValue / 1000000).toFixed(1)}M</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pipeline Value</p>
                    <p className="text-2xl font-semibold">${(salesMetrics.overview.totalPipelineValue / 1000).toFixed(0)}K</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Deal Size</p>
                    <p className="text-2xl font-semibold">${(salesMetrics.overview.avgDealSize / 1000).toFixed(1)}K</p>
                  </div>
                  <Briefcase className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-semibold">{salesMetrics.overview.avgConversionRate.toFixed(0)}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-teal-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Forecasted Rev</p>
                    <p className="text-2xl font-semibold">${(salesMetrics.overview.forecastedRevenue / 1000).toFixed(0)}K</p>
                  </div>
                  <Activity className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('database')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Complete Database</h3>
                    <p className="text-sm text-muted-foreground">Full spreadsheet format view</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between text-sm">
                  <span>{turkishDevelopersComplete.length} developers tracked</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('pipeline')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Sales Pipeline</h3>
                    <p className="text-sm text-muted-foreground">Stage-based prospect management</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between text-sm">
                  <span>${(salesMetrics.overview.totalPipelineValue / 1000).toFixed(0)}K pipeline value</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('analytics')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Market Analytics</h3>
                    <p className="text-sm text-muted-foreground">Turkish market intelligence</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between text-sm">
                  <span>{salesMetrics.overview.turkishMarketShare}% market share</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('forecasting')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Revenue Forecasting</h3>
                    <p className="text-sm text-muted-foreground">Advanced revenue projections</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between text-sm">
                  <span>${(salesMetrics.overview.forecastedRevenue / 1000).toFixed(0)}K forecasted</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sales Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>📊 Pipeline Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {salesMetrics.statusDistribution.map((status) => (
                    <div key={status.status} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge className={statusOptions.find(s => s.label === status.status)?.color || 'bg-gray-100'}>
                          {status.status}
                        </Badge>
                        <span className="text-sm">{status.count} prospects</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(status.value / 1000).toFixed(1)}K</p>
                        <p className="text-xs text-muted-foreground">Pipeline value</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎯 Category Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {salesMetrics.categoryPerformance.map((category) => (
                    <div key={category.category} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-sm">{category.category}</h4>
                        <Badge variant="outline">{category.prospects} prospects</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-muted-foreground">Revenue</p>
                          <p className="font-medium">${(category.totalRevenue / 1000).toFixed(0)}K</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Avg RPD</p>
                          <p className="font-medium">${category.avgRPD.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Conv Rate</p>
                          <p className="font-medium">{category.conversionRate}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities & Top Prospects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🔥 High Priority Prospects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {turkishDevelopersComplete
                    .filter(dev => dev.priority === 'Very High' || dev.priority === 'High')
                    .slice(0, 4)
                    .map((developer) => (
                      <div key={developer.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                           onClick={() => { setSelectedDeveloper(developer); onSubPageChange('developer-detail'); }}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{developer.developerName}</p>
                            <p className="text-xs text-muted-foreground">{developer.developerApps}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">${(developer.dealSize / 1000).toFixed(1)}K</p>
                          <p className="text-xs text-green-600">{developer.conversionProbability}% prob</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📅 Upcoming Follow-ups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {turkishDevelopersComplete
                    .filter(dev => dev.nextFollowUp)
                    .sort((a, b) => new Date(a.nextFollowUp).getTime() - new Date(b.nextFollowUp).getTime())
                    .slice(0, 4)
                    .map((developer) => (
                      <div key={developer.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{developer.developerName}</p>
                            <p className="text-xs text-muted-foreground">{developer.actionItems.split(',')[0]}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{new Date(developer.nextFollowUp).toLocaleDateString()}</p>
                          <Badge className={statusOptions.find(s => s.label === developer.status)?.color || 'bg-gray-100'} style={{ fontSize: '10px' }}>
                            {developer.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="database">
          <DeveloperDatabase 
            onBack={() => setActiveTab('dashboard')} 
            developers={turkishDevelopersComplete} 
            onViewDeveloper={(dev) => { setSelectedDeveloper(dev); onSubPageChange('developer-detail'); }}
          />
        </TabsContent>

        <TabsContent value="pipeline">
          <SalesPipeline 
            onBack={() => setActiveTab('dashboard')} 
            developers={turkishDevelopersComplete} 
          />
        </TabsContent>

        <TabsContent value="analytics">
          <MarketAnalysis 
            onBack={() => setActiveTab('dashboard')} 
            developers={turkishDevelopersComplete} 
            salesMetrics={salesMetrics}
          />
        </TabsContent>

        <TabsContent value="forecasting">
          <RevenueForecasting 
            onBack={() => setActiveTab('dashboard')} 
            developers={turkishDevelopersComplete} 
            salesMetrics={salesMetrics}
          />
        </TabsContent>

        <TabsContent value="reports">
          <SalesReports 
            onBack={() => setActiveTab('dashboard')} 
            developers={turkishDevelopersComplete} 
            salesMetrics={salesMetrics}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Developer Database Component with Full Spreadsheet Format
function DeveloperDatabase({ onBack, developers, onViewDeveloper }: { onBack: () => void, developers: any[], onViewDeveloper: (dev: any) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortColumn, setSortColumn] = useState('revenues');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedDevelopers = developers
    .filter(dev => {
      const matchesSearch = searchQuery === '' || 
        dev.developerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dev.developerApps.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || dev.status.toLowerCase().replace(' ', '-') === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">🇹🇷 Complete Turkish Developer Database</h2>
          <p className="text-muted-foreground">Full spreadsheet format with all tracked metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search developers, apps, or companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statusOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Complete Database Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-40 cursor-pointer" onClick={() => handleSort('developerName')}>
                    Developer Name {sortColumn === 'developerName' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="w-48">Developer Apps</TableHead>
                  <TableHead className="w-32">Action Items</TableHead>
                  <TableHead className="w-32">Meeting Notes</TableHead>
                  <TableHead className="w-32">Category</TableHead>
                  <TableHead className="w-24">Store</TableHead>
                  <TableHead className="w-32 cursor-pointer" onClick={() => handleSort('downloads')}>
                    Downloads {sortColumn === 'downloads' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="w-32 cursor-pointer" onClick={() => handleSort('revenues')}>
                    Revenues {sortColumn === 'revenues' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="w-32">Top Countries</TableHead>
                  <TableHead className="w-32">Website</TableHead>
                  <TableHead className="w-32">LinkedIn</TableHead>
                  <TableHead className="w-24">Status</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedDevelopers.map((developer) => (
                  <TableRow key={developer.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-medium text-sm">{developer.developerName}</p>
                        <p className="text-xs text-muted-foreground">{developer.company}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{developer.developerApps}</p>
                        <Badge variant="outline" className="text-xs">{developer.category}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs text-muted-foreground max-w-32 truncate">
                        {developer.actionItems.split(',')[0]}...
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs text-muted-foreground max-w-32 truncate">
                        {developer.meetingNotes || '-'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{developer.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {developer.appstore && (
                          <a href={developer.appstore} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm" className="p-1">
                              <Smartphone className="w-3 h-3" />
                            </Button>
                          </a>
                        )}
                        {developer.googlePlay && (
                          <a href={developer.googlePlay} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm" className="p-1">
                              <Monitor className="w-3 h-3" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{(developer.downloads / 1000).toFixed(0)}K</p>
                        <p className="text-xs text-muted-foreground">${developer.avgRPD.toFixed(2)} RPD</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">${(developer.revenues / 1000).toFixed(0)}K</p>
                        <p className="text-xs text-green-600">${(developer.dealSize / 1000).toFixed(1)}K deal</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        {developer.topCountries.split(',').slice(0, 2).map((country: string, index: number) => (
                          <span key={index} className="block">
                            {country.trim() === 'US' ? '🇺🇸' : 
                             country.trim() === 'Brazil' ? '🇧🇷' :
                             country.trim() === 'UK' ? '🇬🇧' :
                             country.trim() === 'Germany' ? '🇩🇪' :
                             country.trim() === 'Russia' ? '🇷🇺' :
                             country.trim() === 'Canada' ? '🇨🇦' :
                             country.trim() === 'India' ? '🇮🇳' :
                             country.trim() === 'France' ? '🇫🇷' : '🌍'} {country.trim()}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {developer.website && (
                        <a href={developer.website} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm" className="p-1">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </a>
                      )}
                    </TableCell>
                    <TableCell>
                      {developer.linkedinInfo && (
                        <a href={developer.linkedinInfo} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm" className="p-1">
                            <LinkedinIcon className="w-3 h-3" />
                          </Button>
                        </a>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusOptions.find(s => s.label === developer.status)?.color || 'bg-gray-100'} style={{ fontSize: '10px' }}>
                        {developer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => onViewDeveloper(developer)}>
                        <Eye className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        Showing {filteredAndSortedDevelopers.length} of {developers.length} developers
      </div>
    </div>
  );
}

// Enhanced Sales Pipeline Component
function SalesPipeline({ onBack, developers }: { onBack: () => void, developers: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">📈 Sales Pipeline Management</h2>
          <p className="text-muted-foreground">Turkish developer prospect pipeline with real metrics</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Pipeline
        </Button>
      </div>

      {/* Pipeline Stages */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {statusOptions.slice(0, 5).map((status) => {
          const stageDevs = developers.filter(dev => dev.status.toLowerCase().replace(' ', '-') === status.value);
          const totalRevenue = stageDevs.reduce((sum, dev) => sum + dev.dealSize, 0);
          const avgConversion = stageDevs.reduce((sum, dev) => sum + dev.conversionProbability, 0) / (stageDevs.length || 1);
          
          return (
            <Card key={status.value}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{status.label}</CardTitle>
                  <Badge className={status.color}>{stageDevs.length}</Badge>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>${(totalRevenue / 1000).toFixed(0)}K pipeline</p>
                  <p>{avgConversion.toFixed(0)}% avg conversion</p>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {stageDevs.slice(0, 3).map((dev) => (
                    <div key={dev.id} className="p-2 bg-muted/50 rounded text-xs">
                      <p className="font-medium">{dev.developerName}</p>
                      <div className="flex justify-between mt-1">
                        <span>${(dev.dealSize / 1000).toFixed(1)}K</span>
                        <span className="text-green-600">{dev.conversionProbability}%</span>
                      </div>
                    </div>
                  ))}
                  {stageDevs.length > 3 && (
                    <p className="text-xs text-muted-foreground text-center">
                      +{stageDevs.length - 3} more
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Pipeline Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Developer</TableHead>
                <TableHead>App</TableHead>
                <TableHead>Deal Size</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Est. Close</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {developers
                .sort((a, b) => b.conversionProbability - a.conversionProbability)
                .map((developer) => (
                  <TableRow key={developer.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{developer.developerName}</p>
                        <p className="text-sm text-muted-foreground">{developer.company}</p>
                      </div>
                    </TableCell>
                    <TableCell>{developer.developerApps}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">${(developer.dealSize / 1000).toFixed(1)}K</p>
                        <p className="text-xs text-muted-foreground">5% of ${(developer.revenues / 1000).toFixed(0)}K</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-green-500 rounded-full" 
                            style={{ width: `${developer.conversionProbability}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{developer.conversionProbability}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{developer.estimatedCloseDate}</TableCell>
                    <TableCell>
                      <Badge className={statusOptions.find(s => s.label === developer.status)?.color}>
                        {developer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {developer.actionItems.split(',')[0]}
                        {developer.nextFollowUp && (
                          <p className="text-xs text-muted-foreground">
                            Due: {new Date(developer.nextFollowUp).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Additional components for the other sections would follow similar patterns...
// MarketAnalysis, RevenueForecasting, SalesReports, etc.

// Market Analysis Component
function MarketAnalysis({ onBack, developers, salesMetrics }: { onBack: () => void, developers: any[], salesMetrics: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">🇹🇷 Turkish Market Analysis</h2>
          <p className="text-muted-foreground">Comprehensive market intelligence and validation metrics</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Analysis
        </Button>
      </div>

      {/* Market Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-red-50">
        <CardHeader>
          <CardTitle>🇹🇷 Turkey Market Validation Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{salesMetrics.overview.turkishMarketShare}%</p>
              <p className="text-sm text-muted-foreground">Market Penetration</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">${(salesMetrics.overview.totalMarketValue / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-muted-foreground">Total Market Value</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{salesMetrics.overview.quarterlyGrowth}%</p>
              <p className="text-sm text-muted-foreground">Quarterly Growth</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{developers.length}</p>
              <p className="text-sm text-muted-foreground">Active Developers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Category Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Prospects</TableHead>
                <TableHead>Total Revenue</TableHead>
                <TableHead>Avg RPD</TableHead>
                <TableHead>Conversion Rate</TableHead>
                <TableHead>Market Share</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesMetrics.categoryPerformance.map((category: any) => (
                <TableRow key={category.category}>
                  <TableCell className="font-medium">{category.category}</TableCell>
                  <TableCell>{category.prospects}</TableCell>
                  <TableCell>${(category.totalRevenue / 1000).toFixed(0)}K</TableCell>
                  <TableCell>${category.avgRPD.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-blue-500 rounded-full" 
                          style={{ width: `${category.conversionRate}%` }}
                        />
                      </div>
                      <span className="text-sm">{category.conversionRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {((category.totalRevenue / salesMetrics.overview.totalMarketValue) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Geographic Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>🌍 Geographic Market Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">Top Export Markets</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>🇺🇸 United States</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>🇩🇪 Germany</span>
                  <span className="font-medium">12%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>🇬🇧 United Kingdom</span>
                  <span className="font-medium">8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>🇨🇦 Canada</span>
                  <span className="font-medium">6%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>🇧🇷 Brazil</span>
                  <span className="font-medium">9%</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Revenue by Market</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>US Market</span>
                  <span className="font-medium text-green-600">$647K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>European Markets</span>
                  <span className="font-medium text-blue-600">$234K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Other Markets</span>
                  <span className="font-medium text-purple-600">$136K</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Growth Opportunities</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-blue-50 rounded">
                  <p className="font-medium">🇯🇵 Japan Market</p>
                  <p className="text-muted-foreground">Zero penetration, high potential</p>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <p className="font-medium">🇫🇷 France Expansion</p>
                  <p className="text-muted-foreground">Growing mobile app market</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded">
                  <p className="font-medium">🇪🇸 Spanish Markets</p>
                  <p className="text-muted-foreground">Underserved developer base</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Revenue Forecasting Component
function RevenueForecasting({ onBack, developers, salesMetrics }: { onBack: () => void, developers: any[], salesMetrics: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">📈 Revenue Forecasting & Projections</h2>
          <p className="text-muted-foreground">Advanced revenue modeling based on Turkish market data</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Forecast
        </Button>
      </div>

      {/* Quarterly Targets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">${(salesMetrics.revenueForecasting.q1Target / 1000).toFixed(0)}K</p>
            <p className="text-sm text-muted-foreground">Q1 Target</p>
            <div className="mt-2">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">75% complete</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">${(salesMetrics.revenueForecasting.q2Target / 1000).toFixed(0)}K</p>
            <p className="text-sm text-muted-foreground">Q2 Target</p>
            <div className="mt-2">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="w-1/4 h-2 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Pipeline building</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">${(salesMetrics.revenueForecasting.q3Target / 1000).toFixed(0)}K</p>
            <p className="text-sm text-muted-foreground">Q3 Target</p>
            <div className="mt-2">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="w-1/5 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Early planning</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">${(salesMetrics.revenueForecasting.q4Target / 1000).toFixed(0)}K</p>
            <p className="text-sm text-muted-foreground">Q4 Target</p>
            <div className="mt-2">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="w-1/6 h-2 bg-orange-500 rounded-full"></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Strategy development</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>💰 Revenue Composition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Monthly Recurring Revenue</p>
                  <p className="text-sm text-muted-foreground">Subscription-based income</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">${(salesMetrics.revenueForecasting.monthlyRecurring / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-muted-foreground">+12% MoM</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Expansion Revenue</p>
                  <p className="text-sm text-muted-foreground">Upsells and upgrades</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-600">${(salesMetrics.revenueForecasting.expansionRevenue / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-muted-foreground">+8% MoM</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Churn Impact</p>
                  <p className="text-sm text-muted-foreground">Revenue lost to churn</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">-{salesMetrics.revenueForecasting.churnRate}%</p>
                  <p className="text-xs text-muted-foreground">Industry avg: 7%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🎯 Deal Probability Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Developer</TableHead>
                  <TableHead>Deal Size</TableHead>
                  <TableHead>Probability</TableHead>
                  <TableHead>Expected Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {developers
                  .sort((a, b) => (b.dealSize * b.conversionProbability / 100) - (a.dealSize * a.conversionProbability / 100))
                  .slice(0, 5)
                  .map((dev) => (
                    <TableRow key={dev.id}>
                      <TableCell className="font-medium">{dev.developerName}</TableCell>
                      <TableCell>${(dev.dealSize / 1000).toFixed(1)}K</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          dev.conversionProbability >= 80 ? 'bg-green-100 text-green-800' :
                          dev.conversionProbability >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {dev.conversionProbability}%
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${((dev.dealSize * dev.conversionProbability / 100) / 1000).toFixed(1)}K
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Forecasting Summary */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Turkish Market Forecast Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">Conservative Scenario</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Expected Revenue:</span>
                  <span className="font-medium">${(salesMetrics.overview.forecastedRevenue * 0.7 / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span>Deals Closed:</span>
                  <span className="font-medium">3-4 deals</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeline:</span>
                  <span className="font-medium">6-9 months</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Realistic Scenario</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Expected Revenue:</span>
                  <span className="font-medium text-blue-600">${(salesMetrics.overview.forecastedRevenue / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span>Deals Closed:</span>
                  <span className="font-medium">5-6 deals</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeline:</span>
                  <span className="font-medium">4-6 months</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Optimistic Scenario</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Expected Revenue:</span>
                  <span className="font-medium text-green-600">${(salesMetrics.overview.forecastedRevenue * 1.3 / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span>Deals Closed:</span>
                  <span className="font-medium">7-8 deals</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeline:</span>
                  <span className="font-medium">3-4 months</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Sales Reports Component
function SalesReports({ onBack, developers, salesMetrics }: { onBack: () => void, developers: any[], salesMetrics: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">📋 Sales Reports & Analytics</h2>
          <p className="text-muted-foreground">Comprehensive reporting suite for Turkish market validation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export All Reports
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Generate Executive Summary
          </Button>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Pipeline Performance Report</h3>
                <p className="text-sm text-muted-foreground">Weekly pipeline analysis</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Pipeline Value:</span>
                <span className="font-medium">${(salesMetrics.overview.totalPipelineValue / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex justify-between">
                <span>Deals in Progress:</span>
                <span className="font-medium">{developers.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Conversion:</span>
                <span className="font-medium">{salesMetrics.overview.avgConversionRate.toFixed(0)}%</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Market Validation Report</h3>
                <p className="text-sm text-muted-foreground">Turkish market insights</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Market Penetration:</span>
                <span className="font-medium">{salesMetrics.overview.turkishMarketShare}%</span>
              </div>
              <div className="flex justify-between">
                <span>Quarterly Growth:</span>
                <span className="font-medium text-green-600">+{salesMetrics.overview.quarterlyGrowth}%</span>
              </div>
              <div className="flex justify-between">
                <span>Active Categories:</span>
                <span className="font-medium">{salesMetrics.categoryPerformance.length}</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Analysis
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">Revenue Forecast Report</h3>
                <p className="text-sm text-muted-foreground">Future revenue projections</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Forecasted Revenue:</span>
                <span className="font-medium">${(salesMetrics.overview.forecastedRevenue / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex justify-between">
                <span>MRR Growth:</span>
                <span className="font-medium text-green-600">+12%</span>
              </div>
              <div className="flex justify-between">
                <span>Churn Rate:</span>
                <span className="font-medium">{salesMetrics.revenueForecasting.churnRate}%</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              <Download className="w-4 h-4 mr-2" />
              View Forecast
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Turkish Market Validation - Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">🎯 Market Validation Status</h4>
              <p className="text-sm mb-3">
                Turkey has been identified as our primary validation market with {developers.length} tracked developers 
                representing ${(salesMetrics.overview.totalMarketValue / 1000000).toFixed(1)}M in total market value. 
                Initial penetration at {salesMetrics.overview.turkishMarketShare}% shows strong validation potential.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Active Prospects</p>
                  <p className="font-medium">{developers.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Pipeline Value</p>
                  <p className="font-medium">${(salesMetrics.overview.totalPipelineValue / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Avg Deal Size</p>
                  <p className="font-medium">${(salesMetrics.overview.avgDealSize / 1000).toFixed(1)}K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Success Rate</p>
                  <p className="font-medium">{salesMetrics.overview.avgConversionRate.toFixed(0)}%</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">🏆 Top Performing Categories</h4>
                <div className="space-y-2">
                  {salesMetrics.categoryPerformance.slice(0, 3).map((category: any, index: number) => (
                    <div key={category.category} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <div>
                        <p className="font-medium text-sm">{category.category}</p>
                        <p className="text-xs text-muted-foreground">{category.prospects} prospects</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{category.conversionRate}%</p>
                        <p className="text-xs text-muted-foreground">conversion</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">📈 Key Performance Indicators</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Market penetration rate</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-1/4 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">{salesMetrics.overview.turkishMarketShare}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pipeline conversion rate</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-3/4 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">{salesMetrics.overview.avgConversionRate.toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Revenue forecast accuracy</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-5/6 h-2 bg-purple-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2">✅ Validation Milestones Achieved</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <ul className="space-y-1">
                    <li>✓ {developers.filter(d => d.status === 'Met').length} developers successfully engaged</li>
                    <li>✓ ${(salesMetrics.overview.totalPipelineValue / 1000).toFixed(0)}K pipeline value established</li>
                    <li>✓ {salesMetrics.categoryPerformance.length} market categories validated</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-1">
                    <li>✓ {salesMetrics.overview.avgConversionRate.toFixed(0)}% average conversion rate achieved</li>
                    <li>✓ {salesMetrics.overview.quarterlyGrowth}% quarterly growth rate demonstrated</li>
                    <li>✓ ${(salesMetrics.overview.avgDealSize / 1000).toFixed(1)}K average deal size confirmed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Developer Detail Component (Enhanced)
function DeveloperDetail({ developer, onBack }: { developer: any, onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sales Dashboard
        </Button>
        <div className="flex gap-2">
          {developer.linkedinInfo && (
            <Button variant="outline" size="sm">
              <LinkedinIcon className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
          )}
          {developer.website && (
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Website
            </Button>
          )}
          {developer.appstore && (
            <Button variant="outline" size="sm">
              <Smartphone className="w-4 h-4 mr-2" />
              App Store
            </Button>
          )}
          <Button>
            <Mail className="w-4 h-4 mr-2" />
            Contact
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Developer Profile */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{developer.developerName}</CardTitle>
                  <p className="text-muted-foreground">{developer.company}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={statusOptions.find(s => s.label === developer.status)?.color}>
                    {developer.status}
                  </Badge>
                  <Badge className={priorityOptions.find(p => p.value === developer.priority.toLowerCase().replace(' ', '-'))?.color}>
                    {developer.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-xl font-bold text-green-600">${(developer.revenues / 1000).toFixed(0)}K</p>
                  <p className="text-sm text-muted-foreground">App Revenue</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-xl font-bold text-blue-600">{(developer.downloads / 1000).toFixed(0)}K</p>
                  <p className="text-sm text-muted-foreground">Downloads</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-xl font-bold text-purple-600">${developer.avgRPD.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">RPD</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-xl font-bold text-orange-600">${(developer.dealSize / 1000).toFixed(1)}K</p>
                  <p className="text-sm text-muted-foreground">Deal Size</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">📱 App Details</h4>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{developer.developerApps}</h5>
                      <Badge variant="outline">{developer.category}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Top Countries</p>
                        <p>{developer.topCountries}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Store Presence</p>
                        <div className="flex gap-1">
                          {developer.appstore && <span>📱 iOS</span>}
                          {developer.googlePlay && <span>🤖 Android</span>}
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Competitor</p>
                        <p>{developer.competitor || 'None identified'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {developer.meetingNotes && (
                  <div>
                    <h4 className="font-medium mb-2">📝 Meeting Notes</h4>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">{developer.meetingNotes}</p>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">📋 Action Items</h4>
                  <div className="space-y-2">
                    {developer.actionItems.split(',').map((item: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-sm p-2 bg-blue-50 rounded">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span>{item.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🎯 Deal Scoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {developer.revenueScore}/100
                </div>
                <p className="text-sm text-muted-foreground">
                  {developer.growthPotential} Growth Potential
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Revenue Score</span>
                  <span className="font-medium">{Math.round(developer.revenueScore * 0.4)}/40</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Market Position</span>
                  <span className="font-medium">{Math.round(developer.revenueScore * 0.3)}/30</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Growth Trajectory</span>
                  <span className="font-medium">{Math.round(developer.revenueScore * 0.3)}/30</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Conversion Probability</span>
                  <span className="text-lg font-bold text-green-600">{developer.conversionProbability}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-green-500 rounded-full" 
                    style={{ width: `${developer.conversionProbability}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">📅 Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {developer.lastContact && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="font-medium">Last Contact</p>
                    <p className="text-muted-foreground">{new Date(developer.lastContact).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
              
              {developer.nextFollowUp && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <div>
                    <p className="font-medium">Next Follow-up</p>
                    <p className="text-muted-foreground">{new Date(developer.nextFollowUp).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
              
              {developer.estimatedCloseDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="font-medium">Est. Close Date</p>
                    <p className="text-muted-foreground">{developer.estimatedCloseDate}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">🌍 Market Presence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {developer.topCountries.split(',').map((country: string, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {country.trim() === 'US' ? '🇺🇸' : 
                         country.trim() === 'Brazil' ? '🇧🇷' :
                         country.trim() === 'UK' ? '🇬🇧' :
                         country.trim() === 'Germany' ? '🇩🇪' :
                         country.trim() === 'Russia' ? '🇷🇺' :
                         country.trim() === 'Canada' ? '🇨🇦' :
                         country.trim() === 'India' ? '🇮🇳' :
                         country.trim() === 'France' ? '🇫🇷' : '🌍'}
                      </span>
                      <span className="text-sm">{country.trim()}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Top {index + 1}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">🔗 Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-sm">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                <FileText className="w-4 h-4 mr-2" />
                Create Proposal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Lead Generation Component (Enhanced)
function LeadGeneration({ onBack, developers }: { onBack: () => void, developers: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">🎯 AI-Powered Lead Generation</h2>
          <p className="text-muted-foreground">Intelligent prospect discovery and prioritization for Turkish market</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Leads
        </Button>
      </div>

      {/* Lead Generation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{developers.filter(d => d.priority === 'Very High').length}</p>
            <p className="text-sm text-muted-foreground">Very High Priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{developers.filter(d => d.conversionProbability >= 80).length}</p>
            <p className="text-sm text-muted-foreground">High Probability</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{developers.filter(d => d.revenues >= 100000).length}</p>
            <p className="text-sm text-muted-foreground">$100K+ Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{developers.filter(d => d.status === 'Prospect').length}</p>
            <p className="text-sm text-muted-foreground">New Prospects</p>
          </CardContent>
        </Card>
      </div>

      {/* High Priority Prospects */}
      <Card>
        <CardHeader>
          <CardTitle>🔥 High Priority Prospects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Developer</TableHead>
                <TableHead>App Revenue</TableHead>
                <TableHead>Deal Potential</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Priority Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {developers
                .filter(dev => dev.priority === 'Very High' || dev.priority === 'High')
                .sort((a, b) => b.revenueScore - a.revenueScore)
                .map((developer) => (
                  <TableRow key={developer.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{developer.developerName}</p>
                        <p className="text-sm text-muted-foreground">{developer.developerApps}</p>
                        <Badge variant="outline" className="text-xs mt-1">{developer.category}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">${(developer.revenues / 1000).toFixed(0)}K</p>
                        <p className="text-sm text-muted-foreground">{(developer.downloads / 1000).toFixed(0)}K downloads</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">${(developer.dealSize / 1000).toFixed(1)}K</p>
                        <p className="text-sm text-muted-foreground">Annual potential</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-green-500 rounded-full" 
                            style={{ width: `${developer.conversionProbability}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{developer.conversionProbability}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-600">{developer.revenueScore}</p>
                        <Badge className={developer.priority === 'Very High' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}>
                          {developer.priority}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {developer.linkedinInfo && (
                          <Button variant="outline" size="sm">
                            <LinkedinIcon className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>🤖 AI Targeting Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Primary Focus
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• Target AI Art Generator developers (highest revenue potential)</li>
                  <li>• Focus on apps with $100K+ revenue and growing download trends</li>
                  <li>• Prioritize developers with US/European market presence</li>
                  <li>• Leverage LinkedIn for initial outreach (highest response rate)</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Market Timing
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• Q1 2024 optimal for Turkish market expansion</li>
                  <li>• AI app category growing 45% YoY in Turkey</li>
                  <li>• Mobile monetization increasing 23% annually</li>
                  <li>• Export-focused developers show highest growth</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📊 Lead Scoring Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Scoring Factors</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">App Revenue (40%)</span>
                    <span className="text-sm font-medium">High impact</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Growth Rate (25%)</span>
                    <span className="text-sm font-medium">Medium impact</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Market Reach (20%)</span>
                    <span className="text-sm font-medium">Medium impact</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Engagement Level (15%)</span>
                    <span className="text-sm font-medium">Low impact</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium mb-2">🎯 Sweet Spot Profile</h4>
                <div className="text-sm space-y-1">
                  <p>• Revenue: $75K-$200K annually</p>
                  <p>• Category: AI Art Generators, Productivity</p>
                  <p>• Markets: US + 2-3 secondary markets</p>
                  <p>• Status: Growing download trajectory</p>
                  <p>• RPD: $0.50+ (indicates monetization maturity)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}