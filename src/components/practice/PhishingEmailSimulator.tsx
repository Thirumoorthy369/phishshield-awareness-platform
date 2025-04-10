
import { useState } from 'react';
import { AlertCircle, AlertTriangle, ArrowLeft, ArrowRight, Calendar, HelpCircle, Mail, Paperclip, Shield, Trash, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Sample phishing email data
const phishingEmail = {
  id: 'email-001',
  from: {
    name: 'PayPał Secure',
    email: 'security@paypaI.com' // Using capital I instead of l
  },
  to: 'user@company.com',
  subject: 'Action Required: Your account has been limited',
  date: 'Today, 10:32 AM',
  body: `
    <div style="font-family: Arial, sans-serif;">
      <div style="padding: 20px;">
        <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal Logo" style="width: 100px;">
        <h2 style="color: #003087;">Your account has been limited</h2>
        <p>Dear valued customer,</p>
        <p>We have noticed suspicious activity on your account. To ensure your account security, we have temporarily limited some features.</p>
        <p>Please verify your information by clicking the button below:</p>
        <div style="margin: 20px 0;">
          <a href="#" style="background-color: #0070ba; color: white; padding: 10px 20px; text-decoration: none; border-radius: 3px;">Verify Account</a>
        </div>
        <p>If you don't verify your account within 24 hours, your account will be suspended.</p>
        <p>Thank you for your cooperation.</p>
        <p>PayPal Security Team</p>
      </div>
      <div style="font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 10px;">
        © 2023 PayPal Inc. All rights reserved.
      </div>
    </div>
  `,
  redFlags: [
    { 
      id: 1, 
      type: 'sender', 
      description: 'The sender email uses "paypaI.com" with a capital I instead of a lowercase L to mimic the real PayPal domain.' 
    },
    { 
      id: 2, 
      type: 'urgency', 
      description: 'The email creates false urgency with a 24-hour deadline to pressure users into taking immediate action.' 
    },
    { 
      id: 3, 
      type: 'grammar', 
      description: 'The company name has a slight misspelling - "PayPał" instead of "PayPal".' 
    },
    { 
      id: 4, 
      type: 'link', 
      description: 'The button likely leads to a phishing site designed to steal login credentials.' 
    }
  ]
};

const PhishingEmailSimulator = () => {
  const [identifiedFlags, setIdentifiedFlags] = useState<number[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [currentTab, setCurrentTab] = useState('email');
  const { toast } = useToast();

  const handleFlagIdentify = (flagId: number) => {
    if (!identifiedFlags.includes(flagId)) {
      setIdentifiedFlags(prev => [...prev, flagId]);
      toast({
        title: "Good catch!",
        description: "You've identified a phishing indicator.",
        variant: "success"
      });
    }
  };

  const handleReport = () => {
    if (identifiedFlags.length >= 2) {
      toast({
        title: "Email Reported!",
        description: "Great job identifying this phishing attempt!",
        variant: "success"
      });
    } else {
      toast({
        title: "Not enough evidence",
        description: "Try to identify more suspicious elements before reporting.",
        variant: "warning"
      });
    }
  };

  const toggleHints = () => {
    setShowHints(!showHints);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="border-b pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary-600" />
              Phishing Practice Zone
            </div>
          </CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleHints}
            >
              <HelpCircle className="h-4 w-4 mr-1" />
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleReport}
            >
              <AlertTriangle className="h-4 w-4 mr-1" />
              Report as Phishing
            </Button>
          </div>
        </div>
        <CardDescription>
          Practice identifying phishing emails in this safe environment. Try to spot the red flags!
        </CardDescription>
      </CardHeader>

      <Tabs defaultValue="email" value={currentTab} onValueChange={setCurrentTab}>
        <div className="px-4 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="email" className="flex-1">Email View</TabsTrigger>
            <TabsTrigger value="analysis" className="flex-1">Analysis</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="email" className="m-0">
          <CardContent className="p-4">
            <div className="border rounded-md overflow-hidden bg-white">
              {/* Email header */}
              <div className="bg-gray-50 p-4 border-b">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-xl font-medium">{phishingEmail.subject}</div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-sm">
                  <div className="text-gray-500">From:</div>
                  <div className="relative group">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="hover:underline cursor-pointer">
                            {phishingEmail.from.name} &lt;{phishingEmail.from.email}&gt;
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <div className="p-1">
                            {showHints && identifiedFlags.includes(1) ? (
                              <span className="text-red-500">This is a fake domain with a capital I instead of l</span>
                            ) : (
                              <span>Click to examine the sender</span>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {showHints && !identifiedFlags.includes(1) && (
                      <AlertCircle 
                        className="h-4 w-4 text-amber-500 inline ml-1 cursor-pointer animate-pulse" 
                        onClick={() => handleFlagIdentify(1)}
                      />
                    )}
                  </div>
                  
                  <div className="text-gray-500">To:</div>
                  <div>{phishingEmail.to}</div>
                  
                  <div className="text-gray-500">Date:</div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {phishingEmail.date}
                  </div>
                </div>
              </div>
              
              {/* Email body */}
              <div className="p-4 relative">
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: phishingEmail.body }}
                />
                
                {/* Overlay interactive elements for red flags */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Company Name Flag */}
                  <div 
                    className="absolute top-[80px] left-[130px] w-[80px] h-[30px] cursor-pointer pointer-events-auto"
                    onClick={() => handleFlagIdentify(3)}
                  >
                    {showHints && !identifiedFlags.includes(3) && (
                      <div className="absolute -top-1 -right-2">
                        <AlertCircle className="h-5 w-5 text-amber-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                  
                  {/* Urgency Flag */}
                  <div 
                    className="absolute top-[195px] left-[20px] w-[530px] h-[25px] cursor-pointer pointer-events-auto"
                    onClick={() => handleFlagIdentify(2)}
                  >
                    {showHints && !identifiedFlags.includes(2) && (
                      <div className="absolute -top-1 -right-2">
                        <AlertCircle className="h-5 w-5 text-amber-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                  
                  {/* Button Link Flag */}
                  <div 
                    className="absolute top-[145px] left-[20px] w-[200px] h-[40px] cursor-pointer pointer-events-auto"
                    onClick={() => handleFlagIdentify(4)}
                  >
                    {showHints && !identifiedFlags.includes(4) && (
                      <div className="absolute -top-1 -right-2">
                        <AlertCircle className="h-5 w-5 text-amber-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="analysis" className="m-0">
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Phishing Indicators Found</h3>
              <div className="space-y-3">
                {phishingEmail.redFlags.map(flag => {
                  const isIdentified = identifiedFlags.includes(flag.id);
                  return (
                    <div 
                      key={flag.id}
                      className={`p-3 border rounded-md ${
                        isIdentified 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start">
                        {isIdentified ? (
                          <Shield className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                        )}
                        <div>
                          <p className="font-medium">
                            {flag.type.charAt(0).toUpperCase() + flag.type.slice(1)} Issue
                            {!isIdentified && ' (Not Found Yet)'}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">{flag.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-6 p-4 border rounded-md bg-blue-50 border-blue-200">
              <h3 className="text-lg font-medium mb-2 text-blue-800">Learning Tips</h3>
              <ul className="list-disc pl-5 space-y-2 text-blue-700">
                <li>Always check the sender's email address for subtle misspellings</li>
                <li>Be wary of messages creating a false sense of urgency</li>
                <li>Hover over links before clicking to see the actual destination</li>
                <li>Look for grammatical errors or inconsistent branding</li>
                <li>When in doubt, contact the company directly using their official website</li>
              </ul>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>

      <CardFooter className="border-t p-4 flex justify-between">
        <Button variant="outline">
          Previous Exercise
        </Button>
        <Button>
          Next Exercise
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PhishingEmailSimulator;
