
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, BookOpen, FileText, Flag, Home, 
  Inbox, LifeBuoy, Mail, Settings, Shield, Users 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth, UserRole } from '@/context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const { user } = useAuth();
  const [activeGroup, setActiveGroup] = useState<string | null>('dashboard');

  // Define navigation items with access control
  const navItems = [
    { 
      id: 'dashboard',
      label: 'Dashboard', 
      icon: Home, 
      path: '/dashboard',
      roles: [UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN] 
    },
    { 
      id: 'training',
      label: 'Training Center', 
      icon: BookOpen, 
      path: '/training',
      roles: [UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN] 
    },
    { 
      id: 'practice',
      label: 'Practice Zone', 
      icon: LifeBuoy, 
      path: '/practice', 
      roles: [UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN] 
    },
    { 
      id: 'reporting',
      label: 'Report Phishing', 
      icon: Flag, 
      path: '/reporting',
      roles: [UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN] 
    },
    // Admin only features
    { 
      id: 'simulation',
      label: 'Simulation Hub', 
      icon: Mail, 
      path: '/simulation',
      roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] 
    },
    { 
      id: 'analytics',
      label: 'Analytics', 
      icon: BarChart3, 
      path: '/analytics',
      roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN]  
    },
    { 
      id: 'campaigns',
      label: 'Campaigns', 
      icon: Inbox, 
      path: '/campaigns',
      roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] 
    },
    // Super admin only features
    { 
      id: 'users',
      label: 'User Management', 
      icon: Users, 
      path: '/users',
      roles: [UserRole.SUPER_ADMIN] 
    },
    { 
      id: 'templates',
      label: 'Email Templates', 
      icon: FileText, 
      path: '/templates',
      roles: [UserRole.SUPER_ADMIN] 
    },
    { 
      id: 'settings',
      label: 'Platform Settings', 
      icon: Settings, 
      path: '/settings',
      roles: [UserRole.SUPER_ADMIN] 
    },
  ];

  // Filter nav items based on user role
  const filteredNavItems = user 
    ? navItems.filter(item => item.roles.includes(user.role))
    : [];

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r bg-white transition-transform duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center justify-center border-b">
        <Shield className="h-8 w-8 text-primary-600" />
        <span className="ml-2 text-xl font-bold">PhishShield</span>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  isActive 
                    ? "bg-primary-50 text-primary-700 font-medium" 
                    : "text-gray-500 hover:bg-gray-100"
                )
              }
              onClick={() => setActiveGroup(item.id)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
      
      <div className="p-4 mt-auto">
        <Separator className="my-2" />
        <div className="pt-2 text-xs text-gray-500">
          <p className="font-medium">PhishShield Security Platform</p>
          <p>v1.0.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
