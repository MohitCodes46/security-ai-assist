import { DashboardHeader } from "@/components/DashboardHeader";
import { MetricsCard } from "@/components/MetricsCard";
import { IncidentCard } from "@/components/IncidentCard";
import { AIAnalysisPanel } from "@/components/AIAnalysisPanel";

const Index = () => {
  const mockIncidents = [
    {
      id: "INC-2024-0952",
      title: "Database Connection Timeout - Auth Service",
      severity: "critical" as const,
      timestamp: "2 min ago",
      assignee: "Sarah Chen",
      status: "investigating" as const,
      aiConfidence: 95,
      suggestedAction: "Scale database connections and implement circuit breaker pattern"
    },
    {
      id: "INC-2024-0951", 
      title: "API Rate Limit Exceeded - Payment Gateway",
      severity: "warning" as const,
      timestamp: "15 min ago",
      assignee: "Mike Rodriguez",
      status: "open" as const,
      aiConfidence: 87,
      suggestedAction: "Implement exponential backoff and request queuing"
    },
    {
      id: "INC-2024-0950",
      title: "SSL Certificate Renewal Alert",
      severity: "info" as const,
      timestamp: "1 hour ago", 
      assignee: "Alex Park",
      status: "resolved" as const,
      aiConfidence: 99,
      suggestedAction: "Certificate successfully renewed via automated process"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="p-6 space-y-6">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricsCard
            title="Active Incidents"
            value="12"
            change="+3"
            trend="up"
            status="critical"
          />
          <MetricsCard
            title="Avg Resolution Time"
            value="2.4h"
            change="-15%"
            trend="down"
            status="success"
          />
          <MetricsCard
            title="AI Accuracy"
            value="94.2%"
            change="+2.1%"
            trend="up"
            status="success"
          />
          <MetricsCard
            title="Systems Monitored"
            value="847"
            change="+12"
            trend="up"
            status="info"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Incidents Feed */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Incidents</h2>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-critical rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Live Feed</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {mockIncidents.map((incident) => (
                <IncidentCard key={incident.id} {...incident} />
              ))}
            </div>
          </div>

          {/* AI Analysis Panel */}
          <div className="lg:col-span-1">
            <AIAnalysisPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
