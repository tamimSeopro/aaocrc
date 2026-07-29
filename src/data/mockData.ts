import { TeacherQuote, TeacherProfile, NotableAlumni, EventItem, NoticeItem, MembershipApplication, ExecutiveMember } from '../types';

export const TEACHER_QUOTES: TeacherQuote[] = [
  {
    id: 'quote-1',
    name: 'Dr. Md. Sajedul Islam',
    designation: 'বিভাগীয় প্রধান ও সভাপতি',
    department: 'পিএইচডি, রাজশাহী বিশ্ববিদ্যালয়',
    quote: 'রাজশাহী কলেজের রসায়ন বিভাগ সর্বদা গৌরবময় সফলতার ঐতিহ্য বহন করে। আমাদের শিক্ষক মণ্ডলী এবং প্রাক্তন শিক্ষার্থীদের এই সম্মিলিত প্ল্যাটফর্ম শিক্ষার্থীদের বৈশ্বিক প্রতিযোগিতায় উপযোগী দক্ষ নাগরিক গড়ে তুলতে দারুণ অবদান রাখছে।',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'quote-2',
    name: 'Md. Monirul Islam',
    designation: 'সহযোগী অধ্যাপক ও সহ-সভাপতি',
    department: 'এম.এসসি, রাজশাহী বিশ্ববিদ্যালয়',
    quote: 'রসায়ন বিভাগের শিক্ষার্থীরা দেশ-বিদেশে সুনামের সাথে উচ্চশিক্ষা ও গবেষণা সম্পন্ন করছে। অ্যালামনাইদের এই সক্রিয় নেটওয়ার্ক আমাদের বর্তমান শিক্ষার্থীদের জন্য একটি আলোকবর্তিকা হিসেবে কাজ করে চলেছে।',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'quote-3',
    name: 'Shabnam Sultana',
    designation: 'সহযোগী অধ্যাপক (সংযুক্ত) ও সাধারণ সম্পাদক',
    department: 'এম.এসসি, রাজশাহী বিশ্ববিদ্যালয়',
    quote: 'শিক্ষক মণ্ডলী ও অ্যালামনাইদের এই সেতুবন্ধন রসায়ন গবেষণায় নতুন দিগন্ত উন্মোচন করবে। বিশেষ করে গ্রিন কেমিস্ট্রি ও আধুনিক ল্যাব ওয়ার্কশপ শিক্ষার্থীদের আন্তর্জাতিক অঙ্গনে এগিয়ে নেবে।',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80'
  }
];

