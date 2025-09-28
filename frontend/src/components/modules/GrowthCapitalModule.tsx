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
  Briefcase,
  Plus,
  Wallet,
  LineChart,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Calculator,
  PlayCircle,
  PauseCircle
} from 'lucide-react';

interface GrowthCapitalModuleProps {
  subPage: string;
  selectedApp: any;
  onSubPageChange: (page: string, appData?: any) => void;
  appContext?: any;
  welcomeContext?: any;
}

// Enhanced enterprise financing data
const portfolioMetrics = {
  totalFundSize: 5200000,
  deployedCapital: 3100000,
  activeInvestments: 47,
  portfolioApps: 28,
  avgROI: 285,
  successRate: 74,
  monthlyDeployment: 285000,
  pipelineValue: 1850000,
  totalProfitGenerated: 8940000,
  netProfit: 4370000,
  costRecoveryRate: 82,
  averagePaybackPeriod: 4.2
};

// Enhanced investment performance data
const performanceMetrics = {
  portfolioGrowth: {
    currentValue: 8940000,
    previousValue: 6780000,
    growthRate: 31.8,
    monthlyGrowth: 2.4
  },
  riskMetrics: {
    sharpeRatio: 2.34,
    maxDrawdown: 8.2,
    volatility: 12.5,
    riskScore: 'Low'
  },
  benchmarkComparison: {
    industryAverage: 156,
    ourPerformance: 285,
    outperformance: 82.7,
    ranking: 'Top 5%'
  }
};

// Time series data for charts
const monthlyPerformance = [
  { month: 'Jan', revenue: 42000, costs: 28000, profit: 14000, roi: 150 },
  { month: 'Feb', revenue: 48000, costs: 31000, profit: 17000, roi: 155 },
  { month: 'Mar', revenue: 56000, costs: 35000, profit: 21000, roi: 160 },
  { month: 'Apr', revenue: 67000, costs: 39000, profit: 28000, roi: 172 },
  { month: 'May', revenue: 78000, costs: 43000, profit: 35000, roi: 181 },
  { month: 'Jun', revenue: 89000, costs: 46000, profit: 43000, roi: 194 },
  { month: 'Jul', revenue: 102000, costs: 48000, profit: 54000, roi: 213 },
  { month: 'Aug', revenue: 118000, costs: 51000, profit: 67000, roi: 231 },
  { month: 'Sep', revenue: 134000, costs: 53000, profit: 81000, roi: 253 },
  { month: 'Oct', revenue: 152000, costs: 55000, profit: 97000, roi: 276 },
  { month: 'Nov', revenue: 168000, costs: 57000, profit: 111000, roi: 295 },
  { month: 'Dec', revenue: 184000, costs: 59000, profit: 125000, roi: 312 }
];

const investmentTiers = [
  {
    name: 'Validation Stage',
    range: '$5K - $15K',
    targetApps: '<$1K MRR, high potential',
    marketingBudget: '$3K - $10K',
    creativeBudget: '$1K - $3K',
    techBudget: '$1K - $2K',
    active: 18,
    successRate: 82,
    avgROI: 145,
    totalInvested: 186000,
    totalReturns: 270000
  },
  {
    name: 'Growth Stage',
    range: '$15K - $35K',
    targetApps: '$1K-$5K MRR, proven traction',
    marketingBudget: '$10K - $25K',
    creativeBudget: '$3K - $7K',
    techBudget: '$2K - $3K',
    active: 22,
    successRate: 78,
    avgROI: 218,
    totalInvested: 524000,
    totalReturns: 1142000
  },
  {
    name: 'Scale Stage',
    range: '$35K - $75K',
    targetApps: '$5K+ MRR, scaling opportunity',
    marketingBudget: '$25K - $50K',
    creativeBudget: '$7K - $15K',
    techBudget: '$3K - $10K',
    active: 7,
    successRate: 86,
    avgROI: 347,
    totalInvested: 364000,
    totalReturns: 1263000
  }
];

