import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { ArrowLeft, Users } from 'lucide-react';

interface IntelligenceAmplificationProps {
  onBack: () => void;
}

export function IntelligenceAmplification({ onBack }: IntelligenceAmplificationProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">🤝 Intelligence Amplification</h1>
          <p className="text-muted-foreground">Human-AI collaboration and expert integration</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learning Engine
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Human-AI Collaboration Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Intelligence Amplification System</h3>
            <p className="text-muted-foreground mb-4">
              Human expert input integration and AI-human collaboration workflows
            </p>
            <div className="bg-muted/50 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground">
                This system amplifies AI capabilities by integrating human expertise and enabling collaborative intelligence workflows.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}