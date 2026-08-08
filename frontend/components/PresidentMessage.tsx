'use client';

import { useEffect, useState } from 'react';

export default function PresidentMessage() {
  const [presidentData, setPresidentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPresidentMessage = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/president-message');
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setPresidentData(json.data[0]);
        }
      } catch (err) {
        console.error('Failed to fetch president message:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPresidentMessage();
  }, []);

  return (
    <section id="president" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Message from Our President
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-foreground/70 italic">Loading president details...</p>
          </div>
        ) : presidentData ? (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* President image and Name down below it */}
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 bg-gradient-to-br from-primary to-emerald-700 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden bg-gray-100">
                {presidentData.image ? (
                  <img
                    src={presidentData.image}
                    alt={presidentData.name || 'Club President'}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-6xl">👤</div>
                )}
              </div>
              <h3 className="mt-4 text-xl font-bold text-foreground text-center">
                {presidentData.name}
              </h3>
              <p className="text-primary font-semibold text-sm">Club President</p>
            </div>

            {/* Message / Description from Database */}
            <div>
              <blockquote className="border-l-4 border-primary pl-6">
                <p className="text-lg text-foreground/80 mb-6 leading-relaxed italic whitespace-pre-line">
                  &quot;{presidentData.description}&quot;
                </p>

                <div>
                  <p className="font-bold text-foreground text-lg">
                   BBA Student Club
                  </p>
                  <p className="text-primary font-semibold">Butwal Multiple Campus</p>
                </div>
              </blockquote>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-red-500">No president message found in the database.</p>
          </div>
        )}

        {/* Values section - Kept exactly the same */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-background rounded-lg border border-border hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">🎓</div>
            <h3 className="font-bold text-foreground mb-2">Professional Growth</h3>
            <p className="text-sm text-foreground/70">Developing skills and knowledge for successful careers</p>
          </div>
          <div className="text-center p-6 bg-background rounded-lg border border-border hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">🤝</div>
            <h3 className="font-bold text-foreground mb-2">Community</h3>
            <p className="text-sm text-foreground/70">Building meaningful connections and lasting friendships</p>
          </div>
          <div className="text-center p-6 bg-background rounded-lg border border-border hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="font-bold text-foreground mb-2">Welfare</h3>
            <p className="text-sm text-foreground/70">Ensuring the wellbeing and success of all members</p>
          </div>
        </div>
      </div>
    </section>
  );
}