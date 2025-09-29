import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import {
  ArrowLeft,
  ArrowRight,
  DollarSign,
  Building,
  Handshake,
  TrendingUp,
  Target,
  Brain,
  CheckCircle,
  AlertTriangle,
  Star,
  Globe,
  Rocket,
  Users,
  BarChart3,
  FileText,
  Shield,
  Zap,
  Search,
  Filter,
  Download,
  Settings,
  Eye,
  Edit,
  Calendar,
  Clock,
  Award,
  Sparkles,
  ExternalLink,
  CreditCard,
  PieChart,
  Activity,
  Briefcase
} from 'lucide-react';

interface FinancingModuleProps {
  subPage: string;
  selectedApp: any;
  onSubPageChange: (page: string, appData?: any) => void;
  appContext: any;
  welcomeContext?: any;
}

// Sample data for financing options
const financingMetrics = {
  availableFunding: 2850000,
  governmentGrants: 1450000,
  partnerSolutions: 89,
  activeInvestments: 12
};

const clarityChainInvestment = {
  maxAmount: 50000,
  marketingBudget: 35000,
  asoBudget: 10000,
  techBudget: 5000,
  profitShare: 50,
  eligibilityScore: 87,
  estimatedRoi: 340,
  paybackPeriod: '4-6 months'
};

const governmentGrants = [
  {
    id: 1,
    country: '🇪🇺',
    name: 'EU Horizon Europe Digital Innovation',
    amount: 250000,
    matchScore: 92,
    deadline: '2024-09-15',
    status: 'available',
    qualifications: [
      'EU entity or partnership',
      'Innovation focus with digital component',
      'Clear commercialization plan',
      'Team expertise in target domain'
    ],
    aiInsight: 'Your app\'s AI features align perfectly with EU digital innovation priorities. Success probability: 78%',
    processingTime: '6-12 months',
    successRate: 18
  },
  {
    id: 2,
    country: '🇩🇪',
    name: 'EXIST Startup Grant',
    amount: 125000,
    matchScore: 89,
    deadline: '2024-08-30',
    status: 'available',
    qualifications: [
      'German entity or founder',
      'University connection helpful',
      'Innovative technology basis',
      'Clear business model'
    ],
    aiInsight: 'Strong match for your app category. Consider partnering with German university for higher success rate.',
    processingTime: '3-6 months',
    successRate: 35
  },
  {
    id: 3,
    country: '🇹🇷',
    name: 'TUBITAK Tech Entrepreneurship',
    amount: 45000,
    matchScore: 94,
    deadline: '2024-07-28',
    status: 'deadline-soon',
    qualifications: [
      'Turkish company registration',
      'Technology commercialization focus',
      'R&D component in project',
      'Export potential'
    ],
    aiInsight: 'Excellent fit with 94% match score. Your Turkish market presence gives significant advantage.',
    processingTime: '2-4 months',
    successRate: 42
  },
  {
    id: 4,
    country: '🇬🇧',
    name: 'Innovate UK Smart Grant',
    amount: 180000,
    matchScore: 76,
    deadline: '2024-10-12',
    status: 'available',
    qualifications: [
      'UK entity required',
      'Disruptive innovation potential',
      'Commercial viability',
      'UK economic benefit'
    ],
    aiInsight: 'Moderate match. Consider UK subsidiary for eligibility. Focus on innovation uniqueness.',
    processingTime: '6-9 months',
    successRate: 22
  }
];

