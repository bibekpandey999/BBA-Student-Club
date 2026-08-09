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
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green-400 mb-6 leading-tight">
    BUTWAL MULTIPLE CAMPUS BBA
</h1>
        <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          Butwal Multiple Campus (BMC) is one of the oldest and most prestigious constituent campuses of Tribhuvan University, located in Butwal, Rupandehi district of Nepal. Established in 2030 B.S. (1973 A.D.), the campus has played a significant role in providing quality higher education in the western region of the country.
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