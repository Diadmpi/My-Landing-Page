import React, { useState, useRef } from 'react';
import { X, Smartphone, Check, HelpCircle, Upload, AlertCircle, Sparkles } from 'lucide-react';
import { PaymentMethod } from '../types';

interface PaymentModalProps {
  onClose: () => void;
  onSubmitPayment: (method: PaymentMethod, phone: string, txId: string, screenshot: string) => void;
}

export default function PaymentModal({ onClose, onSubmitPayment }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('bkash');
  const [senderPhone, setSenderPhone] = useState('');
  const [txId, setTxId] = useState('');
  const [screenshotBase64, setScreenshotBase64] = useState<string>('');
  const [fileName, setFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample personal numbers
  const paymentNumbers = {
    bkash: '01840-025810 (Personal)',
    nagad: '01840-025811 (Personal)',
    rocket: '01840-025812-4 (Personal)'
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!senderPhone || !txId) {
      setError('অনুগ্রহ করে আপনার সেন্ডার মোবাইল নম্বর এবং ট্রানজেকশন আইডি দিন।');
      return;
    }

    if (!screenshotBase64) {
      setError('অনুগ্রহ করে পেমেন্ট স্ক্রিনশট আপলোড করুন।');
      return;
    }

    onSubmitPayment(selectedMethod, senderPhone, txId, screenshotBase64);
  };

  // Generate a random transaction ID for ease of use
  const generateMockTrx = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let mockId = 'TRX';
    for (let i = 0; i < 7; i++) {
      mockId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setTxId(mockId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm" id="payment-modal">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500/10 rounded-lg text-teal-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">ভর্তি ফি পেমেন্ট করুন</h3>
              <p className="text-xs text-slate-400">রুটিন অনুযায়ী কোর্স ফি ১২০০/- টাকা পেমেন্ট সম্পন্ন করুন</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-all"
            id="close-payment-btn"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form area */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 text-left">
          
          {/* Methods select */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400">পেমেন্ট মেথড নির্বাচন করুন</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedMethod('bkash')}
                className={`py-3.5 px-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  selectedMethod === 'bkash'
                    ? 'border-pink-500 bg-pink-500/10 text-pink-400 shadow-md'
                    : 'border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-400'
                }`}
              >
                <div className="h-6 w-12 bg-contain bg-center bg-no-repeat bg-[url('https://logos-download.com/wp-content/uploads/2022/01/bKash_Logo.png')] filter brightness-110 grayscale-0 group-hover:grayscale-0 shrink-0" style={{ height: '20px' }}>
                  {!selectedMethod.includes('bkash') && <span className="text-xs font-bold text-pink-500 font-mono">bKash</span>}
                </div>
                <span className="text-xs font-bold font-mono">bKash</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('nagad')}
                className={`py-3.5 px-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  selectedMethod === 'nagad'
                    ? 'border-orange-500 bg-orange-500/10 text-orange-400 shadow-md'
                    : 'border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-400'
                }`}
              >
                <span className="text-xs font-bold text-orange-500 font-mono">NAGAD</span>
                <span className="text-xs font-bold">নগদ</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('rocket')}
                className={`py-3.5 px-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  selectedMethod === 'rocket'
                    ? 'border-purple-500 bg-purple-500/10 text-purple-400 shadow-md'
                    : 'border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-400'
                }`}
              >
                <span className="text-xs font-bold text-purple-400 font-mono">ROCKET</span>
                <span className="text-xs font-bold">রকেট</span>
              </button>
            </div>
          </div>

          {/* Step Instructions */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-bold text-teal-400 font-mono block">ধাপসমূহ:</span>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
              <li>আপনার যেকোনো {selectedMethod} ওয়ালেট থেকে উপরে উল্লিখিত পার্সোনাল নম্বরে <strong>Send Money</strong> করুন।</li>
              <li>পেমেন্ট করার পর রিসিভ করা ট্রানজেকশন আইডি কপি করুন এবং একটি স্ক্রিনশট নিন।</li>
              <li>নিচের ফর্মে আপনার সেন্ডার ফোন নম্বর, ট্রানজেকশন আইডি এবং স্ক্রিনশট আপলোড করে সাবমিট করুন।</li>
            </ul>
            <div className="mt-3 pt-2.5 border-t border-slate-900 flex justify-between items-center">
              <span className="text-[11px] text-slate-400 font-semibold uppercase">{selectedMethod} Personal No:</span>
              <span className="text-xs font-bold text-white font-mono bg-slate-900 px-2.5 py-1 rounded border border-slate-800 select-all">
                {paymentNumbers[selectedMethod]}
              </span>
            </div>
          </div>

          {/* Form Fields */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">সেন্ডার মোবাইল নম্বর</label>
              <input
                type="tel"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full px-3.5 py-2.5 bg-slate-950 text-slate-100 text-sm border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-slate-400">ট্রানজেকশন আইডি (TxID)</label>
                <button
                  type="button"
                  onClick={generateMockTrx}
                  className="text-[10px] text-teal-400 hover:underline font-semibold"
                >
                  Generate Mock TxID
                </button>
              </div>
              <input
                type="text"
                value={txId}
                onChange={(e) => setTxId(e.target.value)}
                placeholder="উদা: 8K9J7M1N3"
                className="w-full px-3.5 py-2.5 bg-slate-950 text-slate-100 text-sm border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none font-mono"
                required
              />
            </div>
          </div>

          {/* File Upload (Drag and Drop / Manual Select) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-400">পেমেন্ট স্ক্রিনশট আপলোড করুন</label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                dragActive
                  ? 'border-teal-400 bg-teal-500/5'
                  : screenshotBase64
                  ? 'border-emerald-500/50 bg-emerald-500/5'
                  : 'border-slate-800 bg-slate-950 hover:bg-slate-900'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              {screenshotBase64 ? (
                <>
                  <div className="h-10 w-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-semibold text-emerald-400">স্ক্রিনশট আপলোড হয়েছে!</p>
                  <p className="text-[10px] text-slate-500 font-mono max-w-xs truncate">{fileName}</p>
                </>
              ) : (
                <>
                  <div className="h-10 w-10 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-400">
                    <Upload className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-medium text-slate-300">
                    এখানে ছবি ড্র্যাগ অ্যান্ড ড্রপ করুন অথবা <span className="text-teal-400 underline font-semibold">ব্রাউজ করুন</span>
                  </p>
                  <p className="text-[10px] text-slate-500">সমর্থিত ফরম্যাট: JPEG, PNG, WEBP (সর্বোচ্চ 5MB)</p>
                </>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-teal-400 to-[#00979c] hover:from-teal-500 hover:to-teal-600 text-slate-950 font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 mt-2 cursor-pointer text-center flex justify-center items-center gap-2"
          >
            তথ্য সাবমিট করুন
          </button>

        </form>
      </div>
    </div>
  );
}
