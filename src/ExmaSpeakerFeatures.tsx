import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { num: '01', title: 'Speaker Score con IA', body: 'Nuestro algoritmo puntúa tu perfil. Mayor score, más bookings.' },
  { num: '02', title: 'Certificación', body: 'Insignias EXMA, NSA, TEDx Ready. 3x más solicitudes.' },
  { num: '03', title: 'Bookings y contratos', body: 'Recibe solicitudes, firma digital, cobra a tiempo.' },
  { num: '04', title: 'Analytics', body: 'Visitas, conversión, ingresos, reseñas. Todo en tu dashboard.' },
];

export default function ExmaSpeakerFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      ScrollTrigger.batch(cardsRef.current.filter(Boolean) as HTMLDivElement[], {
        start: 'top 85%',
        onEnter: (batch) => gsap.fromTo(batch,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out' }
        ),
      });

      const handlers: Array<{ el: HTMLDivElement; enter: () => void; leave: () => void }> = [];
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const enter = () => gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' });
        const leave = () => gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
        card.addEventListener('mouseenter', enter);
        card.addEventListener('mouseleave', leave);
        handlers.push({ el: card, enter, leave });
      });

      return () => {
        handlers.forEach(({ el, enter, leave }) => {
          el.removeEventListener('mouseenter', enter);
          el.removeEventListener('mouseleave', leave);
        });
      };
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="exma-spkfeat-section" data-section="speaker-features">
      <h2 ref={headRef} className="exma-spkfeat-headline exma-headline">
        Tu carrera como speaker.<br />Siguiente nivel.
      </h2>
      <div className="exma-spkfeat-grid">
        {features.map((f, i) => (
          <div
            key={f.num}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="exma-spkfeat-card"
          >
            <span className="exma-spkfeat-num exma-headline">{f.num}</span>
            <h3 className="exma-spkfeat-title exma-headline">{f.title}</h3>
            <p className="exma-spkfeat-body">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
