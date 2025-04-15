
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './HeaderWithNotifications';
import { Sidebar } from './SidebarWithNotifications';
import { useMobile } from '@/hooks/use-mobile';

const DashboardLayoutWithNotifications = () => {
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const location = useLocation();

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Update sidebar state when screen size changes
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 pt-16">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main
          className={`flex-1 p-6 transition-all duration-200 ${
            sidebarOpen ? 'md:ml-64' : ''
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayoutWithNotifications;
