
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon: Icon, change, className }: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            {change && (
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    "text-xs font-medium",
                    change.positive ? "text-green-500" : "text-red-500"
                  )}
                >
                  {change.positive ? "+" : "-"}{Math.abs(change.value)}%
                </span>
                <span className="text-xs text-gray-500 ml-1">from last month</span>
              </div>
            )}
          </div>
          
          <div className="h-12 w-12 rounded-lg bg-primary-50 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
