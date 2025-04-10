
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />
        
        <main 
          className={`flex-1 p-6 transition-all duration-300 ${
            sidebarOpen ? 'md:ml-64' : ''
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
