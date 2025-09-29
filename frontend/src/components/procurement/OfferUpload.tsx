import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Upload, 
  FileText, 
  Image, 
  Archive, 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  X,
  Download,
  Eye
} from 'lucide-react';

interface OfferUploadProps {
  selectedRFX: any;
  onNavigate: (view: string) => void;
}

export default function OfferUpload({ selectedRFX, onNavigate }: OfferUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: 'Supplier_A_Offer.pdf',
      size: '2.4 MB',
      type: 'PDF',
      status: 'completed',
      supplier: 'TechCorp Industries',
      uploadTime: '2 minutes ago'
    },
    {
      id: 2,
      name: 'Supplier_B_Quote.xlsx',
      size: '1.8 MB',
      type: 'Excel',
      status: 'processing',
      supplier: 'Global Supply Co',
      uploadTime: '5 minutes ago'
    },
    {
      id: 3,
      name: 'Supplier_C_Proposal.docx',
      size: '3.2 MB',
      type: 'Word',
      status: 'completed',
      supplier: 'Premier Solutions',
      uploadTime: '8 minutes ago'
    }
  ]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload logic here
      console.log(e.dataTransfer.files);
    }
  }, []);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="w-5 h-5 text-red-500" />;
      case 'Excel': return <FileText className="w-5 h-5 text-green-500" />;
      case 'Word': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'Image': return <Image className="w-5 h-5 text-purple-500" />;
      case 'Archive': return <Archive className="w-5 h-5 text-orange-500" />;
      case 'Email': return <Mail className="w-5 h-5 text-gray-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing': return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const acceptedFormats = [
    { type: 'PDF', description: 'Portable Document Format', extensions: '.pdf' },
    { type: 'Excel', description: 'Microsoft Excel', extensions: '.xlsx, .xls' },
    { type: 'Word', description: 'Microsoft Word', extensions: '.docx, .doc' },
    { type: 'Email', description: 'Email Files', extensions: '.eml, .msg' },
    { type: 'Images', description: 'Image Files', extensions: '.jpg, .png, .tiff' },
    { type: 'Archives', description: 'Compressed Files', extensions: '.zip, .rar' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Upload Supplier Offers</h1>
          <p className="text-muted-foreground">
            {selectedRFX ? `For ${selectedRFX.title} (${selectedRFX.id})` : 'Upload and process supplier offer files'}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onNavigate('dashboard')}>
            Back to Dashboard
          </Button>
          <Button onClick={() => onNavigate('processing')}>
            Process Files
          </Button>
        </div>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Drag & Drop Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Drop your supplier offer files here</h3>
            <p className="text-muted-foreground mb-4">
              Or click to browse and select files from your computer
            </p>
            <Button>
              Choose Files
            </Button>
            
            <div className="mt-6 text-sm text-muted-foreground">
              <p className="mb-2">Supported file types:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {acceptedFormats.map((format, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {format.extensions}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Uploaded Files ({uploadedFiles.length})</span>
            <Button variant="outline" size="sm">
              Clear All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3 flex-1">
                  {getFileIcon(file.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{file.name}</h4>
                      {getStatusIcon(file.status)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.supplier}</span>
                      <span>•</span>
                      <span>{file.uploadTime}</span>
                    </div>
                    {file.status === 'processing' && (
                      <div className="mt-2">
                        <Progress value={65} className="h-1" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* File Processing Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Files Processed</h3>
                <p className="text-2xl font-semibold">2 / 3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Line Items Extracted</h3>
                <p className="text-2xl font-semibold">247</p>
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
                <h3 className="font-medium">Items Need Review</h3>
                <p className="text-2xl font-semibold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">1</div>
              <div>
                <h4 className="font-medium">Upload Supplier Files</h4>
                <p className="text-sm text-muted-foreground">
                  Drag and drop or select multiple files from different suppliers. Each file should contain pricing, terms, and specifications.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">2</div>
              <div>
                <h4 className="font-medium">Automatic Processing</h4>
                <p className="text-sm text-muted-foreground">
                  Our AI will extract text, tables, and attachments, auto-detect currencies and units, and normalize line items for comparison.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">3</div>
              <div>
                <h4 className="font-medium">Review & Analyze</h4>
                <p className="text-sm text-muted-foreground">
                  Review extracted data, make corrections if needed, and let the system run comprehensive analysis including TCO, risk assessment, and recommendations.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}