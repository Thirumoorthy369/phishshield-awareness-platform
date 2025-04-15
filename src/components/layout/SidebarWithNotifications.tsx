
import { NavLink } from 'react-router-dom';
import { useAuth, UserRole } from '@/context/AuthContext';
import { 
  Bell, 
  BookOpen, 
  Home, 
  ShieldAlert, 
  Flag, 
  User, 
  Users, 
  LogOut, 
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar as OriginalSidebar } from './Sidebar';
import { useNotifications } from '@/context/NotificationContext';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const isAdmin = user?.role === UserRole.ADMIN || user?.role === UserRole.SUPER_ADMIN;

  // This is a wrapper that adds the notification link to the sidebar
  // Most of this mimics the original Sidebar component
  return (
    <div 
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out ${
        open ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 h-full pt-16`}
    >
      <div className="h-full flex flex-col overflow-y-auto">
        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          <NavLink 
            to="/dashboard" 
            end
            className={({isActive}) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive 
                  ? 'bg-primary-50 text-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/dashboard/training" 
            className={({isActive}) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive 
                  ? 'bg-primary-50 text-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <BookOpen className="mr-3 h-5 w-5" />
            Training
          </NavLink>
          
          <NavLink 
            to="/dashboard/practice" 
            className={({isActive}) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive 
                  ? 'bg-primary-50 text-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <ShieldAlert className="mr-3 h-5 w-5" />
            Practice
          </NavLink>

          <NavLink 
            to="/dashboard/reporting" 
            className={({isActive}) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive 
                  ? 'bg-primary-50 text-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <Flag className="mr-3 h-5 w-5" />
            Report Phishing
          </NavLink>

          {/* Notifications Link (new) */}
          <NavLink 
            to="/dashboard/notifications" 
            className={({isActive}) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive 
                  ? 'bg-primary-50 text-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <div className="relative mr-3">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              )}
            </div>
            Notifications
            {unreadCount > 0 && (
              <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                {unreadCount}
              </span>
            )}
          </NavLink>
          
          {/* Admin-only links */}
          {isAdmin && (
            <>
              <div className="pt-4 pb-2">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Admin
                </h3>
              </div>
              
              <NavLink 
                to="/dashboard/simulation" 
                className={({isActive}) => 
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive 
                      ? 'bg-primary-50 text-primary'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <ShieldAlert className="mr-3 h-5 w-5" />
                Simulation Hub
              </NavLink>
              
              <NavLink 
                to="/dashboard/users" 
                className={({isActive}) => 
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive 
                      ? 'bg-primary-50 text-primary'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Users className="mr-3 h-5 w-5" />
                User Management
              </NavLink>
              
              <NavLink 
                to="/dashboard/settings" 
                className={({isActive}) => 
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive 
                      ? 'bg-primary-50 text-primary'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </NavLink>
            </>
          )}
        </nav>
        
        {/* User profile and logout */}
        <div className="px-4 py-4 border-t">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                {user?.name?.charAt(0) || <User size={16} />}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start" 
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
