import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Smartphone,
  Globe,
  Search,
  CheckCircle,
  ArrowRight,
  Upload,
  Link,
  Home,
  Palette,
  Star
} from 'lucide-react';

interface LoginFlowProps {
  onComplete: (appData: any) => void;
}

interface AppData {
  name: string;
  category: string;
  subcategory: string;
  appStoreUrl: string;
  playStoreUrl?: string;
  description: string;
  competitors: string[];
  targetMarkets: string[];
  monthlyDownloads: number;
  revenue: number;
  rating: number;
  reviews: number;
}

const appCategories = [
  { id: 'lifestyle', name: 'Lifestyle', icon: Home, subcategories: ['Home & Garden', 'Interior Design', 'Real Estate', 'Food & Drink'] },
  { id: 'productivity', name: 'Productivity', icon: Search, subcategories: ['Task Management', 'Note Taking', 'Time Tracking', 'Business'] },
  { id: 'health', name: 'Health & Fitness', icon: Star, subcategories: ['Fitness', 'Meditation', 'Nutrition', 'Healthcare'] },
  { id: 'entertainment', name: 'Entertainment', icon: Palette, subcategories: ['Photo & Video', 'Music', 'Games', 'Social'] }
];

export function LoginFlow({ onComplete }: LoginFlowProps) {
  const [step, setStep] = useState(1);
  const [appStoreUrl, setAppStoreUrl] = useState('');
  const [playStoreUrl, setPlayStoreUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedApp, setDetectedApp] = useState<AppData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const handleAnalyzeApp = async () => {
    setIsAnalyzing(true);

    // Simulate app analysis based on URL
    setTimeout(() => {
      // Mock data for home decoration app
      const mockAppData: AppData = {
        name: 'HomeDesign Studio',
        category: 'Lifestyle',
        subcategory: 'Interior Design',
        appStoreUrl,
        playStoreUrl,
        description: 'Transform your home with AI-powered interior design tools and virtual room planning',
        competitors: ['Houzz', 'Roomstyler', 'Planner 5D', 'SketchUp', 'Home Design 3D'],
        targetMarkets: ['United States', 'United Kingdom', 'Australia', 'Canada', 'Germany'],
        monthlyDownloads: 45200,
        revenue: 12400,
        rating: 4.3,
        reviews: 2847
      };

      setDetectedApp(mockAppData);
      setSelectedCategory('lifestyle');
      setSelectedSubcategory('Interior Design');
      setIsAnalyzing(false);
      setStep(2);
    }, 3000);
  };

  const handleConfirmApp = () => {
    if (detectedApp) {
      onComplete({
        ...detectedApp,
        category: selectedCategory,
        subcategory: selectedSubcategory
      });
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Connect Your App';
      case 2: return 'Verify App Information';
      default: return 'Getting Started';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1: return 'Enter your app store URLs to get personalized analytics';
      case 2: return 'Confirm your app details and category classification';
      default: return 'Set up your personalized analytics dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-semibold text-xl">K</span>
          </div>
          <h1 className="text-3xl font-semibold mb-2">Welcome to ClarityChain</h1>
          <p className="text-muted-foreground text-lg">AI Intelligence Platform for App Developers</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {step} of 2</span>
            <span className="text-sm text-muted-foreground">{step === 1 ? 'App Connection' : 'Verification'}</span>
          </div>
          <Progress value={step * 50} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {step === 1 ? <Link className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
              {getStepTitle()}
            </CardTitle>
            <p className="text-muted-foreground">{getStepDescription()}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="appstore-url">App Store URL *</Label>
                    <Input
                      id="appstore-url"
                      placeholder="https://apps.apple.com/app/your-app/id..."
                      value={appStoreUrl}
                      onChange={(e) => setAppStoreUrl(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="playstore-url">Google Play URL (Optional)</Label>
                    <Input
                      id="playstore-url"
                      placeholder="https://play.google.com/store/apps/details?id=..."
                      value={playStoreUrl}
                      onChange={(e) => setPlayStoreUrl(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">What we'll analyze:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• App metadata and category classification</li>
                    <li>• Performance metrics and user ratings</li>
                    <li>• Competitor identification and market positioning</li>
                    <li>• Target market and demographic analysis</li>
                  </ul>
                </div>

                <Button
                  onClick={handleAnalyzeApp}
                  disabled={!appStoreUrl || isAnalyzing}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Analyzing Your App...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Analyze My App
                    </>
                  )}
                </Button>
              </>
            )}

            {step === 2 && detectedApp && (
              <>
                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{detectedApp.name}</h3>
                      <p className="text-muted-foreground">{detectedApp.description}</p>
                    </div>
                    <Badge variant="secondary">{detectedApp.category}</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Downloads</p>
                      <p className="font-semibold">{detectedApp.monthlyDownloads.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="font-semibold">${detectedApp.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        {detectedApp.rating}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reviews</p>
                      <p className="font-semibold">{detectedApp.reviews.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>App Category</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {appCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-3 border rounded-lg text-left transition-all ${
                          selectedCategory === category.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <category.icon className="w-4 h-4" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedCategory && (
                  <div>
                    <Label>Subcategory</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {appCategories
                        .find(cat => cat.id === selectedCategory)
                        ?.subcategories.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => setSelectedSubcategory(sub)}
                            className={`px-3 py-1 border rounded-full text-sm transition-all ${
                              selectedSubcategory === sub
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label>Detected Competitors</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {detectedApp.competitors.map((competitor) => (
                      <Badge key={competitor} variant="outline">
                        {competitor}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleConfirmApp}
                  className="w-full"
                  size="lg"
                  disabled={!selectedCategory || !selectedSubcategory}
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Enter My Dashboard
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Your data is secure and will only be used to provide personalized analytics
          </p>
        </div>
      </div>
    </div>
  );
}