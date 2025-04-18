
import { useState } from 'react';
import { AlertCircle, Check, Mail, Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface PhishingEmail {
  id: string;
  subject: string;
  sender: string;
  content: string;
  isPhishing: boolean;
  indicators: string[];
}

const sampleEmails: PhishingEmail[] = [
  {
    id: '1',
    subject: 'Urgent: Your Account Access Will Be Terminated',
    sender: 'security@amaz0n-services.com',
    content: `Dear Valued Customer,

We've detected unusual activity on your account. Your account access will be terminated within 24 hours unless you verify your information immediately.

Click here to verify your account: [VERIFY NOW]

Amazon Customer Service`,
    isPhishing: true,
    indicators: [
      'Sender email domain is suspicious (amaz0n-services.com)',
      'Creates urgency with threat of account termination',
      'Generic greeting instead of using your name',
      'Contains suspicious link'
    ]
  },
  {
    id: '2',
    subject: 'Your Monthly Invoice',
    sender: 'billing@adobe.com',
    content: `Dear Customer,

Your monthly invoice for Adobe Creative Cloud is now available. 

Invoice #: INV-2023-05678
Date: May 15, 2023
Amount: $52.99

You can view your invoice by logging into your account at adobe.com.

Thank you for your business.
Adobe Billing Team`,
    isPhishing: false,
    indicators: []
  },
  {
    id: '3',
    subject: 'Password Reset Required',
    sender: 'security@apple.help',
    content: `Dear User,

We have detected an unauthorized login attempt on your Apple ID. For your security, we have temporarily locked your account.

Please click on the link below to reset your password and restore access to your account:
[RESET PASSWORD]

If you do not reset your password within 24 hours, your account may be permanently disabled.

Apple Security Team`,
    isPhishing: true,
    indicators: [
      'Sender domain is suspicious (apple.help instead of apple.com)',
      'Creates urgency with account lockout threat',
      'Generic greeting "Dear User" instead of your name',
      'Suspicious link for password reset'
    ]
  }
];

const PhishingEmailSimulator = () => {
  const [currentEmail, setCurrentEmail] = useState<PhishingEmail>(sampleEmails[0]);
  const [userResponse, setUserResponse] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [emailsAttempted, setEmailsAttempted] = useState(0);
  const { toast } = useToast();
  
  const handleResponse = (isPhishing: boolean) => {
    setUserResponse(isPhishing);
    setShowFeedback(true);
    setEmailsAttempted(prev => prev + 1);
    
    if (isPhishing === currentEmail.isPhishing) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct!",
        description: isPhishing 
          ? "You correctly identified this as a phishing email." 
          : "You correctly identified this as a legitimate email.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: isPhishing 
          ? "This was actually a legitimate email." 
          : "This was actually a phishing attempt.",
        variant: "destructive",
      });
    }
  };

  const nextEmail = () => {
    const nextIndex = sampleEmails.findIndex(email => email.id === currentEmail.id) + 1;
    if (nextIndex < sampleEmails.length) {
      setCurrentEmail(sampleEmails[nextIndex]);
    } else {
      setCurrentEmail(sampleEmails[0]); // Loop back to first email
      toast({
        title: "Practice Complete",
        description: `You've gone through all sample emails. Your score: ${score}/${emailsAttempted}`,
        variant: "default",
      });
    }
    setUserResponse(null);
    setShowFeedback(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Simulator</CardTitle>
          <CardDescription>
            Practice identifying phishing emails in a safe environment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              Score: {score}/{emailsAttempted}
            </div>
          </div>
          
          <div className="border rounded-md p-4 mb-6">
            <div className="flex justify-between border-b pb-2 mb-2">
              <div><strong>From:</strong> {currentEmail.sender}</div>
              <div><strong>Subject:</strong> {currentEmail.subject}</div>
            </div>
            <div className="whitespace-pre-line">
              {currentEmail.content}
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleResponse(false)}
              disabled={showFeedback}
            >
              <Shield className="mr-2 h-4 w-4" />
              Legitimate Email
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleResponse(true)}
              disabled={showFeedback}
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              Phishing Attempt
            </Button>
          </div>
        </CardContent>
        
        {showFeedback && (
          <CardFooter className="flex-col items-start">
            {userResponse === currentEmail.isPhishing ? (
              <Alert className="mb-4 border-green-500 bg-green-50">
                <Check className="h-4 w-4 text-green-600" />
                <AlertTitle>Correct!</AlertTitle>
                <AlertDescription>
                  {currentEmail.isPhishing 
                    ? "This is indeed a phishing email. Good catch!" 
                    : "This is a legitimate email. Well done!"}
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="mb-4 border-red-500 bg-red-50">
                <X className="h-4 w-4 text-red-600" />
                <AlertTitle>Incorrect</AlertTitle>
                <AlertDescription>
                  {currentEmail.isPhishing 
                    ? "This is actually a phishing email." 
                    : "This is actually a legitimate email."}
                </AlertDescription>
              </Alert>
            )}
            
            {currentEmail.isPhishing && (
              <div className="mb-4">
                <h4 className="font-medium mb-2">Phishing Indicators:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {currentEmail.indicators.map((indicator, index) => (
                    <li key={index} className="text-sm">{indicator}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <Button onClick={nextEmail} className="mt-2">
              <Mail className="mr-2 h-4 w-4" />
              Next Email
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default PhishingEmailSimulator;
