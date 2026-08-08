'use client';

import { Menu, X, LogIn, Target, Eye, Zap, Linkedin, Github, Instagram } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';

export default function ClubPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // State for Team Section
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [teamError, setTeamError] = useState('');

  // State for President Message Section
  const [presidentData, setPresidentData] = useState<any>(null);
  const [presidentLoading, setPresidentLoading] = useState(true);

  // Fetch Team Members
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch('https://bba-student-club.onrender.com/api/bod');
        const data = await res.json();
        if (data.success) {
          setTeamMembers(data.data);
        } else {
          setTeamError('Failed to load team data.');
        }
      } catch (err) {
        console.error('Failed to fetch team members:', err);
        setTeamError('Something went wrong while fetching data.');
      } finally {
        setTeamLoading(false);
      }
    };
    fetchTeam();
  }, []);

  // Fetch President Message
  useEffect(() => {
    const fetchPresidentMessage = async () => {
      try {
        const res = await fetch('https://bba-student-club.onrender.com/api/president-message');
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setPresidentData(json.data[0]);
        }
      } catch (err) {
        console.error('Failed to fetch president message:', err);
      } finally {
        setPresidentLoading(false);
      }
    };
    fetchPresidentMessage();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (id: string, isPage: boolean = false) => {
    setIsMobileMenuOpen(false);

    if (isPage) {
      router.push(`/${id}`);
      return;
    }

    if (pathname !== '/') {
      router.push(`/${id === 'home' ? '' : '#' + id}`);
    } else {
      scrollToSection(id);
    }
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Club', id: 'club', isPage: true },
    { label: 'Notices', id: 'notices', isPage: true },
    { label: 'Results', id: 'results', isPage: true },
    { label: 'Alumni', id: 'alumni', isPage: true },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Past Events', id: 'events' },
  ];

  const milestones = [
    {
      year: 'Founded',
      title: 'BBA Student Club Established',
      description: 'BBA Student Club BUMC was established as a non-profit, non-political organization dedicated to the welfare and development of BBA students.'
    },
    {
      year: 'Growth',
      title: 'Community Expansion',
      description: 'The club grew steadily with active engagement of students, organizing workshops and networking events for BBA students.'
    },
    {
      year: 'Development',
      title: 'Professional Programs',
      description: 'Introduced professional development programs, guest lectures from industry experts, and career counseling sessions.'
    },
    {
      year: 'Recognition',
      title: 'Active Community Hub',
      description: 'Became the leading student organization at Butwal Multiple Campus with 427+ active members and followers.'
    },
    {
      year: '2024',
      title: 'Digital Presence',
      description: 'Strengthened digital presence with active social media engagement and online community building initiatives.'
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between pt-16">
      {/* Non-Transparent Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/Butwal-Multiple-Campus.jpg" alt="BBA Student Club" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-lg text-primary group-hover:text-primary hidden sm:inline">
                Butwal Multiple Campus BBA
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id, link.isPage)}
                  className="relative text-sm font-medium transition-all duration-200 py-1 group text-gray-700 hover:text-primary"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}

              {/* Desktop Login Button */}
              <Link
                href="/login"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm bg-primary text-white hover:bg-primary/90"
              >
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-b border-gray-100 shadow-xl rounded-b-2xl animate-in slide-in-from-top-2 duration-200">
              <div className="px-4 pt-3 pb-4 space-y-1.5">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id, link.isPage)}
                    className="block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-150"
                  >
                    {link.label}
                  </button>
                ))}

                {/* Mobile Login Button */}
                <div className="pt-2 border-t border-gray-100 mt-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-all duration-150 shadow-sm"
                  >
                    <LogIn size={16} />
                    <span>Login</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Sections */}
      <div className="flex-grow">
        {/* 1. Hero Section */}
        <section
          id="home"
          className="relative min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#EAE3DA] px-4"
        >
          {/* Soft ambient light effects for cream/white background */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-100/60 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-12">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-2 leading-tight">
              BBA BUTWAL MULTIPLE CAMPUS
            </h1>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-emerald-600 mb-6 leading-tight">
              BBA STUDENT CLUB
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              A non-profit, non-political community of BBA students dedicated to personal growth, professional development, and meaningful connections. Together, we build excellence and create lasting memories.
            </p>
            <button
              onClick={() => scrollToSection('about')}
              className="inline-block px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25 cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </section>

        {/* 2. About Section */}
        <section id="about" className="py-20 bg-[#F4EFEA] px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">About BBA Student Club BUMC</h2>
              <div className="w-24 h-1 bg-emerald-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  BBA Student Club BUMC is a non-profit, non-political organization established for the welfare and development of BBA (Bachelor of Business Administration) students at Butwal Multiple Campus in Golpark, Butwal, Nepal.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our community is dedicated to fostering professional growth, academic excellence, and meaningful relationships among our members. We organize various activities, workshops, and events to enhance the educational experience and career prospects of our students.
                </p>
                <p className="text-base text-gray-600 mb-8">
                  <strong>Location:</strong> Golpark, Butwal, Nepal<br />
                  <strong>Contact:</strong> +977 974-8704821<br />
                  <strong>Members:</strong> 427+ followers
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#FAF8F5] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#EAE3DA]">
                    <Target className="w-8 h-8 text-emerald-600 mb-2" />
                    <h3 className="font-semibold text-sm text-gray-900">Welfare</h3>
                  </div>
                  <div className="bg-[#FAF8F5] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#EAE3DA]">
                    <Eye className="w-8 h-8 text-emerald-600 mb-2" />
                    <h3 className="font-semibold text-sm text-gray-900">Development</h3>
                  </div>
                  <div className="bg-[#FAF8F5] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#EAE3DA]">
                    <Zap className="w-8 h-8 text-emerald-600 mb-2" />
                    <h3 className="font-semibold text-sm text-gray-900">Excellence</h3>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-full flex items-center justify-center shadow-2xl overflow-hidden animate-[spin_6s_linear_infinite]">
                  <img src="/bba-logo.jpg" alt="BBA Student Club Logo" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. History Section */}
        <section id="history" className="py-20 bg-[#FAF8F5] px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <div className="w-24 h-1 bg-emerald-600 mx-auto rounded-full"></div>
              <p className="text-lg text-gray-600 mt-4">The history and growth of BBA Student Club BUMC</p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-600 opacity-20"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <div className="bg-[#F4EFEA] p-6 rounded-lg border border-[#EAE3DA] hover:shadow-lg transition-shadow">
                        <h3 className="text-2xl font-bold text-emerald-600 mb-2">{milestone.title}</h3>
                        <p className="text-sm text-gray-500 mb-2 font-semibold">{milestone.year}</p>
                        <p className="text-gray-700">{milestone.description}</p>
                      </div>
                    </div>

                    <div className="w-0 flex justify-center">
                      <div className="w-5 h-5 bg-[#FAF8F5] border-4 border-emerald-600 rounded-full relative z-10"></div>
                    </div>

                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Leadership Team Section */}
        <section id="team" className="py-20 bg-[#F4EFEA] px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Leadership Team</h2>
              <div className="w-24 h-1 bg-emerald-600 mx-auto rounded-full"></div>
              <p className="text-lg text-gray-600 mt-4">
                Meet the dedicated team members leading BBA Student Club BUMC
              </p>
            </div>

            {teamLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              </div>
            )}
            {teamError && <p className="text-center text-red-500 font-medium">{teamError}</p>}

            {!teamLoading && !teamError && (
              <div className="flex flex-wrap justify-center gap-8">
                {teamMembers.map((member) => (
                  <div
                    key={member._id}
                    className="bg-[#FAF8F5] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#EAE3DA] group flex flex-col w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] max-w-sm"
                  >
                    <div className="h-56 flex items-center justify-center overflow-hidden relative bg-[#EAE3DA]/50">
                      {member.image && member.image.includes('/') ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                          {member.image || '👨‍💼'}
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-100/60 rounded-full border border-emerald-200 shadow-sm">
                          {member.role}
                        </span>
                      </div>
                      
                      {member.email && (
                        <div className="mb-3">
                          <a
                            href={`mailto:${member.email}?subject=Inquiry%20regarding%20BBA%20Student%20Club&body=Hi%20${encodeURIComponent(member.name)},%0D%0A%0D%0AI would like to connect with you regarding...`}
                            className="text-xs font-medium text-emerald-600 hover:underline break-all"
                          >
                            {member.email}
                          </a>
                        </div>
                      )}

                      <p className="text-sm text-gray-600 mb-6 flex-grow">{member.description}</p>

                      <div className="flex space-x-3 mt-auto">
                        {member.socialLinks?.linkedin && (
                          <a
                            href={member.socialLinks.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-[#EAE3DA]/60 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors"
                            title="LinkedIn Profile"
                          >
                            <Linkedin size={18} />
                          </a>
                        )}
                        {member.socialLinks?.github && (
                          <a
                            href={member.socialLinks.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-[#EAE3DA]/60 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors"
                            title="GitHub Profile"
                          >
                            <Github size={18} />
                          </a>
                        )}
                        {member.socialLinks?.instagram && (
                          <a
                            href={member.socialLinks.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-[#EAE3DA]/60 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors"
                            title="Instagram Profile"
                          >
                            <Instagram size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 5. President Message Section */}
        <section id="president" className="py-20 bg-[#FAF8F5] px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Message from Our President
              </h2>
              <div className="w-24 h-1 bg-emerald-600 mx-auto rounded-full"></div>
            </div>

            {presidentLoading ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 italic">Loading president details...</p>
              </div>
            ) : presidentData ? (
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col items-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden bg-[#EAE3DA]">
                    {presidentData.image ? (
                      <img
                        src={presidentData.image}
                        alt={presidentData.name || 'Club President'}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-6xl">👤</div>
                    )}
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-gray-900 text-center">
                    {presidentData.name}
                  </h3>
                  <p className="text-emerald-600 font-semibold text-sm">Club President</p>
                </div>

                <div>
                  <blockquote className="border-l-4 border-emerald-600 pl-6">
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed italic whitespace-pre-line">
                      &quot;{presidentData.description}&quot;
                    </p>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">
                        BBA Student Club
                      </p>
                      <p className="text-emerald-600 font-semibold">Butwal Multiple Campus</p>
                    </div>
                  </blockquote>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-red-500">No president message found in the database.</p>
              </div>
            )}

            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-[#F4EFEA] rounded-lg border border-[#EAE3DA] hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">🎓</div>
                <h3 className="font-bold text-gray-900 mb-2">Professional Growth</h3>
                <p className="text-sm text-gray-600">Developing skills and knowledge for successful careers</p>
              </div>
              <div className="text-center p-6 bg-[#F4EFEA] rounded-lg border border-[#EAE3DA] hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="font-bold text-gray-900 mb-2">Community</h3>
                <p className="text-sm text-gray-600">Building meaningful connections and lasting friendships</p>
              </div>
              <div className="text-center p-6 bg-[#F4EFEA] rounded-lg border border-[#EAE3DA] hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">✨</div>
                <h3 className="font-bold text-gray-900 mb-2">Welfare</h3>
                <p className="text-sm text-gray-600">Ensuring the wellbeing and success of all members</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}