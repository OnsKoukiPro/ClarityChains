import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Plus, 
  Trash2, 
  FileText, 
  Users, 
  DollarSign, 
  Clock, 
  Target,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import { cn } from '../ui/utils';

interface RFXCreationProps {
  onNavigate: (view: string) => void;
}

export default function RFXCreation({ onNavigate }: RFXCreationProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: 'rfq', // rfq, rfp, rfi
    priority: 'medium',
    budget: '',
    currency: 'USD',
    publishDate: undefined as Date | undefined,
    responseDeadline: undefined as Date | undefined,
    evaluationDeadline: undefined as Date | undefined,
    requiresPrequalification: false,
    allowPartialBids: true,
    publicRFX: false,
    items: [{ id: 1, description: '', quantity: '', unit: '', specifications: '' }],
    evaluationCriteria: [
      { id: 1, criterion: 'Price', weight: 40 },
      { id: 2, criterion: 'Quality', weight: 30 },
      { id: 3, criterion: 'Delivery Time', weight: 20 },
      { id: 4, criterion: 'Experience', weight: 10 }
    ],
    supplierRequirements: {
      minimumYearsExperience: '',
      certifications: '',
      geographicRestrictions: '',
      minimumRevenue: ''
    },
    terms: {
      paymentTerms: '',
      deliveryTerms: '',
      warrantyRequirements: '',
      complianceRequirements: ''
    }
  });

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 'basic', title: 'Basic Information', icon: FileText },
    { id: 'items', title: 'Items & Requirements', icon: Target },
    { id: 'suppliers', title: 'Supplier Requirements', icon: Users },
    { id: 'evaluation', title: 'Evaluation Criteria', icon: CheckCircle },
    { id: 'terms', title: 'Terms & Timeline', icon: Clock },
    { id: 'review', title: 'Review & Publish', icon: AlertCircle }
  ];

  const addItem = () => {
    const newId = Math.max(...formData.items.map(item => item.id)) + 1;
    setFormData({
      ...formData,
      items: [...formData.items, { id: newId, description: '', quantity: '', unit: '', specifications: '' }]
    });
  };

  const removeItem = (id: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: number, field: string, value: string) => {
    setFormData({
      ...formData,
      items: formData.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  const updateEvaluationCriteria = (id: number, field: string, value: string | number) => {
    setFormData({
      ...formData,
      evaluationCriteria: formData.evaluationCriteria.map(criterion => 
        criterion.id === id ? { ...criterion, [field]: value } : criterion
      )
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basic Information
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">RFX Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Office Supplies Procurement Q1 2024"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office-supplies">Office Supplies</SelectItem>
                    <SelectItem value="it-equipment">IT Equipment</SelectItem>
                    <SelectItem value="professional-services">Professional Services</SelectItem>
                    <SelectItem value="facilities">Facilities Management</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="logistics">Logistics & Transportation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide a detailed description of what you're looking to procure..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>RFX Type *</Label>
                <RadioGroup 
                  value={formData.type} 
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rfq" id="rfq" />
                    <Label htmlFor="rfq">RFQ (Quote)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rfp" id="rfp" />
                    <Label htmlFor="rfp">RFP (Proposal)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rfi" id="rfi" />
                    <Label htmlFor="rfi">RFI (Information)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Estimated Budget</Label>
                <div className="flex space-x-2">
                  <Input
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="1000000"
                    type="number"
                  />
                  <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>RFX Visibility</Label>
                  <p className="text-sm text-muted-foreground">Make this RFX visible to all qualified suppliers</p>
                </div>
                <Switch
                  checked={formData.publicRFX}
                  onCheckedChange={(checked) => setFormData({ ...formData, publicRFX: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Require Prequalification</Label>
                  <p className="text-sm text-muted-foreground">Suppliers must be prequalified to respond</p>
                </div>
                <Switch
                  checked={formData.requiresPrequalification}
                  onCheckedChange={(checked) => setFormData({ ...formData, requiresPrequalification: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Allow Partial Bids</Label>
                  <p className="text-sm text-muted-foreground">Suppliers can bid on individual items</p>
                </div>
                <Switch
                  checked={formData.allowPartialBids}
                  onCheckedChange={(checked) => setFormData({ ...formData, allowPartialBids: checked })}
                />
              </div>
            </div>
          </div>
        );

      case 1: // Items & Requirements
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3>Items & Specifications</h3>
                <p className="text-sm text-muted-foreground">Define what you need suppliers to quote on</p>
              </div>
              <Button onClick={addItem} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="space-y-4">
              {formData.items.map((item, index) => (
                <Card key={item.id}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Item {index + 1}</CardTitle>
                      {formData.items.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Description *</Label>
                        <Input
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          placeholder="e.g., Office chairs, ergonomic"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Quantity</Label>
                        <Input
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                          placeholder="100"
                          type="number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Unit</Label>
                        <Select value={item.unit} onValueChange={(value) => updateItem(item.id, 'unit', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pieces">Pieces</SelectItem>
                            <SelectItem value="boxes">Boxes</SelectItem>
                            <SelectItem value="hours">Hours</SelectItem>
                            <SelectItem value="months">Months</SelectItem>
                            <SelectItem value="kg">Kilograms</SelectItem>
                            <SelectItem value="meters">Meters</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Specifications & Requirements</Label>
                      <Textarea
                        value={item.specifications}
                        onChange={(e) => updateItem(item.id, 'specifications', e.target.value)}
                        placeholder="Detailed specifications, technical requirements, quality standards..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2: // Supplier Requirements
        return (
          <div className="space-y-6">
            <div>
              <h3>Supplier Qualification Requirements</h3>
              <p className="text-sm text-muted-foreground">Set criteria suppliers must meet to participate</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="experience">Minimum Years of Experience</Label>
                <Input
                  id="experience"
                  value={formData.supplierRequirements.minimumYearsExperience}
                  onChange={(e) => setFormData({
                    ...formData,
                    supplierRequirements: {
                      ...formData.supplierRequirements,
                      minimumYearsExperience: e.target.value
                    }
                  })}
                  placeholder="5"
                  type="number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="revenue">Minimum Annual Revenue</Label>
                <Input
                  id="revenue"
                  value={formData.supplierRequirements.minimumRevenue}
                  onChange={(e) => setFormData({
                    ...formData,
                    supplierRequirements: {
                      ...formData.supplierRequirements,
                      minimumRevenue: e.target.value
                    }
                  })}
                  placeholder="1000000"
                  type="number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="certifications">Required Certifications</Label>
              <Textarea
                id="certifications"
                value={formData.supplierRequirements.certifications}
                onChange={(e) => setFormData({
                  ...formData,
                  supplierRequirements: {
                    ...formData.supplierRequirements,
                    certifications: e.target.value
                  }
                })}
                placeholder="ISO 9001, ISO 14001, SOC 2 Type II..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="geographic">Geographic Restrictions</Label>
              <Textarea
                id="geographic"
                value={formData.supplierRequirements.geographicRestrictions}
                onChange={(e) => setFormData({
                  ...formData,
                  supplierRequirements: {
                    ...formData.supplierRequirements,
                    geographicRestrictions: e.target.value
                  }
                })}
                placeholder="Must have operations in North America, EU compliance required..."
                rows={3}
              />
            </div>
          </div>
        );

      case 3: // Evaluation Criteria
        return (
          <div className="space-y-6">
            <div>
              <h3>Evaluation Criteria & Weights</h3>
              <p className="text-sm text-muted-foreground">Define how proposals will be evaluated (total weight must equal 100%)</p>
            </div>

            <div className="space-y-4">
              {formData.evaluationCriteria.map((criterion) => (
                <div key={criterion.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <Input
                      value={criterion.criterion}
                      onChange={(e) => updateEvaluationCriteria(criterion.id, 'criterion', e.target.value)}
                      placeholder="Evaluation criterion"
                    />
                  </div>
                  <div className="w-20">
                    <Input
                      value={criterion.weight}
                      onChange={(e) => updateEvaluationCriteria(criterion.id, 'weight', parseInt(e.target.value) || 0)}
                      placeholder="30"
                      type="number"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="w-8 text-sm text-muted-foreground">%</div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span>Total Weight:</span>
              <Badge variant={
                formData.evaluationCriteria.reduce((sum, c) => sum + c.weight, 0) === 100 
                  ? "default" 
                  : "destructive"
              }>
                {formData.evaluationCriteria.reduce((sum, c) => sum + c.weight, 0)}%
              </Badge>
            </div>
          </div>
        );

      case 4: // Terms & Timeline
        return (
          <div className="space-y-6">
            <div>
              <h3>Timeline & Deadlines</h3>
              <p className="text-sm text-muted-foreground">Set important dates for your RFX process</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Publish Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left",
                        !formData.publishDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.publishDate ? formData.publishDate.toLocaleDateString() : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.publishDate}
                      onSelect={(date) => setFormData({ ...formData, publishDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Response Deadline *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left",
                        !formData.responseDeadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.responseDeadline ? formData.responseDeadline.toLocaleDateString() : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.responseDeadline}
                      onSelect={(date) => setFormData({ ...formData, responseDeadline: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Evaluation Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left",
                        !formData.evaluationDeadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.evaluationDeadline ? formData.evaluationDeadline.toLocaleDateString() : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.evaluationDeadline}
                      onSelect={(date) => setFormData({ ...formData, evaluationDeadline: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Separator />

            <div>
              <h4>Terms & Conditions</h4>
              <p className="text-sm text-muted-foreground">Define commercial and delivery terms</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Payment Terms</Label>
                <Textarea
                  value={formData.terms.paymentTerms}
                  onChange={(e) => setFormData({
                    ...formData,
                    terms: { ...formData.terms, paymentTerms: e.target.value }
                  })}
                  placeholder="Net 30 days, 2% discount for early payment..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Delivery Terms</Label>
                <Textarea
                  value={formData.terms.deliveryTerms}
                  onChange={(e) => setFormData({
                    ...formData,
                    terms: { ...formData.terms, deliveryTerms: e.target.value }
                  })}
                  placeholder="FOB destination, delivery within 30 days..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Warranty Requirements</Label>
                <Textarea
                  value={formData.terms.warrantyRequirements}
                  onChange={(e) => setFormData({
                    ...formData,
                    terms: { ...formData.terms, warrantyRequirements: e.target.value }
                  })}
                  placeholder="Minimum 2-year warranty, on-site support..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Compliance Requirements</Label>
                <Textarea
                  value={formData.terms.complianceRequirements}
                  onChange={(e) => setFormData({
                    ...formData,
                    terms: { ...formData.terms, complianceRequirements: e.target.value }
                  })}
                  placeholder="GDPR compliance, data residency requirements..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 5: // Review & Publish
        return (
          <div className="space-y-6">
            <div>
              <h3>Review & Publish</h3>
              <p className="text-sm text-muted-foreground">Review your RFX before publishing to suppliers</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>{formData.title || 'Untitled RFX'}</span>
                </CardTitle>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">
                    {formData.type?.toUpperCase()}
                  </Badge>
                  <Badge variant="outline">
                    {formData.category}
                  </Badge>
                  <Badge variant={formData.priority === 'urgent' ? 'destructive' : 'default'}>
                    {formData.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4>Description</h4>
                  <p className="text-sm text-muted-foreground">{formData.description || 'No description provided'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4>Budget</h4>
                    <p className="text-sm text-muted-foreground">
                      {formData.budget ? `${formData.currency} ${formData.budget}` : 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <h4>Items</h4>
                    <p className="text-sm text-muted-foreground">{formData.items.length} items</p>
                  </div>
                </div>

                <div>
                  <h4>Key Dates</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Publish: </span>
                      {formData.publishDate ? formData.publishDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Not set'}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Response: </span>
                      {formData.responseDeadline ? formData.responseDeadline.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Not set'}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Evaluation: </span>
                      {formData.evaluationDeadline ? formData.evaluationDeadline.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Not set'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-blue-900">Ready to Publish</p>
                  <p className="text-sm text-blue-700">
                    Once published, qualified suppliers will be notified and can begin preparing their responses. 
                    You can still make changes before the response deadline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.title && formData.description && formData.category;
      case 1:
        return formData.items.every(item => item.description);
      case 4:
        return formData.responseDeadline;
      default:
        return true;
    }
  };

  const handlePublish = () => {
    // Here you would typically save the RFX and publish it
    console.log('Publishing RFX:', formData);
    onNavigate('dashboard');
  };

  return (
    <div className="min-w-0 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1>Create New RFX</h1>
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => onNavigate('dashboard')}>
            Save as Draft
          </Button>
          {currentStep === steps.length - 1 && (
            <Button onClick={handlePublish}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Publish RFX
            </Button>
          )}
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center space-x-4 overflow-x-auto pb-2">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-colors whitespace-nowrap",
                isActive && "bg-primary text-primary-foreground",
                isCompleted && "bg-green-100 text-green-800",
                !isActive && !isCompleted && "bg-muted hover:bg-muted/80"
              )}
              onClick={() => setCurrentStep(index)}
            >
              <StepIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{step.title}</span>
            </div>
          );
        })}
      </div>

      {/* Form Content */}
      <Card>
        <CardContent className="p-6">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        
        <div className="text-sm text-muted-foreground">
          {currentStep + 1} of {steps.length}
        </div>

        <Button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1 || !canProceed()}
        >
          {currentStep === steps.length - 1 ? 'Review Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
}