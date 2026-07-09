import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Smartphone, CreditCard, Loader2, CheckCircle2 } from 'lucide-react';

export default function Enrollment() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    paymentMethod: 'bkash'
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 800);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  return (
    <section id="enroll" className="py-24 bg-gradient-to-b from-indigo-50/50 to-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">এনরোল করুন এবং <span className="text-indigo-600">আসন নিশ্চিত করুন</span></h2>
          <p className="text-slate-600 text-lg font-medium">ব্যাচে জয়েন করতে আপনার তথ্য দিন এবং পেমেন্ট সম্পন্ন করুন।</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row border border-slate-100">
          {/* Sidebar Info */}
          <div className="bg-slate-950 text-white p-10 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[60px]" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3">অর্ডার সামারি</h3>
              <p className="text-slate-400 font-medium mb-10">রোবটিক্স উইথ আর্ডুইনো - বিগিনার কোর্স</p>
              
              <div className="space-y-6 mb-10 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                <div className="flex justify-between text-base">
                  <span className="text-slate-400">কোর্স ফি</span>
                  <span className="font-bold">৮,০০০ ৳</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-slate-400">ডিসকাউন্ট</span>
                  <span className="font-bold text-emerald-400">০ ৳</span>
                </div>
                <div className="h-px bg-slate-700 my-2" />
                <div className="flex justify-between text-2xl font-extrabold">
                  <span>সর্বমোট</span>
                  <span className="text-cyan-400">৮,০০০ ৳</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-slate-400 font-medium bg-slate-900 p-4 rounded-xl relative z-10 border border-slate-800">
              <ShieldCheck size={24} className="text-emerald-400" />
              <span>সিকিউরড পেমেন্ট গেটওয়ে</span>
            </div>
          </div>

          {/* Form Area */}
          <div className="p-10 md:w-3/5 bg-white relative">
            {step === 1 && (
              <motion.form 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleNext}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">১</div>
                  <h3 className="text-2xl font-bold text-slate-900">শিক্ষার্থীর তথ্য</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">সম্পূর্ণ নাম</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-900"
                    placeholder="আপনার নাম লিখুন"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">ফোন নম্বর</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-900"
                      placeholder="01XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">ইমেইল ঠিকানা</label>
                    <input 
                      required
                      type="email" 
                      className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-900"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full mt-10 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-3 text-lg"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : 'পেমেন্ট করুন'}
                </button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handlePayment}
                className="space-y-8"
              >
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">২</div>
                    <h3 className="text-2xl font-bold text-slate-900">পেমেন্ট মাধ্যম</h3>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline bg-indigo-50 px-4 py-2 rounded-lg">এডিট করুন</button>
                </div>

                <div className="grid grid-cols-2 gap-5 mb-10">
                  <label className={`cursor-pointer rounded-2xl border-2 p-6 flex flex-col items-center gap-4 transition-all ${formData.paymentMethod === 'bkash' ? 'border-pink-500 bg-pink-50 shadow-md shadow-pink-500/20 scale-[1.02]' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}>
                    <input type="radio" name="payment" className="sr-only" checked={formData.paymentMethod === 'bkash'} onChange={() => setFormData({...formData, paymentMethod: 'bkash'})} />
                    <div className={`p-4 rounded-full ${formData.paymentMethod === 'bkash' ? 'bg-pink-100' : 'bg-slate-100'}`}>
                      <Smartphone className={`w-8 h-8 ${formData.paymentMethod === 'bkash' ? 'text-pink-600' : 'text-slate-500'}`} />
                    </div>
                    <span className={`font-bold text-lg ${formData.paymentMethod === 'bkash' ? 'text-pink-700' : 'text-slate-600'}`}>বিকাশ</span>
                  </label>
                  <label className={`cursor-pointer rounded-2xl border-2 p-6 flex flex-col items-center gap-4 transition-all ${formData.paymentMethod === 'nagad' ? 'border-orange-500 bg-orange-50 shadow-md shadow-orange-500/20 scale-[1.02]' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}>
                    <input type="radio" name="payment" className="sr-only" checked={formData.paymentMethod === 'nagad'} onChange={() => setFormData({...formData, paymentMethod: 'nagad'})} />
                    <div className={`p-4 rounded-full ${formData.paymentMethod === 'nagad' ? 'bg-orange-100' : 'bg-slate-100'}`}>
                      <Smartphone className={`w-8 h-8 ${formData.paymentMethod === 'nagad' ? 'text-orange-600' : 'text-slate-500'}`} />
                    </div>
                    <span className={`font-bold text-lg ${formData.paymentMethod === 'nagad' ? 'text-orange-700' : 'text-slate-600'}`}>নগদ</span>
                  </label>
                  <label className={`cursor-pointer rounded-2xl border-2 p-6 flex flex-col items-center gap-4 transition-all col-span-2 ${formData.paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-500/20 scale-[1.01]' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}>
                    <input type="radio" name="payment" className="sr-only" checked={formData.paymentMethod === 'card'} onChange={() => setFormData({...formData, paymentMethod: 'card'})} />
                    <div className={`flex gap-3 p-3 rounded-full ${formData.paymentMethod === 'card' ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                      <CreditCard className={`w-8 h-8 ${formData.paymentMethod === 'card' ? 'text-indigo-600' : 'text-slate-500'}`} />
                    </div>
                    <span className={`font-bold text-lg ${formData.paymentMethod === 'card' ? 'text-indigo-700' : 'text-slate-600'}`}>ক্রেডিট/ডেবিট কার্ড</span>
                  </label>
                </div>

                <div className="bg-blue-50/80 p-5 rounded-2xl text-sm text-blue-900 font-medium flex items-start gap-4 border border-blue-100">
                  <ShieldCheck className="shrink-0 mt-0.5 text-blue-600 w-6 h-6" />
                  <p className="leading-relaxed">"পেমেন্ট করুন" বাটনে ক্লিক করলে আপনাকে আমাদের সিকিউরড পেমেন্ট গেটওয়েতে নিয়ে যাওয়া হবে।</p>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 text-lg"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : '৮,০০০ ৳ পেমেন্ট করুন'}
                </button>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 size={50} />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-4">রেজিস্ট্রেশন সফল হয়েছে!</h3>
                <p className="text-slate-600 text-lg font-medium mb-10 leading-relaxed">স্বাগতম, <span className="font-bold text-slate-900">{formData.name}</span>। আপনার ইমেইল এবং ফোন নম্বরে আমরা কনফার্মেশন বিস্তারিত পাঠিয়ে দিয়েছি।</p>
                <button 
                  onClick={() => setStep(1)}
                  className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline bg-indigo-50 px-6 py-3 rounded-xl transition-colors inline-block"
                >
                  আরেকজন শিক্ষার্থীর জন্য রেজিস্টার করুন
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
