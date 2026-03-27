import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const previewCards = [
  {
    tag: 'PARA SPEAKERS',
    name: 'Básico',
    price: 'Gratis',
    period: '',
    desc: 'Empieza a construir tu presencia como speaker.',
    includes: [
      'Perfil público verificado',
      'Recibir hasta 3 solicitudes/mes',
      'Speaker Score básico',
      'Badge de perfil verificado',
    ],
    cta: 'Crear mi perfil',
  },
  {
    tag: 'PARA ORGANIZADORES',
    name: 'Explorador',
    price: 'Gratis',
    period: '',
    desc: 'Descubre speakers para tu próximo evento.',
    includes: [
      'Acceso al directorio completo',
      'Ver perfiles y reels',
      '3 solicitudes al mes',
      'Lineup básico',
    ],
    cta: 'Comenzar Gratis',
  },
];

export default function ExmaPricingPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.fromTo('.exma-pp-card', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="exma-pp-section" id="pricing">
      <div ref={headRef} className="exma-pp-header">
        <p className="exma-pp-eyebrow">PLANES</p>
        <h2 className="exma-pp-headline exma-headline">Empieza gratis</h2>
        <p className="exma-pp-sub">Sin tarjeta de crédito. Sin compromisos. Crece cuando estés listo.</p>
      </div>

      <div className="exma-pp-grid">
        {previewCards.map((card) => (
          <div key={card.name} className="exma-pp-card">
            <p className="exma-pp-tag">{card.tag}</p>
            <div className="exma-pp-top">
              <h3 className="exma-pp-name exma-headline">{card.name}</h3>
              <span className="exma-pp-price exma-headline">{card.price}</span>
            </div>
            <p className="exma-pp-desc">{card.desc}</p>
            <div className="exma-pp-divider" />
            <ul className="exma-pp-list">
              {card.includes.map((item) => (
                <li key={item} className="exma-pp-item">
                  <span className="exma-pp-check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <button className="exma-pp-cta">{card.cta}</button>
          </div>
        ))}
      </div>

      <div className="exma-pp-more">
        <p className="exma-pp-more-text">¿Necesitas más? Tenemos planes Profesional, Elite y Enterprise.</p>
        <button className="exma-pp-more-link" onClick={() => navigate('/planes')}>
          Ver todos los planes →
        </button>
      </div>
    </section>
  );
}
