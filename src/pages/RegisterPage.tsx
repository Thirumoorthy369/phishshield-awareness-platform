
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import RegisterForm from '@/components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-primary-600" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">PhishShield</h1>
          <p className="mt-1 text-gray-600">Join our security-aware community</p>
        </div>
        
        <RegisterForm />
        
        <p className="mt-8 text-center text-sm text-gray-500">
          By registering, you agree to our{' '}
          <Link to="/terms" className="text-primary-600 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
