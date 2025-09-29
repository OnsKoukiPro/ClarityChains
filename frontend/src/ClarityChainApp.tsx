import React, { useState } from 'react';
import { SidebarProvider } from './components/ui/sidebar';
import ProcurementSidebar from './components/ProcurementSidebar';
import ProcurementHeader from './components/ProcurementHeader';
import RFXDashboard from './components/procurement/RFXDashboard';
import OfferUpload from './components/procurement/OfferUpload';
import FileProcessing from './components/procurement/FileProcessing';
import LineItemReview from './components/procurement/LineItemReview';
import AnalysisResults from './components/procurement/AnalysisResults';
import ExecutiveReport from './components/procurement/ExecutiveReport';
import SupplierRecommendation from './components/procurement/SupplierRecommendation';
import RFXCreation from './components/procurement/RFXCreation';

export default function ClarityChainApp() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedRFX, setSelectedRFX] = useState(null);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <RFXDashboard onSelectRFX={setSelectedRFX} onNavigate={setCurrentView} />;
      case 'upload':
        return <OfferUpload selectedRFX={selectedRFX} onNavigate={setCurrentView} />;
      case 'processing':
        return <FileProcessing onNavigate={setCurrentView} />;
      case 'review':
        return <LineItemReview onNavigate={setCurrentView} />;
      case 'analysis':
        return <AnalysisResults onNavigate={setCurrentView} />;
      case 'report':
        return <ExecutiveReport onNavigate={setCurrentView} />;
      case 'recommendation':
        return <SupplierRecommendation onNavigate={setCurrentView} />;
      case 'create-rfx':
        return <RFXCreation onNavigate={setCurrentView} />;
      default:
        return <RFXDashboard onSelectRFX={setSelectedRFX} onNavigate={setCurrentView} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <div className="flex-shrink-0">
          <ProcurementSidebar currentView={currentView} onNavigate={setCurrentView} />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-6">
            <ProcurementHeader onNavigate={setCurrentView} />
          </div>
          <main className="flex-1 w-full min-w-0 p-6 overflow-auto">
            {renderCurrentView()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}