export const DEPARTMENT_TEACHERS: TeacherProfile[] = [
  {
    id: 't-1',
    code: '09257',
    name: 'Dr. Md. Sajedul Islam',
    designation: 'PROFESSOR & DEPT. HEAD (বিভাগীয় প্রধান ও সভাপতি)',
    education: 'বি.সি.এস (শিক্ষা), এম.এসসি, পিএইচডি (ব্যাচ ১৪, মেধা ২৪)',
    phone: '01711966612',
    researchInterest: 'জৈব রসায়ন ও পলিমার রসায়ন',
    email: 'sajedul.chem@rc.edu.bd',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    category: 'head'
  },
  {
    id: 't-2',
    code: '014530',
    name: 'Md. Monirul Islam',
    designation: 'ASSOCIATE PROFESSOR (সহযোগী অধ্যাপক)',
    education: 'বি.সি.এস (শিক্ষা), এম.এসসি (ব্যাচ ২৬, মেধা ২৭)',
    phone: '01715007489',
    researchInterest: 'ভৌত রসায়ন ও সারফেস কেমিস্ট্রি',
    email: 'monirul.chem@rc.edu.bd',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    category: 'associate'
  },
  {
    id: 't-3',
    code: '13769',
    name: 'Shabnam Sultana (Attachment)',
    designation: 'ASSOCIATE PROFESSOR (সহযোগী অধ্যাপক - সংযুক্ত)',
    education: 'বি.সি.এস (শিক্ষা), এম.এসসি (ব্যাচ ২৪, মেধা ১০৯)',
    phone: '01715844470',
    researchInterest: 'ভৌত রসায়ন ও ন্যানোটেকনোলজি',
    email: 'shabnam.chem@rc.edu.bd',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    category: 'associate'
  },
  {
    id: 't-4',
    code: '016553',
    name: 'Dr. Mahmud Hasan Tareque',
    designation: 'ASSOCIATE PROFESSOR (সহযোগী অধ্যাপক)',
    education: 'বি.সি.এস (শিক্ষা), এম.এসসি, পিএইচডি (ব্যাচ ২৬, মেধা ০৫)',
    phone: '01750074203',
    researchInterest: 'এনভায়রনমেন্টাল কেমিস্ট্রি ও সবুজ রসায়ন',
    email: 'mahmud.chem@rc.edu.bd',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    category: 'associate'
  },
  {
    id: 't-5',
    code: '17875',
    name: 'Md Mizanur Rahman',
    designation: 'ASSISTANT PROFESSOR (সহকারী অধ্যাপক)',
    education: 'বি.সি.এস (শিক্ষা), এম.এসসি',
    phone: '01716099663',
    researchInterest: 'ইলেক্ট্রোকেমিস্ট্রি ও অ্যানালিটিক্যাল কেমিস্ট্রি',
    email: 'mizanur.chem@rc.edu.bd',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    category: 'assistant'
  },
  {
    id: 't-6',
    code: '17827',
    name: 'Md. Ehsanul Haque',
    designation: 'ASSISTANT PROFESSOR (সহকারী অধ্যাপক)',
    education: 'বি.সি.এস (শিক্ষা), এম.এসসি (ব্যাচ ২৮, মেধা ২৭)',
    phone: '01715324101',
    researchInterest: 'অর্গানিক সিন্থেসিস ও স্পেকট্রোস্কোপি',
    email: 'ehsanul.chem@rc.edu.bd',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    category: 'assistant'
  },
  {
    id: 't-7',
    code: '15811',
    name: 'Md Abdus Samad',
    designation: 'ASSISTANT PROFESSOR (সহকারী অধ্যাপক)',
    education: 'বি.সি.এস (শিক্ষা), এম.এসসি',
    phone: '01716181129',
    researchInterest: 'পলিমার কেমিস্ট্রি ও শিল্প রসায়ন',
    email: 'samad.chem@rc.edu.bd',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    category: 'assistant'
  },
  {
    id: 't-8',
    code: '18136141014',
    name: 'Md. Hasan Mahmud Siddique',
    designation: 'LECTURER (প্রভাষক)',
    education: 'বি.সি.এস (শিক্ষা), এম.এসসি (ব্যাচ ৩৮, মেধা ১৪)',
    phone: '01741060482',
    researchInterest: 'কম্পিউটেশনাল কেমিস্ট্রি',
    email: 'hasan.chem@rc.edu.bd',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    category: 'lecturer'
  },
  {
    id: 't-9',
    code: '18136141028',
    name: 'Fauzia Tabassum',
    designation: 'LECTURER (প্রভাষক)',
    education: 'বি.সি.এস (শিক্ষা), এম.এসসি (ব্যাচ ৩৮, মেধা ২৮)',
    phone: '01715950215',
    researchInterest: 'বায়ো-ইনঅর্গানিক ও রসায়ন প্রয়োগ',
    email: 'fauzia.chem@rc.edu.bd',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
    category: 'lecturer'
  },
  {
    id: 't-10',
    code: '18136141064',
    name: 'Md. Shamim Raton',
    designation: 'LECTURER (প্রভাষক)',
    education: 'বি.সি.এস (শিক্ষা), এম.এসসি (ব্যাচ ৩৮, মেধা ৬৪)',
    phone: '01737918175',
    researchInterest: 'মেটেরিয়ালস সায়েন্স ও গ্রিন টেকনোলজি',
    email: 'shamim.chem@rc.edu.bd',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    category: 'lecturer'
  },
  {
    id: 't-11',
    code: '22140141036',
    name: 'Md. Kudrot-E-Khuda',
    designation: 'LECTURER (প্রভাষক)',
    education: 'বি.সি.এস (শিক্ষা), এম.এসসি',
    phone: '01720001122',
    researchInterest: 'কোয়ান্টাম কেমিস্ট্রি ও স্পেকট্রোস্কোপি',
    email: 'kudrot.chem@rc.edu.bd',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300&auto=format&fit=crop&q=80',
    category: 'lecturer'
  }
];

