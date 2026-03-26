import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExmaCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const chars = charsRef.current.filter(Boolean);
    if (chars.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(chars, {
        y: 80,
        opacity: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      gsap.from(subRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      gsap.from(btnRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const text = 'Be Part of the Movement';

  return (
    <section ref={sectionRef} className="exma-cta-section">
      <div className="exma-cta-orb exma-cta-orb-1" />
      <div className="exma-cta-orb exma-cta-orb-2" />

      <h2 className="exma-cta-title exma-headline">
        {text.split('').map((char, i) => (
          <span
            key={i}
            ref={(el) => { charsRef.current[i] = el; }}
            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
      <p ref={subRef} className="exma-cta-subtext">EXMA Speakers 2026</p>
      <button
        ref={btnRef}
        className="exma-cta-button"
        onClick={() => { window.location.href = 'mailto:contacto@exma.com'; }}
      >
        Join Now
      </button>
    </section>
  );
}