const partnerSolutions = [
  {
    id: 1,
    category: 'Analytics',
    name: 'Mixpanel Professional',
    provider: 'Mixpanel',
    logo: '📊',
    description: 'Advanced product analytics with 40% ClarityChain discount',
    originalPrice: 999,
    discountedPrice: 599,
    savings: 400,
    offer: '40% Off + Free Setup',
    isPremium: true,
    features: ['Advanced segmentation', 'Cohort analysis', 'Custom dashboards', 'API access']
  },
  {
    id: 2,
    category: 'Marketing',
    name: 'OneSignal Growth',
    provider: 'OneSignal',
    logo: '🔔',
    description: 'Push notification platform with enhanced features',
    originalPrice: 9,
    discountedPrice: 4.5,
    savings: 4.5,
    offer: '50% Off + Premium Features',
    isPremium: false,
    features: ['Unlimited notifications', 'Advanced targeting', 'A/B testing', 'Analytics']
  },
  {
    id: 3,
    category: 'Creative',
    name: 'Adobe Creative Cloud',
    provider: 'Adobe',
    logo: '🎨',
    description: 'Complete creative suite for app design and marketing',
    originalPrice: 52.99,
    discountedPrice: 37.09,
    savings: 15.90,
    offer: '30% Off + ClarityChain Templates',
    isPremium: true,
    features: ['Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro']
  },
  {
    id: 4,
    category: 'Development',
    name: 'GitHub Team',
    provider: 'GitHub',
    logo: '💻',
    description: 'Advanced collaboration tools for development teams',
    originalPrice: 4,
    discountedPrice: 2.8,
    savings: 1.2,
    offer: '30% Off + Premium Support',
    isPremium: false,
    features: ['Private repositories', 'Advanced CI/CD', 'Security scanning', 'Team management']
  },
  {
    id: 5,
    category: 'Analytics',
    name: 'Amplitude Growth',
    provider: 'Amplitude',
    logo: '📈',
    description: 'Digital optimization platform with predictive analytics',
    originalPrice: 1995,
    discountedPrice: 1197,
    savings: 798,
    offer: '40% Off + Dedicated Success Manager',
    isPremium: true,
    features: ['Behavioral analytics', 'Predictive insights', 'Experimentation', 'Personalization']
  },
  {
    id: 6,
    category: 'Payment',
    name: 'Stripe Professional',
    provider: 'Stripe',
    logo: '💳',
    description: 'Payment processing with reduced fees for ClarityChain clients',
    originalPrice: 2.9,
    discountedPrice: 2.6,
    savings: 0.3,
    offer: '0.3% Fee Reduction + Advanced Analytics',
    isPremium: false,
    features: ['Global payments', 'Subscription billing', 'Advanced reporting', 'Fraud prevention']
  }
];

const activeInvestments = [
  {
    id: 1,
    appName: 'FitTracker Pro',
    appIcon: '💪',
    investmentType: 'Growth Stage',
    totalInvestment: 25000,
    monthlyRevenue: 8400,
    profitShare: 2100,
    status: 'profitable',
    roi: 156,
    investmentDate: '2024-01-15',
    performance: [
      { month: 'Jan', revenue: 3200 },
      { month: 'Feb', revenue: 4800 },
      { month: 'Mar', revenue: 6200 },
      { month: 'Apr', revenue: 7100 },
      { month: 'May', revenue: 7800 },
      { month: 'Jun', revenue: 8400 }
    ]
  },
  {
    id: 2,
    appName: 'StudyBuddy',
    appIcon: '📚',
    investmentType: 'Validation Stage',
    totalInvestment: 12000,
    monthlyRevenue: 2800,
    profitShare: 600,
    status: 'recovering',
    roi: 45,
    investmentDate: '2024-03-10',
    performance: [
      { month: 'Mar', revenue: 800 },
      { month: 'Apr', revenue: 1400 },
      { month: 'May', revenue: 2100 },
      { month: 'Jun', revenue: 2800 }
    ]
  },
  {
    id: 3,
    appName: 'MealPlanner',
    appIcon: '🍽️',
    investmentType: 'Scale Stage',
    totalInvestment: 45000,
    monthlyRevenue: 15600,
    profitShare: 4200,
    status: 'active',
    roi: 298,
    investmentDate: '2023-11-20',
    performance: [
      { month: 'Jan', revenue: 9200 },
      { month: 'Feb', revenue: 11800 },
      { month: 'Mar', revenue: 13200 },
      { month: 'Apr', revenue: 14100 },
      { month: 'May', revenue: 14800 },
      { month: 'Jun', revenue: 15600 }
    ]
  }
];

