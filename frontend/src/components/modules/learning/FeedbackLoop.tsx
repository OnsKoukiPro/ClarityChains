import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { ArrowLeft, GitBranch } from 'lucide-react';

interface FeedbackLoopProps {
  onBack: () => void;
}

export function FeedbackLoop({ onBack }: FeedbackLoopProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">🔄 Feedback Loop System</h1>
          <p className="text-muted-foreground">Outcome tracking and continuous improvement</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learning Engine
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Feedback Loop Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <GitBranch className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Feedback Loop System</h3>
            <p className="text-muted-foreground mb-4">
              Outcome tracking and model improvement based on client success rates
            </p>
            <div className="bg-muted/50 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground">
                This advanced learning component tracks prediction outcomes and continuously improves model accuracy through client feedback loops.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}