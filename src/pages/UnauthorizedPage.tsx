
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-red-100">
            <ShieldAlert className="h-16 w-16 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900">Access Denied</h1>
        
        <p className="mt-4 text-gray-600">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        
        <div className="mt-8">
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
