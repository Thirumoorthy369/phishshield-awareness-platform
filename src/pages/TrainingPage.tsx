
import { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, CirclePlay, GraduationCap, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import QuizCard from '@/components/training/QuizCard';

// Mock quiz questions for QuizCard with updated structure to match the Question type
const mockQuestions = [
  {
    id: 1,
    text: "Which of the following is a sign of a phishing email?",
    options: [
      "Email from a known contact",
      "Urgent request for personal information",
      "Professional language and formatting",
      "Link to a company website"
    ],
    correctIndex: 1,
    explanation: "Phishing emails often contain urgent requests for personal information to create a sense of urgency that bypasses critical thinking."
  },
  {
    id: 2,
    text: "What should you do if you suspect an email is phishing?",
    options: [
      "Forward it to all colleagues as a warning",
      "Reply to ask if it's legitimate",
      "Report it to IT security",
      "Delete it immediately"
    ],
    correctIndex: 2,
    explanation: "You should always report suspicious emails to IT security so they can investigate and alert others if necessary."
  }
];

// Mock data for training modules
const trainingModules = [
  {
    id: 1,
    title: 'Phishing Fundamentals',
    description: 'Learn the basics of phishing and how to identify common attacks',
    progress: 100,
    completed: true,
    duration: '45 min',
    lessons: 5
  },
  {
    id: 2,
    title: 'Email Security Best Practices',
    description: 'Master the techniques to secure your email communications',
    progress: 60,
    completed: false,
    duration: '30 min',
    lessons: 4
  },
  {
    id: 3,
    title: 'Social Engineering Tactics',
    description: 'Understand the psychological tricks used in phishing attempts',
    progress: 25,
    completed: false,
    duration: '50 min',
    lessons: 6
  },
  {
    id: 4,
    title: 'Advanced Phishing Techniques',
    description: 'Learn about sophisticated phishing methods like spear phishing',
    progress: 0,
    completed: false,
    duration: '60 min',
    lessons: 7
  }
];

// Mock data for certifications
const certifications = [
  {
    id: 1,
    title: 'Phishing Awareness Certified',
    description: 'Basic certification for phishing awareness',
    completed: true,
    date: '2023-03-15',
    expiry: '2024-03-15',
    level: 'Basic'
  },
  {
    id: 2,
    title: 'Email Security Specialist',
    description: 'Intermediate certification for email security',
    completed: false,
    requirements: '3 courses + final assessment',
    level: 'Intermediate'
  },
  {
    id: 3,
    title: 'Security Awareness Champion',
    description: 'Advanced certification for security awareness leaders',
    completed: false,
    requirements: '5 courses + practical assessment',
    level: 'Advanced'
  }
];

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
                  <p className="text-xl font-bold">{completedModules}/{trainingModules.length}</p>
                  <p className="text-sm text-muted-foreground">Modules finished</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Certifications</h3>
              <div className="flex items-center mt-2">
                <GraduationCap className="h-8 w-8 text-primary mr-2" />
                <div>
                  <p className="text-xl font-bold">{certifications.filter(cert => cert.completed).length}/{certifications.length}</p>
                  <p className="text-sm text-muted-foreground">Certifications earned</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
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
            ))}
            
            {/* Add New Course Card */}
            <Card className="border-dashed">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Explore More Courses</CardTitle>
                <CardDescription>Discover additional security training content</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-32">
                <Button variant="ghost" className="h-20 w-20 rounded-full">
                  <PlusCircle className="h-10 w-10 text-muted-foreground" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Certifications Tab */}
        <TabsContent value="certifications" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map(cert => (
              <Card key={cert.id} className={cert.completed ? "border-green-200" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{cert.title}</CardTitle>
                    <Badge variant="outline" className={cert.completed ? "border-green-500 text-green-600" : ""}>
                      {cert.level}
                    </Badge>
                  </div>
                  <CardDescription>{cert.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {cert.completed ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Earned:</span>
                        <span>{new Date(cert.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Expires:</span>
                        <span>{new Date(cert.expiry).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      <p>Requirements:</p>
                      <p className="font-medium mt-1">{cert.requirements}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant={cert.completed ? "outline" : "default"} className="w-full">
                    {cert.completed ? 'View Certificate' : 'Start Certification Path'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Assessments Tab */}
        <TabsContent value="assessments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Phishing Identification Quiz</CardTitle>
                <CardDescription>Test your ability to spot phishing attempts</CardDescription>
              </CardHeader>
              <CardContent>
                <QuizCard 
                  questions={mockQuestions}
                  onComplete={handleQuizComplete}
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  {quizCompleted ? "Review Quiz" : "Start Quiz"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Social Engineering Assessment</CardTitle>
                <CardDescription>Evaluate your knowledge of social engineering tactics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  This assessment includes scenarios to test your response to various social engineering attempts.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Questions:</span>
                    <span>15 multiple choice</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time limit:</span>
                    <span>20 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Passing score:</span>
                    <span>80%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Take Assessment
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingPage;
