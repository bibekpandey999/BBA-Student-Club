'use client';

import { useEffect, useState } from 'react';
import { Linkedin, Github, Instagram } from 'lucide-react';

export default function Professors() {
  const [professors, setProfessors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const res = await fetch('https://bba-student-club.onrender.com/api/professor');
        const data = await res.json();
        
        if (data.success) {
          setProfessors(data.data);
        } else {
          setError('Failed to load professor data.');
        }
      } catch (err) {
        console.error('Failed to fetch professors:', err);
        setError('Something went wrong while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  return (
    <section id="professors" className="py-20 bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Our Professors At Butwal Multiple Campus BBA</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-lg text-foreground/70 mt-4">
            Meet our expert faculty dedicated to shaping future business leaders.
          </p>
        </div>

        {/* Loading & Error States */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
        {error && <p className="text-center text-red-500 font-medium">{error}</p>}

        {/* Layout: Uses Flexbox with justify-center to keep cards aligned nicely */}
        {!loading && !error && (
          <div className="flex flex-wrap justify-center gap-8">
            {professors.map((professor) => (
              <div
                key={professor._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border group flex flex-col w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] max-w-sm"
              >
                {/* Image area */}
                <div className="h-56 flex items-center justify-center overflow-hidden relative bg-gray-100">
                  {professor.image && professor.image.includes('/') ? (
                    <img
                      src={professor.image}
                      alt={professor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                      {professor.image || '👨‍🏫'}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-foreground mb-1">{professor.name}</h3>
                  
                  {/* Highlighted Role / Designation Badge */}
                  {professor.role && (
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 text-xs font-bold text-primary bg-primary/10 rounded-full border border-primary/25 shadow-sm">
                        {professor.role}
                      </span>
                    </div>
                  )}
                  
                  {/* Clickable Email Text */}
                  {professor.email && (
                    <div className="mb-3">
                      <a
                        href={`mailto:${professor.email}?subject=Inquiry%20regarding%20BBA%20Program&body=Dear%20${encodeURIComponent(professor.name)},%0D%0A%0D%0AI would like to connect with you regarding...`}
                        className="text-xs font-medium text-primary hover:underline break-all"
                      >
                        {professor.email}
                      </a>
                    </div>
                  )}

                  <p className="text-sm text-foreground/70 mb-6 flex-grow">{professor.description}</p>

                  {/* Social icons */}
                  <div className="flex space-x-3 mt-auto">
                    {/* LinkedIn Icon */}
                    {professor.socialLinks?.linkedin && (
                      <a
                        href={professor.socialLinks.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-secondary rounded-lg hover:bg-primary hover:text-white transition-colors"
                        title="LinkedIn Profile"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}

                    {/* GitHub Icon */}
                    {professor.socialLinks?.github && (
                      <a
                        href={professor.socialLinks.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-secondary rounded-lg hover:bg-primary hover:text-white transition-colors"
                        title="GitHub Profile"
                      >
                        <Github size={18} />
                      </a>
                    )}

                    {/* Instagram Icon */}
                    {professor.socialLinks?.instagram && (
                      <a
                        href={professor.socialLinks.instagram}
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
        )}
      </div>
    </section>
  );
}