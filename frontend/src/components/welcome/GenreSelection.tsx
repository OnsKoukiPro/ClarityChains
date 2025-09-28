import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Home, 
  Heart, 
  Dumbbell, 
  Camera, 
  DollarSign, 
  Gamepad2, 
  GraduationCap, 
  Briefcase,
  ArrowRight,
  TrendingUp,
  Users,
  Star
} from 'lucide-react';

interface GenreSelectionProps {
  appData?: any;
  onComplete: (genreData: any) => void;
}

const genres = [
  {
    id: 'home-design',
    name: 'Home Design',
    icon: Home,
    marketSize: '$2.3B',
    appCount: 1247,
    growth: '+34%',
    avgRpd: '$0.89',
    topApps: ['Houzz', 'Planner 5D', 'Home Design 3D'],
    description: 'Interior design, home decor, and architectural planning apps'
  },
  {
    id: 'dating-social',
    name: 'Dating & Social',
    icon: Heart,
    marketSize: '$1.8B',
    appCount: 892,
    growth: '+28%',
    avgRpd: '$1.23',
    topApps: ['Tinder', 'Bumble', 'Hinge'],
    description: 'Dating, relationships, and social networking platforms'
  },
  {
    id: 'fitness-health',
    name: 'Fitness & Health',
    icon: Dumbbell,
    marketSize: '$4.2B',
    appCount: 2156,
    growth: '+41%',
    avgRpd: '$0.67',
    topApps: ['MyFitnessPal', 'Strava', 'Headspace'],
    description: 'Fitness tracking, health monitoring, and wellness apps'
  },
  {
    id: 'photo-video',
    name: 'Photo & Video',
    icon: Camera,
    marketSize: '$3.1B',
    appCount: 1834,
    growth: '+23%',
    avgRpd: '$0.45',
    topApps: ['VSCO', 'PicsArt', 'InShot'],
    description: 'Photo editing, video creation, and visual content tools'
  },
  {
    id: 'finance-banking',
    name: 'Finance & Banking',
    icon: DollarSign,
    marketSize: '$5.1B',
    appCount: 1045,
    growth: '+19%',
    avgRpd: '$2.34',
    topApps: ['PayPal', 'Robinhood', 'Mint'],
    description: 'Personal finance, banking, and investment management'
  },
  {
    id: 'gaming-casino',
    name: 'Gaming & Casino',
    icon: Gamepad2,
    marketSize: '$7.8B',
    appCount: 3421,
    growth: '+52%',
    avgRpd: '$1.89',
    topApps: ['Candy Crush', 'PUBG Mobile', 'Coin Master'],
    description: 'Mobile games, casino games, and entertainment'
  },
  {
    id: 'education-learning',
    name: 'Education & Learning',
    icon: GraduationCap,
    marketSize: '$2.9B',
    appCount: 987,
    growth: '+37%',
    avgRpd: '$0.78',
    topApps: ['Duolingo', 'Khan Academy', 'Coursera'],
    description: 'Educational content, language learning, and skill development'
  },
  {
    id: 'productivity-business',
    name: 'Productivity & Business',
    icon: Briefcase,
    marketSize: '$1.6B',
    appCount: 756,
    growth: '+15%',
    avgRpd: '$1.45',
    topApps: ['Notion', 'Slack', 'Todoist'],
    description: 'Task management, business tools, and productivity apps'
  }
];

export function GenreSelection({ appData, onComplete }: GenreSelectionProps) {
  const [selectedGenre, setSelectedGenre] = useState<any>(null);
  const [customGenre, setCustomGenre] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const handleGenreSelect = (genre: any) => {
    setSelectedGenre(genre);
    setShowCustom(false);
  };

  const handleCustomGenre = () => {
    if (customGenre.trim()) {
      const customGenreData = {
        id: 'custom',
        name: customGenre,
        icon: Star,
        marketSize: 'Custom Analysis',
        appCount: 'TBD',
        growth: 'TBD',
        avgRpd: 'TBD',
        topApps: ['Analysis Pending'],
        description: `Custom analysis for ${customGenre} category`,
        isCustom: true
      };
      setSelectedGenre(customGenreData);
    }
  };

  const handleContinue = () => {
    if (selectedGenre) {
      onComplete(selectedGenre);
    }
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">🎯 Select Your App Genre for Intelligence Analysis</h1>
        <p className="text-lg text-muted-foreground mb-2">
          We'll analyze your <span className="font-medium">{appData?.name || 'app'}</span> against the leading competitors in your category
        </p>
        <p className="text-muted-foreground">
          Choose the genre that best matches your app to get the most accurate competitive intelligence
        </p>
      </div>

      {/* Genre Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {genres.map((genre) => (
          <Card 
            key={genre.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedGenre?.id === genre.id 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:shadow-md'
            }`}
            onClick={() => handleGenreSelect(genre)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedGenre?.id === genre.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  <genre.icon className="w-5 h-5" />
                </div>
                {selectedGenre?.id === genre.id && (
                  <Badge variant="default">SELECTED</Badge>
                )}
              </div>
              <CardTitle className="text-base">{genre.name}</CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {genre.description}
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Market Size</span>
                  <span className="font-medium">{genre.marketSize}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Apps</span>
                  <span className="font-medium">{genre.appCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Growth</span>
                  <span className="font-medium text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {genre.growth}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg RPD</span>
                  <span className="font-medium">{genre.avgRpd}</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-muted-foreground mb-1">Top Players:</p>
                <div className="flex flex-wrap gap-1">
                  {genre.topApps.slice(0, 2).map((app) => (
                    <Badge key={app} variant="outline" className="text-xs">
                      {app}
                    </Badge>
                  ))}
                  {genre.topApps.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{genre.topApps.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Genre Option */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Custom Genre Analysis
          </CardTitle>
          <p className="text-muted-foreground">
            Don't see your category? Enter a specific app category for custom analysis
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Enter specific app category..."
              value={customGenre}
              onChange={(e) => setCustomGenre(e.target.value)}
              onFocus={() => setShowCustom(true)}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              onClick={handleCustomGenre}
              disabled={!customGenre.trim()}
            >
              Analyze
            </Button>
          </div>
          {selectedGenre?.isCustom && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                ✓ Custom analysis selected for: <span className="font-medium">{selectedGenre.name}</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Continue Button */}
      {selectedGenre && (
        <div className="text-center">
          <div className="bg-white rounded-lg border p-6 max-w-md mx-auto mb-6">
            <div className="flex items-center gap-3 mb-3">
              <selectedGenre.icon className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-medium">{selectedGenre.name}</h3>
                <p className="text-sm text-muted-foreground">Selected for analysis</p>
              </div>
            </div>
            {!selectedGenre.isCustom && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Market Size</span>
                  <p className="font-medium">{selectedGenre.marketSize}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Growth Rate</span>
                  <p className="font-medium text-green-600">{selectedGenre.growth}</p>
                </div>
              </div>
            )}
          </div>

          <Button size="lg" onClick={handleContinue} className="px-8">
            Start AI Competitor Analysis
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}