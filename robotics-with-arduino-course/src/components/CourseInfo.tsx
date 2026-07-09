import { motion } from 'motion/react';
import { Calendar, Clock, CreditCard, Users, Code, BookOpen } from 'lucide-react';

export default function CourseInfo() {
  const details = [
    {
      icon: BookOpen,
      title: 'কোর্স কোড',
      value: 'RAB-11',
      color: 'text-fuchsia-600',
      bg: 'bg-fuchsia-100',
      gradient: 'from-fuchsia-500/20 to-transparent'
    },
    {
      icon: Calendar,
      title: 'কোর্সের মেয়াদ',
      value: '২ মাস (৮ সপ্তাহ)',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      gradient: 'from-blue-500/20 to-transparent'
    },
    {
      icon: Clock,
      title: 'ক্লাস শিডিউল',
      value: 'সপ্তাহে ২ দিন (২ ঘণ্টা করে)',
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      gradient: 'from-orange-500/20 to-transparent'
    },
    {
      icon: CreditCard,
      title: 'কোর্স ফি',
      value: '৮,০০০ টাকা',
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
      gradient: 'from-emerald-500/20 to-transparent'
    },
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Graphic background */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:32px_32px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
      
      {/* Glowing orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-fuchsia-600/20 rounded-full blur-[80px]" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-cyan-600/20 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-5 py-2 rounded-full bg-cyan-900/50 border border-cyan-500/50 text-cyan-400 font-bold tracking-wide text-sm mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            কোর্সের রূপরেখা
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            আপনার যা কিছু জানা প্রয়োজন
          </h2>
          <p className="text-slate-300 text-lg font-medium">রোবটিক্সে আপনার ভবিষ্যতের জন্য সময়সূচি, প্রয়োজনীয়তা এবং ফি।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {details.map((detail, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-slate-800/80 backdrop-blur-md rounded-3xl p-8 border border-slate-700/50 text-center flex flex-col items-center relative overflow-hidden group hover:border-slate-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${detail.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${detail.bg} mb-6 relative z-10 shadow-lg`}>
                <detail.icon className={`w-10 h-10 ${detail.color}`} />
              </div>
              <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-3 relative z-10">{detail.title}</h3>
              <p className="text-2xl font-bold text-white relative z-10">{detail.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/80 backdrop-blur-md rounded-[2.5rem] p-10 border border-slate-700 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px]" />
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-white">ভর্তির যোগ্যতা</h3>
            </div>
            <ul className="space-y-5 relative z-10">
              {[
                'রোবটিক্স এবং ইলেকট্রনিক্সের জগত এক্সপ্লোর করতে আগ্রহী স্কুল শিক্ষার্থী।',
                'এমবেডেড সিস্টেমে প্র্যাকটিক্যাল জ্ঞান বাড়াতে ইচ্ছুক কলেজ ও বিশ্ববিদ্যালয়ের শিক্ষার্থী।',
                'রোবটিক্স সম্পর্কে আগ্রহী এবং ইনোভেটিভ প্রজেক্ট বানাতে প্যাশনেট যে কেউ।'
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4 text-slate-300 text-lg items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2.5 shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-cyan-900 to-blue-900 rounded-[2.5rem] p-10 border border-cyan-700 shadow-2xl shadow-cyan-900/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-[60px]" />
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="p-3 bg-cyan-500/20 rounded-xl">
                <Code className="w-8 h-8 text-cyan-300" />
              </div>
              <h3 className="text-3xl font-bold text-white">ক্যারিয়ার সুবিধা</h3>
            </div>
            <p className="text-cyan-100 text-lg mb-8 relative z-10">
              কোর্সটি সফলভাবে শেষ করার পর শিক্ষার্থীরা বিভিন্ন ইন্ডাস্ট্রির ইলেকট্রনিক্স ডিপার্টমেন্টে কাজের সুযোগ পাবেন এবং নিজের উদ্যোগেও কাজ করতে পারবেন।
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {[
                'ইলেকট্রনিক্স ম্যানুফ্যাকচারিং',
                'ফুড প্রসেসিং ইন্ডাস্ট্রি',
                'অটোমোবাইল ইন্ডাস্ট্রি',
                'স্টিল মিলস',
                'সেলফ-এমপ্লয়মেন্ট / বিজনেস'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-white bg-white/10 hover:bg-white/20 px-5 py-4 rounded-xl backdrop-blur-sm transition-colors border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  <span className="font-semibold">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
