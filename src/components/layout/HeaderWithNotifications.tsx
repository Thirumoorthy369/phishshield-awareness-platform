
import { Header as OriginalHeader } from './Header';
import NotificationBell from '../notifications/NotificationBell';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <div className="relative">
      <OriginalHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
        <NotificationBell />
      </div>
    </div>
  );
};
