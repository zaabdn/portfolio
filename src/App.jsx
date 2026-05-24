import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';

import LoadingScreen   from './components/LoadingScreen';
import ScrollProgressBar from './components/ScrollProgressBar';
import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import MarqueeStrip    from './components/MarqueeStrip';
import Stats           from './components/Stats';
import About           from './components/About';
import Skills          from './components/Skills';
import Experience      from './components/Experience';
import Education       from './components/Education';
import Projects        from './components/Projects';
import Contact         from './components/Contact';
import Medium          from './components/Medium';
import BackToTop       from './components/BackToTop';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <ScrollProgressBar />

      <Navbar />

      <main>
        <Hero />
        <MarqueeStrip />
        <Stats />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Medium />
        <Contact />
      </main>

      <BackToTop />
    </>
  );
}
