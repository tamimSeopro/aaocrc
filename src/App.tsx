/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
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

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');

  // Dynamic States for WordPress CMS system
  const [notices, setNotices] = useState<NoticeItem[]>(INITIAL_NOTICES);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [applications, setApplications] = useState<MembershipApplication[]>(INITIAL_APPLICATIONS);
  
  const [teachers, setTeachers] = useState<TeacherProfile[]>(DEPARTMENT_TEACHERS);
  const [notableAlumni, setNotableAlumni] = useState<NotableAlumni[]>(NOTABLE_ALUMNI);

  const [teacherQuotes, setTeacherQuotes] = useState<TeacherQuote[]>(() => {
    const saved = localStorage.getItem('aaa_teacher_quotes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return TEACHER_QUOTES;
  });

  const handleUpdateTeacherQuotes = (updated: TeacherQuote[]) => {
    setTeacherQuotes(updated);
    localStorage.setItem('aaa_teacher_quotes', JSON.stringify(updated));
  };

  const [executiveMembers, setExecutiveMembers] = useState<ExecutiveMember[]>(() => {
    const saved = localStorage.getItem('aaa_executive_members');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return EXECUTIVE_COMMITTEE;
  });

  const handleUpdateExecutiveMembers = (updated: ExecutiveMember[]) => {
    setExecutiveMembers(updated);
    localStorage.setItem('aaa_executive_members', JSON.stringify(updated));
  };
  
  // Slide gallery dynamic options
  const [gallerySlides, setGallerySlides] = useState<GallerySlide[]>(INITIAL_GALLERY_SLIDES);
  const [galleryHeadline, setGalleryHeadline] = useState('বিভাগীয় স্মৃতিচারণ ও স্লাইড গ্যালারি');
  const [gallerySubheadline, setGallerySubheadline] = useState('ফটো গ্যালারি ও স্মৃতির কোলাজ');
  const [galleryDescription, setGalleryDescription] = useState('রসায়ন বিভাগের আধুনিক ল্যাবরেটরি, বিশেষ ক্যারিয়ার সেমিনার এবং কৃতি শিক্ষার্থীদের বর্ণিল মিলনমেলার কিছু খণ্ডচিত্র।');

  const handleAddApplication = (newApp: MembershipApplication) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  const handleAddEvent = (newEvent: EventItem) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  const handleUpdateApplicationStatus = (id: string, status: 'approved' | 'rejected') => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

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
            setEvents={setEvents}
            onAddEvent={handleAddEvent}
            onDeleteEvent={handleDeleteEvent}
            applications={applications}
            setApplications={setApplications}
            onUpdateApplicationStatus={handleUpdateApplicationStatus}
            teachers={teachers}
            setTeachers={setTeachers}
            notableAlumni={notableAlumni}
            setNotableAlumni={setNotableAlumni}
            notices={notices}
            setNotices={setNotices}
            gallerySlides={gallerySlides}
            setGallerySlides={setGallerySlides}
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