export const NOTABLE_ALUMNI: NotableAlumni[] = [
  {
    id: 'a-1',
    name: 'ড. আরিফুর রহমান',
    classOf: 'Class of 1998',
    currentPosition: 'সিনিয়র গবেষক',
    organization: 'স্কয়ার ফার্মাসিউটিক্যালস',
    achievements: 'নতুন ওষুধ ফর্মুলেশন ও রাসায়নিক বিশ্লেষণে বিশেষ অবদান ও আন্তর্জাতিক স্বীকৃতি লাভ।',
    email: 'arif.chem@square.com.bd',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'a-2',
    name: 'অধ্যাপক ড. নাসরিন সুলতানা',
    classOf: 'Class of 1999',
    currentPosition: 'অধ্যাপক, রসায়ন বিভাগ',
    organization: 'রাজশাহী বিশ্ববিদ্যালয়',
    achievements: 'অর্গানিক সিন্থেসিস ও পরিবেশ রসায়ন গবেষণায় জাতীয় ও আন্তর্জাতিক জার্নালে বহু প্রবন্ধ প্রকাশ।',
    email: 'nasrin.sultana@ru.ac.bd',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'a-3',
    name: 'ড. মাহমুদুল হাসান',
    classOf: 'Class of 2017',
    currentPosition: 'প্রধান বৈজ্ঞানিক কর্মকর্তা',
    organization: 'বেক্সিমকো ফার্মা',
    achievements: 'বাংলাদেশে উন্নত ফর্মুলেশন প্রসেস অপ্টিমাইজেশন ও ড্রাগ ডেভেলপমেন্টে গুরুত্বপূর্ণ ভূমিকা।',
    email: 'm.hasan@beximco.com',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'a-4',
    name: 'ড. সায়েদা রহমান',
    classOf: 'Class of 2010',
    currentPosition: 'প্রধান রাসায়নিক কর্মকর্তা',
    organization: 'শেভরন বাংলাদেশ',
    achievements: 'পেট্রোলিয়াম লুব্রিকেন্ট ও ইন্ডাস্ট্রিয়াল কেমিক্যাল প্রসেসিং প্রকল্পে জাতীয় পর্যায়ে অবদান।',
    email: 'sayeda.rahman@chevron.com',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'a-5',
    name: 'কাজী ইশরাক',
    classOf: 'Class of 2021',
    currentPosition: 'গ্র্যাজুয়েট টিচিং অ্যাসিস্ট্যান্ট',
    organization: 'এমআইটি (MIT, USA)',
    achievements: 'কম্পিউটেশনাল কেমিস্ট্রি অ্যান্ড ম্যাটেরিয়ালস সায়েন্সের উপর গুরুত্বপূর্ণ থিসিস উপস্থাপনা।',
    email: 'ishraq.k@mit.edu',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80'
  }
];

export const MILESTONES = [
  { year: '১৮৭৩', title: 'কলেজ প্রতিষ্ঠা', desc: 'ঐতিহ্যবাহী রাজশাহী কলেজ প্রতিষ্ঠা' },
  { year: '১৯০৯', title: 'স্নাতক কোর্স শুরু', desc: 'রসায়ন বিভাগে স্নাতক কোর্স চালু' },
  { year: '১৯৭২', title: 'অনার্স কোর্স', desc: 'রসায়ন বিভাগে অনার্স কোর্স চালু' },
  { year: '১৯৯৩', title: 'মাস্টার্স চালু', desc: 'স্নাতকোত্তর (মাস্টার্স) কোর্স চালু' }
];

