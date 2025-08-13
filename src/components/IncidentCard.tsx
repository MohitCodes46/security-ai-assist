import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, ExternalLink, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface IncidentCardProps {
  id: string;
  title: string;
  severity: "critical" | "warning" | "info";
  timestamp: string;
  assignee: string;
  status: "open" | "investigating" | "resolved";
  aiConfidence: number;
  suggestedAction: string;
}

const severityConfig = {
  critical: { color: "bg-critical text-critical-foreground", label: "Critical" },
  warning: { color: "bg-warning text-warning-foreground", label: "Warning" },
  info: { color: "bg-info text-info-foreground", label: "Info" }
};

const statusConfig = {
  open: { color: "bg-critical/20 text-critical", label: "Open" },
  investigating: { color: "bg-warning/20 text-warning", label: "Investigating" },
  resolved: { color: "bg-success/20 text-success", label: "Resolved" }
};

export const IncidentCard = ({ 
  id, title, severity, timestamp, assignee, status, aiConfidence, suggestedAction 
}: IncidentCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="bg-gradient-to-r from-card to-muted/20 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge className={severityConfig[severity].color}>
                {severityConfig[severity].label}
              </Badge>
              <Badge variant="outline" className={statusConfig[status].color}>
                {statusConfig[status].label}
              </Badge>
            </div>
            <h3 className="font-semibold text-card-foreground leading-tight">{title}</h3>
            <p className="text-sm text-muted-foreground">#{id}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{timestamp}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{assignee}</span>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
          <div className="flex items-center space-x-2">
            <Bot className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">AI Analysis</span>
            <Badge variant="outline" className="text-xs">
              {aiConfidence}% confidence
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{suggestedAction}</p>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => navigate(`/incident/${id}`)}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button size="sm" className="flex-1">
            Apply Fix
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};