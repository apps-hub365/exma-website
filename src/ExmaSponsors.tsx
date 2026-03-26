import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const logos = ['Google', 'Nike', 'Spotify', 'Netflix', 'Adobe', 'Salesforce', 'HubSpot', 'Shopify', 'Meta', 'Microsoft'];

export default function ExmaSponsors() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const track = [...logos, ...logos];

  return (
    <section ref={sectionRef} className="exma-sponsors-section" data-section="sponsors">
      <div ref={headRef} className="exma-sponsors-head">
        <p className="exma-sponsors-label">Sponsors</p>
        <h2 className="exma-sponsors-headline exma-headline">Las marcas más grandes<br />ya están aquí.</h2>
      </div>

      <div className="exma-sponsors-marquee-wrapper">
        <div className="exma-sponsors-row exma-sponsors-row-left">
          <div className="exma-sponsors-track">
            {track.map((logo, i) => (
              <span key={i} className="exma-sponsors-logo">{logo}</span>
            ))}
          </div>
        </div>
        <div className="exma-sponsors-row exma-sponsors-row-right">
          <div className="exma-sponsors-track exma-sponsors-track-reverse">
            {track.map((logo, i) => (
              <span key={i} className="exma-sponsors-logo">{logo}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
