import { useState, FormEvent } from 'react';
import { MembershipApplication, PageTab } from '../types';
import { MEMBERSHIP_PERKS } from '../data/mockData';
import { 
  MapPin, Mail, Phone, Clock, Send, CheckCircle2, Globe, Facebook, MessageSquare, 
  Search, AlertCircle, ShieldCheck, UserPlus, HelpCircle, UserCheck
} from 'lucide-react';
import { motion } from 'motion/react';

interface ContactProps {
  applications: MembershipApplication[];
  onAddApplication: (app: MembershipApplication) => void;
  setActiveTab: (tab: PageTab) => void;
}

export default function Contact({ applications, onAddApplication, setActiveTab }: ContactProps) {
  const [activeSection, setActiveSection] = useState<'membership' | 'contact'>('membership');

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  // Membership Tracking state
  const [trackQuery, setTrackQuery] = useState('');
  const [trackedResult, setTrackedResult] = useState<MembershipApplication | null | 'not_found'>(null);

  // Membership Application Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('রাজশাহী কলেজ');
  const [major, setMajor] = useState('রসায়ন (B.Sc Honours)');
  const [passingYear, setPassingYear] = useState('2024');
  const [tier, setTier] = useState('আজীবন সদস্য (Life Member)');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [membershipSuccessCode, setMembershipSuccessCode] = useState<string | null>(null);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactMessage) return;
    setContactSent(true);
  };

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
    setMembershipSuccessCode(trackingCode);
    setFullName('');
    setEmail('');
    setPhone('');
    setAdditionalInfo('');
  };

  return (
    <div className="w-full space-y-12 py-10 px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10 select-none">
      {/* Page Title & Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3"
      >
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
          সার্বক্ষণিক যোগাযোগ ও সদস্যপদ তথ্যকেন্দ্র
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          সদস্যপদ আবেদন ও যোগাযোগ (Contact & Membership)
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl mx-auto leading-relaxed">
          অনলাইনে নতুন অ্যালামনাই সদস্য পদের আবেদন করুন, আবেদনের ট্র্যাকিং যাচাই করুন, সদস্যপদ সুবিধাসমূহ জানুন অথবা বিভাগীয় অফিসে সরাসরি যোগাযোগ করুন।
        </p>

        {/* Section Toggle Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={() => setActiveSection('membership')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs shadow-md cursor-pointer transition-all ${
              activeSection === 'membership'
                ? 'bg-amber-500 text-slate-950 scale-105 border border-amber-400 font-extrabold'
                : 'bg-slate-900/60 backdrop-blur-md text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>সদস্যপদ আবেদন ও ট্র্যাকিং</span>
          </button>

          <button
            onClick={() => setActiveSection('contact')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs shadow-md cursor-pointer transition-all ${
              activeSection === 'contact'
                ? 'bg-amber-500 text-slate-950 scale-105 border border-amber-400 font-extrabold'
                : 'bg-slate-900/60 backdrop-blur-md text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>সরাসরি বার্তা ও যোগাযোগ</span>
          </button>

          <button
            onClick={() => setActiveTab('alumni')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-slate-900/60 backdrop-blur-md text-slate-300 border border-slate-800 hover:bg-slate-800 shadow-md cursor-pointer transition-all"
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span>অ্যালামনাই ডিরেক্টরি খুঁজুন</span>
          </button>
        </div>
      </motion.div>

      {/* SECTION 1: Membership Application & Tracking */}
      {activeSection === 'membership' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Tracking Box & Perks */}
            <div className="lg:col-span-6 space-y-8">
              {/* Tracking Card */}
              <div className="bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-md space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
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
                <h3 className="font-extrabold text-white text-base border-b border-slate-800 pb-3">
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

            {/* Right Column: Online Membership Form */}
            <div className="lg:col-span-6">
              <div className="bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-amber-600"></div>

                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
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

                {membershipSuccessCode ? (
                  <div className="p-8 text-center bg-emerald-950/40 rounded-2xl border border-emerald-800/50 space-y-4 animate-in zoom-in-95">
                    <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg text-xl font-bold">
                      ✓
                    </div>
                    <h4 className="text-lg font-bold text-white">অভিনন্দন! আপনার আবেদন সফলভাবে গৃহীত হয়েছে।</h4>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                      আপনার ট্র্যাকিং রেফারেন্স আইডি নিচে দেওয়া হলো। এটি সংরক্ষণ করুন:
                    </p>
                    <div className="font-mono bg-slate-950 border border-emerald-500 py-3 px-6 rounded-xl font-black text-lg text-emerald-400 shadow-inner inline-block">
                      {membershipSuccessCode}
                    </div>
                    <p className="text-[11px] text-slate-400 pt-2">
                      আমাদের কার্যনির্বাহী কমিটি আপনার তথ্য যাচাই করে ৩-৫ কার্যদিবসের মধ্যে ইমেইলে নিশ্চিতকরণ বার্তা পাঠাবে।
                    </p>
                    <button
                      onClick={() => setMembershipSuccessCode(null)}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                    >
                      নতুন আবেদন করুন
                    </button>
                  </div>
                ) : (
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

          {/* Qualification Banner */}
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
        </motion.div>
      )}

      {/* SECTION 2: Direct Contact & Office Details */}
      {activeSection === 'contact' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          {/* Left Col: Contact Info Cards */}
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

          {/* Right Col: Contact Form */}
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

              {contactSent ? (
                <div className="p-8 bg-emerald-950/40 rounded-2xl border border-emerald-800/50 text-center space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-white text-lg">আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                    ধন্যবাদ। আমাদের বিভাগীয় তথ্য কর্মকর্তা খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
                  </p>
                  <button
                    onClick={() => { setContactSent(false); setContactMessage(''); }}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-colors mt-2"
                  >
                    নতুন বার্তা পাঠান
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">আপনার নাম *</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="তানভীর আহমেদ"
                        className="w-full px-4 py-3 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">ইমেইল ঠিকানা *</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="tanvir@gmail.com"
                        className="w-full px-4 py-3 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">বিষয় (Subject)</label>
                    <input
                      type="text"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder="যেমন: পুনর্মিলনী নিবন্ধন বা সদস্যপদ ফি..."
                      className="w-full px-4 py-3 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">বিস্তারিত বার্তা *</label>
                    <textarea
                      rows={4}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
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
        </motion.div>
      )}
    </div>
  );
}
