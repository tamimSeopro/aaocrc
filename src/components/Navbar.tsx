import { PageTab, ThemeMode } from '../types';
import { MapPin, Menu, X, GraduationCap, ThumbsUp, Heart, Lock, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
}

export default function Navbar({ activeTab, setActiveTab, theme = 'dark', onToggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [likes, setLikes] = useState(() => {
    const saved = localStorage.getItem('aaa_likes');
    return saved ? parseInt(saved, 10) : 342;
  });
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    localStorage.setItem('aaa_likes', likes.toString());
  }, [likes]);

  const navItems: { label: string; tab: PageTab; href: string }[] = [
    { label: 'HOME', tab: 'home', href: '/' },
    { label: 'ABOUT', tab: 'about', href: '/about' },
    { label: 'ALUMNI MEMBER', tab: 'alumni', href: '/alumni' },
    { label: 'EVENTS', tab: 'events', href: '/events' },
    { label: 'MEMBERSHIP', tab: 'membership', href: '/membership' },
    { label: 'CONTACT', tab: 'contact', href: '/contact' },
  ];

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg bg-slate-950/75 backdrop-blur-md border-b border-slate-800/80">
      {/* Main Navbar */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-3 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <a 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-blue-900 via-indigo-800 to-amber-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden border border-slate-200">
              <img 
                src="/logo.png" 
                alt="Rajshahi College Logo" 
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
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <a
                key={item.tab}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.tab);
                }}
                className={`px-3 py-2 text-xs font-bold tracking-wider rounded transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-amber-400 border border-slate-700/80 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Switch (Dark / White Mode Option) */}
          <button
            type="button"
            onClick={onToggleTheme}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-bold text-xs shadow-md transition-all cursor-pointer border select-none ${
              theme === 'light'
                ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300 shadow-amber-200/50'
                : 'bg-slate-900/90 hover:bg-slate-800 text-amber-400 border-slate-800 hover:border-amber-500/50'
            }`}
            title={theme === 'light' ? 'ডার্ক মোডে পরিবর্তন করুন (Switch to Dark)' : 'হোয়াইট ব্যাকগ্রাউন্ড মোড (Switch to White Mode)'}
            aria-label="Theme toggle switch"
          >
            {theme === 'light' ? (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-700 fill-indigo-200" />
                <span className="hidden md:inline">ডার্ক মোড</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                <span className="hidden md:inline">হোয়াইট মোড</span>
              </>
            )}
          </button>

          {/* Like & Admin CTA Button */}
          <span
            onClick={() => {
              setLikes((prev) => prev + 1);
              setIsLiking(true);
              setTimeout(() => setIsLiking(false), 800);
              handleNavClick('admin');
            }}
            className={`flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 text-slate-100 px-3 sm:px-4 py-2 rounded-full font-bold text-xs shadow-md transition-all cursor-pointer relative overflow-hidden select-none ${
              isLiking ? 'scale-105 border-amber-500 shadow-amber-500/20' : ''
            }`}
            title="Like this page & access Admin Dashboard"
          >
            <ThumbsUp className={`w-3.5 h-3.5 text-amber-400 transition-transform ${
              isLiking ? 'scale-125 animate-bounce text-rose-500' : 'group-hover:scale-110'
            }`} />
            <span className="hidden xs:inline">Rajshahi College</span>
            {isLiking && (
              <span className="absolute inset-0 bg-amber-500/10 animate-ping rounded-full pointer-events-none"></span>
            )}
          </span>

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
                <a
                  key={item.tab}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.tab);
                  }}
                  className={`text-left px-4 py-2.5 text-sm font-bold rounded-lg transition-colors block ${
                    isActive ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            
            {/* Theme Toggle in Mobile Menu */}
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  if (onToggleTheme) onToggleTheme();
                }}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md border transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
                    : 'bg-slate-900 text-amber-400 border-slate-800 hover:border-amber-500/50'
                }`}
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-4 h-4 text-indigo-700" />
                    <span>ডার্ক মোডে পরিবর্তন করুন (Dark Mode)</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>হোয়াইট ব্যাকগ্রাউন্ড মোড (White Mode)</span>
                  </>
                )}
              </button>

              <span
                onClick={() => {
                  setLikes((prev) => prev + 1);
                  setIsLiking(true);
                  setTimeout(() => setIsLiking(false), 800);
                  handleNavClick('admin');
                }}
                className="flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer select-none w-full"
              >
                <ThumbsUp className={`w-3.5 h-3.5 text-amber-400 ${isLiking ? 'scale-125 text-rose-500 animate-bounce' : ''}`} />
                <span>Rajshahi College (অ্যাডমিন ড্যাশবোর্ড)</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
