import { PageTab, TeacherQuote, NoticeItem, EventItem, GallerySlide } from '../types';
import { MEMBERSHIP_PERKS } from '../data/mockData';
import { ChevronLeft, ChevronRight, Quote, AlertCircle, Briefcase, Calendar, MapPin, CheckCircle2, ArrowRight, Maximize2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeProps {
  setActiveTab: (tab: PageTab) => void;
  teacherQuotes: TeacherQuote[];
  notices: NoticeItem[];
  events: EventItem[];
  gallerySlides: GallerySlide[];
  galleryHeadline: string;
  gallerySubheadline: string;
  galleryDescription: string;
}

export default function Home({ 
  setActiveTab, 
  teacherQuotes, 
  notices, 
  events,
  gallerySlides,
  galleryHeadline,
  gallerySubheadline,
  galleryDescription
}: HomeProps) {
  const [heroSlide, setHeroSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; desc?: string } | null>(null);

  const slides = [
    {
      bg: 'https://i.postimg.cc/tTJZ489S/unnamed.webp',
      badge: 'রসায়ন বিভাগ অ্যালামনাই অ্যাসোসিয়েশন',
      title: 'রসায়ন বিভাগ ও অ্যালামনাই অ্যাসোসিয়েশন, রাজশাহী কলেজ',
      subtitle: 'ঐতিহ্য ও গৌরবের সোনালী পথচলা (প্রতিষ্ঠিত ১৯০৯)'
    },
    {
      bg: 'https://i.postimg.cc/VNd0Y3fH/ben_2.webp',
      badge: 'বিভাগীয় ভবন ও অ্যালামনাই কার্যালয়',
      title: 'রাজশাহী কলেজ রসায়ন ভবন ও অ্যালামনাই অ্যাসোসিয়েশন',
      subtitle: '১৪০+ বছরের ঐতিহ্যবাহী রসায়ন বিজ্ঞান পরিবার ও সেতুবন্ধন'
    },
    {
      bg: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1600&auto=format&fit=crop&q=80',
      badge: 'গবেষণা ও শিক্ষার মেলবন্ধন',
      title: 'অত্যাধুনিক গবেষণাগার ও আন্তর্জাতিক শিক্ষা প্ল্যাটফর্ম',
      subtitle: 'প্রাক্তন ও বর্তমান শিক্ষার্থীদের শক্তিশালী বিশ্বব্যাপী নেটওয়ার্ক'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlide = slides[heroSlide];

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || !gallerySlides || gallerySlides.length === 0) return;
    const interval = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % gallerySlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, gallerySlides?.length]);


  return (
    <div className="w-full space-y-16 pb-12 relative z-10">
      {/* Lightbox Modal for Full Image View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl cursor-default"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white p-2 rounded-full border border-slate-700 transition-all shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full h-full max-h-[75vh] bg-black/60 flex items-center justify-center p-2 overflow-hidden">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[72vh] object-contain rounded-lg shadow-2xl"
                />
              </div>

              <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-amber-400">{selectedImage.title}</h3>
                {selectedImage.desc && (
                  <p className="text-xs sm:text-sm text-slate-300">{selectedImage.desc}</p>
                )}
                <p className="text-[11px] text-slate-400 pt-1">
                  💡 যেকোনো স্থান চাপ দিয়ে মোডাল বন্ধ করতে পারেন
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Hero Section */}
      <section className="relative w-full h-[480px] sm:h-[540px] overflow-hidden rounded-b-2xl shadow-xl select-none bg-slate-950">
        {/* Background Image with High Priority Pre-decoding */}
        {slides.map((slide, idx) => (
          <img
            key={idx}
            src={slide.bg}
            alt={slide.title}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out scale-105 ${
              heroSlide === idx ? 'opacity-35 z-0' : 'opacity-0 pointer-events-none'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b192c] via-[#0b192c]/80 to-transparent"></div>

        {/* Hero Content with high contrast container for readability */}
        <div className="relative max-w-5xl mx-auto h-full px-6 flex flex-col items-center justify-center text-center text-white space-y-6 pt-8">
          <span className="bg-amber-500 text-slate-950 px-4 py-1.5 rounded-full text-xs font-bold shadow-md tracking-wider animate-bounce">
            {currentSlide.badge}
          </span>

          <div className="bg-slate-950/70 backdrop-blur-md px-6 py-6 sm:py-8 sm:px-10 rounded-2xl border border-slate-800/50 shadow-2xl max-w-4xl space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.2] drop-shadow-lg text-white">
              {currentSlide.title}
            </h1>

            <p className="text-amber-400 font-bold text-lg sm:text-2xl drop-shadow">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('events')}
              className="border-2 border-white/80 bg-white/10 hover:bg-white text-white hover:text-slate-950 px-6 py-2.5 rounded-lg font-bold text-sm backdrop-blur-sm transition-all cursor-pointer shadow-lg"
            >
              ক্যাম্পাস গ্যালারি
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 px-7 py-2.5 rounded-lg font-extrabold text-sm shadow-xl hover:scale-105 transition-all cursor-pointer border border-amber-400"
            >
              সদস্য হিসেবে যোগ দিন
            </button>
          </div>
        </div>

        {/* Left & Right Arrows */}
        <button
          onClick={() => setHeroSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setHeroSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroSlide(idx)}
              className={`h-2.5 rounded-full transition-all ${
                heroSlide === idx ? 'w-8 bg-amber-500' : 'w-2.5 bg-white/40'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Intro Section with Motion Animation & Added Image */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-6 py-8 sm:py-12 bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-2xl relative overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Animated Image Container */}
          <motion.div 
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            onClick={() => setSelectedImage({
              url: "https://i.postimg.cc/tTJZ489S/unnamed.webp",
              title: "ঐতিহাসিক রসায়ন ভবন, রাজশাহী কলেজ",
              desc: "১৯০৯ সালে স্থাপিত ঐতিহাসিক রসায়ন বিজ্ঞান ভবন ও রাজশাহী কলেজ একাডেমি ক্যাম্পাস।"
            })}
            className="md:col-span-5 relative group cursor-pointer"
          >
            <div className="relative rounded-xl overflow-hidden border border-amber-500/30 shadow-2xl bg-slate-950">
              <img 
                src="https://i.postimg.cc/tTJZ489S/unnamed.webp" 
                alt="Rajshahi College Chemistry Building" 
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-64 sm:h-80 object-contain sm:object-cover transform group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>
              <div className="absolute top-3 right-3 bg-slate-950/80 hover:bg-amber-500 text-white hover:text-slate-950 p-2 rounded-xl backdrop-blur-md border border-slate-800 transition-all opacity-90 group-hover:opacity-100 flex items-center gap-1.5 text-xs font-bold">
                <Maximize2 className="w-4 h-4" />
                <span>সম্পূর্ণ ছবি</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 px-3 py-2 bg-slate-950/80 backdrop-blur-md rounded-lg border border-slate-800 text-xs text-amber-400 font-semibold text-center flex items-center justify-center gap-2">
                <span>ঐতিহ্যবাহী রসায়ন ভবন, রাজশাহী কলেজ</span>
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>

          {/* Animated Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:col-span-7 space-y-4 text-left"
          >
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-block bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase"
            >
              প্রতিষ্ঠিত ১৯০৯ • ঐতিহ্য ও সম্মান
            </motion.span>

            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-2xl sm:text-3xl font-extrabold text-white leading-tight"
            >
              রসায়ন বিভাগ ও অ্যালামনাই অ্যাসোসিয়েশন
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-amber-500 font-bold text-sm sm:text-base"
            >
              রাজশাহী কলেজের ঐতিহ্যবাহী রসায়ন বিভাগ এবং প্রাক্তন শিক্ষার্থীদের গৌরবময় মেলবন্ধন
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed"
            >
              রাজশাহী কলেজের রসায়ন বিভাগ ১৯০৯ সাল থেকে নিরবচ্ছিন্নভাবে মানসম্মত শিক্ষা ও গবেষণা পরিচালনা করে আসছে। আমাদের প্রাক্তন শিক্ষার্থী দেশের গণ্ডি পেরিয়ে সারা বিশ্বে সুনামের সাথে নিয়োজিত আছেন। রসায়ন বিভাগ অ্যালামনাই অ্যাসোসিয়েশন প্রাক্তন ও বর্তমান ছাত্র-শিক্ষকদের মধ্যে একটিশক্তিশালী সংযোগ গড়ে তুলেছে এবং শিক্ষা ও গবেষণার প্রসারে ভূমিকা রাখছে।
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Two Column Section: Teacher Quotes & Notice Board */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Column: Teacher Quotes (w-7/12) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider block">
              শিক্ষক মণ্ডলীর মূল্যবান মতামত
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <span className="text-amber-500 text-3xl">""</span>
              <span>রসায়ন বিভাগীয় শিক্ষকদের বাণী ও মূল্যায়ন</span>
            </h3>
          </div>

          <div className="space-y-4">
            {teacherQuotes.map((tq, idx) => (
              <motion.div
                key={tq.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-900/60 backdrop-blur-md p-5 rounded-xl border border-slate-800/80 shadow-md hover:border-amber-500/30 transition-all flex flex-col sm:flex-row items-start gap-4 relative overflow-hidden"
              >
                {/* Orange left border strip */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-500 to-amber-600"></div>

                <img
                  src={tq.image}
                  alt={tq.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-500/30 shrink-0 ml-2"
                />

                <div className="space-y-2 flex-1">
                  <div className="text-xs sm:text-sm text-slate-300 italic leading-relaxed whitespace-pre-line">
                    "{tq.quote}"
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-slate-100 text-sm">{tq.name}</h4>
                    <p className="text-xs text-amber-400 font-semibold">{tq.designation}</p>
                    <p className="text-[11px] text-slate-400">{tq.department}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Notice Board & Career Portal (w-5/12) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Emergency Notice Board Box */}
          <div className="space-y-3">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider block">
                জরুরি নোটিশ আপডেট
              </span>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-500" />
                <span>জরুরি নোটিশ বোর্ড</span>
              </h3>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800/80 shadow-md overflow-hidden border-t-4 border-t-rose-600">
              {notices.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs sm:text-sm py-12">
                  এই মুহূর্তে কোনো সক্রিয় জরুরি নোটিশ নেই।
                </div>
              ) : (
                <div className="divide-y divide-slate-800 max-h-[220px] overflow-y-auto">
                  {notices.map((n) => (
                    <div key={n.id} className="p-4 hover:bg-rose-950/20 transition-colors space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{n.title}</span>
                        {n.isUrgent && (
                          <span className="bg-rose-950 text-rose-300 border border-rose-800/50 px-2 py-0.5 rounded text-[10px] font-bold">
                            জরুরি
                          </span>
                        )}
                      </div>
                      <p className="text-slate-300 leading-relaxed">{n.content}</p>
                      <p className="text-[11px] text-slate-400 font-medium">প্রকাশিত: {n.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chemistry Career Portal Card (Dark navy background matching screenshot) */}
          <div className="bg-gradient-to-br from-[#0b192c]/85 to-[#1e293b]/85 backdrop-blur-md text-white p-6 rounded-2xl shadow-xl border border-amber-500/20 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500 text-slate-950 rounded-lg font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base text-amber-400">রসায়ন ক্যারিয়ার পোর্টাল</h4>
                <p className="text-[10px] text-slate-300 uppercase tracking-widest">Chemistry Career Hub</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              উচ্চশিক্ষা, ফেলোশিপ, স্কলারশিপ ও বিভিন্ন ইন্ডাস্ট্রিয়াল ও বিভিন্ন গবেষণার সুযোগের জন্য সরাসরি রসায়ন বিভাগ অ্যালামনাইদের সাথে যোগাযোগ করার জন্য শিক্ষার্থীদের আহ্বান জানানো হচ্ছে।
            </p>

            <button
              onClick={() => setActiveTab('alumni')}
              className="flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer pt-1 group"
            >
              <span>কৃতি অ্যালামনাই দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </motion.section>

      {/* Recent Seminars & Events Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 space-y-6"
      >
        <div className="text-center space-y-1">
          <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">
            অ্যালামনাই নেটওয়ার্কিং
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            সাম্প্রতিক সেমিনার ও অনুষ্ঠানসমূহ
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {events.slice(0, 3).map((ev, idx) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setActiveTab('events')}
              className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800/80 overflow-hidden shadow-md hover:border-amber-500/30 hover:scale-[1.02] transition-all cursor-pointer flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden bg-slate-800">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 animate-fade-in"
                />
                {ev.badge && (
                  <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 px-3 py-1 rounded text-[11px] font-bold shadow">
                    {ev.badge}
                  </span>
                )}
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-amber-400 transition-colors">
                    {ev.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {ev.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate max-w-[140px] text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">{ev.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Interactive Photo Gallery Slide Gallery with Header */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 space-y-8"
      >
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block">
            {gallerySubheadline}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            {galleryHeadline}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {galleryDescription}
          </p>
        </div>

        {(!gallerySlides || gallerySlides.length === 0) ? (
          <div className="bg-slate-900/60 backdrop-blur-md p-12 rounded-2xl border border-slate-800/80 text-center text-slate-400 text-sm">
            কোনো ছবি আপলোড করা হয়নি।
          </div>
        ) : (
          <div 
            className="relative bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-4 sm:p-6 shadow-xl space-y-4"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            {/* Main Slide Screen */}
            <div className="relative h-[280px] sm:h-[450px] rounded-xl overflow-hidden bg-slate-950">
              {/* Slide Images */}
              {gallerySlides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                  idx === galleryIndex 
                    ? 'opacity-100 scale-100 pointer-events-auto' 
                    : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                {/* Background image */}
                <div 
                  onClick={() => setSelectedImage({ url: slide.url, title: slide.title, desc: slide.description })}
                  className="w-full h-full cursor-pointer relative group/img"
                >
                  <img
                    src={slide.url}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain sm:object-cover select-none"
                  />
                  {/* Visual gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent"></div>
                  
                  {/* Maximize Icon */}
                  <div className="absolute top-4 right-4 bg-slate-950/80 hover:bg-amber-500 text-white hover:text-slate-950 p-2 rounded-xl backdrop-blur-md border border-slate-800 transition-all opacity-90 group-hover/img:opacity-100 flex items-center gap-1.5 text-xs font-bold z-20">
                    <Maximize2 className="w-4 h-4" />
                    <span>সম্পূর্ণ ছবি</span>
                  </div>
                </div>

                {/* Captions and descriptions */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-2 text-left">
                  <span className="bg-amber-500 text-slate-950 px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider inline-block shadow-md">
                    রসায়ন গ্যালারি
                  </span>
                  <h4 className="text-base sm:text-xl font-extrabold text-white tracking-tight drop-shadow-md">
                    {slide.title}
                  </h4>
                  <p className="text-xs text-slate-200 max-w-2xl font-medium drop-shadow-sm leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Left/Right Arrow Controls on Hover */}
            <button
              onClick={() =>
                setGalleryIndex((prev) => (prev === 0 ? gallerySlides.length - 1 : prev - 1))
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white transition-all cursor-pointer border border-slate-800/80 shadow-md sm:opacity-50 hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setGalleryIndex((prev) => (prev + 1) % gallerySlides.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white transition-all cursor-pointer border border-slate-800/80 shadow-md sm:opacity-50 hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator Overlay */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-slate-800/60">
              {gallerySlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setGalleryIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === galleryIndex ? 'bg-amber-400 w-5' : 'bg-slate-500 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>

            {/* Thumbnail Preview Bar */}
            <div className="grid grid-cols-5 gap-2 sm:gap-4 pt-1">
              {gallerySlides.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setGalleryIndex(idx)}
                  className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    idx === galleryIndex
                      ? 'border-amber-400 scale-[0.97] shadow-lg'
                      : 'border-slate-800/50 opacity-60 hover:opacity-100 hover:scale-[1.01]'
                  }`}
                >
                  <img
                    src={slide.url}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none"
                  />
                  <div className="absolute inset-0 bg-slate-950/20"></div>
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.section>

      {/* Call to Action Banner (Dark Navy background matching screenshot bottom) */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="bg-[#0b192c]/80 backdrop-blur-md rounded-2xl p-8 sm:p-12 text-white shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-slate-800/80">
          {/* Left info (w-7/12) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                সদস্যপদের অফুরন্ত সুযোগ-সুবিধা
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                কেন রসায়ন অ্যালামনাইয়ের সদস্য হবেন?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 font-medium">
              {MEMBERSHIP_PERKS.map((perk, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card (w-5/12) */}
          <div className="lg:col-span-5 bg-[#13233c]/85 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-amber-500/30 text-center space-y-5 shadow-inner">
            <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-slate-950 font-black text-xs mx-auto shadow-lg uppercase tracking-wider">
              সদস্যপদ<br/>আবেদন
            </div>

            <div className="space-y-2">
              <h4 className="font-extrabold text-white text-base sm:text-lg">
                আপনি কি আমাদের মর্যাদাপূর্ণ অ্যালামনাই তালিকায় যুক্ত হতে প্রস্তুত?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                অনলাইনে আপনার শিক্ষাগত প্রমাণপত্র সম্বলিত ফরম পূরণ করুন। যাচাইকরণ এবং সদস্যপদ অনুমোদন প্রক্রিয়া ৩-৫ কার্যদিবস সময় নেয়।
              </p>
            </div>

            <button
              onClick={() => setActiveTab('contact')}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              অনলাইনে আবেদন করুন
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
