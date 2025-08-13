import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Search, ExternalLink, Zap } from "lucide-react";

export const AIAnalysisPanel = () => {
  return (
    <Card className="h-full bg-gradient-to-br from-card via-card to-primary/5 border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary" />
          <span>AI Analysis & Response</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Analysis */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Root Cause Analysis</h4>
            <Badge className="bg-success/20 text-success">95% Confidence</Badge>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <p className="text-sm text-card-foreground">
              <strong>Issue:</strong> Database connection timeout affecting user authentication.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Root Cause:</strong> Connection pool exhaustion due to increased traffic load (3x normal).
            </p>
            <p className="text-sm text-success">
              <strong>Recommended Fix:</strong> Scale database connections and implement circuit breaker pattern.
            </p>
          </div>
        </div>

        {/* Similar Incidents */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-primary" />
            <h4 className="font-medium">Similar Past Incidents</h4>
          </div>
          
          <div className="space-y-2">
            {[
              { id: "INC-2024-0847", similarity: "94%", resolution: "2h 15m" },
              { id: "INC-2024-0723", similarity: "87%", resolution: "1h 45m" },
              { id: "INC-2024-0612", similarity: "82%", resolution: "3h 10m" }
            ].map((incident) => (
              <div key={incident.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                <div className="text-sm">
                  <span className="font-mono text-primary">{incident.id}</span>
                  <span className="text-muted-foreground ml-2">({incident.similarity} match)</span>
                </div>
                <div className="text-xs text-success">{incident.resolution}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Automated Actions */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-warning" />
            <h4 className="font-medium">Automated Response</h4>
          </div>
          
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Create Jira Ticket
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Execute Auto-Fix Script
            </Button>
            <Button className="w-full" size="sm">
              <Brain className="h-4 w-4 mr-2" />
              Deploy Recommended Solution
            </Button>
          </div>
        </div>

        {/* AI Status */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">AI Model Status</span>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-success">Online</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};