import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { num: '01', title: 'Certificación Global', body: 'Obtén el certificado EXMA reconocido en toda Latinoamérica y España.' },
  { num: '02', title: 'Acceso a +3,000 Eventos', body: 'Tu perfil visible para miles de organizadores que buscan speekers cada día.' },
  { num: '03', title: 'Monetización Real', body: 'Establece tus tarifas, negocia y cobra de forma segura desde la plataforma.' },
  { num: '04', title: 'Red de Speekers Elite', body: 'Conecta, aprende y colabora con los mejores speekers de la región.' },
  { num: '05', title: 'Training con los Mejores', body: 'Programas de formación con referentes del mundo del conocimiento.' },
  { num: '06', title: 'Dashboard Profesional', body: 'Controla tus estadísticas, agenda y reputación desde un solo lugar.' },
];

export default function ExmaConnectTabs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.exma-career-animate',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="exma-connect-section" data-section="career">

      {/* Animated wave layers — top */}
      <div className="exma-wave-wrap">
        <svg className="exma-wave-svg exma-wave-layer-3" viewBox="0 0 2880 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C120,90 240,30 360,60 C480,90 600,30 720,60 C840,90 960,30 1080,60 C1200,90 1320,30 1440,60 C1560,90 1680,30 1800,60 C1920,90 2040,30 2160,60 C2280,90 2400,30 2520,60 C2640,90 2760,30 2880,60 L2880,120 L0,120 Z" fill="rgba(246,8,247,0.25)" />
        </svg>
        <svg className="exma-wave-svg exma-wave-layer-2" viewBox="0 0 2880 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 C180,85 360,15 540,50 C720,85 900,15 1080,50 C1260,85 1440,15 1620,50 C1800,85 1980,15 2160,50 C2340,85 2520,15 2700,50 C2880,85 2880,50 2880,50 L2880,120 L0,120 Z" fill="rgba(246,8,247,0.55)" />
        </svg>
        <svg className="exma-wave-svg exma-wave-layer-1" viewBox="0 0 2880 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,70 C160,100 320,40 480,70 C640,100 800,40 960,70 C1120,100 1280,40 1440,70 C1600,100 1760,40 1920,70 C2080,100 2240,40 2400,70 C2560,100 2720,40 2880,70 L2880,120 L0,120 Z" fill="#F608F7" />
        </svg>
      </div>

      {/* Header */}
      <div className="exma-career-header">
        <p className="exma-career-eyebrow exma-career-animate">EXMA Speakers Platform</p>
        <h2 className="exma-career-headline exma-headline exma-career-animate">
          Tu carrera como speeker.
        </h2>
        <h2 className="exma-career-headline exma-career-headline-italic exma-headline exma-career-animate">
          Siguiente nivel.
        </h2>
      </div>

      {/* Features grid */}
      <div className="exma-career-grid">
        {features.map((f) => (
          <div key={f.num} className="exma-career-card exma-career-animate">
            <span className="exma-career-num">{f.num}</span>
            <h3 className="exma-career-card-title">{f.title}</h3>
            <p className="exma-career-card-body">{f.body}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="exma-career-cta-wrap exma-career-animate">
        <button className="exma-career-cta">Comenzar mi carrera</button>
      </div>

      {/* Animated wave layers — bottom (inverted) */}
      <div className="exma-wave-wrap exma-wave-wrap-bottom">
        <svg className="exma-wave-svg exma-wave-layer-3" viewBox="0 0 2880 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C120,90 240,30 360,60 C480,90 600,30 720,60 C840,90 960,30 1080,60 C1200,90 1320,30 1440,60 C1560,90 1680,30 1800,60 C1920,90 2040,30 2160,60 C2280,90 2400,30 2520,60 C2640,90 2760,30 2880,60 L2880,120 L0,120 Z" fill="rgba(246,8,247,0.25)" />
        </svg>
        <svg className="exma-wave-svg exma-wave-layer-2" viewBox="0 0 2880 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 C180,85 360,15 540,50 C720,85 900,15 1080,50 C1260,85 1440,15 1620,50 C1800,85 1980,15 2160,50 C2340,85 2520,15 2700,50 C2880,85 2880,50 2880,50 L2880,120 L0,120 Z" fill="rgba(246,8,247,0.55)" />
        </svg>
        <svg className="exma-wave-svg exma-wave-layer-1" viewBox="0 0 2880 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,70 C160,100 320,40 480,70 C640,100 800,40 960,70 C1120,100 1280,40 1440,70 C1600,100 1760,40 1920,70 C2080,100 2240,40 2400,70 C2560,100 2720,40 2880,70 L2880,120 L0,120 Z" fill="#F608F7" />
        </svg>
      </div>

    </section>
  );
}
