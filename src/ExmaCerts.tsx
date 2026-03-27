import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuredCert = {
  badge: 'CERTIFICACIÓN OFICIAL',
  name: 'Certificación EXMA',
  body: 'La credencial más reconocida en LATAM para speakers profesionales. Diseñada para quienes quieren hablar en los escenarios más importantes del mundo.',
  includes: [
    'Currículo validado por expertos',
    'Evaluación práctica + insignia digital',
    'Acceso a red de organizadores EXMA',
    'Badge verificable en LinkedIn',
  ],
  meta: '6 semanas · Online + Presencial',
};

const secondaryCerts = [
  {
    badge: 'NSA',
    name: 'Acreditación NSA',
    body: 'Experiencia profesional superior.',
    meta: 'Portafolio · Peer review',
    icon: '◈',
  },
  {
    badge: 'TEDx',
    name: 'TEDx Ready',
    body: 'Charlas de calidad TED.',
    meta: 'Video review · Score mín. 90',
    icon: '◉',
  },
];

export default function ExmaCerts() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      if (featuredRef.current) {
        gsap.fromTo(featuredRef.current, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: featuredRef.current, start: 'top 85%' },
        });
        featuredRef.current.addEventListener('mouseenter', () => {
          gsap.to(featuredRef.current, { y: -8, duration: 0.35, ease: 'power2.out' });
          if (accentRef.current) gsap.fromTo(accentRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power2.out', transformOrigin: 'left' });
        });
        featuredRef.current.addEventListener('mouseleave', () => {
          gsap.to(featuredRef.current, { y: 0, duration: 0.35, ease: 'power2.out' });
          if (accentRef.current) gsap.to(accentRef.current, { scaleX: 0, duration: 0.3, ease: 'power2.in', transformOrigin: 'left' });
        });
      }

      if (pillsRef.current) {
        gsap.fromTo(pillsRef.current.children, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: pillsRef.current, start: 'top 90%' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="exma-certs-section" data-section="certs" id="certs">

      {/* Header */}
      <div ref={headRef} className="exma-certs-header">
        <p className="exma-certs-eyebrow">CREDENCIALES</p>
        <h2 className="exma-certs-headline exma-headline">Tu nombre.<br />Tu sello.</h2>
        <p className="exma-certs-sub">Las credenciales que distinguen a los speakers que mueven audiencias.</p>
      </div>

      {/* Featured */}
      <div className="exma-certs-featured-wrap">
        <div ref={featuredRef} className="exma-certs-card exma-certs-card-featured">
          <div ref={accentRef} className="exma-certs-accent" />
          <div className="exma-certs-featured-glow" />

          <div className="exma-certs-featured-left">
            <span className="exma-certs-badge">{featuredCert.badge}</span>
            <h3 className="exma-certs-name-big exma-headline">{featuredCert.name}</h3>
            <p className="exma-certs-body">{featuredCert.body}</p>
            <p className="exma-certs-meta">{featuredCert.meta}</p>
            <button className="exma-certs-cta">Obtener Certificación</button>
          </div>

          <div className="exma-certs-featured-right">
            <p className="exma-certs-includes-label">Incluye</p>
            <ul className="exma-certs-includes-list">
              {featuredCert.includes.map((item) => (
                <li key={item} className="exma-certs-includes-item">
                  <span className="exma-certs-check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="exma-certs-stat">
              <span className="exma-certs-stat-num">+12,000</span>
              <span className="exma-certs-stat-label">speakers certificados en LATAM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary mini cards */}
      <div ref={pillsRef} className="exma-certs-pills">
        {secondaryCerts.map((cert) => (
          <div key={cert.badge} className="exma-certs-mini-card">
            <div className="exma-certs-mini-top">
              <span className="exma-certs-badge">{cert.badge}</span>
              <span className="exma-certs-mini-icon">{cert.icon}</span>
            </div>
            <p className="exma-certs-mini-name exma-headline">{cert.name}</p>
            <p className="exma-certs-mini-body">{cert.body}</p>
            <p className="exma-certs-meta">{cert.meta}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
