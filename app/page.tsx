import IntroOverlay from '@/components/IntroOverlay';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ParticleCanvas from '@/components/ParticleCanvas';
import Problem from '@/components/Problem';
import HowItWorks from '@/components/HowItWorks';
import Surfaces from '@/components/Surfaces';
import Principles from '@/components/Principles';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';
import RevealObserver from '@/components/RevealObserver';

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <ParticleCanvas />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <main>
          <Hero />
          <Problem />
          <HowItWorks />
          <Surfaces />
          <Principles />
          <Waitlist />
          <Footer />
        </main>
      </div>
      <RevealObserver />
    </>
  );
}
