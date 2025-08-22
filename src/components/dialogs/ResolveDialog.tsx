import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResolveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  incidentId: string;
}

export const ResolveDialog = ({ open, onOpenChange, incidentId }: ResolveDialogProps) => {
  const [resolution, setResolution] = useState("");
  const [rootCause, setRootCause] = useState("");
  const [category, setCategory] = useState("");
  const { toast } = useToast();

  const handleResolve = () => {
    if (!resolution || !rootCause || !category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Incident Resolved",
        description: `Incident ${incidentId} has been marked as resolved`,
      });
      onOpenChange(false);
      setResolution("");
      setRootCause("");
      setCategory("");
    }, 500);
  };

  const categories = [
    "Infrastructure",
    "Application Bug",
    "Configuration Error",
    "Security Incident",
    "Network Issue",
    "Database Issue",
    "Third-party Service",
    "User Error"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <span>Mark Incident as Resolved</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="category">Incident Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="root-cause">Root Cause *</Label>
            <Textarea
              id="root-cause"
              placeholder="Describe the root cause of the incident..."
              value={rootCause}
              onChange={(e) => setRootCause(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="resolution">Resolution Summary *</Label>
            <Textarea
              id="resolution"
              placeholder="Describe how the incident was resolved..."
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleResolve} className="bg-success hover:bg-success/90">
            Mark as Resolved
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};