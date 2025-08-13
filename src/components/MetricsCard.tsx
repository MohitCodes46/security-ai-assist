import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  status: "critical" | "warning" | "success" | "info";
}

const statusColors = {
  critical: "text-critical",
  warning: "text-warning", 
  success: "text-success",
  info: "text-info"
};

export const MetricsCard = ({ title, value, change, trend, status }: MetricsCardProps) => {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  
  return (
    <Card className="bg-gradient-to-br from-card to-muted/30 border-border hover:border-primary/50 transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className={`text-2xl font-bold ${statusColors[status]}`}>
            {value}
          </div>
          <div className={`flex items-center text-sm ${trend === "up" ? "text-success" : "text-critical"}`}>
            <TrendIcon className="h-4 w-4 mr-1" />
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};