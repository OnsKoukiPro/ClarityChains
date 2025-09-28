import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { ArrowLeft, Eye } from 'lucide-react';

interface KnowledgeGraphProps {
  selectedPattern?: any;
  onPatternSelect: (pattern: any) => void;
  onBack: () => void;
}

export function KnowledgeGraph({ selectedPattern, onPatternSelect, onBack }: KnowledgeGraphProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">🕸️ Knowledge Graph Explorer</h1>
          <p className="text-muted-foreground">Relationship mapping and insight generation</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learning Engine
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Knowledge Graph Visualization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Knowledge Graph System</h3>
            <p className="text-muted-foreground mb-4">
              Relationship mapping between apps, features, markets, and user behaviors
            </p>
            <div className="bg-muted/50 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground">
                This advanced visualization system maps relationships between entities and generates insights from connected data patterns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}