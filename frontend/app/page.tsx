import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import History from '@/components/History';
import Team from '@/components/Team';
import PresidentMessage from '@/components/PresidentMessage';
import DirectorMessage from '@/components/DirectorMessage';
import ChiefMessage from '@/components/ChiefMessage';
import Gallery from '@/components/Gallery';
import PastEvents from '@/components/PastEvents';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      {/* <History />
      <Team />
      <PresidentMessage /> */}
      <ChiefMessage/>
      <DirectorMessage/>
      <Gallery />
      <PastEvents />
      <Footer />
    </main>
  );
}
