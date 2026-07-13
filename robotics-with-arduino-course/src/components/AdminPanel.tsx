import React, { useState, useEffect } from 'react';
import { 
  Users, CheckCircle, XCircle, FileText, Bell, Plus, Trash2, Edit2, 
  Eye, RefreshCw, Clipboard, ShieldAlert, Award, ArrowUpRight,
  LayoutDashboard, BookOpen, Video, HelpCircle, Layers, Check, Tv, Youtube
} from 'lucide-react';
import { User, CourseModule, Notification, PaymentStatus, PaymentMethod } from '../types';

interface AdminPanelProps {
  allUsers: User[];
  modules: CourseModule[];
  onUpdateUser: (updatedUser: User) => void;
  onUpdateModules: (updatedModules: CourseModule[]) => void;
  onAddNotification: (title: string, message: string, userId: string) => void;
}

export default function AdminPanel({
  allUsers,
  modules,
  onUpdateUser,
  onUpdateModules,
  onAddNotification
}: AdminPanelProps) {
  const [adminTab, setAdminTab] = useState<'dashboard' | 'students' | 'payments' | 'grading' | 'curriculum' | 'notices'>('dashboard');
  
  // Notice Broadcaster State
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeMsg, setNoticeMsg] = useState('');
  const [targetStudent, setTargetStudent] = useState('all');

  // Curriculum Editor State (Nested Sub-tabs)
  const [currSubTab, setCurrSubTab] = useState<'modules' | 'lessons' | 'quizzes' | 'assignments'>('lessons');
  
  // Module operations state
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleDesc, setNewModuleDesc] = useState('');
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editModuleTitle, setEditModuleTitle] = useState('');
  const [editModuleDesc, setEditModuleDesc] = useState('');

  // Class / Lesson operations state
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDuration, setNewLessonDuration] = useState('15 mins');
  const [newLessonVideo, setNewLessonVideo] = useState('');
  const [newLessonPdf, setNewLessonPdf] = useState('');
  const [newLessonDesc, setNewLessonDesc] = useState('');
  const [newLessonPublished, setNewLessonPublished] = useState(true);

  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editLessonTitle, setEditLessonTitle] = useState('');
  const [editLessonDuration, setEditLessonDuration] = useState('');
  const [editLessonVideo, setEditLessonVideo] = useState('');
  const [editLessonPdf, setEditLessonPdf] = useState('');
  const [editLessonDesc, setEditLessonDesc] = useState('');
  const [editLessonPublished, setEditLessonPublished] = useState(true);
  const [editLessonModuleId, setEditLessonModuleId] = useState('');

  // Quiz operations state
  const [selectedQuizModuleId, setSelectedQuizModuleId] = useState('');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionOpt1, setNewQuestionOpt1] = useState('');
  const [newQuestionOpt2, setNewQuestionOpt2] = useState('');
  const [newQuestionOpt3, setNewQuestionOpt3] = useState('');
  const [newQuestionOpt4, setNewQuestionOpt4] = useState('');
  const [newQuestionCorrect, setNewQuestionCorrect] = useState(0);

  // Assignment operations state
  const [selectedAssignModuleId, setSelectedAssignModuleId] = useState('');
  const [assignTitle, setAssignTitle] = useState('');
  const [assignDesc, setAssignDesc] = useState('');
  const [assignProblem, setAssignProblem] = useState('');

  // Initialize selected modules
  useEffect(() => {
    if (modules.length > 0) {
      if (!selectedModuleId) setSelectedModuleId(modules[0].id);
      if (!selectedQuizModuleId) setSelectedQuizModuleId(modules[0].id);
      if (!selectedAssignModuleId) setSelectedAssignModuleId(modules[0].id);
    }
  }, [modules]);

  // Sync assignment fields when active assignment module changes
  useEffect(() => {
    const activeMod = modules.find(m => m.id === selectedAssignModuleId);
    if (activeMod && activeMod.assignment) {
      setAssignTitle(activeMod.assignment.title);
      setAssignDesc(activeMod.assignment.description);
      setAssignProblem(activeMod.assignment.problemStatement);
    } else {
      setAssignTitle('');
      setAssignDesc('');
      setAssignProblem('');
    }
  }, [selectedAssignModuleId, modules]);

  // YouTube Link Smart Formatting Helper
  const getYouTubeEmbedUrl = (url: string): string => {
    if (!url) return '';
    if (url.includes('/embed/')) return url;
    
    let videoId = '';
    try {
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split(/[?#]/)[0];
      } else if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(new URL(url).search);
        videoId = urlParams.get('v') || '';
      } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('youtube.com/embed/')[1]?.split(/[?#]/)[0];
      } else if (url.includes('youtube.com/v/')) {
        videoId = url.split('youtube.com/v/')[1]?.split(/[?#]/)[0];
      }
    } catch (e) {
      console.error(e);
    }
    
    if (!videoId) {
      const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
      if (match) videoId = match[1];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  // Grading State
  const [selectedStudentForGrading, setSelectedStudentForGrading] = useState<User | null>(null);
  const [selectedModuleForGrading, setSelectedModuleForGrading] = useState<string>('');
  const [assignmentGrade, setAssignmentGrade] = useState('A+');
  const [assignmentFeedback, setAssignmentFeedback] = useState('');

  // Payment Screenshot Viewer State
  const [viewScreenshotUrl, setViewScreenshotUrl] = useState<string | null>(null);

  // Approve / Reject payment logic
  const handleVerifyPayment = (user: User, action: 'approved' | 'none') => {
    const updatedUser: User = {
      ...user,
      paymentStatus: action,
      txId: action === 'approved' ? user.txId : undefined,
      paymentScreenshot: action === 'approved' ? user.paymentScreenshot : undefined
    };
    onUpdateUser(updatedUser);

    if (action === 'approved') {
      onAddNotification(
        'কোর্সটি আনলক হয়েছে!',
        'অভিনন্দন! আপনার পেমেন্ট সফলভাবে ভেরিফাই করা হয়েছে। সব মডিউল ভিডিও এবং স্টাডি মেটেরিয়াল এখন আনলকড।',
        user.id
      );
    } else {
      onAddNotification(
        'পেমেন্ট প্রত্যাখ্যাত হয়েছে!',
        'দুঃখিত, আপনার সাবমিট করা পেমেন্ট তথ্য সঠিক নয়। অনুগ্রহ করে পুনরায় সঠিক ট্রানজেকশন আইডি দিয়ে পেমেন্ট করুন।',
        user.id
      );
    }
  };

  // Grade Assignment
  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForGrading || !selectedModuleForGrading) return;

    const student = selectedStudentForGrading;
    const submission = student.submittedAssignments[selectedModuleForGrading];
    if (!submission) return;

    const updatedSubmissions = {
      ...student.submittedAssignments,
      [selectedModuleForGrading]: {
        ...submission,
        graded: true,
        grade: assignmentGrade,
        feedback: assignmentFeedback
      }
    };

    const updatedUser = {
      ...student,
      submittedAssignments: updatedSubmissions
    };

    onUpdateUser(updatedUser);
    onAddNotification(
      'অ্যাসাইনমেন্ট গ্রেডিং সম্পন্ন!',
      `আপনার ${modules.find(m => m.id === selectedModuleForGrading)?.assignment?.title} এর রেজাল্ট প্রকাশিত হয়েছে। প্রাপ্ত গ্রেড: ${assignmentGrade}`,
      student.id
    );

    setSelectedStudentForGrading(null);
    setAssignmentFeedback('');
    alert('গ্রেডিং এবং ফিডব্যাক সফলভাবে জমার দেওয়া হয়েছে!');
  };

  // Send announcement/notice
  const handleSendNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle || !noticeMsg) return;

    onAddNotification(noticeTitle, noticeMsg, targetStudent);
    setNoticeTitle('');
    setNoticeMsg('');
    alert('ঘোষণাটি সফলভাবে পাবলিশ করা হয়েছে!');
  };

  // 1. MODULE OPERATIONS HANDLERS
  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleTitle || !newModuleDesc) {
      alert('সবগুলো ঘর পূরণ করুন।');
      return;
    }
    const newModule: CourseModule = {
      id: 'mod_' + Date.now(),
      title: newModuleTitle,
      description: newModuleDesc,
      lessons: []
    };
    onUpdateModules([...modules, newModule]);
    setNewModuleTitle('');
    setNewModuleDesc('');
    alert('নতুন মডিউল সফলভাবে তৈরি করা হয়েছে!');
  };

  const handleEditModuleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingModuleId || !editModuleTitle || !editModuleDesc) return;
    const updated = modules.map(m => {
      if (m.id === editingModuleId) {
        return {
          ...m,
          title: editModuleTitle,
          description: editModuleDesc
        };
      }
      return m;
    });
    onUpdateModules(updated);
    setEditingModuleId(null);
    alert('মডিউলের তথ্য আপডেট করা হয়েছে!');
  };

  const handleDeleteModule = (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই মডিউলটি এবং এর ভিতরের সব ক্লাস ডিলিট করতে চান?')) return;
    onUpdateModules(modules.filter(m => m.id !== id));
  };

  // 2. CLASS LESSON OPERATIONS HANDLERS
  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle || !newLessonVideo) {
      alert('অবশ্যই ক্লাসের টাইটেল এবং ভিডিও লিংক দিতে হবে।');
      return;
    }
    
    const formattedVideo = getYouTubeEmbedUrl(newLessonVideo);
    const targetMod = selectedModuleId || (modules[0] ? modules[0].id : '');
    
    if (!targetMod) {
      alert('কোনো মডিউল পাওয়া যায়নি! আগে একটি মডিউল তৈরি করুন।');
      return;
    }

    const updatedModules = modules.map(m => {
      if (m.id === targetMod) {
        const newLesson = {
          id: 'les_' + Date.now(),
          title: newLessonTitle,
          duration: newLessonDuration || '15 mins',
          videoUrl: formattedVideo,
          pdfUrl: newLessonPdf || 'https://docs.arduino.cc',
          description: newLessonDesc || '',
          published: newLessonPublished
        };
        return {
          ...m,
          lessons: [...m.lessons, newLesson]
        };
      }
      return m;
    });
    
    onUpdateModules(updatedModules);
    setNewLessonTitle('');
    setNewLessonDuration('15 mins');
    setNewLessonVideo('');
    setNewLessonPdf('');
    setNewLessonDesc('');
    setNewLessonPublished(true);
    alert('নতুন ক্লাস সফলভাবে যুক্ত করা হয়েছে!');
  };

  const handleEditLessonLoad = (moduleId: string, lesson: any) => {
    setEditingLessonId(lesson.id);
    setEditLessonModuleId(moduleId);
    setEditLessonTitle(lesson.title);
    setEditLessonDuration(lesson.duration);
    setEditLessonVideo(lesson.videoUrl);
    setEditLessonPdf(lesson.pdfUrl);
    setEditLessonDesc(lesson.description);
    setEditLessonPublished(lesson.published !== false);
  };

  const handleEditLessonSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLessonId || !editLessonTitle || !editLessonVideo) return;
    
    const formattedVideo = getYouTubeEmbedUrl(editLessonVideo);
    let targetLessonObj: any = null;
    
    // Remove from existing module first
    let updated = modules.map(m => {
      const foundLesson = m.lessons.find(l => l.id === editingLessonId);
      if (foundLesson) {
        targetLessonObj = {
          ...foundLesson,
          title: editLessonTitle,
          duration: editLessonDuration || '15 mins',
          videoUrl: formattedVideo,
          pdfUrl: editLessonPdf || 'https://docs.arduino.cc',
          description: editLessonDesc || '',
          published: editLessonPublished
        };
        return {
          ...m,
          lessons: m.lessons.filter(l => l.id !== editingLessonId)
        };
      }
      return m;
    });
    
    // Now add to the destination module
    updated = updated.map(m => {
      if (m.id === editLessonModuleId) {
        return {
          ...m,
          lessons: [...m.lessons, targetLessonObj]
        };
      }
      return m;
    });
    
    onUpdateModules(updated);
    setEditingLessonId(null);
    alert('ক্লাসের তথ্য আপডেট করা হয়েছে!');
  };

  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই ক্লাসটি ডিলিট করতে চান?')) return;
    const updatedModules = modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.filter(l => l.id !== lessonId)
        };
      }
      return m;
    });
    onUpdateModules(updatedModules);
  };

  const handleToggleLessonPublish = (moduleId: string, lessonId: string) => {
    const updated = modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.map(l => {
            if (l.id === lessonId) {
              return { ...l, published: l.published === false ? true : false };
            }
            return l;
          })
        };
      }
      return m;
    });
    onUpdateModules(updated);
  };

  // 3. QUIZ OPERATIONS HANDLERS
  const handleCreateEmptyQuiz = (moduleId: string) => {
    const updated = modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          quiz: {
            id: 'quiz_' + Date.now(),
            questions: []
          }
        };
      }
      return m;
    });
    onUpdateModules(updated);
    alert('নতুন কুইজ সেশন তৈরি করা হয়েছে! এখন প্রশ্ন যোগ করতে পারবেন।');
  };

  const handleAddQuizQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText || !newQuestionOpt1 || !newQuestionOpt2) {
      alert('প্রশ্ন এবং অন্তত ২টি অপশন দিতে হবে।');
      return;
    }
    
    const targetQuizMod = selectedQuizModuleId || (modules[0] ? modules[0].id : '');
    if (!targetQuizMod) {
      alert('আগে একটি মডিউল তৈরি করুন।');
      return;
    }

    const updated = modules.map(m => {
      if (m.id === targetQuizMod) {
        const quizObj = m.quiz || { id: 'quiz_' + Date.now(), questions: [] };
        const newQuestion = {
          id: 'q_' + Date.now(),
          question: newQuestionText,
          options: [newQuestionOpt1, newQuestionOpt2, newQuestionOpt3 || '', newQuestionOpt4 || ''].filter(Boolean),
          correctAnswer: Number(newQuestionCorrect)
        };
        
        return {
          ...m,
          quiz: {
            ...quizObj,
            questions: [...quizObj.questions, newQuestion]
          }
        };
      }
      return m;
    });
    
    onUpdateModules(updated);
    setNewQuestionText('');
    setNewQuestionOpt1('');
    setNewQuestionOpt2('');
    setNewQuestionOpt3('');
    setNewQuestionOpt4('');
    setNewQuestionCorrect(0);
    alert('কুইজে নতুন প্রশ্ন যুক্ত করা হয়েছে!');
  };

  const handleDeleteQuizQuestion = (moduleId: string, questionId: string) => {
    if (!window.confirm('প্রশ্নটি ডিলিট করতে চান?')) return;
    const updated = modules.map(m => {
      if (m.id === moduleId && m.quiz) {
        return {
          ...m,
          quiz: {
            ...m.quiz,
            questions: m.quiz.questions.filter(q => q.id !== questionId)
          }
        };
      }
      return m;
    });
    onUpdateModules(updated);
  };

  // 4. ASSIGNMENT OPERATIONS HANDLERS
  const handleSaveAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const targetAssignMod = selectedAssignModuleId || (modules[0] ? modules[0].id : '');
    if (!targetAssignMod) {
      alert('আগে একটি মডিউল তৈরি করুন।');
      return;
    }

    if (!assignTitle || !assignProblem) {
      alert('অ্যাসাইনমেন্টের টাইটেল ও বিবরণ অবশ্যই দিতে হবে।');
      return;
    }
    
    const updated = modules.map(m => {
      if (m.id === targetAssignMod) {
        return {
          ...m,
          assignment: {
            id: m.assignment?.id || 'assign_' + Date.now(),
            title: assignTitle,
            description: assignDesc || assignTitle,
            problemStatement: assignProblem
          }
        };
      }
      return m;
    });
    onUpdateModules(updated);
    alert('মডিউলের অ্যাসাইনমেন্ট সংরক্ষণ করা হয়েছে!');
  };

  const handleDeleteAssignment = (moduleId: string) => {
    if (!window.confirm('অ্যাসাইনমেন্টটি ডিলিট করতে চান?')) return;
    const updated = modules.map(m => {
      if (m.id === moduleId) {
        const copy = { ...m };
        delete copy.assignment;
        return copy;
      }
      return m;
    });
    onUpdateModules(updated);
    alert('অ্যাসাইনমেন্ট মুছে ফেলা হয়েছে!');
  };

  // Filter students with pending payments
  const pendingStudents = allUsers.filter(u => u.paymentStatus === 'pending');

  // Filter students who submitted assignments
  const submittedStudents = allUsers.filter(u => 
    Object.values(u.submittedAssignments).some(sub => !sub.graded)
  );

  return (
    <div className="min-h-screen bg-[#0b0f19] pt-6 pb-12 text-left" id="admin-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Dashboard header */}
        <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-sans">Zeron Admin Panel</h2>
              <p className="text-xs text-slate-400 mt-1">কোর্স ম্যানেজমেন্ট, পেমেন্ট অনুমোদন এবং স্টুডেন্ট ডাটা পরিচালনা করুন।</p>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-slate-950/80 p-3.5 rounded-xl border border-slate-900 text-center font-mono text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Students</span>
              <span className="text-sm font-bold text-teal-400">{allUsers.filter(u => u.role === 'student').length}</span>
            </div>
            <div className="border-l border-slate-900 pl-4">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Pending Payment</span>
              <span className="text-sm font-bold text-amber-400">{pendingStudents.length}</span>
            </div>
            <div className="border-l border-slate-900 pl-4">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Grading Queue</span>
              <span className="text-sm font-bold text-blue-400">{submittedStudents.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            <button
              onClick={() => setAdminTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                adminTab === 'dashboard'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10 font-bold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>এডমিন ড্যাশবোর্ড</span>
            </button>

            <button
              onClick={() => setAdminTab('payments')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                adminTab === 'payments'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10 font-bold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5" />
                <span>পেমেন্ট ভেরিফিকেশন</span>
              </div>
              {pendingStudents.length > 0 && (
                <span className="bg-red-500 text-white font-mono text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center animate-pulse shrink-0">
                  {pendingStudents.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setAdminTab('students')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                adminTab === 'students'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10 font-bold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Users className="h-5 w-5" />
              <span>স্টুডেন্ট ডাটাবেজ</span>
            </button>

            <button
              onClick={() => setAdminTab('grading')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                adminTab === 'grading'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10 font-bold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Clipboard className="h-5 w-5" />
                <span>অ্যাসাইনমেন্ট মূল্যায়ন</span>
              </div>
              {submittedStudents.length > 0 && (
                <span className="bg-blue-500 text-white font-mono text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shrink-0">
                  {submittedStudents.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setAdminTab('curriculum')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                adminTab === 'curriculum'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10 font-bold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Plus className="h-5 w-5" />
              <span>ক্লাস মডিউল এডিটর</span>
            </button>

            <button
              onClick={() => setAdminTab('notices')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                adminTab === 'notices'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10 font-bold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Bell className="h-5 w-5" />
              <span>নোটিশ ও নোটিফিকেশন</span>
            </button>
          </div>

          {/* Main Panel content */}
          <div className="lg:col-span-9 bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 sm:p-8">
            
            {/* 0. ADMIN DASHBOARD */}
            {adminTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">এডমিন প্যানেল ড্যাশবোর্ড (Dashboard)</h3>
                  <p className="text-xs text-slate-400 mt-1">কোর্সের স্ট্যাটাস, শিক্ষার্থী সংখ্যা, পেমেন্ট ও অ্যাসাইনমেন্টের এক নজরে স্ট্যাটিসটিক্স।</p>
                </div>

                {/* Dashboard Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">মোট শিক্ষার্থী</span>
                    <span className="text-2xl font-bold text-white font-mono mt-1 block">
                      {allUsers.filter(u => u.role === 'student').length} জন
                    </span>
                  </div>
                  <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">পেমেন্ট পেন্ডিং</span>
                    <span className="text-2xl font-bold text-amber-500 font-mono mt-1 block">
                      {pendingStudents.length} জন
                    </span>
                  </div>
                  <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">মোট মডিউল</span>
                    <span className="text-2xl font-bold text-teal-400 font-mono mt-1 block">
                      {modules.length} টি
                    </span>
                  </div>
                  <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">মোট ক্লাস/লেকচার</span>
                    <span className="text-2xl font-bold text-blue-400 font-mono mt-1 block">
                      {modules.reduce((sum, m) => sum + m.lessons.length, 0)} টি
                    </span>
                  </div>
                  <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">পাবলিশড ক্লাস</span>
                    <span className="text-2xl font-bold text-emerald-400 font-mono mt-1 block">
                      {modules.reduce((sum, m) => sum + m.lessons.filter(l => l.published !== false).length, 0)} টি
                    </span>
                  </div>
                  <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">ড্রাফট/আনপাবলিশড</span>
                    <span className="text-2xl font-bold text-rose-400 font-mono mt-1 block">
                      {modules.reduce((sum, m) => sum + m.lessons.filter(l => l.published === false).length, 0)} টি
                    </span>
                  </div>
                  <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">মূল্যায়ন পেন্ডিং</span>
                    <span className="text-2xl font-bold text-cyan-400 font-mono mt-1 block">
                      {submittedStudents.length} টি
                    </span>
                  </div>
                  <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">মোট নোটিশ</span>
                    <span className="text-2xl font-bold text-indigo-400 font-mono mt-1 block">
                      {allUsers.reduce((sum, u) => sum + (u.completedLessons.length ? 1 : 0), 0)} টি
                    </span>
                  </div>
                </div>

                {/* Quick actions/Recent Activity columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">পেন্ডিং পেমেন্ট রিকোয়েস্ট</h4>
                    {pendingStudents.length === 0 ? (
                      <p className="text-xs text-slate-500 py-4">বর্তমানে কোনো পেন্ডিং পেমেন্ট রিকোয়েস্ট নেই।</p>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {pendingStudents.map(s => (
                          <div key={s.id} className="p-2.5 bg-slate-900/60 rounded-lg flex items-center justify-between text-xs">
                            <div>
                              <p className="font-semibold text-slate-200">{s.name}</p>
                              <p className="text-[10px] text-slate-500 font-mono">{s.email}</p>
                            </div>
                            <button
                              onClick={() => setAdminTab('payments')}
                              className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded font-semibold text-[10px] transition-all cursor-pointer"
                            >
                              যাচাই করুন
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">পেন্ডিং অ্যাসাইনমেন্ট সাবমিশন</h4>
                    {submittedStudents.length === 0 ? (
                      <p className="text-xs text-slate-500 py-4">মূল্যায়নের জন্য কোনো অ্যাসাইনমেন্ট বাকি নেই।</p>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {submittedStudents.map(s => (
                          <div key={s.id} className="p-2.5 bg-slate-900/60 rounded-lg flex items-center justify-between text-xs">
                            <div>
                              <p className="font-semibold text-slate-200">{s.name}</p>
                              <p className="text-[10px] text-slate-500 font-mono">{s.email}</p>
                            </div>
                            <button
                              onClick={() => setAdminTab('grading')}
                              className="px-2.5 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded font-semibold text-[10px] transition-all cursor-pointer"
                            >
                              মূল্যায়ন করুন
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 1. PAYMENTS VERIFICATION */}
            {adminTab === 'payments' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">পেমেন্ট রিকোয়েস্ট ভেরিফিকেশন</h3>
                  <p className="text-xs text-slate-400 mt-1">শিক্ষার্থীদের আপলোড করা স্ক্রিনশট ও ট্রানজেকশন আইডি চেক করে অ্যাক্সেস অনুমোদন করুন।</p>
                </div>

                {pendingStudents.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 bg-slate-950/40 rounded-xl border border-slate-900">
                    <CheckCircle className="h-8 w-8 text-slate-700 mx-auto mb-2" />
                    <p className="text-xs">কোনো পেমেন্ট ভেরিফিকেশন অপেক্ষমান নেই!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="text-[10px] bg-slate-950 uppercase text-slate-500 font-mono border-b border-slate-800">
                        <tr>
                          <th className="px-4 py-3">Student info</th>
                          <th className="px-4 py-3">Method</th>
                          <th className="px-4 py-3">Sender Phone</th>
                          <th className="px-4 py-3">Transaction ID</th>
                          <th className="px-4 py-3 text-center">Receipt</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {pendingStudents.map((student) => (
                          <tr key={student.id} className="hover:bg-slate-900/30">
                            <td className="px-4 py-3.5">
                              <p className="font-semibold text-slate-200">{student.name}</p>
                              <p className="text-[10px] text-slate-500 font-mono mt-0.5">{student.email}</p>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="px-2 py-0.5 bg-pink-500/10 text-pink-400 text-[10px] font-bold rounded uppercase font-mono">
                                {student.paymentMethod}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 font-mono">{student.paymentPhone || 'N/A'}</td>
                            <td className="px-4 py-3.5 font-mono text-teal-400 font-bold">{student.txId}</td>
                            <td className="px-4 py-3.5 text-center">
                              {student.paymentScreenshot && (
                                <button
                                  onClick={() => setViewScreenshotUrl(student.paymentScreenshot || null)}
                                  className="text-[10px] text-teal-400 hover:underline inline-flex items-center gap-1 font-semibold"
                                >
                                  <Eye className="h-3 w-3" /> View
                                </button>
                              )}
                            </td>
                            <td className="px-4 py-3.5 text-right space-x-2">
                              <button
                                onClick={() => handleVerifyPayment(student, 'none')}
                                className="px-2 py-1 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded text-[10px] font-semibold transition-all"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() => handleVerifyPayment(student, 'approved')}
                                className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 rounded text-[10px] font-semibold transition-all"
                              >
                                Approve
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Screenshot Modal Viewer */}
                {viewScreenshotUrl && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
                    <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-4">
                      <button
                        onClick={() => setViewScreenshotUrl(null)}
                        className="absolute top-3 right-3 text-white bg-slate-950 p-1.5 rounded-full hover:bg-slate-800"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                      <h4 className="text-xs text-slate-400 font-bold mb-3 font-mono">PAYMENT PROOF PREVIEW</h4>
                      <div className="max-h-[70vh] overflow-y-auto rounded-lg">
                        <img src={viewScreenshotUrl} alt="Receipt" className="w-full object-contain" />
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* 2. STUDENTS DATABASE */}
            {adminTab === 'students' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">স্টুডেন্ট তালিকা ও ডাটাবেজ</h3>
                  <p className="text-xs text-slate-400 mt-1">একাডেমির সকল রেজিস্টার্ড শিক্ষার্থী এবং তাদের অ্যাক্টিভিটি চেক করুন।</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="text-[10px] bg-slate-950 uppercase text-slate-500 font-mono border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3">Student Name</th>
                        <th className="px-4 py-3">Contacts</th>
                        <th className="px-4 py-3">Course Access</th>
                        <th className="px-4 py-3">Progress (Labs)</th>
                        <th className="px-4 py-3">Quizzes Passed</th>
                        <th className="px-4 py-3 text-right">Registered</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {allUsers.filter(u => u.role === 'student').map((student) => {
                        const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
                        const completedCount = student.completedLessons.length;
                        const hasAccess = student.paymentStatus === 'approved';

                        return (
                          <tr key={student.id} className="hover:bg-slate-900/30">
                            <td className="px-4 py-3.5">
                              <p className="font-semibold text-slate-200">{student.name}</p>
                              <p className="text-[10px] text-slate-500 mt-0.5">{student.schoolCollege || 'No Institution'}</p>
                            </td>
                            <td className="px-4 py-3.5">
                              <p className="font-mono">{student.phone || 'N/A'}</p>
                              <p className="text-[10px] text-slate-500 font-mono">{student.email}</p>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                hasAccess 
                                  ? 'bg-emerald-500/10 text-emerald-400' 
                                  : student.paymentStatus === 'pending'
                                  ? 'bg-amber-500/10 text-amber-400'
                                  : 'bg-slate-800 text-slate-400'
                              }`}>
                                {hasAccess ? 'UNLOCKED' : student.paymentStatus === 'pending' ? 'PENDING' : 'LOCKED'}
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                  <div 
                                    className="bg-teal-500 h-full" 
                                    style={{ width: `${(completedCount / (totalLessons || 1)) * 100}%` }}
                                  />
                                </div>
                                <span className="font-mono text-[10px] font-bold text-slate-400">
                                  {completedCount}/{totalLessons}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5 font-mono text-blue-400 font-bold">
                              {Object.keys(student.quizScores).length} Passed
                            </td>
                            <td className="px-4 py-3.5 text-right text-[10px] font-mono text-slate-500">
                              {student.registerDate}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. ASSIGNMENTS EVALUATIONS */}
            {adminTab === 'grading' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">অ্যাসাইনমেন্ট ও কোড মূল্যায়ন</h3>
                  <p className="text-xs text-slate-400 mt-1">শিক্ষার্থীদের জমা দেওয়া কোড এবং Tinkercad লিংক চেক করে ফিডব্যাক ও গ্রেড প্রদান করুন।</p>
                </div>

                {!selectedStudentForGrading ? (
                  // Queue list
                  <div className="space-y-4">
                    {allUsers.filter(u => Object.keys(u.submittedAssignments).length > 0).map((st) => (
                      <div key={st.id} className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                          <div>
                            <span className="font-bold text-white text-xs">{st.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono ml-2">UID: {st.id}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {Object.entries(st.submittedAssignments).map(([modId, data]) => {
                            const mod = modules.find(m => m.id === modId);
                            return (
                              <div key={modId} className="flex justify-between items-center text-xs">
                                <div>
                                  <p className="text-slate-300 font-semibold">{mod?.assignment?.title}</p>
                                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">Submitted: {data.date}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono ${
                                    data.graded ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                  }`}>
                                    {data.graded ? `Graded: ${data.grade}` : 'Needs grading'}
                                  </span>
                                  <button
                                    onClick={() => {
                                      setSelectedStudentForGrading(st);
                                      setSelectedModuleForGrading(modId);
                                      setAssignmentGrade(data.grade || 'A+');
                                      setAssignmentFeedback(data.feedback || '');
                                    }}
                                    className="px-2.5 py-1 bg-[#00979c] hover:bg-[#005f63] text-slate-950 font-bold text-[10px] rounded"
                                  >
                                    Grade Now
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    {allUsers.every(u => Object.keys(u.submittedAssignments).length === 0) && (
                      <p className="text-xs text-slate-500 text-center py-6">কোনো স্টুডেন্ট এখনও অ্যাসাইনমেন্ট জমা দেয়নি।</p>
                    )}
                  </div>
                ) : (
                  // Evaluator detail screen
                  <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl text-left">
                    <div className="flex justify-between border-b border-slate-800 pb-3 mb-4">
                      <div>
                        <h4 className="font-bold text-white text-sm">{selectedStudentForGrading.name} এর অ্যাসাইনমেন্ট</h4>
                        <p className="text-xs text-slate-400 font-mono mt-1">Course Assignment Checker</p>
                      </div>
                      <button
                        onClick={() => setSelectedStudentForGrading(null)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        ফিরে যান
                      </button>
                    </div>

                    <div className="space-y-4">
                      {/* Submission text or links */}
                      <div className="p-4 bg-slate-900 border border-slate-850 rounded-xl space-y-3">
                        <h5 className="text-xs font-bold text-teal-400">স্টুডেন্ট সাবমিশন ডাটা:</h5>
                        {selectedStudentForGrading.submittedAssignments[selectedModuleForGrading]?.submissionText && (
                          <div>
                            <p className="text-[10px] text-slate-500 font-mono">C++ SOURCE CODE:</p>
                            <pre className="text-[11px] font-mono bg-slate-950 p-3 rounded-lg border border-slate-900 overflow-x-auto text-slate-300 mt-1 max-h-40">
                              {selectedStudentForGrading.submittedAssignments[selectedModuleForGrading]?.submissionText}
                            </pre>
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                          {selectedStudentForGrading.submittedAssignments[selectedModuleForGrading]?.tinkercadUrl && (
                            <a
                              href={selectedStudentForGrading.submittedAssignments[selectedModuleForGrading]?.tinkercadUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2.5 bg-slate-950 border border-slate-900 text-teal-400 hover:border-teal-500/50 rounded flex items-center justify-between"
                            >
                              <span>Tinkercad Design Circuit</span>
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          )}
                          {selectedStudentForGrading.submittedAssignments[selectedModuleForGrading]?.codeUrl && (
                            <a
                              href={selectedStudentForGrading.submittedAssignments[selectedModuleForGrading]?.codeUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2.5 bg-slate-950 border border-slate-900 text-teal-400 hover:border-teal-500/50 rounded flex items-center justify-between"
                            >
                              <span>Submitted Code Link</span>
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Grading Form */}
                      <form onSubmit={handleGradeSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">প্রাপ্ত গ্রেড / মার্কস</label>
                            <select
                              value={assignmentGrade}
                              onChange={(e) => setAssignmentGrade(e.target.value)}
                              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs focus:outline-none"
                            >
                              <option value="A+">A+ (Outstanding)</option>
                              <option value="A">A (Excellent)</option>
                              <option value="B">B (Good)</option>
                              <option value="Pass">Pass</option>
                              <option value="Fail">Need Improvement</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">মতামত ও ফিডব্যাক (বাংলা বা ইংরেজি)</label>
                          <textarea
                            rows={3}
                            value={assignmentFeedback}
                            onChange={(e) => setAssignmentFeedback(e.target.value)}
                            placeholder="চমৎকার সার্কিট ডিজাইন হয়েছে! তবে ডিলয়ের মান আরেকটু কমিয়ে দেখলে সুবিধা হতো।"
                            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-all"
                        >
                          গ্রেড প্রদান করুন
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. CURRICULUM EDITOR */}
            {adminTab === 'curriculum' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">কোর্স কারিকুলাম ও কন্টেন্ট এডিটর</h3>
                    <p className="text-xs text-slate-400 mt-1">মডিউল তৈরি, ভিডিও ক্লাস আপলোড, ড্রাফট/পাবলিশ কন্ট্রোল, কুইজ ও অ্যাসাইনমেন্ট কাস্টমাইজ করুন।</p>
                  </div>
                  
                  {/* Subtabs Selector */}
                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                    <button
                      onClick={() => setCurrSubTab('modules')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        currSubTab === 'modules' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      মডিউলস
                    </button>
                    <button
                      onClick={() => setCurrSubTab('lessons')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        currSubTab === 'lessons' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      ক্লাস সমূহ
                    </button>
                    <button
                      onClick={() => setCurrSubTab('quizzes')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        currSubTab === 'quizzes' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      কুইজ
                    </button>
                    <button
                      onClick={() => setCurrSubTab('assignments')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        currSubTab === 'assignments' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      অ্যাসাইনমেন্ট
                    </button>
                  </div>
                </div>

                {/* Subtab Content: MODULES */}
                {currSubTab === 'modules' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Add/Edit Module Form Left */}
                    <div className="lg:col-span-5">
                      {editingModuleId ? (
                        <form onSubmit={handleEditModuleSave} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                          <h4 className="text-xs font-bold text-amber-500 uppercase font-mono">EDIT MODULE DETAILS</h4>
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">মডিউল টাইটেল</label>
                            <input
                              type="text"
                              value={editModuleTitle}
                              onChange={(e) => setEditModuleTitle(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">মডিউল বিবরণ (বাংলায়)</label>
                            <textarea
                              rows={3}
                              value={editModuleDesc}
                              onChange={(e) => setEditModuleDesc(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                              required
                            />
                          </div>
                          <div className="flex gap-2">
                            <button type="submit" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-all cursor-pointer">
                              সংরক্ষণ করুন
                            </button>
                            <button type="button" onClick={() => setEditingModuleId(null)} className="px-4 py-2 bg-slate-900 text-slate-400 text-xs rounded-lg cursor-pointer">
                              বাতিল
                            </button>
                          </div>
                        </form>
                      ) : (
                        <form onSubmit={handleAddModule} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                          <h4 className="text-xs font-bold text-amber-500 uppercase font-mono">CREATE NEW COURSE MODULE</h4>
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">মডিউল টাইটেল (Title)</label>
                            <input
                              type="text"
                              value={newModuleTitle}
                              onChange={(e) => setNewModuleTitle(e.target.value)}
                              placeholder="উদা: মডিউল ৫: অ্যাডভান্সড আইওটি এবং স্মার্ট হোম"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">মডিউল বিবরণ (Short Description)</label>
                            <textarea
                              rows={3}
                              value={newModuleDesc}
                              onChange={(e) => setNewModuleDesc(e.target.value)}
                              placeholder="এই মডিউলে আমরা আরডুইনোর সাথে ESP8266 ওয়াইফাই মডিউল ব্যবহার করে স্মার্ট হোম কন্ট্রোল শিখব।"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                              required
                            />
                          </div>
                          <button type="submit" className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-all cursor-pointer">
                            তৈরি করুন
                          </button>
                        </form>
                      )}
                    </div>

                    {/* Modules List Right */}
                    <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-1">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">মোট মডিউল তালিকা</h4>
                      {modules.map((m, index) => (
                        <div key={m.id} className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl flex justify-between items-start">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono bg-slate-900 px-2 py-0.5 rounded text-amber-500 font-bold">MODULE {index + 1}</span>
                            <h4 className="text-sm font-bold text-white mt-1">{m.title}</h4>
                            <p className="text-xs text-slate-400">{m.description}</p>
                            <span className="text-[10px] text-slate-500 block">মোট ক্লাস সংখ্যা: {m.lessons.length} টি</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingModuleId(m.id);
                                setEditModuleTitle(m.title);
                                setEditModuleDesc(m.description);
                              }}
                              className="p-1.5 bg-slate-900 hover:bg-slate-800 text-teal-400 border border-slate-800 rounded cursor-pointer"
                              title="মডিউল এডিট করুন"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteModule(m.id)}
                              className="p-1.5 bg-slate-900 hover:bg-rose-950/40 text-rose-400 border border-slate-800 rounded cursor-pointer"
                              title="মডিউল ডিলিট করুন"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {modules.length === 0 && (
                        <p className="text-xs text-slate-500 text-center py-8">কোনো কোর্স মডিউল পাওয়া যায়নি।</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Subtab Content: LESSONS / CLASSES */}
                {currSubTab === 'lessons' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Add/Edit Class Form Left */}
                    <div className="lg:col-span-5">
                      {editingLessonId ? (
                        <form onSubmit={handleEditLessonSave} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold text-amber-500 uppercase font-mono">EDIT CLASS LESSON</h4>
                            <button type="button" onClick={() => setEditingLessonId(null)} className="text-xs text-slate-500 hover:text-white cursor-pointer">
                              বাতিল করুন
                            </button>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">মডিউল পরিবর্তন করুন</label>
                            <select
                              value={editLessonModuleId}
                              onChange={(e) => setEditLessonModuleId(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                            >
                              {modules.map(m => (
                                <option key={m.id} value={m.id}>{m.title}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">ক্লাসের শিরোনাম (টাইটেল)</label>
                            <input
                              type="text"
                              value={editLessonTitle}
                              onChange={(e) => setEditLessonTitle(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-slate-400 mb-1">সময়কাল (Duration)</label>
                              <input
                                type="text"
                                value={editLessonDuration}
                                onChange={(e) => setEditLessonDuration(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none"
                              />
                            </div>
                            <div className="flex items-center pt-5">
                              <label className="flex items-center gap-2 text-xs text-slate-400 select-none cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={editLessonPublished}
                                  onChange={(e) => setEditLessonPublished(e.target.checked)}
                                  className="rounded text-amber-500 focus:ring-0"
                                />
                               <span>অবিলম্বে পাবলিশ করুন</span>
                              </label>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">ইউটিউব ভিডিও লিংক (YouTube URL / Share Link)</label>
                            <input
                              type="text"
                              value={editLessonVideo}
                              onChange={(e) => setEditLessonVideo(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">পিডিএফ লেকচার ফাইল লিংক (PDF Notes)</label>
                            <input
                              type="text"
                              value={editLessonPdf}
                              onChange={(e) => setEditLessonPdf(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">ক্লাসের সংক্ষিপ্ত বর্ণনা</label>
                            <textarea
                              rows={2}
                              value={editLessonDesc}
                              onChange={(e) => setEditLessonDesc(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs rounded-lg transition-all cursor-pointer"
                          >
                            ক্লাসের তথ্য আপডেট করুন
                          </button>
                        </form>
                      ) : (
                        <form onSubmit={handleAddLesson} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                          <h4 className="text-xs font-bold text-amber-500 uppercase font-mono">ADD NEW CLASS LESSON</h4>
                          
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">টার্গেট মডিউল নির্বাচন করুন</label>
                            <select
                              value={selectedModuleId}
                              onChange={(e) => setSelectedModuleId(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                            >
                              {modules.map(m => (
                                <option key={m.id} value={m.id}>{m.title}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">ক্লাসের শিরোনাম (Class Title)</label>
                            <input
                              type="text"
                              value={newLessonTitle}
                              onChange={(e) => setNewLessonTitle(e.target.value)}
                              placeholder="Class 1.5: Ultrasonic Sensor & Radar Project"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-slate-400 mb-1">সময়কাল (Duration)</label>
                              <input
                                type="text"
                                value={newLessonDuration}
                                onChange={(e) => setNewLessonDuration(e.target.value)}
                                placeholder="উদা: 25 mins"
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none"
                              />
                            </div>
                            <div className="flex items-center pt-5">
                              <label className="flex items-center gap-2 text-xs text-slate-400 select-none cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={newLessonPublished}
                                  onChange={(e) => setNewLessonPublished(e.target.checked)}
                                  className="rounded text-amber-500 focus:ring-0 animate-none"
                                />
                                <span>সরাসরি পাবলিশড</span>
                              </label>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">ভিডিও লিংক পেস্ট করুন (YouTube URL)</label>
                            <input
                              type="text"
                              value={newLessonVideo}
                              onChange={(e) => setNewLessonVideo(e.target.value)}
                              placeholder="ইউটিউব লিংক পেস্ট করুন"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">পিডিএফ নোট লিংক (PDF Notes URL)</label>
                            <input
                              type="text"
                              value={newLessonPdf}
                              onChange={(e) => setNewLessonPdf(e.target.value)}
                              placeholder="লেকচার স্লাইড বা পিডিএফ নোট লিংক"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">ক্লাসের বর্ণনা / আলোচ্য বিষয়</label>
                            <textarea
                              rows={2}
                              value={newLessonDesc}
                              onChange={(e) => setNewLessonDesc(e.target.value)}
                              placeholder="আল্ট্রাসনিক সেন্সর ওয়্যারিং, ফর্মুলা এবং রাডার ড্যাশবোর্ড কোড।"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-all cursor-pointer"
                          >
                            মডিউলে যুক্ত করুন
                          </button>
                        </form>
                      )}
                    </div>

                    {/* Classes Display list Right */}
                    <div className="lg:col-span-7 space-y-4 max-h-[580px] overflow-y-auto pr-1">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">মডিউলভিত্তিক ক্লাস লেকচার তালিকা</h4>
                      {modules.map(m => (
                        <div key={m.id} className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl text-left">
                          <h4 className="text-xs font-bold text-slate-200 border-b border-slate-900 pb-1 flex justify-between items-center">
                            <span>{m.title}</span>
                            <span className="text-[10px] text-slate-500 font-mono">ক্লাস: {m.lessons.length}</span>
                          </h4>
                          
                          <div className="mt-2.5 space-y-2">
                            {m.lessons.map(l => (
                              <div key={l.id} className="flex justify-between items-center text-[11px] bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                                <div className="space-y-0.5 max-w-[65%]">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-slate-200 font-medium truncate block">{l.title}</span>
                                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${l.published !== false ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                      {l.published !== false ? 'Published' : 'Draft'}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 truncate">{l.videoUrl}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleToggleLessonPublish(m.id, l.id)}
                                    className={`px-1.5 py-1 text-[10px] rounded transition-all font-semibold cursor-pointer ${l.published !== false ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400'}`}
                                    title="পাবলিশ অবস্তা পরিবর্তন করুন"
                                  >
                                    {l.published !== false ? 'Unpublish' : 'Publish'}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleEditLessonLoad(m.id, l)}
                                    className="p-1.5 bg-slate-900 hover:bg-slate-800 text-teal-400 border border-slate-850 rounded cursor-pointer"
                                    title="ক্লাস এডিট করুন"
                                  >
                                    <Edit2 className="h-3 w-3" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteLesson(m.id, l.id)}
                                    className="p-1.5 bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-850 rounded cursor-pointer"
                                    title="ক্লাস ডিলিট করুন"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                            {m.lessons.length === 0 && (
                              <p className="text-[10px] text-slate-600 py-1">কোনো ক্লাস যুক্ত নেই।</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subtab Content: QUIZZES */}
                {currSubTab === 'quizzes' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Add Question form Left */}
                    <div className="lg:col-span-5">
                      <form onSubmit={handleAddQuizQuestion} className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-4">
                        <h4 className="text-xs font-bold text-amber-500 uppercase font-mono">ADD QUIZ QUESTION</h4>
                        
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">মডিউল সিলেক্ট করুন</label>
                          <select
                            value={selectedQuizModuleId}
                            onChange={(e) => setSelectedQuizModuleId(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                          >
                            {modules.map(m => (
                              <option key={m.id} value={m.id}>{m.title}</option>
                            ))}
                          </select>
                        </div>

                        {/* If chosen module has no quiz initialized, let them build it */}
                        {modules.find(m => m.id === selectedQuizModuleId) && !modules.find(m => m.id === selectedQuizModuleId)?.quiz && (
                          <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg space-y-2">
                            <p className="text-xs text-amber-400 font-semibold">এই মডিউলে এখনো কোনো সক্রিয় কুইজ সিস্টেম চালু করা হয়নি।</p>
                            <button
                              type="button"
                              onClick={() => handleCreateEmptyQuiz(selectedQuizModuleId)}
                              className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                            >
                              কুইজ সেটআপ করুন
                            </button>
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">প্রশ্ন টাইপ করুন</label>
                          <input
                            type="text"
                            value={newQuestionText}
                            onChange={(e) => setNewQuestionText(e.target.value)}
                            placeholder="উদা: আরডুইনো ইউএনও-র রিসেট পিন দিয়ে আমরা কী করি?"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">অপশন ১ (A)</label>
                            <input
                              type="text"
                              value={newQuestionOpt1}
                              onChange={(e) => setNewQuestionOpt1(e.target.value)}
                              placeholder="অপশন A"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">অপশন ২ (B)</label>
                            <input
                              type="text"
                              value={newQuestionOpt2}
                              onChange={(e) => setNewQuestionOpt2(e.target.value)}
                              placeholder="অপশন B"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">অপশন ৩ (C)</label>
                            <input
                              type="text"
                              value={newQuestionOpt3}
                              onChange={(e) => setNewQuestionOpt3(e.target.value)}
                              placeholder="অপশন C"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">অপশন ৪ (D)</label>
                            <input
                              type="text"
                              value={newQuestionOpt4}
                              onChange={(e) => setNewQuestionOpt4(e.target.value)}
                              placeholder="অপশন D"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">সঠিক উত্তর নির্বাচন করুন</label>
                          <select
                            value={newQuestionCorrect}
                            onChange={(e) => setNewQuestionCorrect(Number(e.target.value))}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-amber-400"
                          >
                            <option value={0}>অপশন ১ (A) সঠিক</option>
                            <option value={1}>অপশন ২ (B) সঠিক</option>
                            <option value={2}>অপশন ৩ (C) সঠিক</option>
                            <option value={3}>অপশন ৪ (D) সঠিক</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-all cursor-pointer"
                        >
                          প্রশ্নটি কুইজে যোগ করুন
                        </button>
                      </form>
                    </div>

                    {/* Quiz Questions List Right */}
                    <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-1">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">কুইজ প্রশ্ন এবং সリューション তালিকা</h4>
                      {modules.map(m => (
                        <div key={m.id} className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl text-left space-y-2">
                          <div className="flex justify-between items-center border-b border-slate-900 pb-1.5">
                            <h4 className="text-xs font-bold text-slate-200">{m.title}</h4>
                            <span className="text-[10px] text-teal-400 font-bold font-mono">প্রশ্ন: {m.quiz?.questions.length || 0} টি</span>
                          </div>

                          {m.quiz ? (
                            <div className="space-y-2 pt-1 pl-2 border-l border-slate-800">
                              {m.quiz.questions.map((q, idx) => (
                                <div key={q.id} className="p-2.5 bg-slate-950 border border-slate-900 rounded-lg flex justify-between items-start text-[11px]">
                                  <div className="space-y-1 max-w-[85%]">
                                    <p className="font-semibold text-slate-200">{idx + 1}. {q.question}</p>
                                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 font-mono">
                                      {q.options.map((opt, oIdx) => (
                                        <span key={oIdx} className={oIdx === q.correctAnswer ? 'text-emerald-400 font-bold' : ''}>
                                          {String.fromCharCode(65 + oIdx)}) {opt}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handleDeleteQuizQuestion(m.id, q.id)}
                                    className="p-1 bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800 rounded shrink-0 cursor-pointer"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              ))}
                              {m.quiz.questions.length === 0 && (
                                <p className="text-[10px] text-slate-500">বর্তমানে কোনো কুইজ প্রশ্ন তৈরি করা হয়নি।</p>
                              )}
                            </div>
                          ) : (
                            <p className="text-[10px] text-slate-600">কুইজ সেশন এখনো ইনিশিয়ালাইজ করা হয়নি।</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subtab Content: ASSIGNMENTS */}
                {currSubTab === 'assignments' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Add/Edit Assignment form Left */}
                    <div className="lg:col-span-5">
                      <form onSubmit={handleSaveAssignment} className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-4">
                        <h4 className="text-xs font-bold text-amber-500 uppercase font-mono">SET UP MODULE ASSIGNMENT</h4>
                        
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">মডিউল সিলেক্ট করুন</label>
                          <select
                            value={selectedAssignModuleId}
                            onChange={(e) => setSelectedAssignModuleId(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                          >
                            {modules.map(m => (
                              <option key={m.id} value={m.id}>{m.title}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">অ্যাসাইনমেন্টের নাম (Title)</label>
                          <input
                            type="text"
                            value={assignTitle}
                            onChange={(e) => setAssignTitle(e.target.value)}
                            placeholder="উদা: Assignment 1: Tinkercad-এ ট্রাফিক লাইট ডিজাইন"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">সংক্ষিপ্ত বিবরণ</label>
                          <textarea
                            rows={2}
                            value={assignDesc}
                            onChange={(e) => setAssignDesc(e.target.value)}
                            placeholder="এই অ্যাসাইনমেন্টে আমরা টিনকারক্যাড সিমুলেটর ব্যবহার করে ৩টি এলইডি এবং রেজিস্টর কানেক্ট করব।"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">অ্যাসাইনমেন্ট সমস্যা ও নির্দেশাবলী (Problem Statement)</label>
                          <textarea
                            rows={5}
                            value={assignProblem}
                            onChange={(e) => setAssignProblem(e.target.value)}
                            placeholder="১. টিনকারক্যাডে সার্কিট কানেকশন করুন।&#10;২. লাল লাইট ৫ সেকেন্ড, হলুদ ২ সেকেন্ড, এবং সবুজ লাইট ৫ সেকেন্ড জ্বলার কোড লিখুন।&#10;৩. টিনকারক্যাড সার্কিটের পাবলিক লিংক এবং কোড এখানে টেক্সটবক্সে সাবমিট করুন।"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-all cursor-pointer"
                        >
                          অ্যাসাইনমেন্ট সংরক্ষণ করুন
                        </button>
                      </form>
                    </div>

                    {/* Assignments List Right */}
                    <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-1">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">মডিউলের অ্যাসাইনমেন্ট তালিকা</h4>
                      {modules.map(m => (
                        <div key={m.id} className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl text-left space-y-2">
                          <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                            <h4 className="text-xs font-bold text-slate-200">{m.title}</h4>
                            {m.assignment ? (
                              <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-bold font-mono">ACTIVE</span>
                            ) : (
                              <span className="text-[10px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded font-bold font-mono">NO ASSIGNMENT</span>
                            )}
                          </div>

                          {m.assignment ? (
                            <div className="space-y-1.5 pt-1 pl-2.5 border-l-2 border-amber-500/40 text-[11px]">
                              <p className="font-bold text-slate-200">{m.assignment.title}</p>
                              <p className="text-slate-400">{m.assignment.description}</p>
                              <div className="bg-slate-950 p-2 border border-slate-900 rounded font-mono text-[10px] text-slate-500 whitespace-pre-line mt-1">
                                {m.assignment.problemStatement}
                              </div>
                              <div className="flex gap-2 pt-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedAssignModuleId(m.id);
                                    setAssignTitle(m.assignment?.title || '');
                                    setAssignDesc(m.assignment?.description || '');
                                    setAssignProblem(m.assignment?.problemStatement || '');
                                    setCurrSubTab('assignments');
                                  }}
                                  className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-teal-400 border border-slate-800 rounded font-semibold text-[10px] cursor-pointer"
                                >
                                  এডিট করুন
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteAssignment(m.id)}
                                  className="px-2 py-1 bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800 rounded font-semibold text-[10px] cursor-pointer"
                                >
                                  মুছে ফেলুন
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-[10px] text-slate-500 italic pl-1">এই মডিউলে কোনো অ্যাসাইনমেন্ট সেট করা হয়নি।</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. BROADCAST NOTICES */}
            {adminTab === 'notices' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">ঘোষণা ও নোটিশ ব্রডকাস্ট করুন</h3>
                  <p className="text-xs text-slate-400 mt-1">সব শিক্ষার্থী অথবা নির্দিষ্ট শিক্ষার্থীর জন্য ঘোষণা প্রকাশ করুন।</p>
                </div>

                <form onSubmit={handleSendNotice} className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-4 max-w-xl text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">কাকে পাঠাতে চান? (Target Student)</label>
                      <select
                        value={targetStudent}
                        onChange={(e) => setTargetStudent(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs focus:outline-none"
                      >
                        <option value="all">সকল শিক্ষার্থী (All Students)</option>
                        {allUsers.filter(u => u.role === 'student').map(s => (
                          <option key={s.id} value={s.id}>{s.name} ({s.email})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">নোটিশের শিরোনাম</label>
                      <input
                        type="text"
                        value={noticeTitle}
                        onChange={(e) => setNoticeTitle(e.target.value)}
                        placeholder="উদা: শুক্রবারের লাইভ ক্লাস আপডেট"
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">নোটিশের বিষয়বস্তু / মেসেজ</label>
                    <textarea
                      rows={4}
                      value={noticeMsg}
                      onChange={(e) => setNoticeMsg(e.target.value)}
                      placeholder="আসসালামু আলাইকুম, আমাদের আগামী শুক্রবারের ডাউট সলভিং জুম সেশন রাত ৮ টায় অনুষ্ঠিত হবে। লিংক আপনাদের মেসেজে মডিউল ৪ এর নিচে দেওয়া থাকবে।"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow transition-all cursor-pointer"
                  >
                    ঘোষণা প্রকাশ করুন
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
