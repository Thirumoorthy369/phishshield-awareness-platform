
import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

// Export the Question interface so it can be imported by other components
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizCardProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

const QuizCard = ({ questions, onComplete }: QuizCardProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (index: number) => {
    if (!isAnswered) {
      setSelectedOption(index);
    }
  };

  const handleCheck = () => {
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setCorrectAnswers(prev => prev + 1);
      toast({
        title: "Correct!",
        description: "You selected the right answer.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "That's not the right answer.",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
      const finalScore = Math.round((correctAnswers / questions.length) * 100);
      onComplete(finalScore);
      toast({
        title: "Quiz Completed!",
        description: `Your score: ${finalScore}%`,
        variant: "default",
      });
    }
  };

  const handleReview = () => {
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    toast({
      title: "Reviewing Quiz",
      description: "Take your time to review the answers",
      variant: "default",
    });
  };

  const handleBackToTraining = () => {
    // This would typically navigate back to the training page
    // For now we'll just reset the quiz
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectAnswers(0);
    toast({
      title: "Back to Training",
      description: "Returning to training modules",
      variant: "default",
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      {!quizCompleted ? (
        <>
          <CardHeader>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <CardTitle>Security Quiz</CardTitle>
                <span className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              <CardDescription className="pt-1">
                {currentQuestion.text}
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent>
            <RadioGroup className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-3 rounded-md border ${
                    isAnswered 
                      ? index === currentQuestion.correctIndex
                        ? 'border-green-500 bg-green-50'
                        : selectedOption === index
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200'
                      : selectedOption === index
                        ? 'border-primary-300 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                  } cursor-pointer transition-all`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    checked={selectedOption === index}
                    disabled={isAnswered}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-grow cursor-pointer"
                  >
                    {option}
                  </Label>
                  
                  {isAnswered && (
                    index === currentQuestion.correctIndex ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : selectedOption === index ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : null
                  )}
                </div>
              ))}
            </RadioGroup>
            
            {isAnswered && (
              <div className="mt-4 p-3 rounded-md bg-blue-50 text-blue-800 text-sm">
                <p className="font-medium">Explanation:</p>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {!isAnswered ? (
              <Button 
                onClick={handleCheck} 
                disabled={selectedOption === null}
                className="w-full"
              >
                Check Answer
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                className="w-full"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            )}
          </CardFooter>
        </>
      ) : (
        <CardContent className="p-6 text-center">
          <div className="my-8">
            <h3 className="text-2xl font-bold">Quiz Completed!</h3>
            <p className="text-gray-500 mt-2">
              You got {correctAnswers} out of {questions.length} questions correct.
            </p>
            
            <div className="mt-6">
              <div className="relative h-24 w-24 mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{Math.round((correctAnswers / questions.length) * 100)}%</span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                    strokeDasharray="100, 100"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="3"
                    strokeDasharray={`${(correctAnswers / questions.length) * 100}, 100`}
                  />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button className="mx-2" onClick={handleReview}>Review Answers</Button>
            <Button variant="outline" className="mx-2" onClick={handleBackToTraining}>Back to Training</Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default QuizCard;
