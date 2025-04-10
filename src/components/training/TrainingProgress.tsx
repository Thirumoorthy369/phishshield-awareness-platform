
import { CheckCircle2, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Props interface
interface TrainingProgressProps {
  overallProgress: number;
  completedModules: number;
  totalModules: number;
  completedCertifications: number;
  totalCertifications: number;
}

const TrainingProgress = ({
  overallProgress,
  completedModules,
  totalModules,
  completedCertifications,
  totalCertifications
}: TrainingProgressProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Overall Progress</h3>
            <Progress value={overallProgress} className="h-2" />
            <p className="text-sm text-muted-foreground">{Math.round(overallProgress)}% Complete</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Completed Modules</h3>
            <div className="flex items-center mt-2">
              <CheckCircle2 className="h-8 w-8 text-green-500 mr-2" />
              <div>
                <p className="text-xl font-bold">{completedModules}/{totalModules}</p>
                <p className="text-sm text-muted-foreground">Modules finished</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Certifications</h3>
            <div className="flex items-center mt-2">
              <GraduationCap className="h-8 w-8 text-primary mr-2" />
              <div>
                <p className="text-xl font-bold">{completedCertifications}/{totalCertifications}</p>
                <p className="text-sm text-muted-foreground">Certifications earned</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingProgress;
