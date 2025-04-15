
import { Bell, Info, AlertTriangle, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications, PhishingAlert } from '@/context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

const getSeverityIcon = (severity: PhishingAlert['severity']) => {
  switch (severity) {
    case 'low':
      return <Info className="h-4 w-4 text-blue-500" />;
    case 'medium':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'high':
      return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    case 'critical':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

const getSeverityColor = (severity: PhishingAlert['severity']) => {
  switch (severity) {
    case 'low':
      return 'bg-blue-50 border-blue-200';
    case 'medium':
      return 'bg-yellow-50 border-yellow-200';
    case 'high':
      return 'bg-orange-50 border-orange-200';
    case 'critical':
      return 'bg-red-50 border-red-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

const NotificationList = () => {
  const { alerts, markAllAsRead, clearAlerts } = useNotifications();

  if (alerts.length === 0) {
    return (
      <div className="py-6 px-4 text-center">
        <Bell className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500">No notifications</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between py-2 px-4 border-b">
        <h3 className="font-medium">Notifications</h3>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={markAllAsRead}>
            <Check className="h-3.5 w-3.5 mr-1" />
            Mark all read
          </Button>
          <Button size="sm" variant="ghost" onClick={clearAlerts}>
            Clear all
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="divide-y">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-4 ${!alert.read ? 'bg-gray-50' : ''} relative ${getSeverityColor(alert.severity)} transition-colors hover:bg-gray-100`}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getSeverityIcon(alert.severity)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{alert.title}</h4>
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize">
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{alert.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-2 border-t text-center">
        <Button variant="outline" size="sm" className="w-full">
          View all notifications
        </Button>
      </div>
    </div>
  );
};

export default NotificationList;
