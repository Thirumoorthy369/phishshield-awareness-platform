
import { TrainingModule } from '../TrainingModuleCard';
import { Certification } from '../CertificationCard';
import { Question } from '../QuizCard';

// Mock data for training modules
export const trainingModules: TrainingModule[] = [
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
export const certifications: Certification[] = [
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

// Mock quiz questions for QuizCard with updated structure to match the Question type
export const mockQuestions: Question[] = [
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
