import { motion } from 'motion/react';
import { Target, Lightbulb, Cpu, Code } from 'lucide-react';

export default function Overview() {
  return (
    <section id="details" className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="absolute inset-0 bg-dot-slate-200/[0.8] bg-[length:16px_16px] pointer-events-none" />
      
      {/* Decorative blur elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-200/40 rounded-full mix-blend-multiply filter blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm mb-6 shadow-lg shadow-blue-500/30">
              <Lightbulb size={18} />
              <span>কোর্স ওভারভিউ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              আর্ডুইনোর সম্পূর্ণ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">সম্ভাবনা আনলক করুন</span>
            </h2>
            <div className="prose prose-lg text-slate-700 font-medium">
              <p className="mb-4">
                আর্ডুইনো (Arduino) একটি ওপেন-সোর্স ইলেকট্রনিক্স প্ল্যাটফর্ম যা সেন্সর বা মেসেজের মতো ইনপুট পড়তে পারে এবং সেগুলোকে আউটপুটে পরিণত করতে পারে। এর সহজ হার্ডওয়্যার এবং সফটওয়্যারের কারণে এটি বর্তমানে অগুনতি প্রোজেক্টের মূল চালিকাশক্তি।
              </p>
              <p className="mb-4">
                এই কোর্সটি আপনাকে বেসিক থেকে শুরু করে অ্যাডভান্সড স্কিল শেখাবে। আপনি আর্ডুইনো IDE মাস্টার করবেন, ডিজিটাল ও অ্যানালগ I/O অপারেশন শিখবেন এবং সার্ভো মোটর, DC মোটর ও রিলের মতো অ্যাকচুয়েটর নিয়ন্ত্রণ করতে পারবেন।
              </p>
              <p>
                এছাড়াও ব্লুটুথ এবং RF মডিউল দিয়ে ওয়্যারলেস কমিউনিকেশন এবং রিয়েল-লাইফ প্রজেক্ট (যেমন লাইন ফলোয়ার, অবস্টাকল অ্যাভয়েডেন্স, হোম অটোমেশন) তৈরি করার হাতে-কলমে অভিজ্ঞতা পাবেন।
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 lg:p-10 border border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] relative"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-500/5 to-indigo-500/5 pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-100 text-teal-800 font-bold text-sm mb-6">
              <Target size={18} />
              <span>আমাদের লক্ষ্য</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">
              আমরা যা অর্জন করতে চাই
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
              আর্ডুইনো প্ল্যাটফর্মের হার্ডওয়্যার এবং সফটওয়্যার উভয় দিক ফোকাস করে শিক্ষার্থীদের একটি শক্ত ভিত্তি তৈরি করা, যাতে তারা রোবটিক্স এবং অটোমেটেড সিস্টেম তৈরির ক্ষেত্রে এই জ্ঞান প্রয়োগ করতে পারে।
            </p>
            
            <div className="space-y-5 relative z-10">
              <h4 className="font-bold text-slate-900 text-xl border-b border-slate-200 pb-2">ব্যবহৃত মাইক্রোকন্ট্রোলার ও সফটওয়্যার:</h4>
              <ul className="space-y-4 mt-4">
                <li className="flex items-center gap-4 text-slate-800 font-semibold bg-gradient-to-r from-blue-50 to-white p-5 rounded-2xl shadow-sm border border-blue-100 transform transition-transform hover:scale-[1.02]">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Cpu size={24} />
                  </div>
                  আর্ডুইনো বোর্ডস (UNO, NANO, MEGA)
                </li>
                <li className="flex items-center gap-4 text-slate-800 font-semibold bg-gradient-to-r from-cyan-50 to-white p-5 rounded-2xl shadow-sm border border-cyan-100 transform transition-transform hover:scale-[1.02]">
                  <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
                    <Code size={24} />
                  </div>
                  আর্ডুইনো সফটওয়্যার (IDE)
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
