import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuizCard, { Question } from '@/components/training/QuizCard';

interface AssessmentCardProps {
  title: string;
  description: string;
  questions?: Question[];
  onComplete?: (score: number) => void;
  quizCompleted?: boolean;
  isMultipleChoice?: boolean;
  questionCount?: number;
  timeLimit?: string;
  passingScore?: string;
}

const AssessmentCard = ({
  title,
  description,
  questions,
  onComplete,
  quizCompleted,
  isMultipleChoice = true,
  questionCount = 15,
  timeLimit = "20 minutes",
  passingScore = "80%"
}: AssessmentCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {questions && onComplete ? (
          <QuizCard 
            questions={questions}
            onComplete={onComplete}
          />
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              This assessment includes scenarios to test your response to various social engineering attempts.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Questions:</span>
                <span>{questionCount} {isMultipleChoice ? 'multiple choice' : 'scenarios'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Time limit:</span>
                <span>{timeLimit}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Passing score:</span>
                <span>{passingScore}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <BookOpen className="mr-2 h-4 w-4" />
          {questions && quizCompleted ? "Review Quiz" : questions ? "Start Quiz" : "Take Assessment"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssessmentCard;
