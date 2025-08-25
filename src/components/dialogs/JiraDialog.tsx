import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, User, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JiraDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  incidentData: {
    id: string;
    title: string;
    severity: string;
    description: string;
  };
}

const priorities = [
  { id: "highest", label: "Highest", color: "bg-critical text-critical-foreground" },
  { id: "high", label: "High", color: "bg-warning text-warning-foreground" },
  { id: "medium", label: "Medium", color: "bg-info text-info-foreground" },
  { id: "low", label: "Low", color: "bg-muted text-muted-foreground" }
];

const issueTypes = [
  { id: "bug", label: "Bug", icon: "🐛" },
  { id: "task", label: "Task", icon: "📋" },
  { id: "story", label: "Story", icon: "📖" },
  { id: "epic", label: "Epic", icon: "🎯" }
];

export function JiraDialog({ open, onOpenChange, incidentData }: JiraDialogProps) {
  const [title, setTitle] = useState(incidentData.title || "");
  const [description, setDescription] = useState(incidentData.description || "");
  const [priority, setPriority] = useState("high");
  const [issueType, setIssueType] = useState("bug");
  const [assignee, setAssignee] = useState("");
  const [project, setProject] = useState("INFRA");
  const { toast } = useToast();

  const handleCreateTicket = () => {
    const ticketNumber = `${project}-${Math.floor(Math.random() * 1000) + 1000}`;
    
    toast({
      title: "Jira Ticket Created",
      description: `Ticket ${ticketNumber} created successfully`,
      action: (
        <Button variant="outline" size="sm" className="ml-2">
          <ExternalLink className="h-4 w-4 mr-1" />
          View
        </Button>
      ),
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
              J
            </div>
            <span>Create Jira Ticket</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="project" className="text-sm font-medium">Project</Label>
              <select 
                id="project"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="w-full mt-1 p-2 rounded-md border border-border bg-background"
              >
                <option value="INFRA">Infrastructure (INFRA)</option>
                <option value="SEC">Security (SEC)</option>
                <option value="OPS">Operations (OPS)</option>
                <option value="DEV">Development (DEV)</option>
              </select>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Issue Type</Label>
              <div className="flex space-x-2 mt-1">
                {issueTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setIssueType(type.id)}
                    className={`px-3 py-2 rounded-md border text-sm flex items-center space-x-1 ${
                      issueType === type.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span>{type.icon}</span>
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="title" className="text-sm font-medium">Summary *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief description of the issue"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium">Priority</Label>
            <div className="flex space-x-2 mt-1">
              {priorities.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  className={`px-3 py-2 rounded-md border text-sm ${
                    priority === p.id
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Badge className={p.color} variant={priority === p.id ? "default" : "outline"}>
                    {p.label}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="assignee" className="text-sm font-medium">Assignee</Label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="assignee"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                placeholder="Search team members..."
                className="pl-10"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of the issue..."
              className="mt-1"
              rows={6}
            />
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span>Incident Context</span>
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Related Incident:</span>
                <span className="font-mono text-primary">{incidentData.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Severity:</span>
                <Badge className={
                  incidentData.severity === 'critical' ? 'bg-critical text-critical-foreground' :
                  incidentData.severity === 'warning' ? 'bg-warning text-warning-foreground' :
                  'bg-info text-info-foreground'
                }>
                  {incidentData.severity}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Auto-linked:</span>
                <span className="text-success">Yes</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreateTicket}
            disabled={!title}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Create Ticket
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}