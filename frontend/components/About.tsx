'use client';

import { Target, Eye, Zap } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">About Butwal Multiple Campus BBA</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start"> 
          {/* Left content */}
          <div>
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
              Butwal Multiple Campus (BMC) is one of the oldest and most prestigious constituent campuses of Tribhuvan University, located in Butwal, Rupandehi district of Nepal. Established in 2030 B.S. (1973 A.D.), the campus has played a significant role in providing quality higher education in the western region of the country. It offers a wide range of academic programs at the undergraduate and postgraduate levels in faculties such as Management, Humanities, Education, and Science. With a large student population and experienced faculty members, BMC has built a strong reputation for academic excellence and discipline.
            </p>
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
              The campus is well-equipped with physical infrastructure, including classrooms, a library, computer labs, and science laboratories, which support both teaching and research activities. Over the years, Butwal Multiple Campus has served as a center of learning for students from diverse social and geographical backgrounds, contributing significantly to the region's educational and social development. Its commitment to academic quality, along with its central location in Butwal, makes it a popular choice for students pursuing higher education in Nepal.
            </p>
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-border mb-8 shadow-sm">
              <p className="text-base text-foreground/80 space-y-1">
                <strong className="text-foreground">Location:</strong> Golpark, Butwal, Nepal<br />
                <strong className="text-foreground">Contact:</strong> +977 974-8704821<br />
                <strong className="text-foreground">Members:</strong> 427+ followers
              </p>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-border group hover:-translate-y-1">
                <Target className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-sm text-foreground">Welfare</h3>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-border group hover:-translate-y-1">
                <Eye className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-sm text-foreground">Development</h3>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-border group hover:-translate-y-1">
                <Zap className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-sm text-foreground">Excellence</h3>
              </div>
            </div>
          </div>

          {/* Right - Club Logo */}
          <div className="flex items-center justify-center md:justify-end pt-2 md:pt-4">
            <div className="relative group">
              {/* Soft decorative backdrop glow */}
              <div className="absolute -inset-3 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>
              
              {/* Refined container placed slightly higher with a smooth professional hover scale instead of dizzying spin */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full p-4 bg-white shadow-2xl border border-border flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                <img 
                  src="/Butwal-Multiple-Campus.jpg" 
                  alt="BBA Student Club Logo" 
                  className="w-full h-full object-cover rounded-full shadow-inner" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}