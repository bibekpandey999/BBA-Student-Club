'use client';

export default function History() {
  const milestones = [
    {
      year: 'Founded',
      title: 'BBA Student Club Established',
      description: 'BBA Student Club BUMC was established as a non-profit, non-political organization dedicated to the welfare and development of BBA students.'
    },
    {
      year: 'Growth',
      title: 'Community Expansion',
      description: 'The club grew steadily with active engagement of students, organizing workshops and networking events for BBA students.'
    },
    {
      year: 'Development',
      title: 'Professional Programs',
      description: 'Introduced professional development programs, guest lectures from industry experts, and career counseling sessions.'
    },
    {
      year: 'Recognition',
      title: 'Active Community Hub',
      description: 'Became the leading student organization at Butwal Multiple Campus with 427+ active members and followers.'
    },
    {
      year: '2024',
      title: 'Digital Presence',
      description: 'Strengthened digital presence with active social media engagement and online community building initiatives.'
    }
  ];

  return (
    <section id="history" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Our Journey</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-lg text-foreground/70 mt-4">The history and growth of BBA Student Club BUMC</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary opacity-20"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className="bg-background p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                    <h3 className="text-2xl font-bold text-primary mb-2">{milestone.title}</h3>
                    <p className="text-sm text-foreground/70 mb-2 font-semibold">{milestone.year}</p>
                    <p className="text-foreground/80">{milestone.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="w-0 flex justify-center">
                  <div className="w-5 h-5 bg-white border-4 border-primary rounded-full relative z-10"></div>
                </div>

                {/* Spacer */}
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
