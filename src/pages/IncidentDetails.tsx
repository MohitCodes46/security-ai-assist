import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, Clock, User, AlertTriangle, Brain, Activity, 
  FileText, ExternalLink, Play, CheckCircle, XCircle,
  TrendingUp, Database, Server, Zap
} from "lucide-react";
import { ReassignDialog } from "@/components/dialogs/ReassignDialog";
import { ResolveDialog } from "@/components/dialogs/ResolveDialog";
import { JiraDialog } from "@/components/dialogs/JiraDialog";
import { AIFixDialog } from "@/components/dialogs/AIFixDialog";
import { useToast } from "@/hooks/use-toast";

const IncidentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Dialog states
  const [reassignOpen, setReassignOpen] = useState(false);
  const [resolveOpen, setResolveOpen] = useState(false);
  const [jiraOpen, setJiraOpen] = useState(false);
  const [aiFixOpen, setAIFixOpen] = useState(false);

  // Mock data - in real app this would come from an API
  const incident = {
    id: id || "INC-2024-0952",
    title: "Database Connection Timeout - Auth Service",
    severity: "critical" as const,
    status: "investigating" as const,
    timestamp: "2024-01-15 14:23:15 UTC",
    assignee: "Sarah Chen",
    reporter: "System Monitor",
    description: "Multiple users unable to authenticate due to database connection timeouts. Affecting approximately 847 users across 3 regions.",
    aiConfidence: 95,
    estimatedImpact: "High - Core authentication service",
    affectedSystems: ["Auth Service", "User Database", "Session Manager"],
    timeline: [
      { time: "14:23:15", event: "Initial alert triggered", type: "alert", user: "System" },
      { time: "14:23:47", event: "Incident created automatically", type: "creation", user: "AI Monitor" },
      { time: "14:24:12", event: "Sarah Chen assigned", type: "assignment", user: "Auto-Assignment" },
      { time: "14:25:33", event: "Root cause analysis initiated", type: "analysis", user: "AI Assistant" },
      { time: "14:26:45", event: "Similar incidents identified", type: "reference", user: "AI Assistant" },
      { time: "14:27:21", event: "Mitigation plan proposed", type: "solution", user: "AI Assistant" }
    ],
    logs: [
      { timestamp: "14:23:15", level: "ERROR", service: "auth-service", message: "Connection timeout after 30s to database pool" },
      { timestamp: "14:23:16", level: "ERROR", service: "auth-service", message: "Failed to acquire connection from pool: timeout" },
      { timestamp: "14:23:17", level: "WARN", service: "auth-service", message: "Connection pool exhausted: 50/50 connections in use" },
      { timestamp: "14:23:20", level: "ERROR", service: "session-manager", message: "Auth service unavailable, rejecting session requests" },
      { timestamp: "14:23:25", level: "INFO", service: "load-balancer", message: "Health check failed for auth-service-1, auth-service-2" }
    ],
    metrics: {
      errorRate: 45.7,
      responseTime: 8500,
      throughput: 234,
      cpuUsage: 78,
      memoryUsage: 92,
      dbConnections: 50
    }
  };

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

  const logLevelColors = {
    ERROR: "text-critical",
    WARN: "text-warning", 
    INFO: "text-info"
  };

  // Action handlers
  const handleExportReport = () => {
    const report = `INCIDENT REPORT
    
Incident ID: ${incident.id}
Title: ${incident.title}
Severity: ${incident.severity}
Status: ${incident.status}
Assignee: ${incident.assignee}
Created: ${incident.timestamp}

Description:
${incident.description}

Affected Systems:
${incident.affectedSystems.join(', ')}

Timeline:
${incident.timeline.map(t => `${t.time}: ${t.event} (by ${t.user})`).join('\n')}

AI Analysis:
Root Cause: Database connection pool exhaustion
Confidence: ${incident.aiConfidence}%
Recommended Solution: Scale connection pool, implement circuit breaker

Metrics:
Error Rate: ${incident.metrics.errorRate}%
Response Time: ${incident.metrics.responseTime}ms
CPU Usage: ${incident.metrics.cpuUsage}%
Memory Usage: ${incident.metrics.memoryUsage}%
`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incident-report-${incident.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report Exported",
      description: `Incident report ${incident.id} downloaded successfully`,
    });
  };

  const handleExecuteSolution = () => {
    toast({
      title: "Solution Executing",
      description: "Automated solution deployment initiated",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold">{incident.title}</h1>
                <Badge className={severityConfig[incident.severity].color}>
                  {severityConfig[incident.severity].label}
                </Badge>
                <Badge variant="outline" className={statusConfig[incident.status].color}>
                  {statusConfig[incident.status].label}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">#{incident.id}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleExportReport}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button onClick={handleExecuteSolution}>
              <Play className="h-4 w-4 mr-2" />
              Execute Solution
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="logs">System Logs</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Incident Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Incident Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Description</label>
                        <p className="text-sm mt-1">{incident.description}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Estimated Impact</label>
                        <p className="text-sm mt-1 text-critical">{incident.estimatedImpact}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Reporter</label>
                        <p className="text-sm mt-1">{incident.reporter}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Created</label>
                        <p className="text-sm mt-1">{incident.timestamp}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Affected Systems</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {incident.affectedSystems.map((system) => (
                          <Badge key={system} variant="outline" className="bg-critical/10 text-critical">
                            <Server className="h-3 w-3 mr-1" />
                            {system}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-primary" />
                      <span>AI Root Cause Analysis</span>
                      <Badge className="bg-success/20 text-success ml-auto">
                        {incident.aiConfidence}% Confidence
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                      <div>
                        <h4 className="font-medium text-critical">Root Cause Identified</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Database connection pool exhaustion due to increased traffic load (3x normal baseline). 
                          Connection timeout threshold exceeded under high concurrency.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-warning">Contributing Factors</h4>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          <li>• Connection pool size: 50 (recommended: 100 for current load)</li>
                          <li>• No circuit breaker pattern implemented</li>
                          <li>• Missing connection retry logic with exponential backoff</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-success">Recommended Solution</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          1. Scale database connection pool to 100 connections
                          2. Implement circuit breaker pattern for database calls
                          3. Add connection retry logic with exponential backoff
                          4. Deploy auto-scaling policies for auth service pods
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Incident Timeline</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {incident.timeline.map((event, index) => (
                        <div key={index} className="flex items-start space-x-4 pb-4 border-b border-border last:border-b-0">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                              {event.type === 'alert' && <AlertTriangle className="h-4 w-4 text-critical" />}
                              {event.type === 'creation' && <FileText className="h-4 w-4 text-info" />}
                              {event.type === 'assignment' && <User className="h-4 w-4 text-warning" />}
                              {event.type === 'analysis' && <Brain className="h-4 w-4 text-primary" />}
                              {event.type === 'reference' && <Activity className="h-4 w-4 text-info" />}
                              {event.type === 'solution' && <CheckCircle className="h-4 w-4 text-success" />}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{event.event}</p>
                              <span className="text-xs text-muted-foreground">{event.time}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">by {event.user}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="logs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>System Logs</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black/80 rounded-lg p-4 font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
                      {incident.logs.map((log, index) => (
                        <div key={index} className="flex space-x-4">
                          <span className="text-muted-foreground">{log.timestamp}</span>
                          <span className={`font-medium ${logLevelColors[log.level as keyof typeof logLevelColors]}`}>
                            {log.level}
                          </span>
                          <span className="text-primary">[{log.service}]</span>
                          <span className="text-foreground">{log.message}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="metrics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Error Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-critical">{incident.metrics.errorRate}%</div>
                      <div className="flex items-center text-sm text-critical">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +340% from baseline
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Response Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-warning">{incident.metrics.responseTime}ms</div>
                      <div className="flex items-center text-sm text-warning">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +850% from baseline
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Throughput</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-info">{incident.metrics.throughput} req/s</div>
                      <div className="flex items-center text-sm text-success">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Normal range
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">CPU Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-warning">{incident.metrics.cpuUsage}%</div>
                      <div className="flex items-center text-sm text-warning">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        High usage
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Memory Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-critical">{incident.metrics.memoryUsage}%</div>
                      <div className="flex items-center text-sm text-critical">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Critical level
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">DB Connections</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-critical">{incident.metrics.dbConnections}/50</div>
                      <div className="flex items-center text-sm text-critical">
                        <Database className="h-4 w-4 mr-1" />
                        Pool exhausted
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start"
                  onClick={() => setAIFixOpen(true)}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Apply AI Fix
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setJiraOpen(true)}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Create Jira Ticket
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setReassignOpen(true)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Reassign Incident
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setResolveOpen(true)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Resolved
                </Button>
              </CardContent>
            </Card>

            {/* Incident Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Incident Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Assignee</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">
                      SC
                    </div>
                    <span className="text-sm">{incident.assignee}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Priority</label>
                  <Badge className="mt-1 bg-critical text-critical-foreground">P1 - Critical</Badge>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">SLA Target</label>
                  <p className="text-sm mt-1">4h response, 24h resolution</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Time Remaining</label>
                  <p className="text-sm mt-1 text-warning">3h 47m</p>
                </div>
              </CardContent>
            </Card>

            {/* Similar Incidents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Similar Incidents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { id: "INC-2024-0847", similarity: "94%", resolution: "2h 15m" },
                  { id: "INC-2024-0723", similarity: "87%", resolution: "1h 45m" },
                  { id: "INC-2024-0612", similarity: "82%", resolution: "3h 10m" }
                ].map((similar) => (
                  <div key={similar.id} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-primary">{similar.id}</span>
                      <Badge variant="outline" className="text-xs">{similar.similarity}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Resolved in {similar.resolution}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ReassignDialog
        open={reassignOpen}
        onOpenChange={setReassignOpen}
        currentAssignee={incident.assignee}
      />
      
      <ResolveDialog
        open={resolveOpen}
        onOpenChange={setResolveOpen}
        incidentId={incident.id}
      />
      
      <JiraDialog
        open={jiraOpen}
        onOpenChange={setJiraOpen}
        incidentData={{
          id: incident.id,
          title: incident.title,
          severity: incident.severity,
          description: incident.description
        }}
      />
      
      <AIFixDialog
        open={aiFixOpen}
        onOpenChange={setAIFixOpen}
        incidentData={{
          id: incident.id,
          title: incident.title,
          severity: incident.severity
        }}
      />
    </div>
  );
};

export default IncidentDetails;