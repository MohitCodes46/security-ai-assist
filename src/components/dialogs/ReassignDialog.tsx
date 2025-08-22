import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReassignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  incidentId: string;
}

export const ReassignDialog = ({ open, onOpenChange, incidentId }: ReassignDialogProps) => {
  const [assignee, setAssignee] = useState("");
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  const handleReassign = () => {
    if (!assignee) {
      toast({
        title: "Error",
        description: "Please select an assignee",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Incident Reassigned",
        description: `Incident ${incidentId} has been reassigned to ${assignee}`,
      });
      onOpenChange(false);
      setAssignee("");
      setReason("");
    }, 500);
  };

  const teamMembers = [
    "Sarah Chen - Security Lead",
    "Marcus Rodriguez - DevOps Engineer", 
    "Emily Watson - Site Reliability Engineer",
    "David Kim - Backend Developer",
    "Lisa Thompson - Security Analyst"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Reassign Incident</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="assignee">New Assignee</Label>
            <Select value={assignee} onValueChange={setAssignee}>
              <SelectTrigger>
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member} value={member}>
                    {member}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="reason">Reason for Reassignment (Optional)</Label>
            <Textarea
              id="reason"
              placeholder="Enter reason for reassignment..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleReassign}>
            Reassign Incident
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};