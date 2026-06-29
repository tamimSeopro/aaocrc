import { PageTab } from '../types';
import { MILESTONES, EXECUTIVE_COMMITTEE } from '../data/mockData';
import { Target, Award, BookOpen, Clock, Users } from 'lucide-react';

interface AboutProps {
  setActiveTab: (tab: PageTab) => void;
}

export default function About({ setActiveTab }: AboutProps) {
  return (
    <div className="w-full space-y-16 py-10 max-w-7xl mx-auto px-6 relative z-10 select-none">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          রসায়ন বিভাগ অ্যালামনাই অ্যাসোসিয়েশন, রাজশাহী কলেজ
        </h1>
        <p className="text-amber-400 font-bold text-sm sm:text-base">
          রাজশাহী কলেজের রসায়ন বিভাগের কৃতি প্রাক্তন ও বর্তমান শিক্ষার্থীদের মধ্যে একটি সুদৃঢ় সেতুবন্ধন তৈরি করা এবং শিক্ষার সার্বিক মানোন্নয়নে ভূমিকা রাখা।
        </p>
      </div>

      {/* History & Heritage Box matching screenshot 2 */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 sm:p-10 border border-slate-800/80 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
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
              <div key={idx} className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 text-center space-y-1">
                <span className="text-lg font-black text-amber-400 block font-mono">{ms.year}</span>
                <span className="text-xs font-bold text-slate-100 block">{ms.title}</span>
                <span className="text-[10px] text-slate-400 block truncate">{ms.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Badge Box matching screenshot 2 golden badge */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <div className="bg-gradient-to-br from-[#0b192c]/90 to-[#1e293b]/90 backdrop-blur-md text-white p-8 rounded-2xl border-2 border-amber-500/40 shadow-2xl text-center space-y-4 max-w-sm w-full">
            <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 font-black text-2xl flex items-center justify-center mx-auto shadow-lg">
              ১৪০+
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-amber-400">১৪০+ বছরেরও বেশি</h3>
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
          </div>
        </div>
      </div>

      {/* Vision & Mission Two Column Cards matching screenshot 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision Box */}
        <div className="bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-slate-800/80 shadow-md space-y-4 relative overflow-hidden group hover:border-amber-400 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">আমাদের ভিশন (লক্ষ্য)</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            রাজশাহী college রসায়ন বিভাগের গৌরবময় ঐতিহ্যকে ধারণ করে জাতীয় ও আন্তর্জাতিক পর্যায়ে রসায়ন শিক্ষা ও গবেষণার টেকসই প্রসারে নেতৃত্ব দেওয়া। শিক্ষার্থীদের মাঝে বৈজ্ঞানিক উদ্ভাবনী চিন্তা ও মানবিক মূল্যবোধ জাগ্রত করা।
          </p>
        </div>

        {/* Mission Box */}
        <div className="bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-slate-800/80 shadow-md space-y-4 relative overflow-hidden group hover:border-blue-400 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">আমাদের মিশন (উদ্দেশ্য)</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            দেশ-বিদেশে ছড়িয়ে থাকা রসায়ন বিভাগের প্রাক্তন শিক্ষার্থীদের মধ্যে একটি সুদৃঢ় ও সহযোগিতাপূর্ণ নেটওয়ার্ক গড়ে তোলা। বর্তমান শিক্ষার্থীদের উচ্চশিক্ষা ও গবেষণায় সহায়তা প্রদান করা এবং সামাজিক ও জাতীয় উন্নয়নে রসায়নের জ্ঞানকে কাজে লাগানো।
          </p>
        </div>
      </div>

      {/* Executive Committee Section matching screenshot 2 */}
      <div className="space-y-8">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">নেতৃত্ব</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            নির্বাহী কমিটির সদস্যবৃন্দ
          </h2>
          <p className="text-xs text-slate-400">অ্যাসোসিয়েশনের গৌরবময় দায়িত্বে থাকা কর্মকর্তাবৃন্দের পরিচয়</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {EXECUTIVE_COMMITTEE.map((mem, idx) => (
            <div key={idx} className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 text-center shadow-sm hover:shadow-lg hover:border-amber-500/30 transition-all flex flex-col items-center space-y-3">
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
                <p className="text-[11px] text-slate-400 pt-1">{mem.edu}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
