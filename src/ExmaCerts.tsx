import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuredCert = {
  icon: '🏆',
  badge: 'OFICIAL',
  name: 'Certificación EXMA',
  body: 'La credencial más reconocida en LATAM para speakers profesionales. Diseñada para quienes quieren hablar en los escenarios más importantes del mundo.',
  includes: [
    'Currículo validado por expertos',
    'Evaluación práctica + insignia digital',
    'Acceso a red de organizadores EXMA',
    'Badge verificable en LinkedIn',
  ],
  meta: '6 semanas · Online + Presencial',
  stat: '+12,000',
  statLabel: 'speakers certificados en LATAM',
  cta: 'Obtener Certificación',
};

const secondaryCerts = [
  { name: 'Acreditación NSA', desc: 'Experiencia profesional superior · Peer review internacional' },
  { name: 'TEDx Ready', desc: 'Charlas de calidad TED · Video review · Score mín. 90' },
];

export default function ExmaCerts() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
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
      <div ref={headRef} className="exma-certs-header">
        <p className="exma-certs-eyebrow">CREDENCIALES</p>
        <h2 className="exma-certs-headline exma-headline">Certifícate<br />y destaca</h2>
        <p className="exma-certs-sub">Las credenciales que distinguen a los speakers que mueven audiencias</p>
      </div>

      {/* Featured card */}
      <div ref={featuredRef} className="exma-certs-featured">
        <div className="exma-certs-featured-left">
          <div className="exma-certs-icon-row">
            <span className="exma-certs-icon">{featuredCert.icon}</span>
            <span className="exma-certs-badge">{featuredCert.badge}</span>
          </div>
          <h3 className="exma-certs-featured-name exma-headline">{featuredCert.name}</h3>
          <p className="exma-certs-featured-body">{featuredCert.body}</p>
          <p className="exma-certs-featured-meta">{featuredCert.meta}</p>
          <button className="exma-certs-featured-cta">{featuredCert.cta}</button>
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
            <span className="exma-certs-stat-num exma-headline">{featuredCert.stat}</span>
            <span className="exma-certs-stat-label">{featuredCert.statLabel}</span>
          </div>
        </div>
      </div>

      {/* Secondary pills */}
      <div ref={pillsRef} className="exma-certs-pills">
        {secondaryCerts.map((cert) => (
          <button key={cert.name} className="exma-certs-pill">
            {cert.name}
          </button>
        ))}
      </div>
    </section>
  );
}
