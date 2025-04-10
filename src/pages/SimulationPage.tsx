
import { useState } from 'react';
import { BarChart, Calendar, Clock, Mail, PlusCircle, Settings, User, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PhishingTemplateCard from '@/components/simulation/PhishingTemplateCard';
import { useToast } from '@/hooks/use-toast';

// Mock template data
const phishingTemplates = [
  {
    id: 'template-1',
    name: 'Password Reset Request',
    category: 'IT Support',
    description: 'Email claiming to be from IT support requesting an urgent password change due to security issues.',
    difficulty: 'easy' as const,
    icon: 'mail' as const
  },
  {
    id: 'template-2',
    name: 'Account Verification',
    category: 'Account Security',
    description: 'Email asking users to verify their account information to avoid service interruption.',
    difficulty: 'medium' as const,
    icon: 'bell' as const
  },
  {
    id: 'template-3',
    name: 'Invoice Payment',
    category: 'Financial',
    description: 'Email with a fake invoice that requires immediate payment with a suspicious payment link.',
    difficulty: 'hard' as const,
    icon: 'creditcard' as const
  },
  {
    id: 'template-4',
    name: 'Package Delivery',
    category: 'Delivery',
    description: 'Email about a package delivery issue requiring action to proceed with delivery.',
    difficulty: 'medium' as const,
    icon: 'shopping' as const
  },
  {
    id: 'template-5',
    name: 'Document Sharing',
    category: 'Productivity',
    description: 'Email with a shared document that requires user login to access important files.',
    difficulty: 'medium' as const,
    icon: 'mail' as const
  },
  {
    id: 'template-6',
    name: 'CEO Fraud',
    category: 'Executive Impersonation',
    description: 'Email impersonating a company executive requesting urgent wire transfer or sensitive information.',
    difficulty: 'hard' as const,
    icon: 'mail' as const
  }
];

// Mock campaign data
const activeCampaigns = [
  {
    id: 'campaign-1',
    name: 'Q1 Security Awareness',
    templateName: 'Password Reset Request',
    startDate: '2023-01-15',
    status: 'Active',
    recipients: 48,
    opened: 35,
    clicked: 18,
    reported: 7
  },
  {
    id: 'campaign-2',
    name: 'New Hires Training',
    templateName: 'Account Verification',
    startDate: '2023-02-10',
    status: 'Active',
    recipients: 12,
    opened: 10,
    clicked: 3,
    reported: 4
  }
];

const completedCampaigns = [
  {
    id: 'campaign-3',
    name: 'Security Week Exercise',
    templateName: 'CEO Fraud',
    startDate: '2022-11-05',
    endDate: '2022-11-12',
    status: 'Completed',
    recipients: 86,
    opened: 72,
    clicked: 41,
    reported: 15
  },
  {
    id: 'campaign-4',
    name: 'Finance Department Training',
    templateName: 'Invoice Payment',
    startDate: '2022-12-01',
    endDate: '2022-12-15',
    status: 'Completed',
    recipients: 24,
    opened: 20,
    clicked: 8,
    reported: 10
  }
];

const SimulationPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('templates');
  const { toast } = useToast();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    toast({
      title: "Template Selected",
      description: "Configure your campaign details to continue",
    });
    setActiveTab('new');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phishing Simulation</h1>
          <p className="text-muted-foreground">
            Create and manage phishing simulations to test your organization's security awareness
          </p>
        </div>
        <Button onClick={() => setActiveTab('new')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="templates" className="flex-1">Email Templates</TabsTrigger>
          <TabsTrigger value="new" className="flex-1">New Campaign</TabsTrigger>
          <TabsTrigger value="active" className="flex-1">Active Campaigns</TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">Completed Campaigns</TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {phishingTemplates.map(template => (
              <PhishingTemplateCard
                key={template.id}
                template={template}
                onSelect={handleTemplateSelect}
              />
            ))}
          </div>
        </TabsContent>

        {/* New Campaign Tab */}
        <TabsContent value="new" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Create New Phishing Campaign</CardTitle>
              <CardDescription>
                Configure your phishing simulation campaign settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Campaign Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-name">Campaign Name</Label>
                    <Input id="campaign-name" placeholder="Q1 Security Awareness Campaign" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="campaign-date">Start Date</Label>
                    <Input id="campaign-date" type="date" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campaign-description">Description (Optional)</Label>
                  <textarea 
                    id="campaign-description" 
                    className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Campaign objectives and notes..."
                  />
                </div>
              </div>
              
              {/* Email Template */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Template</h3>
                
                <div className="p-4 border rounded-md bg-gray-50">
                  {selectedTemplate ? (
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {phishingTemplates.find(t => t.id === selectedTemplate)?.name || 'Unknown Template'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {phishingTemplates.find(t => t.id === selectedTemplate)?.category || 'Unknown Category'}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setActiveTab('templates')}>
                        Change Template
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <Mail className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">No template selected</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => setActiveTab('templates')}
                      >
                        Select Template
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Target Recipients */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Target Recipients</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center">
                      <input type="radio" name="recipient-type" id="all-users" className="mr-2" />
                      <label htmlFor="all-users" className="font-medium cursor-pointer">All Users</label>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 ml-5">
                      Send to all users in your organization (124)
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center">
                      <input type="radio" name="recipient-type" id="specific-depts" className="mr-2" />
                      <label htmlFor="specific-depts" className="font-medium cursor-pointer">Specific Departments</label>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 ml-5">
                      Select departments to target
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center">
                      <input type="radio" name="recipient-type" id="custom-list" className="mr-2" />
                      <label htmlFor="custom-list" className="font-medium cursor-pointer">Custom User List</label>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 ml-5">
                      Select specific users to target
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center">
                      <input type="radio" name="recipient-type" id="upload-csv" className="mr-2" />
                      <label htmlFor="upload-csv" className="font-medium cursor-pointer">Upload CSV</label>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 ml-5">
                      Upload a CSV file with email addresses
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Advanced Settings (collapsed by default) */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  <h3 className="text-lg font-medium">Advanced Settings</h3>
                </div>
                
                <div className="text-sm text-gray-500">
                  <a href="#" className="text-primary underline">
                    Click to configure advanced settings
                  </a>
                  <span className="ml-1">
                    (Landing page URL, success page, tracking options)
                  </span>
                </div>
              </div>
            </CardContent>
            
            <div className="p-6 border-t flex justify-end space-x-2">
              <Button variant="outline">
                Save as Draft
              </Button>
              <Button
                disabled={!selectedTemplate}
                onClick={() => {
                  toast({
                    title: "Campaign Created",
                    description: "Your phishing simulation campaign has been created and scheduled.",
                    variant: "success"
                  });
                  setActiveTab('active');
                }}
              >
                Launch Campaign
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Active Campaigns Tab */}
        <TabsContent value="active" className="m-0">
          <div className="space-y-4">
            {activeCampaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </TabsContent>

        {/* Completed Campaigns Tab */}
        <TabsContent value="completed" className="m-0">
          <div className="space-y-4">
            {completedCampaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface CampaignCardProps {
  campaign: any; // Using 'any' for brevity, should use proper type in real app
}

const CampaignCard = ({ campaign }: CampaignCardProps) => {
  // Calculate metrics
  const openRate = Math.round((campaign.opened / campaign.recipients) * 100);
  const clickRate = Math.round((campaign.clicked / campaign.recipients) * 100);
  const reportRate = Math.round((campaign.reported / campaign.recipients) * 100);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle>{campaign.name}</CardTitle>
            <CardDescription>{campaign.templateName}</CardDescription>
          </div>
          <div className={`px-2 py-1 text-xs font-medium rounded-full ${
            campaign.status === 'Active' 
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {campaign.status}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">
              Started: {new Date(campaign.startDate).toLocaleDateString()}
            </span>
          </div>
          
          {campaign.endDate && (
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                Ended: {new Date(campaign.endDate).toLocaleDateString()}
              </span>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm">
              Recipients: {campaign.recipients}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard 
            label="Open Rate" 
            value={`${openRate}%`}
            icon={Mail}
            tooltip={`${campaign.opened} of ${campaign.recipients} opened`}
            color="blue"
          />
          
          <MetricCard 
            label="Click Rate" 
            value={`${clickRate}%`}
            icon={User}
            tooltip={`${campaign.clicked} of ${campaign.recipients} clicked`}
            color="amber"
          />
          
          <MetricCard 
            label="Report Rate" 
            value={`${reportRate}%`}
            icon={BarChart}
            tooltip={`${campaign.reported} of ${campaign.recipients} reported`}
            color="green"
          />
        </div>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricCardProps {
  label: string;
  value: string;
  icon: any; // Component type
  tooltip: string;
  color: 'blue' | 'green' | 'amber' | 'red';
}

const MetricCard = ({ label, value, icon: Icon, tooltip, color }: MetricCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className={`p-4 rounded-md border ${colorClasses[color]}`} title={tooltip}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{label}</span>
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};

export default SimulationPage;