const activeInvestments = [
  {
    id: 1,
    appName: 'FitTracker Pro',
    developer: 'HealthTech Studios',
    tier: 'Growth Stage',
    investment: 28000,
    deployed: 28000,
    monthlyRevenue: 9200,
    preInvestmentRevenue: 2800,
    incrementalRevenue: 6400,
    profitShare: 3200,
    roi: 167,
    status: 'profitable',
    startDate: '2024-01-15',
    costRecoveryProgress: 100,
    projectedPayback: 'Complete',
    performanceScore: 92,
    riskLevel: 'Low',
    marketCap: 340000,
    nextPayout: '2025-01-01'
  },
  {
    id: 2,
    appName: 'StudyBuddy AI',
    developer: 'EduTech Innovations',
    tier: 'Validation Stage',
    investment: 12000,
    deployed: 12000,
    monthlyRevenue: 3400,
    preInvestmentRevenue: 800,
    incrementalRevenue: 2600,
    profitShare: 1300,
    roi: 87,
    status: 'recovering',
    startDate: '2024-03-10',
    costRecoveryProgress: 67,
    projectedPayback: '2.1 months',
    performanceScore: 74,
    riskLevel: 'Medium',
    marketCap: 89000,
    nextPayout: '2024-12-15'
  },
  {
    id: 3,
    appName: 'MealPlanner Pro',
    developer: 'Nutrition Apps Ltd',
    tier: 'Scale Stage',
    investment: 52000,
    deployed: 52000,
    monthlyRevenue: 18600,
    preInvestmentRevenue: 6200,
    incrementalRevenue: 12400,
    profitShare: 6200,
    roi: 312,
    status: 'scaling',
    startDate: '2023-11-20',
    costRecoveryProgress: 100,
    projectedPayback: 'Complete - Scaling',
    performanceScore: 96,
    riskLevel: 'Low',
    marketCap: 580000,
    nextPayout: '2024-12-01'
  },
  {
    id: 4,
    appName: 'TaskMaster Pro',
    developer: 'Productivity Inc',
    tier: 'Growth Stage',
    investment: 24000,
    deployed: 24000,
    monthlyRevenue: 7800,
    preInvestmentRevenue: 3200,
    incrementalRevenue: 4600,
    profitShare: 2300,
    roi: 145,
    status: 'profitable',
    startDate: '2024-02-28',
    costRecoveryProgress: 89,
    projectedPayback: '1.2 months',
    performanceScore: 88,
    riskLevel: 'Low',
    marketCap: 195000,
    nextPayout: '2024-12-28'
  },
  {
    id: 5,
    appName: 'BudgetWise',
    developer: 'FinTech Solutions',
    tier: 'Scale Stage',
    investment: 48000,
    deployed: 48000,
    monthlyRevenue: 16200,
    preInvestmentRevenue: 5800,
    incrementalRevenue: 10400,
    profitShare: 5200,
    roi: 267,
    status: 'profitable',
    startDate: '2024-01-08',
    costRecoveryProgress: 100,
    projectedPayback: 'Complete',
    performanceScore: 94,
    riskLevel: 'Low',
    marketCap: 485000,
    nextPayout: '2025-01-08'
  }
];

