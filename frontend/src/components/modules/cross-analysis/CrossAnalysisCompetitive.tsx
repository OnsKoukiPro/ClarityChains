import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { 
  ArrowLeft, 
  Download, 
  Star,
  TrendingUp,
  Target,
  BarChart3,
  Eye
} from 'lucide-react';

interface CrossAnalysisCompetitiveProps {
  onBack: () => void;
  onAppSelect: (app: any) => void;
}

const competitiveAnalysis = [
  {
    id: 1,
    name: 'Notion',
    category: 'Productivity',
    overallScore: 87,
    position: 'current',
    modules: { explorer: 89, trends: 78, creative: 65, aso: 91, paywall: 83, reviews: 73, markets: 69, features: 92 },
    keyAdvantage: 'Flexibility and database features',
    keyWeakness: 'Mobile experience and complexity'
  },
  {
    id: 2,
    name: 'Todoist',
    category: 'Productivity',
    overallScore: 82,
    position: 'competitor',
    modules: { explorer: 85, trends: 72, creative: 89, aso: 88, paywall: 76, reviews: 78, markets: 74, features: 84 },
    keyAdvantage: 'Simplicity and mobile experience',
    keyWeakness: 'Limited feature depth'
  },
  {
    id: 3,
    name: 'Asana',
    category: 'Productivity',
    overallScore: 79,
    position: 'competitor',
    modules: { explorer: 82, trends: 69, creative: 71, aso: 85, paywall: 88, reviews: 71, markets: 78, features: 89 },
    keyAdvantage: 'Team collaboration features',
    keyWeakness: 'Complex for individuals'
  },
  {
    id: 4,
    name: 'ClickUp',
    category: 'Productivity',
    overallScore: 76,
    position: 'competitor',
    modules: { explorer: 78, trends: 82, creative: 67, aso: 79, paywall: 81, reviews: 69, markets: 73, features: 95 },
    keyAdvantage: 'Comprehensive feature set',
    keyWeakness: 'Overwhelming complexity'
  }
];

export function CrossAnalysisCompetitive({ onBack, onAppSelect }: CrossAnalysisCompetitiveProps) {
  const [selectedCategory, setSelectedCategory] = useState('productivity');

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'current': return 'text-blue-600 bg-blue-50';
      case 'leader': return 'text-green-600 bg-green-50';
      case 'competitor': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cross Analysis
        </Button>
        <div className="flex items-center gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="productivity">Productivity</SelectItem>
              <SelectItem value="health">Health & Fitness</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            📊 Export Analysis
          </Button>
        </div>
      </div>

      {/* Page Title */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🏆 Cross-Module Competitive Intelligence</CardTitle>
          <p className="text-muted-foreground">
            Multi-dimensional competitive analysis across all intelligence modules
          </p>
        </CardHeader>
      </Card>

      {/* Competitive Analysis Grid */}
      <div className="space-y-4">
        {competitiveAnalysis.map((app) => (
          <Card key={app.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{app.name}</h3>
                    <Badge variant="outline">{app.category}</Badge>
                    {app.position === 'current' && (
                      <Badge className="text-blue-600 bg-blue-50">You</Badge>
                    )}
                    <div className="flex items-center gap-1">
                      <span className="text-sm">Overall Score:</span>
                      <span className={`font-semibold ${getScoreColor(app.overallScore)}`}>
                        {app.overallScore}/100
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-4">
                    {Object.entries(app.modules).map(([module, score]) => (
                      <div key={module} className="text-center">
                        <p className="text-xs text-muted-foreground capitalize">{module}</p>
                        <p className={`text-sm font-medium ${getScoreColor(score as number)}`}>
                          {score}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm">
                        <strong className="text-green-800">Key Advantage:</strong>
                        <span className="text-green-700 ml-2">{app.keyAdvantage}</span>
                      </p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-sm">
                        <strong className="text-red-800">Key Weakness:</strong>
                        <span className="text-red-700 ml-2">{app.keyWeakness}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onAppSelect(app)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  📊 Full Analysis
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  📈 Compare
                </Button>
                <Button variant="outline" size="sm">
                  <Target className="w-4 h-4 mr-1" />
                  🎯 Strategy
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}