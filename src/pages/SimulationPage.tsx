import { useState } from 'react';
import { AlertCircle, BarChart3, Calendar, Check, ChevronRight, Mail, Pencil, PlusCircle, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import PhishingTemplateCard from '@/components/simulation/PhishingTemplateCard';
import { useAuth, UserRole } from '@/context/auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Mock template data for PhishingTemplateCard
const mockTemplate = {
  id: 1,
  name: "Password Reset",
  description: "A fake password reset email template",
  category: "Authentication",
  difficulty: "Medium"
};

// Mock data for campaigns
const campaigns = [
  {
    id: 1,
    name: 'Spring Security Awareness',
    status: 'active',
    startDate: '2023-03-01',
    endDate: '2023-03-15',
    targets: 142,
    template: 'Password Reset',
    opens: 87,
    clicks: 34,
    reports: 22
  },
  {
    id: 2,
    name: 'New Policy Announcement',
    status: 'scheduled',
    startDate: '2023-04-01',
    endDate: '2023-04-10',
    targets: 156,
    template: 'Policy Update',
    opens: 0,
    clicks: 0,
    reports: 0
  },
  {
    id: 3,
    name: 'IT Department Update',
    status: 'completed',
    startDate: '2023-02-10',
    endDate: '2023-02-20',
    targets: 138,
    template: 'Software Update',
    opens: 122,
    clicks: 56,
    reports: 41
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
    case 'scheduled':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Scheduled</Badge>;
    case 'completed':
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Completed</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const SimulationPage = () => {
  const [currentTab, setCurrentTab] = useState('campaigns');
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState(mockTemplate);
  
  // Check if user has admin privileges
  const isAuthorized = user?.role === UserRole.ADMIN || user?.role === UserRole.SUPER_ADMIN;
  
  if (!isAuthorized) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You don't have permission to access the simulation hub. Please contact your administrator.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleDeleteCampaign = (id: number) => {
    toast({
      title: "Campaign deleted",
      description: `Campaign #${id} has been deleted.`,
      variant: "destructive"
    });
  };

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template);
    toast({
      title: "Template selected",
      description: `${template.name} template has been selected.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Simulation Hub</h1>
          <p className="text-muted-foreground">
            Create and manage phishing simulation campaigns
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-full mr-4">
                <Mail className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Campaigns</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-full mr-4">
                <Users className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Targets</p>
                <p className="text-2xl font-bold">468</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-amber-100 rounded-full mr-4">
                <BarChart3 className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Click Rate</p>
                <p className="text-2xl font-bold">24.8%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-full mr-4">
                <AlertCircle className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Report Rate</p>
                <p className="text-2xl font-bold">31.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Simulation Tabs */}
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Active & Scheduled Campaigns</CardTitle>
              <CardDescription>
                Manage your ongoing and upcoming phishing simulations
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead className="hidden md:table-cell">Dates</TableHead>
                    <TableHead className="hidden md:table-cell">Targets</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map(campaign => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      <TableCell>{campaign.template}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{campaign.targets}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => handleDeleteCampaign(campaign.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t p-4 flex justify-center">
              <Button variant="outline">
                View All Campaigns
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          {/* Campaign Results */}
          <Card>
            <CardHeader>
              <CardTitle>Latest Campaign Results</CardTitle>
              <CardDescription>
                Performance metrics from your most recent campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              {campaigns
                .filter(c => c.status === 'completed')
                .map(campaign => {
                  const clickRate = (campaign.clicks / campaign.opens) * 100;
                  const reportRate = (campaign.reports / campaign.clicks) * 100;
                  
                  return (
                    <div key={campaign.id} className="mb-6 last:mb-0">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">{campaign.name}</h4>
                        <span className="text-sm text-muted-foreground">
                          {new Date(campaign.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Open Rate ({campaign.opens}/{campaign.targets})</span>
                            <span>{Math.round((campaign.opens / campaign.targets) * 100)}%</span>
                          </div>
                          <Progress value={(campaign.opens / campaign.targets) * 100} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Click Rate ({campaign.clicks}/{campaign.opens})</span>
                            <span>{clickRate.toFixed(1)}%</span>
                          </div>
                          <Progress value={clickRate} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Report Rate ({campaign.reports}/{campaign.clicks})</span>
                            <span>{reportRate.toFixed(1)}%</span>
                          </div>
                          <Progress value={reportRate} className="h-2 bg-muted" />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Detailed Analytics
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PhishingTemplateCard 
              template={selectedTemplate} 
              onSelect={handleSelectTemplate} 
            />
            
            {/* Add New Template Card */}
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>Create New Template</CardTitle>
                <CardDescription>
                  Design a custom phishing email template
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-40">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance Overview</CardTitle>
              <CardDescription>
                Comparative metrics across all phishing campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded-md bg-gray-50">
                <div className="text-center p-6">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Analytics Dashboard</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Detailed analytics visualizations would be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vulnerable Departments</CardTitle>
                <CardDescription>
                  Departments with highest click rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Finance</span>
                      <span className="font-medium">32.5%</span>
                    </div>
                    <Progress value={32.5} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Customer Service</span>
                      <span className="font-medium">28.7%</span>
                    </div>
                    <Progress value={28.7} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sales</span>
                      <span className="font-medium">24.2%</span>
                    </div>
                    <Progress value={24.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Human Resources</span>
                      <span className="font-medium">18.9%</span>
                    </div>
                    <Progress value={18.9} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>IT Department</span>
                      <span className="font-medium">12.3%</span>
                    </div>
                    <Progress value={12.3} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Most Effective Templates</CardTitle>
                <CardDescription>
                  Templates with highest click-through rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Password Reset</span>
                      <span className="font-medium">41.2%</span>
                    </div>
                    <Progress value={41.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Package Delivery</span>
                      <span className="font-medium">38.7%</span>
                    </div>
                    <Progress value={38.7} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Account Verification</span>
                      <span className="font-medium">35.5%</span>
                    </div>
                    <Progress value={35.5} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Invoice Payment</span>
                      <span className="font-medium">30.8%</span>
                    </div>
                    <Progress value={30.8} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>IT Security Alert</span>
                      <span className="font-medium">22.4%</span>
                    </div>
                    <Progress value={22.4} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulationPage;
