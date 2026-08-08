'use client';

import { Menu, X, LogIn, Target, Eye, Zap, Linkedin, Github, Instagram, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

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
    <main className="min-h-screen bg-white flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <div className="flex-grow">
        
        {/* 1. Modern Refined Hero Section with Gorgeous Gradient/Mesh Background */}
        <section
          id="home"
          className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-emerald-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8"
        >
          {/* Abstract decorative grid and glowing light elements */}
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/15 rounded-full blur-[110px] pointer-events-none"></div>
          <div className="absolute top-20 left-10 w-80 h-80 bg-green-600/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md shadow-inner">
              <Sparkles size={15} />
              <span>Butwal Multiple Campus • Golpark, Butwal</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 tracking-tight">
              BBA BUTWAL MULTIPLE CAMPUS
            </h1>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-500 bg-clip-text text-transparent">
                BBA STUDENT CLUB
              </span>
            </h2>

            <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              A non-profit, non-political community of BBA students dedicated to personal growth, professional development, and meaningful connections. Together, we build excellence and create lasting memories.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => scrollToSection('about')}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl shadow-emerald-500/20 cursor-pointer group"
              >
                <span>Learn More</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => scrollToSection('team')}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-md cursor-pointer"
              >
                <span>Meet Leadership</span>
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-16 pt-10 border-t border-white/10 max-w-2xl mx-auto">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-emerald-400">427+</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Active Community</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-emerald-400">100%</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Non-Political</p>
              </div>
              <div className="text-center col-span-2 sm:col-span-1">
                <p className="text-2xl sm:text-3xl font-bold text-emerald-400">BUMC</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Butwal, Nepal</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. About Section */}
        <section id="about" className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">About BBA Student Club BUMC</h2>
              <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  BBA Student Club BUMC is a non-profit, non-political organization established for the welfare and development of BBA (Bachelor of Business Administration) students at Butwal Multiple Campus in Golpark, Butwal, Nepal.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our community is dedicated to fostering professional growth, academic excellence, and meaningful relationships among our members. We organize various activities, workshops, and events to enhance the educational experience and career prospects of our students.
                </p>
                
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2 mb-8">
                  <p className="text-sm text-gray-700 flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">Location:</span> 
                    <span>Golpark, Butwal, Nepal</span>
                  </p>
                  <p className="text-sm text-gray-700 flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">Contact:</span> 
                    <span>+977 974-8704821</span>
                  </p>
                  <p className="text-sm text-gray-700 flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">Members:</span> 
                    <span>427+ followers</span>
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 text-center">
                    <Target className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-xs text-gray-900">Welfare</h3>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 text-center">
                    <Eye className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-xs text-gray-900">Development</h3>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 text-center">
                    <Zap className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-xs text-gray-900">Excellence</h3>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-3xl p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden flex items-center justify-center">
                    <img src="/bba-logo.jpg" alt="BBA Student Club Logo" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. History Section */}
        <section id="history" className="py-24 bg-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Our Journey</h2>
              <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full"></div>
              <p className="text-base text-gray-600 mt-4">The history and growth of BBA Student Club BUMC</p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-emerald-200 hidden md:block"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 font-semibold text-xs rounded-full mb-2">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>

                    <div className="hidden md:flex w-0 justify-center relative">
                      <div className="w-4 h-4 bg-white border-4 border-emerald-500 rounded-full shadow-md z-10"></div>
                    </div>

                    <div className="w-full md:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Leadership Team Section */}
        <section id="team" className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Leadership Team</h2>
              <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full"></div>
              <p className="text-base text-gray-600 mt-4">
                Meet the dedicated team members leading BBA Student Club BUMC
              </p>
            </div>

            {teamLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
              </div>
            )}
            {teamError && <p className="text-center text-red-500 font-medium">{teamError}</p>}

            {!teamLoading && !teamError && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                  <div
                    key={member._id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col group"
                  >
                    <div className="h-60 flex items-center justify-center overflow-hidden relative bg-gray-100">
                      {member.image && member.image.includes('/') ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
                          {member.image || '👨‍💼'}
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
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

                      <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">{member.description}</p>

                      <div className="flex space-x-3 mt-auto pt-4 border-t border-gray-100">
                        {member.socialLinks?.linkedin && (
                          <a
                            href={member.socialLinks.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-gray-100 rounded-xl hover:bg-emerald-600 hover:text-white transition-colors text-gray-600"
                            title="LinkedIn Profile"
                          >
                            <Linkedin size={16} />
                          </a>
                        )}
                        {member.socialLinks?.github && (
                          <a
                            href={member.socialLinks.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-gray-100 rounded-xl hover:bg-emerald-600 hover:text-white transition-colors text-gray-600"
                            title="GitHub Profile"
                          >
                            <Github size={16} />
                          </a>
                        )}
                        {member.socialLinks?.instagram && (
                          <a
                            href={member.socialLinks.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-gray-100 rounded-xl hover:bg-emerald-600 hover:text-white transition-colors text-gray-600"
                            title="Instagram Profile"
                          >
                            <Instagram size={16} />
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
        <section id="president" className="py-24 bg-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Message from Our President
              </h2>
              <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full"></div>
            </div>

            {presidentLoading ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 italic">Loading president details...</p>
              </div>
            ) : presidentData ? (
              <div className="grid md:grid-cols-12 gap-10 items-center bg-gray-50 p-8 sm:p-10 rounded-3xl border border-gray-200">
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl shadow-md overflow-hidden bg-gray-200 mb-4">
                    {presidentData.image ? (
                      <img
                        src={presidentData.image}
                        alt={presidentData.name || 'Club President'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-6xl flex items-center justify-center h-full">👤</div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 text-center">
                    {presidentData.name}
                  </h3>
                  <p className="text-emerald-600 font-semibold text-xs mt-0.5">Club President</p>
                </div>

                <div className="md:col-span-7">
                  <blockquote className="border-l-4 border-emerald-500 pl-4 sm:pl-6">
                    <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed italic">
                      &quot;{presidentData.description}&quot;
                    </p>
                    <div>
                      <p className="font-bold text-gray-900">
                        BBA Student Club
                      </p>
                      <p className="text-emerald-600 text-sm font-medium">Butwal Multiple Campus</p>
                    </div>
                  </blockquote>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-red-500">No president message found in the database.</p>
              </div>
            )}

            <div className="mt-16 grid sm:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="text-3xl mb-2">🎓</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Professional Growth</h3>
                <p className="text-xs text-gray-600">Developing skills and knowledge for successful careers</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="text-3xl mb-2">🤝</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Community</h3>
                <p className="text-xs text-gray-600">Building meaningful connections and lasting friendships</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="text-3xl mb-2">✨</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Welfare</h3>
                <p className="text-xs text-gray-600">Ensuring the wellbeing and success of all members</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}