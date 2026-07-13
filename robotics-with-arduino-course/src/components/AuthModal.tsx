import React, { useState } from 'react';
import { X, LogIn, UserPlus, Info, CheckCircle, Shield } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  onRegisterSuccess: (user: User) => void;
  allUsers: User[];
}

export default function AuthModal({ onClose, onLoginSuccess, onRegisterSuccess, allUsers }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [schoolCollege, setSchoolCollege] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Find matching user
      const user = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (user) {
        onLoginSuccess(user);
        onClose();
      } else {
        setError('ভুল ইমেইল অথবা পাসওয়ার্ড! অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } else {
      // Registration
      if (!name || !email || !password || !phone) {
        setError('সবগুলো বাধ্যতামূলক ঘর পূরণ করুন।');
        return;
      }
      const existingUser = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        setError('এই ইমেইলটি অলরেডি রেজিস্টার্ড! অনুগ্রহ করে লগইন করুন।');
        return;
      }

      const newUser: User = {
        id: 'user_' + Date.now(),
        name,
        email,
        password,
        role: 'student',
        paymentStatus: 'none',
        completedLessons: [],
        quizScores: {},
        submittedAssignments: {},
        registerDate: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
        phone,
        schoolCollege,
        profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
      };

      onRegisterSuccess(newUser);
      onClose();
    }
  };

  const fillDemoAccount = (roleType: 'unpaid' | 'paid' | 'admin') => {
    if (roleType === 'unpaid') {
      setEmail('student@zeron.com');
      setPassword('student123');
      setIsLogin(true);
    } else if (roleType === 'paid') {
      setEmail('enrolled@zeron.com');
      setPassword('student123');
      setIsLogin(true);
    } else {
      setEmail('admin@zeron.com');
      setPassword('admin123');
      setIsLogin(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" id="auth-modal">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-all"
          id="close-auth-btn"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Icons */}
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-teal-500/10 rounded-full border border-teal-500/20">
            {isLogin ? <LogIn className="h-6 w-6 text-teal-400" /> : <UserPlus className="h-6 w-6 text-teal-400" />}
          </div>
        </div>

        {/* Header Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-2">
          {isLogin ? 'Zeron-এ লগইন করুন' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}
        </h2>
        <p className="text-xs text-center text-slate-400 mb-6">
          {isLogin ? 'আপনার অ্যাকাউন্টে লগইন করে ক্লাসে জয়েন করুন' : 'অ্যাক্ল্যাডিমির অংশ হতে নিচের তথ্যগুলো দিন'}
        </p>

        {/* Demo Buttons */}
        <div className="mb-6 p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
          <span className="text-[10px] font-mono font-semibold text-slate-500 tracking-wider block uppercase">
            Quick Testing Demo Accounts
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => fillDemoAccount('unpaid')}
              className="px-2 py-1.5 bg-slate-900 hover:bg-slate-800 text-[10px] font-medium text-amber-400 border border-amber-500/20 rounded hover:border-amber-400/50 transition-all cursor-pointer"
            >
              Student (Unpaid)
            </button>
            <button
              onClick={() => fillDemoAccount('paid')}
              className="px-2 py-1.5 bg-slate-900 hover:bg-slate-800 text-[10px] font-medium text-emerald-400 border border-emerald-500/20 rounded hover:border-emerald-400/50 transition-all cursor-pointer"
            >
              Student (Paid)
            </button>
            <button
              onClick={() => fillDemoAccount('admin')}
              className="px-2 py-1.5 bg-slate-900 hover:bg-slate-800 text-[10px] font-medium text-teal-400 border border-teal-500/20 rounded hover:border-teal-400/50 transition-all cursor-pointer"
            >
              Admin Panel
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg flex items-center gap-2">
            <Info className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">পূর্ণ নাম (বাংলা বা ইংরেজি)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="উদা: নাইমুল ইসলাম"
                  className="w-full px-3.5 py-2.5 bg-slate-950 text-slate-100 text-sm border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">মোবাইল নম্বর</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="উদা: 017XXXXXXXX"
                  className="w-full px-3.5 py-2.5 bg-slate-950 text-slate-100 text-sm border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">স্কুল / কলেজ / বিশ্ববিদ্যালয়</label>
                <input
                  type="text"
                  value={schoolCollege}
                  onChange={(e) => setSchoolCollege(e.target.value)}
                  placeholder="উদা: ঢাকা কলেজ"
                  className="w-full px-3.5 py-2.5 bg-slate-950 text-slate-100 text-sm border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">ইমেইল ঠিকানা</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full px-3.5 py-2.5 bg-slate-950 text-slate-100 text-sm border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-slate-950 text-slate-100 text-sm border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#00979c] to-teal-400 hover:from-[#005f63] hover:to-[#00979c] text-slate-950 font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 mt-2 cursor-pointer"
          >
            {isLogin ? 'লগইন করুন' : 'রেজিস্ট্রেশন সম্পন্ন করুন'}
          </button>
        </form>

        {/* Toggle between login/register */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-400">
            {isLogin ? 'অ্যাকাউন্ট নেই?' : 'ইতোমধ্যে অ্যাকাউন্ট আছে?'}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="ml-1 text-teal-400 hover:underline font-semibold"
            >
              {isLogin ? 'রেজিস্টার করুন' : 'লগইন করুন'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
