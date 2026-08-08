'use client';

import { useEffect, useState } from 'react';
import { Linkedin, Github, Instagram } from 'lucide-react';

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch('https://bba-student-club.onrender.com/api/bod');
        const data = await res.json();
        
        if (data.success) {
          setTeamMembers(data.data);
        } else {
          setError('Failed to load team data.');
        }
      } catch (err) {
        console.error('Failed to fetch team members:', err);
        setError('Something went wrong while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <section id="team" className="py-20 bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Leadership Team</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-lg text-foreground/70 mt-4">
            Meet the dedicated team members leading BBA Student Club BUMC
          </p>
        </div>

        {/* Loading & Error States */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
        {error && <p className="text-center text-red-500 font-medium">{error}</p>}

        {/* Team layout: Uses Flexbox with justify-center to keep 1 or 2 cards centered */}
        {!loading && !error && (
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member) => (
              <div
                key={member._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border group flex flex-col w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] max-w-sm"
              >
                {/* Image area */}
                <div className="h-56 flex items-center justify-center overflow-hidden relative bg-gray-100">
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

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  
                  {/* Highlighted Role Badge */}
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-bold text-primary bg-primary/10 rounded-full border border-primary/25 shadow-sm">
                      {member.role}
                    </span>
                  </div>
                  
                  {/* Clickable Email Text */}
                  {member.email && (
                    <div className="mb-3">
                      <a
                        href={`mailto:${member.email}?subject=Inquiry%20regarding%20BBA%20Student%20Club&body=Hi%20${encodeURIComponent(member.name)},%0D%0A%0D%0AI would like to connect with you regarding...`}
                        className="text-xs font-medium text-primary hover:underline break-all"
                      >
                        {member.email}
                      </a>
                    </div>
                  )}

                  <p className="text-sm text-foreground/70 mb-6 flex-grow">{member.description}</p>

                  {/* Social icons */}
                  <div className="flex space-x-3 mt-auto">
                    {/* LinkedIn Icon */}
                    {member.socialLinks?.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-secondary rounded-lg hover:bg-primary hover:text-white transition-colors"
                        title="LinkedIn Profile"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}

                    {/* GitHub Icon */}
                    {member.socialLinks?.github && (
                      <a
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-secondary rounded-lg hover:bg-primary hover:text-white transition-colors"
                        title="GitHub Profile"
                      >
                        <Github size={18} />
                      </a>
                    )}

                    {/* Instagram Icon */}
                    {member.socialLinks?.instagram && (
                      <a
                        href={member.socialLinks.instagram}
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