import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JiraDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  incidentId: string;
  incidentTitle: string;
}

export const JiraDialog = ({ open, onOpenChange, incidentId, incidentTitle }: JiraDialogProps) => {
  const [summary, setSummary] = useState(`[${incidentId}] ${incidentTitle}`);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("High");
  const [assignee, setAssignee] = useState("");
  const { toast } = useToast();

  const handleCreateTicket = () => {
    if (!summary || !description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call to Jira
    setTimeout(() => {
      const ticketId = `SEC-${Math.floor(Math.random() * 1000) + 1000}`;
      toast({
        title: "Jira Ticket Created",
        description: `Created ticket ${ticketId} successfully`,
      });
      onOpenChange(false);
      setSummary(`[${incidentId}] ${incidentTitle}`);
      setDescription("");
      setPriority("High");
      setAssignee("");
    }, 1000);
  };

  const priorities = ["Highest", "High", "Medium", "Low", "Lowest"];
  const assignees = [
    "sarah.chen@company.com",
    "marcus.rodriguez@company.com", 
    "emily.watson@company.com",
    "david.kim@company.com"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ExternalLink className="h-5 w-5" />
            <span>Create Jira Ticket</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="summary">Summary *</Label>
            <Input
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide detailed description of the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="assignee">Assignee</Label>
              <Select value={assignee} onValueChange={setAssignee}>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {assignees.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateTicket}>
            Create Ticket
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};