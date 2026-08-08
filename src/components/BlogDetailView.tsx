import { useState } from 'react';
import { EventItem } from '../types';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Share2, 
  Check, 
  Sparkles, 
  BookOpen, 
  UserCheck, 
  Maximize2, 
  X,
  Tag,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BlogDetailViewProps {
  event: EventItem;
  onClose: () => void;
  allEvents?: EventItem[];
  onSelectEvent?: (event: EventItem) => void;
}

export default function BlogDetailView({ 
  event, 
  onClose, 
  allEvents = [], 
  onSelectEvent 
}: BlogDetailViewProps) {
  const [copied, setCopied] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);

  // Calculate estimated reading time
  const wordCount = event.description ? event.description.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 120));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description.substring(0, 100) + '...',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedEvents = allEvents.filter(e => e.id !== event.id).slice(0, 3);
  const allImages = [
    ...(event.image ? [event.image] : []),
    ...(event.images && Array.isArray(event.images) ? event.images : [])
  ].filter((img, idx, self) => img && self.indexOf(img) === idx);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950 text-slate-100 animate-in fade-in duration-300 select-none">
      {/* Lightbox for Gallery Photos inside Blog */}
      <AnimatePresence>
        {selectedGalleryImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGalleryImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl p-4 sm:p-8 flex items-center justify-center cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute top-6 right-6 bg-slate-900 text-white p-3 rounded-full border border-slate-700 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer shadow-2xl z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedGalleryImage}
              alt="Expanded view"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-slate-800"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Sticky Blog Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-xl">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-extrabold text-xs sm:text-sm bg-slate-900/80 hover:bg-slate-800 px-4 py-2 rounded-xl border border-slate-800 transition-all cursor-pointer shadow-sm shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ফিরে যান</span>
          </button>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 truncate max-w-xl">
            <span className="bg-amber-500/20 text-amber-400 font-bold px-2.5 py-0.5 rounded text-[11px] shrink-0">
              {event.category === 'reunion' ? 'পুনর্মিলনী' : event.category === 'seminar' ? 'সেমিনার' : event.category === 'gallery' ? 'গ্যালারি' : 'ব্লগ & নিউজ'}
            </span>
            <span className="truncate font-semibold text-slate-200">{event.title}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white px-3.5 py-2 rounded-xl border border-slate-800 text-xs font-bold transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">শেয়ার করুন</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-slate-900 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 rounded-xl border border-slate-800 transition-all cursor-pointer"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Blog Body Container */}
      <main className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-8 sm:py-12 max-w-5xl mx-auto space-y-8">
        
        {/* Title & Metadata Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {event.badge && (
              <span className="bg-amber-500 text-slate-950 font-black px-3 py-1 rounded-lg flex items-center gap-1 shadow-md uppercase tracking-wider text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{event.badge}</span>
              </span>
            )}
            <span className="bg-slate-900 text-amber-400 border border-slate-800 font-bold px-3 py-1 rounded-lg flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {event.category === 'reunion' ? 'মিলনমেলা ও পুনর্মিলনী' : event.category === 'seminar' ? 'বৈজ্ঞানিক সেমিনার' : event.category === 'gallery' ? 'ছবি ও গ্যালারি' : 'সংবাদ ও অফিসিয়াল ব্লগ'}
              </span>
            </span>
            <span className="text-slate-400 font-medium bg-slate-900/60 px-3 py-1 rounded-lg border border-slate-800/80 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>{readingTime} মিনিট পড়ার সময়</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-sm">
            {event.title}
          </h1>

          {/* Author / Organization Card & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 font-black flex items-center justify-center shadow-lg text-sm shrink-0">
                AAA
              </div>
              <div>
                <p className="font-extrabold text-white flex items-center gap-1.5">
                  <span>রসায়ন অ্যালামনাই অ্যাসোসিয়েশন</span>
                  <UserCheck className="w-4 h-4 text-amber-400 shrink-0" />
                </p>
                <p className="text-xs text-slate-400">রাজশাহী কলেজ • অফিসিয়াল পাবলিকেশন</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-amber-400">
              <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{event.date}</span>
              </div>
              {event.time && (
                <div className="flex items-center gap-1.5 text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{event.time}</span>
                </div>
              )}
              {event.location && (
                <div className="flex items-center gap-1.5 text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature Cover Image Banner */}
        {event.image && (
          <div className="relative w-full h-[280px] sm:h-[420px] md:h-[480px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <button
              onClick={() => setSelectedGalleryImage(event.image!)}
              className="absolute bottom-4 right-4 bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white p-2.5 rounded-xl border border-slate-800 transition-all cursor-pointer shadow-lg flex items-center gap-1.5 text-xs font-bold"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="hidden sm:inline">বড় করে দেখুন</span>
            </button>
          </div>
        )}

        {/* Full Blog Article Text */}
        <div className="bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800/80 space-y-6 shadow-xl">
          <div className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line font-sans selection:bg-amber-500 selection:text-slate-950">
            {event.description}
          </div>
        </div>

        {/* Multi Image Gallery Section (If extra images present) */}
        {allImages.length > 1 && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <span>সংযুক্ত ফটো অ্যালবামের ছবিসমূহ ({allImages.length} টি ফটো)</span>
              </h3>
              <span className="text-xs text-slate-400">ছবিতে ক্লিক করে ফুল সাইজে দেখুন</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {allImages.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedGalleryImage(imgUrl)}
                  className="relative aspect-video sm:aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 group cursor-pointer hover:border-amber-500/60 transition-all shadow-md"
                >
                  <img
                    src={imgUrl}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-6 h-6 text-amber-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Blog Posts / Events */}
        {relatedEvents.length > 0 && (
          <div className="pt-10 border-t border-slate-800/80 space-y-6">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>অন্যান্য ব্লগ ও সাম্প্রতিক ইভেন্টসমূহ</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedEvents.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    if (onSelectEvent) onSelectEvent(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 space-y-3 cursor-pointer hover:border-amber-500/50 hover:bg-slate-900 transition-all group"
                >
                  {rel.image && (
                    <div className="relative h-32 rounded-xl overflow-hidden bg-slate-950">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h4 className="font-extrabold text-white text-xs sm:text-sm line-clamp-2 group-hover:text-amber-400 transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {rel.description}
                  </p>
                  <div className="text-[10px] text-amber-400 font-bold flex items-center gap-1 pt-1">
                    <Calendar className="w-3 h-3" />
                    <span>{rel.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Back Button Bar */}
        <div className="pt-8 flex justify-center pb-12">
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-8 py-3.5 rounded-2xl font-black text-sm transition-all cursor-pointer shadow-xl flex items-center gap-2 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>সকল ব্লগ ও ইভেন্ট তালিকায় ফিরে যান</span>
          </button>
        </div>

      </main>
    </div>
  );
}
