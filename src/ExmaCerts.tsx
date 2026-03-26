import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const certs = [
  { name: 'Certificación EXMA', body: 'La más reconocida en LATAM. Currículo + evaluación + insignia.', meta: '6 semanas · Online + Presencial', badge: 'EXMA' },
  { name: 'Acreditación NSA', body: 'Experiencia profesional superior. Portafolio + evaluación por pares.', meta: 'Portafolio · Peer review', badge: 'NSA' },
  { name: 'TEDx Ready', body: 'Charlas de calidad TED. Revisión de video + score mínimo 90.', meta: 'Video review · Score mín. 90', badge: 'TEDx' },
];

export default function ExmaCerts() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const accentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      ScrollTrigger.batch(cardRefs.current.filter(Boolean) as HTMLDivElement[], {
        start: 'top 85%',
        onEnter: (batch) => gsap.fromTo(batch,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out' }
        ),
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const accent = accentRefs.current[i];
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -12, duration: 0.3, ease: 'power2.out' });
          if (accent) gsap.fromTo(accent, { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power2.out', transformOrigin: 'left' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
          if (accent) gsap.to(accent, { scaleX: 0, duration: 0.25, ease: 'power2.in', transformOrigin: 'left' });
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="exma-certs-section" data-section="certs" id="certs">
      <h2 ref={headRef} className="exma-certs-headline exma-headline">Credenciales que abren puertas.</h2>
      <div className="exma-certs-grid">
        {certs.map((cert, i) => (
          <div
            key={cert.badge}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="exma-certs-card"
          >
            <div ref={(el) => { accentRefs.current[i] = el; }} className="exma-certs-accent" />
            <span className="exma-certs-badge">{cert.badge}</span>
            <h3 className="exma-certs-name exma-headline">{cert.name}</h3>
            <p className="exma-certs-body">{cert.body}</p>
            <p className="exma-certs-meta">{cert.meta}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
