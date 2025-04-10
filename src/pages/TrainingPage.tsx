
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TrainingProgress from '@/components/training/TrainingProgress';
import TrainingModuleCard from '@/components/training/TrainingModuleCard';
import CertificationCard from '@/components/training/CertificationCard';
import AddCourseCard from '@/components/training/AddCourseCard';
import AssessmentCard from '@/components/training/AssessmentCard';
import { trainingModules, certifications, mockQuestions } from '@/components/training/data/trainingData';

const TrainingPage = () => {
  const [currentTab, setCurrentTab] = useState('courses');
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Calculate overall progress
  const overallProgress = trainingModules.reduce((acc, module) => acc + module.progress, 0) / trainingModules.length;
  
  // Count completed modules
  const completedModules = trainingModules.filter(module => module.completed).length;
  
  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true);
    console.log(`Quiz completed with score: ${score}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Training Center</h1>
        <p className="text-muted-foreground">
          Build your phishing awareness skills through interactive learning
        </p>
      </div>
      
      {/* Progress Summary */}
      <TrainingProgress 
        overallProgress={overallProgress}
        completedModules={completedModules}
        totalModules={trainingModules.length}
        completedCertifications={certifications.filter(cert => cert.completed).length}
        totalCertifications={certifications.length}
      />
      
      {/* Main Training Tabs */}
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
        </TabsList>
        
        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingModules.map(module => (
              <TrainingModuleCard key={module.id} module={module} />
            ))}
            <AddCourseCard />
          </div>
        </TabsContent>
        
        {/* Certifications Tab */}
        <TabsContent value="certifications" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map(certification => (
              <CertificationCard key={certification.id} certification={certification} />
            ))}
          </div>
        </TabsContent>
        
        {/* Assessments Tab */}
        <TabsContent value="assessments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AssessmentCard 
              title="Phishing Identification Quiz"
              description="Test your ability to spot phishing attempts"
              questions={mockQuestions}
              onComplete={handleQuizComplete}
              quizCompleted={quizCompleted}
            />
            
            <AssessmentCard 
              title="Social Engineering Assessment"
              description="Evaluate your knowledge of social engineering tactics"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingPage;
