
import { useState } from 'react';
import { CalendarDays, Mail, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Mock data for simulation results
const simulationData = {
  name: 'IT Support Password Reset',
  sentDate: '2023-04-01',
  targets: 150,
  opened: 95,
  clicked: 62,
  reported: 28,
  completed: true
};

const PhishingSimulationCard = () => {
  // Calculate metrics
  const openRate = Math.round((simulationData.opened / simulationData.targets) * 100);
  const clickRate = Math.round((simulationData.clicked / simulationData.targets) * 100);
  const reportRate = Math.round((simulationData.reported / simulationData.targets) * 100);
  
  // Determine risk level
  const getRiskLevel = () => {
    if (clickRate > 50) return { level: 'High', color: 'text-red-500' };
    if (clickRate > 25) return { level: 'Medium', color: 'text-amber-500' };
    return { level: 'Low', color: 'text-green-500' };
  };
  
  const risk = getRiskLevel();

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{simulationData.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <CalendarDays className="h-3 w-3 mr-1" />
              Sent on {new Date(simulationData.sentDate).toLocaleDateString()}
            </CardDescription>
          </div>
          
          <div className="px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
            {simulationData.completed ? 'Completed' : 'Active'}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-3 gap-4 my-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Mail className="h-4 w-4 text-primary-600" />
              <span className="text-lg font-bold">{openRate}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Opened</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <TrendingUp className="h-4 w-4 text-amber-500" />
              <span className="text-lg font-bold">{clickRate}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Clicked</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Users className="h-4 w-4 text-green-500" />
              <span className="text-lg font-bold">{reportRate}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Reported</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Vulnerability Score</span>
            <span className={`text-sm font-medium ${risk.color}`}>{risk.level} Risk</span>
          </div>
          <Progress value={clickRate} className="h-2" />
        </div>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" size="sm">View Details</Button>
          <Button size="sm">Run Again</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhishingSimulationCard;
