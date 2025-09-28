import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { 
  ArrowLeft,
  Target,
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit,
  Filter,
  Calendar,
  Download,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Smartphone,
  Star,
  X,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface OwnerDashboardModuleProps {
  subPage: string;
  selectedApp: any;
  onSubPageChange: (page: string, appData?: any) => void;
}

// Executive Portfolio Metrics
const portfolioMetrics = {
  portfolioROI: 34.7,
  monthlyRevenue: 425600,
  activeUsers: 1847200,
  netProfit: 186300,
  profitMargin: 43.8,
  customerAcquisitionCost: 4.32,
  lifetimeValue: 127.45,
  churnRate: 5.2
};

const secondaryMetrics = {
  userAcquisition: {
    newInstalls: 42850,
    organicGrowth: 68.4,
    paidConversions: 31.6,
    retentionRate: 78.2
  },
  portfolioHealth: {
    profitableApps: 23,
    breakEvenApps: 8,
    lossApps: 4,
    riskScore: 'Low'
  },
  operatingCosts: {
    marketingSpend: 89200,
    developmentCosts: 156400,
    infrastructureCosts: 23800,
    operationalExpenses: 67200
  }
};

const portfolioApps = [
  {
    id: 1,
    name: 'FitTracker Pro',
    developer: 'HealthTech Studios',
    category: 'Health & Fitness',
    platform: 'iOS + Android',
    icon: '💪',
    mau: 245000,
    dau: 89000,
    retention: 82.4,
    sessions: 3.2,
    monthlyRevenue: 34500,
    arpu: 0.14,
    ltv: 15.60,
    cvr: 4.2,
    newInstalls: 8400,
    cac: 3.80,
    ltvCacRatio: 4.1,
    roi: 42.8,
    netProfit: 12400,
    rating: 4.6,
    status: 'profitable',
    riskLevel: 'low'
  },
  {
    id: 2,
    name: 'StudyBuddy AI',
    developer: 'EduTech Innovations',
    category: 'Education',
    platform: 'iOS + Android',
    icon: '📚',
    mau: 156000,
    dau: 67000,
    retention: 76.8,
    sessions: 2.8,
    monthlyRevenue: 18900,
    arpu: 0.12,
    ltv: 12.40,
    cvr: 3.8,
    newInstalls: 5200,
    cac: 4.20,
    ltvCacRatio: 2.95,
    roi: 28.4,
    netProfit: 4800,
    rating: 4.4,
    status: 'recovering',
    riskLevel: 'medium'
  },
  {
    id: 3,
    name: 'MealPlanner Pro',
    developer: 'Nutrition Apps Ltd',
    category: 'Food & Drink',
    platform: 'iOS + Android',
    icon: '🍽️',
    mau: 89000,
    dau: 34000,
    retention: 68.2,
    sessions: 2.1,
    monthlyRevenue: 8200,
    arpu: 0.09,
    ltv: 8.90,
    cvr: 2.1,
    newInstalls: 2800,
    cac: 5.60,
    ltvCacRatio: 1.59,
    roi: 12.6,
    netProfit: -1200,
    rating: 4.1,
    status: 'loss',
    riskLevel: 'high'
  },
  {
    id: 4,
    name: 'TaskMaster',
    developer: 'Productivity Co',
    category: 'Productivity',
    platform: 'iOS + Android',
    icon: '✅',
    mau: 312000,
    dau: 98000,
    retention: 79.6,
    sessions: 4.1,
    monthlyRevenue: 28700,
    arpu: 0.09,
    ltv: 11.20,
    cvr: 3.4,
    newInstalls: 6700,
    cac: 3.20,
    ltvCacRatio: 3.5,
    roi: 38.9,
    netProfit: 9800,
    rating: 4.5,
    status: 'profitable',
    riskLevel: 'low'
  },
  {
    id: 5,
    name: 'BudgetWise',
    developer: 'FinTech Solutions',
    category: 'Finance',
    platform: 'iOS + Android',
    icon: '💰',
    mau: 187000,
    dau: 72000,
    retention: 84.1,
    sessions: 3.7,
    monthlyRevenue: 31200,
    arpu: 0.17,
    ltv: 18.90,
    cvr: 5.2,
    newInstalls: 4900,
    cac: 4.10,
    ltvCacRatio: 4.61,
    roi: 45.2,
    netProfit: 11600,
    rating: 4.7,
    status: 'profitable',
    riskLevel: 'low'
  }
];

export function OwnerDashboardModule({ subPage, selectedApp, onSubPageChange }: OwnerDashboardModuleProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAppModal, setShowAppModal] = useState(false);
  const [selectedAppDetail, setSelectedAppDetail] = useState<any>(null);
  const [editingCosts, setEditingCosts] = useState(false);
  const [operatingCosts, setOperatingCosts] = useState(secondaryMetrics.operatingCosts);

  const handleAppClick = (app: any) => {
    setSelectedAppDetail(app);
    setShowAppModal(true);
  };

  const getROIColor = (roi: number) => {
    if (roi >= 30) return 'text-green-600';
    if (roi >= 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      profitable: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', label: 'Profitable' },
      recovering: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300', label: 'Recovering' },
      loss: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', label: 'Loss' },
      'break-even': { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300', label: 'Break-even' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.profitable;

    return (
      <Badge className={`${config.bg} ${config.text} ${config.border} border h-6 px-3`}>
        {config.label}
      </Badge>
    );
  };

  const getRiskBadge = (risk: string) => {
    const riskConfig = {
      low: { bg: 'bg-green-100', text: 'text-green-800', label: 'Low Risk' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Medium Risk' },
      high: { bg: 'bg-red-100', text: 'text-red-800', label: 'High Risk' }
    };

    const config = riskConfig[risk as keyof typeof riskConfig] || riskConfig.low;

    return (
      <Badge className={`${config.bg} ${config.text} h-5 px-2 text-xs font-semibold`}>
        {config.label}
      </Badge>
    );
  };

  if (subPage === 'cost-management') {
    return <CostManagement onBack={() => onSubPageChange('')} />;
  }

  if (subPage === 'performance-analytics') {
    return <PerformanceAnalytics onBack={() => onSubPageChange('')} />;
  }

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">👑 Owner Dashboard</h1>
          <p className="text-gray-600">
            Executive portfolio performance monitoring and detailed app analytics
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Reports
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            Manage Portfolio
          </Button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-40 h-10">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-40 h-10">
              <SelectValue placeholder="Filter Apps" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Apps</SelectItem>
              <SelectItem value="profitable">Profitable Only</SelectItem>
              <SelectItem value="high-risk">High Risk</SelectItem>
              <SelectItem value="top-revenue">Top Revenue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics View
          </Button>
        </div>
      </div>

      {/* ROI Alert */}
      {portfolioMetrics.portfolioROI >= 30 && (
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-400 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-900">🎯 Portfolio Performance Excellent</h3>
              <p className="text-green-800">
                Your portfolio ROI of {portfolioMetrics.portfolioROI}% exceeds the 30% target. Consider scaling successful apps.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Executive Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-white border-green-200 h-40">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-10 h-10 text-green-600" />
              <span className="text-sm font-medium text-gray-600">PORTFOLIO ROI</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`text-3xl font-bold ${getROIColor(portfolioMetrics.portfolioROI)}`}>
                  {portfolioMetrics.portfolioROI}%
                </span>
                <ArrowUpRight className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-gray-600">Target: 30% • +4.7% vs last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200 h-40">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-10 h-10 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">MONTHLY REVENUE</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-green-600">
                  ${(portfolioMetrics.monthlyRevenue / 1000).toFixed(0)}K
                </span>
                <ArrowUpRight className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-gray-600">+18.3% growth this month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200 h-40">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-purple-600" />
              <span className="text-sm font-medium text-gray-600">ACTIVE USERS</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-blue-600">
                  {(portfolioMetrics.activeUsers / 1000000).toFixed(1)}M
                </span>
                <ArrowUpRight className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-gray-600">Monthly Active Users</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-200 h-40">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-10 h-10 text-orange-600" />
              <span className="text-sm font-medium text-gray-600">NET PROFIT</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-green-600">
                  ${(portfolioMetrics.netProfit / 1000).toFixed(0)}K
                </span>
                <ArrowUpRight className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-gray-600">{portfolioMetrics.profitMargin}% margin</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="h-52">
          <CardHeader>
            <CardTitle className="text-lg">📈 User Acquisition</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">New Installs</span>
              <span className="font-semibold">{secondaryMetrics.userAcquisition.newInstalls.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Organic Growth</span>
              <span className="font-semibold">{secondaryMetrics.userAcquisition.organicGrowth}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Paid Conversions</span>
              <span className="font-semibold">{secondaryMetrics.userAcquisition.paidConversions}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Retention Rate</span>
              <span className="font-semibold text-green-600">{secondaryMetrics.userAcquisition.retentionRate}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="h-52">
          <CardHeader>
            <CardTitle className="text-lg">🎯 Portfolio Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Profitable Apps</span>
              <span className="font-semibold text-green-600">{secondaryMetrics.portfolioHealth.profitableApps}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Break-even Apps</span>
              <span className="font-semibold text-gray-600">{secondaryMetrics.portfolioHealth.breakEvenApps}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Loss Apps</span>
              <span className="font-semibold text-red-600">{secondaryMetrics.portfolioHealth.lossApps}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Risk Score</span>
              <Badge className="bg-green-100 text-green-800">{secondaryMetrics.portfolioHealth.riskScore}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="h-52">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">💼 Operating Costs</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setEditingCosts(!editingCosts)}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Marketing Spend</span>
              {editingCosts ? (
                <Input 
                  type="number" 
                  value={operatingCosts.marketingSpend}
                  onChange={(e) => setOperatingCosts({...operatingCosts, marketingSpend: parseInt(e.target.value)})}
                  className="w-20 h-8 text-right"
                />
              ) : (
                <span className="font-semibold">${(operatingCosts.marketingSpend / 1000).toFixed(0)}K</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Development</span>
              {editingCosts ? (
                <Input 
                  type="number" 
                  value={operatingCosts.developmentCosts}
                  onChange={(e) => setOperatingCosts({...operatingCosts, developmentCosts: parseInt(e.target.value)})}
                  className="w-20 h-8 text-right"
                />
              ) : (
                <span className="font-semibold">${(operatingCosts.developmentCosts / 1000).toFixed(0)}K</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Infrastructure</span>
              {editingCosts ? (
                <Input 
                  type="number" 
                  value={operatingCosts.infrastructureCosts}
                  onChange={(e) => setOperatingCosts({...operatingCosts, infrastructureCosts: parseInt(e.target.value)})}
                  className="w-20 h-8 text-right"
                />
              ) : (
                <span className="font-semibold">${(operatingCosts.infrastructureCosts / 1000).toFixed(0)}K</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Operations</span>
              {editingCosts ? (
                <Input 
                  type="number" 
                  value={operatingCosts.operationalExpenses}
                  onChange={(e) => setOperatingCosts({...operatingCosts, operationalExpenses: parseInt(e.target.value)})}
                  className="w-20 h-8 text-right"
                />
              ) : (
                <span className="font-semibold">${(operatingCosts.operationalExpenses / 1000).toFixed(0)}K</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Performance Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">📊 Portfolio Performance</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-6 font-medium text-xs uppercase text-gray-600 tracking-wider min-w-[280px]">App Details</th>
                  <th className="text-left p-6 font-medium text-xs uppercase text-gray-600 tracking-wider min-w-[200px]">Users & Engagement</th>
                  <th className="text-left p-6 font-medium text-xs uppercase text-gray-600 tracking-wider min-w-[180px]">Revenue Metrics</th>
                  <th className="text-left p-6 font-medium text-xs uppercase text-gray-600 tracking-wider min-w-[160px]">Acquisition</th>
                  <th className="text-left p-6 font-medium text-xs uppercase text-gray-600 tracking-wider min-w-[150px]">Performance</th>
                  <th className="text-left p-6 font-medium text-xs uppercase text-gray-600 tracking-wider min-w-[120px]">Status</th>
                  <th className="text-left p-6 font-medium text-xs uppercase text-gray-600 tracking-wider min-w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolioApps.map((app) => (
                  <tr 
                    key={app.id} 
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleAppClick(app)}
                  >
                    {/* App Details */}
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
                          {app.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{app.name}</h3>
                          <p className="text-sm text-gray-600">{app.developer}</p>
                          <p className="text-xs text-gray-500">{app.category} • {app.platform}</p>
                        </div>
                      </div>
                    </td>

                    {/* Users & Engagement */}
                    <td className="p-6">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">MAU:</span>
                          <span className="font-semibold">{(app.mau / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">DAU:</span>
                          <span className="text-sm">{(app.dau / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Retention:</span>
                          <span className="text-xs">{app.retention}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Sessions:</span>
                          <span className="text-xs">{app.sessions}</span>
                        </div>
                      </div>
                    </td>

                    {/* Revenue Metrics */}
                    <td className="p-6">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Revenue:</span>
                          <span className="font-semibold text-green-600">${(app.monthlyRevenue / 1000).toFixed(1)}K</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">ARPU:</span>
                          <span className="text-sm">${app.arpu}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">LTV:</span>
                          <span className="text-xs">${app.ltv}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">CVR:</span>
                          <span className="text-xs">{app.cvr}%</span>
                        </div>
                      </div>
                    </td>

                    {/* Acquisition */}
                    <td className="p-6">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Installs:</span>
                          <span className="font-semibold text-blue-600">{(app.newInstalls / 1000).toFixed(1)}K</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">CAC:</span>
                          <span className="text-sm">${app.cac}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">LTV/CAC:</span>
                          <span className="text-xs">{app.ltvCacRatio}x</span>
                        </div>
                      </div>
                    </td>

                    {/* Performance */}
                    <td className="p-6">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">ROI:</span>
                          <span className={`font-semibold ${getROIColor(app.roi)}`}>{app.roi}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Profit:</span>
                          <span className={`text-sm ${app.netProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${(app.netProfit / 1000).toFixed(1)}K
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Rating:</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs">{app.rating}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-6">
                      <div className="space-y-2">
                        {getStatusBadge(app.status)}
                        {getRiskBadge(app.riskLevel)}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-6">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* App Details Modal */}
      {showAppModal && selectedAppDetail && (
        <AppDetailsModal 
          app={selectedAppDetail}
          onClose={() => setShowAppModal(false)}
        />
      )}
    </div>
  );
}

// App Details Modal Component
function AppDetailsModal({ app, onClose }: { app: any, onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              {app.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{app.name}</h2>
              <p className="text-gray-600">{app.developer} • {app.category}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Revenue Breakdown */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-lg">💰 Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Revenue</span>
                  <span className="font-semibold text-green-600">${(app.monthlyRevenue / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Profit</span>
                  <span className={`font-semibold ${app.netProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${(app.netProfit / 1000).toFixed(1)}K
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ROI</span>
                  <span className={`font-semibold ${getROIColor(app.roi)}`}>{app.roi}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ARPU</span>
                  <span className="font-semibold">${app.arpu}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">LTV</span>
                  <span className="font-semibold">${app.ltv}</span>
                </div>
              </CardContent>
            </Card>

            {/* User Metrics */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-lg">👥 User Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">MAU</span>
                  <span className="font-semibold">{(app.mau / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">DAU</span>
                  <span className="font-semibold">{(app.dau / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Retention</span>
                  <span className="font-semibold text-green-600">{app.retention}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sessions/User</span>
                  <span className="font-semibold">{app.sessions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">App Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{app.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Analysis */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-lg">📊 Cost Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">CAC</span>
                  <span className="font-semibold">${app.cac}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">LTV/CAC Ratio</span>
                  <span className={`font-semibold ${app.ltvCacRatio > 3 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {app.ltvCacRatio}x
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Conversion Rate</span>
                  <span className="font-semibold">{app.cvr}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New Installs</span>
                  <span className="font-semibold text-blue-600">{(app.newInstalls / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  {getStatusBadge(app.status)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>📈 Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Performance chart visualization</p>
                  <p className="text-sm text-gray-500">Revenue trends, user growth, and cost analysis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  function getROIColor(roi: number) {
    if (roi >= 30) return 'text-green-600';
    if (roi >= 20) return 'text-yellow-600';
    return 'text-red-600';
  }

  function getStatusBadge(status: string) {
    const statusConfig = {
      profitable: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', label: 'Profitable' },
      recovering: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300', label: 'Recovering' },
      loss: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', label: 'Loss' },
      'break-even': { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300', label: 'Break-even' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.profitable;

    return (
      <Badge className={`${config.bg} ${config.text} ${config.border} border h-6 px-3`}>
        {config.label}
      </Badge>
    );
  }
}

// Cost Management Component
function CostManagement({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <Badge variant="secondary">Cost Management</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>💼 Operating Cost Management</CardTitle>
          <p className="text-muted-foreground">
            Interactive cost analysis and budget management
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <DollarSign className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Cost Management</h3>
            <p className="text-muted-foreground mb-4">
              Advanced cost tracking and budget optimization tools
            </p>
            <Button>
              <Settings className="w-4 h-4 mr-2" />
              Manage Costs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Performance Analytics Component
function PerformanceAnalytics({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <Badge variant="secondary">Performance Analytics</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>📊 Advanced Performance Analytics</CardTitle>
          <p className="text-muted-foreground">
            Deep dive analytics and performance insights
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Performance Analytics</h3>
            <p className="text-muted-foreground mb-4">
              Comprehensive performance tracking and analytics dashboard
            </p>
            <Button>
              <Activity className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}