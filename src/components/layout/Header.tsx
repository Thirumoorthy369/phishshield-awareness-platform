
import { Link } from 'react-router-dom';
import { Bell, LogOut, Menu, Shield, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth, UserRole } from '@/context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user, logout } = useAuth();

  const getRoleName = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'Administrator';
      case UserRole.SUPER_ADMIN:
        return 'Super Admin';
      default:
        return 'User';
    }
  };

  return (
    <header className="border-b bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/dashboard" className="flex items-center">
          <Shield className="h-7 w-7 text-primary-600 animate-pulse-shield" />
          <span className="ml-2 text-xl font-bold text-primary-800 hidden sm:inline-block">PhishShield</span>
        </Link>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </Button>
        
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-700" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{getRoleName(user.role)}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">Profile Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/security-settings" className="cursor-pointer">Security</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-500 cursor-pointer"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
