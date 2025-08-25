import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResolveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  incidentId: string;
}

const resolutionCategories = [
  { id: "fixed", label: "Fixed", description: "Issue has been permanently resolved" },
  { id: "workaround", label: "Workaround Applied", description: "Temporary solution implemented" },
  { id: "duplicate", label: "Duplicate", description: "Duplicate of another incident" },
  { id: "false-positive", label: "False Positive", description: "Not an actual incident" },
  { id: "user-error", label: "User Error", description: "Caused by user mistake" }
];

export function ResolveDialog({ open, onOpenChange, incidentId }: ResolveDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [resolution, setResolution] = useState("");
  const [preventiveMeasures, setPreventiveMeasures] = useState("");
  const { toast } = useToast();

  const handleResolve = () => {
    const category = resolutionCategories.find(c => c.id === selectedCategory);
    if (category && resolution) {
      toast({
        title: "Incident Resolved",
        description: `Incident ${incidentId} has been marked as ${category.label.toLowerCase()}`,
      });
      onOpenChange(false);
      // Reset form
      setSelectedCategory("");
      setResolution("");
      setPreventiveMeasures("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <span>Resolve Incident</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2 text-success">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">
                Resolution time will be tracked for SLA reporting
              </span>
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Resolution Category</Label>
            <div className="mt-2 space-y-2">
              {resolutionCategories.map((category) => (
                <div
                  key={category.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedCategory === category.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{category.label}</p>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    {selectedCategory === category.id && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="resolution" className="text-sm font-medium">
              Resolution Details *
            </Label>
            <Textarea
              id="resolution"
              placeholder="Describe the steps taken to resolve this incident..."
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="mt-2"
              rows={4}
            />
          </div>
          
          <div>
            <Label htmlFor="preventive" className="text-sm font-medium">
              Preventive Measures
            </Label>
            <Textarea
              id="preventive"
              placeholder="Optional: What measures will prevent this incident from happening again?"
              value={preventiveMeasures}
              onChange={(e) => setPreventiveMeasures(e.target.value)}
              className="mt-2"
              rows={3}
            />
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Post-Resolution Actions</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Incident timeline will be finalized</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Post-mortem document will be generated</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Stakeholders will be notified</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>SLA metrics will be updated</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleResolve}
            disabled={!selectedCategory || !resolution}
            className="bg-success hover:bg-success/90"
          >
            Resolve Incident
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}