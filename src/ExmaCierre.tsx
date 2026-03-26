import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExmaCierre() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      tl.fromTo(line1Ref.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
        .fromTo(line2Ref.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.7')
        .fromTo(bodyRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3');

      // Magnetic hover on CTA
      const cta = ctaRef.current;
      if (cta) {
        const xTo = gsap.quickTo(cta, 'x', { duration: 0.4, ease: 'power2.out' });
        const yTo = gsap.quickTo(cta, 'y', { duration: 0.4, ease: 'power2.out' });
        cta.addEventListener('mousemove', (e) => {
          const rect = cta.getBoundingClientRect();
          xTo((e.clientX - rect.left - rect.width / 2) * 0.3);
          yTo((e.clientY - rect.top - rect.height / 2) * 0.3);
        });
        cta.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="exma-cierre-section" data-section="cierre">
      <div className="exma-cierre-bg" />
      <div className="exma-cierre-content">
        <h2 className="exma-cierre-headline exma-headline">
          <span ref={line1Ref} className="exma-cierre-line">Tu mensaje merece</span>
          <span ref={line2Ref} className="exma-cierre-line">el mejor escenario.</span>
        </h2>
        <p ref={bodyRef} className="exma-cierre-body">
          La red de speakers más grande de LATAM.<br />
          Tú pones el mensaje. Nosotros la plataforma.
        </p>
        <button ref={ctaRef} className="exma-cierre-cta">Quiero ser speeker</button>
      </div>
    </section>
  );
}
