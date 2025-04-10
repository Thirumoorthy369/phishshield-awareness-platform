
import { Info, Mail, SquareArrowDownRight } from 'lucide-react';
import PhishingEmailSimulator from '@/components/practice/PhishingEmailSimulator';

const PracticePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Practice Zone</h1>
        <p className="text-muted-foreground">
          Sharpen your phishing detection skills in this safe environment
        </p>
      </div>
      
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-md flex items-start">
        <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
        <div className="text-blue-700">
          <p className="font-medium">Welcome to the Practice Zone</p>
          <p className="mt-1">This is a safe environment where you can practice identifying phishing attempts without any real risk. Try to spot the warning signs in these simulated emails and websites.</p>
        </div>
      </div>
      
      <PhishingEmailSimulator />
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">More Practice Scenarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer">
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Mail className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Beginner</h3>
                <p className="text-sm text-gray-500">Basic phishing examples</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Start with obvious phishing attempts to learn the fundamentals.
            </p>
            <div className="flex justify-end">
              <SquareArrowDownRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer">
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Mail className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium">Intermediate</h3>
                <p className="text-sm text-gray-500">More subtle attacks</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Practice with more sophisticated phishing attempts that are harder to detect.
            </p>
            <div className="flex justify-end">
              <SquareArrowDownRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer">
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <Mail className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium">Advanced</h3>
                <p className="text-sm text-gray-500">Expert-level challenges</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Test your skills against highly convincing spear phishing and targeted attacks.
            </p>
            <div className="flex justify-end">
              <SquareArrowDownRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticePage;
