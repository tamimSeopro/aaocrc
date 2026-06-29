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
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shadow overflow-hidden border border-slate-800">
              <img 
                src="https://6a3ffaa0f4f12d1dab644ce8.imgix.net/chemistry/chemistry logo.png" 
                alt="Chemistry Logo" 
                className="w-full h-full object-contain p-0.5"
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
            <li 
              onClick={() => { setActiveTab('admin'); scrollToTop(); }}
              className="flex items-center gap-2 hover:text-amber-400 cursor-pointer transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-semibold text-slate-300 hover:text-amber-400">অ্যাডমিন পোর্টাল (Admin Portal)</span>
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
