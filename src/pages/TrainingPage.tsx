
import { useState } from 'react';
import { BookOpen, CheckCircle, Clock, Play, Shield, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QuizCard from '@/components/training/QuizCard';

// Mock training course data
const trainingCourses = [
  {
    id: 1,
    title: 'Phishing Fundamentals',
    description: 'Learn to identify and avoid common phishing tactics',
    duration: '20 min',
    level: 'Beginner',
    progress: 100,
    completed: true,
    image: '🛡️',
    modules: [
      { id: 1, title: 'What is Phishing?', completed: true, duration: '5 min' },
      { id: 2, title: 'Common Phishing Techniques', completed: true, duration: '7 min' },
      { id: 3, title: 'How to Spot Fake Emails', completed: true, duration: '8 min' },
    ]
  },
  {
    id: 2,
    title: 'Social Engineering Awareness',
    description: 'Protect yourself against manipulation tactics',
    duration: '25 min',
    level: 'Intermediate',
    progress: 60,
    completed: false,
    image: '🔍',
    modules: [
      { id: 1, title: 'Introduction to Social Engineering', completed: true, duration: '6 min' },
      { id: 2, title: 'Psychological Manipulation Tactics', completed: true, duration: '8 min' },
      { id: 3, title: 'Real-world Social Engineering Examples', completed: false, duration: '11 min' },
    ]
  },
  {
    id: 3,
    title: 'Advanced Phishing Defense',
    description: 'Master the skills to protect against sophisticated attacks',
    duration: '40 min',
    level: 'Advanced',
    progress: 0,
    completed: false,
    image: '🔐',
    modules: [
      { id: 1, title: 'Spear Phishing Tactics', completed: false, duration: '10 min' },
      { id: 2, title: 'Business Email Compromise (BEC)', completed: false, duration: '12 min' },
      { id: 3, title: 'Multi-layered Defense Strategies', completed: false, duration: '18 min' },
    ]
  },
  {
    id: 4,
    title: 'Secure Password Practices',
    description: 'Create and manage strong, unique passwords',
    duration: '15 min',
    level: 'Beginner',
    progress: 0,
    completed: false,
    image: '🔑',
    modules: [
      { id: 1, title: 'Password Strength Fundamentals', completed: false, duration: '5 min' },
      { id: 2, title: 'Using Password Managers', completed: false, duration: '5 min' },
      { id: 3, title: 'Multi-Factor Authentication', completed: false, duration: '5 min' },
    ]
  },
];

// Mock quiz questions for the demo
const quizQuestions = [
  {
    id: 1,
    text: 'Which of the following is a common indicator of a phishing email?',
    options: [
      'The email comes from someone in your organization',
      'The sender\'s email address looks slightly different from the legitimate company',
      'The email has a proper company logo',
      'The email was received during business hours'
    ],
    correctIndex: 1,
    explanation: 'Phishers often use email addresses that look similar to legitimate ones but have subtle differences. Always check the exact email address of the sender.'
  },
  {
    id: 2,
    text: 'What should you do if you receive a suspicious email asking for sensitive information?',
    options: [
      'Reply asking for verification',
      'Call the sender using the phone number in the email',
      'Verify the request through an official channel (phone number from website)',
      'Forward it to all colleagues to alert them'
    ],
    correctIndex: 2,
    explanation: 'Never use contact information provided in the suspicious email. Instead, find official contact information from the company\'s website or your trusted records.'
  },
  {
    id: 3,
    text: 'Which of the following is NOT a sign of a phishing attempt?',
    options: [
      'Creating a false sense of urgency',
      'Poor grammar and spelling',
      'Personalized content with accurate information about you',
      'Requests for personal information'
    ],
    correctIndex: 2,
    explanation: 'While sophisticated phishing attempts may include personalized information, this by itself is not indicative of phishing. The other options are common warning signs.'
  }
];

const TrainingPage = () => {
  const [selectedCourse, setSelectedCourse] = useState<(typeof trainingCourses)[0] | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const filteredCourses = activeTab === 'all'
    ? trainingCourses
    : activeTab === 'completed'
      ? trainingCourses.filter(course => course.completed)
      : trainingCourses.filter(course => !course.completed);

  const handleQuizComplete = (score: number) => {
    console.log(`Quiz completed with score: ${score}%`);
    // In a real app, this would call an API to update the user's progress
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Training Center</h1>
        <p className="text-muted-foreground">
          Enhance your security knowledge with interactive courses and assessments
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Overall Completion</span>
                <span className="text-sm font-medium">40%</span>
              </div>
              <Progress value={40} className="h-2 mb-4" />
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary-50 flex items-center justify-center mr-3">
                    <CheckCircle className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Courses Completed</p>
                    <p className="text-lg font-bold">1/4</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-amber-50 flex items-center justify-center mr-3">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Learning Time</p>
                    <p className="text-lg font-bold">45 min</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Security Readiness Score</span>
                <span className="text-sm font-medium">65/100</span>
              </div>
              <Progress value={65} className="h-2 mb-4" />
              
              <div className="p-3 bg-green-50 text-green-700 text-sm rounded-md border border-green-200">
                <p className="font-medium">Great progress!</p>
                <p>Complete "Social Engineering Awareness" to boost your score by 15 points.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Listing */}
      <div>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="inprogress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <Dialog open={isQuizOpen} onOpenChange={setIsQuizOpen}>
              <DialogTrigger asChild>
                <Button>Take Security Quiz</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Security Awareness Quiz</DialogTitle>
                  <DialogDescription>
                    Test your knowledge on phishing and security awareness
                  </DialogDescription>
                </DialogHeader>
                <QuizCard questions={quizQuestions} onComplete={handleQuizComplete} />
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="all" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredCourses.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onSelect={() => setSelectedCourse(course)} 
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inprogress" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredCourses.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onSelect={() => setSelectedCourse(course)} 
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredCourses.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onSelect={() => setSelectedCourse(course)} 
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Course Detail Dialog */}
      <Dialog open={!!selectedCourse} onOpenChange={(open) => !open && setSelectedCourse(null)}>
        <DialogContent className="sm:max-w-2xl">
          {selectedCourse && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCourse.title}</DialogTitle>
                <DialogDescription>
                  {selectedCourse.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{selectedCourse.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-amber-500" />
                    <span className="text-sm">{selectedCourse.level}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{selectedCourse.modules.length} Modules</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Course Modules</h4>
                  <div className="space-y-3">
                    {selectedCourse.modules.map((module, index) => (
                      <div 
                        key={module.id}
                        className="flex items-start justify-between p-3 rounded-md border"
                      >
                        <div className="flex items-start">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary-50 text-primary-700 text-xs font-medium mr-3 mt-0.5">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{module.title}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{module.duration}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant={module.completed ? "outline" : "default"} 
                          size="sm"
                        >
                          {module.completed ? 'Review' : 'Start'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-2">
                <Button>
                  {selectedCourse.progress > 0 && selectedCourse.progress < 100
                    ? 'Continue Course'
                    : selectedCourse.progress === 100
                      ? 'Retake Course'
                      : 'Start Course'
                  }
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface CourseCardProps {
  course: (typeof trainingCourses)[0];
  onSelect: () => void;
}

const CourseCard = ({ course, onSelect }: CourseCardProps) => {
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="text-4xl">{course.image}</div>
          <Badge variant={course.completed ? "success" : course.progress > 0 ? "secondary" : "outline"}>
            {course.completed 
              ? 'Completed' 
              : course.progress > 0 
                ? 'In Progress' 
                : 'Not Started'}
          </Badge>
        </div>
        <CardTitle className="mt-2">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <Shield className="h-4 w-4 mr-1" />
            {course.level}
          </div>
        </div>
        
        <div className="mb-1 flex justify-between items-center">
          <span className="text-xs font-medium">Progress</span>
          <span className="text-xs font-medium">{course.progress}%</span>
        </div>
        <Progress value={course.progress} className="h-1" />
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full justify-between" 
          onClick={onSelect}
        >
          <div className="flex items-center">
            {course.completed ? (
              <>
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                <span>Review Course</span>
              </>
            ) : course.progress > 0 ? (
              <>
                <Play className="h-4 w-4 mr-1 text-primary-600" />
                <span>Continue</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-1 text-primary-600" />
                <span>Start Course</span>
              </>
            )}
          </div>
          <span>→</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrainingPage;
