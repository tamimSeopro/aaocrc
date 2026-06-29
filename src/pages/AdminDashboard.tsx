import { useState, FormEvent } from 'react';
import { 
  PageTab, 
  EventItem, 
  MembershipApplication, 
  TeacherProfile, 
  NotableAlumni, 
  NoticeItem, 
  GallerySlide,
  Moderator,
  AdminPermissions,
  TeacherQuote,
  ExecutiveMember
} from '../types';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Image as ImageIcon, 
  UserCheck, 
  Inbox, 
  Settings, 
  LogOut, 
  Trash2, 
  Edit,
  Check, 
  X, 
  ShieldAlert, 
  Upload, 
  Sparkles, 
  Plus,
  ArrowRight,
  Lock,
  User,
  Users,
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  AlertCircle,
  Shield,
  UserPlus
} from 'lucide-react';

interface AdminDashboardProps {
  events: EventItem[];
  setEvents: (ev: EventItem[]) => void;
  onAddEvent: (newEvent: EventItem) => void;
  onDeleteEvent: (id: string) => void;
  applications: MembershipApplication[];
  setApplications: (app: MembershipApplication[]) => void;
  onUpdateApplicationStatus: (id: string, status: 'approved' | 'rejected') => void;
  teachers: TeacherProfile[];
  setTeachers: (t: TeacherProfile[]) => void;
  notableAlumni: NotableAlumni[];
  setNotableAlumni: (a: NotableAlumni[]) => void;
  notices: NoticeItem[];
  setNotices: (n: NoticeItem[]) => void;
  gallerySlides: GallerySlide[];
  setGallerySlides: (g: GallerySlide[]) => void;
  galleryHeadline: string;
  setGalleryHeadline: (s: string) => void;
  gallerySubheadline: string;
  setGallerySubheadline: (s: string) => void;
  galleryDescription: string;
  setGalleryDescription: (s: string) => void;
  teacherQuotes: TeacherQuote[];
  setTeacherQuotes: (quotes: TeacherQuote[]) => void;
  executiveMembers: ExecutiveMember[];
  setExecutiveMembers: (members: ExecutiveMember[]) => void;
}

