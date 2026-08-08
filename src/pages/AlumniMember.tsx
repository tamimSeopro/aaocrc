import { useState } from 'react';
import { TeacherProfile, NotableAlumni, MembershipApplication } from '../types';
import { Search, Mail, Phone, BookOpen, Award, ExternalLink, UserCheck, GraduationCap, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface AlumniMemberProps {
  teachers: TeacherProfile[];
  notableAlumni: NotableAlumni[];
  applications: MembershipApplication[];
}

export default function AlumniMember({ teachers, notableAlumni, applications }: AlumniMemberProps) {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'teachers' | 'alumni' | 'members'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter teachers
  const filteredTeachers = teachers.filter((t) => {
    const q = searchQuery.toLowerCase();
    return t.name.toLowerCase().includes(q) || t.designation.toLowerCase().includes(q) || t.researchInterest.toLowerCase().includes(q) || t.code.includes(q);
  });

  // Filter alumni
  const filteredAlumni = notableAlumni.filter((a) => {
    const q = searchQuery.toLowerCase();
    return a.name.toLowerCase().includes(q) || a.organization.toLowerCase().includes(q) || a.currentPosition.toLowerCase().includes(q) || a.classOf.toLowerCase().includes(q);
  });

  // Filter approved registered members (Shokol Shodosso)
  const approvedMembers = applications.filter((app) => app.status === 'approved');
  const filteredMembers = approvedMembers.filter((m) => {
    const q = searchQuery.toLowerCase();
    return m.fullName.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.phone.includes(q) || m.passingYear.includes(q) || m.membershipTier.toLowerCase().includes(q);
  });

  const showTeachers = activeSubTab === 'all' || activeSubTab === 'teachers';
  const showAlumni = activeSubTab === 'all' || activeSubTab === 'alumni';
  const showMembers = activeSubTab === 'all' || activeSubTab === 'members';

  return (
    <div className="w-full space-y-12 py-10 px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10 select-none">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3"
      >
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
          রসায়ন বিভাগীয় শিক্ষক ও অ্যালামনাই মেম্বার
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          আমাদের সম্মানিত শিক্ষক ও কৃতি শিক্ষার্থীবৃন্দ
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl mx-auto leading-relaxed">
          রসায়ন বিজ্ঞানের অগ্রযাত্রায় মূল কারিগর আমাদের সুদক্ষ শিক্ষক মণ্ডলী এবং বিশ্বের রথী-মহারথী বৈজ্ঞানিক প্রতিষ্ঠানে নিয়োজিত কৃতি প্রাক্তন ছাত্র-ছাত্রীদের তালিকা নিচে তুলে ধরা হলো।
        </p>
      </motion.div>

      {/* Controls Bar: Sub-tabs and Search */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800/80 shadow-md flex flex-col md:flex-row items-center justify-between gap-4"
      >
        {/* Sub Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveSubTab('all')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            সকল সদস্য
          </button>
          <button
            onClick={() => setActiveSubTab('teachers')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'teachers'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            বিভাগীয় শিক্ষকবৃন্দ ({teachers.length})
          </button>
          <button
            onClick={() => setActiveSubTab('alumni')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'alumni'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            কৃতি অ্যালামনাই ({notableAlumni.length})
          </button>
          <button
            onClick={() => setActiveSubTab('members')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'members'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            নিবন্ধিত সদস্যবৃন্দ ({approvedMembers.length})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নাম বা ব্যাচ লিখে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 text-white border border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-medium"
          />
        </div>
      </motion.div>


      {/* Teachers Section */}
      {showTeachers && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2 border-b border-amber-500/30 pb-3">
            <GraduationCap className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-extrabold text-white">ডিপার্টমেন্টের শিক্ষক মণ্ডলী</h2>
          </div>

          {filteredTeachers.length === 0 ? (
            <div className="bg-slate-900/60 backdrop-blur-md p-12 rounded-2xl border border-slate-800/80 text-center text-slate-400 text-sm">
              কোনো শিক্ষক প্রোফাইল খুঁজে পাওয়া যায়নি।
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTeachers.map((t, idx) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 shadow-sm hover:border-amber-500/30 transition-all flex flex-col sm:flex-row items-start gap-4 relative overflow-hidden group"
                >
                  {/* Category badge */}
                  <span className="absolute top-3 right-3 text-[10px] font-mono bg-slate-850 border border-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">
                    Code: {t.code}
                  </span>

                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-20 h-20 rounded-xl object-cover border border-slate-800 shrink-0 shadow-sm"
                  />

                  <div className="space-y-2 flex-1 text-xs pr-12">
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                        {t.category === 'head' ? 'বিভাগীয় প্রধান' : 'শিক্ষক ফোরাম'}
                      </span>
                      <h3 className="font-extrabold text-white text-sm group-hover:text-amber-400 transition-colors">
                        {t.name}
                      </h3>
                      <p className="text-slate-300 font-semibold text-[11px] mt-0.5">{t.designation}</p>
                    </div>

                    <div className="space-y-1 text-slate-300 pt-1 border-t border-slate-800/60">
                      <p><strong className="text-slate-400">শিক্ষা:</strong> {t.education}</p>
                      <p className="flex items-center gap-1.5 text-slate-200">
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>মোবাইল: {t.phone}</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-slate-200">
                        <Mail className="w-3.5 h-3.5 text-amber-400" />
                        <a href={`mailto:${t.email}`} className="hover:text-amber-400 truncate">{t.email}</a>
                      </p>
                      <p className="pt-1 text-slate-200 bg-amber-950/20 p-2 rounded-lg border border-amber-500/10">
                        <strong className="text-amber-400">গবেষণা ক্ষেত্র:</strong> {t.researchInterest}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Alumni Section */}
      {showAlumni && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 pt-6"
        >
          <div className="flex items-center gap-2 border-b border-amber-500/30 pb-3">
            <Award className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-extrabold text-white">বিশ্ববন্দিত কৃতি অ্যালামনাই (শিক্ষার্থীবৃন্দ)</h2>
          </div>

          {filteredAlumni.length === 0 ? (
            <div className="bg-slate-900/60 backdrop-blur-md p-12 rounded-2xl border border-slate-800/80 text-center text-slate-400 text-sm">
              কোনো প্রাক্তন শিক্ষার্থী খুঁজে পাওয়া যায়নি।
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlumni.map((al, idx) => (
                <motion.div
                  key={al.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 shadow-sm hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={al.image}
                        alt={al.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/20 shrink-0"
                      />
                      <div>
                        <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-bold inline-block mb-1">
                          {al.classOf}
                        </span>
                        <h3 className="font-extrabold text-white text-sm group-hover:text-amber-400 transition-colors">
                          {al.name}
                        </h3>
                      </div>
                    </div>

                    <div className="text-xs bg-slate-950/60 p-3 rounded-xl space-y-1 border border-slate-800/50">
                      <p className="font-bold text-slate-100">{al.currentPosition}</p>
                      <p className="text-amber-400 font-semibold">{al.organization}</p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-400">কৃতি অর্জন:</strong> {al.achievements}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                    <a
                      href={`mailto:${al.email}`}
                      className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors truncate max-w-[180px]"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{al.email}</span>
                    </a>
                    <button className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 cursor-pointer">
                      <span>প্রোফাইল</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Registered Members Section (Shokol Shodosso) */}
      {showMembers && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 pt-6"
        >
          <div className="flex items-center gap-2 border-b border-amber-500/30 pb-3">
            <UserCheck className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-extrabold text-white">অ্যাসোসিয়েশনের নিবন্ধিত সদস্যবৃন্দ</h2>
          </div>

          {filteredMembers.length === 0 ? (
            <div className="bg-slate-900/60 backdrop-blur-md p-12 rounded-2xl border border-slate-800/80 text-center text-slate-400 text-sm">
              কোনো নিবন্ধিত সদস্য খুঁজে পাওয়া যায়নি।
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((m, idx) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 shadow-sm hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-amber-400 text-lg shadow-sm">
                        {m.fullName.charAt(0)}
                      </div>
                      <div>
                        <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-bold inline-block mb-1">
                          ব্যাচ: {m.passingYear}
                        </span>
                        <h3 className="font-extrabold text-white text-sm group-hover:text-amber-400 transition-colors">
                          {m.fullName}
                        </h3>
                      </div>
                    </div>

                    <div className="text-xs bg-slate-950/60 p-3 rounded-xl space-y-1.5 border border-slate-800/50">
                      <p className="font-bold text-amber-400 text-[11px]">{m.membershipTier}</p>
                      <p className="text-slate-300">বিষয়: {m.major}</p>
                      <p className="text-slate-400 text-[10px]">প্রতিষ্ঠান: {m.institution}</p>
                    </div>

                    {m.additionalInfo && (
                      <p className="text-xs text-slate-400 italic leading-relaxed">
                        "{m.additionalInfo}"
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                    <div className="flex items-center gap-1.5 text-slate-400 truncate max-w-[180px]">
                      <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{m.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{m.phone}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