export const EXECUTIVE_COMMITTEE: ExecutiveMember[] = [
  { id: 'exe-1', name: 'Dr. Md. Sajedul Islam', role: 'বিভাগীয় প্রধান ও সভাপতি', edu: 'পিএইচডি, রাজশাহী বিশ্ববিদ্যালয়', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80' },
  { id: 'exe-2', name: 'Md. Monirul Islam', role: 'সহকারী অধ্যাপক ও সহ-সভাপতি', edu: 'এম.এসসি, রাজশাহী বিশ্ববিদ্যালয়', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80' },
  { id: 'exe-3', name: 'Shabnam Sultana', role: 'সহযোগী অধ্যাপক ও সাধারণ সম্পাদক', edu: 'এম.এসসি, রাজশাহী বিশ্ববিদ্যালয়', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80' },
  { id: 'exe-4', name: 'Dr. Mahmud Hasan Tareque', role: 'সহযোগী অধ্যাপক ও কোষাধ্যক্ষ', edu: 'পিএইচডি, রাজশাহী বিশ্ববিদ্যালয়', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80' }
];

export const MEMBERSHIP_PERKS = [
  'প্রাক্তন ও বর্তমান শিক্ষার্থীদের মধ্যে শক্তিশালী নেটওয়ার্কিং সুযোগ',
  'সমসাময়িক বিজ্ঞান প্রকাশনার আপডেট ও ক্যারিয়ার মেন্টরশিপ',
  'গবেষণামূলক সেমিনার, কর্মশালা ও সিম্পোজিয়ামে অংশগ্রহণ',
  'অ্যালামনাই ও শিক্ষক ফোরামে সরাসরি অ্যাক্সেস',
  'বিভাগের অবকাঠামোগত উন্নয়ন ও সমাজসেবামূলক উদ্যোগে সম্পৃক্ততা',
  'বার্ষিক পুনর্মিলনী ও মেম্বারস ডিনার ও সাংস্কৃতিক উৎসব',
  'আধুনিক রসায়ন ল্যাবরেটরি ও থিসিস কর্নার ব্যবহার সুবিধা',
  'রসায়ন বিজ্ঞান ও ক্যারিয়ারের গুরুত্বপূর্ণ ম্যাগাজিন ও জার্নাল প্রাপ্তি'
];

export const INITIAL_NOTICES: NoticeItem[] = [
  {
    id: 'notice-1',
    title: 'বার্ষিক পুনর্মিলনী ২০২৬ নিবন্ধন বিজ্ঞপ্তি',
    date: '২৮ জুন, ২০২৬',
    isUrgent: true,
    content: 'আগামী ১৫ অক্টোবর ২০২৬ রাজশাহী কলেজ রসায়ন বিভাগের শতবর্ষী পুনর্মিলনী অনুষ্ঠিত হবে। সকল প্রাক্তন শিক্ষার্থীকে ৩০ সেপ্টেম্বরের মধ্যে নিবন্ধন করার জন্য অনুরোধ করা হলো।'
  },
  {
    id: 'notice-2',
    title: 'গ্রিন কেমিস্ট্রি সেমিনার ও ল্যাব ওয়ার্কশপ',
    date: '২০ জুন, ২০২৬',
    isUrgent: false,
    content: 'আগামী ৫ জুলাই রসায়ন বিজ্ঞান ভবনে আন্তর্জাতিক গ্রিন কেমিস্ট্রি বিষয়ক কর্মশালা অনুষ্ঠিত হবে।'
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    title: 'রসায়ন অ্যালামনাই পুনর্মিলনী ও গ্র্যান্ড ডিনার ২০২৬',
    date: '১৫ অক্টোবর, ২০২৬',
    time: 'সকাল ৯:০০ - রাত ১০:০০',
    location: 'রসায়ন বিজ্ঞান ভবন ও কলেজ অডিটোরিয়াম',
    category: 'reunion',
    badge: 'আসন্ন প্রধান উৎসব',
    description: '১৯০৯ থেকে ২০২৬ পর্যন্ত সকল ব্যাচের প্রাক্তন শিক্ষার্থীদের মিলনমেলা, স্মৃতিচারণ ও মনোজ্ঞ সাংস্কৃতিক অনুষ্ঠান।',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ev-2',
    title: 'আধুনিক স্পেকট্রোস্কোপি ও গ্রিন কেমিস্ট্রি সেমিনার',
    date: '০৫ জুলাই, ২০২৬',
    time: 'দুপুর ২:৩০ - বিকাল ৫:০০',
    location: 'সেমিনার হল ৩১৯, রসায়ন বিভাগ',
    category: 'seminar',
    badge: 'বিজ্ঞান ফোরাম',
    description: 'আন্তর্জাতিক খ্যাতিসম্পন্ন গবেষকদের অংশগ্রহণে রসায়নের আধুনিক প্রযুক্তি ও পরিবেশবান্ধব প্রয়োগ নিয়ে সেমিনার।',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ev-3',
    title: 'ইন্ডাস্ট্রিয়াল কেমিস্ট্রি ক্যারিয়ার মেন্টরশিপ সেশন',
    date: '২০ আগস্ট, ২০২৬',
    time: 'বিকাল ৪:০০ - সন্ধ্যা ৬:৩০',
    location: 'অনলাইন জুম ও ভার্চুয়াল হল',
    category: 'news',
    badge: 'ক্যারিয়ার পোর্টাল',
    description: 'ফার্মাসিউটিক্যালস, কেমিক্যাল ইন্ডাস্ট্রি ও বৈশ্বিক স্কলারশিপ নিয়ে কৃতি প্রাক্তনদের সরাসরি দিকনির্দেশনা।',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ev-4',
    title: 'ঐতিহ্যবাহী রসায়ন ল্যাব ও ক্যাম্পাস গ্যালারি প্রদর্শনী',
    date: 'সারাবছর উন্মুক্ত',
    time: 'সকাল ১০:০০ - বিকাল ৪:০০',
    location: 'ক্যাম্পাস গ্যালারি ও করিডোর',
    category: 'gallery',
    badge: 'আর্কাইভ',
    description: 'শতবর্ষী প্রাচীন দুর্লভ যন্ত্রপাতি, কাঁচের সরঞ্জাম ও ঐতিহাসিক আলোকচিত্রের স্থায়ী গ্যালারি।',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=600&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_APPLICATIONS: MembershipApplication[] = [
  {
    id: 'app-1001',
    trackingCode: 'RCCA-2026-1001',
    fullName: 'তানভীর আহমেদ',
    email: 'tanvir.chem@gmail.com',
    phone: '01712345678',
    institution: 'রাজশাহী কলেজ',
    major: 'রসায়ন (Honours)',
    passingYear: '2024',
    membershipTier: 'আজীবন সদস্য (Life Member)',
    status: 'approved',
    appliedDate: '২০ জুন, ২০২৬'
  },
  {
    id: 'app-1002',
    trackingCode: 'RCCA-2026-1002',
    fullName: 'নুসরাত জাহান লিমা',
    email: 'nusrat.lima@yahoo.com',
    phone: '01819876543',
    institution: 'রাজশাহী কলেজ',
    major: 'রসায়ন (Masters)',
    passingYear: '2022',
    membershipTier: 'সাধারণ সদস্য (General Member)',
    status: 'pending',
    appliedDate: '২৮ জুন, ২০২৬'
  }
];

export const INITIAL_GALLERY_SLIDES = [
  {
    id: 'slide-1',
    url: 'https://res.cloudinary.com/ydwdvzyo/image/upload/v1785331170/unnamed_dbi26h.webp',
    title: 'ঐতিহাসিক রসায়ন ভবন, রাজশাহী কলেজ',
    description: '১৯০৯ সালে স্থাপিত ঐতিহ্যবাহী রসায়ন বিজ্ঞান ভবন ও গবেষণা ক্যাম্পাস।'
  },
  {
    id: 'slide-2',
    url: 'https://res.cloudinary.com/ydwdvzyo/image/upload/v1785331256/unnamed_1_qlhwlv.webp',
    title: 'রসায়ন বিভাগ ও অ্যালামনাই অ্যাসোসিয়েশন ভবন',
    description: 'প্রাক্তন ও বর্তমান শিক্ষার্থী এবং শিক্ষক মণ্ডলীর মিলনকেন্দ্র।'
  },
  {
    id: 'slide-3',
    url: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=1000&auto=format&fit=crop&q=80',
    title: 'রসায়ন বিভাগীয় অত্যাধুনিক গবেষণাগার',
    description: 'আধুনিক রাসায়নিক বিশ্লেষণ ও সুসজ্জিত কেমিক্যাল সেটিং সমৃদ্ধ ল্যাব।'
  },
  {
    id: 'slide-4',
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&auto=format&fit=crop&q=80',
    title: 'বিভাগীয় বিশেষ বৈজ্ঞানিক ও সেমিনার অধিবেশন',
    description: 'দেশ-বিদেশের স্বনামধন্য গবেষকদের নিয়ে নিয়োজিত জ্ঞানগর্ভ সেমিনার।'
  },
  {
    id: 'slide-5',
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&auto=format&fit=crop&q=80',
    title: 'কৃতি শিক্ষার্থীদের মিলনমেলা ও সম্মাননা অনুষ্ঠান',
    description: 'সাফল্য অর্জনকারী শিক্ষার্থীদের মেধা অন্বেষণ ও কৃতি সম্মাননা প্রদানের উৎসব।'
  }
];

