import { PageTab, ExecutiveMember } from '../types';
import { MILESTONES, EXECUTIVE_COMMITTEE } from '../data/mockData';
import { Target, Award, BookOpen, Clock, Users, Maximize2, X, ArrowRight, UserPlus, Calendar, ExternalLink, Globe, GraduationCap, Instagram, Image as ImageIcon, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const RC_CAMPUS_GALLERY = [
  {
    id: 'admin_building',
    url: '/college_images/rc_admin_building.jpg',
    title: 'ঐতিহাসিক প্রশাসন ভবন',
    desc: '১৮৭৩ সালে প্রতিষ্ঠিত রাজশাহী কলেজের মূল ইন্দো-সারাসেনিক ও ভিক্টোরীয় স্থাপত্যশৈলীর লাল ইটের ঐতিহ্যবাহী প্রশাসন ভবন।',
    tag: 'স্থাপিত ১৮৭৩'
  },
  {
    id: 'bird_eye',
    url: '/college_images/rc_campus_bird_eye.jpg',
    title: 'পাখির চোখে রাজশাহী কলেজ ক্যাম্পাস (ড্রোন ভিউ)',
    desc: 'বায়বীয় কোণে ঐতিহ্যবাহী রাজশাহী কলেজ ক্যাম্পাসের দৃষ্টিনন্দন সবুজ দৃশ্যপট।',
    tag: 'অফিসিয়াল ড্রোন ভিউ',
    instagramUrl: 'https://www.instagram.com/p/DITKGkfzaSa/'
  },
  {
    id: 'campus_front',
    url: '/college_images/rc_campus_1.webp',
    title: 'ক্যাম্পাসের সম্মুখভাগ ও পুষ্পকানন',
    desc: 'পদ্মা তীরবর্তী রাজশাহী কলেজের সুশোভিত পুষ্পোদ্যান ও ছায়াঘেরা শান্ত সবুজ প্রাঙ্গণ।',
    tag: 'নান্দনিক চত্বর'
  },
  {
    id: 'campus_corridor',
    url: '/college_images/rc_campus_2.webp',
    title: 'ঐতিহ্যবাহী ভিক্টোরীয় স্থাপত্যশৈলী',
    desc: 'রাজশাহী কলেজের দেড় শতাব্দীর ঐতিহ্যবাহী লাল ইটের কারুকাজ, খিলান ও ঔপনিবেশিক নান্দনিক রূপ।',
    tag: 'হেরিটেজ আর্কিটেকচার'
  }
];

interface AboutProps {
  setActiveTab: (tab: PageTab) => void;
  executiveMembers: ExecutiveMember[];
}

export default function About({ setActiveTab, executiveMembers }: AboutProps) {
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; desc?: string } | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
        setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openFullImage = (data: { url: string; title: string; desc?: string }) => {
    setIsZoomed(false);
    setSelectedImage(data);
  };

  return (
    <div className="w-full space-y-16 py-10 px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10 select-none">
      {/* Expansive Full Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedImage(null);
              setIsZoomed(false);
            }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md p-2 sm:p-4 lg:p-6 flex flex-col items-center justify-center cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-7xl w-full h-[94vh] max-h-[96vh] bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden flex flex-col shadow-2xl cursor-default"
            >
              {/* Header Action Toolbar */}
              <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-3 z-10">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>
                  <h3 className="text-sm sm:text-base font-bold text-white truncate">
                    {selectedImage.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                    title={isZoomed ? "স্বাভাবিক আকারে আনুন" : "১০০% বড় করে দেখুন"}
                  >
                    {isZoomed ? (
                      <>
                        <ZoomOut className="w-4 h-4" />
                        <span className="hidden sm:inline">ফিট স্ক্রিন</span>
                      </>
                    ) : (
                      <>
                        <ZoomIn className="w-4 h-4" />
                        <span className="hidden sm:inline">১০০% বড় করুন</span>
                      </>
                    )}
                  </button>

                  <a
                    href={selectedImage.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                    title="আসল ছবি নতুন ট্যাবে খুলুন"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">আসল রেজোলিউশন</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setIsZoomed(false);
                    }}
                    className="bg-slate-800 hover:bg-rose-500 text-slate-200 hover:text-white p-2 rounded-xl border border-slate-700 transition-all shadow-sm cursor-pointer"
                    title="বন্ধ করুন (Esc)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Large Image Stage */}
              <div
                className={`w-full flex-1 bg-black/85 flex items-center justify-center p-2 sm:p-4 overflow-auto transition-all ${
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  referrerPolicy="no-referrer"
                  className={`rounded-xl transition-all duration-300 shadow-2xl select-none ${
                    isZoomed
                      ? 'max-w-none w-auto h-auto min-w-[130%]'
                      : 'max-w-full max-h-[75vh] w-auto h-auto object-contain'
                  }`}
                />
              </div>

              {/* Caption Footer */}
              <div className="px-4 py-3 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="space-y-0.5">
                  <p className="text-slate-200 font-medium">{selectedImage.desc || selectedImage.title}</p>
                  <p className="text-[11px] text-slate-400">
                    💡 ছবিতে ক্লিক করে আরও বড় করতে পারেন অথবা কীবোর্ডের Esc চাপুন
                  </p>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <span className="bg-slate-800 text-amber-400 font-bold px-2.5 py-1 rounded-md text-[11px] border border-slate-700/60">
                    ফুলস্ক্রিন ভিউয়ার
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Title Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          রসায়ন বিভাগ অ্যালামনাই অ্যাসোসিয়েশন, রাজশাহী কলেজ
        </h1>
        <p className="text-amber-400 font-bold text-sm sm:text-base">
          রাজশাহী কলেজের রসায়ন বিভাগের কৃতি প্রাক্তন ও বর্তমান শিক্ষার্থীদের মধ্যে একটি সুদৃঢ় সেতুবন্ধন তৈরি করা এবং শিক্ষার সার্বিক মানোন্নয়নে ভূমিকা রাখা।
        </p>
      </motion.div>

      {/* Department & Campus Photo Showcase with Motion */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="space-y-6"
      >
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
            ক্যাম্পাস ও বিভাগীয় চিত্রশালা
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            ঐতিহ্যবাহী রসায়ন ভবন ও অ্যালামনাই কার্যালয়
          </h2>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            রাজশাহী কলেজ রসায়ন বিভাগের ঐতিহাসিক মূল ভবন ও অ্যালামনাই অ্যাসোসিয়েশনের সুসজ্জিত আঙিনা
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Building Image 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => openFullImage({
              url: "https://res.cloudinary.com/ydwdvzyo/image/upload/v1785331170/unnamed_dbi26h.webp",
              title: "ঐতিহাসিক রসায়ন ভবন, রাজশাহী কলেজ",
              desc: "১৯০৯ সালে স্থাপিত উপমহাদেশের অন্যতম প্রাচীন ঐতিহ্যবাহী লাল ইটের রসায়ন বিজ্ঞান ভবন।"
            })}
            className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl group hover:border-amber-500/40 transition-all flex flex-col cursor-pointer"
          >
            <div className="relative h-80 sm:h-[440px] md:h-[460px] overflow-hidden bg-slate-950 flex items-center justify-center p-1">
              <img
                src="https://res.cloudinary.com/ydwdvzyo/image/upload/v1785331170/unnamed_dbi26h.webp"
                alt="ঐতিহাসিক রসায়ন ভবন"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain sm:object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
              <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-[11px] px-3 py-1 rounded-full shadow-md">
                প্রতিষ্ঠিত ১৯০৯
              </div>
              <div className="absolute top-3 right-3 bg-slate-950/80 hover:bg-amber-500 text-white hover:text-slate-950 p-2 rounded-xl backdrop-blur-md border border-slate-800 transition-all opacity-90 group-hover:opacity-100 flex items-center gap-1.5 text-xs font-bold">
                <Maximize2 className="w-4 h-4" />
                <span className="hidden sm:inline">সম্পূর্ণ ছবি</span>
              </div>
            </div>
            <div className="p-5 space-y-2 bg-slate-900/80 flex-1 flex flex-col justify-between border-t border-slate-800/80">
              <div>
                <h3 className="font-extrabold text-white text-base group-hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>ঐতিহাসিক রসায়ন ভবন, রাজশাহী কলেজ</span>
                  <Maximize2 className="w-4 h-4 text-amber-400 opacity-70 group-hover:opacity-100" />
                </h3>
                <p className="text-xs text-slate-300 pt-1 leading-relaxed">
                  ১৯০৯ সালে স্থাপিত উপমহাদেশের অন্যতম প্রাচীন ঐতিহ্যবাহী লাল ইটের রসায়ন বিজ্ঞান ভবন। ছবিতে চাপ দিয়ে বড় পর্দায় সম্পূর্ণ ছবি দেখুন।
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between text-[11px] text-amber-400 font-semibold border-t border-slate-800/60">
                <span>মূল একাডেমি ভবন</span>
                <span>রাজশাহী কলেজ ক্যাম্পাস</span>
              </div>
            </div>
          </motion.div>

          {/* Building Image 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={() => openFullImage({
              url: "https://res.cloudinary.com/ydwdvzyo/image/upload/v1785331256/unnamed_1_qlhwlv.webp",
              title: "রসায়ন বিভাগ ও অ্যালামনাই অ্যাসোসিয়েশন ভবন",
              desc: "প্রাক্তন ছাত্র-ছাত্রী ও শিক্ষকদের মিলনকেন্দ্র, প্রশাসনিক উইং এবং পুনর্মিলনী দপ্তর।"
            })}
            className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl group hover:border-amber-500/40 transition-all flex flex-col cursor-pointer"
          >
            <div className="relative h-80 sm:h-[440px] md:h-[460px] overflow-hidden bg-slate-950 flex items-center justify-center p-1">
              <img
                src="https://res.cloudinary.com/ydwdvzyo/image/upload/v1785331256/unnamed_1_qlhwlv.webp"
                alt="রসায়ন বিভাগ ও অ্যালামনাই অ্যাসোসিয়েশন ভবন"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain sm:object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
              <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-[11px] px-3 py-1 rounded-full shadow-md">
                অ্যালামনাই কেন্দ্র
              </div>
              <div className="absolute top-3 right-3 bg-slate-950/80 hover:bg-amber-500 text-white hover:text-slate-950 p-2 rounded-xl backdrop-blur-md border border-slate-800 transition-all opacity-90 group-hover:opacity-100 flex items-center gap-1.5 text-xs font-bold">
                <Maximize2 className="w-4 h-4" />
                <span className="hidden sm:inline">সম্পূর্ণ ছবি</span>
              </div>
            </div>
            <div className="p-5 space-y-2 bg-slate-900/80 flex-1 flex flex-col justify-between border-t border-slate-800/80">
              <div>
                <h3 className="font-extrabold text-white text-base group-hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>রসায়ন বিভাগ ও অ্যালামনাই অ্যাসোসিয়েশন</span>
                  <Maximize2 className="w-4 h-4 text-amber-400 opacity-70 group-hover:opacity-100" />
                </h3>
                <p className="text-xs text-slate-300 pt-1 leading-relaxed">
                  প্রাক্তন ছাত্র-ছাত্রী ও শিক্ষকদের মিলনকেন্দ্র, প্রশাসনিক উইং এবং পুনর্মিলনী দপ্তর। ছবিতে চাপ দিয়ে বড় পর্দায় সম্পূর্ণ ছবি দেখুন।
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between text-[11px] text-amber-400 font-semibold border-t border-slate-800/60">
                <span>অ্যালামনাই কার্যালয়</span>
                <span>সম্মেলন ও আর্কাইভ কেন্দ্র</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* History & Heritage Box matching screenshot 2 */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 sm:p-10 border border-slate-800/80 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        {/* Left text (w-8/12) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">ঐতিহাসিক প্রেক্ষাপট</span>
            <h2 className="text-2xl font-extrabold text-white">
              রসায়ন বিভাগের ঐতিহ্য ও গৌরবময় পথচলা
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              ১৮৭৩ সালে প্রতিষ্ঠিত ঐতিহ্যবাহী রাজশাহী কলেজের অন্যতম গর্ব রসায়ন বিভাগ। ১৯০৯ সাল থেকে এখানে শিক্ষার্থীদের স্নাতক ও স্নাতকোত্তর ডিগ্রি প্রদান করা হচ্ছে। ১৯৭২ সালে এই কলেজে রসায়ন বিষয়ে প্রথম অনার্স কোর্স এবং ১৯৯৩ সালে মাস্টার্স অফ সায়েন্স (এম.এসসি) কোর্স চালু করা হয়। জাতীয় বিশ্ববিদ্যালয় ১৯৯৩-১৯৯৪ সেশন থেকে এই প্রোগ্রামসমূহকে অধিভুক্ত করেছে।
            </p>
            <p>
              বিভাগটি কলেজ ক্যাম্পাসের একটি চমৎকার অবস্থানে অবস্থিত। তিন তলা বিশিষ্ট বিভাগীয় ভবনে রয়েছে সুপরিসর ও আধুনিক অডিও-ভিজ্যুয়াল প্রজেক্টর সমৃদ্ধ ৪টি ক্লাসরুম, ১টি উন্নত আইসিটি ল্যাব এবং আধুনিক বৈজ্ঞানিক যন্ত্রপাতি সমৃদ্ধ ৪টি কেমিক্যাল ল্যাবরেটরি। নিয়মিত থিসিসের জন্য রয়েছে একটি স্বয়ংক্রিয় জেনারেটর ও আইপিএস সুবিধা। এছাড়া বিভাগের সেমিনার লাইব্রেরিতে শিক্ষার্থীদের জন্য প্রায় ৩,০০০ মূল্যবান বইয়ের সমৃদ্ধ সংগ্রহ রয়েছে।
            </p>
            <p>
              বর্তমানে প্রতি বছর প্রায় ৭০০ জন শিক্ষার্থী এই বিভাগে স্নাতক ও স্নাতকোত্তর প্রোগ্রামে ভর্তি হচ্ছে। রসায়ন বিভাগ থেকে পাস করা শিক্ষার্থীরা দেশ-বিদেশে সুনামের সাথে কাজ করছেন। বর্তমানে ১২ জন শিক্ষক অত্যন্ত আন্তরিকতার সাথে দায়িত্ব পালন করছেন।
            </p>
            <p>
              বর্তমানে এবং ১৩তম বিভাগীয় প্রধান হিসেবে ড. সাজেদুল ইসলাম অত্যন্ত সফলভাবে এই রসায়ন বিভাগকে পরিচালনা করে চলেছেন।
            </p>
          </div>

          {/* Milestones Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {MILESTONES.map((ms, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 text-center space-y-1"
              >
                <span className="text-lg font-black text-amber-400 block font-mono">{ms.year}</span>
                <span className="text-xs font-bold text-slate-100 block">{ms.title}</span>
                <span className="text-[10px] text-slate-400 block truncate">{ms.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Badge Box matching screenshot 2 golden badge */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-[#0b192c]/90 to-[#1e293b]/90 backdrop-blur-md text-white p-8 rounded-2xl border-2 border-amber-500/40 shadow-2xl text-center space-y-4 max-w-sm w-full"
          >
            <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 font-black text-2xl flex items-center justify-center mx-auto shadow-lg">
              ১৫০+
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-amber-400">১৫০+ বছরেরও বেশি</h3>
              <p className="text-xs text-slate-300 pt-1">
                ঐতিহ্যবাহী রসায়ন শিক্ষার বিকাশ ও গৌরবের জ্ঞান ভান্ডার হিসেবে অনন্য অবদান।
              </p>
            </div>
            <button
              onClick={() => setActiveTab('alumni')}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              শিক্ষক ও প্রাক্তনদের দেখুন
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Vision & Mission Two Column Cards matching screenshot 2 */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Vision Box */}
        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-slate-800/80 shadow-md space-y-4 relative overflow-hidden group hover:border-amber-400 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">আমাদের ভিশন (লক্ষ্য)</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            রাজশাহী college রসায়ন বিভাগের গৌরবময় ঐতিহ্যকে ধারণ করে জাতীয় ও আন্তর্জাতিক পর্যায়ে রসায়ন শিক্ষা ও গবেষণার টেকসই প্রসারে নেতৃত্ব দেওয়া। শিক্ষার্থীদের মাঝে বৈজ্ঞানিক উদ্ভাবনী চিন্তা ও মানবিক মূল্যবোধ জাগ্রত করা।
          </p>
        </motion.div>

        {/* Mission Box */}
        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-slate-800/80 shadow-md space-y-4 relative overflow-hidden group hover:border-blue-400 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">আমাদের মিশন (উদ্দেশ্য)</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            দেশ-বিদেশে ছড়িয়ে থাকা রসায়ন বিভাগের প্রাক্তন শিক্ষার্থীদের মধ্যে একটি সুদৃঢ় ও সহযোগিতাপূর্ণ নেটওয়ার্ক গড়ে তোলা। বর্তমান শিক্ষার্থীদের উচ্চশিক্ষা ও গবেষণায় সহায়তা প্রদান করা এবং সামাজিক ও জাতীয় উন্নয়নে রসায়নের জ্ঞানকে কাজে লাগানো।
          </p>
        </motion.div>
      </motion.div>

      {/* About Rajshahi College Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 sm:p-10 border border-slate-800/80 shadow-xl space-y-8"
      >
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
            মাতৃপ্রতিষ্ঠান পরিচিতি
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ঐতিহ্যবাহী রাজশাহী কলেজ: প্রাচ্যের শ্রেষ্ঠ জ্ঞানতীর্থ
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            ১৮৭৩ সালে প্রতিষ্ঠিত রাজশাহী কলেজ বাংলাদেশের অন্যতম প্রাচীন, ঐতিহ্যবাহী এবং জাতীয় বিশ্ববিদ্যালয়ের কলেজ পারফরম্যান্সে টানা দেশসেরা উচ্চশিক্ষা প্রতিষ্ঠান।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Primary Featured Photo Showcase */}
          <div className="lg:col-span-6">
            <div
              onClick={() => openFullImage({
                url: "/college_images/rc_admin_building.jpg",
                title: "ঐতিহাসিক রাজশাহী কলেজ প্রশাসন ভবন",
                desc: "১৮৭৩ সালে প্রতিষ্ঠিত রাজশাহী কলেজের ইন্দো-সারাসেনিক ও ভিক্টোরীয় স্থাপত্যশৈলীর মূল প্রশাসনিক ভবন ও সবুজ চত্বর।"
              })}
              className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl group cursor-pointer bg-slate-950 flex flex-col"
            >
              <div className="relative h-80 sm:h-[440px] overflow-hidden">
                <img
                  src="/college_images/rc_admin_building.jpg"
                  alt="ঐতিহাসিক রাজশাহী কলেজ প্রশাসন ভবন"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-md">
                  স্থাপিত ১৮৭৩
                </div>
                <div className="absolute top-3 right-3 bg-slate-950/80 hover:bg-amber-500 text-white hover:text-slate-950 p-2 rounded-xl backdrop-blur-md border border-slate-800 transition-all opacity-90 group-hover:opacity-100 flex items-center gap-1.5 text-xs font-bold">
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">বড় পর্দা ভিউ</span>
                </div>
              </div>
              <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-white group-hover:text-amber-400 transition-colors">
                  ঐতিহাসিক প্রশাসন ভবন — রাজশাহী কলেজ
                </span>
                <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                  <span>বড় করে দেখুন</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Historical Content & Highlights */}
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                পদ্মা নদীর কোল ঘেঁষে ১৮৭৩ সালে প্রতিষ্ঠিত <strong className="text-white">রাজশাহী কলেজ</strong> বাংলাদেশের তৃতীয় প্রাচীনতম এবং উত্তরবঙ্গের সর্বপ্রথম ও ঐতিহ্যবাহী উচ্চশিক্ষা প্রতিষ্ঠান। ঢাকা কলেজ ও চট্টগ্রাম কলেজের পর এই বিদ্যাপীঠ স্থাপিত হয়ে সমগ্র উত্তরাঞ্চলে উচ্চশিক্ষার পথপ্রদর্শক হিসেবে নেতৃত্ব দিয়ে আসছে।
              </p>
              <p>
                ১৮২৮ সালে বাউলিয়া ইংলিশ স্কুল হিসেবে এর প্রাথমিক যাত্রা শুরু হয়। পরবর্তীতে পুঠিয়ার রাজা হরনাথ রায় বাহাদুরের অনন্য আর্থিক অনুদান এবং রাজশাহী অ্যাসোসিয়েশনের প্রত্যক্ষ প্রচেষ্টায় ১৮৭৩ সালে এটি পূর্ণাঙ্গ সরকারি ডিগ্রি কলেজে উন্নীত হয়।
              </p>
              <p>
                ব্রিটিশ রাজত্বকালে নির্মিত লাল ইটের ইন্দো-সারাসেনিক ও ভিক্টোরীয় স্থাপত্যশৈলীর অপরূপ ভবনসমূহ, সাজানো পুষ্পকানন এবং ৩৫ একরের নয়নাভিরাম ক্যাম্পাস রাজশাহী কলেজকে এক রাজকীয় রূপ দিয়েছে।
              </p>
              <p>
                <strong className="text-amber-400">ইতিহাস ও ঐতিহ্য:</strong> ১৯৫২ সালের মহান ভাষা আন্দোলনে শহীদদের স্মরণে এই কলেজের মুসলিম হোস্টেল প্রাঙ্গণেই নির্মিত হয়েছিল প্রথম শহীদ মিনার। এছাড়া ১৯৭১ সালের মহান মুক্তিযুদ্ধে এ কলেজের শিক্ষক-শিক্ষার্থীদের গৌরবময় ভূমিকা জাতির ইতিহাসে চিরস্মরণীয়।
              </p>
            </div>

            {/* Quick Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">টানা দেশসেরা কলেজ</h4>
                  <p className="text-[11px] text-slate-400">জাতীয় বিশ্ববিদ্যালয় কলেজ র‍্যাংকিংয়ে শ্রেষ্ঠ</p>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">দেড় শতাব্দীর ইতিহাস</h4>
                  <p className="text-[11px] text-slate-400">১৮৭৩ থেকে অবিরাম জ্ঞানের আলো</p>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">কৃতি ব্যক্তিত্বের বিদ্যাপীঠ</h4>
                  <p className="text-[11px] text-slate-400">দেশবরেণ্য শিক্ষাবিদ ও গবেষকদের পদচারণা</p>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">নয়নাভিরাম ক্যাম্পাস</h4>
                  <p className="text-[11px] text-slate-400">পদ্মাপাড়ে ৩৫ একরের সুবিশাল প্রাঙ্গণ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campus Gallery: 4 Photos Permanent Showcase */}
        <div className="pt-4 border-t border-slate-800/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>ক্যাম্পাস স্থিরচিত্র ও ঐতিহ্য গ্যালারি</span>
              </h3>
              <p className="text-xs text-slate-400">স্থায়ীভাবে সংরক্ষিত মনোরম ক্যাম্পাস দৃশ্যপট (ছবিতে চাপ দিয়ে ফুলস্ক্রিন ও জুম করে দেখুন)</p>
            </div>
            <a
              href="https://www.instagram.com/p/DITKGkfzaSa/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-pink-400 hover:text-pink-300 transition-colors self-start sm:self-auto"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>ইনস্টাগ্রাম ড্রোন ভিউ পোস্ট</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {RC_CAMPUS_GALLERY.map((img) => (
              <div
                key={img.id}
                onClick={() => openFullImage({
                  url: img.url,
                  title: img.title,
                  desc: img.desc
                })}
                className="group relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all shadow-lg flex flex-col"
              >
                <div className="relative h-48 sm:h-60 overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  <span className="absolute top-2.5 left-2.5 text-[10px] font-bold bg-slate-950/80 text-amber-400 px-2.5 py-1 rounded-md border border-slate-700/50 backdrop-blur-sm shadow-md">
                    {img.tag}
                  </span>
                  <div className="absolute bottom-2.5 right-2.5 bg-slate-900/90 hover:bg-amber-500 text-white hover:text-slate-950 p-1.5 rounded-lg opacity-90 group-hover:opacity-100 transition-all flex items-center gap-1 text-[11px] font-semibold border border-slate-700/60">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">বড় করুন</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-900/90 border-t border-slate-800/80">
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition-colors line-clamp-1">
                    {img.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Executive Committee Section matching screenshot 2 */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">নেতৃত্ব</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            নির্বাহী কমিটির সদস্যবৃন্দ
          </h2>
          <p className="text-xs text-slate-400">অ্যাসোসিয়েশনের গৌরবময় দায়িত্বে থাকা কর্মকর্তাবৃন্দের পরিচয়</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {executiveMembers.map((mem, idx) => (
            <motion.div 
              key={mem.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 text-center shadow-sm hover:shadow-lg hover:border-amber-500/30 transition-all flex flex-col items-center space-y-3"
            >
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-amber-500 to-[#0b192c] shadow-md">
                <img
                  src={mem.image}
                  alt={mem.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm">{mem.name}</h4>
                <p className="text-xs font-extrabold text-amber-400">{mem.role}</p>
                <p className="text-[11px] text-slate-400 pt-1 whitespace-pre-line">{mem.edu}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Internal Quick Links CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#0b192c]/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-1.5 text-center md:text-left">
          <h3 className="text-xl font-extrabold text-white">
            অ্যালামনাই অ্যাসোসিয়েশনের সাথে যুক্ত থাকুন
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            অন্যান্য পেজসমূহে নেভিগেট করতে নিচের ইন্টারনাল লিঙ্কগুলোতে চাপ দিন:
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('contact')}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>অনলাইন সদস্যপদ আবেদন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>ইভেন্ট ও গ্যালারি</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveTab('alumni')}
            className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>শিক্ষক ও সদস্যবৃন্দ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      {/* Related & Important Links Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-6 pt-2"
      >
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">গুরুত্বপূর্ণ সংযোগ</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            প্রাসঙ্গিক ও দরকারি লিংকসমূহ
          </h2>
          <p className="text-xs text-slate-400">রাজশাহী কলেজ সম্পর্কিত অফিসিয়াল ওয়েবসাইট, উইকিপিডিয়া, ফেসবুক গ্রুপ ও স্টুডেন্ট পোর্টাল</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <a
            href="https://rc.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/90 transition-all flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:scale-105 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">
                  রাজশাহী কলেজ ওয়েবসাইট
                </h4>
                <p className="text-xs text-slate-400 mt-1">অফিসিয়াল পোর্টাল ও যাবতীয় নোটিশ</p>
              </div>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-amber-400/90 group-hover:text-amber-400 gap-1.5">
              <span>rc.gov.bd</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          <a
            href="https://bn.wikipedia.org/wiki/%E0%A6%B0%E0%A6%BE%E0%A6%9C%E0%A6%B6%E0%A6%BE%E0%A6%B9%E0%A7%80_%E0%A6%95%E0%A6%B2%E0%A7%87%E0%A6%9C"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/90 transition-all flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                  রাজশাহী কলেজ উইকিপিডিয়া
                </h4>
                <p className="text-xs text-slate-400 mt-1">ইতিহাস, ঐতিহ্য ও বিস্তারিত তথ্য</p>
              </div>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-blue-400/90 group-hover:text-blue-400 gap-1.5">
              <span>bn.wikipedia.org</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          <a
            href="https://www.facebook.com/groups/rajshahicollege/"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-slate-800 hover:border-sky-500/50 hover:bg-slate-900/90 transition-all flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20 group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm group-hover:text-sky-400 transition-colors">
                  অফিসিয়াল ফেসবুক গ্রুপ
                </h4>
                <p className="text-xs text-slate-400 mt-1">শিক্ষক-শিক্ষার্থীদের সোশ্যাল কমিউনিটি</p>
              </div>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-sky-400/90 group-hover:text-sky-400 gap-1.5">
              <span>facebook.com/groups</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          <a
            href="https://www.instagram.com/p/DITKGkfzaSa/"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-slate-800 hover:border-pink-500/50 hover:bg-slate-900/90 transition-all flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center border border-pink-500/20 group-hover:scale-105 transition-transform">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm group-hover:text-pink-400 transition-colors">
                  ক্যাম্পাস ইনস্টাগ্রাম পোস্ট
                </h4>
                <p className="text-xs text-slate-400 mt-1">পাখির চোখে রাজশাহী কলেজ ড্রোন ভিউ</p>
              </div>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-pink-400/90 group-hover:text-pink-400 gap-1.5">
              <span>instagram.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          <a
            href="http://180.211.183.206/EasyCollegeMate/public/Admission/Honours/signin"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/90 transition-all flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">
                  অনার্স ভর্তি ও স্টুডেন্ট পোর্টাল
                </h4>
                <p className="text-xs text-slate-400 mt-1">ইজি কলেজমেট লগইন ও ভর্তি সেবা</p>
              </div>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-emerald-400/90 group-hover:text-emerald-400 gap-1.5">
              <span>CollegeMate Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
