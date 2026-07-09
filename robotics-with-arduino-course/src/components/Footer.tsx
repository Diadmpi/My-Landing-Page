import { MapPin, Phone, Globe, Bot } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          
          <div>
            <div className="flex items-center gap-3 text-white font-bold text-2xl mb-8">
              <div className="p-2 bg-cyan-500/20 rounded-xl">
                <Bot className="text-cyan-400 w-8 h-8" />
              </div>
              <span>জেরন ট্রেনিং একাডেমি</span>
            </div>
            <p className="text-base leading-relaxed mb-8 font-medium">
              রোবটিক্স, ইলেকট্রনিক্স এবং এমবেডেড সিস্টেমে অ্যাডভান্সড স্কিল প্রদানের মাধ্যমে আগামী প্রজন্মের ইনোভেটর তৈরি করাই আমাদের লক্ষ্য।
            </p>
            <div className="text-sm bg-slate-900/50 p-5 rounded-xl border border-slate-800">
              <p className="font-bold text-slate-300">বি.দ্র:</p>
              <p className="mt-2 text-slate-400">সাফল্যের সাথে সম্পূর্ণ কোর্স সম্পন্ন করার পরই শিক্ষার্থীরা সার্টিফিকেট পাবেন।</p>
              <p className="mt-2 text-slate-500 text-xs">*প্রয়োজনবোধে কোর্স আউটলাইনে পরিবর্তন বা আপডেট আনা হতে পারে।</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xl mb-8">যোগাযোগ এবং ঠিকানা</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="p-2 bg-slate-900 rounded-lg shrink-0 border border-slate-800">
                  <MapPin className="text-cyan-500" size={20} />
                </div>
                <span className="text-base font-medium leading-relaxed mt-1">
                  প্লট-০৩, রোড-০৪, সেকশন ৬/এ, <br/>
                  মিরপুর-২ (মিরপুর শেরে বাংলা স্টেডিয়ামের ৪নং গেটের বিপরীতে),<br/>
                  ঢাকা-১২১৬।
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-2 bg-slate-900 rounded-lg shrink-0 border border-slate-800">
                  <Phone className="text-cyan-500" size={20} />
                </div>
                <span className="text-base font-bold text-slate-300">+8801894801155</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-2 bg-slate-900 rounded-lg shrink-0 border border-slate-800">
                  <Globe className="text-cyan-500" size={20} />
                </div>
                <a href="https://www.training.zeronebd.com" target="_blank" rel="noreferrer" className="text-base font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
                  www.training.zeronebd.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xl mb-8">গুরুত্বপূর্ণ লিংক</h4>
            <ul className="space-y-4 text-base font-medium">
              <li><a href="#details" className="hover:text-cyan-400 hover:pl-2 transition-all flex items-center gap-2">&rarr; কোর্স ওভারভিউ</a></li>
              <li><a href="#enroll" className="hover:text-cyan-400 hover:pl-2 transition-all flex items-center gap-2">&rarr; এখনই এনরোল করুন</a></li>
              <li><a href="#" className="hover:text-cyan-400 hover:pl-2 transition-all flex items-center gap-2">&rarr; প্রাইভেসি পলিসি</a></li>
              <li><a href="#" className="hover:text-cyan-400 hover:pl-2 transition-all flex items-center gap-2">&rarr; টার্মস অফ সার্ভিস</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-16 pt-10 text-center text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Zerone Training Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
