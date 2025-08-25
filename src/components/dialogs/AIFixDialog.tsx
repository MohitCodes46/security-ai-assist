import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Zap, CheckCircle, AlertTriangle, Clock, 
  Database, Server, Network, Play, X 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIFixDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  incidentData: {
    id: string;
    title: string;
    severity: string;
  };
}

const fixSteps = [
  {
    id: "analysis",
    label: "Analyzing System State",
    description: "Gathering current metrics and logs",
    duration: 2000,
    icon: Database
  },
  {
    id: "validation",
    label: "Validating Fix Strategy", 
    description: "Ensuring safe execution path",
    duration: 1500,
    icon: CheckCircle
  },
  {
    id: "backup",
    label: "Creating Safety Backup",
    description: "Backing up current configuration",
    duration: 3000,
    icon: Server
  },
  {
    id: "execution",
    label: "Executing Remediation",
    description: "Applying automated fixes",
    duration: 4000,
    icon: Zap
  },
  {
    id: "verification",
    label: "Verifying Resolution",
    description: "Confirming system stability",
    duration: 2500,
    icon: Network
  }
];

export function AIFixDialog({ open, onOpenChange, incidentData }: AIFixDialogProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();

  const totalSteps = fixSteps.length;
  const stepProgress = isCompleted ? 100 : (currentStep + 1) / totalSteps * 100;

  useEffect(() => {
    if (!isExecuting || isCompleted) return;

    const executeStep = (stepIndex: number) => {
      if (stepIndex >= fixSteps.length) {
        setIsCompleted(true);
        setProgress(100);
        toast({
          title: "AI Fix Completed",
          description: "All remediation steps executed successfully",
        });
        return;
      }

      setCurrentStep(stepIndex);
      const step = fixSteps[stepIndex];
      
      let stepProgress = 0;
      const stepInterval = setInterval(() => {
        stepProgress += 2;
        setProgress((stepIndex / totalSteps * 100) + (stepProgress / 100 * (100 / totalSteps)));
        
        if (stepProgress >= 100) {
          clearInterval(stepInterval);
          setTimeout(() => executeStep(stepIndex + 1), 500);
        }
      }, step.duration / 50);
    };

    executeStep(0);
  }, [isExecuting, isCompleted, toast]);

  const handleStartFix = () => {
    setIsExecuting(true);
    setCurrentStep(-1);
    setProgress(0);
    setIsCompleted(false);
    setHasError(false);
  };

  const handleClose = () => {
    setIsExecuting(false);
    setCurrentStep(-1);
    setProgress(0);
    setIsCompleted(false);
    setHasError(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>AI Automated Fix</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {!isExecuting && !isCompleted && (
            <>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-primary">AI Remediation Ready</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our AI has identified an automated fix for this incident with 95% confidence.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Planned Actions:</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Database className="h-4 w-4 text-info" />
                    <div>
                      <p className="font-medium text-sm">Scale Database Pool</p>
                      <p className="text-xs text-muted-foreground">Increase connection pool from 50 to 100</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Server className="h-4 w-4 text-warning" />
                    <div>
                      <p className="font-medium text-sm">Deploy Circuit Breaker</p>
                      <p className="text-xs text-muted-foreground">Add fault tolerance to database calls</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Network className="h-4 w-4 text-success" />
                    <div>
                      <p className="font-medium text-sm">Configure Auto-Scaling</p>
                      <p className="text-xs text-muted-foreground">Enable pod auto-scaling for auth service</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium text-warning">Safety Notice</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      All changes will be applied gradually with automatic rollback capability.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {(isExecuting || isCompleted) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Execution Progress</h4>
                <Badge variant="outline" className="text-xs">
                  {Math.round(progress)}%
                </Badge>
              </div>
              
              <Progress value={progress} className="h-2" />
              
              <div className="space-y-3">
                {fixSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = currentStep === index;
                  const isCompleted = currentStep > index;
                  const isPending = currentStep < index;
                  
                  return (
                    <div key={step.id} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-success text-success-foreground' :
                        isActive ? 'bg-primary text-primary-foreground animate-pulse' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <StepIcon className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium text-sm ${
                          isActive ? 'text-primary' : 
                          isCompleted ? 'text-success' : 
                          'text-muted-foreground'
                        }`}>
                          {step.label}
                        </p>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {isActive && <Clock className="h-3 w-3 animate-spin" />}
                        {isCompleted && <CheckCircle className="h-3 w-3 text-success" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {isCompleted && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <div>
                  <h4 className="font-medium text-success">Remediation Complete</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    All fixes have been applied successfully. System metrics are improving.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <Separator />
        
        <div className="flex justify-end space-x-2">
          {!isExecuting && !isCompleted && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleStartFix} className="bg-primary">
                <Play className="h-4 w-4 mr-2" />
                Execute Fix
              </Button>
            </>
          )}
          
          {isExecuting && (
            <Button variant="outline" onClick={handleClose} disabled>
              <Clock className="h-4 w-4 mr-2 animate-spin" />
              Executing...
            </Button>
          )}
          
          {isCompleted && (
            <Button onClick={handleClose}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Close
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}