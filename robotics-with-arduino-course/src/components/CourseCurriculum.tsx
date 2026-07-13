import React, { useState } from 'react';
import { 
  Layers, Clock, HelpCircle, Award, Check, Cpu, Sparkles, BookOpen, 
  Tv, Compass, CheckCircle2, ShoppingBag, Terminal
} from 'lucide-react';
import { CourseModule } from '../types';

interface CourseCurriculumProps {
  modules: CourseModule[];
  onEnrollClick: () => void;
}

export default function CourseCurriculum({ modules, onEnrollClick }: CourseCurriculumProps) {
  const [activeAccordion, setActiveAccordion] = useState<string | null>('mod1');

  // Hardcoded kit list
  const kitComponents = [
    'Arduino Uno R3 Board with Cable',
    '830 Points Premium Breadboard',
    'SG90 TowerPro Servo Motor',
    'HC-SR04 Ultrasonic Sensor',
    'L298N Dual H-Bridge Motor Driver',
    'HC-05 Bluetooth Module',
    'Infrared (IR) Obstacle Sensor',
    'LDR Photoresistor (Light Sensor)',
    'Active & Passive Piezo Buzzers',
    'High Quality 5V Relay Module',
    '10x Red, Green, Yellow LEDs',
    '30x Resistors (220Ω, 1kΩ, 10kΩ)',
    '40x Male-to-Male Jumper Wires',
    '40x Male-to-Female Jumper Wires',
    '9V Battery with DC Jack Adapter'
  ];

  return (
    <section className="py-20 bg-[#0b0f19] text-left border-t border-slate-900/60" id="curriculum">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-xs font-semibold text-teal-400">
            <Compass className="h-3.5 w-3.5" />
            <span>Course Outline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">কোর্স কারিকুলাম ও মডিউল সিলেবাস</h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            বেসিক ইলেকট্রনিক্স থেকে শুরু করে ৫টি আলাদা প্রাক্টিক্যাল মডিউল এবং ডজন খানেক ল্যাব এক্সপেরিমেন্টের একটি কমপ্লিট ম্যাপ।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Syllabus Accordion Left */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase mb-4">MODULE BREAKDOWN</h3>
            
            {modules.map((m, index) => {
              const isOpen = activeAccordion === m.id;
              
              return (
                <div 
                  key={m.id} 
                  className={`border rounded-2xl overflow-hidden transition-all duration-350 ${
                    isOpen 
                      ? 'border-teal-500/30 bg-slate-900/40 shadow-xl shadow-teal-500/5' 
                      : 'border-slate-800 bg-slate-900/10 hover:border-slate-700'
                  }`}
                >
                  {/* Header */}
                  <button
                    onClick={() => setActiveAccordion(isOpen ? null : m.id)}
                    className="w-full p-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-teal-400 font-bold block mb-1">MODULE 0{index + 1}</span>
                      <h4 className="text-sm sm:text-base font-extrabold text-white">{m.title}</h4>
                    </div>
                    <span className="text-slate-500">
                      {isOpen ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </span>
                  </button>

                  {/* Body Content */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-900/80 space-y-4">
                      <p className="text-xs text-slate-400 leading-relaxed">{m.description}</p>
                      
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono font-semibold text-slate-500 uppercase tracking-wider block">CLASS LABS LIST</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {m.lessons.filter(l => l.published !== false).map(les => (
                            <div key={les.id} className="p-2.5 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center gap-3">
                              <div className="h-6 w-6 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-400 text-xs shrink-0 font-mono font-semibold">
                                ✓
                              </div>
                              <div className="truncate text-left">
                                <p className="text-xs font-semibold text-slate-300 truncate">{les.title}</p>
                                <span className="text-[9px] text-slate-500 font-mono">{les.duration} video</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quizzes and Assignments representation */}
                      <div className="flex gap-4 pt-3 text-[10px] font-mono">
                        {m.quiz && (
                          <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 font-semibold">
                            ✓ {m.quiz.questions.length} Quiz Questions
                          </span>
                        )}
                        {m.assignment && (
                          <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 font-semibold">
                            ✓ 1 Practical Project Assignment
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Electronic Box/Hardware representation Right */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">KIT INFORMATION</h3>
            
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
              {/* Box container layout */}
              <div className="absolute top-0 right-0 p-3 bg-teal-500/10 border-b border-l border-slate-850 rounded-bl-xl text-teal-400">
                <ShoppingBag className="h-5 w-5" />
              </div>

              <span className="text-[10px] font-mono text-teal-400 font-semibold uppercase tracking-wider">HARDWARE BOX INCLUDED</span>
              <h4 className="text-lg font-extrabold text-white mt-1">পূর্ণাঙ্গ ল্যাব কিট লিস্ট</h4>
              <p className="text-xs text-slate-400 mt-2">আমাদের রোবোটিক্স কোর্সে ভর্তির সাথে সাথে নিচের সকল প্রফেশনাল পার্টস ও সেন্সরের একটি বক্স আপনার ঠিকানায় কুরিয়ার করে দেওয়া হবে।</p>

              {/* Kit items list scroll */}
              <div className="mt-5 space-y-2 max-h-[260px] overflow-y-auto pr-2">
                {kitComponents.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 py-1 text-xs text-slate-300">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action enrollment link */}
              <div className="mt-6 pt-5 border-t border-slate-900 flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-slate-500 block font-mono">Box Shipping</span>
                  <span className="text-xs font-bold text-teal-400 font-mono">FREE HOME DELIVERY</span>
                </div>
                <button
                  onClick={onEnrollClick}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#00979c] to-cyan-400 hover:from-[#005f63] hover:to-[#00979c] text-slate-950 font-bold text-xs rounded-xl shadow cursor-pointer transition-all duration-300"
                >
                  অর্ডার করতে ভর্তি হোন
                </button>
              </div>

            </div>

            {/* Micro FAQ representation inside Curriculum sidebar */}
            <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl flex items-center gap-4">
              <div className="h-10 w-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 shrink-0">
                <Terminal className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h5 className="text-xs font-bold text-slate-200">সার্টিফিকেট কি ভেরিফাইড?</h5>
                <p className="text-[11px] text-slate-400 mt-1">হ্যাঁ! কোর্স শেষে প্রতিটি সার্টিফিকেটের একটি নির্দিষ্ট আইডি থাকবে, যা ওয়েবসাইট বা কিউআর কোড দিয়ে যেকোনো কোম্পানি যাচাই করতে পারবে।</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
