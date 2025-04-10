
import { CheckCircle2, ChevronRight, CirclePlay } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export interface TrainingModule {
  id: number;
  title: string;
  description: string;
  progress: number;
  completed: boolean;
  duration: string;
  lessons: number;
}

interface TrainingModuleCardProps {
  module: TrainingModule;
}

const TrainingModuleCard = ({ module }: TrainingModuleCardProps) => {
  return (
    <Card key={module.id} className={module.completed ? "border-green-200" : ""}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{module.title}</CardTitle>
          {module.completed && (
            <Badge variant="outline" className="border-green-500 text-green-600">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
        <CardDescription>{module.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex justify-between text-sm mb-1">
          <span>{module.progress}% complete</span>
          <span>{module.lessons} lessons</span>
        </div>
        <Progress value={module.progress} className="h-2" />
        <div className="flex items-center text-xs text-muted-foreground mt-3">
          <CirclePlay className="h-3 w-3 mr-1" />
          <span>{module.duration}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant={module.progress > 0 ? "outline" : "default"} className="w-full">
          {module.progress > 0 && module.progress < 100 ? 'Continue' : 'Start'} Course
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrainingModuleCard;
