import { useState, FormEvent } from 'react';
import { MembershipApplication, PageTab } from '../types';
import { MEMBERSHIP_PERKS } from '../data/mockData';
import { Search, CheckCircle2, AlertCircle, ShieldCheck, UserPlus, FileText, Send, ArrowRight, HelpCircle } from 'lucide-react';

interface MembershipProps {
  applications: MembershipApplication[];
  onAddApplication: (app: MembershipApplication) => void;
  setActiveTab: (tab: PageTab) => void;
}

export default function Membership({ applications, onAddApplication, setActiveTab }: MembershipProps) {
  const [activeMode, setActiveMode] = useState<'tracking' | 'form'>('tracking');
  
  // Tracking state
  const [trackQuery, setTrackQuery] = useState('');
  const [trackedResult, setTrackedResult] = useState<MembershipApplication | null | 'not_found'>(null);

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('রাজশাহী কলেজ');
  const [major, setMajor] = useState('রসায়ন (B.Sc Honours)');
  const [passingYear, setPassingYear] = useState('2024');
  const [tier, setTier] = useState('আজীবন সদস্য (Life Member)');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const handleTrackSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;
    const found = applications.find(
      (a) => a.trackingCode.toLowerCase() === trackQuery.trim().toLowerCase() || a.email.toLowerCase() === trackQuery.trim().toLowerCase()
    );
    setTrackedResult(found || 'not_found');
  };

  const handleSubmitApplication = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;
    
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `RCCA-2026-${randomCode}`;
    
    const newApp: MembershipApplication = {
      id: `app-${Date.now()}`,
      trackingCode,
      fullName,
      email,
      phone,
      institution,
      major,
      passingYear,
      membershipTier: tier,
      additionalInfo,
      status: 'pending',
      appliedDate: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }),
    };

    onAddApplication(newApp);
    setFormSuccess(trackingCode);
    setFullName('');
    setEmail('');
    setPhone('');
    setAdditionalInfo('');
  };

  return (
    <div className="w-full space-y-12 py-10 max-w-7xl mx-auto px-6 relative z-10 select-none">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
          সদস্যপদ ও অ্যালামনাই নেটওয়ার্ক
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          সদস্যপদ ও অ্যালামনাই ডিরেক্টরি
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl mx-auto leading-relaxed">
          রাজশাহী কলেজ রসায়ন বিভাগের সম্মানিত কৃতি শিক্ষক ও অ্যালামনাই নেটওয়ার্কে যুক্ত হোন এবং দেশীয় ও আন্তর্জাতিক স্পেশাল নেটওয়ার্কের সাথে যুক্ত থাকুন।
        </p>

        {/* Action Toggle Buttons matching screenshot 6 */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={() => { setActiveMode('tracking'); setFormSuccess(null); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs shadow-md cursor-pointer transition-all ${
              activeMode === 'tracking'
                ? 'bg-amber-500 text-slate-950 scale-105 border border-amber-400'
                : 'bg-slate-900/60 backdrop-blur-md text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>সদস্যপদ আবেদন ও ট্র্যাকিং</span>
          </button>
          <button
            onClick={() => setActiveTab('alumni')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-slate-900/60 backdrop-blur-md text-slate-300 border border-slate-800 hover:bg-slate-800 shadow-md cursor-pointer transition-all"
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span>অ্যালামনাই ডিরেক্টরি খুঁজুন</span>
          </button>
        </div>
      </div>

      {/* Main Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Tracking Box & Perks (w-6/12) */}
        <div className="lg:col-span-6 space-y-8">
          {/* Tracking Card */}
          <div className="bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-md space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-850 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">আপনার আবেদনটি ট্র্যাক করুন</h3>
                <p className="text-xs text-slate-400">অনলাইন মেম্বারশিপ আবেদন যাচাইকরণ</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              সদস্যপদের আবেদনের স্ট্যাটাস জানতে নিচে আপনার ট্র্যাকিং রেফারেন্স আইডি (যেমন: <strong>RCCA-2026-1001</strong>) অথবা নিবন্ধিত ইমেইল ঠিকানাটি লিখুন।
            </p>

            {/* Opaque input field with no animation inside matching 'but not in text area' requirement */}
            <form onSubmit={handleTrackSearch} className="flex flex-col sm:flex-row gap-3 pt-1">
              <input
                type="text"
                required
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                placeholder="রেফারেন্স কোড বা ইমেইল লিখুন..."
                className="flex-1 px-4 py-3 bg-slate-950 text-white border border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-medium"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-xs shadow transition-all cursor-pointer shrink-0"
              >
                অনুসন্ধান
              </button>
            </form>

            {/* Tracking Output */}
            {trackedResult === 'not_found' && (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>দুঃখিত, এই কোড বা ইমেইলে কোনো আবেদন পাওয়া যায়নি। সঠিক তথ্য দিয়ে আবার চেষ্টা করুন।</span>
              </div>
            )}

            {trackedResult && trackedResult !== 'not_found' && (
              <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3 animate-in fade-in text-xs">
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                  <span className="font-bold text-white">{trackedResult.fullName}</span>
                  <span className="font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-bold text-[11px]">
                    {trackedResult.trackingCode}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <p><strong className="text-slate-400">স্তর:</strong> {trackedResult.membershipTier}</p>
                  <p><strong className="text-slate-400">ব্যাচ/সাল:</strong> {trackedResult.passingYear}</p>
                  <p><strong className="text-slate-400">তারিখ:</strong> {trackedResult.appliedDate}</p>
                  <p><strong className="text-slate-400">প্রতিষ্ঠান:</strong> {trackedResult.institution}</p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
                  <span className="text-slate-400">বর্তমান অবস্থা:</span>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase ${
                    trackedResult.status === 'approved'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                      : trackedResult.status === 'rejected'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800/50'
                      : 'bg-amber-950 text-amber-300 border border-amber-800/50 animate-pulse'
                  }`}>
                    {trackedResult.status === 'approved' ? '✓ অনুমোদিত (Approved)' : trackedResult.status === 'rejected' ? '✕ প্রত্যাখ্যাত' : '⏳ যাচাই হচ্ছে (Pending)'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Perks List Card */}
          <div className="bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-md space-y-4">
            <h3 className="font-extrabold text-white text-base border-b border-slate-850 pb-3">
              মেম্বারশিপের বিশেষ সুবিধা ও সুযোগ-সুবিধা
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              রসায়ন বিভাগ অ্যালামনাই অ্যাসোসিয়েশন, রাজশাহী কলেজ-এর সদস্য হওয়া মানে এক নতুন চমৎকার পেশাদার ও সামাজিক মহলে যুক্ত হওয়া। সদস্যগণ সরাসরি নিচে উল্লিখিত বিশেষ সুযোগ-সুবিধাসমূহ উপভোগ করতে পারেন:
            </p>
            <div className="space-y-2.5 pt-2 text-xs text-slate-300 font-medium">
              {MEMBERSHIP_PERKS.map((perk, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Online Membership Form (w-6/12) */}
        <div className="lg:col-span-6">
          <div className="bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-xl space-y-6 relative overflow-hidden">
            {/* Top gold line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-amber-600"></div>

            <div className="flex items-center justify-between border-b border-slate-850 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold shadow">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-lg">অনলাইন মেম্বারশিপ ফরম</h3>
                  <p className="text-xs text-slate-400">সহজ যাচাইকরণের মাধ্যমে যুক্ত হোন</p>
                </div>
              </div>
            </div>

            {formSuccess ? (
              <div className="p-8 text-center bg-emerald-950/40 rounded-2xl border border-emerald-800/50 space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg text-xl font-bold">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-white">অভিনন্দন! আপনার আবেদন সফলভাবে গৃহীত হয়েছে।</h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                  আপনার ট্র্যাকিং রেফারেন্স আইডি নিচে দেওয়া হলো। এটি সংরক্ষণ করুন:
                </p>
                <div className="font-mono bg-slate-950 border border-emerald-500 py-3 px-6 rounded-xl font-black text-lg text-emerald-400 shadow-inner inline-block">
                  {formSuccess}
                </div>
                <p className="text-[11px] text-slate-400 pt-2">
                  আমাদের কার্যনির্বাহী কমিটি আপনার তথ্য যাচাই করে ৩-৫ কার্যদিবসের মধ্যে ইমেইলে নিশ্চিতকরণ বার্তা পাঠাবে।
                </p>
                <button
                  onClick={() => setFormSuccess(null)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                >
                  নতুন আবেদন করুন
                </button>
              </div>
            ) : (
              /* All Inputs in Form are solid opaque - fulfilling 'but not in text area' requirement */
              <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">পূর্ণ নাম (Full Name) *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="যেমন: ড. তানভীর আহমেদ"
                    className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-slate-950 text-white transition-all font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">ইমেইল ঠিকানা *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tanvir@gmail.com"
                      className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-slate-950 text-white transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">ফোন নম্বর (WhatsApp সহ) *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01712-XXXXXX"
                      className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-slate-950 text-white transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">সর্বশেষ অধ্যয়নকৃত প্রতিষ্ঠান *</label>
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="যেমন: রাজশাহী কলেজ, রাজশাহী বিশ্ববিদ্যালয়"
                    className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-slate-950 text-white transition-all font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">অধ্যয়নের মূল বিষয় (MAJOR) *</label>
                    <input
                      type="text"
                      required
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                      placeholder="রসায়ন, ফলিত রসায়ন"
                      className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-slate-950 text-white transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">পাসের সাল (Passing Year) *</label>
                    <input
                      type="text"
                      required
                      value={passingYear}
                      onChange={(e) => setPassingYear(e.target.value)}
                      placeholder="যেমন: 2024"
                      className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-slate-950 text-white transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">সদস্যপদ ভিত্তি স্তর (Membership Tier) *</label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-slate-950 text-white font-semibold"
                  >
                    <option value="আজীবন সদস্য (Life Member)">আজীবন সদস্য (Life Member) - ৫,০০০ ৳</option>
                    <option value="সাধারণ সদস্য (General Member)">সাধারণ সদস্য (General Member) - ১,০০০ ৳</option>
                    <option value="দাতা সদস্য (Donor Member)">দাতা সদস্য (Donor Member) - ২৫,০০০ ৳</option>
                    <option value="সম্মানসূচক সদস্য (Honorary Member)">সম্মানসূচক সদস্য (Honorary Member)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">অতিরিক্ত তথ্য (ঐচ্ছিক)</label>
                  <textarea
                    rows={2}
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="গবেষণা থিসিস, কর্মস্থল বা কোনো মন্তব্য থাকলে লিখুন..."
                    className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-slate-950 text-white transition-all font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-3.5 px-6 rounded-xl font-extrabold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>আবেদনপত্র দাখিল করুন</span>
                </button>

                <p className="text-[11px] text-slate-400 text-center pt-1">
                  * দাখিল করার পর ট্র্যাকিং কোড দিয়ে উপরের ফর্ম থেকে যাচাই করতে পারবেন।
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Qualification Banner matching screenshot 6 bottom navy card */}
      <div className="bg-[#0b192c]/80 backdrop-blur-md rounded-2xl p-8 text-white shadow-xl border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <HelpCircle className="w-5 h-5" />
            <span>আবেদন করার সাধারণ যোগ্যতা</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
            <li>আবেদনকারীকে অবশ্যই রাজশাহী কলেজ রসায়ন বিভাগ থেকে স্নাতক বা স্নাতকোত্তর ডিগ্রিধারী হতে হবে।</li>
            <li>বর্তমান শিক্ষার্থীরা ফোরাম সদস্য হিসেবে নিবন্ধন করতে পারবেন।</li>
            <li>সদস্যপদের অনুমোদন পাওয়ার জন্য সঠিক শিক্ষাগত তথ্য ও সেশন সাল উল্লেখ করতে হবে।</li>
          </ul>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs shrink-0 cursor-pointer shadow transition-transform hover:scale-105"
        >
          এখনই ফরম পূরণ করুন
        </button>
      </div>
    </div>
  );
}
