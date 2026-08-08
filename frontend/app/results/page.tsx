'use client';

import { Calendar, X, Menu, LogIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';

export default function ResultsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState<any>(null);

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
    { label: 'About Us', id: 'about' },
    { label: 'History', id: 'history' },
    { label: 'Our Team', id: 'team' },
    { label: 'President Message', id: 'president' },
    { label: 'Notices', id: 'notices', isPage: true },
    { label: 'Results', id: 'results', isPage: true },
    { label: 'Alumni', id: 'alumni', isPage: true },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Past Events', id: 'events' },
  ];

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/results');
        const json = await res.json();
        if (json.success) {
          setResults(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // Reverse order so the most recently added result shows first
  const displayResults = [...results].reverse();

  // Helper function to format the date nicely
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col justify-between">
      {/* Navbar integrated directly inline */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/bba-logo.jpg" alt="BBA Student Club" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-lg text-primary group-hover:opacity-90 hidden sm:inline">
                BBA BUMC
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id, link.isPage)}
                  className="relative text-sm font-medium text-gray-700 hover:text-primary py-1 group transition-all duration-200"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}

              {/* Desktop Login Button */}
              <Link
                href="/login"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-all duration-200 shadow-sm"
              >
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-800 transition-colors"
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

      {/* Main results content wrapper with top padding so it doesn't overlap fixed navbar */}
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Latest Results</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            <p className="text-lg text-foreground/70 mt-4">
              Check out the latest exam results, competition scores, and performance updates
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/70 italic">Loading results...</p>
            </div>
          ) : displayResults.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/70">No results found in the database.</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-8">
              {displayResults.map((result) => {
                const isImagePath = result.image && result.image.startsWith('/');
                const isEmoji = result.image && !result.image.startsWith('/') && result.image.length <= 4;

                return (
                  <div
                    key={result._id || result.id}
                    className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-border flex flex-col justify-between w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] max-w-sm"
                  >
                    <div>
                      {/* Result image */}
                      <div className="h-48 flex items-center justify-center overflow-hidden relative group bg-gray-100">
                        {isImagePath ? (
                          <Image
                            src={result.image}
                            alt={result.title}
                            fill
                            className="object-cover"
                          />
                        ) : isEmoji ? (
                          <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                            {result.image}
                          </div>
                        ) : result.image ? (
                          <img
                            src={result.image}
                            alt={result.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-6xl">🏆</div>
                        )}
                      </div>

                      {/* Result content */}
                      <div className="p-6">
                        {result.date && (
                          <div className="flex items-center text-xs font-medium text-primary mb-2 uppercase tracking-wide">
                            <Calendar size={14} className="mr-1.5 flex-shrink-0" />
                            <span>{formatDate(result.date)}</span>
                          </div>
                        )}

                        <h3 className="text-xl font-bold text-foreground mb-3">{result.title}</h3>

                        <p className="text-sm text-foreground/70 mb-6 leading-relaxed line-clamp-3">
                          {result.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <button
                        onClick={() => setSelectedResult(result)}
                        className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Full Details Modal */}
          {selectedResult && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
              <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8">
                <button
                  onClick={() => setSelectedResult(null)}
                  className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800 rounded-full bg-gray-100 cursor-pointer"
                >
                  <X size={20} />
                </button>

                {selectedResult.date && (
                  <div className="flex items-center text-xs font-semibold text-primary mb-2 uppercase tracking-wide">
                    <Calendar size={14} className="mr-1.5" />
                    <span>{formatDate(selectedResult.date)}</span>
                  </div>
                )}

                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {selectedResult.title}
                </h2>

                {selectedResult.image && (
                  <div className="h-64 sm:h-80 w-full relative mb-6 rounded-lg overflow-hidden bg-gray-100">
                    {selectedResult.image.startsWith('/') ? (
                      <Image
                        src={selectedResult.image}
                        alt={selectedResult.title}
                        fill
                        className="object-cover"
                      />
                    ) : selectedResult.image.length <= 4 ? (
                      <div className="text-9xl h-full flex items-center justify-center">
                        {selectedResult.image}
                      </div>
                    ) : (
                      <img
                        src={selectedResult.image}
                        alt={selectedResult.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                )}

                <div className="text-foreground/80 leading-relaxed space-y-4 whitespace-pre-line text-base">
                  {selectedResult.description}
                </div>

                <div className="mt-8 text-right">
                  <button
                    onClick={() => setSelectedResult(null)}
                    className="py-2 px-6 bg-gray-200 text-foreground font-semibold rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer included at the bottom */}
      <Footer />
    </main>
  );
}