import React, { useState, useEffect } from 'react';
import { Cpu, Play, Award, Layers, Users, Star, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onEnrollNow: () => void;
}

export default function Hero({ onEnrollNow }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState({ hrs: 14, mins: 45, secs: 30 });

  // Countdown simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) {
          return { ...prev, secs: prev.secs - 1 };
        } else if (prev.mins > 0) {
          return { ...prev, mins: prev.mins - 1, secs: 59 };
        } else if (prev.hrs > 0) {
          return { hrs: prev.hrs - 1, mins: 59, secs: 59 };
        } else {
          return { hrs: 12, mins: 0, secs: 0 }; // reset
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-[#0b0f19]" id="hero">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />

      {/* Decorative Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left: Text & CTA */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Promo Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-xs font-semibold text-teal-400">
              <Star className="h-3 w-3 fill-teal-400" />
              <span>Premium Hardware-Based Academy</span>
            </div>

            {/* Display Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Master Robotics with{' '}
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Arduino
              </span>{' '}
              from Scratch
            </h1>

            {/* Course Summary Description */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0">
              একটি সম্পূর্ণ প্রাক্টিক্যাল কোর্স যেখানে আপনি বেসিক ইলেকট্রনিক্স থেকে শুরু করে সেন্সর ইন্টারফেসিং, মোটর ড্রাইভ এবং ব্লুটুথ-নিয়ন্ত্রিত রোবট নিজের হাতে তৈরি করা শিখবেন। 
            </p>

            {/* Countdown Box */}
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 sm:p-5 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-slate-500 uppercase block tracking-wider">
                    Discount Ends In
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-bold text-teal-400 font-mono">
                      {String(timeLeft.hrs).padStart(2, '0')}
                    </span>
                    <span className="text-slate-600 text-xs">:</span>
                    <span className="text-2xl font-bold text-teal-400 font-mono">
                      {String(timeLeft.mins).padStart(2, '0')}
                    </span>
                    <span className="text-slate-600 text-xs">:</span>
                    <span className="text-2xl font-bold text-teal-400 font-mono">
                      {String(timeLeft.secs).padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-5">
                  <span className="text-xs text-slate-500 block font-mono">Course Fee</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-white">৳১২০০</span>
                    <span className="text-sm text-slate-500 line-through">৳৩০০০</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onEnrollNow}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00979c] to-cyan-400 hover:from-[#005f63] hover:to-[#00979c] text-slate-950 font-bold rounded-xl shadow-xl shadow-teal-500/20 transform hover:-translate-y-0.5 transition-all cursor-pointer"
                id="hero-enroll-btn"
              >
                Enroll Now <ArrowRight className="h-5 w-5 text-slate-950" />
              </button>
              <a
                href="#curriculum"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl border border-slate-800 transition-all"
              >
                <Play className="h-4 w-4 fill-slate-300 text-slate-300" /> View Syllabus
              </a>
            </div>

            {/* Micro Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-6 border-t border-slate-900 pt-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-400" />
                <span className="text-xs text-slate-400 font-medium"><strong className="text-slate-200">1,200+</strong> Enrolled Students</span>
              </div>
              <div className="h-4 w-[1px] bg-slate-800" />
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-400" />
                <span className="text-xs text-slate-400 font-medium"><strong className="text-slate-200">Verifiable</strong> Certificates</span>
              </div>
            </div>

          </div>

          {/* Hero Right: Animated Hardware Circuit Visual */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <div className="relative w-full max-w-sm aspect-square bg-gradient-to-tr from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden group">
              
              {/* Matrix lines overlay inside circuit container */}
              <div className="absolute inset-0 bg-[radial-gradient(#00979c20_1.5px,transparent_1.5px)] bg-[size:16px_16px] pointer-events-none" />

              {/* Glowing Arduino Core Board Graphic */}
              <div className="relative h-44 w-full bg-gradient-to-b from-[#005f63] to-[#00979c] rounded-2xl border border-teal-400/30 p-4 shadow-xl overflow-hidden flex flex-col justify-between">
                
                {/* Circuit Grid */}
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                </div>

                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                    <Cpu className="h-7 w-7 text-teal-400 animate-pulse" />
                  </div>
                  <span className="font-mono text-[9px] text-teal-200 font-bold bg-[#005f63]/80 px-2 py-0.5 rounded border border-teal-400/20">
                    ARDUINO UNO R3
                  </span>
                </div>

                {/* Circuit Track simulation */}
                <div className="w-full h-1 bg-slate-900/50 rounded-full relative overflow-hidden my-2">
                  <div className="absolute h-full w-[40%] bg-teal-400 rounded-full animate-infinite-scroll animate-[infinite-scroll_2s_linear_infinite]" />
                </div>

                <div className="flex justify-between items-end font-mono text-[9px] text-teal-100">
                  <div className="space-y-0.5">
                    <p>PWM PIN 3, 5, 6, 9, 10, 11</p>
                    <p>RX / TX COMMUNICATION</p>
                  </div>
                  <span className="text-[10px] font-bold text-white bg-slate-900/60 px-2 py-1 rounded">
                    5V INPUT
                  </span>
                </div>

              </div>

              {/* Hardware items representation */}
              <div className="grid grid-cols-2 gap-3 mt-4 z-10">
                <div className="bg-slate-950/80 border border-slate-900 p-3 rounded-xl flex items-center gap-3">
                  <div className="h-8 w-8 bg-teal-500/10 rounded-lg flex items-center justify-center">
                    <Layers className="h-4 w-4 text-teal-400" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono block">COMPONENTS</span>
                    <span className="text-xs font-bold text-slate-200">15+ Sensors Kit</span>
                  </div>
                </div>
                <div className="bg-slate-950/80 border border-slate-900 p-3 rounded-xl flex items-center gap-3">
                  <div className="h-8 w-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Star className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono block">EXPERIMENTS</span>
                    <span className="text-xs font-bold text-slate-200">10+ Robotics Labs</span>
                  </div>
                </div>
              </div>

              {/* Live Status indicator */}
              <div className="flex items-center justify-between border-t border-slate-900 pt-3 mt-3 z-10">
                <span className="text-[11px] text-slate-500 font-mono">ARDUINO CONNECTED</span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  PORT: COM3
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
