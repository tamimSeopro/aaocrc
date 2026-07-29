import { useState } from 'react';
import { EventItem } from '../types';
import { Search, Calendar, MapPin, Clock, Tag, RefreshCw, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface EventsProps {
  events: EventItem[];
}

export default function Events({ events }: EventsProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'seminar' | 'gallery' | 'news'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter((ev) => {
    // category filter
    if (activeCategory !== 'all' && ev.category !== activeCategory && !(activeCategory === 'seminar' && ev.category === 'reunion')) {
      return false;
    }
    // search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return ev.title.toLowerCase().includes(q) || ev.description.toLowerCase().includes(q) || ev.location.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="w-full space-y-12 py-10 max-w-7xl mx-auto px-6 relative z-10 select-none">
      {/* Title Header matching screenshot 7 */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3"
      >
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
          অ্যালামনাই ইভেন্ট ও নিউজ আর্কাইভ
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          অনুষ্ঠান ও সর্বশেষ আপডেট হাব
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl mx-auto leading-relaxed">
          আমাদের সর্বশেষ বৈজ্ঞানিক সেমিনার, শিক্ষামূলক ফোরাম, সাংস্কৃতিক উৎসব এবং কৃতি শিক্ষার্থীদের পুনর্মিলনীর খবরগুলো দেখে রাখুন।
        </p>
      </motion.div>

      {/* Filter Bar matching screenshot 7 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800/80 shadow-md flex flex-col md:flex-row items-center justify-between gap-4"
      >
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md border border-amber-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            সব আপডেট ({events.length})
          </button>
          <button
            onClick={() => setActiveCategory('seminar')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'seminar'
                ? 'bg-amber-500 text-slate-950 shadow-md border border-amber-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            সেমিনারসমূহ
          </button>
          <button
            onClick={() => setActiveCategory('gallery')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'gallery'
                ? 'bg-amber-500 text-slate-950 shadow-md border border-amber-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            ফটো গ্যালারি
          </button>
          <button
            onClick={() => setActiveCategory('news')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'news'
                ? 'bg-amber-500 text-slate-950 shadow-md border border-amber-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            সংবাদ ও প্রেস
          </button>
        </div>

        {/* Search Bar (Solid Opaque Opaque Area matching 'but not in text area') */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="সংবাদ বা অনুষ্ঠান খুঁজুন..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 text-white border border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-medium"
          />
        </div>
      </motion.div>

      {/* Events Display or Empty State matching screenshot 7 */}
      {filteredEvents.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-md p-16 text-center max-w-2xl mx-auto space-y-4 my-8"
        >
          <div className="w-16 h-16 bg-slate-950 text-slate-400 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto shadow-inner animate-pulse">
            <Calendar className="w-8 h-8 text-amber-450" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-white text-base">কোনো ম্যাচিং তথ্য পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-400">
              অনুগ্রহ করে অন্য শব্দ টাইপ করে খুঁজুন অথবা ফিল্টার রিসেট করুন।
            </p>
          </div>
          <button
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>ফিল্টার রিসেট করুন</span>
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((ev, idx) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden shadow-sm hover:border-amber-500/30 transition-all flex flex-col group cursor-pointer"
            >
              {/* Event image */}
              <div className="relative h-48 overflow-hidden bg-slate-800">
                <img
                  src={ev.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80'}
                  alt={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {ev.badge && (
                  <span className="absolute top-3.5 left-3.5 bg-amber-500 text-slate-950 px-3 py-1 rounded-lg text-[11px] font-extrabold shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{ev.badge}</span>
                  </span>
                )}
                <span className="absolute top-3.5 right-3.5 bg-slate-950/80 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider border border-slate-800">
                  {ev.category === 'reunion' ? 'পুনর্মিলনী' : ev.category === 'seminar' ? 'সেমিনার' : ev.category === 'gallery' ? 'গ্যালারি' : 'নিউজ'}
                </span>
              </div>

              {/* Event Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-white text-base group-hover:text-amber-400 transition-colors leading-snug">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {ev.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-300 font-medium">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span>{ev.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{ev.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 text-slate-300 truncate">
                    <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="truncate">{ev.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
