'use client';

import { useEffect, useState } from 'react';

export default function ChiefMessage() {
  const [chiefData, setChiefData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChiefMessage = async () => {
      try {
        const res = await fetch('https://bba-student-club.onrender.com/api/chief-message');
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setChiefData(json.data[0]);
        }
      } catch (err) {
        console.error('Failed to fetch chief message:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChiefMessage();
  }, []);

  return (
    <section id="chief" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Message from Our Chief
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-foreground/70 italic">Loading chief details...</p>
          </div>
        ) : chiefData ? (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Chief image and Name down below it */}
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 bg-gradient-to-br from-primary to-emerald-700 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden bg-gray-100">
                {chiefData.image ? (
                  <img
                    src={chiefData.image}
                    alt={chiefData.name || 'Campus Chief'}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-6xl">👤</div>
                )}
              </div>
              <h3 className="mt-4 text-xl font-bold text-foreground text-center">
                {chiefData.name}
              </h3>
              <p className="text-primary font-semibold text-sm">Campus Chief</p>
            </div>

            {/* Message / Description from Database */}
            <div>
              <blockquote className="border-l-4 border-primary pl-6">
                <p className="text-lg text-foreground/80 mb-6 leading-relaxed italic whitespace-pre-line">
                  &quot;{chiefData.description}&quot;
                </p>

                <div>
                  <p className="font-bold text-foreground text-lg">
                    Campus Chief Office
                  </p>
                  <p className="text-primary font-semibold">Butwal Multiple Campus</p>
                </div>
              </blockquote>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-red-500">No chief message found in the database.</p>
          </div>
        )}

        {/* Values section - Kept consistent with the style */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-background rounded-lg border border-border hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">🎓</div>
            <h3 className="font-bold text-foreground mb-2">Academic Excellence</h3>
            <p className="text-sm text-foreground/70">Fostering high standards in teaching and student learning</p>
          </div>
          <div className="text-center p-6 bg-background rounded-lg border border-border hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">💡</div>
            <h3 className="font-bold text-foreground mb-2">Leadership</h3>
            <p className="text-sm text-foreground/70">Guiding students toward impactful leadership roles</p>
          </div>
          <div className="text-center p-6 bg-background rounded-lg border border-border hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">🌟</div>
            <h3 className="font-bold text-foreground mb-2">Vision & Integrity</h3>
            <p className="text-sm text-foreground/70">Building a disciplined and progressive educational environment</p>
          </div>
        </div>
      </div>
    </section>
  );
}