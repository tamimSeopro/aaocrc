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
import Membership from './pages/Membership';
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
        <div className="z-10 flex flex-col items-center space-y-4 text-center px-4">
          <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
          <h1 className="text-xl font-bold tracking-wider text-amber-400">অ্যাসোসিয়েশন ডাটাবেজ লোড হচ্ছে...</h1>
          <p className="text-xs text-slate-400">অনুগ্রহ করে অপেক্ষা করুন, ফায়ারবেস ক্লাউড স্টোরেজ থেকে রিয়েল-টাইম ডাটা রিট্রিভ করা হচ্ছে।</p>
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
        {activeTab === 'membership' && (
          <Membership
            applications={applications}
            onAddApplication={handleAddApplication}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'events' && <Events events={events} />}
        {activeTab === 'contact' && <Contact />}
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
