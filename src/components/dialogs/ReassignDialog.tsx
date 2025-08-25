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
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReassignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAssignee: string;
}

const teamMembers = [
  { id: "1", name: "Sarah Chen", role: "Senior Engineer", available: true, expertise: ["Database", "Auth"] },
  { id: "2", name: "Mike Johnson", role: "DevOps Engineer", available: true, expertise: ["Infrastructure", "Monitoring"] },
  { id: "3", name: "Lisa Wang", role: "Security Analyst", available: false, expertise: ["Security", "Compliance"] },
  { id: "4", name: "David Kim", role: "Backend Engineer", available: true, expertise: ["API", "Database"] },
  { id: "5", name: "Emma Rodriguez", role: "Site Reliability Engineer", available: true, expertise: ["Performance", "Scaling"] }
];

export function ReassignDialog({ open, onOpenChange, currentAssignee }: ReassignDialogProps) {
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  const handleReassign = () => {
    const member = teamMembers.find(m => m.id === selectedMember);
    if (member) {
      toast({
        title: "Incident Reassigned",
        description: `Successfully reassigned to ${member.name}`,
      });
      onOpenChange(false);
      setSelectedMember("");
      setReason("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Reassign Incident</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Current Assignee</Label>
            <div className="mt-2 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">
                  {currentAssignee.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="font-medium">{currentAssignee}</span>
              </div>
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Assign To</Label>
            <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedMember === member.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  } ${!member.available ? "opacity-50" : ""}`}
                  onClick={() => member.available && setSelectedMember(member.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-sm text-primary-foreground">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{member.name}</span>
                          {!member.available && (
                            <Badge variant="outline" className="text-xs bg-warning/20 text-warning">
                              Busy
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <div className="flex space-x-1 mt-1">
                          {member.expertise.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    {selectedMember === member.id && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="reason" className="text-sm font-medium">
              Reason for Reassignment
            </Label>
            <Textarea
              id="reason"
              placeholder="Optional: Explain why this incident is being reassigned..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleReassign}
            disabled={!selectedMember}
          >
            Reassign Incident
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}