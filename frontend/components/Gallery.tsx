'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('https://bba-student-club.onrender.com/api/images');
        const json = await res.json();
        if (json.success) {
          setImages(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Newest uploaded image shows first
  const displayImages = [...images].reverse();

  return (
    <section id="gallery" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
     <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Gallery</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        <p className="text-lg text-foreground/70 mt-4">Memorable moments from our club events</p>
      </div>

      {/* Gallery layout */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-lg text-foreground/70 italic">Loading gallery...</p>
        </div>
      ) : displayImages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-foreground/70">No images found in the database.</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-6">
          {displayImages.map((image) => {
            const imgId = image._id || image.id;
            return (
              <div
                key={imgId}
                onClick={() => setSelectedImage(imgId)}
                className="relative w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] h-64 bg-gradient-to-br from-primary to-emerald-700 rounded-lg overflow-hidden cursor-pointer group shadow-lg"
              >
                {/* Image */}
                <img
                  src={image.image}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white/80 text-sm mt-2">Click to enlarge</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-accent transition-colors"
            >
              <X size={32} />
            </button>
            <div className="bg-white rounded-lg overflow-hidden flex items-center justify-center max-h-[90vh]">
              <img
                src={displayImages.find((img) => (img._id || img.id) === selectedImage)?.image}
                alt="Gallery Image"
                className="w-full h-auto max-h-[90vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}