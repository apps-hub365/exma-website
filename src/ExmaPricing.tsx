import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Organizador',
    price: 'Gratis',
    desc: 'Explora la plataforma.',
    includes: ['Directorio completo', 'Ver perfiles y reels', '3 solicitudes/mes', 'Constructor básico de lineup'],
    cta: 'Comenzar Gratis',
    recommended: false,
  },
  {
    name: 'Speaker',
    price: 'Gratis',
    desc: 'Para speakers profesionales.',
    includes: ['Solicitudes ilimitadas', 'Búsqueda con IA', 'Contratos digitales', 'Gestor de lineup completo', 'Tracking de presupuesto', 'Analytics e informes', 'Soporte prioritario 24h'],
    cta: 'Comenzar Gratis',
    recommended: true,
  },
];

export default function ExmaPricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.fromTo(cardRefs.current.filter(Boolean), { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.addEventListener('mouseenter', () => gsap.to(card, { y: -6, duration: 0.3 }));
        card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, duration: 0.3 }));
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="exma-pricing-section" data-section="pricing" id="pricing">
      <h2 ref={headRef} className="exma-pricing-headline exma-headline">Precios simples.</h2>
      <p className="exma-pricing-sub">Sin costos ocultos. Sin sorpresas.</p>

      <div className="exma-pricing-grid">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`exma-pricing-card ${plan.recommended ? 'exma-pricing-card-featured' : ''}`}
          >
            {plan.recommended && <span className="exma-pricing-badge">Recomendado</span>}
            <p className="exma-pricing-plan-name exma-headline">{plan.name}</p>
            <p className="exma-pricing-price exma-headline">{plan.price}</p>
            <p className="exma-pricing-desc">{plan.desc}</p>
            <ul className="exma-pricing-list">
              {plan.includes.map((item) => (
                <li key={item} className="exma-pricing-item">
                  <span className="exma-pricing-check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <button className="exma-pricing-cta">{plan.cta}</button>
          </div>
        ))}
      </div>

      <a href="#" className="exma-pricing-link">Ver todos los planes →</a>
    </section>
  );
}