export function FinancingModule({ subPage, selectedApp, onSubPageChange, appContext, welcomeContext }: FinancingModuleProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [selectedGrant, setSelectedGrant] = useState<any>(null);
  const [partnerFilter, setPartnerFilter] = useState('all');

  if (subPage === 'investment-detail') {
    return <InvestmentDetail onBack={() => onSubPageChange('')} appContext={appContext} />;
  }

  if (subPage === 'grant-detail' && selectedGrant) {
    return <GrantDetail grant={selectedGrant} onBack={() => onSubPageChange('')} />;
  }

  if (subPage === 'partner-detail') {
    return <PartnerDetail onBack={() => onSubPageChange('')} />;
  }

  const filteredPartners = partnerSolutions.filter(partner =>
    partnerFilter === 'all' || partner.category.toLowerCase() === partnerFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">💰 Financing & Growth Capital</h1>
          <p className="text-muted-foreground">
            Investment, grants, and partnership solutions for app growth
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Financial Reports
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <Rocket className="w-4 h-4 mr-2" />
            Apply for Investment
          </Button>
        </div>
      </div>

      {/* ClarityChain Investment Hero */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400">
        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center">
                <Target className="w-8 h-8 text-yellow-900" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-yellow-900 mb-2">🎯 KARBON PUBLISHING INVESTMENT</h2>
                <p className="text-yellow-800">Accelerate your app growth with our publishing partnership</p>
              </div>
            </div>
            <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
              Apply Now →
            </Button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-yellow-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Marketing & UA Budget:</span>
                  <span className="font-semibold text-green-600">Up to ${clarityChainInvestment.marketingBudget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">ASO & Creative Production:</span>
                  <span className="font-semibold text-green-600">Up to ${clarityChainInvestment.asoBudget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Technical Implementation:</span>
                  <span className="font-semibold text-green-600">Up to ${clarityChainInvestment.techBudget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Profit Share:</span>
                  <span className="font-semibold text-blue-600">{clarityChainInvestment.profitShare}% after cost recovery</span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{clarityChainInvestment.eligibilityScore}/100</div>
                  <p className="text-sm text-green-700 font-medium">Your Eligibility Score</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-green-600 mt-1">Excellent - Pre-approved</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="bg-yellow-600 hover:bg-yellow-700" onClick={() => setShowInvestmentModal(true)}>
                <Rocket className="w-4 h-4 mr-2" />
                Start Application
              </Button>
              <Button variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                See Projections
              </Button>
              <Button variant="ghost">
                <Users className="w-4 h-4 mr-2" />
                Discuss
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">💰 Available Funding</p>
                <p className="text-2xl font-bold text-green-600">${(financingMetrics.availableFunding / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-green-600">Ready to deploy</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">🏛️ Government Grants</p>
                <p className="text-2xl font-bold text-blue-600">${(financingMetrics.governmentGrants / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-blue-600">Available programs</p>
              </div>
              <Building className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">🤝 Partner Solutions</p>
                <p className="text-2xl font-bold text-purple-600">{financingMetrics.partnerSolutions}</p>
                <p className="text-xs text-purple-600">Premium services</p>
              </div>
              <Handshake className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">📈 Active Investments</p>
                <p className="text-2xl font-bold text-orange-600">{financingMetrics.activeInvestments}</p>
                <p className="text-xs text-orange-600">Portfolio apps</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="grants">Government Grants</TabsTrigger>
          <TabsTrigger value="partners">Partner Solutions</TabsTrigger>
          <TabsTrigger value="portfolio">Investment Portfolio</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Investment Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-yellow-600" />
                  Investment Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">ClarityChain Publishing Investment</h4>
                      <Badge className="bg-yellow-100 text-yellow-800">Pre-approved</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Up to $50K for marketing, ASO, and technical implementation</p>
                    <div className="flex justify-between text-sm">
                      <span>Estimated ROI: {clarityChainInvestment.estimatedRoi}%</span>
                      <span>Payback: {clarityChainInvestment.paybackPeriod}</span>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Series Seed Preparation</h4>
                      <Badge variant="outline">Future</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Preparation for institutional funding rounds</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Grant Matches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  Top Grant Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {governmentGrants.slice(0, 3).map((grant) => (
                    <div key={grant.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{grant.country}</span>
                          <span className="font-medium text-sm">{grant.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{grant.matchScore}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600 font-medium">${grant.amount.toLocaleString()}</span>
                        <span className="text-muted-foreground">Success: {grant.successRate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Partner Services Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="w-5 h-5 text-purple-600" />
                Featured Partner Solutions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {partnerSolutions.slice(0, 3).map((partner) => (
                  <div key={partner.id} className="p-4 border rounded-lg relative">
                    {partner.isPremium && (
                      <Badge className="absolute top-2 right-2 bg-purple-600 text-white text-xs">
                        Premium
                      </Badge>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{partner.logo}</div>
                      <div>
                        <h4 className="font-medium">{partner.name}</h4>
                        <p className="text-xs text-muted-foreground">{partner.provider}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{partner.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-green-600">${partner.discountedPrice}</span>
                        <span className="text-sm text-muted-foreground line-through ml-2">${partner.originalPrice}</span>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                        {partner.offer.split(' ')[0]} {partner.offer.split(' ')[1]}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grants" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">🏛️ Government Grant Programs</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter by Country
              </Button>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search Programs
              </Button>
            </div>
          </div>

          {/* Grant Cards */}
          <div className="space-y-4">
            {governmentGrants.map((grant) => (
              <Card key={grant.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{grant.country}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{grant.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xl font-bold text-green-600">${grant.amount.toLocaleString()}</span>
                          <Badge className="bg-green-100 text-green-800 border-green-300">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            {grant.matchScore}% Match
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <StatusBadge status={grant.status} deadline={grant.deadline} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium mb-2">Qualification Requirements:</h4>
                      <div className="space-y-1">
                        {grant.qualifications.map((qual, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{qual}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Processing Time:</span>
                        <span className="font-medium">{grant.processingTime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Success Rate:</span>
                        <span className="font-medium text-green-600">{grant.successRate}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Application Deadline:</span>
                        <span className="font-medium">{new Date(grant.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded mb-4">
                    <div className="flex items-start gap-2">
                      <Brain className="w-4 h-4 text-purple-600 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        <strong>AI Insight:</strong> {grant.aiInsight}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <FileText className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Requirements
                    </Button>
                    <Button variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Get Help
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="partners" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">🤝 Partner Solutions Marketplace</h2>
            <div className="flex gap-2">
              <Select value={partnerFilter} onValueChange={setPartnerFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="analytics">📊 Analytics</SelectItem>
                  <SelectItem value="marketing">🔔 Marketing</SelectItem>
                  <SelectItem value="creative">🎨 Creative</SelectItem>
                  <SelectItem value="development">💻 Development</SelectItem>
                  <SelectItem value="payment">💳 Payment</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search Services
              </Button>
            </div>
          </div>

          {/* Partner Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPartners.map((partner) => (
              <Card key={partner.id} className="hover:shadow-md transition-shadow relative">
                {partner.isPremium && (
                  <Badge className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold z-10">
                    Premium
                  </Badge>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {partner.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground">{partner.provider}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{partner.description}</p>

                  <div className="space-y-2 mb-4">
                    {partner.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-green-600">${partner.discountedPrice}</span>
                        <span className="text-sm text-muted-foreground line-through">${partner.originalPrice}</span>
                      </div>
                      <p className="text-xs text-green-600">Save ${partner.savings}/month</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 text-xs">
                      {partner.offer.split('+')[0]}
                    </Badge>
                  </div>

                  <Button className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">📈 Investment Portfolio</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Performance Report
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>

          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Total Invested</p>
                <p className="text-2xl font-bold">$82K</p>
                <p className="text-xs text-muted-foreground">3 active investments</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-600">$26.8K</p>
                <p className="text-xs text-green-600">+18% growth</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Profit Share</p>
                <p className="text-2xl font-bold text-blue-600">$6.9K</p>
                <p className="text-xs text-blue-600">Monthly return</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Portfolio ROI</p>
                <p className="text-2xl font-bold text-purple-600">185%</p>
                <p className="text-xs text-purple-600">Average return</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Investments */}
          <div className="space-y-4">
            {activeInvestments.map((investment) => (
              <Card key={investment.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                        {investment.appIcon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{investment.appName}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <Badge variant="outline">{investment.investmentType}</Badge>
                          <InvestmentStatusBadge status={investment.status} />
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{investment.roi}%</p>
                      <p className="text-sm text-muted-foreground">ROI</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Investment</p>
                      <p className="font-semibold">${investment.totalInvestment.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                      <p className="font-semibold text-green-600">${investment.monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Profit Share</p>
                      <p className="font-semibold text-blue-600">${investment.profitShare.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Investment Date</p>
                      <p className="font-semibold">{new Date(investment.investmentDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Performance
                    </Button>
                    <Button variant="outline" size="sm">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Payouts
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700" size="sm">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Scale Up
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Investment Application Modal */}
      {showInvestmentModal && (
        <InvestmentApplicationModal
          onClose={() => setShowInvestmentModal(false)}
          appContext={appContext}
        />
      )}
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status, deadline }: { status: string, deadline: string }) {
  const statusConfig = {
    available: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', label: 'Application Open' },
    'deadline-soon': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300', label: 'Deadline Soon' },
    processing: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300', label: 'Under Review' },
    closed: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300', label: 'Closed' }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.available;
  const daysUntilDeadline = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="text-right">
      <Badge className={`${config.bg} ${config.text} ${config.border} border`}>
        {config.label}
      </Badge>
      <p className="text-xs text-muted-foreground mt-1">
        {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Deadline passed'}
      </p>
    </div>
  );
}

// Investment Status Badge Component
function InvestmentStatusBadge({ status }: { status: string }) {
  const statusConfig = {
    active: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', label: 'Active' },
    recovering: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300', label: 'Recovering' },
    profitable: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', label: 'Profitable' }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;

  return (
    <Badge className={`${config.bg} ${config.text} ${config.border} border`}>
      {config.label}
    </Badge>
  );
}

// Investment Application Modal Component
function InvestmentApplicationModal({ onClose, appContext }: { onClose: () => void, appContext: any }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    appName: appContext?.name || '',
    currentRevenue: '',
    monthlyDownloads: '',
    targetMarkets: '',
    growthGoals: '',
    agreesToTerms: false
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">🎯 ClarityChain Investment Application</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">App Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">App Name</label>
                <Input
                  value={formData.appName}
                  onChange={(e) => setFormData({...formData, appName: e.target.value})}
                  placeholder="Enter your app name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Monthly Revenue</label>
                  <Input
                    value={formData.currentRevenue}
                    onChange={(e) => setFormData({...formData, currentRevenue: e.target.value})}
                    placeholder="$0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Monthly Downloads</label>
                  <Input
                    value={formData.monthlyDownloads}
                    onChange={(e) => setFormData({...formData, monthlyDownloads: e.target.value})}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Projection Card */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              AI Investment Projection
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Monthly Revenue</p>
                <p className="text-lg font-semibold">${formData.currentRevenue || '0'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Projected Revenue (6 months)</p>
                <p className="text-lg font-semibold text-green-600">
                  ${formData.currentRevenue ? (parseInt(formData.currentRevenue.replace(/[^0-9]/g, '')) * 3.4).toLocaleString() : '0'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Investment Recommended</p>
                <p className="text-lg font-semibold text-blue-600">$25,000</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Confidence Score</p>
                <p className="text-lg font-semibold text-purple-600">87%</p>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="space-y-3">
            <h4 className="font-medium">Investment Terms</h4>
            <div className="flex items-start gap-3">
              <Checkbox
                checked={formData.agreesToTerms}
                onCheckedChange={(checked) => setFormData({...formData, agreesToTerms: checked as boolean})}
              />
              <div className="text-sm text-muted-foreground">
                <p>I agree to the ClarityChain Publishing Investment terms:</p>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• 50% profit share after cost recovery</li>
                  <li>• Marketing and technical implementation support</li>
                  <li>• Monthly reporting and performance tracking</li>
                  <li>• 12-month initial partnership term</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1" disabled={!formData.agreesToTerms}>
              <Rocket className="w-4 h-4 mr-2" />
              Submit Application
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Investment Detail Component
function InvestmentDetail({ onBack, appContext }: { onBack: () => void, appContext: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Financing
        </Button>
        <Badge variant="secondary">Investment Analysis</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🎯 Detailed Investment Analysis</CardTitle>
          <p className="text-muted-foreground">
            Comprehensive investment evaluation and projections
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Investment Analysis</h3>
            <p className="text-muted-foreground mb-4">
              Detailed investment evaluation, projections, and terms
            </p>
            <Button>
              <BarChart3 className="w-4 h-4 mr-2" />
              View Investment Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Grant Detail Component
function GrantDetail({ grant, onBack }: { grant: any, onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Grants
        </Button>
        <Badge variant="secondary">Grant Application</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🏛️ {grant.name}</CardTitle>
          <p className="text-muted-foreground">
            Detailed grant requirements and application process
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Grant Application</h3>
            <p className="text-muted-foreground mb-4">
              Complete application process and requirements
            </p>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              Start Application
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Partner Detail Component
function PartnerDetail({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Partners
        </Button>
        <Badge variant="secondary">Partner Solutions</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🤝 Partner Solution Details</CardTitle>
          <p className="text-muted-foreground">
            Detailed service information and setup process
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Handshake className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Service Integration</h3>
            <p className="text-muted-foreground mb-4">
              Complete setup and configuration process
            </p>
            <Button>
              <ExternalLink className="w-4 h-4 mr-2" />
              Setup Service
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}