'use client';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('/Bg image.png')` }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-emerald-500 opacity-10 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-green-400 mb-6 leading-tight">
       BBA BUTWAL MULTIPLE CAMPUS
</h1>
        <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          A non-profit, non-political community of BBA students dedicated to personal growth, professional development, and meaningful connections. Together, we build excellence and create lasting memories.
        </p>
    <button
  onClick={() => scrollToSection('about')}
  className="inline-block px-8 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25 cursor-pointer"
>
  Learn More
</button>
      </div>
    </section>
  );
}