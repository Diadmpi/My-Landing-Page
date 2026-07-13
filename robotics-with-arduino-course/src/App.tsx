import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AuthModal from './components/AuthModal';
import PaymentModal from './components/PaymentModal';
import StudentDashboard from './components/StudentDashboard';
import AdminPanel from './components/AdminPanel';
import CourseCurriculum from './components/CourseCurriculum';
import { INITIAL_MODULES } from './data/courseData';
import { User, CourseModule, Notification, PaymentMethod } from './types';
import { 
  Cpu, Award, Smartphone, Send, Star, Compass, Layers, ShieldCheck, 
  Smile, Mail, Phone, MapPin, Check, Plus, HelpCircle, ArrowRight,
  BookOpen, Heart, Github, Linkedin, Facebook, MessageSquare, Flame
} from 'lucide-react';

export default function App() {
  // Database States
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // App navigation and view states
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'admin'>('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  // Initialize DB on mount
  useEffect(() => {
    // 1. Initial Users Preloading
    const storedUsers = localStorage.getItem('zeron_users');
    let preloadedUsers: User[] = [];
    if (storedUsers) {
      preloadedUsers = JSON.parse(storedUsers);
    } else {
      preloadedUsers = [
        // Demo Student (Unpaid)
        {
          id: 'student_123',
          name: 'নাইমুল ইসলাম (Student)',
          email: 'student@zeron.com',
          password: 'student123',
          role: 'student',
          paymentStatus: 'none',
          completedLessons: [],
          quizScores: {},
          submittedAssignments: {},
          registerDate: '১১ জুলাই, ২০২৬',
          phone: '01712345678',
          schoolCollege: 'ঢাকা কলেজ',
          profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
        },
        // Demo Student (Paid / Enrolled)
        {
          id: 'student_456',
          name: 'তাহমিদ আহমেদ (Enrolled)',
          email: 'enrolled@zeron.com',
          password: 'student123',
          role: 'student',
          paymentStatus: 'approved',
          completedLessons: ['m1-l1', 'm1-l2', 'm1-l3', 'm2-l1', 'm2-l2'],
          quizScores: { mod1: 100, mod2: 80 },
          submittedAssignments: {
            mod1: {
              submissionText: 'void setup() {\n  pinMode(10, OUTPUT);\n  pinMode(11, OUTPUT);\n  pinMode(12, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(10, HIGH); delay(5000); digitalWrite(10, LOW);\n  digitalWrite(11, HIGH); delay(2000); digitalWrite(11, LOW);\n  digitalWrite(12, HIGH); delay(5000); digitalWrite(12, LOW);\n}',
              tinkercadUrl: 'https://www.tinkercad.com/things/7yHJ38Nlq7m',
              date: '১০ জুলাই, ২০২৬',
              graded: true,
              grade: 'A+',
              feedback: 'চমৎকার এবং অত্যন্ত মার্জিত কোড ডিজাইন হয়েছে! আপনার কন্টিনিউয়াস প্রগ্রেস প্রশংসনীয়।'
            }
          },
          registerDate: '১০ জুলাই, ২০২৬',
          phone: '01887654321',
          schoolCollege: 'নটর ডেম কলেজ',
          profilePic: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150'
        },
        // Demo Admin
        {
          id: 'admin_001',
          name: 'এডমিন (Zeron Training)',
          email: 'admin@zeron.com',
          password: 'admin123',
          role: 'admin',
          paymentStatus: 'none',
          completedLessons: [],
          quizScores: {},
          submittedAssignments: {},
          registerDate: '০১ জুন, ২০২৬',
          profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
        }
      ];
      localStorage.setItem('zeron_users', JSON.stringify(preloadedUsers));
    }
    setAllUsers(preloadedUsers);

    // 2. Initial Modules Preloading
    const storedModules = localStorage.getItem('zeron_modules');
    let preloadedModules: CourseModule[] = [];
    if (storedModules) {
      preloadedModules = JSON.parse(storedModules);
    } else {
      preloadedModules = INITIAL_MODULES;
      localStorage.setItem('zeron_modules', JSON.stringify(preloadedModules));
    }
    setModules(preloadedModules);

    // 3. Initial Notifications Preloading
    const storedNotifications = localStorage.getItem('zeron_notifications');
    let preloadedNotifications: Notification[] = [];
    if (storedNotifications) {
      preloadedNotifications = JSON.parse(storedNotifications);
    } else {
      preloadedNotifications = [
        {
          id: 'n1',
          userId: 'all',
          title: 'Zeron Arduino একাডেমিতে স্বাগতম!',
          message: 'আপনার সিট বুকিং সম্পন্ন হয়েছে। কোর্স পেমেন্ট সম্পন্ন করে দ্রুত মডিউল ক্লাসগুলো দেখা শুরু করুন।',
          date: '১১ জুলাই, ২০২৬',
          isRead: false
        },
        {
          id: 'n2',
          userId: 'all',
          title: 'নতুন রোবটিক্স কিট শিপমেন্ট নোটিশ',
          message: 'এই সপ্তাহের সব অর্ডার করা বক্স আগামীকাল দেশের যেকোনো ঠিকানায় হোম ডেলিভারি করতে পাঠিয়ে দেওয়া হবে।',
          date: '১০ জুলাই, ২০২৬',
          isRead: false
        }
      ];
      localStorage.setItem('zeron_notifications', JSON.stringify(preloadedNotifications));
    }
    setNotifications(preloadedNotifications);
  }, []);

  // Update session on active changes
  useEffect(() => {
    if (currentUser) {
      const updatedSessionUser = allUsers.find(u => u.id === currentUser.id);
      if (updatedSessionUser) {
        setCurrentUser(updatedSessionUser);
      }
    }
  }, [allUsers]);

  // Auth Operations
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleRegisterSuccess = (newUser: User) => {
    const updatedUsers = [...allUsers, newUser];
    setAllUsers(updatedUsers);
    localStorage.setItem('zeron_users', JSON.stringify(updatedUsers));
    
    // Auto-login registered student
    setCurrentUser(newUser);
    setCurrentView('dashboard');

    // Add personal welcome notification
    addNotification(
      'অ্যাকাউন্ট তৈরি হয়েছে!',
      'আমাদের রোবটিক্স কোর্সে রেজিস্ট্রেশন করার জন্য ধন্যবাদ! ভর্তি ফি পেমেন্ট সম্পন্ন করে কোর্স মডিউলগুলো আনলক করুন।',
      newUser.id
    );
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  // Generic DB update handlers (persists updates directly)
  const handleUpdateUser = (updatedUser: User) => {
    const updatedUsers = allUsers.map(u => u.id === updatedUser.id ? updatedUser : u);
    setAllUsers(updatedUsers);
    localStorage.setItem('zeron_users', JSON.stringify(updatedUsers));
  };

  const handleUpdateModules = (updatedModules: CourseModule[]) => {
    setModules(updatedModules);
    localStorage.setItem('zeron_modules', JSON.stringify(updatedModules));
  };

  const addNotification = (title: string, message: string, userId: string) => {
    const newNotif: Notification = {
      id: 'notif_' + Date.now(),
      userId,
      title,
      message,
      date: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
      isRead: false
    };
    const updatedNotifs = [newNotif, ...notifications];
    setNotifications(updatedNotifs);
    localStorage.setItem('zeron_notifications', JSON.stringify(updatedNotifs));
  };

  const markNotificationsRead = () => {
    if (!currentUser) return;
    const updatedNotifs = notifications.map(n => {
      if (n.userId === 'all' || n.userId === currentUser.id) {
        return { ...n, isRead: true };
      }
      return n;
    });
    setNotifications(updatedNotifs);
    localStorage.setItem('zeron_notifications', JSON.stringify(updatedNotifs));
  };

  // Payment submissions
  const handlePaymentSubmit = (method: PaymentMethod, phone: string, txId: string, screenshot: string) => {
    if (!currentUser) return;
    
    const updatedUser: User = {
      ...currentUser,
      paymentStatus: 'pending',
      paymentMethod: method,
      paymentPhone: phone,
      txId: txId,
      paymentScreenshot: screenshot
    };

    handleUpdateUser(updatedUser);
    setShowPaymentModal(false);

    // Global Notification to admin
    addNotification(
      'পেমেন্ট রিকোয়েস্ট জমা পড়েছে!',
      `${currentUser.name} পেমেন্ট সাবমিট করেছেন। ট্রানজেকশন আইডি: ${txId}`,
      'all'
    );
  };

  // Course FAQ data
  const faqData = [
    {
      q: 'কোর্সটি শুরু করতে কী কী জানা থাকা আবশ্যক?',
      a: 'কোর্সটি ডিজাইন করা হয়েছে একদম নতুনদের লক্ষ্য রেখে। আপনার কোনো কোডিং বা সার্কিটের পূর্ব অভিজ্ঞতা না থাকলেও আপনি শিখতে পারবেন। ইলেকট্রনিক্স ও সি++ কোডিং এর বেসিক থেকেই পুরো ক্লাস পরিচালনা করা হয়েছে।'
    },
    {
      q: 'কোর্সের সাথে রোবটিক্স কিট বক্স কীভাবে পাব?',
      a: 'কোর্সের পেমেন্ট সম্পন্ন হওয়ার পর আপনার সম্পূর্ণ ডেলিভারি ঠিকানা এবং ফোন নম্বর সংগ্রহ করা হবে। ২৪ ঘণ্টার মধ্যে আমরা সুন্দরবন কুরিয়ার অথবা পাঠাও দিয়ে সম্পূর্ণ ফ্রিতে কিট বক্সটি পাঠিয়ে দেব।'
    },
    {
      q: 'কোর্সের মডিউল বা ভিডিওগুলো কতদিন পর্যন্ত দেখতে পারব?',
      a: 'একবার কোর্স এনরোল করলে আপনি আজীবন (Lifetime Access) ভিডিও মডিউল, কুইজ এবং স্টাডি মেটেরিয়ালের অ্যাক্সেস পাবেন। যেকোনো আপডেট বা নতুন ক্লাসের নোটিফিকেশনও ফ্রিতে পাবেন।'
    },
    {
      q: 'কোনো সমস্যা বা প্রজেক্টে আটকে গেলে সাপোর্ট পাব কীভাবে?',
      a: 'আমাদের রয়েছে একটি ডেডিকেটেড সাপোর্ট গ্রুপ এবং ফোরাম। এছাড়াও প্রতি সপ্তাহে আমাদের লাইভ জুম সাপোর্ট ক্লাস অনুষ্ঠিত হয়, যেখানে আপনার স্ক্রিন শেয়ার বা ভিডিও কলে প্রজেক্টের সমস্যা সমাধান করা হয়।'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#0b0f19] text-slate-100">
      
      {/* Dynamic Navigation Header */}
      <Navbar
        currentUser={currentUser}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        onNavigate={(view) => setCurrentView(view)}
        currentView={currentView}
        notifications={notifications}
        onMarkNotificationsRead={markNotificationsRead}
      />

      {/* CORE VIEW ROUTER */}
      {currentView === 'home' && (
        <>
          {/* Main Landing Hero */}
          <Hero onEnrollNow={() => {
            if (currentUser) {
              setCurrentView('dashboard');
            } else {
              setShowAuthModal(true);
            }
          }} />

          {/* Key Advantages / Features section */}
          <section className="py-20 bg-[#0f172a]/40 border-t border-slate-900" id="features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-xs font-semibold text-teal-400">
                  <Flame className="h-4 w-4 text-teal-400" />
                  <span>Why Choose Zeron?</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">একাডেমির বিশেষত্বসমূহ</h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  অন্যান্য সাধারণ থিওরিটিক্যাল কোর্সের চেয়ে আমাদের মেথডোলজি আলাদা। এখানে শেখা ও প্রজেক্ট তৈরি দুই-ই চলে একসাথে।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Feature 1 */}
                <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4 hover:border-teal-500/20 transition-all text-left group">
                  <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-2xl w-fit text-teal-400 group-hover:bg-teal-500/20 transition-all">
                    <Layers className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-100">প্রফেশনাল রোবটিক্স কিট</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    ১৫টির বেশি ইলেকট্রনিক সেন্সর, অ্যাকচুয়েটর ও মোটর ড্রাইভার সহ সম্পুর্ণ একটি হোম ল্যাব সেটআপ কিট দেওয়া হবে আপনার ঠিকানায়।
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4 hover:border-teal-500/20 transition-all text-left group">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl w-fit text-blue-400 group-hover:bg-blue-500/20 transition-all">
                    <Award className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-100">ভেরিফাইড সার্টিফিকেট</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    কোর্সের সবগুলো ক্লাস, কুইজ এবং অ্যাসাইনমেন্ট শেষ করার পর পাবেন একটি ভেরিফাইড কিউআর কোড যুক্ত ডিজিটাল সার্টিফিকেট।
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4 hover:border-teal-500/20 transition-all text-left group">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl w-fit text-purple-400 group-hover:bg-purple-500/20 transition-all">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-100">১-অন-১ লাইভ সাপোর্ট</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    প্রজেক্টের সার্কিট মেলাতে বা কোড রান করতে সমস্যা হলে পাবেন ভিডিও সাপোর্ট টিম এবং ফোরাম সাপোর্ট ২৪ ঘণ্টা।
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* Interactive Course Curriculum section */}
          <CourseCurriculum
            modules={modules}
            onEnrollClick={() => {
              if (currentUser) {
                setCurrentView('dashboard');
              } else {
                setShowAuthModal(true);
              }
            }}
          />

          {/* Special Enrollment Pricing section */}
          <section className="py-20 bg-[#0f172a]/40 border-t border-slate-900 text-center" id="pricing">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              
              <div className="bg-gradient-to-tr from-[#005f63]/30 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 h-24 w-24 bg-teal-500/10 rounded-full blur-2xl" />
                
                <span className="px-3 py-1 bg-[#00979c]/10 text-teal-400 border border-[#00979c]/20 text-xs font-semibold rounded-full uppercase tracking-wider">
                  Limited Time Launch Offer
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-4">রোবোটিক্স উইথ আরডুইনো বিগিনার কোর্স</h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2 leading-relaxed">
                  ১২০০ টাকার স্পেশাল অফারে সম্পূর্ণ ক্লাস ভিডিও অ্যাক্সেস এবং হোম ল্যাব আরডুইনো কিট কুরিয়ার সহ ভর্তি সম্পন্ন করুন আজই!
                </p>

                <div className="flex flex-col items-center my-8">
                  <span className="text-[11px] text-slate-500 uppercase tracking-widest font-mono block">One-time payment</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-5xl font-black text-white">৳১২০০</span>
                    <span className="text-lg text-slate-500 line-through">৳৩০০০</span>
                  </div>
                  <p className="text-[10px] text-teal-400 font-mono mt-1 font-bold">✓ NO HIDDEN FEES • SHIPPING INCLUDED</p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 max-w-lg mx-auto border-t border-slate-850 pt-6">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>১৫+ মডিউল লেকচার ভিডিও</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>ফ্রি আরডুইনো কিট বক্স ডেলিভারি</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>লাইভ জুম ডাউট সলভিং</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (currentUser) {
                      setCurrentView('dashboard');
                    } else {
                      setShowAuthModal(true);
                    }
                  }}
                  className="mt-8 px-10 py-4 bg-gradient-to-r from-teal-400 to-[#00979c] hover:from-teal-500 hover:to-teal-600 text-slate-950 font-extrabold text-sm rounded-xl shadow-xl shadow-teal-500/20 transform hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  কোর্সে ভর্তি হোন <ArrowRight className="h-4 w-4 inline ml-1" />
                </button>

              </div>

            </div>
          </section>

          {/* Responsive FAQ Section */}
          <section className="py-20 bg-[#0b0f19] border-t border-slate-900 text-left" id="faq">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              
              <div className="text-center mb-12">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ (FAQ)</h3>
                <p className="text-xs text-slate-400 mt-1">কোর্স এবং হার্ডওয়্যার কিট সংক্রান্ত কিছু সাধারণ প্রশ্ন ও উত্তর।</p>
              </div>

              <div className="space-y-3">
                {faqData.map((item, index) => {
                  const isOpen = faqOpenIndex === index;
                  return (
                    <div 
                      key={index} 
                      className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/10 hover:border-slate-700 transition-all"
                    >
                      <button
                        onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                        className="w-full p-4 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                      >
                        <span className="text-sm font-bold text-slate-200">{item.q}</span>
                        <span className="text-slate-500 shrink-0">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-slate-950/20 border-t border-slate-900 text-xs text-slate-400 leading-relaxed">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </section>

          {/* Academy Footer info */}
          <footer className="bg-slate-950 border-t border-slate-900 py-12 text-xs text-slate-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
              
              {/* About Column */}
              <div className="space-y-3">
                <span className="text-white font-extrabold tracking-wider font-sans">ZERON TRAINING ACADEMY</span>
                <p className="leading-relaxed">
                  আরডুইনো ইলেকট্রনিক্স ও আইওটি ল্যাব বেসড এডুকেশন সহজ বাংলায় সবার কাছে পৌঁছে দিতে আমাদের পথচলা।
                </p>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-white transition-colors"><Github className="h-4 w-4" /></a>
                  <a href="#" className="hover:text-white transition-colors"><Linkedin className="h-4 w-4" /></a>
                  <a href="#" className="hover:text-white transition-colors"><Facebook className="h-4 w-4" /></a>
                </div>
              </div>

              {/* Links Column */}
              <div className="space-y-2">
                <span className="text-white font-bold block mb-2">কুইক লিংকস</span>
                <a href="#curriculum" className="block hover:text-white transition-colors">কোর্স সিলেবাস</a>
                <a href="#features" className="block hover:text-white transition-colors">একাডেমির বিশেষত্ব</a>
                <a href="#pricing" className="block hover:text-white transition-colors">অফারের বিস্তারিত</a>
                <a href="#faq" className="block hover:text-white transition-colors">এফএকিউ (FAQ)</a>
              </div>

              {/* Contact Column */}
              <div className="space-y-3">
                <span className="text-white font-bold block mb-2 font-sans">Contact Center</span>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-teal-400" /> +880 1840-025810</p>
                <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-teal-400" /> support@zeron.com</p>
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-teal-400" /> মিরপুর ১০, ঢাকা, বাংলাদেশ</p>
              </div>

            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900 mt-8 pt-8 text-center text-[10px] text-slate-600 font-mono">
              <p>© {new Date().getFullYear()} Zeron Training Academy. All Rights Reserved. Designed for premium education.</p>
            </div>
          </footer>
        </>
      )}

      {currentView === 'dashboard' && currentUser && (
        <StudentDashboard
          currentUser={currentUser}
          modules={modules}
          onUpdateUser={handleUpdateUser}
          onOpenPayment={() => setShowPaymentModal(true)}
        />
      )}

      {currentView === 'admin' && currentUser && currentUser.role === 'admin' && (
        <AdminPanel
          allUsers={allUsers}
          modules={modules}
          onUpdateUser={handleUpdateUser}
          onUpdateModules={handleUpdateModules}
          onAddNotification={addNotification}
        />
      )}

      {/* ALL DYNAMIC OVERLAY MODALS */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
          onRegisterSuccess={handleRegisterSuccess}
          allUsers={allUsers}
        />
      )}

      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSubmitPayment={handlePaymentSubmit}
        />
      )}

    </div>
  );
}
