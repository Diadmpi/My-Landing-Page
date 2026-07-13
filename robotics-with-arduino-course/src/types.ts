export type PaymentStatus = 'none' | 'pending' | 'approved';
export type PaymentMethod = 'bkash' | 'nagad' | 'rocket';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'student' | 'admin';
  paymentStatus: PaymentStatus;
  txId?: string;
  paymentScreenshot?: string;
  paymentMethod?: PaymentMethod;
  paymentPhone?: string;
  completedLessons: string[]; // List of lesson IDs completed
  quizScores: Record<string, number>; // quizId (or moduleId) -> score %
  submittedAssignments: Record<string, {
    submissionText?: string;
    codeUrl?: string;
    tinkercadUrl?: string;
    date: string;
    graded: boolean;
    grade?: string; // e.g. "A+", "Pass", etc.
    feedback?: string;
  }>;
  registerDate: string;
  profilePic?: string;
  phone?: string;
  schoolCollege?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string; // YouTube embed URL or simulation URL
  pdfUrl: string;   // PDF link or simulation notes
  description: string;
  published?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz?: {
    id: string;
    questions: {
      id: string;
      question: string;
      options: string[];
      correctAnswer: number; // Index of options
    }[];
  };
  assignment?: {
    id: string;
    title: string;
    description: string;
    problemStatement: string;
  };
}

export interface Notification {
  id: string;
  userId: string; // "all" or specific user ID
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}
