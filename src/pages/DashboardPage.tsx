
import { BarChart3, BookOpen, CheckCircle, Flag, Mail, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/dashboard/StatCard';
import PhishingSimulationCard from '@/components/dashboard/PhishingSimulationCard';
import TrainingProgressCard from '@/components/dashboard/TrainingProgressCard';
import { useAuth } from '@/context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! Here's an overview of your security awareness journey.
          </p>
        </div>
        {isAdmin && (
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            New Simulation
          </Button>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Phishing Awareness Score" 
          value="87/100" 
          icon={Shield}
          change={{ value: 12, positive: true }}
        />
        <StatCard 
          title="Training Completed" 
          value="8/12" 
          icon={BookOpen}
          change={{ value: 2, positive: true }}
        />
        <StatCard 
          title="Simulations Passed" 
          value="5/7" 
          icon={CheckCircle}
        />
        <StatCard 
          title="Threats Reported" 
          value="12" 
          icon={Flag}
          change={{ value: 3, positive: true }}
        />
      </div>

      {/* Admin Stats (only visible to admins) */}
      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Team Awareness Score" 
            value="72/100" 
            icon={Shield}
            change={{ value: 8, positive: true }}
          />
          <StatCard 
            title="Active Campaigns" 
            value="3" 
            icon={Mail}
          />
          <StatCard 
            title="Click Rate" 
            value="24%" 
            icon={Zap}
            change={{ value: 5, positive: false }}
          />
          <StatCard 
            title="Report Rate" 
            value="68%" 
            icon={BarChart3}
            change={{ value: 14, positive: true }}
          />
        </div>
      )}

      {/* Main Content Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Simulations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Phishing Simulations</CardTitle>
            <CardDescription>
              Results from recent phishing simulation exercises
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PhishingSimulationCard />
            
            {isAdmin && (
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  View All Campaigns
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Training Progress */}
        <TrainingProgressCard />
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center text-lg">
              <BookOpen className="h-5 w-5 mr-2 text-primary-600" />
              Security Training
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Complete interactive courses to improve your security awareness.
            </p>
            <Button variant="default" className="w-full">
              Continue Learning
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center text-lg">
              <Shield className="h-5 w-5 mr-2 text-primary-600" />
              Practice Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Test your skills in a safe environment with simulated phishing attempts.
            </p>
            <Button variant="default" className="w-full">
              Start Practice
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center text-lg">
              <Flag className="h-5 w-5 mr-2 text-primary-600" />
              Report Phishing
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Report suspicious emails or activities to help protect your organization.
            </p>
            <Button variant="default" className="w-full">
              Report Threat
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
