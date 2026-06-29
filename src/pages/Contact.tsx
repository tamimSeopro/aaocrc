import { useState, FormEvent } from 'react';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2, Globe, Facebook, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setSent(true);
  };

  return (
    <div className="w-full space-y-16 py-10 max-w-7xl mx-auto px-6 relative z-10 select-none">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
          সার্বক্ষণিক সরাসরি যোগাযোগ
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          যোগাযোগ করুন (Contact Us)
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          বিভাগীয় যেকোনো তথ্য, অ্যালামনাই পুনর্মিলনী নিবন্ধন বা সদস্যপদ সংক্রান্ত যেকোনো জিজ্ঞাসার জন্য আমাদের সাথে যোগাযোগ করতে পারেন।
        </p>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Col: Contact Cards (w-5/12) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0b192c]/80 backdrop-blur-md text-white p-8 rounded-2xl shadow-xl space-y-6 border border-slate-800/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>

            <h3 className="text-xl font-extrabold text-white border-b border-slate-800 pb-3">
              বিভাগীয় প্রধান কার্যালয়
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg shrink-0 mt-0.5 border border-amber-500/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-white block">ঠিকানা:</span>
                  <p className="leading-relaxed text-slate-300">
                    রসায়ন বিজ্ঞান ভবন, রাজশাহী কলেজ, রাজশাহী - ৬০০০, বাংলাদেশ
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg shrink-0 border border-amber-500/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-white block">ইমেইল:</span>
                  <a href="mailto:chemistry.raj.bd@gmail.com" className="text-amber-400 hover:underline">
                    chemistry.raj.bd@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg shrink-0 border border-amber-500/10">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-white block">হটলাইন ও মোবাইল:</span>
                  <p className="text-slate-300">০১৭৫১-০৭০৪৯২ (প্রভাষক)</p>
                  <p className="text-slate-300">০১৭১১-৯৮৮৩৯২ (অধ্যাপক সাজেদুল)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-2 border-t border-slate-800">
                <div className="p-2 bg-slate-800 text-slate-300 rounded-lg shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 text-xs text-slate-400">
                  <span className="font-bold text-slate-200 block">অফিস সময়:</span>
                  <p>রবিবার - বৃহস্পতিবার (সকাল ৯:০০ - বিকাল ৪:০০)</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all border border-slate-700"
              >
                <Facebook className="w-4 h-4 text-blue-400" />
                <span>Facebook পেজ</span>
              </a>
              <a
                href="https://rc.edu.bd"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all border border-slate-700"
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>কলেজ ওয়েবসাইট</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Col: Contact Message Form (w-7/12) */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/60 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-slate-800/80 shadow-lg space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl font-bold border border-amber-500/20">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">বার্তা বা জিজ্ঞাসা পাঠান</h3>
                <p className="text-xs text-slate-400">আমরা ২৪ ঘণ্টার মধ্যে ইমেইলে উত্তর দেব</p>
              </div>
            </div>

            {sent ? (
              <div className="p-8 bg-emerald-950/40 rounded-2xl border border-emerald-800/50 text-center space-y-3 animate-in zoom-in-95">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-lg">আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  ধন্যবাদ। আমাদের বিভাগীয় তথ্য কর্মকর্তা খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
                </p>
                <button
                  onClick={() => { setSent(false); setMessage(''); }}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-colors mt-2"
                >
                  নতুন বার্তা পাঠান
                </button>
              </div>
            ) : (
              /* All Inputs are solid opaque - fulfilling 'but not in text area' requirement */
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">আপনার নাম *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="তানভীর আহমেদ"
                      className="w-full px-4 py-3 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">ইমেইল ঠিকানা *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tanvir@gmail.com"
                      className="w-full px-4 py-3 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">বিষয় (Subject)</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="যেমন: পুনর্মিলনী নিবন্ধন বা মেম্বারশিপ ফি..."
                    className="w-full px-4 py-3 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">বিস্তারিত বার্তা *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="আপনার জিজ্ঞাসা বা মন্তব্য লিখুন..."
                    className="w-full px-4 py-3 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-3.5 px-6 rounded-xl font-extrabold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>বার্তা প্রেরণ করুন</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
