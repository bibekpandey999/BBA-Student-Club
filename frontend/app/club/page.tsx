'use client';

import { Menu, X, LogIn, Users, Award, Target } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import Footer from '@/components/Footer';

export default function ClubPage() {
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
    { label: 'Club', id: 'club', isPage: true },
    { label: 'History', id: 'history' },
    { label: 'Our Team', id: 'team' },
    { label: 'President Message', id: 'president' },
    { label: 'Notices', id: 'notices', isPage: true },
    { label: 'Results', id: 'results', isPage: true },
    { label: 'Alumni', id: 'alumni', isPage: true },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Past Events', id: 'events' },
  ];

  return (
    <main className="min-h-screen bg-white flex flex-col justify-between">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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

            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id, link.isPage)}
                  className={`relative text-sm font-medium py-1 group transition-all duration-200 ${
                    link.id === 'club' ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${link.id === 'club' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
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
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-800 transition-colors"
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

      {/* Club Page Content */}
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">About Our Club</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Empowering future business leaders through collaboration, skill development, and real-world experiences.
            </p>
          </div>

          {/* Grid Information Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To foster leadership, analytical thinking, and professional networking among BBA students by bridging academic theory with practical application.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Vibrant Community</h3>
              <p className="text-gray-600 leading-relaxed">
                A tight-knit ecosystem of driven students, experienced alumni, and dedicated faculty mentors working together toward shared success.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Core Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Excellence, Integrity, Innovation, and Teamwork guide every workshop, seminar, and event we organize throughout the academic year.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}