import { motion } from 'motion/react';
import { ArrowRight, Bot, Cpu, Zap, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-24 pb-32">
      {/* Graphic Patterns */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />
      <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-teal-500 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-sm font-bold mb-8 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <Bot size={18} />
            <span>জেরন ট্রেনিং একাডেমি (Zerone Training Academy)</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
          >
            রোবটিক্স উইথ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500">আর্ডুইনো</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed font-medium"
          >
            বিগিনার কোর্স। শিখুন, বড় হোন, সফল হোন। <br className="hidden md:block"/> ইলেকট্রনিক্স এবং অটোমেশনের দুনিয়ায় আপনার যাত্রা শুরু করুন।
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <a
              href="#enroll"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] flex items-center justify-center gap-2 transform hover:-translate-y-1"
            >
              এখনই এনরোল করুন
              <ArrowRight size={20} />
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('সিস্টেম ইন্টিগ্রেশন চলমান। পিডিএফ ডাউনলোড শীঘ্রই চালু হবে।');
              }}
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md text-white rounded-xl font-bold text-lg transition-all border border-slate-600 hover:border-slate-400 flex items-center justify-center gap-2"
            >
              <Download size={20} />
              সিলেবাস ডাউনলোড
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {[
            { icon: Cpu, title: 'হাতে-কলমে প্র্যাকটিক্যাল', desc: 'বাস্তব হার্ডওয়্যার দিয়ে প্রজেক্ট তৈরি', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
            { icon: Zap, title: 'পূর্ব অভিজ্ঞতার প্রয়োজন নেই', desc: 'একেবারে নতুনদের জন্য পারফেক্ট', color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/30' },
            { icon: Bot, title: 'বাস্তব রোবট তৈরি করুন', desc: 'লাইন ফলোয়ার, সকার বট ও আরও অনেক কিছু', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
          ].map((feature, idx) => (
            <div key={idx} className={`bg-slate-900/60 backdrop-blur-xl border ${feature.border} p-8 rounded-2xl text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl`}>
              <div className={`w-16 h-16 mx-auto ${feature.bg} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
