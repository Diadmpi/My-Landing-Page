import React, { useState, useEffect } from 'react';
import { 
  Lock, Unlock, PlayCircle, BookOpen, Award, User, Bell, CheckCircle, 
  HelpCircle, Upload, AlertCircle, RefreshCw, Send, ChevronRight, FileText,
  Clock, Video, ExternalLink, Trash
} from 'lucide-react';
import { User as UserType, CourseModule, Lesson, PaymentMethod } from '../types';

interface StudentDashboardProps {
  currentUser: UserType;
  modules: CourseModule[];
  onUpdateUser: (updatedUser: UserType) => void;
  onOpenPayment: () => void;
}

export default function StudentDashboard({ 
  currentUser, 
  modules, 
  onUpdateUser, 
  onOpenPayment 
}: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<'modules' | 'quizzes' | 'assignments' | 'certificate' | 'profile'>('modules');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  
  // Quiz State
  const [activeQuizModule, setActiveQuizModule] = useState<CourseModule | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Assignment State
  const [activeAssignmentModule, setActiveAssignmentModule] = useState<CourseModule | null>(null);
  const [assignText, setAssignText] = useState('');
  const [assignTinkercad, setAssignTinkercad] = useState('');
  const [assignCode, setAssignCode] = useState('');

  // Profile Edit State
  const [editName, setEditName] = useState(currentUser.name);
  const [editPhone, setEditPhone] = useState(currentUser.phone || '');
  const [editSchool, setEditSchool] = useState(currentUser.schoolCollege || '');
  const [profilePic, setProfilePic] = useState(currentUser.profilePic || '');
  const [profileMessage, setProfileMessage] = useState('');

  // Set first lesson as default if unlocked
  useEffect(() => {
    if (currentUser.paymentStatus === 'approved' && modules.length > 0 && !selectedLesson) {
      // Find the first published lesson across all modules
      let found = false;
      for (const m of modules) {
        const firstPublished = m.lessons.find(l => l.published !== false);
        if (firstPublished) {
          setSelectedLesson(firstPublished);
          found = true;
          break;
        }
      }
      if (!found && modules[0] && modules[0].lessons.length > 0) {
        setSelectedLesson(modules[0].lessons[0]);
      }
    }
  }, [currentUser.paymentStatus, modules, selectedLesson]);

  const isCourseUnlocked = currentUser.paymentStatus === 'approved';

  // Toggle Lesson Completion
  const handleMarkLessonComplete = (lessonId: string) => {
    const isCompleted = currentUser.completedLessons.includes(lessonId);
    let updatedCompleted = [...currentUser.completedLessons];
    
    if (isCompleted) {
      updatedCompleted = updatedCompleted.filter(id => id !== lessonId);
    } else {
      updatedCompleted.push(lessonId);
    }

    onUpdateUser({
      ...currentUser,
      completedLessons: updatedCompleted
    });
  };

  // Submit Quiz Answers
  const handleQuizSubmit = () => {
    if (!activeQuizModule || !activeQuizModule.quiz) return;
    const questions = activeQuizModule.quiz.questions;
    
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const percentScore = Math.round((correctCount / questions.length) * 100);
    setQuizScore(percentScore);
    setQuizFinished(true);

    // Save score in user profile
    const updatedQuizScores = { ...currentUser.quizScores, [activeQuizModule.id]: percentScore };
    onUpdateUser({
      ...currentUser,
      quizScores: updatedQuizScores
    });
  };

  const startQuiz = (module: CourseModule) => {
    setActiveQuizModule(module);
    setCurrentQuizIndex(0);
    setSelectedAnswers({});
    setQuizFinished(false);
    setQuizScore(0);
  };

  // Submit Assignment
  const handleAssignmentSubmit = (e: React.FormEvent, moduleId: string) => {
    e.preventDefault();
    if (!assignText && !assignTinkercad && !assignCode) {
      alert('অনুগ্রহ করে যেকোনো একটি উত্তর বা লিংক প্রদান করুন।');
      return;
    }

    const updatedSubmissions = {
      ...currentUser.submittedAssignments,
      [moduleId]: {
        submissionText: assignText,
        tinkercadUrl: assignTinkercad,
        codeUrl: assignCode,
        date: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
        graded: false
      }
    };

    onUpdateUser({
      ...currentUser,
      submittedAssignments: updatedSubmissions
    });

    // Reset fields
    setAssignText('');
    setAssignTinkercad('');
    setAssignCode('');
    setActiveAssignmentModule(null);
    alert('অ্যাসাইনমেন্টটি সফলভাবে জমা দেওয়া হয়েছে! এডমিন শীঘ্রই এটি মূল্যায়ন করবেন।');
  };

  // Update Profile
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...currentUser,
      name: editName,
      phone: editPhone,
      schoolCollege: editSchool,
      profilePic
    });
    setProfileMessage('আপনার প্রোফাইল সফলভাবে আপডেট করা হয়েছে!');
    setTimeout(() => setProfileMessage(''), 3000);
  };

  // Check if Certificate can be unlocked
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.filter(l => l.published !== false).length, 0);
  const completedLessonsCount = currentUser.completedLessons.length;
  const isSyllabusDone = completedLessonsCount >= totalLessons;
  const quizzesPassed = modules.every(m => !m.quiz || (currentUser.quizScores[m.id] && currentUser.quizScores[m.id] >= 80));
  const isCertificateUnlocked = isCourseUnlocked && isSyllabusDone && quizzesPassed;

  return (
    <div className="min-h-screen bg-[#0b0f19] pt-6 pb-12 text-left" id="student-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Dashboard Banner */}
        <div className="bg-gradient-to-r from-[#005f63]/40 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img 
              src={currentUser.profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'} 
              alt="Profile" 
              className="h-16 w-16 rounded-full object-cover border-2 border-teal-500"
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">স্বাগতম, {currentUser.name}!</h2>
              <p className="text-xs text-slate-400 mt-1 font-mono">UID: {currentUser.id} | Joined on: {currentUser.registerDate}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-0.5 bg-teal-500/10 text-teal-400 rounded-full text-[10px] font-semibold">
                  Course: Robotics with Arduino
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  currentUser.paymentStatus === 'approved' 
                    ? 'bg-emerald-500/10 text-emerald-400' 
                    : currentUser.paymentStatus === 'pending'
                    ? 'bg-amber-500/10 text-amber-400 animate-pulse'
                    : 'bg-red-500/10 text-red-400'
                }`}>
                  Status: {
                    currentUser.paymentStatus === 'approved' 
                      ? 'Enrolled (Approved)' 
                      : currentUser.paymentStatus === 'pending'
                      ? 'Verification Pending'
                      : 'Unpaid / Enrolled'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Quick Progress Indicator */}
          <div className="bg-slate-950/60 p-4 border border-slate-900 rounded-xl w-full md:w-auto grid grid-cols-3 gap-6 text-center">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Completed</span>
              <span className="text-lg font-bold text-teal-400 font-mono">
                {completedLessonsCount}/{totalLessons}
              </span>
            </div>
            <div className="border-l border-slate-900 px-3">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Quizzes</span>
              <span className="text-lg font-bold text-blue-400 font-mono">
                {Object.keys(currentUser.quizScores).length}/{modules.filter(m => m.quiz).length}
              </span>
            </div>
            <div className="border-l border-slate-900 pl-3">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Status</span>
              <span className="text-xs font-bold text-slate-300 block pt-1">
                {isSyllabusDone ? '100% Done' : 'In Progress'}
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs & Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Dashboard Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-2">
            <button
              onClick={() => { setActiveTab('modules'); setActiveQuizModule(null); setActiveAssignmentModule(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'modules'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/10'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Video className="h-5 w-5" />
              <span>ভিডিও ক্লাস ও মডিউল</span>
            </button>

            <button
              onClick={() => { setActiveTab('quizzes'); setActiveQuizModule(null); setActiveAssignmentModule(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'quizzes'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/10'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <HelpCircle className="h-5 w-5" />
              <span>কুইজ পরীক্ষা</span>
            </button>

            <button
              onClick={() => { setActiveTab('assignments'); setActiveQuizModule(null); setActiveAssignmentModule(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'assignments'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/10'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>অ্যাসাইনমেন্ট</span>
            </button>

            <button
              onClick={() => { setActiveTab('certificate'); setActiveQuizModule(null); setActiveAssignmentModule(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'certificate'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/10'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Award className="h-5 w-5" />
              <span>সার্টিফিকেট ডাউনলোড</span>
            </button>

            <button
              onClick={() => { setActiveTab('profile'); setActiveQuizModule(null); setActiveAssignmentModule(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/10'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <User className="h-5 w-5" />
              <span>প্রোফাইল সেটিংস</span>
            </button>
          </div>

          {/* Main Dashboard Panel Panel */}
          <div className="lg:col-span-9 bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 sm:p-8">
            
            {/* IF NOT ENROLLED/LOCKED SCREEN */}
            {!isCourseUnlocked && activeTab !== 'profile' && (
              <div className="text-center py-12 max-w-xl mx-auto space-y-6">
                <div className="inline-flex items-center justify-center p-4 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 mb-2">
                  <Lock className="h-8 w-8" />
                </div>
                {currentUser.paymentStatus === 'pending' ? (
                  <>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">পেমেন্ট ভেরিফিকেশন চলছে!</h3>
                    <p className="text-sm text-slate-400">
                      আপনার সাবমিট করা পেমেন্ট ট্রানজেকশন আইডি (<strong>{currentUser.txId}</strong>) এবং স্ক্রিনশট আমাদের কাছে পৌঁছেছে। এডমিন প্যানেল থেকে আপনার তথ্য যাচাই করার পর কোর্স মডিউলগুলো উন্মুক্ত করে দেওয়া হবে। সাধারণত ৩০ মিনিট থেকে ২ ঘণ্টার মধ্যে এটি সম্পূর্ণ হয়।
                    </p>
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl inline-block text-left">
                      <div className="flex gap-2 text-xs font-mono text-slate-400">
                        <span>Method:</span> <strong className="text-teal-400 font-bold uppercase">{currentUser.paymentMethod}</strong>
                      </div>
                      <div className="flex gap-2 text-xs font-mono text-slate-400 mt-1">
                        <span>Sender phone:</span> <strong className="text-white font-bold">{currentUser.paymentPhone}</strong>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">মডিউলগুলো দেখতে আগে পেমেন্ট করুন</h3>
                    <p className="text-sm text-slate-400">
                      "Robotics with Arduino Beginner Course" কোর্সটিতে অ্যাক্সেস পেতে ভর্তি প্রক্রিয়া সম্পন্ন করুন। পেমেন্ট করার পর ট্রানজেকশন আইডি ও স্ক্রিনশট আপলোড দিলে কোর্সটি অটো আনলক হবে।
                    </p>
                    <button
                      onClick={onOpenPayment}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#00979c] hover:bg-[#005f63] text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer"
                    >
                      ভর্তি ফি পরিশোধ করুন (৳১২০০)
                    </button>
                  </>
                )}
              </div>
            )}

            {/* UNLOCKED ACTIVE MODULES VIEW */}
            {isCourseUnlocked && activeTab === 'modules' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Lesson Video Viewer Left */}
                <div className="lg:col-span-7 space-y-5">
                  {selectedLesson ? (
                    <>
                      <div className="aspect-video w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 relative shadow-2xl">
                        <iframe
                          src={selectedLesson.videoUrl}
                          title={selectedLesson.title}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div>
                        <span className="text-[10px] text-teal-400 font-mono tracking-wider font-semibold uppercase">ACTIVE LESSON</span>
                        <h3 className="text-xl font-bold text-white mt-1">{selectedLesson.title}</h3>
                        <p className="text-sm text-slate-400 mt-2 leading-relaxed">{selectedLesson.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-4 items-center justify-between border-t border-slate-800 pt-4 mt-4">
                        <a
                          href={selectedLesson.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 bg-teal-500/10 px-4 py-2 rounded-lg hover:bg-teal-500/20 transition-all"
                        >
                          <BookOpen className="h-4 w-4" />
                          ক্লাস লেকচার নোট (PDF) <ExternalLink className="h-3 w-3" />
                        </a>

                        <button
                          onClick={() => handleMarkLessonComplete(selectedLesson.id)}
                          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            currentUser.completedLessons.includes(selectedLesson.id)
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                          }`}
                        >
                          <CheckCircle className="h-4 w-4" />
                          {currentUser.completedLessons.includes(selectedLesson.id) ? 'কমপ্লিট হয়েছে!' : 'কমপ্লিট মার্ক করুন'}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-20 text-slate-500">
                      <p>ডানপাশের তালিকা থেকে একটি ক্লাস নির্বাচন করুন।</p>
                    </div>
                  )}
                </div>

                {/* Modules & Classes Checklist Right */}
                <div className="lg:col-span-5 space-y-4 max-h-[600px] overflow-y-auto pr-1">
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">COURSE CURRICULUM</h4>
                  
                  {modules.map((m) => (
                    <div key={m.id} className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/40">
                      <div className="p-3 bg-slate-950/80 border-b border-slate-900">
                        <h5 className="text-xs font-bold text-slate-200">{m.title}</h5>
                      </div>
                      <div className="p-2 space-y-1">
                        {m.lessons.filter(l => l.published !== false).map((les) => (
                          <button
                            key={les.id}
                            onClick={() => setSelectedLesson(les)}
                            className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-all text-left ${
                              selectedLesson?.id === les.id
                                ? 'bg-teal-500/10 text-teal-300 border border-teal-500/20'
                                : 'hover:bg-slate-900 text-slate-400'
                            }`}
                          >
                            <div className="flex items-center gap-2 max-w-[80%]">
                              <PlayCircle className={`h-4 w-4 shrink-0 ${
                                currentUser.completedLessons.includes(les.id) ? 'text-emerald-400' : 'text-slate-500'
                              }`} />
                              <span className="truncate">{les.title}</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 shrink-0">{les.duration}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* QUIZZES TAB */}
            {isCourseUnlocked && activeTab === 'quizzes' && (
              <div className="space-y-6">
                {!activeQuizModule ? (
                  <>
                    <div>
                      <h3 className="text-xl font-bold text-white">অনলাইন মডিউল কুইজ পরীক্ষা</h3>
                      <p className="text-xs text-slate-400 mt-1">কোর্স সার্টিফিকেট পাওয়ার জন্য প্রতিটি কুইজে কমপক্ষে ৮০% নাম্বার পেয়ে পাস করতে হবে।</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {modules.filter(m => m.quiz).map((m) => {
                        const score = currentUser.quizScores[m.id];
                        const passed = score !== undefined && score >= 80;

                        return (
                          <div key={m.id} className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] text-teal-400 font-mono font-bold tracking-wider uppercase">QUIZ TEST</span>
                                {score !== undefined && (
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                    passed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                                  }`}>
                                    Score: {score}% {passed ? '(Passed)' : '(Failed)'}
                                  </span>
                                )}
                              </div>
                              <h4 className="text-sm font-bold text-slate-200">{m.title} এর কুইজ</h4>
                              <p className="text-[11px] text-slate-400 mt-2 font-mono">প্রশ্ন সংখ্যা: {m.quiz?.questions.length || 0}টি</p>
                            </div>

                            <button
                              onClick={() => startQuiz(m)}
                              className="w-full mt-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 rounded-lg hover:border-teal-500/30 transition-all cursor-pointer"
                            >
                              {score !== undefined ? 'কুইজে পুনরায় অংশ নিন' : 'পরীক্ষা শুরু করুন'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  // Active Quiz Screen
                  <div className="max-w-xl mx-auto p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                    <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
                      <h4 className="text-sm font-bold text-white truncate max-w-[70%]">{activeQuizModule.title} - কুইজ</h4>
                      <button
                        onClick={() => setActiveQuizModule(null)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        ফিরে যান
                      </button>
                    </div>

                    {!quizFinished ? (
                      <div className="space-y-5">
                        <div className="flex justify-between text-xs font-mono text-slate-500">
                          <span>প্রশ্ন: {currentQuizIndex + 1}/{activeQuizModule.quiz?.questions.length}</span>
                        </div>
                        
                        <p className="text-sm font-semibold text-slate-200">
                          {activeQuizModule.quiz?.questions[currentQuizIndex].question}
                        </p>

                        <div className="space-y-2">
                          {activeQuizModule.quiz?.questions[currentQuizIndex].options.map((opt, i) => {
                            const qId = activeQuizModule.quiz!.questions[currentQuizIndex].id;
                            const isSelected = selectedAnswers[qId] === i;
                            
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedAnswers({ ...selectedAnswers, [qId]: i })}
                                className={`w-full p-3 rounded-xl text-xs text-left transition-all border ${
                                  isSelected
                                    ? 'bg-teal-500/10 border-teal-500 text-teal-300 font-bold'
                                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        <div className="flex justify-between pt-4">
                          <button
                            disabled={currentQuizIndex === 0}
                            onClick={() => setCurrentQuizIndex(currentQuizIndex - 1)}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-xs font-semibold text-slate-400 rounded-lg"
                          >
                            পূর্ববর্তী
                          </button>

                          {currentQuizIndex < activeQuizModule.quiz!.questions.length - 1 ? (
                            <button
                              disabled={selectedAnswers[activeQuizModule.quiz!.questions[currentQuizIndex].id] === undefined}
                              onClick={() => setCurrentQuizIndex(currentQuizIndex + 1)}
                              className="px-5 py-2 bg-teal-500 hover:bg-teal-600 disabled:opacity-40 text-xs font-bold text-slate-950 rounded-lg cursor-pointer"
                            >
                              পরবর্তী
                            </button>
                          ) : (
                            <button
                              disabled={selectedAnswers[activeQuizModule.quiz!.questions[currentQuizIndex].id] === undefined}
                              onClick={handleQuizSubmit}
                              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-xs font-bold text-slate-950 rounded-lg cursor-pointer"
                            >
                              ফলাফল দেখুন
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      // Quiz result screen
                      <div className="text-center py-6 space-y-4">
                        <div className={`inline-flex items-center justify-center p-3 rounded-full ${
                          quizScore >= 80 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          <Award className="h-8 w-8" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          {quizScore >= 80 ? 'অভিনন্দন! আপনি পাস করেছেন।' : 'অনুগ্রহ করে আবার চেষ্টা করুন।'}
                        </h3>
                        <p className="text-2xl font-mono font-extrabold text-teal-400">{quizScore}% Score</p>
                        <p className="text-xs text-slate-400">সার্টিফিকেট পেতে কমপক্ষে ৮০% স্কোর প্রয়োজন।</p>

                        <div className="flex gap-4 justify-center pt-4">
                          <button
                            onClick={() => startQuiz(activeQuizModule)}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 rounded-lg border border-slate-800"
                          >
                            আবার অংশ নিন
                          </button>
                          <button
                            onClick={() => setActiveQuizModule(null)}
                            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-xs font-bold text-slate-950 rounded-lg"
                          >
                            তালিকায় ফিরুন
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>
            )}

            {/* ASSIGNMENTS TAB */}
            {isCourseUnlocked && activeTab === 'assignments' && (
              <div className="space-y-6">
                {!activeAssignmentModule ? (
                  <>
                    <div>
                      <h3 className="text-xl font-bold text-white">কোডিং ও সার্কিট অ্যাসাইনমেন্ট</h3>
                      <p className="text-xs text-slate-400 mt-1">প্রদত্ত প্রোজেক্টের কোড বা থিঙ্কারক্যাড লিংক সাবমিট করুন। এডমিন মূল্যায়ন শেষে আপনার মার্কস প্রদান করবেন।</p>
                    </div>

                    <div className="space-y-4">
                      {modules.filter(m => m.assignment).map((m) => {
                        const submission = currentUser.submittedAssignments[m.id];
                        
                        return (
                          <div key={m.id} className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="space-y-1 text-left">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-teal-400 font-mono font-bold bg-teal-500/10 px-2 py-0.5 rounded">
                                  Module Assignment
                                </span>
                                {submission && (
                                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                                    submission.graded ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400 animate-pulse'
                                  }`}>
                                    {submission.graded ? `Graded: ${submission.grade}` : 'Grading Pending'}
                                  </span>
                                )}
                              </div>
                              <h4 className="text-sm font-bold text-slate-200">{m.assignment?.title}</h4>
                              <p className="text-xs text-slate-400 line-clamp-1">{m.assignment?.description}</p>
                            </div>

                            <button
                              onClick={() => setActiveAssignmentModule(m)}
                              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 rounded-lg shrink-0 transition-all cursor-pointer"
                            >
                              {submission ? 'সাবমিশন রি-ভিউ / নতুন এন্ট্রি' : 'অ্যাসাইনমেন্ট সাবমিট করুন'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  // Assignment Submit Screen
                  <div className="max-w-xl mx-auto p-4 bg-slate-950 border border-slate-800 rounded-2xl text-left">
                    <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
                      <h4 className="text-sm font-bold text-white truncate max-w-[70%]">{activeAssignmentModule.assignment?.title}</h4>
                      <button
                        onClick={() => setActiveAssignmentModule(null)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        ফিরে যান
                      </button>
                    </div>

                    <div className="mb-4 p-4 bg-slate-900 rounded-xl space-y-2">
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        {activeAssignmentModule.assignment?.problemStatement}
                      </p>
                    </div>

                    {currentUser.submittedAssignments[activeAssignmentModule.id] && (
                      <div className="mb-5 p-3.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-1 text-xs">
                        <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
                          <CheckCircle className="h-4 w-4" /> আপনার সাবমিশন রেকর্ড করা হয়েছে!
                        </p>
                        <p className="text-slate-500 mt-1 font-mono">Date Submitted: {currentUser.submittedAssignments[activeAssignmentModule.id].date}</p>
                        {currentUser.submittedAssignments[activeAssignmentModule.id].graded ? (
                          <div className="mt-2 pt-2 border-t border-slate-900 space-y-1">
                            <p className="text-slate-200"><strong>গ্রেড:</strong> {currentUser.submittedAssignments[activeAssignmentModule.id].grade}</p>
                            <p className="text-slate-400"><strong>এডমিন ফিডব্যাক:</strong> {currentUser.submittedAssignments[activeAssignmentModule.id].feedback || 'No comments'}</p>
                          </div>
                        ) : (
                          <p className="text-slate-400 mt-1">এডমিন দ্রুতই আপনার কোড চেক করে ফিডব্যাক দিবেন।</p>
                        )}
                      </div>
                    )}

                    <form onSubmit={(e) => handleAssignmentSubmit(e, activeAssignmentModule.id)} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">C++ সোর্স কোড অথবা ব্যাখ্যা (চ্ছিক)</label>
                        <textarea
                          rows={4}
                          value={assignText}
                          onChange={(e) => setAssignText(e.target.value)}
                          placeholder="void setup() { ... }"
                          className="w-full px-3 py-2 bg-slate-900 text-slate-100 text-xs border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Tinkercad ডিজাইন লিংক (চ্ছিক)</label>
                          <input
                            type="url"
                            value={assignTinkercad}
                            onChange={(e) => setAssignTinkercad(e.target.value)}
                            placeholder="https://www.tinkercad.com/things/..."
                            className="w-full px-3 py-2.5 bg-slate-900 text-slate-100 text-xs border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">GitHub / অন্যান্য কোড ড্রাইভ লিংক (চ্ছিক)</label>
                          <input
                            type="url"
                            value={assignCode}
                            onChange={(e) => setAssignCode(e.target.value)}
                            placeholder="https://github.com/..."
                            className="w-full px-3 py-2.5 bg-slate-900 text-slate-100 text-xs border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-teal-400 to-[#00979c] text-slate-950 font-bold text-xs rounded-xl shadow transition-all cursor-pointer text-center"
                      >
                        নতুন সাবমিশন অ্যাড করুন
                      </button>
                    </form>

                  </div>
                )}
              </div>
            )}

            {/* CERTIFICATE TAB */}
            {isCourseUnlocked && activeTab === 'certificate' && (
              <div className="text-center py-6 max-w-xl mx-auto space-y-6 text-left">
                {!isCertificateUnlocked ? (
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
                      <Lock className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">সার্টিফিকেট এখনও লক অবস্থায় রয়েছে!</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      কোর্স সম্পূর্ণ করার অফিসিয়াল ভেরিফাইড সার্টিফিকেট আনলক করতে নিচের শর্তগুলো পূরণ করুন:
                    </p>

                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl max-w-sm mx-auto text-left space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`h-2.5 w-2.5 rounded-full ${isSyllabusDone ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        <span className={isSyllabusDone ? 'text-emerald-400' : 'text-slate-400'}>
                          ১০০% মডিউল ভিডিও সম্পন্ন করুন ({completedLessonsCount}/{totalLessons})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`h-2.5 w-2.5 rounded-full ${quizzesPassed ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        <span className={quizzesPassed ? 'text-emerald-400' : 'text-slate-400'}>
                          সবগুলো মডিউলের কুইজে পাস করুন (৮০% বা তার বেশি পেয়ে)
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Printable Certificate Render
                  <div className="space-y-6">
                    <div className="text-center space-y-2 mb-4">
                      <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
                        <Award className="h-6 w-6 text-yellow-400" /> অভিনন্দন, আপনি সফলভাবে কোর্স সম্পন্ন করেছেন!
                      </h3>
                      <p className="text-xs text-slate-400">আপনার কৃতিত্বের ভেরিফাইড সার্টিফিকেটটি নিচের ফ্রেম থেকে দেখে নিন বা ডাউনলোড করে রাখুন।</p>
                    </div>

                    {/* Certificate Box */}
                    <div 
                      id="printable-certificate"
                      className="w-full aspect-[1.414/1] bg-slate-950 border-8 border-teal-800/60 p-6 sm:p-10 relative flex flex-col justify-between overflow-hidden text-center rounded-xl shadow-2xl text-white select-none"
                    >
                      {/* Technical visual details in background */}
                      <div className="absolute inset-0 bg-[radial-gradient(#00979c0a_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
                      <div className="absolute top-0 left-0 h-16 w-16 border-t-2 border-l-2 border-teal-400/40" />
                      <div className="absolute top-0 right-0 h-16 w-16 border-t-2 border-r-2 border-teal-400/40" />
                      <div className="absolute bottom-0 left-0 h-16 w-16 border-b-2 border-l-2 border-teal-400/40" />
                      <div className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-teal-400/40" />

                      {/* Certificate Header */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono tracking-[0.3em] text-teal-400 uppercase font-bold">CERTIFICATE OF COMPLETION</span>
                        <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-wider">ZERON TRAINING ACADEMY</h4>
                        <p className="text-[8px] text-slate-500 font-mono">ESTABLISHED 2024 • ROBOTICS RESEARCH CENTER</p>
                      </div>

                      {/* Main Message */}
                      <div className="my-3 space-y-2">
                        <p className="text-[10px] text-slate-400 italic">This is proudly presented to</p>
                        <h2 className="text-xl sm:text-2xl font-black text-teal-300 font-sans tracking-wide uppercase border-b border-slate-900 pb-2 inline-block px-10">
                          {currentUser.name}
                        </h2>
                        <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                          for successfully completing all module video labs, interactive circuit assignments, and passing the comprehensive theoretical exams for the advanced program:
                        </p>
                        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider bg-[#00979c]/10 py-1.5 px-4 rounded border border-[#00979c]/20 inline-block">
                          Robotics with Arduino Beginner Course
                        </h3>
                      </div>

                      {/* Footer signatures and serial */}
                      <div className="flex justify-between items-end text-left pt-2 border-t border-slate-900">
                        <div>
                          <p className="text-[8px] text-slate-500 font-mono">CERTIFICATE ID</p>
                          <p className="text-[9px] text-teal-400 font-mono font-semibold">ZTA-{currentUser.id.split('_')[1] || '982736'}</p>
                        </div>

                        {/* Verified QR design mockup */}
                        <div className="flex flex-col items-center">
                          <div className="h-10 w-10 bg-white p-0.5 rounded">
                            <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=150" alt="QR" className="h-full w-full object-contain filter grayscale" />
                          </div>
                          <span className="text-[7px] text-emerald-400 font-mono font-bold mt-1 uppercase">✓ VERIFIED</span>
                        </div>

                        <div className="text-right space-y-1">
                          <p className="text-[10px] font-mono font-bold text-slate-300 italic underline decoration-teal-500 decoration-wavy">Naeemul Islam</p>
                          <p className="text-[8px] text-slate-500 font-mono">CHIEF INSTRUCTOR, ZERON</p>
                        </div>
                      </div>

                    </div>

                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => window.print()}
                        className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs rounded-xl shadow transition-all cursor-pointer"
                      >
                        সার্টিফিকেট প্রিন্ট / PDF সেভ করুন
                      </button>
                    </div>

                  </div>
                )}
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="max-w-xl mx-auto text-left">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white">প্রোফাইল সেটিংস</h3>
                  <p className="text-xs text-slate-400 mt-1">আপনার ব্যক্তিগত তথ্যসমূহ আপডেট করতে নিচের ফর্মটি ব্যবহার করুন।</p>
                </div>

                {profileMessage && (
                  <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg">
                    {profileMessage}
                  </div>
                )}

                <form onSubmit={handleProfileSave} className="space-y-4">
                  
                  {/* Photo picker demo */}
                  <div className="flex items-center gap-4 p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <img
                      src={profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                      alt="Avatar"
                      className="h-14 w-14 rounded-full object-cover border-2 border-teal-500"
                    />
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">প্রোফাইল পিকচার URL</label>
                      <input
                        type="url"
                        value={profilePic}
                        onChange={(e) => setProfilePic(e.target.value)}
                        placeholder="https://..."
                        className="w-80 max-w-full px-3 py-1.5 bg-slate-900 text-slate-100 text-xs border border-slate-800 rounded-lg focus:border-teal-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">পূর্ণ নাম</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="নাইমুল ইসলাম"
                      className="w-full px-3.5 py-2.5 bg-slate-950 text-slate-100 text-sm border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">মোবাইল নম্বর</label>
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-3.5 py-2.5 bg-slate-950 text-slate-100 text-sm border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">স্কুল / কলেজ / বিশ্ববিদ্যালয়</label>
                      <input
                        type="text"
                        value={editSchool}
                        onChange={(e) => setEditSchool(e.target.value)}
                        placeholder="ঢাকা কলেজ"
                        className="w-full px-3.5 py-2.5 bg-slate-950 text-slate-100 text-sm border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-teal-400 to-[#00979c] hover:from-teal-500 hover:to-teal-600 text-slate-950 font-bold text-xs rounded-xl shadow transition-all cursor-pointer"
                  >
                    পরিবর্তনগুলো সংরক্ষণ করুন
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