export function GrowthCapitalModule({ subPage, selectedApp, onSubPageChange, appContext, welcomeContext }: GrowthCapitalModuleProps) {
  const [activeTab, setActiveTab] = useState('performance');
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null);
  const [timeframe, setTimeframe] = useState('12m');
  const [showProjections, setShowProjections] = useState(false);

  if (subPage === 'investment-detail' && selectedInvestment) {
    return <InvestmentDetail investment={selectedInvestment} onBack={() => onSubPageChange('')} />;
  }

  if (subPage === 'fund-management') {
    return <FundManagement onBack={() => onSubPageChange('')} />;
  }

  if (subPage === 'grant-operations') {
    return <GrantOperations onBack={() => onSubPageChange('')} />;
  }

  if (subPage === 'partner-revenue') {
    return <PartnerRevenue onBack={() => onSubPageChange('')} />;
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">💰 Growth Capital Management</h1>
          <p className="text-muted-foreground">
            Enterprise investment portfolio with real-time performance analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="12m">12 Months</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Portfolio Report
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Investment
          </Button>
        </div>
      </div>

      {/* Enhanced Portfolio Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">💰 Portfolio Value</p>
                <p className="text-2xl font-bold text-green-600">${(performanceMetrics.portfolioGrowth.currentValue / 1000000).toFixed(1)}M</p>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                  <p className="text-xs text-green-600">+{performanceMetrics.portfolioGrowth.growthRate}%</p>
                </div>
              </div>
              <Wallet className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">🎯 Average ROI</p>
                <p className="text-2xl font-bold text-blue-600">{portfolioMetrics.avgROI}%</p>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-blue-500" />
                  <p className="text-xs text-blue-600">vs {performanceMetrics.benchmarkComparison.industryAverage}% industry</p>
                </div>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">💵 Net Profit</p>
                <p className="text-2xl font-bold text-purple-600">${(portfolioMetrics.netProfit / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-purple-600">{portfolioMetrics.costRecoveryRate}% cost recovery</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">⚡ Success Rate</p>
                <p className="text-2xl font-bold text-orange-600">{portfolioMetrics.successRate}%</p>
                <p className="text-xs text-orange-600">{portfolioMetrics.activeInvestments} active</p>
              </div>
              <Award className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">📊 Sharpe Ratio</p>
                <p className="text-2xl font-bold text-indigo-600">{performanceMetrics.riskMetrics.sharpeRatio}</p>
                <p className="text-xs text-indigo-600">{performanceMetrics.riskMetrics.riskScore} risk</p>
              </div>
              <Shield className="w-8 h-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">⏱️ Avg Payback</p>
                <p className="text-2xl font-bold text-emerald-600">{portfolioMetrics.averagePaybackPeriod}</p>
                <p className="text-xs text-emerald-600">months</p>
              </div>
              <Clock className="w-8 h-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="performance">Investment Performance</TabsTrigger>
          <TabsTrigger value="portfolio">Active Portfolio</TabsTrigger>
          <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
          <TabsTrigger value="fund-ops">Fund Operations</TabsTrigger>
          <TabsTrigger value="grants">Grant Programs</TabsTrigger>
          <TabsTrigger value="partnerships">Partner Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Chart */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  Portfolio Performance Trend
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowProjections(!showProjections)}
                  >
                    {showProjections ? <PauseCircle className="w-4 h-4 mr-1" /> : <PlayCircle className="w-4 h-4 mr-1" />}
                    {showProjections ? 'Hide' : 'Show'} Projections
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Interactive Performance Chart</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Monthly ROI, revenue, and profit trends with predictive modeling
                    </p>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      {monthlyPerformance.slice(-4).map((month) => (
                        <div key={month.month} className="bg-white/70 rounded p-2">
                          <p className="font-medium">{month.month}</p>
                          <p className="text-green-600">${(month.revenue / 1000).toFixed(0)}K</p>
                          <p className="text-blue-600">{month.roi}% ROI</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Real-time Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Monthly Growth:</span>
                    <div className="flex items-center gap-1">
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-green-600">+{performanceMetrics.portfolioGrowth.monthlyGrowth}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Volatility:</span>
                    <span className="font-semibold">{performanceMetrics.riskMetrics.volatility}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Max Drawdown:</span>
                    <span className="font-semibold text-red-600">-{performanceMetrics.riskMetrics.maxDrawdown}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Benchmark vs:</span>
                    <div className="flex items-center gap-1">
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-green-600">+{performanceMetrics.benchmarkComparison.outperformance}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Performance Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">94/100</div>
                    <p className="text-sm text-muted-foreground mb-4">Portfolio Performance Score</p>
                    <Badge className="bg-green-100 text-green-800">
                      {performanceMetrics.benchmarkComparison.ranking}
                    </Badge>
                    <div className="mt-4 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Returns:</span>
                        <span className="text-green-600">Excellent</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk Management:</span>
                        <span className="text-green-600">Strong</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Consistency:</span>
                        <span className="text-blue-600">Good</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Investment Tier Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Investment Tier Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {investmentTiers.map((tier, index) => (
                  <div key={tier.name} className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{tier.name}</h3>
                      <Badge variant="outline">{tier.active} active</Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{tier.avgROI}%</p>
                          <p className="text-xs text-muted-foreground">Avg ROI</p>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{tier.successRate}%</p>
                          <p className="text-xs text-muted-foreground">Success Rate</p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Invested:</span>
                          <span className="font-semibold">${(tier.totalInvested / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Returns:</span>
                          <span className="font-semibold text-green-600">${(tier.totalReturns / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Net Profit:</span>
                          <span className="font-semibold text-purple-600">${((tier.totalReturns - tier.totalInvested) / 1000).toFixed(0)}K</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Progress 
                          value={(tier.totalReturns / tier.totalInvested) * 50} 
                          className="h-2" 
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {((tier.totalReturns / tier.totalInvested - 1) * 100).toFixed(0)}% total return
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Investments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Top Performing Investments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeInvestments
                  .sort((a, b) => b.roi - a.roi)
                  .slice(0, 3)
                  .map((investment, index) => (
                    <div key={investment.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold">{investment.appName}</h3>
                          <p className="text-sm text-muted-foreground">{investment.developer}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{investment.roi}%</p>
                        <p className="text-sm text-muted-foreground">ROI</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${investment.profitShare.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Monthly Profit</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          {/* Active Investments Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>🎯 Active Investment Portfolio</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeInvestments.map((investment) => (
                  <Card key={investment.id} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500"
                        onClick={() => { setSelectedInvestment(investment); onSubPageChange('investment-detail'); }}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <Rocket className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{investment.appName}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-sm text-muted-foreground">{investment.developer}</span>
                              <Badge variant="outline">{investment.tier}</Badge>
                              <InvestmentStatusBadge status={investment.status} />
                              <Badge className={`text-xs ${
                                investment.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                                investment.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {investment.riskLevel} Risk
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">{investment.roi}%</p>
                          <p className="text-sm text-muted-foreground">ROI</p>
                          <div className="mt-1">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-muted-foreground">Score: {investment.performanceScore}/100</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Investment</p>
                          <p className="font-semibold">${investment.investment.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                          <p className="font-semibold text-blue-600">${investment.monthlyRevenue.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Incremental</p>
                          <p className="font-semibold text-green-600">${investment.incrementalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Profit Share</p>
                          <p className="font-semibold text-purple-600">${investment.profitShare.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Cost Recovery</p>
                          <p className="font-semibold text-orange-600">{investment.costRecoveryProgress}%</p>
                        </div>
                        <div className="text-center p-3 bg-indigo-50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Market Cap</p>
                          <p className="font-semibold text-indigo-600">${(investment.marketCap / 1000).toFixed(0)}K</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          Started: {new Date(investment.startDate).toLocaleDateString()} • 
                          Payback: {investment.projectedPayback} • 
                          Next Payout: {investment.nextPayout}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <BarChart3 className="w-4 h-4 mr-1" />
                            Analytics
                          </Button>
                          <Button variant="outline" size="sm">
                            <DollarSign className="w-4 h-4 mr-1" />
                            Payouts
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4 mr-1" />
                            Manage
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AdvancedAnalyticsView />
        </TabsContent>

        <TabsContent value="fund-ops" className="space-y-6">
          <FundOperationsView onNavigate={onSubPageChange} />
        </TabsContent>

        <TabsContent value="grants" className="space-y-6">
          <GrantProgramsView onNavigate={onSubPageChange} />
        </TabsContent>

        <TabsContent value="partnerships" className="space-y-6">
          <PartnershipRevenueView onNavigate={onSubPageChange} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Investment Status Badge Component
function InvestmentStatusBadge({ status }: { status: string }) {
  const statusConfig = {
    profitable: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', label: 'Profitable' },
    recovering: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300', label: 'Recovering' },
    scaling: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', label: 'Scaling' },
    underperforming: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', label: 'Review Required' }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.recovering;

  return (
    <Badge className={`${config.bg} ${config.text} ${config.border} border`}>
      {config.label}
    </Badge>
  );
}

// Advanced Analytics View Component
function AdvancedAnalyticsView() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">📊 Advanced Performance Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Risk Analysis Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-lg font-bold text-green-600">2.34</p>
                  <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-lg font-bold text-yellow-600">12.5%</p>
                  <p className="text-sm text-muted-foreground">Volatility</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Portfolio Concentration:</span>
                  <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Sector Diversification:</span>
                  <Badge className="bg-blue-100 text-blue-800">Good</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Liquidity Risk:</span>
                  <Badge className="bg-green-100 text-green-800">Low</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Correlation Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Market Correlation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">0.23</div>
                <p className="text-sm text-muted-foreground">Market Beta</p>
                <p className="text-xs text-blue-600">Low correlation with market</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>App Store Index:</span>
                  <span className="font-medium">0.31</span>
                </div>
                <div className="flex justify-between">
                  <span>Tech Sector:</span>
                  <span className="font-medium">0.18</span>
                </div>
                <div className="flex justify-between">
                  <span>Mobile Gaming:</span>
                  <span className="font-medium">0.45</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Attribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Performance Attribution Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">34%</p>
              <p className="text-sm text-muted-foreground">Marketing Optimization</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">28%</p>
              <p className="text-sm text-muted-foreground">Product Improvements</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">22%</p>
              <p className="text-sm text-muted-foreground">Market Conditions</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">16%</p>
              <p className="text-sm text-muted-foreground">Other Factors</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Fund Operations View Component
function FundOperationsView({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">💼 Fund Operations Management</h2>
        <Button onClick={() => onNavigate('fund-management')}>
          <Settings className="w-4 h-4 mr-2" />
          Manage Fund
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Capital Deployment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Fund Size</span>
                <span className="font-semibold">${(portfolioMetrics.totalFundSize / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Deployed Capital</span>
                <span className="font-semibold text-blue-600">${(portfolioMetrics.deployedCapital / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Available Capital</span>
                <span className="font-semibold text-green-600">${((portfolioMetrics.totalFundSize - portfolioMetrics.deployedCapital) / 1000000).toFixed(1)}M</span>
              </div>
              <Progress value={(portfolioMetrics.deployedCapital / portfolioMetrics.totalFundSize) * 100} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {((portfolioMetrics.deployedCapital / portfolioMetrics.totalFundSize) * 100).toFixed(1)}% deployed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Portfolio Diversification:</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">Optimal</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Category Concentration:</span>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Monitor</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Geographic Spread:</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">Good</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Performance Risk:</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">Low</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Grant Programs View Component
function GrantProgramsView({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">🏛️ Grant Program Operations</h2>
        <Button onClick={() => onNavigate('grant-operations')}>
          <Building className="w-4 h-4 mr-2" />
          Manage Programs
        </Button>
      </div>

      <div className="text-center py-12">
        <Building className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-medium mb-2">Grant Programs</h3>
        <p className="text-muted-foreground mb-4">
          Government grant application management and success tracking
        </p>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Grant Program
        </Button>
      </div>
    </div>
  );
}

// Partnership Revenue View Component
function PartnershipRevenueView({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">🤝 Partnership Revenue Stream</h2>
        <Button onClick={() => onNavigate('partner-revenue')}>
          <Handshake className="w-4 h-4 mr-2" />
          Manage Partners
        </Button>
      </div>

      <div className="text-center py-12">
        <Handshake className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-medium mb-2">Partnership Revenue</h3>
        <p className="text-muted-foreground mb-4">
          Revenue sharing and partnership management dashboard
        </p>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Partnership
        </Button>
      </div>
    </div>
  );
}

// Investment Detail Component
function InvestmentDetail({ investment, onBack }: { investment: any, onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Button>
        <Badge variant="secondary">Investment Analysis</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>📊 {investment.appName} - Detailed Investment Analysis</CardTitle>
          <p className="text-muted-foreground">
            Comprehensive performance metrics and projections
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Investment Detail Analysis</h3>
            <p className="text-muted-foreground mb-4">
              Detailed investment performance, cost breakdown, and future projections
            </p>
            <Button>
              <Activity className="w-4 h-4 mr-2" />
              View Full Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Fund Management Component
function FundManagement({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <Badge variant="secondary">Fund Management</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>💼 Fund Management Operations</CardTitle>
          <p className="text-muted-foreground">
            Capital deployment and fund operations management
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Wallet className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Fund Management</h3>
            <p className="text-muted-foreground mb-4">
              Advanced fund operations and capital management tools
            </p>
            <Button>
              <Settings className="w-4 h-4 mr-2" />
              Manage Fund
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Grant Operations Component
function GrantOperations({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <Badge variant="secondary">Grant Operations</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>🏛️ Grant Program Operations</CardTitle>
          <p className="text-muted-foreground">
            Government grant application and success tracking
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Grant Operations</h3>
            <p className="text-muted-foreground mb-4">
              Comprehensive grant program management and tracking
            </p>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              View Programs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Partner Revenue Component
function PartnerRevenue({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <Badge variant="secondary">Partner Revenue</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>🤝 Partnership Revenue Management</CardTitle>
          <p className="text-muted-foreground">
            Revenue sharing and partnership analytics
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Handshake className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Partnership Revenue</h3>
            <p className="text-muted-foreground mb-4">
              Advanced partnership analytics and revenue optimization
            </p>
            <Button>
              <DollarSign className="w-4 h-4 mr-2" />
              View Revenue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}