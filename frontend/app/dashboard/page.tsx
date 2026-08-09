'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Users, MessageSquareText, Calendar, Image as ImageIcon, LogOut, Plus, Trash2, Edit, X, GraduationCap, ChevronLeft, Folder, Bell, Award, Loader2, UserCog, Briefcase, BookUser } from 'lucide-react';

const CLOUDINARY_UPLOAD_PRESET = 'yqrwxign';
const CLOUDINARY_CLOUD_NAME = 'blmpiipa';
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
const API_BASE = 'https://bba-student-club.onrender.com/api';

// Helper: upload a file to Cloudinary and return secure_url
async function uploadToCloudinary(file: File): Promise<string> {
  const imageData = new FormData();
  imageData.append('file', file);
  imageData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(CLOUDINARY_URL, {
    method: 'POST',
    body: imageData,
  });

  const data = await res.json();
  if (data.secure_url) {
    return data.secure_url;
  }
  console.error('Cloudinary upload failed:', data);
  throw new Error('Image upload failed. Please try again.');
}

export default function AdminDashboard() {
  const router = useRouter();
  const [adminId] = useState('Admin User');
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<'bod' | 'president' | 'chief' | 'director' | 'professor' | 'events' | 'gallery' | 'alumni' | 'notice' | 'result'>('bod');

  // ---------------- BOD State ----------------
  const [bodMembers, setBodMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmittingBod, setIsSubmittingBod] = useState(false);
  const [storageAlert, setStorageAlert] = useState<{ show: boolean; message: string; percentUsed: number } | null>(null);

const fetchStorageStatus = async () => {
  try {
    const res = await fetch(`${API_BASE}/storage-status`);
    const json = await res.json();
    if (json.percentUsed >= 80) {
      setStorageAlert({
        show: true,
        message: json.percentUsed >= 95
          ? 'Cloudinary storage is almost full! Please delete old images or blogs immediately.'
          : 'Cloudinary storage is getting full. Consider deleting old, unnecessary images or blogs.',
        percentUsed: json.percentUsed,
      });
    }
  } catch (err) {
    console.error('Failed to fetch storage status:', err);
  }
};


  const [formData, setFormData] = useState<{
    name: string;
    role: string;
    description: string;
    image: string;
    imageFile?: File | null;
    email: string;
    socialLinks: { linkedin: string; github: string; instagram: string };
  }>({
    name: '',
    role: '',
    description: '',
    image: '',
    imageFile: null,
    email: '',
    socialLinks: { linkedin: '', github: '', instagram: '' },
  });

  // ---------------- President Message State ----------------
  const [presidentMessages, setPresidentMessages] = useState<any[]>([]);
  const [isPresidentModalOpen, setIsPresidentModalOpen] = useState(false);
  const [editingPresidentId, setEditingPresidentId] = useState<string | null>(null);
  const [isSubmittingPresident, setIsSubmittingPresident] = useState(false);

  const [presidentFormData, setPresidentFormData] = useState<{
    name: string;
    description: string;
    image: string;
    imageFile?: File | null;
  }>({
    name: '',
    description: '',
    image: '',
    imageFile: null,
  });

  // ---------------- Chief Message State ----------------
  const [chiefMessages, setChiefMessages] = useState<any[]>([]);
  const [isChiefModalOpen, setIsChiefModalOpen] = useState(false);
  const [editingChiefId, setEditingChiefId] = useState<string | null>(null);
  const [isSubmittingChief, setIsSubmittingChief] = useState(false);

  const [chiefFormData, setChiefFormData] = useState<{
    name: string;
    description: string;
    image: string;
    imageFile?: File | null;
  }>({
    name: '',
    description: '',
    image: '',
    imageFile: null,
  });

  // ---------------- Director Message State ----------------
  const [directorMessages, setDirectorMessages] = useState<any[]>([]);
  const [isDirectorModalOpen, setIsDirectorModalOpen] = useState(false);
  const [editingDirectorId, setEditingDirectorId] = useState<string | null>(null);
  const [isSubmittingDirector, setIsSubmittingDirector] = useState(false);

  const [directorFormData, setDirectorFormData] = useState<{
    name: string;
    description: string;
    image: string;
    imageFile?: File | null;
  }>({
    name: '',
    description: '',
    image: '',
    imageFile: null,
  });

  // ---------------- Professor State ----------------
  const [professors, setProfessors] = useState<any[]>([]);
  const [isProfessorModalOpen, setIsProfessorModalOpen] = useState(false);
  const [editingProfessorId, setEditingProfessorId] = useState<string | null>(null);
  const [isSubmittingProfessor, setIsSubmittingProfessor] = useState(false);

  const [professorFormData, setProfessorFormData] = useState<{
    name: string;
    role: string;
    description: string;
    image: string;
    imageFile?: File | null;
    email: string;
    socialLinks: { linkedin: string; github: string; instagram: string };
  }>({
    name: '',
    role: '',
    description: '',
    image: '',
    imageFile: null,
    email: '',
    socialLinks: { linkedin: '', github: '', instagram: '' },
  });

  // ---------------- Events State ----------------
  const [events, setEvents] = useState<any[]>([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);

  const [eventFormData, setEventFormData] = useState<{
    title: string;
    description: string;
    image: string;
    imageFile?: File | null;
    location: string;
    date: string;
  }>({
    title: '',
    description: '',
    image: '',
    imageFile: null,
    location: '',
    date: '',
  });

  // ---------------- Gallery State ----------------
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [isSubmittingGallery, setIsSubmittingGallery] = useState(false);

  const [galleryFormData, setGalleryFormData] = useState<{
    image: string;
    imageFile?: File | null;
  }>({
    image: '',
    imageFile: null,
  });

  // ---------------- Alumni State ----------------
  const [alumniList, setAlumniList] = useState<any[]>([]);
  const [isAlumniModalOpen, setIsAlumniModalOpen] = useState(false);
  const [editingAlumniId, setEditingAlumniId] = useState<string | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [isSubmittingAlumni, setIsSubmittingAlumni] = useState(false);

  const [alumniFormData, setAlumniFormData] = useState<{
    name: string;
    pastRole: string;
    description: string;
    image: string;
    imageFile?: File | null;
    email: string;
    batch: string;
    socialLinks: { linkedin: string; github: string; instagram: string };
  }>({
    name: '',
    pastRole: '',
    description: '',
    image: '',
    imageFile: null,
    email: '',
    batch: '',
    socialLinks: { linkedin: '', github: '', instagram: '' },
  });

  // ---------------- Notice State ----------------
  const [notices, setNotices] = useState<any[]>([]);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [isSubmittingNotice, setIsSubmittingNotice] = useState(false);

  const [noticeFormData, setNoticeFormData] = useState<{
    title: string;
    description: string;
    date: string;
    image: string;
    imageFile?: File | null;
  }>({
    title: '',
    description: '',
    date: '',
    image: '',
    imageFile: null,
  });

  // ---------------- Result State ----------------
  const [results, setResults] = useState<any[]>([]);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [editingResultId, setEditingResultId] = useState<string | null>(null);
  const [isSubmittingResult, setIsSubmittingResult] = useState(false);

  const [resultFormData, setResultFormData] = useState<{
    title: string;
    description: string;
    image: string;
    imageFile?: File | null;
    date: string;
  }>({
    title: '',
    description: '',
    image: '',
    imageFile: null,
    date: '',
  });

  useEffect(() => {
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
  if (!isLoggedIn) {
    router.push('/login');
  } else {
    setAuthorized(true);
    fetchBodMembers();
    fetchPresidentMessages();
    fetchChiefMessages();
    fetchDirectorMessages();
    fetchProfessors();
    fetchEvents();
    fetchGalleryImages();
    fetchAlumni();
    fetchNotices();
    fetchResults();
    fetchStorageStatus(); 
  }
}, [router]);

  // ==================== FETCH FUNCTIONS ====================

  const fetchBodMembers = async () => {
    try {
      const res = await fetch(`${API_BASE}/bod`);
      const json = await res.json();
      if (json.success) setBodMembers(json.data);
    } catch (err) {
      console.error('Failed to fetch BOD members:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPresidentMessages = async () => {
    try {
      const res = await fetch(`${API_BASE}/president-message`);
      const json = await res.json();
      if (json.success) setPresidentMessages(json.data);
    } catch (err) {
      console.error('Failed to fetch president messages:', err);
    }
  };

  const fetchChiefMessages = async () => {
    try {
      const res = await fetch(`${API_BASE}/chief-message`);
      const json = await res.json();
      if (json.success) setChiefMessages(json.data);
    } catch (err) {
      console.error('Failed to fetch chief messages:', err);
    }
  };

  const fetchDirectorMessages = async () => {
    try {
      const res = await fetch(`${API_BASE}/director-message`);
      const json = await res.json();
      if (json.success) setDirectorMessages(json.data);
    } catch (err) {
      console.error('Failed to fetch director messages:', err);
    }
  };

  const fetchProfessors = async () => {
    try {
      const res = await fetch(`${API_BASE}/professor`);
      const json = await res.json();
      if (json.success) setProfessors(json.data);
    } catch (err) {
      console.error('Failed to fetch professors:', err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_BASE}/events`);
      const json = await res.json();
      if (json.success) setEvents(json.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  const fetchGalleryImages = async () => {
    try {
      const res = await fetch(`${API_BASE}/images`);
      const json = await res.json();
      if (json.success) setGalleryImages(json.data);
    } catch (err) {
      console.error('Failed to fetch gallery images:', err);
    }
  };

  const fetchAlumni = async () => {
    try {
      const res = await fetch(`${API_BASE}/alumni`);
      const json = await res.json();
      if (json.success) setAlumniList(json.data);
    } catch (err) {
      console.error('Failed to fetch alumni:', err);
    }
  };

  const fetchNotices = async () => {
    try {
      const res = await fetch(`${API_BASE}/notices`);
      const json = await res.json();
      if (json.success) setNotices(json.data);
    } catch (err) {
      console.error('Failed to fetch notices:', err);
    }
  };

  const fetchResults = async () => {
    try {
      const res = await fetch(`${API_BASE}/results`);
      const json = await res.json();
      if (json.success) setResults(json.data);
    } catch (err) {
      console.error('Failed to fetch results:', err);
    }
  };

  // ==================== HANDLE INPUT CHANGES ====================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (['linkedin', 'github', 'instagram'].includes(name)) {
      setFormData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [name]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePresidentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPresidentFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleChiefChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setChiefFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDirectorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDirectorFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfessorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (['linkedin', 'github', 'instagram'].includes(name)) {
      setProfessorFormData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [name]: value } }));
    } else {
      setProfessorFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGalleryFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAlumniChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (['linkedin', 'github', 'instagram'].includes(name)) {
      setAlumniFormData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [name]: value } }));
    } else {
      setAlumniFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNoticeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNoticeFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleResultChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResultFormData(prev => ({ ...prev, [name]: value }));
  };

  // ==================== OPEN MODAL FUNCTIONS ====================

  const openModal = (member: any = null) => {
    if (member) {
      setEditingId(member._id || member.id);
      setFormData({
        name: member.name || '',
        role: member.role || '',
        description: member.description || '',
        image: member.image || '',
        imageFile: null,
        email: member.email || '',
        socialLinks: {
          linkedin: member.socialLinks?.linkedin || '',
          github: member.socialLinks?.github || '',
          instagram: member.socialLinks?.instagram || '',
        },
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        role: '',
        description: '',
        image: '',
        imageFile: null,
        email: '',
        socialLinks: { linkedin: '', github: '', instagram: '' },
      });
    }
    setIsModalOpen(true);
  };

  const openPresidentModal = (msg: any = null) => {
    if (msg) {
      setEditingPresidentId(msg._id || msg.id);
      setPresidentFormData({
        name: msg.name || '',
        description: msg.description || '',
        image: msg.image || '',
        imageFile: null,
      });
    } else {
      setEditingPresidentId(null);
      setPresidentFormData({ name: '', description: '', image: '', imageFile: null });
    }
    setIsPresidentModalOpen(true);
  };

  const openChiefModal = (msg: any = null) => {
    if (msg) {
      setEditingChiefId(msg._id || msg.id);
      setChiefFormData({
        name: msg.name || '',
        description: msg.description || '',
        image: msg.image || '',
        imageFile: null,
      });
    } else {
      setEditingChiefId(null);
      setChiefFormData({ name: '', description: '', image: '', imageFile: null });
    }
    setIsChiefModalOpen(true);
  };

  const openDirectorModal = (msg: any = null) => {
    if (msg) {
      setEditingDirectorId(msg._id || msg.id);
      setDirectorFormData({
        name: msg.name || '',
        description: msg.description || '',
        image: msg.image || '',
        imageFile: null,
      });
    } else {
      setEditingDirectorId(null);
      setDirectorFormData({ name: '', description: '', image: '', imageFile: null });
    }
    setIsDirectorModalOpen(true);
  };

  const openProfessorModal = (professor: any = null) => {
    if (professor) {
      setEditingProfessorId(professor._id || professor.id);
      setProfessorFormData({
        name: professor.name || '',
        role: professor.role || '',
        description: professor.description || '',
        image: professor.image || '',
        imageFile: null,
        email: professor.email || '',
        socialLinks: {
          linkedin: professor.socialLinks?.linkedin || '',
          github: professor.socialLinks?.github || '',
          instagram: professor.socialLinks?.instagram || '',
        },
      });
    } else {
      setEditingProfessorId(null);
      setProfessorFormData({
        name: '',
        role: '',
        description: '',
        image: '',
        imageFile: null,
        email: '',
        socialLinks: { linkedin: '', github: '', instagram: '' },
      });
    }
    setIsProfessorModalOpen(true);
  };

  const openEventModal = (event: any = null) => {
    if (event) {
      setEditingEventId(event._id || event.id);
      setEventFormData({
        title: event.title || '',
        description: event.description || '',
        image: event.image || '',
        imageFile: null,
        location: event.location || '',
        date: event.date || '',
      });
    } else {
      setEditingEventId(null);
      setEventFormData({ title: '', description: '', image: '', imageFile: null, location: '', date: '' });
    }
    setIsEventModalOpen(true);
  };

  const openGalleryModal = (img: any = null) => {
    if (img) {
      setEditingGalleryId(img._id || img.id);
      setGalleryFormData({ image: img.image || '', imageFile: null });
    } else {
      setEditingGalleryId(null);
      setGalleryFormData({ image: '', imageFile: null });
    }
    setIsGalleryModalOpen(true);
  };

  const openAlumniModal = (alumni: any = null) => {
    if (alumni) {
      setEditingAlumniId(alumni._id || alumni.id);
      setAlumniFormData({
        name: alumni.name || '',
        pastRole: alumni.pastRole || '',
        description: alumni.description || '',
        image: alumni.image || '',
        imageFile: null,
        email: alumni.email || '',
        batch: alumni.batch || '',
        socialLinks: {
          linkedin: alumni.socialLinks?.linkedin || '',
          github: alumni.socialLinks?.github || '',
          instagram: alumni.socialLinks?.instagram || '',
        },
      });
    } else {
      setEditingAlumniId(null);
      setAlumniFormData({
        name: '',
        pastRole: '',
        description: '',
        image: '',
        imageFile: null,
        email: '',
        batch: selectedBatch || '',
        socialLinks: { linkedin: '', github: '', instagram: '' },
      });
    }
    setIsAlumniModalOpen(true);
  };

  const openNoticeModal = (notice: any = null) => {
    if (notice) {
      setEditingNoticeId(notice._id || notice.id);
      setNoticeFormData({
        title: notice.title || '',
        description: notice.description || '',
        date: notice.date ? notice.date.substring(0, 10) : '',
        image: notice.image || '',
        imageFile: null,
      });
    } else {
      setEditingNoticeId(null);
      setNoticeFormData({ title: '', description: '', date: '', image: '', imageFile: null });
    }
    setIsNoticeModalOpen(true);
  };

  const openResultModal = (result: any = null) => {
    if (result) {
      setEditingResultId(result._id || result.id);
      setResultFormData({
        title: result.title || '',
        description: result.description || '',
        image: result.image || '',
        imageFile: null,
        date: result.date ? result.date.substring(0, 10) : '',
      });
    } else {
      setEditingResultId(null);
      setResultFormData({ title: '', description: '', image: '', imageFile: null, date: '' });
    }
    setIsResultModalOpen(true);
  };

  // ==================== SUBMIT FUNCTIONS ====================

  // Submit BOD Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingBod) return;
    setIsSubmittingBod(true);

    try {
      let imageUrl = formData.image || '';

      if (formData.imageFile) {
        imageUrl = await uploadToCloudinary(formData.imageFile);
      }

      const url = editingId ? `${API_BASE}/bod/${editingId}` : `${API_BASE}/bod`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          role: formData.role,
          description: formData.description,
          email: formData.email,
          image: imageUrl,
          socialLinks: formData.socialLinks,
        }),
      });

      const json = await res.json();
      if (json.success) {
        await fetchBodMembers();
        setIsModalOpen(false);
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err: any) {
      console.error('Error saving BOD member:', err);
      alert(err.message || 'Something went wrong connecting to the server.');
    } finally {
      setIsSubmittingBod(false);
    }
  };

  // Submit President Message Form
  const handlePresidentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingPresident) return;
    setIsSubmittingPresident(true);

    try {
      let imageUrl = presidentFormData.image || '';

      if (presidentFormData.imageFile) {
        imageUrl = await uploadToCloudinary(presidentFormData.imageFile);
      }

      const url = editingPresidentId
        ? `${API_BASE}/president-message/${editingPresidentId}`
        : `${API_BASE}/president-message`;
      const method = editingPresidentId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: presidentFormData.name,
          description: presidentFormData.description,
          image: imageUrl,
        }),
      });

      const json = await res.json();
      if (json.success) {
        await fetchPresidentMessages();
        setIsPresidentModalOpen(false);
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err: any) {
      console.error('Error saving President Message:', err);
      alert(err.message || 'Something went wrong connecting to the server.');
    } finally {
      setIsSubmittingPresident(false);
    }
  };

  // Submit Chief Message Form
  const handleChiefSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingChief) return;
    setIsSubmittingChief(true);

    try {
      let imageUrl = chiefFormData.image || '';

      if (chiefFormData.imageFile) {
        imageUrl = await uploadToCloudinary(chiefFormData.imageFile);
      }

      const url = editingChiefId
        ? `${API_BASE}/chief-message/${editingChiefId}`
        : `${API_BASE}/chief-message`;
      const method = editingChiefId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: chiefFormData.name,
          description: chiefFormData.description,
          image: imageUrl,
        }),
      });

      const json = await res.json();
      if (json.success) {
        await fetchChiefMessages();
        setIsChiefModalOpen(false);
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err: any) {
      console.error('Error saving Chief Message:', err);
      alert(err.message || 'Something went wrong connecting to the server.');
    } finally {
      setIsSubmittingChief(false);
    }
  };

  // Submit Director Message Form
  const handleDirectorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingDirector) return;
    setIsSubmittingDirector(true);

    try {
      let imageUrl = directorFormData.image || '';

      if (directorFormData.imageFile) {
        imageUrl = await uploadToCloudinary(directorFormData.imageFile);
      }

      const url = editingDirectorId
        ? `${API_BASE}/director-message/${editingDirectorId}`
        : `${API_BASE}/director-message`;
      const method = editingDirectorId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: directorFormData.name,
          description: directorFormData.description,
          image: imageUrl,
        }),
      });

      const json = await res.json();
      if (json.success) {
        await fetchDirectorMessages();
        setIsDirectorModalOpen(false);
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err: any) {
      console.error('Error saving Director Message:', err);
      alert(err.message || 'Something went wrong connecting to the server.');
    } finally {
      setIsSubmittingDirector(false);
    }
  };

  // Submit Professor Form
  const handleProfessorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingProfessor) return;
    setIsSubmittingProfessor(true);

    try {
      let imageUrl = professorFormData.image || '';

      if (professorFormData.imageFile) {
        imageUrl = await uploadToCloudinary(professorFormData.imageFile);
      }

      const url = editingProfessorId ? `${API_BASE}/professor/${editingProfessorId}` : `${API_BASE}/professor`;
      const method = editingProfessorId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: professorFormData.name,
          role: professorFormData.role,
          description: professorFormData.description,
          email: professorFormData.email,
          image: imageUrl,
          socialLinks: professorFormData.socialLinks,
        }),
      });

      const json = await res.json();
      if (json.success) {
        await fetchProfessors();
        setIsProfessorModalOpen(false);
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err: any) {
      console.error('Error saving Professor record:', err);
      alert(err.message || 'Something went wrong connecting to the server.');
    } finally {
      setIsSubmittingProfessor(false);
    }
  };

  // Submit Event Form
  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingEvent) return;
    setIsSubmittingEvent(true);

    try {
      let imageUrl = eventFormData.image || '';

      if (eventFormData.imageFile) {
        imageUrl = await uploadToCloudinary(eventFormData.imageFile);
      }

      const url = editingEventId ? `${API_BASE}/events/${editingEventId}` : `${API_BASE}/events`;
      const method = editingEventId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: eventFormData.title,
          description: eventFormData.description,
          location: eventFormData.location,
          date: eventFormData.date,
          image: imageUrl,
        }),
      });

      const json = await res.json();
      if (json.success) {
        await fetchEvents();
        setIsEventModalOpen(false);
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err: any) {
      console.error('Error saving Event record:', err);
      alert(err.message || 'Something went wrong connecting to the server.');
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  // Submit Gallery Form
  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingGallery) return;
    setIsSubmittingGallery(true);

    try {
      let imageUrl = galleryFormData.image || '';

      if (galleryFormData.imageFile) {
        imageUrl = await uploadToCloudinary(galleryFormData.imageFile);
      }

      if (!imageUrl) {
        alert('Please select an image to upload.');
        setIsSubmittingGallery(false);
        return;
      }

      const url = editingGalleryId ? `${API_BASE}/images/${editingGalleryId}` : `${API_BASE}/images`;
      const method = editingGalleryId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageUrl }),
      });

      const json = await res.json();
      if (json.success) {
        await fetchGalleryImages();
        setIsGalleryModalOpen(false);
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err: any) {
      console.error('Error saving Gallery image:', err);
      alert(err.message || 'Something went wrong connecting to the server.');
    } finally {
      setIsSubmittingGallery(false);
    }
  };

  // Submit Alumni Form
  const handleAlumniSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingAlumni) return;
    setIsSubmittingAlumni(true);

    try {
      let imageUrl = alumniFormData.image || '';

      if (alumniFormData.imageFile) {
        imageUrl = await uploadToCloudinary(alumniFormData.imageFile);
      }

      const url = editingAlumniId ? `${API_BASE}/alumni/${editingAlumniId}` : `${API_BASE}/alumni`;
      const method = editingAlumniId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: alumniFormData.name,
          pastRole: alumniFormData.pastRole,
          description: alumniFormData.description,
          email: alumniFormData.email,
          batch: alumniFormData.batch,
          image: imageUrl,
          socialLinks: alumniFormData.socialLinks,
        }),
      });

      const json = await res.json();
      if (json.success) {
        await fetchAlumni();
        setIsAlumniModalOpen(false);
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err: any) {
      console.error('Error saving Alumni record:', err);
      alert(err.message || 'Something went wrong connecting to the server.');
    } finally {
      setIsSubmittingAlumni(false);
    }
  };

  // Submit Notice Form
  const handleNoticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingNotice) return;
    setIsSubmittingNotice(true);

    try {
      let imageUrl = noticeFormData.image || '';

      if (noticeFormData.imageFile) {
        imageUrl = await uploadToCloudinary(noticeFormData.imageFile);
      }

      const url = editingNoticeId ? `${API_BASE}/notices/${editingNoticeId}` : `${API_BASE}/notices`;
      const method = editingNoticeId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: noticeFormData.title,
          description: noticeFormData.description,
          date: noticeFormData.date,
          image: imageUrl,
        }),
      });

      const json = await res.json();
      if (json.success) {
        await fetchNotices();
        setIsNoticeModalOpen(false);
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      alert(err.message || 'Something went wrong connecting to the server.');
    } finally {
      setIsSubmittingNotice(false);
    }
  };

  // Submit Result Form
  const handleResultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingResult) return;
    setIsSubmittingResult(true);

    try {
      let imageUrl = resultFormData.image || '';

      if (resultFormData.imageFile) {
        imageUrl = await uploadToCloudinary(resultFormData.imageFile);
      }

      const url = editingResultId ? `${API_BASE}/results/${editingResultId}` : `${API_BASE}/results`;
      const method = editingResultId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: resultFormData.title,
          description: resultFormData.description,
          date: resultFormData.date,
          image: imageUrl,
        }),
      });

      const json = await res.json();
      if (json.success) {
        await fetchResults();
        setIsResultModalOpen(false);
      } else {
        alert(json.message || 'Operation failed');
      }
    } catch (err: any) {
      console.error('Error saving Result record:', err);
      alert(err.message || 'Something went wrong connecting to the server.');
    } finally {
      setIsSubmittingResult(false);
    }
  };

  // ==================== DELETE FUNCTIONS ====================

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this BOD member?')) return;
    try {
      const res = await fetch(`${API_BASE}/bod/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setBodMembers(prev => prev.filter(m => (m._id || m.id) !== id));
      } else {
        alert(json.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting BOD member:', err);
    }
  };

  const handlePresidentDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`${API_BASE}/president-message/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setPresidentMessages(prev => prev.filter(m => (m._id || m.id) !== id));
      } else {
        alert(json.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting President message:', err);
    }
  };

  const handleChiefDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`${API_BASE}/chief-message/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setChiefMessages(prev => prev.filter(m => (m._id || m.id) !== id));
      } else {
        alert(json.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting Chief message:', err);
    }
  };

  const handleDirectorDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`${API_BASE}/director-message/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setDirectorMessages(prev => prev.filter(m => (m._id || m.id) !== id));
      } else {
        alert(json.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting Director message:', err);
    }
  };

  const handleProfessorDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this professor?')) return;
    try {
      const res = await fetch(`${API_BASE}/professor/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setProfessors(prev => prev.filter(p => (p._id || p.id) !== id));
      } else {
        alert(json.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting professor record:', err);
    }
  };

  const handleEventDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch(`${API_BASE}/events/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setEvents(prev => prev.filter(ev => (ev._id || ev.id) !== id));
      } else {
        alert(json.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting event record:', err);
    }
  };

  const handleGalleryDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      const res = await fetch(`${API_BASE}/images/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setGalleryImages(prev => prev.filter(img => (img._id || img.id) !== id));
      } else {
        alert(json.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting gallery image:', err);
    }
  };

  const handleAlumniDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this alumni record?')) return;
    try {
      const res = await fetch(`${API_BASE}/alumni/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setAlumniList(prev => prev.filter(a => (a._id || a.id) !== id));
      } else {
        alert(json.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting alumni record:', err);
    }
  };

  const handleNoticeDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    try {
      const res = await fetch(`${API_BASE}/notices/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setNotices(prev => prev.filter(n => (n._id || n.id) !== id));
      } else {
        alert(json.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting notice record:', err);
    }
  };

  const handleResultDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this result?')) return;
    try {
      const res = await fetch(`${API_BASE}/results/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setResults(prev => prev.filter(r => (r._id || r.id) !== id));
      } else {
        alert(json.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting result record:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    router.push('/login');
  };

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 font-medium">Checking authorization...</p>
      </div>
    );
  }

  const displayEvents = [...events].reverse();
  const displayGalleryImages = [...galleryImages].reverse();
  const displayNotices = [...notices].reverse();
  const displayResults = [...results].reverse();

  const alumniBatches = Array.from(
    new Set(alumniList.map((a) => a.batch || 'Unspecified'))
  ).sort((a, b) => b.localeCompare(a));

  const getAlumniCountForBatch = (batch: string) =>
    alumniList.filter((a) => (a.batch || 'Unspecified') === batch).length;

  const alumniInSelectedBatch = selectedBatch
    ? [...alumniList].filter((a) => (a.batch || 'Unspecified') === selectedBatch).reverse()
    : [];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
          <LayoutDashboard className="text-primary" size={24} />
          <span className="font-bold text-lg text-gray-900">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => setActiveTab('bod')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'bod' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users size={18} />
            <span>BOD Management</span>
          </button>
          <button
            onClick={() => setActiveTab('president')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'president' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MessageSquareText size={18} />
            <span>President Message</span>
          </button>
          <button
            onClick={() => setActiveTab('chief')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'chief' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <UserCog size={18} />
            <span>Chief Message</span>
          </button>
          <button
            onClick={() => setActiveTab('director')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'director' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Briefcase size={18} />
            <span>Director Message</span>
          </button>
          <button
            onClick={() => setActiveTab('professor')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'professor' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BookUser size={18} />
            <span>Professor Management</span>
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'events' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Calendar size={18} />
            <span>Events Management</span>
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'gallery' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ImageIcon size={18} />
            <span>Gallery Management</span>
          </button>
          <button
            onClick={() => { setActiveTab('alumni'); setSelectedBatch(null); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'alumni' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <GraduationCap size={18} />
            <span>Alumni Management</span>
          </button>
          <button
            onClick={() => setActiveTab('notice')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'notice' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Bell size={18} />
            <span>Notice Management</span>
          </button>
          <button
            onClick={() => setActiveTab('result')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'result' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Award size={18} />
            <span>Result Management</span>
          </button>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
 
{storageAlert?.show && (
  <div className="mb-6 flex items-start justify-between gap-4 rounded-2xl border border-amber-300 bg-amber-50 p-4">
    <div className="flex items-start gap-3">
      <Bell size={20} className="mt-0.5 text-amber-600 flex-shrink-0" />
      <div>
        <p className="font-semibold text-amber-800">Storage Alert ({storageAlert.percentUsed}% used)</p>
        <p className="text-sm text-amber-700">{storageAlert.message}</p>
      </div>
    </div>
    <button
      onClick={() => setStorageAlert(null)}
      className="p-1 text-amber-600 hover:bg-amber-100 rounded-full flex-shrink-0"
    >
      <X size={16} />
    </button>
  </div>
)}

        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {adminId}!</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </header>

        {activeTab === 'bod' ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Board of Directors (BOD) Members</h2>
              <button
                onClick={() => openModal()}
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Plus size={18} />
                <span>Add Member</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-gray-500">Loading members...</div>
              ) : bodMembers.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No BOD members found. Click "Add Member" to create one.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="p-4">Member</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Email</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                      {bodMembers.map((member) => {
                        const memberId = member._id || member.id;
                        return (
                          <tr key={memberId} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                {member.image ? (
                                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-500">👤</div>
                                )}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{member.name}</p>
                                <p className="text-xs text-gray-500 truncate max-w-xs">{member.description}</p>
                              </div>
                            </td>
                            <td className="p-4 text-gray-700 font-medium">{member.role}</td>
                            <td className="p-4 text-gray-600">{member.email || 'N/A'}</td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => openModal(member)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(memberId)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : activeTab === 'president' ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">President Message Management</h2>
              <button
                onClick={() => openPresidentModal()}
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Plus size={18} />
                <span>Add Message</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {presidentMessages.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No President Message found. Click "Add Message" to create one.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="p-4">President</th>
                        <th className="p-4">Description</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                      {presidentMessages.map((msg) => {
                        const msgId = msg._id || msg.id;
                        return (
                          <tr key={msgId} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                {msg.image ? (
                                  <img src={msg.image} alt={msg.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-500">👑</div>
                                )}
                              </div>
                              <p className="font-semibold text-gray-900">{msg.name}</p>
                            </td>
                            <td className="p-4 text-gray-600 truncate max-w-md">{msg.description}</td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => openPresidentModal(msg)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handlePresidentDelete(msgId)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : activeTab === 'chief' ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Chief Message Management</h2>
              <button
                onClick={() => openChiefModal()}
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Plus size={18} />
                <span>Add Message</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {chiefMessages.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No Chief Message found. Click "Add Message" to create one.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="p-4">Chief</th>
                        <th className="p-4">Description</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                      {chiefMessages.map((msg) => {
                        const msgId = msg._id || msg.id;
                        return (
                          <tr key={msgId} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                {msg.image ? (
                                  <img src={msg.image} alt={msg.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-500">🧑‍💼</div>
                                )}
                              </div>
                              <p className="font-semibold text-gray-900">{msg.name}</p>
                            </td>
                            <td className="p-4 text-gray-600 truncate max-w-md">{msg.description}</td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => openChiefModal(msg)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleChiefDelete(msgId)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : activeTab === 'director' ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Director Message Management</h2>
              <button
                onClick={() => openDirectorModal()}
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Plus size={18} />
                <span>Add Message</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {directorMessages.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No Director Message found. Click "Add Message" to create one.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="p-4">Director</th>
                        <th className="p-4">Description</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                      {directorMessages.map((msg) => {
                        const msgId = msg._id || msg.id;
                        return (
                          <tr key={msgId} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                {msg.image ? (
                                  <img src={msg.image} alt={msg.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-500">🧑‍💼</div>
                                )}
                              </div>
                              <p className="font-semibold text-gray-900">{msg.name}</p>
                            </td>
                            <td className="p-4 text-gray-600 truncate max-w-md">{msg.description}</td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => openDirectorModal(msg)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDirectorDelete(msgId)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : activeTab === 'professor' ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Professor Management</h2>
              <button
                onClick={() => openProfessorModal()}
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Plus size={18} />
                <span>Add Professor</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {professors.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No professors found. Click "Add Professor" to create one.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="p-4">Professor</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Email</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                      {professors.map((professor) => {
                        const professorId = professor._id || professor.id;
                        return (
                          <tr key={professorId} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                {professor.image ? (
                                  <img src={professor.image} alt={professor.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-500">🎓</div>
                                )}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{professor.name}</p>
                                <p className="text-xs text-gray-500 truncate max-w-xs">{professor.description}</p>
                              </div>
                            </td>
                            <td className="p-4 text-gray-700 font-medium">{professor.role}</td>
                            <td className="p-4 text-gray-600">{professor.email || 'N/A'}</td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => openProfessorModal(professor)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleProfessorDelete(professorId)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : activeTab === 'events' ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Events Management</h2>
              <button
                onClick={() => openEventModal()}
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Plus size={18} />
                <span>Add Event</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {displayEvents.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No events found. Click "Add Event" to create one.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="p-4">Event</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Date</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                      {displayEvents.map((ev) => {
                        const eventId = ev._id || ev.id;
                        return (
                          <tr key={eventId} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                                {ev.image ? (
                                  <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-500">📅</div>
                                )}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{ev.title}</p>
                                <p className="text-xs text-gray-500 truncate max-w-xs">{ev.description}</p>
                              </div>
                            </td>
                            <td className="p-4 text-gray-700">{ev.location || 'N/A'}</td>
                            <td className="p-4 text-gray-600">{ev.date || 'N/A'}</td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => openEventModal(ev)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleEventDelete(eventId)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : activeTab === 'gallery' ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Gallery Management</h2>
              <button
                onClick={() => openGalleryModal()}
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Plus size={18} />
                <span>Add Image</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {displayGalleryImages.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No images found. Click "Add Image" to create one.</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
                  {displayGalleryImages.map((img) => {
                    const imgId = img._id || img.id;
                    return (
                      <div key={imgId} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                        <div className="h-40 w-full bg-gray-200">
                          {img.image ? (
                            <img src={img.image} alt="Gallery" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl">🖼️</div>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                          <button
                            onClick={() => openGalleryModal(img)}
                            className="p-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleGalleryDelete(imgId)}
                            className="p-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : activeTab === 'alumni' ? (
          <>
            {selectedBatch === null ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Alumni Management — Batches</h2>
                  <button
                    onClick={() => openAlumniModal()}
                    className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    <Plus size={18} />
                    <span>Add Alumni</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  {alumniBatches.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No alumni found. Click "Add Alumni" to create one.</div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
                      {alumniBatches.map((batch) => (
                        <button
                          key={batch}
                          onClick={() => setSelectedBatch(batch)}
                          className="flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-emerald-50 hover:border-primary transition-colors group"
                        >
                          <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                            <Folder size={26} />
                          </div>
                          <p className="font-bold text-gray-900 text-lg">{batch}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {getAlumniCountForBatch(batch)} {getAlumniCountForBatch(batch) === 1 ? 'Alumni' : 'Alumni'}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setSelectedBatch(null)}
                      className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      title="Back to batches"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <h2 className="text-xl font-bold text-gray-800">Batch {selectedBatch} — Alumni</h2>
                  </div>
                  <button
                    onClick={() => openAlumniModal()}
                    className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    <Plus size={18} />
                    <span>Add Alumni</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  {alumniInSelectedBatch.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No alumni found in this batch.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <th className="p-4">Alumni</th>
                            <th className="p-4">Past Position</th>
                            <th className="p-4">Email</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-sm">
                          {alumniInSelectedBatch.map((alumni) => {
                            const alumniId = alumni._id || alumni.id;
                            return (
                              <tr key={alumniId} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 flex items-center space-x-3">
                                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                    {alumni.image ? (
                                      <img src={alumni.image} alt={alumni.name} className="w-full h-full object-cover" />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-gray-500">🎓</div>
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-900">{alumni.name}</p>
                                    <p className="text-xs text-gray-500 truncate max-w-xs">{alumni.description}</p>
                                  </div>
                                </td>
                                <td className="p-4 text-gray-700 font-medium">{alumni.pastRole || 'N/A'}</td>
                                <td className="p-4 text-gray-600">{alumni.email || 'N/A'}</td>
                                <td className="p-4 text-right space-x-2">
                                  <button
                                    onClick={() => openAlumniModal(alumni)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center"
                                    title="Edit"
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleAlumniDelete(alumniId)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                                    title="Delete"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        ) : activeTab === 'notice' ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Notice Management</h2>
              <button
                onClick={() => openNoticeModal()}
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Plus size={18} />
                <span>Add Notice</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {displayNotices.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No notices found. Click "Add Notice" to create one.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="p-4">Title</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Date</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                      {displayNotices.map((notice) => {
                        const noticeId = notice._id || notice.id;
                        return (
                          <tr key={noticeId} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0 overflow-hidden">
                                {notice.image ? (
                                  <img src={notice.image} alt={notice.title} className="w-full h-full object-cover" />
                                ) : (
                                  <span>🔔</span>
                                )}
                              </div>
                              <p className="font-semibold text-gray-900">{notice.title}</p>
                            </td>
                            <td className="p-4 text-gray-600 truncate max-w-md">{notice.description}</td>
                            <td className="p-4 text-gray-600">{notice.date ? notice.date.split('T')[0] : 'N/A'}</td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => openNoticeModal(notice)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleNoticeDelete(noticeId)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Result Management</h2>
              <button
                onClick={() => openResultModal()}
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Plus size={18} />
                <span>Add Result</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {displayResults.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No results found. Click "Add Result" to create one.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="p-4">Result</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Date</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                      {displayResults.map((result) => {
                        const resultId = result._id || result.id;
                        return (
                          <tr key={resultId} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                                {result.image ? (
                                  <img src={result.image} alt={result.title} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-500">🏆</div>
                                )}
                              </div>
                              <p className="font-semibold text-gray-900">{result.title}</p>
                            </td>
                            <td className="p-4 text-gray-600 truncate max-w-md">{result.description}</td>
                            <td className="p-4 text-gray-600">
                              {result.date ? new Date(result.date).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => openResultModal(result)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleResultDelete(resultId)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* ==================== Create / Edit BOD Modal ==================== */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
              <button
                onClick={() => !isSubmittingBod && setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full bg-gray-100"
                disabled={isSubmittingBod}
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {editingId ? 'Edit BOD Member' : 'Add New BOD Member'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Full Name"
                    disabled={isSubmittingBod}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Role / Position</label>
                  <input
                    type="text"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. Vice President"
                    disabled={isSubmittingBod}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Email Address"
                    disabled={isSubmittingBod}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Member Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFormData(prev => ({ ...prev, imageFile: e.target.files![0] }));
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    disabled={isSubmittingBod}
                  />
                  {formData.image && !formData.imageFile && (
                    <div className="mt-2 h-20 w-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={formData.image} alt="Current" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Short bio or description..."
                    disabled={isSubmittingBod}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">LinkedIn</label>
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.socialLinks.linkedin}
                      onChange={handleChange}
                      className="w-full px-2 py-2 border border-gray-200 rounded-xl text-xs"
                      placeholder="URL"
                      disabled={isSubmittingBod}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">GitHub</label>
                    <input
                      type="text"
                      name="github"
                      value={formData.socialLinks.github}
                      onChange={handleChange}
                      className="w-full px-2 py-2 border border-gray-200 rounded-xl text-xs"
                      placeholder="URL"
                      disabled={isSubmittingBod}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Instagram</label>
                    <input
                      type="text"
                      name="instagram"
                      value={formData.socialLinks.instagram}
                      onChange={handleChange}
                      className="w-full px-2 py-2 border border-gray-200 rounded-xl text-xs"
                      placeholder="URL"
                      disabled={isSubmittingBod}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmittingBod}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2 min-w-[120px] justify-center"
                    disabled={isSubmittingBod}
                  >
                    {isSubmittingBod ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{editingId ? 'Updating...' : 'Saving...'}</span>
                      </>
                    ) : (
                      <span>{editingId ? 'Update Member' : 'Save Member'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================== Create / Edit President Message Modal ==================== */}
        {isPresidentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
              <button
                onClick={() => !isSubmittingPresident && setIsPresidentModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full bg-gray-100"
                disabled={isSubmittingPresident}
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {editingPresidentId ? 'Edit President Message' : 'Add President Message'}
              </h3>

              <form onSubmit={handlePresidentSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">President Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={presidentFormData.name}
                    onChange={handlePresidentChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Full Name"
                    disabled={isSubmittingPresident}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">President Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setPresidentFormData(prev => ({ ...prev, imageFile: e.target.files![0] }));
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    disabled={isSubmittingPresident}
                  />
                  {presidentFormData.image && !presidentFormData.imageFile && (
                    <div className="mt-2 h-20 w-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={presidentFormData.image} alt="Current" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Description / Message</label>
                  <textarea
                    name="description"
                    rows={5}
                    required
                    value={presidentFormData.description}
                    onChange={handlePresidentChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter president's message..."
                    disabled={isSubmittingPresident}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsPresidentModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmittingPresident}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2 min-w-[120px] justify-center"
                    disabled={isSubmittingPresident}
                  >
                    {isSubmittingPresident ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{editingPresidentId ? 'Updating...' : 'Saving...'}</span>
                      </>
                    ) : (
                      <span>{editingPresidentId ? 'Update Message' : 'Save Message'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================== Create / Edit Chief Message Modal ==================== */}
        {isChiefModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
              <button
                onClick={() => !isSubmittingChief && setIsChiefModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full bg-gray-100"
                disabled={isSubmittingChief}
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {editingChiefId ? 'Edit Chief Message' : 'Add Chief Message'}
              </h3>

              <form onSubmit={handleChiefSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Chief Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={chiefFormData.name}
                    onChange={handleChiefChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Full Name"
                    disabled={isSubmittingChief}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Chief Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setChiefFormData(prev => ({ ...prev, imageFile: e.target.files![0] }));
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    disabled={isSubmittingChief}
                  />
                  {chiefFormData.image && !chiefFormData.imageFile && (
                    <div className="mt-2 h-20 w-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={chiefFormData.image} alt="Current" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Description / Message</label>
                  <textarea
                    name="description"
                    rows={5}
                    required
                    value={chiefFormData.description}
                    onChange={handleChiefChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter chief's message..."
                    disabled={isSubmittingChief}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsChiefModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmittingChief}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2 min-w-[120px] justify-center"
                    disabled={isSubmittingChief}
                  >
                    {isSubmittingChief ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{editingChiefId ? 'Updating...' : 'Saving...'}</span>
                      </>
                    ) : (
                      <span>{editingChiefId ? 'Update Message' : 'Save Message'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================== Create / Edit Director Message Modal ==================== */}
        {isDirectorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
              <button
                onClick={() => !isSubmittingDirector && setIsDirectorModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full bg-gray-100"
                disabled={isSubmittingDirector}
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {editingDirectorId ? 'Edit Director Message' : 'Add Director Message'}
              </h3>

              <form onSubmit={handleDirectorSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Director Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={directorFormData.name}
                    onChange={handleDirectorChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Full Name"
                    disabled={isSubmittingDirector}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Director Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setDirectorFormData(prev => ({ ...prev, imageFile: e.target.files![0] }));
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    disabled={isSubmittingDirector}
                  />
                  {directorFormData.image && !directorFormData.imageFile && (
                    <div className="mt-2 h-20 w-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={directorFormData.image} alt="Current" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Description / Message</label>
                  <textarea
                    name="description"
                    rows={5}
                    required
                    value={directorFormData.description}
                    onChange={handleDirectorChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter director's message..."
                    disabled={isSubmittingDirector}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsDirectorModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmittingDirector}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2 min-w-[120px] justify-center"
                    disabled={isSubmittingDirector}
                  >
                    {isSubmittingDirector ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{editingDirectorId ? 'Updating...' : 'Saving...'}</span>
                      </>
                    ) : (
                      <span>{editingDirectorId ? 'Update Message' : 'Save Message'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================== Create / Edit Professor Modal ==================== */}
        {isProfessorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
              <button
                onClick={() => !isSubmittingProfessor && setIsProfessorModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full bg-gray-100"
                disabled={isSubmittingProfessor}
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {editingProfessorId ? 'Edit Professor' : 'Add New Professor'}
              </h3>

              <form onSubmit={handleProfessorSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={professorFormData.name}
                    onChange={handleProfessorChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Full Name"
                    disabled={isSubmittingProfessor}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Role / Position</label>
                  <input
                    type="text"
                    name="role"
                    required
                    value={professorFormData.role}
                    onChange={handleProfessorChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. Assistant Professor"
                    disabled={isSubmittingProfessor}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={professorFormData.email}
                    onChange={handleProfessorChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Email Address"
                    disabled={isSubmittingProfessor}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Professor Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setProfessorFormData(prev => ({ ...prev, imageFile: e.target.files![0] }));
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    disabled={isSubmittingProfessor}
                  />
                  {professorFormData.image && !professorFormData.imageFile && (
                    <div className="mt-2 h-20 w-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={professorFormData.image} alt="Current" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    value={professorFormData.description}
                    onChange={handleProfessorChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Short bio or description..."
                    disabled={isSubmittingProfessor}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">LinkedIn</label>
                    <input
                      type="text"
                      name="linkedin"
                      value={professorFormData.socialLinks.linkedin}
                      onChange={handleProfessorChange}
                      className="w-full px-2 py-2 border border-gray-200 rounded-xl text-xs"
                      placeholder="URL"
                      disabled={isSubmittingProfessor}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">GitHub</label>
                    <input
                      type="text"
                      name="github"
                      value={professorFormData.socialLinks.github}
                      onChange={handleProfessorChange}
                      className="w-full px-2 py-2 border border-gray-200 rounded-xl text-xs"
                      placeholder="URL"
                      disabled={isSubmittingProfessor}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Instagram</label>
                    <input
                      type="text"
                      name="instagram"
                      value={professorFormData.socialLinks.instagram}
                      onChange={handleProfessorChange}
                      className="w-full px-2 py-2 border border-gray-200 rounded-xl text-xs"
                      placeholder="URL"
                      disabled={isSubmittingProfessor}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsProfessorModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmittingProfessor}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2 min-w-[120px] justify-center"
                    disabled={isSubmittingProfessor}
                  >
                    {isSubmittingProfessor ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{editingProfessorId ? 'Updating...' : 'Saving...'}</span>
                      </>
                    ) : (
                      <span>{editingProfessorId ? 'Update Professor' : 'Save Professor'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================== Create / Edit Event Modal ==================== */}
        {isEventModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
              <button
                onClick={() => !isSubmittingEvent && setIsEventModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full bg-gray-100"
                disabled={isSubmittingEvent}
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {editingEventId ? 'Edit Event' : 'Add New Event'}
              </h3>

              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Event Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={eventFormData.title}
                    onChange={handleEventChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Event Title"
                    disabled={isSubmittingEvent}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={eventFormData.location}
                    onChange={handleEventChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Event Location"
                    disabled={isSubmittingEvent}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Date</label>
                  <input
                    type="text"
                    name="date"
                    value={eventFormData.date}
                    onChange={handleEventChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. Oct 15, 2026"
                    disabled={isSubmittingEvent}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Event Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setEventFormData(prev => ({ ...prev, imageFile: e.target.files![0] }));
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    disabled={isSubmittingEvent}
                  />
                  {eventFormData.image && !eventFormData.imageFile && (
                    <div className="mt-2 h-20 w-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={eventFormData.image} alt="Current" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows={4}
                    value={eventFormData.description}
                    onChange={handleEventChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Event description..."
                    disabled={isSubmittingEvent}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEventModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmittingEvent}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2 min-w-[120px] justify-center"
                    disabled={isSubmittingEvent}
                  >
                    {isSubmittingEvent ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{editingEventId ? 'Updating...' : 'Saving...'}</span>
                      </>
                    ) : (
                      <span>{editingEventId ? 'Update Event' : 'Save Event'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================== Create / Edit Gallery Modal ==================== */}
        {isGalleryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
              <button
                onClick={() => !isSubmittingGallery && setIsGalleryModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full bg-gray-100"
                disabled={isSubmittingGallery}
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {editingGalleryId ? 'Edit Gallery Image' : 'Add New Gallery Image'}
              </h3>

              <form onSubmit={handleGallerySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Gallery Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setGalleryFormData(prev => ({ ...prev, imageFile: e.target.files![0] }));
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    disabled={isSubmittingGallery}
                  />
                </div>

                {(galleryFormData.image || galleryFormData.imageFile) && (
                  <div className="h-40 w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={galleryFormData.imageFile ? URL.createObjectURL(galleryFormData.imageFile) : galleryFormData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsGalleryModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmittingGallery}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2 min-w-[120px] justify-center"
                    disabled={isSubmittingGallery}
                  >
                    {isSubmittingGallery ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{editingGalleryId ? 'Updating...' : 'Saving...'}</span>
                      </>
                    ) : (
                      <span>{editingGalleryId ? 'Update Image' : 'Save Image'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================== Create / Edit Alumni Modal ==================== */}
        {isAlumniModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
              <button
                onClick={() => !isSubmittingAlumni && setIsAlumniModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full bg-gray-100"
                disabled={isSubmittingAlumni}
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {editingAlumniId ? 'Edit Alumni' : 'Add New Alumni'}
              </h3>

              <form onSubmit={handleAlumniSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={alumniFormData.name}
                    onChange={handleAlumniChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Full Name"
                    disabled={isSubmittingAlumni}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Batch (Year)</label>
                  <input
                    type="text"
                    name="batch"
                    required
                    value={alumniFormData.batch}
                    onChange={handleAlumniChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. 2024, 2025, 2026"
                    disabled={isSubmittingAlumni}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Past Role</label>
                  <input
                    type="text"
                    name="pastRole"
                    required
                    value={alumniFormData.pastRole}
                    onChange={handleAlumniChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. Former President"
                    disabled={isSubmittingAlumni}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={alumniFormData.email}
                    onChange={handleAlumniChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Email Address"
                    disabled={isSubmittingAlumni}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Alumni Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setAlumniFormData(prev => ({ ...prev, imageFile: e.target.files![0] }));
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    disabled={isSubmittingAlumni}
                  />
                  {alumniFormData.image && !alumniFormData.imageFile && (
                    <div className="mt-2 h-20 w-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={alumniFormData.image} alt="Current" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    value={alumniFormData.description}
                    onChange={handleAlumniChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Short bio or description..."
                    disabled={isSubmittingAlumni}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">LinkedIn</label>
                    <input
                      type="text"
                      name="linkedin"
                      value={alumniFormData.socialLinks.linkedin}
                      onChange={handleAlumniChange}
                      className="w-full px-2 py-2 border border-gray-200 rounded-xl text-xs"
                      placeholder="URL"
                      disabled={isSubmittingAlumni}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">GitHub</label>
                    <input
                      type="text"
                      name="github"
                      value={alumniFormData.socialLinks.github}
                      onChange={handleAlumniChange}
                      className="w-full px-2 py-2 border border-gray-200 rounded-xl text-xs"
                      placeholder="URL"
                      disabled={isSubmittingAlumni}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Instagram</label>
                    <input
                      type="text"
                      name="instagram"
                      value={alumniFormData.socialLinks.instagram}
                      onChange={handleAlumniChange}
                      className="w-full px-2 py-2 border border-gray-200 rounded-xl text-xs"
                      placeholder="URL"
                      disabled={isSubmittingAlumni}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAlumniModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmittingAlumni}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2 min-w-[120px] justify-center"
                    disabled={isSubmittingAlumni}
                  >
                    {isSubmittingAlumni ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{editingAlumniId ? 'Updating...' : 'Saving...'}</span>
                      </>
                    ) : (
                      <span>{editingAlumniId ? 'Update Alumni' : 'Save Alumni'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================== Create / Edit Notice Modal ==================== */}
        {isNoticeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
              <button
                onClick={() => !isSubmittingNotice && setIsNoticeModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full bg-gray-100"
                disabled={isSubmittingNotice}
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {editingNoticeId ? 'Edit Notice' : 'Add New Notice'}
              </h3>

              <form onSubmit={handleNoticeSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Notice Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={noticeFormData.title || ''}
                    onChange={handleNoticeChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Notice Title"
                    disabled={isSubmittingNotice}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={noticeFormData.date || ''}
                    onChange={handleNoticeChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    disabled={isSubmittingNotice}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Notice Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setNoticeFormData(prev => ({ ...prev, imageFile: e.target.files![0] }));
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    disabled={isSubmittingNotice}
                  />
                  {noticeFormData.image && !noticeFormData.imageFile && (
                    <div className="mt-2 h-20 w-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={noticeFormData.image} alt="Current" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows={5}
                    required
                    value={noticeFormData.description || ''}
                    onChange={handleNoticeChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter notice details..."
                    disabled={isSubmittingNotice}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsNoticeModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmittingNotice}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2 min-w-[120px] justify-center"
                    disabled={isSubmittingNotice}
                  >
                    {isSubmittingNotice ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{editingNoticeId ? 'Updating...' : 'Saving...'}</span>
                      </>
                    ) : (
                      <span>{editingNoticeId ? 'Update Notice' : 'Save Notice'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================== Create / Edit Result Modal ==================== */}
        {isResultModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
              <button
                onClick={() => !isSubmittingResult && setIsResultModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full bg-gray-100"
                disabled={isSubmittingResult}
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {editingResultId ? 'Edit Result' : 'Add New Result'}
              </h3>

              <form onSubmit={handleResultSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Result Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={resultFormData.title}
                    onChange={handleResultChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Result Title"
                    disabled={isSubmittingResult}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={resultFormData.date}
                    onChange={handleResultChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    disabled={isSubmittingResult}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Result Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setResultFormData(prev => ({ ...prev, imageFile: e.target.files![0] }));
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    disabled={isSubmittingResult}
                  />
                  {resultFormData.image && !resultFormData.imageFile && (
                    <div className="mt-2 h-20 w-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={resultFormData.image} alt="Current" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows={4}
                    value={resultFormData.description}
                    onChange={handleResultChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Result description..."
                    disabled={isSubmittingResult}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsResultModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmittingResult}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2 min-w-[120px] justify-center"
                    disabled={isSubmittingResult}
                  >
                    {isSubmittingResult ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{editingResultId ? 'Updating...' : 'Saving...'}</span>
                      </>
                    ) : (
                      <span>{editingResultId ? 'Update Result' : 'Save Result'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}