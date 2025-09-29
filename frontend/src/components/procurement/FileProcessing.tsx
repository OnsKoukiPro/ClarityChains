import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Zap, 
  Database, 
  Search,
  BarChart3,
  Eye,
  RefreshCw
} from 'lucide-react';

interface FileProcessingProps {
  onNavigate: (view: string) => void;
}

export default function FileProcessing({ onNavigate }: FileProcessingProps) {
  const [processingStage, setProcessingStage] = useState(0);
  const [overallProgress, setOverallProgress] = useState(45);

  useEffect(() => {
    // Simulate processing stages
    const timer = setInterval(() => {
      setOverallProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const processingStages = [
    {
      id: 1,
      title: 'File Ingestion',
      description: 'Extracting text, tables, and attachments from uploaded files',
      status: 'completed',
      progress: 100,
      details: ['3 PDF files processed', '2 Excel files processed', '1 Word document processed']
    },
    {
      id: 2,
      title: 'Data Extraction',
      description: 'Identifying line items, prices, terms, and specifications',
      status: 'processing',
      progress: 75,
      details: ['247 line items extracted', '156 prices normalized', '91 terms identified']
    },
    {
      id: 3,
      title: 'Currency & Unit Normalization',
      description: 'Converting currencies and standardizing units of measurement',
      status: 'processing',
      progress: 60,
      details: ['USD, EUR, GBP currencies detected', 'Converting to USD base', 'Normalizing kg, lbs, tons']
    },
    {
      id: 4,
      title: 'Line Item Matching',
      description: 'Fuzzy matching to group similar items across suppliers',
      status: 'pending',
      progress: 0,
      details: ['Analyzing product descriptions', 'Matching SKU numbers', 'Grouping similar items']
    },
    {
      id: 5,
      title: 'Analysis Preparation',
      description: 'Preparing data for comprehensive analysis',
      status: 'pending',
      progress: 0,
      details: ['Setting up TCO calculations', 'Preparing risk assessments', 'Initializing comparison engine']
    }
  ];

  const extractedData = [
    {
      supplier: 'TechCorp Industries',
      items: 85,
      totalValue: '$1,240,000',
      currency: 'USD',
      status: 'completed'
    },
    {
      supplier: 'Global Supply Co',
      items: 92,
      totalValue: '€980,000',
      currency: 'EUR',
      status: 'processing'
    },
    {
      supplier: 'Premier Solutions',
      items: 70,
      totalValue: '£750,000',
      currency: 'GBP',
      status: 'completed'
    }
  ];

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing': return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'pending': return <Clock className="w-5 h-5 text-gray-400" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">File Processing Status</h1>
          <p className="text-muted-foreground">AI-powered extraction and normalization in progress</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onNavigate('upload')}>
            Back to Upload
          </Button>
          <Button 
            onClick={() => onNavigate('review')}
            disabled={overallProgress < 100}
          >
            Continue to Review
          </Button>
        </div>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium">Overall Progress</h3>
              <p className="text-sm text-muted-foreground">Processing 3 supplier offers with 247 line items</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{overallProgress}%</p>
              <p className="text-sm text-muted-foreground">Complete</p>
            </div>
          </div>
          <Progress value={overallProgress} className="h-3" />
          
          {overallProgress < 100 && (
            <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Estimated time remaining: 2-3 minutes
            </div>
          )}
        </CardContent>
      </Card>

      {/* Processing Stages */}
      <Card>
        <CardHeader>
          <CardTitle>Processing Stages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {processingStages.map((stage, index) => (
              <div key={stage.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getStageIcon(stage.status)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{stage.title}</h4>
                    <Badge 
                      variant={stage.status === 'completed' ? 'default' : 'secondary'}
                      className={
                        stage.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : stage.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {stage.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{stage.description}</p>
                  
                  {stage.status !== 'pending' && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{stage.progress}%</span>
                      </div>
                      <Progress value={stage.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="space-y-1">
                    {stage.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-current rounded-full mr-2 opacity-50" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Extracted Data Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5" />
            <span>Extracted Data Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {extractedData.map((data, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{data.supplier}</h4>
                  <Badge 
                    className={
                      data.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }
                  >
                    {data.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Line Items:</span>
                    <span className="font-medium">{data.items}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Value:</span>
                    <span className="font-medium">{data.totalValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Currency:</span>
                    <span className="font-medium">{data.currency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Processing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Files Processed</h3>
                <p className="text-2xl font-semibold">6 / 6</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Items Extracted</h3>
                <p className="text-2xl font-semibold">247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">Matches Found</h3>
                <p className="text-2xl font-semibold">89</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium">Ready for Analysis</h3>
                <p className="text-2xl font-semibold">{overallProgress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      {overallProgress >= 100 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-medium text-green-800">Processing Complete!</h3>
                <p className="text-sm text-green-700 mt-1">
                  All files have been processed and data extracted. You can now review the line items and proceed to analysis.
                </p>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button onClick={() => onNavigate('review')}>
                <Eye className="w-4 h-4 mr-2" />
                Review Line Items
              </Button>
              <Button variant="outline" onClick={() => onNavigate('analysis')}>
                Skip to Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}