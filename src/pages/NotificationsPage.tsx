
import { useEffect } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNotifications, PhishingAlert } from '@/context/NotificationContext';
import { formatDistanceToNow, format } from 'date-fns';

const getSeverityBadgeClass = (severity: PhishingAlert['severity']) => {
  switch (severity) {
    case 'low':
      return 'bg-blue-100 text-blue-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'high':
      return 'bg-orange-100 text-orange-800';
    case 'critical':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const NotificationsPage = () => {
  const { alerts, markAllAsRead, clearAlerts } = useNotifications();
  
  // Mark all as read when viewing this page
  useEffect(() => {
    markAllAsRead();
  }, [markAllAsRead]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated on the latest phishing threats and security alerts
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
          <Button variant="outline" onClick={clearAlerts}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear all
          </Button>
        </div>
      </div>
      
      {alerts.length === 0 ? (
        <Card>
          <CardContent className="py-10 flex flex-col items-center justify-center">
            <Bell className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
            <p className="text-gray-500 mt-1">You're all caught up!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className="overflow-hidden">
              <div className={`h-1 ${
                alert.severity === 'critical' ? 'bg-red-500' : 
                alert.severity === 'high' ? 'bg-orange-500' :
                alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{alert.title}</CardTitle>
                    <CardDescription>
                      {format(alert.timestamp, 'PPP')} at {format(alert.timestamp, 'p')}
                    </CardDescription>
                  </div>
                  <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityBadgeClass(alert.severity)}`}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{alert.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
