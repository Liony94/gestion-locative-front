import Hero from './components/home/Hero';
import HowItWorks from './components/home/HowItWorks';
import Features from './components/home/Features';
import Pricing from './components/home/Pricing';
import CTA from './components/home/CTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <CTA />
    </main>
  );
}
