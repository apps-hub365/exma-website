import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface ExmaIntroProps {
  onComplete: () => void;
}

export default function ExmaIntro({ onComplete }: ExmaIntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const svgWrapRef = useRef<HTMLDivElement>(null);
  const [svgLoaded, setSvgLoaded] = useState(false);

  // Load SVG inline
  useEffect(() => {
    fetch('/exma-logo.svg')
      .then((res) => res.text())
      .then((svgText) => {
        if (svgWrapRef.current) {
          svgWrapRef.current.innerHTML = svgText;
          const svg = svgWrapRef.current.querySelector('svg');
          if (svg) {
            svg.removeAttribute('width');
            svg.removeAttribute('height');
            svg.style.width = '100%';
            svg.style.height = '100%';
          }
          setSvgLoaded(true);
        }
      });
  }, []);

  // Run animation once SVG is loaded
  useEffect(() => {
    if (!svgLoaded || !svgWrapRef.current) return;

    const svg = svgWrapRef.current.querySelector('svg');
    if (!svg) return;

    const rootG = svg.querySelector('g');
    if (!rootG) return;

    const elements = rootG.children;
    gsap.set(elements, { opacity: 0 });

    const tl = gsap.timeline();

    // Logo elements appear with stagger
    tl.to(elements, {
      opacity: 1,
      duration: 0.12,
      stagger: 0.06,
      ease: 'power2.out',
    });

    // Subtle scale pulse
    tl.fromTo(
      svgWrapRef.current,
      { scale: 0.95 },
      { scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
      '-=0.3'
    );

    // Hold
    tl.to({}, { duration: 0.6 });

    // Iris transition out
    tl.to(overlayRef.current, {
      clipPath: 'circle(0% at 50% 50%)',
      duration: 1.4,
      ease: 'power2.in',
      onComplete,
    });

    return () => {
      tl.kill();
    };
  }, [svgLoaded, onComplete]);

  return (
    <div ref={overlayRef} className="exma-intro-overlay">
      <div className="exma-intro-logo">
        <div className="exma-intro-exma">
          <div
            ref={svgWrapRef}
            className="exma-intro-svg-wrap"
          />
        </div>
      </div>
    </div>
  );
}
