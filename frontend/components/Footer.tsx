'use client';

import { Mail, Phone, MapPin, Linkedin, Facebook ,Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-white">
      {/* Main footer */}
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/bba-logo.jpg" alt="BBA Student Club" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-xl">BBA BUMC</span>
            </div>
            <p className="text-white/80 text-sm">Empowering BBA students through professional development, networking, and community welfare initiatives.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('team')} className="hover:text-white transition-colors">
                  Our Team
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('events')} className="hover:text-white transition-colors">
                  Events
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-center space-x-3">
                <Phone size={16} />
                <span>+977 974-8704821</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin size={16} />
                <span>Golpark, Butwal, Nepal</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} />
                <span>BUMC</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/bbastudentclubbumc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/bbastudentclubbumc/" target="_blank" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
     <div className="border-t border-white/20 px-4 sm:px-6 lg:px-8 py-8">
  <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-white/80 gap-4 sm:gap-0">
    <p>&copy; {currentYear} BBA Student Club BUMC. All rights reserved.</p>
    
    <div className="text-center font-medium">
      Sponsored by <span className="font-bold text-white text-lg">CornorTech</span>
    </div>

    <div className="flex space-x-6">
      <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
      <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
      <a href="#" className="hover:text-white transition-colors">Contact</a>
    </div>
  </div>
</div>
    </footer>
  );
}
