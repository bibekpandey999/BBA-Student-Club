'use client';

import { useEffect, useState } from 'react';

export default function DirectorMessage() {
  const [directorData, setDirectorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDirectorMessage = async () => {
      try {
        const res = await fetch('https://bba-student-club.onrender.com/api/director-message');
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setDirectorData(json.data[0]);
        }
      } catch (err) {
        console.error('Failed to fetch director message:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDirectorMessage();
  }, []);

  return (
    <section id="director" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Message from Our Director
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-foreground/70 italic">Loading director details...</p>
          </div>
        ) : directorData ? (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Director image and Name down below it */}
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 bg-gradient-to-br from-primary to-emerald-700 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden bg-gray-100">
                {directorData.image ? (
                  <img
                    src={directorData.image}
                    alt={directorData.name || 'Program Director'}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-6xl">👤</div>
                )}
              </div>
              <h3 className="mt-4 text-xl font-bold text-foreground text-center">
                {directorData.name}
              </h3>
              <p className="text-primary font-semibold text-sm">Program Director</p>
            </div>

            {/* Message / Description from Database */}
            <div>
              <blockquote className="border-l-4 border-primary pl-6">
                <p className="text-lg text-foreground/80 mb-6 leading-relaxed italic whitespace-pre-line">
                  &quot;{directorData.description}&quot;
                </p>

                <div>
                  <p className="font-bold text-foreground text-lg">
                    BBA Program Directorate
                  </p>
                  <p className="text-primary font-semibold">Butwal Multiple Campus</p>
                </div>
              </blockquote>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-red-500">No director message found in the database.</p>
          </div>
        )}

        
      </div>
    </section>
  );
}