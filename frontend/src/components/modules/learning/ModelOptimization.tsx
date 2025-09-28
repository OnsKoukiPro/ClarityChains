import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { ArrowLeft, Settings } from 'lucide-react';

interface ModelOptimizationProps {
  onBack: () => void;
}

export function ModelOptimization({ onBack }: ModelOptimizationProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">🧪 Model Optimization</h1>
          <p className="text-muted-foreground">A/B testing and model performance optimization</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learning Engine
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Model A/B Testing Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Model Optimization System</h3>
            <p className="text-muted-foreground mb-4">
              A/B testing framework and automated model performance optimization
            </p>
            <div className="bg-muted/50 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground">
                This optimization system continuously tests model variants and automatically improves prediction accuracy through experimentation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}