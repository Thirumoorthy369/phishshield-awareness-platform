
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Mock training data
const trainingModules = [
  { id: 1, name: 'Introduction to Phishing', completed: true, progress: 100 },
  { id: 2, name: 'Common Attack Vectors', completed: true, progress: 100 },
  { id: 3, name: 'Social Engineering Tactics', completed: false, progress: 60 },
  { id: 4, name: 'Advanced Phishing Defense', completed: false, progress: 0 },
];

const TrainingProgressCard = () => {
  // Calculate overall progress
  const totalModules = trainingModules.length;
  const completedModules = trainingModules.filter(module => module.completed).length;
  const overallProgress = Math.round((completedModules / totalModules) * 100);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-primary-600" />
          Training Progress
        </CardTitle>
        <CardDescription>Your security awareness journey</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Overall Completion</span>
            <span className="text-sm font-medium">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
        
        <div className="space-y-3 mt-4">
          {trainingModules.map(module => (
            <div key={module.id} className="flex items-center justify-between">
              <div className="flex items-start space-x-3">
                <div className={`mt-0.5 ${module.completed ? 'text-green-500' : 'text-gray-300'}`}>
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{module.name}</p>
                  <div className="w-full mt-1">
                    <Progress value={module.progress} className="h-1.5" />
                  </div>
                </div>
              </div>
              <Button 
                variant={module.completed ? "outline" : "default"} 
                size="sm"
                className="ml-2 whitespace-nowrap"
              >
                {module.completed ? 'Review' : module.progress > 0 ? 'Continue' : 'Start'}
              </Button>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4">
          View All Courses
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrainingProgressCard;