export default function AdminDashboard({
  events,
  setEvents,
  onAddEvent,
  onDeleteEvent,
  applications,
  setApplications,
  onUpdateApplicationStatus,
  teachers,
  setTeachers,
  notableAlumni,
  setNotableAlumni,
  notices,
  setNotices,
  gallerySlides,
  setGallerySlides,
  galleryHeadline,
  setGalleryHeadline,
  gallerySubheadline,
  setGallerySubheadline,
  galleryDescription,
  setGalleryDescription,
  teacherQuotes,
  setTeacherQuotes,
  executiveMembers,
  setExecutiveMembers
}: AdminDashboardProps) {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Track logged-in user details
  const [currentUser, setCurrentUser] = useState<{
    email: string;
    role: 'admin' | 'moderator';
    permissions: AdminPermissions;
  } | null>(null);

  // Dashboard Sub-Tabs State
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'teachers' | 'quotes' | 'executives' | 'notices' | 'gallery' | 'members' | 'alumni' | 'events' | 'registrations' | 'inbox' | 'settings' | 'moderators'>('overview');

  // Unified Success/Save States
  const [saveSuccess, setSaveSuccess] = useState(false);

  // --- Moderators List & Persistence ---
  const [moderators, setModerators] = useState<Moderator[]>(() => {
    const stored = localStorage.getItem('aaa_moderators');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    // Default high-quality mock moderators for a premium out-of-the-box look
    return [
      {
        id: 'mod-1',
        email: 'moderator1@gmail.com',
        fullName: 'প্রফেসর সাজেদুল ইসলাম',
        password: 'password123',
        createdDate: '২৮ জুন ২০২৬',
        permissions: {
          overview: true,
          teachers: true,
          notices: true,
          gallery: false,
          members: true,
          alumni: false,
          events: true,
          registrations: false,
          inbox: true,
          settings: false
        }
      },
      {
        id: 'mod-2',
        email: 'moderator2@gmail.com',
        fullName: 'ড. নুসরাত জাহান',
        password: 'password123',
        createdDate: '২৯ জুন ২০২৬',
        permissions: {
          overview: true,
          teachers: false,
          notices: true,
          gallery: true,
          members: false,
          alumni: true,
          events: false,
          registrations: true,
          inbox: false,
          settings: false
        }
      }
    ];
  });

  const saveModerators = (updated: Moderator[]) => {
    setModerators(updated);
    localStorage.setItem('aaa_moderators', JSON.stringify(updated));
  };

  // --- 7. Moderator Editor States ---
  const [editingModId, setEditingModId] = useState<string | null>(null);
  const [modFullName, setModFullName] = useState('');
  const [modEmail, setModEmail] = useState('');
  const [modPassword, setModPassword] = useState('');
  const [modPermissions, setModPermissions] = useState<AdminPermissions>({
    overview: true,
    teachers: false,
    notices: false,
    gallery: false,
    members: false,
    alumni: false,
    events: false,
    registrations: false,
    inbox: false,
    settings: false
  });

  // Permission check helper
  const hasPermission = (tab: string): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'admin') return true;
    if (tab === 'moderators') return false; // Only admin can manage moderators
    return currentUser.permissions[tab as keyof AdminPermissions] ?? false;
  };

  // --- 1. Teacher Editor States ---
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null);
  const [tName, setTName] = useState('');
  const [tDesignation, setTDesignation] = useState('');
  const [tCategory, setTCategory] = useState<'head' | 'faculty'>('faculty');
  const [tCode, setTCode] = useState('');
  const [tEducation, setTEducation] = useState('');
  const [tPhone, setTPhone] = useState('');
  const [tEmail, setTEmail] = useState('');
  const [tResearchInterest, setTResearchInterest] = useState('');
  const [tImage, setTImage] = useState('');

  // --- 1b. Teacher Quotes Editor States ---
  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null);
  const [qName, setQName] = useState('');
  const [qDesignation, setQDesignation] = useState('');
  const [qDepartment, setQDepartment] = useState('রসায়ন বিভাগ, রাজশাহী কলেজ');
  const [qQuote, setQQuote] = useState('');
  const [qImage, setQImage] = useState('');

  // --- 1c. Executive Members Editor States ---
  const [editingExeId, setEditingExeId] = useState<string | null>(null);
  const [exeName, setExeName] = useState('');
  const [exeRole, setExeRole] = useState('');
  const [exeEdu, setExeEdu] = useState('');
  const [exeImage, setExeImage] = useState('');

  // --- 2. Notices Editor States ---
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [nTitle, setNTitle] = useState('');
  const [nDate, setNDate] = useState('');
  const [nContent, setNContent] = useState('');
  const [nCategory, setNCategory] = useState('বিজ্ঞপ্তি');
  const [nPdfUrl, setNPdfUrl] = useState('');
  const [nIsUrgent, setNIsUrgent] = useState(false);

  // --- 3. Gallery Slide Editor States ---
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [sUrl, setSUrl] = useState('');
  const [sTitle, setSTitle] = useState('');
  const [sDescription, setSDescription] = useState('');

  // --- 4. Shokol Shodosso (Members) Editor States ---
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [mFullName, setMFullName] = useState('');
  const [mEmail, setMEmail] = useState('');
  const [mPhone, setMPhone] = useState('');
  const [mInstitution, setMInstitution] = useState('রাজশাহী কলেজ');
  const [mMajor, setMMajor] = useState('রসায়ন (B.Sc Honours)');
  const [mPassingYear, setMPassingYear] = useState('2024');
  const [mMembershipTier, setMMembershipTier] = useState('আজীবন সদস্য (Life Member)');
  const [mStatus, setMStatus] = useState<'approved' | 'rejected' | 'pending'>('approved');

  // --- 5. Kriti Alumni Editor States ---
  const [editingAlumniId, setEditingAlumniId] = useState<string | null>(null);
  const [alName, setAlName] = useState('');
  const [alClassOf, setAlClassOf] = useState('');
  const [alImage, setAlImage] = useState('');
  const [alCurrentPosition, setAlCurrentPosition] = useState('');
  const [alOrganization, setAlOrganization] = useState('');
  const [alAchievements, setAlAchievements] = useState('');
  const [alEmail, setAlEmail] = useState('');

  // --- 6. Event Page Editor States ---
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [evTitle, setEvTitle] = useState('');
  const [evCategory, setEvCategory] = useState<'seminar' | 'reunion' | 'gallery' | 'news'>('seminar');
  const [evDate, setEvDate] = useState('');
  const [evTime, setEvTime] = useState('');
  const [evLocation, setEvLocation] = useState('');
  const [evDescription, setEvDescription] = useState('');
  const [evBadge, setEvBadge] = useState('');
  const [evImage, setEvImage] = useState('');

  // Settings State
  const [siteTitle, setSiteTitle] = useState('রসায়ন বিভাগ অ্যালামনাই অ্যাসোসিয়েশন, রাজশাহী কলেজ');
  const [contactHotline, setContactHotline] = useState('০১৭৫১-০৭০৪৯২');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Mock Media Library
  const [mediaItems, setMediaItems] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=600', name: 'lab_microscope.jpg' },
    { id: 2, url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600', name: 'seminar_auditorium.jpg' },
    { id: 3, url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600', name: 'graduation_ceremony.jpg' },
    { id: 4, url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=600', name: 'thesis_research.jpg' },
    { id: 5, url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600', name: 'campus_library.jpg' },
    { id: 6, url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600', name: 'reunion_group.jpg' },
  ]);

  // Mock Contact Inbox
  const [inboxMessages, setInboxMessages] = useState([
    { id: 1, name: 'তানভীর আহমেদ', email: 'tanvir@gmail.com', subject: 'পুনর্মিলনী ফি সংক্রান্ত', message: 'আসসালামু আলাইকুম, আমি ২০০৯ ব্যাচের ছাত্র। পুনর্মিলনী ফি প্রদানের বিকাশ নম্বরটি পাওয়া যাবে কি?', date: '২৯ জুন ২০২৬', isRead: false },
    { id: 2, name: 'নুসরাত জাহান', email: 'nusrat@yahoo.com', subject: 'আইডি কার্ড ও প্রশংসাপত্র', message: 'আমার আজীবন সদস্য পদের সনদ ও প্রশংসাপত্রটি কীভাবে সংগ্রহ করতে পারি?', date: '২৮ জুন ২০২৬', isRead: false },
    { id: 3, name: 'প্রফেসর সাজেদুল ইসলাম', email: 'sajedul@rc.edu.bd', subject: 'সেমিনার স্লাইড আপলোড', message: 'আগামী সপ্তাহের কেমিক্যাল সেমিনারের স্লাইডগুলো লবিতে প্রচার করার অনুরোধ রইল।', date: '২৫ জুন ২০২৬', isRead: true },
  ]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const lowerUser = username.trim().toLowerCase();
    const trimmedPass = password.trim();

    // Dynamically decode primary credential from base64 so inspect/developer tool can't find it easily
    const _secKey = atob("bWR0YW1pbUBnbWFpbC5jb20=");

    if (lowerUser === _secKey && trimmedPass === _secKey) {
      setIsLoggedIn(true);
      setCurrentUser({
        email: _secKey,
        role: 'admin',
        permissions: {
          overview: true,
          teachers: true,
          notices: true,
          gallery: true,
          members: true,
          alumni: true,
          events: true,
          registrations: true,
          inbox: true,
          settings: true
        }
      });
      setLoginError('');
    } else {
      // Check moderators
      const matchedMod = moderators.find(m => m.email.toLowerCase() === lowerUser && m.password === trimmedPass);
      if (matchedMod) {
        setIsLoggedIn(true);
        setCurrentUser({
          email: matchedMod.email,
          role: 'moderator',
          permissions: matchedMod.permissions
        });
        setLoginError('');
        
        // Auto-select first permitted sub-tab
        const firstPermitted = Object.keys(matchedMod.permissions).find(
          key => matchedMod.permissions[key as keyof AdminPermissions]
        ) as any;
        if (firstPermitted) {
          setActiveSubTab(firstPermitted);
        } else {
          setActiveSubTab('overview');
        }
      } else {
        setLoginError('ভুল ইমেল বা পাসওয়ার্ড! অনুগ্রহ করে সঠিক তথ্য প্রদান করুন।');
      }
    }
  };

  const handleMockUpload = () => {
    const urls = [
      'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=600',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
      'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=600'
    ];
    const names = ['spectrometer_data.jpg', 'chem_bond_graph.png', 'lab_safety.png'];
    const randomIndex = Math.floor(Math.random() * urls.length);
    
    const newItem = {
      id: Date.now(),
      url: urls[randomIndex],
      name: names[randomIndex],
    };
    
    setMediaItems([newItem, ...mediaItems]);
  };

  const handleToggleRead = (id: number) => {
    setInboxMessages(
      inboxMessages.map((m) => (m.id === id ? { ...m, isRead: !m.isRead } : m))
    );
  };

  const handleSaveSettings = (e: FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // --- 7. Moderator CRUD Handlers ---
  const handleSaveModerator = (e: FormEvent) => {
    e.preventDefault();
    if (!modFullName || !modEmail || !modPassword) return;

    if (editingModId) {
      const updated = moderators.map(m => m.id === editingModId ? {
        ...m,
        fullName: modFullName,
        email: modEmail,
        password: modPassword,
        permissions: modPermissions
      } : m);
      saveModerators(updated);
      setEditingModId(null);
    } else {
      const newMod: Moderator = {
        id: `mod-${Date.now()}`,
        fullName: modFullName,
        email: modEmail,
        password: modPassword,
        permissions: modPermissions,
        createdDate: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      saveModerators([newMod, ...moderators]);
    }

    setModFullName('');
    setModEmail('');
    setModPassword('');
    setModPermissions({
      overview: true,
      teachers: false,
      notices: false,
      gallery: false,
      members: false,
      alumni: false,
      events: false,
      registrations: false,
      inbox: false,
      settings: false
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleEditModerator = (m: Moderator) => {
    setEditingModId(m.id);
    setModFullName(m.fullName);
    setModEmail(m.email);
    setModPassword(m.password || '');
    setModPermissions(m.permissions);
  };

  const handleDeleteModerator = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিতভাবে এই মডারেটরটি মুছে ফেলতে চান?')) {
      const updated = moderators.filter(m => m.id !== id);
      saveModerators(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  // --- CRUD Handlers ---

  // 1. Teacher Save/Submit
  const handleSaveTeacher = (e: FormEvent) => {
    e.preventDefault();
    if (!tName || !tDesignation) return;

    if (editingTeacherId) {
      setTeachers(
        teachers.map(t => t.id === editingTeacherId ? {
          ...t,
          name: tName,
          designation: tDesignation,
          category: tCategory,
          code: tCode || 'T-99',
          education: tEducation,
          phone: tPhone,
          email: tEmail,
          researchInterest: tResearchInterest,
          image: tImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
        } : t)
      );
      setEditingTeacherId(null);
    } else {
      const newTeacher: TeacherProfile = {
        id: `teacher-${Date.now()}`,
        name: tName,
        designation: tDesignation,
        category: tCategory,
        code: tCode || `T-${teachers.length + 1}`,
        education: tEducation,
        phone: tPhone,
        email: tEmail,
        researchInterest: tResearchInterest,
        image: tImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      };
      setTeachers([newTeacher, ...teachers]);
    }

    // Reset Form
    setTName(''); setTDesignation(''); setTCategory('faculty'); setTCode(''); setTEducation(''); setTPhone(''); setTEmail(''); setTResearchInterest(''); setTImage('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const startEditTeacher = (t: TeacherProfile) => {
    setEditingTeacherId(t.id);
    setTName(t.name);
    setTDesignation(t.designation);
    setTCategory(t.category);
    setTCode(t.code);
    setTEducation(t.education);
    setTPhone(t.phone);
    setTEmail(t.email);
    setTResearchInterest(t.researchInterest);
    setTImage(t.image);
  };

  const handleDeleteTeacher = (id: string) => {
    setTeachers(teachers.filter(t => t.id !== id));
  };

  // 1b. Teacher Quotes CRUD Handlers
  const handleSaveQuote = (e: FormEvent) => {
    e.preventDefault();
    if (!qName || !qQuote) return;

    if (editingQuoteId) {
      setTeacherQuotes(
        teacherQuotes.map(q => q.id === editingQuoteId ? {
          ...q,
          name: qName,
          designation: qDesignation,
          department: qDepartment || 'রসায়ন বিভাগ, রাজশাহী কলেজ',
          quote: qQuote,
          image: qImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
        } : q)
      );
      setEditingQuoteId(null);
    } else {
      const newQuote: TeacherQuote = {
        id: `quote-${Date.now()}`,
        name: qName,
        designation: qDesignation,
        department: qDepartment || 'রসায়ন বিভাগ, রাজশাহী কলেজ',
        quote: qQuote,
        image: qImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      };
      setTeacherQuotes([newQuote, ...teacherQuotes]);
    }

    // Reset Form
    setQName(''); setQDesignation(''); setQDepartment('রসায়ন বিভাগ, রাজশাহী কলেজ'); setQQuote(''); setQImage('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const startEditQuote = (q: TeacherQuote) => {
    setEditingQuoteId(q.id);
    setQName(q.name);
    setQDesignation(q.designation);
    setQDepartment(q.department);
    setQQuote(q.quote);
    setQImage(q.image);
  };

  const handleDeleteQuote = (id: string) => {
    setTeacherQuotes(teacherQuotes.filter(q => q.id !== id));
  };

  // 1c. Executive Members CRUD Handlers
  const handleSaveExecutiveMember = (e: FormEvent) => {
    e.preventDefault();
    if (!exeName || !exeRole) return;

    if (editingExeId) {
      setExecutiveMembers(
        executiveMembers.map(m => m.id === editingExeId ? {
          ...m,
          name: exeName,
          role: exeRole,
          edu: exeEdu,
          image: exeImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
        } : m)
      );
      setEditingExeId(null);
    } else {
      const newMember: ExecutiveMember = {
        id: `exe-${Date.now()}`,
        name: exeName,
        role: exeRole,
        edu: exeEdu,
        image: exeImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      };
      setExecutiveMembers([...executiveMembers, newMember]);
    }

    // Reset Form
    setExeName(''); setExeRole(''); setExeEdu(''); setExeImage('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const startEditExecutiveMember = (m: ExecutiveMember) => {
    setEditingExeId(m.id);
    setExeName(m.name);
    setExeRole(m.role);
    setExeEdu(m.edu);
    setExeImage(m.image);
  };

  const handleDeleteExecutiveMember = (id: string) => {
    setExecutiveMembers(executiveMembers.filter(m => m.id !== id));
  };

  // 2. Notices Save/Submit
  const handleSaveNotice = (e: FormEvent) => {
    e.preventDefault();
    if (!nTitle || !nDate) return;

    if (editingNoticeId) {
      setNotices(
        notices.map(n => n.id === editingNoticeId ? {
          ...n,
          title: nTitle,
          date: nDate,
          content: nContent,
          category: nCategory,
          pdfUrl: nPdfUrl || undefined,
          isUrgent: nIsUrgent
        } : n)
      );
      setEditingNoticeId(null);
    } else {
      const newNotice: NoticeItem = {
        id: `notice-${Date.now()}`,
        title: nTitle,
        date: nDate,
        content: nContent,
        category: nCategory,
        pdfUrl: nPdfUrl || undefined,
        isUrgent: nIsUrgent
      };
      setNotices([newNotice, ...notices]);
    }

    setNTitle(''); setNDate(''); setNContent(''); setNCategory('বিজ্ঞপ্তি'); setNPdfUrl(''); setNIsUrgent(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const startEditNotice = (n: NoticeItem) => {
    setEditingNoticeId(n.id);
    setNTitle(n.title);
    setNDate(n.date);
    setNContent(n.content || '');
    setNCategory(n.category || 'বিজ্ঞপ্তি');
    setNPdfUrl(n.pdfUrl || '');
    setNIsUrgent(!!n.isUrgent);
  };

  const handleDeleteNotice = (id: string) => {
    setNotices(notices.filter(n => n.id !== id));
  };

  // 3. Gallery Slides Save/Submit
  const handleSaveSlide = (e: FormEvent) => {
    e.preventDefault();
    if (!sUrl || !sTitle) return;

    if (editingSlideId) {
      setGallerySlides(
        gallerySlides.map(slide => slide.id === editingSlideId ? {
          ...slide,
          url: sUrl,
          title: sTitle,
          description: sDescription
        } : slide)
      );
      setEditingSlideId(null);
    } else {
      const newSlide: GallerySlide = {
        id: `slide-${Date.now()}`,
        url: sUrl,
        title: sTitle,
        description: sDescription
      };
      setGallerySlides([...gallerySlides, newSlide]);
    }

    setSUrl(''); setSTitle(''); setSDescription('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const startEditSlide = (slide: GallerySlide) => {
    setEditingSlideId(slide.id);
    setSUrl(slide.url);
    setSTitle(slide.title);
    setSDescription(slide.description);
  };

  const handleDeleteSlide = (id: string) => {
    setGallerySlides(gallerySlides.filter(slide => slide.id !== id));
  };

  // 4. Registered Members Save/Submit
  const handleSaveMember = (e: FormEvent) => {
    e.preventDefault();
    if (!mFullName || !mEmail || !mPhone) return;

    if (editingMemberId) {
      setApplications(
        applications.map(app => app.id === editingMemberId ? {
          ...app,
          fullName: mFullName,
          email: mEmail,
          phone: mPhone,
          institution: mInstitution,
          major: mMajor,
          passingYear: mPassingYear,
          membershipTier: mMembershipTier,
          status: mStatus
        } : app)
      );
      setEditingMemberId(null);
    } else {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const trackingCode = `RCCA-2026-${randomCode}`;
      const newMember: MembershipApplication = {
        id: `app-${Date.now()}`,
        trackingCode,
        fullName: mFullName,
        email: mEmail,
        phone: mPhone,
        institution: mInstitution,
        major: mMajor,
        passingYear: mPassingYear,
        membershipTier: mMembershipTier,
        status: mStatus,
        appliedDate: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })
      };
      setApplications([newMember, ...applications]);
    }

    setMFullName(''); setMEmail(''); setMPhone(''); setMInstitution('রাজশাহী কলেজ'); setMMajor('রসায়ন (B.Sc Honours)'); setMPassingYear('2024'); setMMembershipTier('আজীবন সদস্য (Life Member)'); setMStatus('approved');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const startEditMember = (m: MembershipApplication) => {
    setEditingMemberId(m.id);
    setMFullName(m.fullName);
    setMEmail(m.email);
    setMPhone(m.phone);
    setMInstitution(m.institution);
    setMMajor(m.major);
    setMPassingYear(m.passingYear);
    setMMembershipTier(m.membershipTier);
    setMStatus(m.status);
  };

  const handleDeleteMember = (id: string) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  // 5. Notable (Kriti) Alumni Save/Submit
  const handleSaveAlumni = (e: FormEvent) => {
    e.preventDefault();
    if (!alName || !alClassOf || !alCurrentPosition) return;

    if (editingAlumniId) {
      setNotableAlumni(
        notableAlumni.map(al => al.id === editingAlumniId ? {
          ...al,
          name: alName,
          classOf: alClassOf,
          image: alImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          currentPosition: alCurrentPosition,
          organization: alOrganization,
          achievements: alAchievements,
          email: alEmail
        } : al)
      );
      setEditingAlumniId(null);
    } else {
      const newAl: NotableAlumni = {
        id: `alumni-${Date.now()}`,
        name: alName,
        classOf: alClassOf,
        image: alImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        currentPosition: alCurrentPosition,
        organization: alOrganization,
        achievements: alAchievements,
        email: alEmail
      };
      setNotableAlumni([newAl, ...notableAlumni]);
    }

    setAlName(''); setAlClassOf(''); setAlImage(''); setAlCurrentPosition(''); setAlOrganization(''); setAlAchievements(''); setAlEmail('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const startEditAlumni = (al: NotableAlumni) => {
    setEditingAlumniId(al.id);
    setAlName(al.name);
    setAlClassOf(al.classOf);
    setAlImage(al.image);
    setAlCurrentPosition(al.currentPosition);
    setAlOrganization(al.organization);
    setAlAchievements(al.achievements);
    setAlEmail(al.email);
  };

  const handleDeleteAlumni = (id: string) => {
    setNotableAlumni(notableAlumni.filter(al => al.id !== id));
  };

  // 6. Events / Posts Save/Submit
  const handleSaveEvent = (e: FormEvent) => {
    e.preventDefault();
    if (!evTitle || !evDate) return;

    if (editingEventId) {
      setEvents(
        events.map(ev => ev.id === editingEventId ? {
          ...ev,
          title: evTitle,
          category: evCategory,
          date: evDate,
          time: evTime || 'সকাল ১০:০০ টা',
          location: evLocation || 'রসায়ন বিভাগীয় ভবন, রাজশাহী কলেজ',
          description: evDescription,
          badge: evBadge || undefined,
          image: evImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600'
        } : ev)
      );
      setEditingEventId(null);
    } else {
      const newEv: EventItem = {
        id: `ev-${Date.now()}`,
        title: evTitle,
        category: evCategory,
        date: evDate,
        time: evTime || 'সকাল ১০:০০ টা',
        location: evLocation || 'রসায়ন বিভাগীয় ভবন, রাজশাহী কলেজ',
        description: evDescription,
        badge: evBadge || undefined,
        image: evImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600'
      };
      setEvents([newEv, ...events]);
    }

    setEvTitle(''); setEvDate(''); setEvTime(''); setEvLocation(''); setEvDescription(''); setEvBadge(''); setEvImage('');
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setActiveSubTab('events');
    }, 2000);
  };

  const startEditEvent = (ev: EventItem) => {
    setEditingEventId(ev.id);
    setEvTitle(ev.title);
    setEvCategory(ev.category);
    setEvDate(ev.date);
    setEvTime(ev.time);
    setEvLocation(ev.location);
    setEvDescription(ev.description);
    setEvBadge(ev.badge || '');
    setEvImage(ev.image);
    setActiveSubTab('events'); // switch to editor panel if needed, or we render form in events tab itself!
  };

  // Dual-mode Image Upload Component (Reads Desktop Files as Base64 data urls or takes raw URLs)
  const ImageUploadHelper = ({ 
    label, 
    value, 
    onChange 
  }: { 
    label: string; 
    value: string; 
    onChange: (val: string) => void; 
  }) => {
    return (
      <div className="space-y-1.5 text-xs">
        <label className="block font-bold text-slate-300">{label}</label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="ফটো ইউআরএল লিংক পেস্ট করুন..."
            className="flex-1 px-3.5 py-2.5 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 font-medium"
          />
          <label className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-4 py-2.5 rounded-xl cursor-pointer border border-slate-700 flex items-center justify-center gap-1.5 transition-all text-xs shrink-0 select-none">
            <Upload className="w-3.5 h-3.5" />
            <span>কম্পিউটার থেকে আপলোড</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                      onChange(reader.result);
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>
        {value && (
          <div className="mt-2 flex items-center gap-2 bg-slate-900/40 p-2 border border-slate-800/80 rounded-xl max-w-sm">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 shrink-0">
              <img src={value} className="w-full h-full object-cover" alt="Preview Thumbnail" />
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              <span className="block font-bold text-slate-200">ছবি লোড করা হয়েছে</span>
              <button 
                type="button" 
                onClick={() => onChange('')} 
                className="text-rose-400 hover:text-rose-300 font-bold mt-0.5 cursor-pointer"
              >
                রিমুভ করুন
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Pending and total counters
  const pendingRegistrationsCount = applications.filter((a) => a.status === 'pending').length;
  const unreadInboxCount = inboxMessages.filter((m) => !m.isRead).length;

  if (!isLoggedIn) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center py-12 px-6 relative z-10 select-none animate-in fade-in duration-300">
        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl p-8 relative overflow-hidden">
          {/* Top orange gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-amber-600"></div>
          
          <div className="text-center space-y-3 mb-8">
            <div className="w-14 h-14 bg-amber-500/15 text-amber-400 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">অ্যাডমিন প্রবেশদ্বার (CMS Login)</h2>
              <p className="text-xs text-slate-400 mt-1">AAA WordPress Admin Portal Access</p>
            </div>
          </div>

          {loginError && (
            <div className="mb-5 p-3.5 bg-rose-950/50 border border-rose-800/80 text-rose-300 rounded-xl text-xs flex items-start gap-2 leading-relaxed">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>ইউজারনেম বা ইমেল (Username or Email)</span>
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="যেমন: editor@example.com"
                className="w-full px-3.5 py-2.5 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>পাসওয়ার্ড (Password)</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                className="w-full px-3.5 py-2.5 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-medium"
              />
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0" />
                <span>লগইন সেশন সচল রাখুন</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-3 rounded-xl font-extrabold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>প্রবেশ করুন (Log In)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 max-w-7xl mx-auto px-4 sm:px-6 relative z-10 select-none animate-in fade-in duration-300">
      {/* Container holding the admin dashboard splits into Sidebar + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950/70 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl min-h-[700px]">
        
        {/* Left CMS Sidebar matching screenshot 100% */}
        <aside className="lg:col-span-3 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between p-5">
          <div className="space-y-6">
            {/* Header Brand */}
            <div className="flex flex-col gap-3 pb-4 border-b border-slate-800/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow">
                  <Settings className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-xs sm:text-sm tracking-wide">AAA ADMIN</h3>
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                    WORDPRESS PORTAL
                  </span>
                </div>
              </div>
              
              {/* User profile details */}
              {currentUser && (
                <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                    {currentUser.role === 'admin' ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-white truncate" title={currentUser.email}>
                      {currentUser.email}
                    </p>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      currentUser.role === 'admin' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {currentUser.role === 'admin' ? 'Super Admin' : 'Moderator'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-1.5 text-xs font-semibold text-slate-300">
              {hasPermission('overview') && (
                <button
                  onClick={() => setActiveSubTab('overview')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                    activeSubTab === 'overview'
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                      : 'hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard Overview</span>
                  </div>
                </button>
              )}

              {hasPermission('teachers') && (
                <button
                  onClick={() => setActiveSubTab('teachers')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                    activeSubTab === 'teachers'
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                      : 'hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4" />
                    <span>Teacher Info</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeSubTab === 'teachers' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {teachers.length}
                  </span>
                </button>
              )}

              {hasPermission('teachers') && (
                <button
                  onClick={() => setActiveSubTab('quotes')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                    activeSubTab === 'quotes'
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                      : 'hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4" />
                    <span>Teachers' Opinions (মতামত)</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeSubTab === 'quotes' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {teacherQuotes.length}
                  </span>
                </button>
              )}

              {hasPermission('teachers') && (
                <button
                  onClick={() => setActiveSubTab('executives')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                    activeSubTab === 'executives'
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                      : 'hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4" />
                    <span>Executive Committee (নির্বাহী কমিটি)</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeSubTab === 'executives' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {executiveMembers.length}
                  </span>
                </button>
              )}

              {hasPermission('notices') && (
                <button
                  onClick={() => setActiveSubTab('notices')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                    activeSubTab === 'notices'
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                      : 'hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4" />
                    <span>Notices Board</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeSubTab === 'notices' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {notices.length}
                  </span>
                </button>
              )}

              {hasPermission('gallery') && (
                <button
                  onClick={() => setActiveSubTab('gallery')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                    activeSubTab === 'gallery'
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                      : 'hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ImageIcon className="w-4 h-4" />
                    <span>Gallery Option</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeSubTab === 'gallery' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {gallerySlides.length}
                  </span>
                </button>
              )}

              {hasPermission('members') && (
                <button
                  onClick={() => setActiveSubTab('members')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                    activeSubTab === 'members'
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                      : 'hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4" />
                    <span>Shokol Shodosso Info</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeSubTab === 'members' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {applications.filter(a => a.status === 'approved').length}
                  </span>
                </button>
              )}

              {hasPermission('alumni') && (
                <button
                  onClick={() => setActiveSubTab('alumni')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                    activeSubTab === 'alumni'
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                      : 'hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4" />
                    <span>Kriti Alumni</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeSubTab === 'alumni' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {notableAlumni.length}
                  </span>
                </button>
              )}

              {hasPermission('events') && (
                <button
                  onClick={() => setActiveSubTab('events')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                    activeSubTab === 'events'
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                      : 'hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4" />
                    <span>Event & News Page</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeSubTab === 'events' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {events.length}
                  </span>
                </button>
              )}

              {hasPermission('registrations') && (
                <button
                  onClick={() => setActiveSubTab('registrations')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                    activeSubTab === 'registrations'
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                      : 'hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <UserCheck className="w-4 h-4" />
                    <span>Applications</span>
                  </div>
                  {pendingRegistrationsCount > 0 && (
                    <span className="text-[9px] bg-rose-600 text-white px-2 py-0.5 rounded-full font-bold">
                      {pendingRegistrationsCount}
                    </span>
                  )}
                </button>
              )}

              {hasPermission('inbox') && (
                <button
                  onClick={() => setActiveSubTab('inbox')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                    activeSubTab === 'inbox'
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                      : 'hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Inbox className="w-4 h-4" />
                    <span>Contact Inbox</span>
                  </div>
                  {unreadInboxCount > 0 && (
                    <span className="text-[9px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                      {unreadInboxCount}
                    </span>
                  )}
                </button>
              )}

              {hasPermission('settings') && (
                <button
                  onClick={() => setActiveSubTab('settings')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                    activeSubTab === 'settings'
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                      : 'hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4" />
                    <span>Site General Settings</span>
                  </div>
                </button>
              )}

              {currentUser?.role === 'admin' && (
                <button
                  onClick={() => setActiveSubTab('moderators')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer border border-dashed border-amber-500/30 hover:border-amber-500/60 ${
                    activeSubTab === 'moderators'
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                      : 'hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <UserPlus className="w-4 h-4 text-amber-500" />
                    <span>মডারেটর সেটিংস (Mods)</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeSubTab === 'moderators' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {moderators.length}
                  </span>
                </button>
              )}
            </nav>
          </div>

          {/* Sidebar Footer Logout */}
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setCurrentUser(null);
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 transition-colors cursor-pointer mt-8"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট করুন (Log Out)</span>
          </button>
        </aside>

        {/* Right Admin Content Panel */}
        <main className="lg:col-span-9 p-6 sm:p-8 space-y-8 overflow-y-auto max-h-[80vh]">
          
          {/* Universal Notification Badge */}
          {saveSuccess && (
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-bounce">
              <Check className="w-4 h-4 shrink-0" />
              <span>ডাটাবেজ সফলভাবে আপডেট করা হয়েছে! পরিবর্তনগুলো ওয়েবসাইটে লাইভ প্রতিফলিত হবে।</span>
            </div>
          )}

          {/* Tab 1: Dashboard Overview Panel */}
          {activeSubTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Chemistry Alumni Association CMS
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Welcome back, Admin. Manage department teachers, notices, slider galleries, members directory, and events.
                </p>
              </div>

              {/* Grid of stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">ডিপার্টমেন্ট শিক্ষক</span>
                    <span className="text-2xl font-black text-white block mt-1">{teachers.length} জন</span>
                  </div>
                  <GraduationCap className="w-8 h-8 text-amber-500" />
                </div>
                <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">নিবন্ধিত কৃতি অ্যালামনাই</span>
                    <span className="text-2xl font-black text-white block mt-1">{notableAlumni.length} জন</span>
                  </div>
                  <Award className="w-8 h-8 text-amber-500" />
                </div>
                <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">অনুমোদিত সাধারণ সদস্য</span>
                    <span className="text-2xl font-black text-white block mt-1">
                      {applications.filter(a => a.status === 'approved').length} জন
                    </span>
                  </div>
                  <Users className="w-8 h-8 text-amber-500" />
                </div>
              </div>

              {/* Quick info boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-sm font-extrabold text-white border-b border-slate-800 pb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Quick Management Access</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <button onClick={() => setActiveSubTab('teachers')} className="bg-slate-950 hover:bg-slate-900 border border-slate-800 p-3 rounded-xl font-bold text-slate-200 hover:text-amber-400 transition-all text-center">
                      Manage Teachers
                    </button>
                    <button onClick={() => setActiveSubTab('notices')} className="bg-slate-950 hover:bg-slate-900 border border-slate-800 p-3 rounded-xl font-bold text-slate-200 hover:text-amber-400 transition-all text-center">
                      Manage Notices
                    </button>
                    <button onClick={() => setActiveSubTab('gallery')} className="bg-slate-950 hover:bg-slate-900 border border-slate-800 p-3 rounded-xl font-bold text-slate-200 hover:text-amber-400 transition-all text-center">
                      Edit Slide Gallery
                    </button>
                    <button onClick={() => setActiveSubTab('events')} className="bg-slate-950 hover:bg-slate-900 border border-slate-800 p-3 rounded-xl font-bold text-slate-200 hover:text-amber-400 transition-all text-center">
                      Create News/Event
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-sm font-extrabold text-white border-b border-slate-800 pb-2">
                    Pending Members Registrations
                  </h3>
                  <div className="space-y-2 text-xs">
                    {applications.filter(a => a.status === 'pending').slice(0, 3).map(app => (
                      <div key={app.id} className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-white">{app.fullName}</p>
                          <span className="text-[10px] text-slate-400">{app.passingYear} Batch</span>
                        </div>
                        <button 
                          onClick={() => setActiveSubTab('registrations')} 
                          className="text-[10px] bg-amber-500 text-slate-950 font-bold px-2.5 py-1 rounded-lg"
                        >
                          Review
                        </button>
                      </div>
                    ))}
                    {applications.filter(a => a.status === 'pending').length === 0 && (
                      <p className="text-slate-400 italic text-center py-4">কোনো পেন্ডিং রেজিস্ট্রেশন নেই।</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Teacher Info Editor */}
          {activeSubTab === 'teachers' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-white">বিভাগের শিক্ষক মণ্ডলী তথ্য সংশোধন</h2>
                  <p className="text-xs text-slate-400">ডিপার্টমেন্টের শিক্ষকদের পরিচিতি ও প্রোফাইল ডাটাবেজ এডিট ও এড করুন</p>
                </div>
                {editingTeacherId && (
                  <button 
                    onClick={() => {
                      setEditingTeacherId(null);
                      setTName(''); setTDesignation(''); setTCategory('faculty'); setTCode(''); setTEducation(''); setTPhone(''); setTEmail(''); setTResearchInterest(''); setTImage('');
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold"
                  >
                    নতুন তৈরিতে ফিরুন
                  </button>
                )}
              </div>

              {/* Form Block */}
              <form onSubmit={handleSaveTeacher} className="bg-slate-900/30 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
                <h3 className="font-bold text-amber-400 text-sm">
                  {editingTeacherId ? 'শিক্ষক প্রোফাইল সংশোধন করুন (Editing)' : 'নতুন শিক্ষক প্রোফাইল যুক্ত করুন (Add New)'}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">শিক্ষকের নাম (Name) *</label>
                    <input
                      type="text" required value={tName} onChange={(e) => setTName(e.target.value)}
                      placeholder="যেমন: ড. সাজেদুল ইসলাম"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">পদবী (Designation) *</label>
                    <input
                      type="text" required value={tDesignation} onChange={(e) => setTDesignation(e.target.value)}
                      placeholder="যেমন: সহযোগী অধ্যাপক ও বিভাগীয় প্রধান"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">ক্যাটাগরি *</label>
                    <select
                      value={tCategory} onChange={(e) => setTCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none font-bold"
                    >
                      <option value="faculty">সাধারণ শিক্ষক ফোরাম</option>
                      <option value="head">বিভাগীয় প্রধান (Department Head)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">শিক্ষক কোড (Code)</label>
                    <input
                      type="text" value={tCode} onChange={(e) => setTCode(e.target.value)}
                      placeholder="যেমন: RC-CHEM-01"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">ফোন নম্বর</label>
                    <input
                      type="text" value={tPhone} onChange={(e) => setTPhone(e.target.value)}
                      placeholder="০১৭১১-xxxxxx"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">ইমেইল এড্রেস</label>
                    <input
                      type="email" value={tEmail} onChange={(e) => setTEmail(e.target.value)}
                      placeholder="teacher@rc.edu.bd"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">শিক্ষাগত যোগ্যতা (Education)</label>
                    <input
                      type="text" value={tEducation} onChange={(e) => setTEducation(e.target.value)}
                      placeholder="যেমন: এম.এসসি, পিএইচডি (রাবি)"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">গবেষণা ক্ষেত্র (Research Interests)</label>
                    <input
                      type="text" value={tResearchInterest} onChange={(e) => setTResearchInterest(e.target.value)}
                      placeholder="যেমন: অর্গানিক ও পরিবেশ রসায়ন বিশ্লেষণ"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                </div>

                {/* Picture Image Upload Helper */}
                <ImageUploadHelper 
                  label="শিক্ষকের ছবি (Image URL or direct upload)"
                  value={tImage}
                  onChange={setTImage}
                />

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-2.5 rounded-xl cursor-pointer transition-colors"
                >
                  {editingTeacherId ? 'শিক্ষক প্রোফাইল আপডেট সংরক্ষণ করুন' : 'নতুন শিক্ষক প্রোফাইল যুক্ত করুন'}
                </button>
              </form>

              {/* Teachers List Grid */}
              <div className="space-y-3">
                <h3 className="font-bold text-white text-xs">বর্তমান শিক্ষকদের তালিকা ({teachers.length} জন)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teachers.map(t => (
                    <div key={t.id} className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 text-xs min-w-0">
                        <img src={t.image} alt={t.name} className="w-10 h-10 rounded-lg object-cover bg-slate-950" />
                        <div className="min-w-0">
                          <p className="font-bold text-white truncate">{t.name}</p>
                          <p className="text-slate-400 text-[10px] truncate">{t.designation}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button 
                          onClick={() => startEditTeacher(t)} 
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition-colors cursor-pointer"
                          title="সম্পাদনা করুন"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteTeacher(t.id)} 
                          className="p-1.5 bg-rose-950/40 hover:bg-rose-900/50 text-rose-400 rounded-lg transition-colors cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2b: Teacher Quotes Editor */}
          {activeSubTab === 'quotes' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-white">শিক্ষক মণ্ডলীর মূল্যবান মতামত</h2>
                  <p className="text-xs text-slate-400">হোমপেজে প্রদর্শিত শিক্ষকদের বাণী, মূল্যায়ন ও মন্তব্য এডিট করুন</p>
                </div>
                {editingQuoteId && (
                  <button 
                    onClick={() => {
                      setEditingQuoteId(null);
                      setQName(''); setQDesignation(''); setQDepartment('রসায়ন বিভাগ, রাজশাহী কলেজ'); setQQuote(''); setQImage('');
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold"
                  >
                    নতুন তৈরিতে ফিরুন
                  </button>
                )}
              </div>

              {/* Form Block */}
              <form onSubmit={handleSaveQuote} className="bg-slate-900/30 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
                <h3 className="font-bold text-amber-400 text-sm">
                  {editingQuoteId ? 'বাণী সংশোধন করুন (Editing)' : 'নতুন বাণী যুক্ত করুন (Add New)'}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">শিক্ষকের নাম (Name) *</label>
                    <input
                      type="text" required value={qName} onChange={(e) => setQName(e.target.value)}
                      placeholder="যেমন: প্রফেসর এম. এ. খালেক"
                      className="w-full px-3.5 py-2 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">পদবী (Designation) *</label>
                    <input
                      type="text" required value={qDesignation} onChange={(e) => setQDesignation(e.target.value)}
                      placeholder="যেমন: বিভাগীয় প্রধান"
                      className="w-full px-3.5 py-2 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">বিভাগ/প্রতিষ্ঠানের নাম (Department/Institution)</label>
                    <input
                      type="text" value={qDepartment} onChange={(e) => setQDepartment(e.target.value)}
                      placeholder="যেমন: রসায়ন বিভাগ, রাজশাহী কলেজ"
                      className="w-full px-3.5 py-2 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">মূল্যবান মতামত / বাণী (Opinion/Quote) *</label>
                  <textarea
                    required
                    rows={4}
                    value={qQuote}
                    onChange={(e) => setQQuote(e.target.value)}
                    placeholder="যেমন: রসায়ন শিক্ষার গুণগত মান উন্নত করতে এবং গবেষণার প্রসার ঘটাতে অ্যালামনাই অ্যাসোসিয়েশন অত্যন্ত তাৎপর্যপূর্ণ ভূমিকা পালন করছে..."
                    className="w-full px-3.5 py-2 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none leading-relaxed whitespace-pre-line"
                  />
                </div>

                {/* Picture Image Upload Helper */}
                <ImageUploadHelper 
                  label="শিক্ষকের ছবি (Image URL or direct upload)"
                  value={qImage}
                  onChange={setQImage}
                />

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-2.5 rounded-xl cursor-pointer transition-colors"
                >
                  {editingQuoteId ? 'বাণী ও মূল্যায়ন আপডেট করুন' : 'নতুন বাণী ও মূল্যায়ন প্রকাশ করুন'}
                </button>
              </form>

              {/* Quotes List Grid */}
              <div className="space-y-3">
                <h3 className="font-bold text-white text-xs">বর্তমান শিক্ষকদের বাণী ও মতামতের তালিকা ({teacherQuotes.length} টি)</h3>
                <div className="grid grid-cols-1 gap-4">
                  {teacherQuotes.map(q => (
                    <div key={q.id} className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3.5 text-xs min-w-0 flex-1">
                        <img src={q.image} alt={q.name} className="w-12 h-12 rounded-full object-cover border border-amber-500/20 bg-slate-950 shrink-0" />
                        <div className="min-w-0 space-y-1">
                          <div className="flex flex-wrap items-baseline gap-x-2">
                            <span className="font-bold text-white">{q.name}</span>
                            <span className="text-amber-400 text-[10px] font-semibold">{q.designation}</span>
                            <span className="text-slate-400 text-[9px] font-medium">{q.department}</span>
                          </div>
                          <p className="text-slate-300 italic text-[11px] leading-relaxed line-clamp-2 whitespace-pre-line">"{q.quote}"</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                        <button 
                          onClick={() => startEditQuote(q)} 
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition-colors cursor-pointer"
                          title="সম্পাদনা করুন"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteQuote(q.id)} 
                          className="p-1.5 bg-rose-950/40 hover:bg-rose-900/50 text-rose-400 rounded-lg transition-colors cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2c: Executive Members Editor */}
          {activeSubTab === 'executives' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-white">নির্বাহী কমিটির সদস্যবৃন্দ (Executive Committee)</h2>
                  <p className="text-xs text-slate-400">অ্যাসোসিয়েশনের কার্যনির্বাহী কমিটির কর্মকর্তা ও সদস্যবৃন্দের তালিকা এডিট করুন</p>
                </div>
                {editingExeId && (
                  <button 
                    onClick={() => {
                      setEditingExeId(null);
                      setExeName(''); setExeRole(''); setExeEdu(''); setExeImage('');
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold"
                  >
                    নতুন তৈরিতে ফিরুন
                  </button>
                )}
              </div>

              {/* Form Block */}
              <form onSubmit={handleSaveExecutiveMember} className="bg-slate-900/30 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
                <h3 className="font-bold text-amber-400 text-sm">
                  {editingExeId ? 'কমিটি সদস্য সংশোধন করুন (Editing)' : 'নতুন কমিটি সদস্য যুক্ত করুন (Add New)'}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">সদস্যের নাম (Name) *</label>
                    <input
                      type="text" required value={exeName} onChange={(e) => setExeName(e.target.value)}
                      placeholder="যেমন: ড. মাহফুজ হোসেন"
                      className="w-full px-3.5 py-2 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">কমিটি পদবী (Role in Committee) *</label>
                    <input
                      type="text" required value={exeRole} onChange={(e) => setExeRole(e.target.value)}
                      placeholder="যেমন: কোষাধ্যক্ষ / প্রচার সম্পাদক"
                      className="w-full px-3.5 py-2 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">ডিগ্রী বা পেশাগত পরিচয় (Education/Affiliation)</label>
                    <input
                      type="text" value={exeEdu} onChange={(e) => setExeEdu(e.target.value)}
                      placeholder="যেমন: পিএইচডি, রাজশাহী বিশ্ববিদ্যালয়"
                      className="w-full px-3.5 py-2 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                </div>

                {/* Picture Image Upload Helper */}
                <ImageUploadHelper 
                  label="সদস্যের ছবি (Image URL or direct upload)"
                  value={exeImage}
                  onChange={setExeImage}
                />

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-2.5 rounded-xl cursor-pointer transition-colors"
                >
                  {editingExeId ? 'কমিটি সদস্য আপডেট করুন' : 'নতুন কমিটি সদস্য যুক্ত করুন'}
                </button>
              </form>

              {/* Executives List Grid */}
              <div className="space-y-3">
                <h3 className="font-bold text-white text-xs">বর্তমান নির্বাহী কমিটির তালিকা ({executiveMembers.length} জন)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {executiveMembers.map(m => (
                    <div key={m.id} className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5 text-xs min-w-0 flex-1">
                        <img src={m.image} alt={m.name} className="w-12 h-12 rounded-full object-cover border border-amber-500/20 bg-slate-950 shrink-0" />
                        <div className="min-w-0 space-y-0.5">
                          <p className="font-bold text-white truncate">{m.name}</p>
                          <p className="text-amber-400 text-[10px] font-semibold truncate">{m.role}</p>
                          <p className="text-slate-400 text-[9px] font-medium truncate">{m.edu}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button 
                          onClick={() => startEditExecutiveMember(m)} 
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition-colors cursor-pointer"
                          title="সম্পাদনা করুন"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteExecutiveMember(m.id)} 
                          className="p-1.5 bg-rose-950/40 hover:bg-rose-900/50 text-rose-400 rounded-lg transition-colors cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Notices Board Editor */}
          {activeSubTab === 'notices' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-white">নোটিশ বোর্ড ডিরেক্টরি</h2>
                  <p className="text-xs text-slate-400">গুরুত্বপূর্ণ নোটিশ, বিজ্ঞপ্তি এবং পিডিএফ ডকুমেন্টস আপলোড করুন</p>
                </div>
                {editingNoticeId && (
                  <button 
                    onClick={() => {
                      setEditingNoticeId(null);
                      setNTitle(''); setNDate(''); setNCategory('বিজ্ঞপ্তি'); setNPdfUrl(''); setNIsUrgent(false);
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold"
                  >
                    নতুন তৈরিতে ফিরুন
                  </button>
                )}
              </div>

              {/* Form Block */}
              <form onSubmit={handleSaveNotice} className="bg-slate-900/30 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
                <h3 className="font-bold text-amber-400 text-sm">
                  {editingNoticeId ? 'নোটিশ সংশোধন করুন (Editing)' : 'নতুন নোটিশ পাবলিশ করুন (Add New)'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-300 mb-1">নোটিশের শিরোনাম (Notice Title) *</label>
                    <input
                      type="text" required value={nTitle} onChange={(e) => setNTitle(e.target.value)}
                      placeholder="যেমন: রাজশাহী কলেজ কেমিক্যাল সায়েন্স অলিম্পিয়াড ২০২৬ এর রেজিস্ট্রেশন ও সময়সূচী"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">প্রকাশের তারিখ *</label>
                    <input
                      type="text" required value={nDate} onChange={(e) => setNDate(e.target.value)}
                      placeholder="যেমন: ৩০ জুন, ২০২৬"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">নোটিশের বিস্তারিত বিবরণ (Detailed Content) *</label>
                  <textarea
                    rows={3} required value={nContent} onChange={(e) => setNContent(e.target.value)}
                    placeholder="নোটিশের মূল লিখিত বিবরণ এখানে লিখে রাখুন যা হোমপেজে প্রদর্শিত হবে..."
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">ক্যাটাগরি</label>
                    <input
                      type="text" value={nCategory} onChange={(e) => setNCategory(e.target.value)}
                      placeholder="যেমন: বিজ্ঞপ্তি, অলিম্পিয়াড, সেমিনার"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">পিডিএফ/ডকুমেন্ট লিংক (PDF Attachment URL)</label>
                    <input
                      type="text" value={nPdfUrl} onChange={(e) => setNPdfUrl(e.target.value)}
                      placeholder="https://drive.google.com/..."
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl select-none mt-5">
                    <span className="font-bold text-rose-400">জরুরি নোটিশ (Mark Urgent)?</span>
                    <input
                      type="checkbox" checked={nIsUrgent} onChange={(e) => setNIsUrgent(e.target.checked)}
                      className="w-4 h-4 text-rose-600 rounded bg-slate-900 border-slate-800 focus:ring-0"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-2.5 rounded-xl cursor-pointer transition-colors"
                >
                  {editingNoticeId ? 'নোটিশ সংরক্ষণ করুন' : 'নোটিশ পাবলিশ করুন'}
                </button>
              </form>

              {/* Notices List */}
              <div className="space-y-3">
                <h3 className="font-bold text-white text-xs">নোটিশ ডিরেক্টরি তালিকা ({notices.length} টি নোটিশ)</h3>
                <div className="space-y-2">
                  {notices.map(n => (
                    <div key={n.id} className="bg-slate-900/40 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs gap-4">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            n.isUrgent ? 'bg-rose-950 text-rose-300 border border-rose-800/50' : 'bg-slate-950 text-amber-400 border border-slate-800'
                          }`}>
                            {n.isUrgent ? 'জরুরি' : n.category}
                          </span>
                          <span className="text-slate-400 text-[10px]">{n.date}</span>
                        </div>
                        <p className="font-bold text-white truncate max-w-lg">{n.title}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => startEditNotice(n)} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg cursor-pointer">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteNotice(n.id)} className="p-1.5 bg-rose-950/40 hover:bg-rose-900/50 text-rose-400 rounded-lg cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Gallery Option */}
          {activeSubTab === 'gallery' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-white">বিভাগীয় স্মৃতিচারণ ও স্লাইড গ্যালারি</h2>
                  <p className="text-xs text-slate-400">হোমপেজের স্লাইডার ছবি ও টাইটেল পরিবর্তন করুন</p>
                </div>
                {editingSlideId && (
                  <button 
                    onClick={() => {
                      setEditingSlideId(null);
                      setSUrl(''); setSTitle(''); setSDescription('');
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold"
                  >
                    নতুন তৈরিতে ফিরুন
                  </button>
                )}
              </div>

              {/* Gallery Headline Editing section */}
              <div className="bg-slate-900/30 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
                <h3 className="font-bold text-amber-400 text-sm">স্লাইড গ্যালারি শিরোনাম ও সাব-শিরোনাম সংশোধন</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">মূল শিরোনাম (Headline)</label>
                    <input 
                      type="text" value={galleryHeadline} onChange={(e) => setGalleryHeadline(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">ছোট সাব-হেডলাইন (Subheadline)</label>
                    <input 
                      type="text" value={gallerySubheadline} onChange={(e) => setGallerySubheadline(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">সংক্ষিপ্ত পরিচিতি বিবরণী (Gallery Description)</label>
                  <textarea 
                    rows={2} value={galleryDescription} onChange={(e) => setGalleryDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                  />
                </div>
              </div>

              {/* Slide Editor Form */}
              <form onSubmit={handleSaveSlide} className="bg-slate-900/30 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
                <h3 className="font-bold text-amber-400 text-sm">
                  {editingSlideId ? 'স্লাইড ছবি সংশোধন করুন (Editing)' : 'নতুন গ্যালারি স্লাইড যুক্ত করুন (Add New)'}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">স্লাইড টাইটেল (Slide Title) *</label>
                    <input
                      type="text" required value={sTitle} onChange={(e) => setSTitle(e.target.value)}
                      placeholder="যেমন: রসায়ন বিজ্ঞানীদের সংবর্ধনা অনুষ্ঠান"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">ছবি ডেসক্রিপশন (Slide Description)</label>
                    <input
                      type="text" value={sDescription} onChange={(e) => setSDescription(e.target.value)}
                      placeholder="যেমন: বিভাগীয় প্রাক্তন শিক্ষার্থীদের বর্ণিল মিলনমেলা ও সম্মাননা উৎসব।"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>

                  <ImageUploadHelper 
                    label="স্লাইড ছবি (Image URL or direct upload)"
                    value={sUrl}
                    onChange={setSUrl}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-2.5 rounded-xl cursor-pointer transition-colors"
                >
                  {editingSlideId ? 'স্লাইড আপডেট করুন' : 'স্লাইড যুক্ত করুন'}
                </button>
              </form>

              {/* Slides list */}
              <div className="space-y-3">
                <h3 className="font-bold text-white text-xs">স্লাইড কোলাজ ইমেজ ডিরেক্টরি ({gallerySlides.length} টি স্লাইড)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {gallerySlides.map(slide => (
                    <div key={slide.id} className="relative aspect-video bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group">
                      <img src={slide.url} alt={slide.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-[10px]">
                        <p className="font-bold text-white truncate">{slide.title}</p>
                        <div className="flex justify-end gap-1.5">
                          <button onClick={() => startEditSlide(slide)} className="p-1 bg-slate-800 text-amber-400 rounded cursor-pointer">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteSlide(slide.id)} className="p-1 bg-rose-950 text-rose-400 rounded cursor-pointer">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Shokol Shodosso (Members) Info */}
          {activeSubTab === 'members' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-white">সকল সদস্য তথ্য সংশোধন (Shokol Shodosso Info)</h2>
                  <p className="text-xs text-slate-400">অনুমোদিত আজীবন ও সাধারণ সদস্যদের প্রোফাইল ডাটাবেজ পরিচালনা</p>
                </div>
                {editingMemberId && (
                  <button 
                    onClick={() => {
                      setEditingMemberId(null);
                      setMFullName(''); setMEmail(''); setMPhone(''); setMInstitution('রাজশাহী কলেজ'); setMMajor('রসায়ন (B.Sc Honours)'); setMPassingYear('2024'); setMMembershipTier('আজীবন সদস্য (Life Member)'); setMStatus('approved');
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold"
                  >
                    নতুন তৈরিতে ফিরুন
                  </button>
                )}
              </div>

              {/* Form Block */}
              <form onSubmit={handleSaveMember} className="bg-slate-900/30 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
                <h3 className="font-bold text-amber-400 text-sm">
                  {editingMemberId ? 'সদস্যের তথ্য সংশোধন (Editing)' : 'অ্যাসোসিয়েশনে সরাসরি সদস্য যুক্ত করুন (Add Direct Member)'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">সদস্যের পুরো নাম *</label>
                    <input
                      type="text" required value={mFullName} onChange={(e) => setMFullName(e.target.value)}
                      placeholder="যেমন: তানভীর রহমান"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">ইমেইল এড্রেস *</label>
                    <input
                      type="email" required value={mEmail} onChange={(e) => setMEmail(e.target.value)}
                      placeholder="tanvir@gmail.com"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">মোবাইল নম্বর *</label>
                    <input
                      type="text" required value={mPhone} onChange={(e) => setMPhone(e.target.value)}
                      placeholder="০১৭১১-xxxxxx"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">শিক্ষা প্রতিষ্ঠান</label>
                    <input
                      type="text" value={mInstitution} onChange={(e) => setMInstitution(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">পড়াশোনার বিষয় (Major)</label>
                    <input
                      type="text" value={mMajor} onChange={(e) => setMMajor(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">পাসের সাল / ব্যাচ</label>
                    <input
                      type="text" value={mPassingYear} onChange={(e) => setMPassingYear(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">মেম্বারশিপ টাইপ</label>
                    <select
                      value={mMembershipTier} onChange={(e) => setMMembershipTier(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none font-bold"
                    >
                      <option value="আজীবন সদস্য (Life Member)">আজীবন সদস্য (Life Member)</option>
                      <option value="সাধারণ সদস্য (General Member)">সাধারণ সদস্য (General Member)</option>
                      <option value="দাতা সদস্য (Donor Member)">দাতা সদস্য (Donor Member)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">অনুমোদন স্ট্যাটাস</label>
                    <select
                      value={mStatus} onChange={(e) => setMStatus(e.target.value as any)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none font-bold text-emerald-400"
                    >
                      <option value="approved">Approved (অনুমোদিত)</option>
                      <option value="pending">Pending (অপেক্ষমান)</option>
                      <option value="rejected">Rejected (প্রত্যাখ্যাত)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-2.5 rounded-xl cursor-pointer transition-colors"
                >
                  {editingMemberId ? 'সদস্য তথ্য আপডেট করুন' : 'সদস্য সরাসরি ডাটাবেজে যুক্ত করুন'}
                </button>
              </form>

              {/* Members List */}
              <div className="space-y-3">
                <h3 className="font-bold text-white text-xs">নিবন্ধিত ও অনুমোদিত সদস্যদের তালিকা</h3>
                <div className="space-y-2">
                  {applications.map(m => (
                    <div key={m.id} className="bg-slate-900/40 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between text-xs gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-white">{m.fullName}</p>
                          <span className="text-[10px] bg-slate-950 px-2 py-0.5 border border-slate-800 rounded font-mono text-amber-400">
                            Passing Year: {m.passingYear}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[10px] mt-0.5">{m.email} • {m.phone} • {m.membershipTier}</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                          m.status === 'approved' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40' : 'bg-amber-950/80 text-amber-300'
                        }`}>
                          {m.status}
                        </span>
                        <button onClick={() => startEditMember(m)} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg cursor-pointer">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteMember(m.id)} className="p-1.5 bg-rose-950/40 hover:bg-rose-900/50 text-rose-400 rounded-lg cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Kriti Alumni Editor */}
          {activeSubTab === 'alumni' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-white">কৃতি অ্যালামনাই (Notable Alumni) সংশোধন</h2>
                  <p className="text-xs text-slate-400">বিশ্বনন্দিত ও সফল কৃতি প্রাক্তন ছাত্র-ছাত্রীদের তালিকা এডিট করুন</p>
                </div>
                {editingAlumniId && (
                  <button 
                    onClick={() => {
                      setEditingAlumniId(null);
                      setAlName(''); setAlClassOf(''); setAlImage(''); setAlCurrentPosition(''); setAlOrganization(''); setAlAchievements(''); setAlEmail('');
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold"
                  >
                    নতুন তৈরিতে ফিরুন
                  </button>
                )}
              </div>

              {/* Form Block */}
              <form onSubmit={handleSaveAlumni} className="bg-slate-900/30 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
                <h3 className="font-bold text-amber-400 text-sm">
                  {editingAlumniId ? 'কৃতি অ্যালামনাই তথ্য সংশোধন (Editing)' : 'নতুন কৃতি অ্যালামনাই যুক্ত করুন (Add New)'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">অ্যালামনাই এর নাম *</label>
                    <input
                      type="text" required value={alName} onChange={(e) => setAlName(e.target.value)}
                      placeholder="যেমন: ড. তানভীর আহমেদ"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">পাসের ব্যাচ / শিক্ষাবর্ষ *</label>
                    <input
                      type="text" required value={alClassOf} onChange={(e) => setAlClassOf(e.target.value)}
                      placeholder="যেমন: Class of 1998"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">ইমেইল এড্রেস</label>
                    <input
                      type="email" value={alEmail} onChange={(e) => setAlEmail(e.target.value)}
                      placeholder="alumni@research.org"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">বর্তমান পদবী / পেশা *</label>
                    <input
                      type="text" required value={alCurrentPosition} onChange={(e) => setAlCurrentPosition(e.target.value)}
                      placeholder="যেমন: সিনিয়র রিসার্চ সায়েন্টিস্ট"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">প্রতিষ্ঠান / বিশ্ববিদ্যালয় *</label>
                    <input
                      type="text" required value={alOrganization} onChange={(e) => setAlOrganization(e.target.value)}
                      placeholder="যেমন: হার্ভার্ড মেডিকেল স্কুল, ইউএসএ"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">উল্লেখযোগ্য কৃতি অর্জন (Achievements) *</label>
                  <textarea
                    rows={2} required value={alAchievements} onChange={(e) => setAlAchievements(e.target.value)}
                    placeholder="যেমন: ক্যানসার সেল থেরাপিতে বিশেষ অবদানের জন্য গ্লোবাল রিসার্চ আওয়ার্ড লাভ।"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                  />
                </div>

                <ImageUploadHelper 
                  label="প্রোফাইল ফটো (Image URL or direct upload)"
                  value={alImage}
                  onChange={setAlImage}
                />

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-2.5 rounded-xl cursor-pointer transition-colors"
                >
                  {editingAlumniId ? 'তথ্য আপডেট সংরক্ষণ করুন' : 'নতুন কৃতি অ্যালামনাই যুক্ত করুন'}
                </button>
              </form>

              {/* Notable Alumni List */}
              <div className="space-y-3">
                <h3 className="font-bold text-white text-xs">বর্তমান কৃতি শিক্ষার্থীদের তালিকা ({notableAlumni.length} জন)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {notableAlumni.map(al => (
                    <div key={al.id} className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 text-xs min-w-0">
                        <img src={al.image} alt={al.name} className="w-10 h-10 rounded-full object-cover bg-slate-950 border border-slate-800" />
                        <div className="min-w-0">
                          <p className="font-bold text-white truncate">{al.name}</p>
                          <p className="text-slate-400 text-[10px] truncate">{al.currentPosition} at {al.organization}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => startEditAlumni(al)} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg cursor-pointer">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteAlumni(al.id)} className="p-1.5 bg-rose-950/40 hover:bg-rose-900/50 text-rose-400 rounded-lg cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 7: Events & News Page Editor */}
          {activeSubTab === 'events' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-white">সেমিনার, পুনর্মিলনী ও নিউজ পোস্ট ডিরেক্টরি</h2>
                  <p className="text-xs text-slate-400">ওয়েবসাইটে প্রদর্শিত সকল অনুষ্ঠানের তালিকা ও পোস্ট তৈরি করুন</p>
                </div>
                {editingEventId && (
                  <button 
                    onClick={() => {
                      setEditingEventId(null);
                      setEvTitle(''); setEvDate(''); setEvTime(''); setEvLocation(''); setEvDescription(''); setEvBadge(''); setEvImage('');
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold animate-pulse"
                  >
                    নতুন তৈরিতে ফিরুন
                  </button>
                )}
              </div>

              {/* Form Block */}
              <form onSubmit={handleSaveEvent} className="bg-slate-900/30 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
                <h3 className="font-bold text-amber-400 text-sm">
                  {editingEventId ? 'পোস্ট সংশোধন করুন (Editing)' : 'নতুন পোস্ট পাবলিশ করুন (Add New Post)'}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">পোস্টের শিরোনাম (Post Title) *</label>
                    <input
                      type="text" required value={evTitle} onChange={(e) => setEvTitle(e.target.value)}
                      placeholder="যেমন: আধুনিক ফলিত রসায়ন ও টেকসই ক্যারিয়ার সেমিনার"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">ক্যাটাগরি *</label>
                      <select
                        value={evCategory} onChange={(e) => setEvCategory(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl outline-none font-bold"
                      >
                        <option value="seminar">বৈজ্ঞানিক সেমিনার (Seminar)</option>
                        <option value="reunion">মিলনমেলা ও পুনর্মিলনী (Reunion)</option>
                        <option value="gallery">ফটো গ্যালারি আপডেট (Gallery)</option>
                        <option value="news">সংবাদ ও প্রেস (News)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">পোস্টের বিশেষ ব্যাজ (Badge - Optional)</label>
                      <input
                        type="text" value={evBadge} onChange={(e) => setEvBadge(e.target.value)}
                        placeholder="যেমন: UPCOMING, HOT, NEW"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">তারিখ *</label>
                      <input
                        type="text" required value={evDate} onChange={(e) => setEvDate(e.target.value)}
                        placeholder="যেমন: ১৫ জুলাই ২০২৬"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">সময়</label>
                      <input
                        type="text" value={evTime} onChange={(e) => setEvTime(e.target.value)}
                        placeholder="যেমন: সকাল ১০:০০ টা"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">স্থান / ভেন্যু</label>
                      <input
                        type="text" value={evLocation} onChange={(e) => setEvLocation(e.target.value)}
                        placeholder="যেমন: রসায়ন সেমিনার গ্যালারি"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">বিস্তারিত বিবরণ (Description) *</label>
                    <textarea
                      rows={3} required value={evDescription} onChange={(e) => setEvDescription(e.target.value)}
                      placeholder="অনুষ্ঠানের বিবরণ, স্পিকার লিস্ট ও সূচী এখানে লিখুন..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>

                  <ImageUploadHelper 
                    label="পোস্টের কভার ফটো (Cover Image URL or direct upload)"
                    value={evImage}
                    onChange={setEvImage}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-2.5 rounded-xl cursor-pointer transition-colors"
                >
                  {editingEventId ? 'পোস্ট আপডেট সেভ করুন' : 'নতুন পোস্ট ওয়েবসাইট লাইভ করুন'}
                </button>
              </form>

              {/* Event Posts list */}
              <div className="space-y-3">
                <h3 className="font-bold text-white text-xs">বর্তমান প্রকাশিত পোস্টসমূহ ({events.length} টি পোস্ট)</h3>
                <div className="space-y-2">
                  {events.map(ev => (
                    <div key={ev.id} className="bg-slate-900/40 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between text-xs gap-4">
                      <div className="flex items-center gap-3 text-xs min-w-0">
                        <img src={ev.image} alt={ev.title} className="w-10 h-10 rounded-lg object-cover bg-slate-950 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold text-white truncate">{ev.title}</p>
                          <p className="text-slate-400 text-[10px] mt-0.5 truncate">{ev.date} • {ev.location} • <span className="text-amber-400 font-extrabold uppercase">{ev.category}</span></p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => startEditEvent(ev)} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg cursor-pointer">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => onDeleteEvent(ev.id)} className="p-1.5 bg-rose-950/40 hover:bg-rose-900/50 text-rose-400 rounded-lg cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 8: Applications Verification Dashboard */}
          {activeSubTab === 'registrations' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-xl font-extrabold text-white">সদস্যপদ আবেদন ডিরেক্টরি</h2>
                <p className="text-xs text-slate-400">প্রাক্তন ও বর্তমান শিক্ষার্থীদের প্রেরিত মেম্বারশিপ আবেদনসমূহ</p>
              </div>

              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl space-y-3.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-mono bg-slate-950 text-amber-400 border border-slate-800 px-2 py-0.5 rounded font-black text-[10px]">
                          {app.trackingCode}
                        </span>
                        <h4 className="font-bold text-white text-sm mt-1.5">{app.fullName}</h4>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                        app.status === 'approved'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : app.status === 'rejected'
                          ? 'bg-rose-950 text-rose-300 border-rose-800'
                          : 'bg-amber-950 text-amber-300 border-amber-800 animate-pulse'
                      }`}>
                        {app.status === 'approved' ? '✓ Approved' : app.status === 'rejected' ? '✕ Rejected' : '⏳ Pending Validation'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-slate-300 border-t border-slate-800/50 pt-3">
                      <p><strong className="text-slate-400 block">ইমেইল:</strong> {app.email}</p>
                      <p><strong className="text-slate-400 block">ফোন:</strong> {app.phone}</p>
                      <p><strong className="text-slate-400 block">প্রতিষ্ঠান:</strong> {app.institution}</p>
                      <p><strong className="text-slate-400 block">পাসের সাল:</strong> {app.passingYear}</p>
                    </div>

                    <div className="text-[11px] text-slate-300">
                      <strong className="text-slate-400 block">মেম্বারশিপ টাইপ:</strong> {app.membershipTier}
                    </div>

                    {app.status === 'pending' && (
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          onClick={() => onUpdateApplicationStatus(app.id, 'rejected')}
                          className="flex items-center gap-1 bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 px-3 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>প্রত্যাখ্যান</span>
                        </button>
                        <button
                          onClick={() => onUpdateApplicationStatus(app.id, 'approved')}
                          className="flex items-center gap-1 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 px-3 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>অনুমোদন করুন</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 9: Contact Messages Inbox */}
          {activeSubTab === 'inbox' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-xl font-extrabold text-white">যোগাযোগ ইনবক্স (Inquiries)</h2>
                <p className="text-xs text-slate-400">সাধারণ ভিজিটর ও প্রাক্তনদের প্রেরিত বার্তা</p>
              </div>

              <div className="space-y-3.5">
                {inboxMessages.map((msg) => (
                  <div key={msg.id} className={`p-5 rounded-2xl border transition-all text-xs space-y-3 ${
                    msg.isRead ? 'bg-slate-900/20 border-slate-800/80' : 'bg-slate-900/60 border-amber-500/30 shadow-md'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">{msg.name}</h4>
                          {!msg.isRead && (
                            <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded text-[9px] font-black uppercase">
                              NEW
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-[10px]">{msg.email} • {msg.date}</p>
                      </div>

                      <button
                        onClick={() => handleToggleRead(msg.id)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-extrabold transition-colors cursor-pointer border ${
                          msg.isRead 
                            ? 'bg-slate-800 text-slate-400 border-slate-700/60 hover:bg-slate-700' 
                            : 'bg-amber-500 text-slate-950 border-amber-400 hover:bg-amber-600'
                        }`}
                      >
                        {msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                      </button>
                    </div>

                    <div className="space-y-1">
                      <p className="font-bold text-amber-400">বিষয়: {msg.subject}</p>
                      <p className="text-slate-300 leading-relaxed text-[11px] bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 10: Site Settings */}
          {activeSubTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-xl font-extrabold text-white">সাইটের সাধারণ সেটিংস</h2>
                <p className="text-xs text-slate-400">ওয়েবসাইটের টাইটেল, মেটাডাটা ও রক্ষণাবেক্ষণ মোড</p>
              </div>

              {settingsSaved && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-800 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span>আপনার নতুন সাইট সেটিংস সফলভাবে আপডেট ও সেভ হয়েছে!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">সাইট শিরোনাম (Site Title)</label>
                  <input
                    type="text"
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">হটলাইন ও মোবাইল নম্বর</label>
                  <input
                    type="text"
                    value={contactHotline}
                    onChange={(e) => setContactHotline(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 text-white border border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="p-4 bg-slate-900/30 border border-slate-800 rounded-2xl flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-bold text-white block">রক্ষণাবেক্ষণ মোড (Maintenance Mode)</span>
                    <span className="text-[10px] text-slate-400 block">সক্রিয় থাকলে সাধারণ ভিজিটরগণ নোটিশ স্ক্রিন দেখতে পাবে।</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                    className="w-5 h-5 rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0 cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-3.5 px-6 rounded-xl font-extrabold text-sm shadow transition-colors cursor-pointer"
                >
                  কনফিগারেশন সংরক্ষণ করুন (Save Settings)
                </button>
              </form>
            </div>
          )}

          {/* Tab 11: Moderator Management (Admin Only) */}
          {activeSubTab === 'moderators' && currentUser?.role === 'admin' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-white">মডারেটর ও রোল অ্যাক্সেস সেটিংস</h2>
                  <p className="text-xs text-slate-400">নতুন মডারেটর অ্যাকাউন্ট তৈরি করুন এবং সুনির্দিষ্টভাবে তাদের রোল পারমিশন সেট করুন</p>
                </div>
                {editingModId && (
                  <button 
                    onClick={() => {
                      setEditingModId(null);
                      setModFullName(''); setModEmail(''); setModPassword('');
                      setModPermissions({
                        overview: true, teachers: false, notices: false, gallery: false,
                        members: false, alumni: false, events: false, registrations: false,
                        inbox: false, settings: false
                      });
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold"
                  >
                    নতুন তৈরিতে ফিরুন
                  </button>
                )}
              </div>

              {/* Form Block */}
              <form onSubmit={handleSaveModerator} className="bg-slate-900/30 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
                <h3 className="font-bold text-amber-400 text-sm">
                  {editingModId ? 'মডারেটর তথ্য সংশোধন করুন (Editing)' : 'নতুন মডারেটর অ্যাকাউন্ট তৈরি করুন (Create New)'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">মডারেটরের নাম (Full Name) *</label>
                    <input
                      type="text" required value={modFullName} onChange={(e) => setModFullName(e.target.value)}
                      placeholder="যেমন: ড. তানভীর আহমেদ"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">ইমেইল বা ইউজারনেম (Email Address) *</label>
                    <input
                      type="email" required value={modEmail} onChange={(e) => setModEmail(e.target.value)}
                      placeholder="যেমন: tanvir@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">লগইন পাসওয়ার্ড (Password) *</label>
                    <input
                      type="text" required value={modPassword} onChange={(e) => setModPassword(e.target.value)}
                      placeholder="যেমন: userPass123"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl outline-none"
                    />
                  </div>
                </div>

                {/* Permissions Checkbox Matrix */}
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-3">
                  <span className="font-bold text-slate-200 block border-b border-slate-800 pb-2">
                    সুনির্দিষ্ট সেকশনের প্রবেশাধিকার নির্ধারণ করুন (Choose Access Permissions)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                    <label className="flex items-start gap-2.5 p-2 bg-slate-900/40 border border-slate-800/80 rounded-lg cursor-pointer hover:bg-slate-900/80 transition-colors">
                      <input
                        type="checkbox"
                        checked={modPermissions.overview}
                        onChange={(e) => setModPermissions({ ...modPermissions, overview: e.target.checked })}
                        className="mt-0.5 rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0"
                      />
                      <div>
                        <span className="font-bold text-white block">Dashboard Overview</span>
                        <span className="text-[10px] text-slate-400 block">হোম ড্যাশবোর্ড ও পরিসংখ্যান</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 bg-slate-900/40 border border-slate-800/80 rounded-lg cursor-pointer hover:bg-slate-900/80 transition-colors">
                      <input
                        type="checkbox"
                        checked={modPermissions.teachers}
                        onChange={(e) => setModPermissions({ ...modPermissions, teachers: e.target.checked })}
                        className="mt-0.5 rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0"
                      />
                      <div>
                        <span className="font-bold text-white block">Teacher Info</span>
                        <span className="text-[10px] text-slate-400 block">শিক্ষকদের তথ্য ডিরেক্টরি</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 bg-slate-900/40 border border-slate-800/80 rounded-lg cursor-pointer hover:bg-slate-900/80 transition-colors">
                      <input
                        type="checkbox"
                        checked={modPermissions.notices}
                        onChange={(e) => setModPermissions({ ...modPermissions, notices: e.target.checked })}
                        className="mt-0.5 rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0"
                      />
                      <div>
                        <span className="font-bold text-white block">Notices Board</span>
                        <span className="text-[10px] text-slate-400 block">জরুরি বিজ্ঞপ্তি ও নোটিশ</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 bg-slate-900/40 border border-slate-800/80 rounded-lg cursor-pointer hover:bg-slate-900/80 transition-colors">
                      <input
                        type="checkbox"
                        checked={modPermissions.gallery}
                        onChange={(e) => setModPermissions({ ...modPermissions, gallery: e.target.checked })}
                        className="mt-0.5 rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0"
                      />
                      <div>
                        <span className="font-bold text-white block">Gallery Option</span>
                        <span className="text-[10px] text-slate-400 block">স্মৃতিচারণ স্লাইড গ্যালারি</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 bg-slate-900/40 border border-slate-800/80 rounded-lg cursor-pointer hover:bg-slate-900/80 transition-colors">
                      <input
                        type="checkbox"
                        checked={modPermissions.members}
                        onChange={(e) => setModPermissions({ ...modPermissions, members: e.target.checked })}
                        className="mt-0.5 rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0"
                      />
                      <div>
                        <span className="font-bold text-white block">Shokol Shodosso Info</span>
                        <span className="text-[10px] text-slate-400 block">অনুমোদিত সদস্য তালিকা</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 bg-slate-900/40 border border-slate-800/80 rounded-lg cursor-pointer hover:bg-slate-900/80 transition-colors">
                      <input
                        type="checkbox"
                        checked={modPermissions.alumni}
                        onChange={(e) => setModPermissions({ ...modPermissions, alumni: e.target.checked })}
                        className="mt-0.5 rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0"
                      />
                      <div>
                        <span className="font-bold text-white block">Kriti Alumni</span>
                        <span className="text-[10px] text-slate-400 block">কৃতী অ্যালামনাই ডিরেক্টরি</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 bg-slate-900/40 border border-slate-800/80 rounded-lg cursor-pointer hover:bg-slate-900/80 transition-colors">
                      <input
                        type="checkbox"
                        checked={modPermissions.events}
                        onChange={(e) => setModPermissions({ ...modPermissions, events: e.target.checked })}
                        className="mt-0.5 rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0"
                      />
                      <div>
                        <span className="font-bold text-white block">Event & News Page</span>
                        <span className="text-[10px] text-slate-400 block">সেমিনার ও নিউজ ফিড</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 bg-slate-900/40 border border-slate-800/80 rounded-lg cursor-pointer hover:bg-slate-900/80 transition-colors">
                      <input
                        type="checkbox"
                        checked={modPermissions.registrations}
                        onChange={(e) => setModPermissions({ ...modPermissions, registrations: e.target.checked })}
                        className="mt-0.5 rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0"
                      />
                      <div>
                        <span className="font-bold text-white block">Applications</span>
                        <span className="text-[10px] text-slate-400 block">সদস্য আবেদন যাচাইকরণ</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 bg-slate-900/40 border border-slate-800/80 rounded-lg cursor-pointer hover:bg-slate-900/80 transition-colors">
                      <input
                        type="checkbox"
                        checked={modPermissions.inbox}
                        onChange={(e) => setModPermissions({ ...modPermissions, inbox: e.target.checked })}
                        className="mt-0.5 rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0"
                      />
                      <div>
                        <span className="font-bold text-white block">Contact Inbox</span>
                        <span className="text-[10px] text-slate-400 block">ইনবক্স বার্তা ব্যবস্থাপনা</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 bg-slate-900/40 border border-slate-800/80 rounded-lg cursor-pointer hover:bg-slate-900/80 transition-colors col-span-1 sm:col-span-2 md:col-span-1">
                      <input
                        type="checkbox"
                        checked={modPermissions.settings}
                        onChange={(e) => setModPermissions({ ...modPermissions, settings: e.target.checked })}
                        className="mt-0.5 rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0"
                      />
                      <div>
                        <span className="font-bold text-white block">Site General Settings</span>
                        <span className="text-[10px] text-slate-400 block">সাইট শিরোনাম ও মোড কনফিগারেশন</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  {editingModId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingModId(null);
                        setModFullName(''); setModEmail(''); setModPassword('');
                        setModPermissions({
                          overview: true, teachers: false, notices: false, gallery: false,
                          members: false, alumni: false, events: false, registrations: false,
                          inbox: false, settings: false
                        });
                      }}
                      className="px-5 py-2.5 bg-slate-850 hover:bg-slate-800 text-slate-300 rounded-xl font-bold cursor-pointer transition-colors"
                    >
                      বাতিল করুন
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>{editingModId ? 'তথ্য সংশোধন করুন' : 'মডারেটর যুক্ত করুন'}</span>
                  </button>
                </div>
              </form>

              {/* Moderators List */}
              <div className="space-y-4">
                <h3 className="font-bold text-white text-sm">সক্রিয় মডারেটর তালিকা (Active Moderators List)</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {moderators.length === 0 ? (
                    <div className="col-span-full bg-slate-900/20 border border-slate-800 p-8 rounded-2xl text-center text-xs text-slate-500">
                      এই মুহূর্তে কোনো মডারেটর তালিকাভুক্ত নেই। নতুন মডারেটর যুক্ত করতে উপরের ফরমটি পূরণ করুন।
                    </div>
                  ) : (
                    moderators.map((m) => {
                      const permittedCount = Object.values(m.permissions).filter(Boolean).length;
                      return (
                        <div key={m.id} className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
                          <div className="space-y-2.5">
                            <div className="flex justify-between items-start">
                              <div className="space-y-0.5">
                                <h4 className="font-extrabold text-white text-sm">{m.fullName}</h4>
                                <span className="text-[10px] text-slate-400 block font-medium">নিবন্ধন তারিখ: {m.createdDate}</span>
                              </div>
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => handleEditModerator(m)}
                                  className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700/60 hover:bg-slate-700 transition-colors"
                                  title="সম্পাদনা করুন"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteModerator(m.id)}
                                  className="p-1.5 bg-rose-950/40 text-rose-400 hover:text-rose-300 rounded-lg border border-rose-900/50 hover:bg-rose-900/30 transition-colors"
                                  title="মুছে ফেলুন"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-950/60 p-2.5 rounded-xl border border-slate-900">
                              <div>
                                <span className="text-slate-400 block">ইমেল / ইউজারনেম:</span>
                                <span className="font-bold text-slate-200 select-all">{m.email}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block">পাসওয়ার্ড:</span>
                                <span className="font-mono font-bold text-amber-400 select-all">{m.password}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1.5 pt-1.5 border-t border-slate-800/60">
                            <span className="font-bold text-slate-300 text-[10px] flex justify-between items-center">
                              <span>অ্যাক্সেস পারমিশনসমূহ:</span>
                              <span className="text-amber-500 font-extrabold">{permittedCount}/১০ সেকশন</span>
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {Object.entries(m.permissions).map(([key, val]) => (
                                <span
                                  key={key}
                                  className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                                    val 
                                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/50' 
                                      : 'bg-slate-900/30 text-slate-500 border border-slate-850/50 line-through'
                                  }`}
                                >
                                  {key === 'overview' && 'Overview'}
                                  {key === 'teachers' && 'Teachers'}
                                  {key === 'notices' && 'Notices'}
                                  {key === 'gallery' && 'Gallery'}
                                  {key === 'members' && 'Members'}
                                  {key === 'alumni' && 'Alumni'}
                                  {key === 'events' && 'Events'}
                                  {key === 'registrations' && 'Applications'}
                                  {key === 'inbox' && 'Inbox'}
                                  {key === 'settings' && 'Settings'}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}
