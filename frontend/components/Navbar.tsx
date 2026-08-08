'use client';

import { useEffect, useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string, isPage: boolean = false) => {
    setIsMobileMenuOpen(false);

    if (isPage) {
      // Navigate to separate pages
      router.push(`/${id}`);
      return;
    }

    // If we are not on the home page, go to home first, then scroll
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
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
            <span className={`font-bold text-lg transition-colors ${isScrolled ? 'text-primary' : 'text-white'} group-hover:text-primary hidden sm:inline`}>
              BBA BUMC
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id, link.isPage)}
                className={`relative text-sm font-medium transition-all duration-200 py-1 group ${
                  isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-primary-foreground'
                }`}
              >
                {link.label}
                {/* Subtle animated underline on hover */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}

            {/* Desktop Login Button */}
            <Link
              href="/login"
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm ${
                isScrolled 
                  ? 'bg-primary text-white hover:bg-primary/90' 
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              <LogIn size={16} />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'hover:bg-gray-100 text-gray-800' : 'hover:bg-white/10 text-white'}`}
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
  );
}