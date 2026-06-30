import { PageTab } from '../types';
import { Award, Mail, Calendar, Search, MapPin, Phone, Globe, Facebook, ArrowUp, CheckCircle2 } from 'lucide-react';
import { GraduationCap } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickBannerItems = [
    { icon: Award, title: 'সদস্যপদ', tab: 'membership' as PageTab },
    { icon: Mail, title: 'অনুসরণ করুন', tab: 'contact' as PageTab },
    { icon: Calendar, title: 'সেমিনার', tab: 'events' as PageTab },
    { icon: Search, title: 'ডিরেক্টরি', tab: 'alumni' as PageTab },
  ];

  return (
    <footer className="w-full bg-[#0d172a] text-slate-300 relative z-10 border-t border-slate-800">
      {/* Top Gold Banner Strip */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 shadow-md">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-amber-600/20">
          {quickBannerItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveTab(item.tab);
                  scrollToTop();
                }}
                className="flex flex-col sm:flex-row items-center justify-center gap-2 py-4 px-3 hover:bg-amber-600/10 transition-colors font-bold text-sm cursor-pointer group"
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform text-slate-900" />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1: Brand & About */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow overflow-hidden border border-slate-200">
              <img 
                src="https://6a3ffaa0f4f12d1dab644ce8.imgix.net/chemistry/chemistry logo.png" 
                alt="Chemistry Logo" 
                className="w-full h-full object-contain scale-[1.5]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm leading-tight">
                রসায়ন বিভাগ ও অ্যালামনাই অ্যাসোসিয়েশন
              </h3>
              <span className="text-[10px] text-amber-400 uppercase tracking-widest font-bold block mt-0.5">
                রাজশাহী কলেজ
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            ১৯০৯ সাল থেকে আমাদের এই ঐতিহ্যবাহী বিভাগের শিক্ষার্থীরা জাতীয় ও আন্তর্জাতিক পর্যায়ে গুরুত্বপূর্ণ অবদান রেখে চলেছে।
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-300 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://rc.edu.bd"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-300 transition-colors"
              aria-label="Website"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: সদস্যপদ (Membership) */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
            সদস্যপদ
          </h4>
          <ul className="space-y-2 text-xs text-slate-400 font-medium">
            <li 
              onClick={() => { setActiveTab('membership'); scrollToTop(); }}
              className="flex items-center gap-2 hover:text-amber-400 cursor-pointer transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>সদস্যপদের সুবিধাসমূহ</span>
            </li>
            <li 
              onClick={() => { setActiveTab('alumni'); scrollToTop(); }}
              className="flex items-center gap-2 hover:text-amber-400 cursor-pointer transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>অ্যালামনাই রেজিস্ট্রি খোঁজ</span>
            </li>
            <li 
              onClick={() => { setActiveTab('alumni'); scrollToTop(); }}
              className="flex items-center gap-2 hover:text-amber-400 cursor-pointer transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>সম্মানিত শিক্ষক ও কৃতি অ্যালামনাই</span>
            </li>
            <li 
              onClick={() => { setActiveTab('membership'); scrollToTop(); }}
              className="flex items-center gap-2 hover:text-amber-400 cursor-pointer transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>সদস্য প্রিভিলেজ ও কার্ড</span>
            </li>
          </ul>
        </div>

        {/* Col 3: সরকারি ওয়েবসাইট */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
            সরকারি ওয়েবসাইট
          </h4>
          <ul className="space-y-2 text-xs text-slate-400 font-medium">
            <li>
              <a
                href="https://rc.edu.bd"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
                <span>রসায়ন বিভাগ সরকারি ওয়েবসাইট</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: যোগাযোগ করুন */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
            যোগাযোগ করুন
          </h4>
          <div className="space-y-2.5 text-xs text-slate-400">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>রসায়ন বিজ্ঞান ভবন, রাজশাহী কলেজ, রাজশাহী - ৬০০০, বাংলাদেশ</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <a href="mailto:chemistry.raj.bd@gmail.com" className="hover:text-white transition-colors">
                chemistry.raj.bd@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>০১৭৫১-০৭০৪৯২ (প্রভাষক)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>০১৭১১-৯৮৮৩৯২ (অধ্যাপক সাজেদুল)</span>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Google Search Keywords Tag Section (Visually hidden for search engine crawlers) */}
      <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden" aria-hidden="true">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider">
              <Search className="w-3.5 h-3.5 text-amber-500" />
              <span>অনুসন্ধান ট্যাগ ও কি-ওয়ার্ডস (Google SEO Search Keywords)</span>
            </div>
            <p className="text-[10px] text-slate-500 max-w-3xl leading-relaxed">
              রাজশাহী কলেজ রসায়ন বিভাগের প্রাক্তন শিক্ষার্থী, শিক্ষকবৃন্দ এবং শুভাকাঙ্ক্ষীদের জন্য গুগলে সহজে অনুসন্ধানযোগ্য করতে নিচের ১০০টি গুরুত্বপূর্ণ কি-ওয়ার্ড ও অনুসন্ধান ট্যাগ যুক্ত করা হয়েছে।
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {[
                "Rajshahi College Chemistry", "Rajshahi College Chemistry Department", "Rajshahi College Chemistry Alumni", "Rajshahi College Chemistry Alumni Association", "Rajshahi College Chemistry Admission", "Rajshahi College Chemistry Faculty", "Rajshahi College Alumni", "Rajshahi College Chemistry Syllabus", "Rajshahi College Chemistry Notice", "Rajshahi College Chemistry Event", 
                "Rajshahi College Chemistry Department Website", "Rajshahi College Chemistry teachers", "Rajshahi College chemistry laboratory", "Rajshahi College chemistry seminar", "Rajshahi College chemistry alumni list", "Rajshahi College chemistry club", "RC Chemistry Department", "RC Chemistry Alumni", "RC Chemistry Association", "RC Chemistry Admission 2026", 
                "Rajshahi College Chemistry Honours", "Rajshahi College Chemistry Masters", "Rajshahi College Chemistry PhD", "Rajshahi College Chemistry Research", "Rajshahi College Chemistry Publications", "Rajshahi College Science Department", "Rajshahi College Alumni Portal", "Rajshahi College Chemistry Club", "RC Chemistry Alumni Committee", "Chemistry Department Rajshahi College", 
                "Chemistry Alumni Rajshahi College", "Rajshahi College chemistry news", "Rajshahi College chemistry department head", "Rajshahi College chemistry registration", "Rajshahi College chemistry membership", "Rajshahi College chemistry syllabus pdf", "Rajshahi College chemistry result", "Rajshahi College chemistry exam routine", "Rajshahi College chemistry class schedule", "Rajshahi College chemistry laboratory equipments", 
                "Rajshahi College chemistry career paths", "Rajshahi College chemistry job opportunities", "Rajshahi College chemistry scholarship", "Rajshahi College chemistry research group", "Rajshahi College chemistry publications list", "Rajshahi College chemistry journal", "Rajshahi College chemistry conference", "Rajshahi College chemistry workshop", "Rajshahi College chemistry reunion", "Rajshahi College chemistry picnic", 
                "রাজশাহী কলেজ রসায়ন বিভাগ", "রাজশাহী কলেজ রসায়ন অ্যালামনাই", "রাজশাহী কলেজ রসায়ন অ্যালামনাই অ্যাসোসিয়েশন", "রাজশাহী কলেজ রসায়ন ভর্তি", "রাজশাহী কলেজ রসায়ন শিক্ষক", "রাজশাহী কলেজ অ্যালামনাই", "রাজশাহী কলেজ রসায়ন সিলেবাস", "রাজশাহী কলেজ রসায়ন নোটিশ", "রাজশাহী কলেজ রসায়ন ইভেন্ট", "রাজশাহী কলেজ রসায়ন বিভাগীয় ওয়েবসাইট", 
                "রাজশাহী কলেজ রসায়ন শিক্ষকবৃন্দ", "রাজশাহী কলেজ রসায়ন গবেষণাগার", "রাজশাহী কলেজ রসায়ন সেমিনার", "রাজশাহী কলেজ রসায়ন অ্যালামনাই তালিকা", "রাজশাহী কলেজ রসায়ন ক্লাব", "আরসি রসায়ন বিভাগ", "আরসি রসায়ন অ্যালামনাই", "আরসি রসায়ন অ্যাসোসিয়েশন", "আরসি রসায়ন ভর্তি ২০২৬", "রাজশাহী কলেজ রসায়ন অনার্স", 
                "রাজশাহী কলেজ রসায়ন মাস্টার্স", "রাজশাহী কলেজ রসায়ন পিএইচডি", "রাজশাহী কলেজ রসায়ন গবেষণা", "রাজশাহী কলেজ রসায়ন প্রকাশনা", "রাজশাহী কলেজ বিজ্ঞান বিভাগ", "রাজশাহী কলেজ অ্যালামনাই পোর্টাল", "রাজশাহী কলেজ রসায়ন ক্লাব", "আরসি রসায়ন অ্যালামনাই কমিটি", "রসায়ন বিভাগ রাজশাহী কলেজ", "রসায়ন অ্যালামনাই রাজশাহী কলেজ", 
                "রাজশাহী কলেজ রসায়ন খবর", "রাজশাহী কলেজ রসায়ন বিভাগীয় প্রধান", "রাজশাহী কলেজ রসায়ন নিবন্ধন", "রাজশাহী কলেজ রসায়ন সদস্যপদ", "রাজশাহী কলেজ রসায়ন সিলেবাস পিডিএফ", "রাজশাহী কলেজ রসায়ন ফলাফল", "রাজশাহী কলেজ রসায়ন পরীক্ষার রুটিন", "রাজশাহী কলেজ রসায়ন ক্লাস শিডিউল", "রাজশাহী কলেজ রসায়ন ল্যাবরেটরি যন্ত্রপাতি", "রাজশাহী কলেজ রসায়ন ক্যারিয়ার পাথ", 
                "রাজশাহী কলেজ রসায়ন চাকরির সুযোগ", "রাজশাহী কলেজ রসায়ন বৃত্তি", "রাজশাহী কলেজ রসায়ন গবেষণা গ্রুপ", "রাজশাহী কলেজ রসায়ন প্রকাশনা তালিকা", "রাজশাহী কলেজ রসায়ন জার্নাল", "রাজশাহী কলেজ রসায়ন সম্মেলন", "রাজশাহী কলেজ রসায়ন কর্মশালা", "রাজশাহী কলেজ রসায়ন পুনর্মিলনী", "রাজশাহী কলেজ রসায়ন পিকনিক", "রাজশাহী কলেজ রসায়ন অনুষ্ঠান"
              ].map((tag, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-500 hover:text-amber-400 hover:border-amber-500/30 transition-all cursor-default select-all"
                >
                  #{tag.replace(/\s+/g, '')}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#080e1a] px-6 py-4 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            কপিরাইট © রসায়ন অ্যালামনাই অ্যাসোসিয়েশন, রাজশাহী কলেজ ২০২৬ | সর্বস্বত্ব সংরক্ষিত।
          </p>
          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
