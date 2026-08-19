import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Problem } from '../components/Problem';
import { Solution } from '../components/Solution';
import { Analysis } from '../components/Analysis';
import { HowItWorks } from '../components/HowItWorks';
import { Pricing } from '../components/Pricing';
import { Product } from '../components/Product';
import { TargetAudience } from '../components/TargetAudience';
import { Reassurance } from '../components/Reassurance';
import { Guide } from '../components/Guide';
import { FAQ } from '../components/FAQ';
import { Contact } from '../components/Contact';

export function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Problem />
      <Solution />
      <Analysis />
      <HowItWorks />
      <Pricing />
      <Product />
      <TargetAudience />
      <Reassurance />
      <Guide />
      <FAQ />
      <Contact />
    </main>
  );
}
