import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

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

export default function ExmaPlanes() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'speakers' | 'organizadores'>('speakers');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    gsap.fromTo('.exma-planes-card', { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power3.out',
    });
  }, [tab]);

  const plans = tab === 'speakers' ? speakerPlans : organizerPlans;

  return (
    <div className="exma-page-wrapper exma-planes-page">
      {/* Nav */}
      <nav className="exma-nav exma-nav-scrolled">
        <a className="exma-nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={`${import.meta.env.BASE_URL}exma-speakers-logo.svg`} alt="EXMA" className="exma-logo-img" />
        </a>
        <div className="exma-nav-right">
          <button className="exma-nav-login" onClick={() => navigate('/')}>← Inicio</button>
          <button className="exma-nav-cta" onClick={() => navigate('/become-a-speaker')}>
            Quiero ser Speaker
          </button>
        </div>
      </nav>

      {/* Header */}
      <div className="exma-planes-header">
        <p className="exma-planes-eyebrow">Precios</p>
        <h1 className="exma-planes-title exma-headline">Planes</h1>
        <p className="exma-planes-sub">Sin costos ocultos. Sin letra pequeña. Cancela cuando quieras.</p>

        {/* Tabs */}
        <div className="exma-planes-tabs">
          <button
            className={`exma-planes-tab ${tab === 'speakers' ? 'exma-planes-tab-active' : ''}`}
            onClick={() => setTab('speakers')}
          >
            Para Speakers
          </button>
          <button
            className={`exma-planes-tab ${tab === 'organizadores' ? 'exma-planes-tab-active' : ''}`}
            onClick={() => setTab('organizadores')}
          >
            Para Organizadores
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="exma-planes-grid">
        {plans.map((plan) => (
          <div
            key={`${tab}-${plan.name}`}
            className={`exma-planes-card ${plan.featured ? 'exma-planes-card-featured' : ''}`}
          >
            {plan.featured && <span className="exma-planes-badge">Más popular</span>}
            <p className="exma-planes-plan-name exma-headline">{plan.name}</p>
            <div className="exma-planes-price-row">
              <span className="exma-planes-price exma-headline">{plan.price}</span>
              {plan.period && <span className="exma-planes-period">{plan.period}</span>}
            </div>
            <p className="exma-planes-desc">{plan.desc}</p>
            <div className="exma-planes-divider" />
            <ul className="exma-planes-list">
              {plan.includes.map((item) => (
                <li key={item} className="exma-planes-item">
                  <span className="exma-planes-check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <button className={`exma-planes-cta ${plan.featured ? 'exma-planes-cta-featured' : ''}`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ link */}
      <div className="exma-planes-bottom">
        <p className="exma-planes-bottom-text">¿Tienes dudas? <a onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#F608F7' }}>Consulta nuestras preguntas frecuentes</a></p>
      </div>

      <footer className="exma-footer">
        © 2026 EXMA Speakers — Powered by Hub365.AI
      </footer>
    </div>
  );
}
