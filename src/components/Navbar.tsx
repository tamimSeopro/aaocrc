import { PageTab } from '../types';
import { MapPin, ArrowRight, Menu, X, GraduationCap, ThumbsUp, Heart, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [likes, setLikes] = useState(() => {
    const saved = localStorage.getItem('aaa_likes');
    return saved ? parseInt(saved, 10) : 342;
  });
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    localStorage.setItem('aaa_likes', likes.toString());
  }, [likes]);

  const navItems: { label: string; tab: PageTab }[] = [
    { label: 'HOME', tab: 'home' },
    { label: 'ABOUT', tab: 'about' },
    { label: 'ALUMNI MEMBER', tab: 'alumni' },
    { label: 'MEMBERSHIP', tab: 'membership' },
    { label: 'EVENTS', tab: 'events' },
    { label: 'CONTACT', tab: 'contact' },
  ];

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg bg-slate-950/75 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Bar */}
      <div className="bg-[#0b192c]/90 text-white px-4 py-1.5 text-xs font-medium border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <span className="tracking-wide text-slate-300">Alumni Association of Chemistry</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-blue-900 via-indigo-800 to-amber-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden border border-slate-800">
              <img 
                src="https://6a3ffaa0f4f12d1dab644ce8.imgix.net/chemistry/chemistry logo.png" 
                alt="Chemistry Logo" 
                className="w-full h-full object-contain p-0.5"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-slate-100 text-lg sm:text-xl leading-tight tracking-tight">
              Alumni Association of Chemistry
            </h1>
            <span className="text-red-500 text-[11px] font-bold tracking-widest uppercase block mt-0.5">
              RAJSHAHI COLLEGE
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`px-3 py-2 text-xs font-bold tracking-wider rounded transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-amber-400 border border-slate-700/80 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Like & Admin CTA Button */}
          <span
            onClick={() => {
              setLikes((prev) => prev + 1);
              setIsLiking(true);
              setTimeout(() => setIsLiking(false), 800);
              handleNavClick('admin');
            }}
            className={`flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 text-slate-100 px-4 py-2 rounded-full font-bold text-xs shadow-md transition-all cursor-pointer relative overflow-hidden select-none ${
              isLiking ? 'scale-105 border-amber-500 shadow-amber-500/20' : ''
            }`}
            title="Like this page & access Admin Dashboard"
          >
            <ThumbsUp className={`w-3.5 h-3.5 text-amber-400 transition-transform ${
              isLiking ? 'scale-125 animate-bounce text-rose-500' : 'group-hover:scale-110'
            }`} />
            <span>Rajshahi College</span>
            {isLiking && (
              <span className="absolute inset-0 bg-amber-500/10 animate-ping rounded-full pointer-events-none"></span>
            )}
          </span>

          <button
            onClick={() => handleNavClick('membership')}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 px-5 py-2 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer group transform hover:-translate-y-0.5"
          >
            <span>আবেদন করুন</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:bg-slate-800 rounded-lg cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-t border-slate-800 px-4 pt-2 pb-4 shadow-2xl backdrop-blur-lg">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`text-left px-4 py-2.5 text-sm font-bold rounded-lg transition-colors ${
                    isActive ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <span
                onClick={() => {
                  setLikes((prev) => prev + 1);
                  setIsLiking(true);
                  setTimeout(() => setIsLiking(false), 800);
                  handleNavClick('admin');
                }}
                className="flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer select-none"
              >
                <ThumbsUp className={`w-3.5 h-3.5 text-amber-400 ${isLiking ? 'scale-125 text-rose-500 animate-bounce' : ''}`} />
                <span>Rajshahi College</span>
              </span>
              <button
                onClick={() => handleNavClick('membership')}
                className="flex items-center justify-center gap-2 bg-amber-500 text-slate-950 px-4 py-3 rounded-xl font-bold text-xs shadow-md"
              >
                <span>আবেদন করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
