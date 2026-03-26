import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const items = [
  'Marketing de impacto', 'Storytelling', 'Liderazgo',
  'Innovación', 'Negocios exponenciales', 'Marca personal',
  'Comunicación', 'Ejecución', 'Visión global',
  'Mindset', 'Transformación', 'Experiencias reales',
];

export default function ExmaTopicsMarquee() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const track1 = [...items, ...items];
  const track2 = [...items, ...items];

  const handleItemEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    const parent = (e.currentTarget as HTMLElement).parentElement;
    if (!parent) return;
    const siblings = parent.querySelectorAll('.exma-topics-item');
    siblings.forEach((s) => {
      if (s !== e.currentTarget) gsap.to(s, { opacity: 0.3, duration: 0.3 });
    });
    gsap.to(e.currentTarget, { scale: 1.1, fontStyle: 'italic', duration: 0.3 });
  };

  const handleItemLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    const parent = (e.currentTarget as HTMLElement).parentElement;
    if (!parent) return;
    const siblings = parent.querySelectorAll('.exma-topics-item');
    siblings.forEach((s) => gsap.to(s, { opacity: 1, duration: 0.3 }));
    gsap.to(e.currentTarget, { scale: 1, fontStyle: 'normal', duration: 0.3 });
  };

  return (
    <section ref={sectionRef} className="exma-topics-section" data-section="topics">
      <div className="exma-topics-row">
        <div className="exma-topics-track exma-topics-track-left">
          {track1.map((item, i) => (
            <span
              key={i}
              className="exma-topics-item exma-headline"
              onMouseEnter={handleItemEnter}
              onMouseLeave={handleItemLeave}
            >
              {item}<span className="exma-topics-dot"> · </span>
            </span>
          ))}
        </div>
      </div>
      <div className="exma-topics-row">
        <div className="exma-topics-track exma-topics-track-right">
          {track2.map((item, i) => (
            <span
              key={i}
              className="exma-topics-item exma-headline"
              onMouseEnter={handleItemEnter}
              onMouseLeave={handleItemLeave}
            >
              {item}<span className="exma-topics-dot"> · </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
