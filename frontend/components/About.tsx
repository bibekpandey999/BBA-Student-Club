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

        <div className="grid md:grid-cols-2 gap-12 items-center"> 
          {/* Left content */}
          <div>
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
              Butwal Multiple Campus (BMC) is one of the oldest and most prestigious constituent campuses of Tribhuvan University, located in Butwal, Rupandehi district of Nepal. Established in 2030 B.S. (1973 A.D.), the campus has played a significant role in providing quality higher education in the western region of the country. It offers a wide range of academic programs at the undergraduate and postgraduate levels in faculties such as Management, Humanities, Education, and Science. With a large student population and experienced faculty members, BMC has built a strong reputation for academic excellence and discipline.
            </p>
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
              Our community is dedicated to fostering professional growth, academic excellence, and meaningful relationships among our members. We organize various activities, workshops, and events to enhance the educational experience and career prospects of our students.
            </p>
            <p className="text-base text-foreground/70 mb-8">
              <strong>Location:</strong> Golpark, Butwal, Nepal<br />
              <strong>Contact:</strong> +977 974-8704821<br />
              <strong>Members:</strong> 427+ followers
            </p>

            {/* Cards grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border">
                <Target className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold text-sm text-foreground">Welfare</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border">
                <Eye className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold text-sm text-foreground">Development</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border">
                <Zap className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold text-sm text-foreground">Excellence</h3>
              </div>
            </div>
          </div>

          {/* Right - Club Logo */}
          <div className="flex items-center justify-center">
            <div className="w-64 h-64 bg-gradient-to-br from-primary to-emerald-700 rounded-full flex items-center justify-center shadow-2xl overflow-hidden animate-[spin_6s_linear_infinite]">
              <img src="/bba-logo.jpg" alt="BBA Student Club Logo" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}