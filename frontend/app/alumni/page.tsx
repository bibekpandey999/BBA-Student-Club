'use client';

import { useEffect, useState } from 'react';
import { Menu, X, LogIn, Linkedin, Github, Facebook, Instagram, ArrowLeft, Mail, Phone, MapPin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Footer from '@/components/Footer';

export default function AlumniPage() {
  const [alumniMembers, setAlumniMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

  // Navbar states & hooks
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (id: string, isPage: boolean = false) => {
    setIsMobileMenuOpen(false);

    if (isPage) {
      router.push(`/${id}`);
      return;
    }

    if (pathname !== '/') {
      router.push(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
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

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await fetch('https://bba-student-club.onrender.com/api/alumni');
        const data = await res.json();

        if (data.success) {
          setAlumniMembers(data.data);
        } else {
          setError('Failed to load alumni data.');
        }
      } catch (err) {
        console.error('Failed to fetch alumni members:', err);
        setError('Something went wrong while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  // Group alumni by batch (newest batch first)
  const alumniBatches = Array.from(
    new Set(alumniMembers.map((a) => a.batch || 'Unspecified'))
  ).sort((a, b) => b.localeCompare(a));

  const getAlumniCountForBatch = (batch: string) =>
    alumniMembers.filter((a) => (a.batch || 'Unspecified') === batch).length;

  const alumniInSelectedBatch = selectedBatch
    ? alumniMembers.filter((a) => (a.batch || 'Unspecified') === selectedBatch)
    : [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar - Fixed solid background */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/Butwal-Multiple-Campus.jpg" alt="BBA Student Club" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-lg text-primary group-hover:text-primary/80 hidden sm:inline">
                Butwal Multiple Campus BBA
              </span>
            </button>

            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id, link.isPage)}
                  className="relative text-sm font-medium transition-all duration-200 py-1 text-gray-700 hover:text-primary group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}

              <Link
                href="/login"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-all duration-200 shadow-sm"
              >
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            </div>

            <button
              className="md:hidden p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

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

      {/* Main Content */}
      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Our Alumni</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            <p className="text-lg text-foreground/70 mt-4">
              Honoring past leadership and members of BBA Student Club BUMC
            </p>
          </div>

          {/* Loading & Error States */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}
          {error && <p className="text-center text-red-500 font-medium">{error}</p>}

          {/* Alumni Layout */}
          {!loading && !error && (
            <>
              {selectedBatch === null ? (
                /* ---------- Batch Selection View ---------- */
                <div className="flex flex-wrap justify-center gap-6">
                  {alumniBatches.length === 0 ? (
                    <p className="text-center text-foreground/60">No alumni records found.</p>
                  ) : (
                    alumniBatches.map((batch) => (
                      <button
                        key={batch}
                        onClick={() => setSelectedBatch(batch)}
                        className="flex flex-col items-center justify-center p-12 w-65 rounded-2xl border border-border bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                      >
                        <div className="w-20 h-20 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 text-2xl font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                          🎓
                        </div>
                        <p className="font-bold text-foreground text-xl">{batch} Batch</p>
                        <p className="text-sm text-foreground/60 mt-1">
                          {getAlumniCountForBatch(batch)}{' '}
                          {getAlumniCountForBatch(batch) === 1 ? 'Alumni' : 'Alumni'}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              ) : (
                /* ---------- Selected Batch Detail View ---------- */
                <div>
                  <div className="flex items-center space-x-3 mb-10">
                    <button
                      onClick={() => setSelectedBatch(null)}
                      className="p-2 rounded-lg bg-secondary text-foreground hover:bg-primary hover:text-white transition-colors"
                      title="Back to batches"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <h3 className="text-2xl font-bold text-foreground">
                      Batch {selectedBatch}
                    </h3>
                  </div>

                  <div className="flex flex-wrap justify-center gap-8">
                    {alumniInSelectedBatch.map((alumni) => (
                      <div
                        key={alumni._id}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border group flex flex-col w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] max-w-sm"
                      >
                        {/* Image area */}
                        <div className="h-56 flex items-center justify-center overflow-hidden relative bg-gray-100">
                          {alumni.image && alumni.image.includes('/') ? (
                            <img
                              src={alumni.image}
                              alt={alumni.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                              {alumni.image || '🎓'}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-xl font-bold text-foreground mb-1">{alumni.name}</h3>

                          {/* Highlighted Past Role Badge */}
                          <div className="mb-2">
                            <span className="inline-block px-3 py-1 text-xs font-bold text-primary bg-primary/10 rounded-full border border-primary/25 shadow-sm">
                              {alumni.pastRole}
                            </span>
                          </div>

                          {/* Clickable Email Text */}
                          {alumni.email && (
                            <div className="mb-3">
                              <a
                                href={`mailto:${alumni.email}?subject=Inquiry%20regarding%20BBA%20Student%20Club&body=Hi%20${encodeURIComponent(alumni.name)},%0D%0A%0D%0AI would like to connect with you regarding...`}
                                className="text-xs font-medium text-primary hover:underline break-all"
                              >
                                {alumni.email}
                              </a>
                            </div>
                          )}

                          <p className="text-sm text-foreground/70 mb-6 flex-grow">{alumni.description}</p>

                          {/* Social icons */}
                          <div className="flex space-x-3 mt-auto">
                            {alumni.socialLinks?.linkedin && (
                              <a
                                href={alumni.socialLinks.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 bg-secondary rounded-lg hover:bg-primary hover:text-white transition-colors"
                                title="LinkedIn Profile"
                              >
                                <Linkedin size={18} />
                              </a>
                            )}

                            {alumni.socialLinks?.github && (
                              <a
                                href={alumni.socialLinks.github}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 bg-secondary rounded-lg hover:bg-primary hover:text-white transition-colors"
                                title="GitHub Profile"
                              >
                                <Github size={18} />
                              </a>
                            )}

                            {alumni.socialLinks?.instagram && (
                              <a
                                href={alumni.socialLinks.instagram}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 bg-secondary rounded-lg hover:bg-primary hover:text-white transition-colors"
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
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}