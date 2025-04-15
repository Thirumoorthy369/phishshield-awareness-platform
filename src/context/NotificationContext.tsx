
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Bell } from 'lucide-react';

// Define notification types
export interface PhishingAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  read: boolean;
}

interface NotificationContextType {
  alerts: PhishingAlert[];
  unreadCount: number;
  addAlert: (alert: Omit<PhishingAlert, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAlerts: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Mock alerts data for demonstration
const MOCK_ALERTS: PhishingAlert[] = [
  {
    id: '1',
    title: 'New Phishing Campaign Detected',
    description: 'A new phishing campaign targeting financial institutions has been detected.',
    severity: 'high',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false
  },
  {
    id: '2',
    title: 'Suspicious Login Attempt',
    description: 'Multiple login attempts were blocked from an unrecognized device.',
    severity: 'medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true
  },
  {
    id: '3',
    title: 'Critical Security Update',
    description: 'Update your browser to protect against the latest security vulnerabilities.',
    severity: 'critical',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: false
  }
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<PhishingAlert[]>(() => {
    // Try to get stored alerts from localStorage
    const storedAlerts = localStorage.getItem('phishingAlerts');
    if (storedAlerts) {
      try {
        const parsedAlerts = JSON.parse(storedAlerts);
        // Convert string timestamps back to Date objects
        return parsedAlerts.map((alert: any) => ({
          ...alert,
          timestamp: new Date(alert.timestamp)
        }));
      } catch (error) {
        console.error('Error parsing stored alerts:', error);
        return [...MOCK_ALERTS];
      }
    }
    return [...MOCK_ALERTS];
  });

  // Calculate unread count
  const unreadCount = alerts.filter(alert => !alert.read).length;

  // Save alerts to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('phishingAlerts', JSON.stringify(alerts));
    } catch (error) {
      console.error('Error saving alerts to localStorage:', error);
    }
  }, [alerts]);

  // Simulate receiving new alerts periodically (for demo purposes)
  useEffect(() => {
    // Only in development for demo purposes
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(() => {
        // 10% chance of getting a new alert every minute
        if (Math.random() < 0.1) {
          const mockAlert = {
            title: `New Phishing Attempt Detected`,
            description: `A new phishing attempt targeting ${
              ['Google', 'Microsoft', 'Amazon', 'PayPal'][Math.floor(Math.random() * 4)]
            } users has been detected.`,
            severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as 'low' | 'medium' | 'high' | 'critical'
          };
          addAlert(mockAlert);
        }
      }, 60000); // every minute
      
      return () => clearInterval(interval);
    }
  }, []);

  const addAlert = (alert: Omit<PhishingAlert, 'id' | 'timestamp' | 'read'>) => {
    const newAlert: PhishingAlert = {
      ...alert,
      id: `alert-${Date.now()}`,
      timestamp: new Date(),
      read: false
    };
    
    setAlerts(prev => [newAlert, ...prev]);
    
    // Show toast notification for new alerts
    toast({
      title: newAlert.title,
      description: newAlert.description,
      icon: <Bell className="h-4 w-4" />,
    });
  };

  const markAsRead = (id: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
  };

  const markAllAsRead = () => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => ({ ...alert, read: true }))
    );
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  return (
    <NotificationContext.Provider 
      value={{ 
        alerts,
        unreadCount,
        addAlert,
        markAsRead,
        markAllAsRead,
        clearAlerts
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
