import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle, AlertTriangle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIFixDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  incidentId: string;
}

export const AIFixDialog = ({ open, onOpenChange, incidentId }: AIFixDialogProps) => {
  const [isApplying, setIsApplying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  const applyFix = async () => {
    setIsApplying(true);
    setProgress(0);
    setCompleted(false);

    const steps = [
      { step: "Analyzing current system state...", duration: 1000 },
      { step: "Scaling database connection pool...", duration: 1500 },
      { step: "Implementing circuit breaker pattern...", duration: 2000 },
      { step: "Adding retry logic with backoff...", duration: 1200 },
      { step: "Deploying auto-scaling policies...", duration: 1800 },
      { step: "Verifying fix effectiveness...", duration: 1000 }
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i].step);
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      setProgress(((i + 1) / steps.length) * 100);
    }

    setCompleted(true);
    setIsApplying(false);
    
    toast({
      title: "AI Fix Applied Successfully",
      description: "The incident has been automatically resolved",
    });
  };

  const proposedFixes = [
    {
      title: "Scale Database Connection Pool",
      description: "Increase pool size from 50 to 100 connections",
      impact: "High",
      confidence: "98%"
    },
    {
      title: "Implement Circuit Breaker",
      description: "Add circuit breaker pattern for database calls",
      impact: "Medium", 
      confidence: "95%"
    },
    {
      title: "Add Retry Logic",
      description: "Implement exponential backoff retry mechanism",
      impact: "Medium",
      confidence: "92%"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>Apply AI Fix</span>
          </DialogTitle>
        </DialogHeader>
        
        {!isApplying && !completed && (
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium flex items-center space-x-2 mb-3">
                <Zap className="h-4 w-4 text-primary" />
                <span>Proposed Automatic Fixes</span>
              </h3>
              <div className="space-y-3">
                {proposedFixes.map((fix, index) => (
                  <div key={index} className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{fix.title}</h4>
                      <p className="text-xs text-muted-foreground">{fix.description}</p>
                    </div>
                    <div className="flex space-x-2 ml-2">
                      <Badge variant="outline" className="text-xs">
                        {fix.confidence}
                      </Badge>
                      <Badge variant={fix.impact === "High" ? "default" : "secondary"} className="text-xs">
                        {fix.impact}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-warning/20 border border-warning/30 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">Warning</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This will make automatic changes to your infrastructure. Ensure you have proper backups.
              </p>
            </div>
          </div>
        )}

        {isApplying && (
          <div className="space-y-4">
            <div className="text-center">
              <Brain className="h-12 w-12 text-primary mx-auto mb-2 animate-pulse" />
              <h3 className="font-medium">Applying AI Fix</h3>
              <p className="text-sm text-muted-foreground">{currentStep}</p>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-center text-muted-foreground">
              {Math.round(progress)}% Complete
            </p>
          </div>
        )}

        {completed && (
          <div className="space-y-4 text-center">
            <CheckCircle className="h-12 w-12 text-success mx-auto" />
            <div>
              <h3 className="font-medium text-success">Fix Applied Successfully!</h3>
              <p className="text-sm text-muted-foreground">
                All proposed fixes have been implemented and verified.
              </p>
            </div>
            <div className="bg-success/20 border border-success/30 rounded-lg p-3">
              <p className="text-sm">
                • Database connection pool scaled to 100 connections<br/>
                • Circuit breaker pattern implemented<br/>
                • Retry logic with exponential backoff added<br/>
                • Auto-scaling policies deployed
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          {!isApplying && !completed && (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={applyFix} className="bg-primary hover:bg-primary/90">
                Apply Fix
              </Button>
            </>
          )}
          {completed && (
            <Button onClick={() => onOpenChange(false)} className="w-full">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};