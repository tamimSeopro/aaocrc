export type PageTab = 'home' | 'about' | 'alumni' | 'membership' | 'events' | 'contact' | 'admin';

export interface TeacherQuote {
  id: string;
  name: string;
  designation: string;
  department: string;
  quote: string;
  image: string;
}

export interface TeacherProfile {
  id: string;
  code: string;
  name: string;
  designation: string;
  education: string;
  phone: string;
  researchInterest: string;
  email: string;
  image: string;
  category: 'head' | 'professor' | 'associate' | 'assistant' | 'lecturer';
}

export interface NotableAlumni {
  id: string;
  name: string;
  classOf: string;
  currentPosition: string;
  organization: string;
  achievements: string;
  email: string;
  image: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'seminar' | 'reunion' | 'gallery' | 'news';
  description: string;
  image?: string;
  badge?: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  isUrgent: boolean;
  content: string;
  category?: string;
  pdfUrl?: string;
}

export interface MembershipApplication {
  id: string;
  trackingCode: string;
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  major: string;
  passingYear: string;
  membershipTier: string;
  additionalInfo?: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

export interface GallerySlide {
  id: string;
  url: string;
  title: string;
  description: string;
}

export interface AdminPermissions {
  overview: boolean;
  teachers: boolean;
  notices: boolean;
  gallery: boolean;
  members: boolean;
  alumni: boolean;
  events: boolean;
  registrations: boolean;
  inbox: boolean;
  settings: boolean;
}

export interface Moderator {
  id: string;
  email: string;
  password?: string;
  fullName: string;
  permissions: AdminPermissions;
  createdDate: string;
}


