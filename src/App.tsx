import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import ExmaIntro from './ExmaIntro';
import ExmaNav from './ExmaNav';
import ExmaHero from './ExmaHero';
import ExmaIlluminate from './ExmaIlluminate';
import ExmaConnectTabs from './ExmaConnectTabs';
import ExmaValueProps from './ExmaValueProps';
import ExmaHowItWorks from './ExmaHowItWorks';
import ExmaCerts from './ExmaCerts';
import ExmaSpeakers from './ExmaSpeakers';
import ExmaTestimonials from './ExmaTestimonials';
import ExmaPricing from './ExmaPricing';
import ExmaCTASplit from './ExmaCTASplit';
import ExmaCierre from './ExmaCierre';
import ExmaFAQ from './ExmaFAQ';
import ExmaFooter from './ExmaFooter';
import ExmaChatbot from './ExmaChatbot';
import ExmaLogin from './ExmaLogin';

import './exma.css';
import './exma-hero-nav.css';
import './exma-s02-s04.css';
import './exma-s05-s06.css';
import './exma-s07-s11.css';
import './exma-s12-s17.css';
import './exma-s18-s21.css';

gsap.registerPlugin(ScrollTrigger);

let introShownThisSession = false;

export default function App() {
  const navigate = useNavigate();
  const [introComplete, setIntroComplete] = useState(introShownThisSession);
  const [showLogin, setShowLogin] = useState(false);
  const lenisRafRef = useRef<((time: number) => void) | null>(null);

  const handleIntroComplete = useCallback(() => {
    introShownThisSession = true;
    setIntroComplete(true);
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    if (!introComplete) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time: number) => lenis.raf(time * 1000);
    lenisRafRef.current = rafCallback;
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (lenisRafRef.current) gsap.ticker.remove(lenisRafRef.current);
      lenis.destroy();
    };
  }, [introComplete]);

  return (
    <div className="exma-page-wrapper">

      {!introComplete && <ExmaIntro onComplete={handleIntroComplete} />}

      {showLogin && <ExmaLogin onClose={() => setShowLogin(false)} />}

      <ExmaChatbot />

      {introComplete && (
        <>
          <ExmaNav
            onLoginClick={() => setShowLogin(true)}
            onSpeakerClick={() => navigate('/become-a-speaker')}
          />

          <ExmaHero onSpeakerClick={() => navigate('/become-a-speaker')} />

          <ExmaIlluminate />

          <ExmaConnectTabs />

          <ExmaValueProps />

          <ExmaHowItWorks />


          <ExmaCerts />

          <div id="speakers">
            <ExmaSpeakers />
          </div>

          <ExmaTestimonials />

          <ExmaPricing />

          <ExmaCTASplit />

          <ExmaCierre />

          <ExmaFAQ />

          <ExmaFooter />
        </>
      )}
    </div>
  );
}
