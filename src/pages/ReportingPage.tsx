
import { CheckCircle2, Flag, Shield } from 'lucide-react';
import PhishingReportForm from '@/components/reporting/PhishingReportForm';

const ReportingPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Report Phishing</h1>
        <p className="text-muted-foreground">
          Report suspicious emails or activities to help protect your organization
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PhishingReportForm />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-medium flex items-center mb-4">
              <Shield className="h-5 w-5 mr-2 text-primary-600" />
              Why Report Phishing?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Helps protect your colleagues from falling victim</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Enables IT security to block malicious domains</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Provides data to improve phishing detection systems</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Contributes to the security posture of your organization</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-medium flex items-center mb-4">
              <Flag className="h-5 w-5 mr-2 text-primary-600" />
              What to Look For
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="pb-3 border-b">
                <p className="font-medium">Suspicious Sender</p>
                <p className="text-gray-600 mt-1">Email addresses that don't match the supposed sender</p>
              </li>
              <li className="pb-3 border-b">
                <p className="font-medium">Urgent Requests</p>
                <p className="text-gray-600 mt-1">Messages creating false urgency to bypass critical thinking</p>
              </li>
              <li className="pb-3 border-b">
                <p className="font-medium">Suspicious Links</p>
                <p className="text-gray-600 mt-1">URLs that look similar to legitimate sites but are slightly different</p>
              </li>
              <li>
                <p className="font-medium">Requests for Sensitive Info</p>
                <p className="text-gray-600 mt-1">Requests for passwords, credit card details, or personal information</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingPage;
