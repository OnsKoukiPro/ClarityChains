import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import {
  CheckCircle,
  AlertCircle,
  Edit2,
  Save,
  X,
  Filter,
  Search,
  ArrowUpDown,
  Eye,
  BarChart3
} from 'lucide-react';

interface LineItemReviewProps {
  onNavigate: (view: string) => void;
}

export default function LineItemReview({ onNavigate }: LineItemReviewProps) {
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const lineItems = [
    {
      id: 1,
      description: 'Industrial Motor 5HP 240V',
      sku: 'MOT-5HP-240',
      suppliers: [
        { name: 'TechCorp', price: 1250.00, currency: 'USD', leadTime: '2 weeks', qty: 10 },
        { name: 'Global Supply', price: 1180.00, currency: 'USD', leadTime: '3 weeks', qty: 10 },
        { name: 'Premier Solutions', price: 1320.00, currency: 'USD', leadTime: '1 week', qty: 10 }
      ],
      status: 'verified',
      confidence: 95,
      needsReview: false
    },
    {
      id: 2,
      description: 'Stainless Steel Pipes 4" x 10ft',
      sku: 'PIPE-SS-4-10',
      suppliers: [
        { name: 'TechCorp', price: 85.50, currency: 'USD', leadTime: '1 week', qty: 50 },
        { name: 'Global Supply', price: 92.00, currency: 'USD', leadTime: '2 weeks', qty: 50 },
        { name: 'Premier Solutions', price: 78.00, currency: 'USD', leadTime: '3 weeks', qty: 50 }
      ],
      status: 'needs_review',
      confidence: 78,
      needsReview: true,
      issues: ['Unit mismatch detected', 'Currency conversion needed']
    },
    {
      id: 3,
      description: 'Safety Valve Assembly',
      sku: 'VALVE-SAFE-001',
      suppliers: [
        { name: 'TechCorp', price: 450.00, currency: 'USD', leadTime: '4 weeks', qty: 5 },
        { name: 'Global Supply', price: 425.00, currency: 'USD', leadTime: '3 weeks', qty: 5 }
      ],
      status: 'verified',
      confidence: 92,
      needsReview: false
    },
    {
      id: 4,
      description: 'Control Panel Digital Display',
      sku: 'CTRL-DIG-DISP',
      suppliers: [
        { name: 'TechCorp', price: 780.00, currency: 'USD', leadTime: '2 weeks', qty: 3 },
        { name: 'Premier Solutions', price: 820.00, currency: 'USD', leadTime: '1 week', qty: 3 }
      ],
      status: 'pending',
      confidence: 65,
      needsReview: true,
      issues: ['Description needs clarification']
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case 'needs_review':
        return <Badge className="bg-orange-100 text-orange-800">Needs Review</Badge>;
      case 'pending':
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const filteredItems = lineItems.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: lineItems.length,
    verified: lineItems.filter(item => item.status === 'verified').length,
    needsReview: lineItems.filter(item => item.needsReview).length,
    pending: lineItems.filter(item => item.status === 'pending').length
  };

  return (
    <div className="min-w-0 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Line Item Review</h1>
          <p className="text-muted-foreground">Review and correct extracted line items before analysis</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onNavigate('processing')}>
            Back to Processing
          </Button>
          <Button onClick={() => onNavigate('analysis')}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Proceed to Analysis
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Total Items</h3>
                <p className="text-2xl font-semibold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Verified</h3>
                <p className="text-2xl font-semibold">{stats.verified}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium">Needs Review</h3>
                <p className="text-2xl font-semibold">{stats.needsReview}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Pending</h3>
                <p className="text-2xl font-semibold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by description or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="needs_review">Needs Review</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Line Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Line Items ({filteredItems.length})</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Sort
              </Button>
              <Button variant="outline" size="sm">
                Select All
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium">{item.description}</h4>
                        {getStatusBadge(item.status)}
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-muted-foreground">Confidence:</span>
                          <span className={`text-xs font-medium ${getConfidenceColor(item.confidence)}`}>
                            {item.confidence}%
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>

                      {item.issues && (
                        <div className="mt-2 space-y-1">
                          {item.issues.map((issue, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm text-orange-600">
                              <AlertCircle className="w-3 h-3" />
                              <span>{issue}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {item.needsReview && (
                      <Button variant="outline" size="sm">
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Supplier Comparison Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground">Supplier</th>
                        <th className="text-right py-2 px-3 font-medium text-muted-foreground">Price</th>
                        <th className="text-right py-2 px-3 font-medium text-muted-foreground">Quantity</th>
                        <th className="text-center py-2 px-3 font-medium text-muted-foreground">Lead Time</th>
                        <th className="text-right py-2 px-3 font-medium text-muted-foreground">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.suppliers.map((supplier, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-2 px-3 font-medium">{supplier.name}</td>
                          <td className="py-2 px-3 text-right">
                            ${supplier.price.toFixed(2)} {supplier.currency}
                          </td>
                          <td className="py-2 px-3 text-right">{supplier.qty}</td>
                          <td className="py-2 px-3 text-center">{supplier.leadTime}</td>
                          <td className="py-2 px-3 text-right font-medium">
                            ${(supplier.price * supplier.qty).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Panel */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Review Complete</h3>
              <p className="text-sm text-muted-foreground">
                {stats.needsReview} items still need review. You can proceed to analysis or continue reviewing.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                Save Progress
              </Button>
              <Button onClick={() => onNavigate('analysis')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Run Analysis
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}