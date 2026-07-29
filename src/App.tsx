/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageTab, NoticeItem, EventItem, MembershipApplication, TeacherProfile, NotableAlumni, GallerySlide, TeacherQuote, ExecutiveMember } from './types';
import { 
  TEACHER_QUOTES, 
  INITIAL_NOTICES, 
  INITIAL_EVENTS, 
  INITIAL_APPLICATIONS, 
  DEPARTMENT_TEACHERS, 
  NOTABLE_ALUMNI, 
  INITIAL_GALLERY_SLIDES,
  EXECUTIVE_COMMITTEE
} from './data/mockData';

import { 
  getCollectionData, 
  saveDocument, 
  deleteDocument, 
  getSettingsDoc, 
  saveSettingsDoc 
} from './firebase';

import BackgroundAtoms from './components/BackgroundAtoms';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import AlumniMember from './pages/AlumniMember';
import Events from './pages/Events';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [loading, setLoading] = useState(true);

  // Dynamic States for WordPress CMS system
  const [notices, setNotices] = useState<NoticeItem[]>(INITIAL_NOTICES);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [applications, setApplications] = useState<MembershipApplication[]>(INITIAL_APPLICATIONS);
  
  const [teachers, setTeachers] = useState<TeacherProfile[]>(DEPARTMENT_TEACHERS);
  const [notableAlumni, setNotableAlumni] = useState<NotableAlumni[]>(NOTABLE_ALUMNI);
  const [teacherQuotes, setTeacherQuotes] = useState<TeacherQuote[]>(TEACHER_QUOTES);
  const [executiveMembers, setExecutiveMembers] = useState<ExecutiveMember[]>(EXECUTIVE_COMMITTEE);
  
  // Slide gallery dynamic options
  const [gallerySlides, setGallerySlides] = useState<GallerySlide[]>(INITIAL_GALLERY_SLIDES);
  const [galleryHeadline, setGalleryHeadline] = useState('বিভাগীয় স্মৃতিচারণ ও স্লাইড গ্যালারি');
  const [gallerySubheadline, setGallerySubheadline] = useState('ফটো গ্যালারি ও স্মৃতির কোলাজ');
  const [galleryDescription, setGalleryDescription] = useState('রসায়ন বিভাগের আধুনিক ল্যাবরেটরি, বিশেষ ক্যারিয়ার সেমিনার এবং কৃতি শিক্ষার্থীদের বর্ণিল মিলনমেলার কিছু খণ্ডচিত্র।');

  // Preload critical external images for ultra-fast performance and zero loading delay
  useEffect(() => {
    const imagesToPreload = [
      'https://res.cloudinary.com/ydwdvzyo/image/upload/v1785331170/unnamed_dbi26h.webp',
      'https://res.cloudinary.com/ydwdvzyo/image/upload/v1785331256/unnamed_1_qlhwlv.webp',
      'https://6a3ffaa0f4f12d1dab644ce8.imgix.net/chemistry/chemistry logo.png'
    ];
    
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Load Firestore Data on Mount
  useEffect(() => {
    async function loadAllData() {
      try {
        setLoading(true);
        const [
          fbNotices,
          fbEvents,
          fbApplications,
          fbTeachers,
          fbNotableAlumni,
          fbTeacherQuotes,
          fbExecutiveMembers,
          fbGallerySlides,
          fbGallerySettings
        ] = await Promise.all([
          getCollectionData('notices', INITIAL_NOTICES),
          getCollectionData('events', INITIAL_EVENTS),
          getCollectionData('applications', INITIAL_APPLICATIONS),
          getCollectionData('teachers', DEPARTMENT_TEACHERS),
          getCollectionData('notableAlumni', NOTABLE_ALUMNI),
          getCollectionData('teacherQuotes', TEACHER_QUOTES),
          getCollectionData('executiveMembers', EXECUTIVE_COMMITTEE),
          getCollectionData('gallerySlides', INITIAL_GALLERY_SLIDES),
          getSettingsDoc('gallery', {
            headline: 'বিভাগীয় স্মৃতিচারণ ও স্লাইড গ্যালারি',
            subheadline: 'ফটো গ্যালারি ও স্মৃতির কোলাজ',
            description: 'রসায়ন বিভাগের আধুনিক ল্যাবরেটরি, বিশেষ ক্যারিয়ার সেমিনার এবং কৃতি শিক্ষার্থীদের বর্ণিল মিলনমেলার কিছু খণ্ডচিত্র।'
          })
        ]);

        setNotices(fbNotices);
        setEvents(fbEvents);
        setApplications(fbApplications);
        setTeachers(fbTeachers);
        setNotableAlumni(fbNotableAlumni);
        setTeacherQuotes(fbTeacherQuotes);
        setExecutiveMembers(fbExecutiveMembers);
        setGallerySlides(fbGallerySlides);
        setGalleryHeadline(fbGallerySettings.headline);
        setGallerySubheadline(fbGallerySettings.subheadline);
        setGalleryDescription(fbGallerySettings.description);
      } catch (err) {
        console.error('Error loading all data from Firestore:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAllData();
  }, []);

  // Sync wrappers to update state & Firestore collection in background
  const handleUpdateNotices = async (newNotices: NoticeItem[]) => {
    setNotices(newNotices);
    try {
      const oldIds = notices.map(n => n.id);
      const newIds = newNotices.map(n => n.id);
      for (const id of oldIds) {
        if (!newIds.includes(id)) {
          await deleteDocument('notices', id);
        }
      }
      for (const item of newNotices) {
        await saveDocument('notices', item.id, item);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateEvents = async (newEvents: EventItem[]) => {
    setEvents(newEvents);
    try {
      const oldIds = events.map(e => e.id);
      const newIds = newEvents.map(e => e.id);
      for (const id of oldIds) {
        if (!newIds.includes(id)) {
          await deleteDocument('events', id);
        }
      }
      for (const item of newEvents) {
        await saveDocument('events', item.id, item);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateApplications = async (newApps: MembershipApplication[]) => {
    setApplications(newApps);
    try {
      const oldIds = applications.map(a => a.id);
      const newIds = newApps.map(a => a.id);
      for (const id of oldIds) {
        if (!newIds.includes(id)) {
          await deleteDocument('applications', id);
        }
      }
      for (const item of newApps) {
        await saveDocument('applications', item.id, item);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateTeachers = async (newTeachers: TeacherProfile[]) => {
    setTeachers(newTeachers);
    try {
      const oldIds = teachers.map(t => t.id);
      const newIds = newTeachers.map(t => t.id);
      for (const id of oldIds) {
        if (!newIds.includes(id)) {
          await deleteDocument('teachers', id);
        }
      }
      for (const item of newTeachers) {
        await saveDocument('teachers', item.id, item);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateNotableAlumni = async (newAlumni: NotableAlumni[]) => {
    setNotableAlumni(newAlumni);
    try {
      const oldIds = notableAlumni.map(a => a.id);
      const newIds = newAlumni.map(a => a.id);
      for (const id of oldIds) {
        if (!newIds.includes(id)) {
          await deleteDocument('notableAlumni', id);
        }
      }
      for (const item of newAlumni) {
        await saveDocument('notableAlumni', item.id, item);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateTeacherQuotes = async (newQuotes: TeacherQuote[]) => {
    setTeacherQuotes(newQuotes);
    try {
      const oldIds = teacherQuotes.map(q => q.id);
      const newIds = newQuotes.map(q => q.id);
      for (const id of oldIds) {
        if (!newIds.includes(id)) {
          await deleteDocument('teacherQuotes', id);
        }
      }
      for (const item of newQuotes) {
        await saveDocument('teacherQuotes', item.id, item);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateExecutiveMembers = async (newMembers: ExecutiveMember[]) => {
    setExecutiveMembers(newMembers);
    try {
      const oldIds = executiveMembers.map(m => m.id);
      const newIds = newMembers.map(m => m.id);
      for (const id of oldIds) {
        if (!newIds.includes(id)) {
          await deleteDocument('executiveMembers', id);
        }
      }
      for (const item of newMembers) {
        await saveDocument('executiveMembers', item.id, item);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateGallerySlides = async (newSlides: GallerySlide[]) => {
    setGallerySlides(newSlides);
    try {
      const oldIds = gallerySlides.map(s => s.id);
      const newIds = newSlides.map(s => s.id);
      for (const id of oldIds) {
        if (!newIds.includes(id)) {
          await deleteDocument('gallerySlides', id);
        }
      }
      for (const item of newSlides) {
        await saveDocument('gallerySlides', item.id, item);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddApplication = async (newApp: MembershipApplication) => {
    const updated = [newApp, ...applications];
    setApplications(updated);
    await saveDocument('applications', newApp.id, newApp);
  };

  const handleAddEvent = async (newEvent: EventItem) => {
    const updated = [newEvent, ...events];
    setEvents(updated);
    await saveDocument('events', newEvent.id, newEvent);
  };

  const handleDeleteEvent = async (id: string) => {
    const updated = events.filter((ev) => ev.id !== id);
    setEvents(updated);
    await deleteDocument('events', id);
  };

  const handleUpdateApplicationStatus = async (id: string, status: 'approved' | 'rejected') => {
    const updated = applications.map((app) => (app.id === id ? { ...app, status } : app));
    setApplications(updated);
    const targetApp = updated.find(app => app.id === id);
    if (targetApp) {
      await saveDocument('applications', id, targetApp);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 font-sans relative overflow-x-hidden">
        <BackgroundAtoms />
        <style>{`
          @keyframes orbit-rotate-1 {
            0% { transform: rotateX(72deg) rotateY(15deg) rotateZ(0deg); }
            100% { transform: rotateX(72deg) rotateY(15deg) rotateZ(360deg); }
          }
          @keyframes orbit-rotate-2 {
            0% { transform: rotateX(72deg) rotateY(-45deg) rotateZ(0deg); }
            100% { transform: rotateX(72deg) rotateY(-45deg) rotateZ(360deg); }
          }
          @keyframes orbit-rotate-3 {
            0% { transform: rotateX(60deg) rotateY(65deg) rotateZ(0deg); }
            100% { transform: rotateX(60deg) rotateY(65deg) rotateZ(360deg); }
          }
          @keyframes nucleus-pulse {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(245, 158, 11, 0.45)); }
            50% { transform: scale(1.05); filter: drop-shadow(0 0 30px rgba(244, 63, 94, 0.75)); }
          }
        `}</style>
        
        <div className="z-10 flex flex-col items-center space-y-8 text-center px-4 max-w-lg">
          {/* Animated 3D Nuclear Atom Structure */}
          <div className="relative w-72 h-72 flex items-center justify-center" style={{ perspective: '1200px' }}>
            {/* Orbit 1 */}
            <div 
              className="absolute w-60 h-60 rounded-full border border-dashed border-amber-500/40"
              style={{
                transformStyle: 'preserve-3d',
                animation: 'orbit-rotate-1 4s linear infinite'
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-400 rounded-full shadow-[0_0_15px_#fbbf24] animate-pulse"></div>
            </div>

            {/* Orbit 2 */}
            <div 
              className="absolute w-60 h-60 rounded-full border border-dashed border-rose-500/40"
              style={{
                transformStyle: 'preserve-3d',
                animation: 'orbit-rotate-2 3.2s linear infinite'
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-rose-500 rounded-full shadow-[0_0_15px_#f43f5e] animate-pulse"></div>
            </div>

            {/* Orbit 3 */}
            <div 
              className="absolute w-60 h-60 rounded-full border border-dashed border-blue-500/40"
              style={{
                transformStyle: 'preserve-3d',
                animation: 'orbit-rotate-3 4.8s linear infinite'
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_15px_#60a5fa] animate-pulse"></div>
            </div>

            {/* Nucleus (Chemistry Logo) */}
            <div className="absolute w-22 h-22 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-2xl overflow-hidden z-20">
              <img 
                src="https://6a3ffaa0f4f12d1dab644ce8.imgix.net/chemistry/chemistry logo.png" 
                alt="Chemistry Logo" 
                className="w-full h-full object-contain scale-[1.5] animate-[nucleus-pulse_3s_ease-in-out_infinite]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500 bg-clip-text text-transparent">
              অ্যাসোসিয়েশন ডাটাবেজ লোড হচ্ছে...
            </h1>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              অনুগ্রহ করে অপেক্ষা করুন, ফায়ারবেস ক্লাউড স্টোরেজ থেকে রিয়েল-টাইম ডাটা রিট্রিভ করা হচ্ছে।
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col justify-between font-sans relative overflow-x-hidden selection:bg-amber-500 selection:text-slate-950">
      {/* Floating chemistry symbols background */}
      <BackgroundAtoms />

      {/* Main sticky top header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Page Views routed by tab matching exact screenshot layouts */}
      <main className="flex-1 w-full relative z-10">
        {activeTab === 'home' && (
          <Home
            setActiveTab={setActiveTab}
            teacherQuotes={teacherQuotes}
            notices={notices}
            events={events}
            gallerySlides={gallerySlides}
            galleryHeadline={galleryHeadline}
            gallerySubheadline={gallerySubheadline}
            galleryDescription={galleryDescription}
          />
        )}
        {activeTab === 'about' && (
          <About 
            setActiveTab={setActiveTab} 
            executiveMembers={executiveMembers} 
          />
        )}
        {activeTab === 'alumni' && (
          <AlumniMember 
            teachers={teachers}
            notableAlumni={notableAlumni}
            applications={applications}
          />
        )}
        {activeTab === 'events' && <Events events={events} />}
        {activeTab === 'contact' && (
          <Contact
            applications={applications}
            onAddApplication={handleAddApplication}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'admin' && (
          <AdminDashboard
            events={events}
            setEvents={handleUpdateEvents}
            onAddEvent={handleAddEvent}
            onDeleteEvent={handleDeleteEvent}
            applications={applications}
            setApplications={handleUpdateApplications}
            onUpdateApplicationStatus={handleUpdateApplicationStatus}
            teachers={teachers}
            setTeachers={handleUpdateTeachers}
            notableAlumni={notableAlumni}
            setNotableAlumni={handleUpdateNotableAlumni}
            notices={notices}
            setNotices={handleUpdateNotices}
            gallerySlides={gallerySlides}
            setGallerySlides={handleUpdateGallerySlides}
            galleryHeadline={galleryHeadline}
            setGalleryHeadline={setGalleryHeadline}
            gallerySubheadline={gallerySubheadline}
            setGallerySubheadline={setGallerySubheadline}
            galleryDescription={galleryDescription}
            setGalleryDescription={setGalleryDescription}
            teacherQuotes={teacherQuotes}
            setTeacherQuotes={handleUpdateTeacherQuotes}
            executiveMembers={executiveMembers}
            setExecutiveMembers={handleUpdateExecutiveMembers}
          />
        )}
      </main>


      {/* Footer matching exact dark navy layout */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
