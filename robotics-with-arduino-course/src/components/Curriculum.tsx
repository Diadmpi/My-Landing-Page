import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight, Layers, ArrowRight } from 'lucide-react';

export default function Curriculum() {
  const contents = [
    'আর্ডুইনো পরিচিতি এবং সেটআপ (Arduino Introduction and Setup)',
    'বেসিক প্রোগ্রামিং এবং সিনট্যাক্স (Basic programming and syntax)',
    'সেন্সর এবং অ্যাকচুয়েটরের ব্যবহার (Use of sensors and actuators)',
    'অ্যাডভান্সড প্রজেক্ট ডেভেলপমেন্ট (Advanced Project Development)',
    'অ্যাডভান্সড কোডিং নলেজ ডেভেলপমেন্ট (Advanced Coding Knowledge Development)',
  ];

  const outcomes = [
    'আর্ডুইনো ফান্ডামেন্টাল, এর ব্যবহার এবং আর্ডুইনো IDE সফটওয়্যার ইনস্টলেশন ও কনফিগারেশন সম্পর্কে শিখবেন।',
    'ডিজিটাল ও অ্যানালগ I/O অপারেশন সহ অ্যাডভান্সড প্রোগ্রামিং কনসেপ্ট এবং সঠিক কোডিং প্র্যাকটিস আয়ত্ত করবেন।',
    'সার্ভো মোটর, DC মোটর এবং রিলে সহ বিভিন্ন অ্যাকচুয়েটরের নিখুঁত নিয়ন্ত্রণ শিখবেন।',
    'ব্লুটুথ এবং RF মডিউল ব্যবহার করে ওয়্যারলেস কমিউনিকেশন এবং ডেটা ট্রান্সফার ইমপ্লিমেন্ট করতে পারবেন।',
    'লাইন ফলোয়ার, অবস্টাকল অ্যাভয়েডেন্স রোবট, সকার বট, হোম অটোমেশন এবং ওয়াটার প্ল্যান্ট মনিটরিং সিস্টেমের মতো উদ্ভাবনী প্রজেক্ট তৈরি করবেন।',
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-indigo-50/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-blue-100/40 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm mb-6 shadow-lg shadow-indigo-500/30">
            <Layers size={18} />
            <span>কারিকুলাম</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">আপনি যা যা শিখবেন</h2>
          <p className="text-slate-600 text-lg font-medium">
            বেসিক ইলেকট্রনিক্স থেকে শুরু করে অ্যাডভান্সড অটোনোমাস রোবটিক্স পর্যন্ত একটি পূর্ণাঙ্গ গাইডলাইন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Course Content Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] sticky top-8">
              <h3 className="text-3xl font-extrabold text-slate-900 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">কোর্সের বিষয়বস্তু</h3>
              <div className="space-y-5">
                {contents.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-100 transition-all hover:border-indigo-300 hover:shadow-md group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 font-bold mt-1 group-hover:text-indigo-700 transition-colors">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Learning Outcomes Right Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7"
          >
            <h3 className="text-3xl font-extrabold text-slate-900 mb-8 px-4 lg:px-0">কোর্স শেষে যা অর্জন করবেন</h3>
            <div className="space-y-6">
              {outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-5 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 hover:shadow-lg transition-shadow hover:border-teal-200 group">
                  <div className="bg-teal-50 p-2 rounded-full group-hover:bg-teal-500 transition-colors">
                    <CheckCircle2 className="w-8 h-8 text-teal-500 group-hover:text-white transition-colors shrink-0" />
                  </div>
                  <p className="text-slate-700 font-semibold leading-relaxed text-lg pt-1">{outcome}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[2rem] p-10 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-indigo-500/30 gap-6">
              <div>
                <h4 className="text-3xl font-bold mb-3">রোবট তৈরি শুরু করতে প্রস্তুত?</h4>
                <p className="text-blue-100 text-lg font-medium">আজই জয়েন করুন আমাদের মেকার কমিউনিটিতে।</p>
              </div>
              <a href="#enroll" className="whitespace-nowrap bg-white text-indigo-600 px-8 py-4 rounded-xl font-extrabold flex items-center gap-3 hover:bg-slate-50 hover:scale-105 transition-all shadow-lg">
                রেজিস্টার করুন <ArrowRight size={22} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
