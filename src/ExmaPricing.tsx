import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const speakerPlans = [
  {
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
    featured: false,
  },
  {
    name: 'Profesional',
    price: '$29',
    period: '/mes',
    desc: 'Para speakers que quieren crecer y monetizar.',
    includes: [
      'Todo lo del plan Básico',
      'Solicitudes ilimitadas',
      'Speaker Score avanzado con IA',
      'Analytics de perfil',
      'Gestión de agenda',
      'Cobros seguros por la plataforma',
      'Certificación EXMA disponible',
      'Soporte prioritario',
    ],
    cta: 'Prueba 14 días gratis',
    featured: true,
  },
  {
    name: 'Elite',
    price: '$79',
    period: '/mes',
    desc: 'Para speakers de alto nivel que dominan escenarios.',
    includes: [
      'Todo lo del plan Profesional',
      'Posicionamiento destacado',
      'Manager de cuenta dedicado',
      'Acceso a eventos exclusivos',
      'Training con referentes',
      'Badge Elite verificado',
    ],
    cta: 'Contactar ventas',
    featured: false,
  },
];

const organizerPlans = [
  {
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
    featured: false,
  },
  {
    name: 'Organizador Pro',
    price: '$49',
    period: '/mes',
    desc: 'Herramientas completas para eventos de alto impacto.',
    includes: [
      'Todo lo del plan Explorador',
      'Solicitudes ilimitadas',
      'Búsqueda avanzada con IA',
      'Contratos digitales',
      'Gestor completo de lineup',
      'Tracking de presupuesto',
      'Analytics e informes',
      'Soporte prioritario 24/7',
    ],
    cta: 'Prueba 14 días gratis',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Para empresas con múltiples eventos al año.',
    includes: [
      'Todo lo del plan Pro',
      'Múltiples usuarios',
      'API de integración',
      'Account manager dedicado',
      'Facturación corporativa',
      'SLA garantizado',
    ],
    cta: 'Contactar ventas',
    featured: false,
  },
];

export default function ExmaPricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [tab, setTab] = useState<'speakers' | 'organizadores'>('speakers');

  const plans = tab === 'speakers' ? speakerPlans : organizerPlans;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate cards on tab change
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    gsap.fromTo(cards, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power3.out',
    });
  }, [tab]);

  return (
    <section ref={sectionRef} className="exma-pricing-section" data-section="pricing" id="pricing">
      <div ref={headRef} className="exma-pricing-header">
        <p className="exma-pricing-eyebrow">Precios</p>
        <h2 className="exma-pricing-headline exma-headline">Planes</h2>
        <p className="exma-pricing-sub">Sin costos ocultos. Sin letra pequeña. Cancela cuando quieras.</p>

        {/* Tabs */}
        <div className="exma-pricing-tabs">
          <button
            className={`exma-pricing-tab ${tab === 'speakers' ? 'exma-pricing-tab-active' : ''}`}
            onClick={() => setTab('speakers')}
          >
            Para Speakers
          </button>
          <button
            className={`exma-pricing-tab ${tab === 'organizadores' ? 'exma-pricing-tab-active' : ''}`}
            onClick={() => setTab('organizadores')}
          >
            Para Organizadores
          </button>
        </div>
      </div>

      <div className="exma-pricing-grid">
        {plans.map((plan, i) => (
          <div
            key={`${tab}-${plan.name}`}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`exma-pricing-card ${plan.featured ? 'exma-pricing-card-featured' : ''}`}
          >
            {plan.featured && <span className="exma-pricing-badge">Más popular</span>}
            <div className="exma-pricing-card-top">
              <p className="exma-pricing-plan-name exma-headline">{plan.name}</p>
              <div className="exma-pricing-price-row">
                <span className="exma-pricing-price exma-headline">{plan.price}</span>
                {plan.period && <span className="exma-pricing-period">{plan.period}</span>}
              </div>
              <p className="exma-pricing-desc">{plan.desc}</p>
            </div>
            <div className="exma-pricing-divider" />
            <ul className="exma-pricing-list">
              {plan.includes.map((item) => (
                <li key={item} className="exma-pricing-item">
                  <span className="exma-pricing-check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <button className={`exma-pricing-cta ${plan.featured ? 'exma-pricing-cta-featured' : ''}`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
