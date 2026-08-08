import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}



  // const teamMembers = [
  //   {
  //     name: 'Rabin Rijal',
  //     position: 'Club President',
  //     bio: 'Visionary leader dedicated to guiding BBA Student Club BUMC towards excellence and member welfare.',
  //     image: '/640114021_1454386019554276_7886447155372869420_n.jpg'
  //   },
  //   {
  //     name: 'Aayush Bhurtel',
  //     position: 'Vice President',
  //     bio: 'Strategic thinker passionate about supporting the president and ensuring smooth club operations.',
  //     image: '👩‍💼'
  //   },
  //   {
  //     name: 'Dr Om Prakash Aryal',
  //     position: 'Advisor',
  //     bio: 'Financial steward committed to transparent and effective management of club resources.',
  //     image: '/497508854_9186289971477405_8211383348833693049_n.jpg'
  //   },
  //   {
  //     name: 'Sishir Saru',
  //     position: 'Secretary',
  //     bio: 'Creative organizer bringing engaging workshops, seminars, and networking events to members.',
  //     image: '👩‍💼'
  //   },
  //   {
  //     name: 'Sandesh Pokharel',
  //     position: 'IPP',
  //     bio: 'Brand ambassador connecting BBA Student Club BUMC with the wider community.',
  //     image: '👨‍💼'
  //   },
  //   {
  //     name: 'Laxman Neupane',
  //     position: 'Treasurer',
  //     bio: 'Dedicated to welcoming new members and fostering an inclusive club environment.',
  //     image: '/588473355_2213216822491514_5926936704572849940_n.jpg'
  //   }
  // ];




//   "BBA Student Club BUMC is not just an organization—it's a community of passionate individuals committed to excellence, growth, and meaningful connections. Together, we create opportunities that shape not just our academic journey, but our professional futures."

// "Our mission is to empower every member to reach their fullest potential through professional development, networking, and community engagement. Every voice matters, and every contribution counts toward our collective success."

// "Welcome to BBA Student Club BUMC—where excellence meets opportunity."

// BBA Student Club

// Butwal Multiple Campus

  // const events = [
  //   {
  //     id: 1,
  //     title: 'Grand Meet 2026',
  //     date: 'Recent',
  //     location: 'Butwal Multiple Campus',
  //     description: 'A grand gathering of BBA students featuring welcome and farewell celebrations with exciting activities and entertainment.',
  //     image: '/650852377_920680700708945_7265026851570010153_n.jpg'
  //   },
  //   {
  //     id: 2,
  //     title: 'Career Development Workshop',
  //     date: 'Regularly Held',
  //     location: 'BUMC Campus',
  //     description: 'Professional workshops featuring industry experts sharing insights on career paths, entrepreneurship, and skill development.',
  //     image: '💼'
  //   },
  //   {
  //     id: 3,
  //     title: 'Networking Sessions',
  //     date: 'Monthly',
  //     location: 'BUMC Campus',
  //     description: 'Regular networking events bringing together BBA students to build connections and share academic and professional experiences.',
  //     image: '🤝'
  //   },
  //   {
  //     id: 4,
  //     title: 'Academic Seminars',
  //     date: 'Throughout Year',
  //     location: 'BUMC Campus',
  //     description: 'Seminars on business topics, case studies, and contemporary management issues relevant to BBA students.',
  //     image: '📚'
  //   },
  //   {
  //     id: 5,
  //     title: 'Community Engagement',
  //     date: 'Occasional',
  //     location: 'Golpark, Butwal',
  //     description: 'Community welfare initiatives and social responsibility projects engaging students in meaningful community service.',
  //     image: '❤️'
  //   },
  //   {
  //     id: 6,
  //     title: 'Social & Sports Events',
  //     date: 'Seasonal',
  //     location: 'BUMC Campus',
  //     description: 'Fun-filled social gatherings, sports competitions, and team-building activities fostering camaraderie among members.',
  //     image: '/618854846_878479658262383_6959482383030625324_n.jpg'
  //   }
  // ];





  //  const images = [
  //   { id: 1, image: "/655722704_929053636538318_560326974962331346_n.jpg" },
  //   { id: 2, image: "/649631339_920738900703125_140914374627014524_n.jpg", },
  //   { id: 3, image: "/651189329_920738170703198_6866606733790743690_n.jpg", },
  //   { id: 4, image: "/650852377_920680700708945_7265026851570010153_n.jpg", },
  //   { id: 5, image: "/651690866_920680457375636_5697906322508073149_n.jpg", },
  //   { id: 6, image: "/619569115_880813658028983_1128694908844423997_n.jpg",},
  //   { id: 7, image: "/619901927_880080578102291_8602227161308646561_n.jpg",},
  //   { id: 8, image: "/617506945_879311641512518_2017441565061322688_n.jpg", },
  //   { id: 9, image: "/616817017_879310911512591_5124518582883100078_n.jpg",},
  //   { id: 10, image: "/587792514_835333389243677_3518168884016902662_n.jpg",}, 
  //   { id: 11, image: "/586582610_835331725910510_6432970715216625_n.jpg",},
  //   { id: 12, image: "/585409510_835332405910442_4574752465236967738_n.jpg",},
  //   { id: 13, image: "/586537674_835331392577210_2219586893679019107_n.jpg",},
  //   { id: 14, image: "/586562289_835331102577239_7188234168552421802_n.jpg",},
  //   { id: 15, image: "/544414220_770990779011272_4292754949874408525_n.jpg",},
  // ];
