'use client';

import { Calendar, MapPin, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PastEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('https://bba-student-club.onrender.com/api/events');
        const json = await res.json();
        if (json.success) {
          setEvents(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Reverse order so the most recently added event shows first
  const displayEvents = [...events].reverse();

  return (
    <section id="events" className="py-20 bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Events & Activities</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-lg text-foreground/70 mt-4">
            Join us for engaging events, workshops, and networking opportunities
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-foreground/70 italic">Loading events...</p>
          </div>
        ) : displayEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-foreground/70">No events found in the database.</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {displayEvents.map((event) => {
              const isImagePath = event.image && event.image.startsWith('/');
              const isEmoji = event.image && !event.image.startsWith('/') && event.image.length <= 4;

              return (
                <div
                  key={event._id || event.id}
                  className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-border flex flex-col justify-between w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] max-w-sm"
                >
                  <div>
                    {/* Event image */}
                    <div className="h-48 flex items-center justify-center overflow-hidden relative group bg-gray-100">
                      {isImagePath ? (
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      ) : isEmoji ? (
                        <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                          {event.image}
                        </div>
                      ) : event.image ? (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-6xl">📅</div>
                      )}
                    </div>

                    {/* Event content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-3">{event.title}</h3>

                      <div className="space-y-2 mb-4">
                        {event.date && (
                          <div className="flex items-center text-sm text-foreground/70">
                            <Calendar size={16} className="mr-2 text-primary flex-shrink-0" />
                            <span>{event.date}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center text-sm text-foreground/70">
                            <MapPin size={16} className="mr-2 text-primary flex-shrink-0" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Truncated description preview */}
                      <p className="text-sm text-foreground/70 mb-6 leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setSelectedEvent(event)}
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
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800 rounded-full bg-gray-100 cursor-pointer"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {selectedEvent.title}
              </h2>

              <div className="flex flex-wrap gap-4 mb-6 text-sm text-foreground/70">
                {selectedEvent.date && (
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-primary" />
                    <span>{selectedEvent.date}</span>
                  </div>
                )}
                {selectedEvent.location && (
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-primary" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
              </div>

              {selectedEvent.image && (
                <div className="h-64 sm:h-80 w-full relative mb-6 rounded-lg overflow-hidden bg-gray-100">
                  {selectedEvent.image.startsWith('/') ? (
                    <Image
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      fill
                      className="object-cover"
                    />
                  ) : selectedEvent.image.length <= 4 ? (
                    <div className="text-9xl h-full flex items-center justify-center">
                      {selectedEvent.image}
                    </div>
                  ) : (
                    <img
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              )}

              {/* Full description display */}
              <div className="text-foreground/80 leading-relaxed space-y-4 whitespace-pre-line text-base">
                {selectedEvent.description}
              </div>

              <div className="mt-8 text-right">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="py-2 px-6 bg-gray-200 text-foreground font-semibold rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}