import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const filters = ['Todos', 'Liderazgo', 'Tecnología', '$0–$5K', 'Certificados'];
const results = [
  { name: 'María González', spec: 'Liderazgo · Mujeres en Negocios', score: 87, rate: '$5K+', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
  { name: 'Carlos Méndez', spec: 'Transformación Digital', score: 74, rate: '$3.5K+', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop' },
  { name: 'Ana Torres', spec: 'Alto Rendimiento', score: 92, rate: '$7K+', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop' },
];
const SEARCH_TEXT = 'Liderazgo e Innovación';

const scoreColor = (s: number) => s >= 85 ? '#4ade80' : s >= 70 ? '#facc15' : '#f87171';

export default function ExmaMockupSearch() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('');
  const [activeFilter, setActiveFilter] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      tl.fromTo(cardRef.current, { scale: 0.92, y: 40, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' });
    }, sectionRef);

    // Typewriter after card animates
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(SEARCH_TEXT.slice(0, i + 1));
        i++;
        if (i >= SEARCH_TEXT.length) clearInterval(interval);
      }, 55);
      return () => clearInterval(interval);
    }, 1400);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  // 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, { rotateX: -y * 4, rotateY: x * 4, duration: 0.4, ease: 'power2.out', transformPerspective: 1000 });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
  };

  return (
    <section ref={sectionRef} className="exma-mockup-section" data-section="mockup">
      <p className="exma-mockup-eyebrow">Búsqueda Inteligente</p>
      <h2 className="exma-mockup-headline exma-headline">Encuentra al speeker ideal.</h2>

      <div
        ref={cardRef}
        className="exma-mockup-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Search bar */}
        <div className="exma-mockup-search">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.35)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <span className="exma-mockup-search-text">{typedText}</span>
          <span className="exma-mockup-search-cursor">|</span>
        </div>

        {/* Filters */}
        <div className="exma-mockup-filters">
          {filters.map((f, i) => (
            <button
              key={f}
              className={`exma-mockup-filter ${activeFilter === i ? 'exma-mockup-filter-active' : ''}`}
              onClick={() => setActiveFilter(i)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="exma-mockup-results">
          {results.map((r) => (
            <div key={r.name} className="exma-mockup-row">
              <img src={r.img} alt={r.name} className="exma-mockup-avatar" />
              <div className="exma-mockup-row-info">
                <span className="exma-mockup-row-name">{r.name}</span>
                <span className="exma-mockup-row-spec">{r.spec}</span>
              </div>
              <span className="exma-mockup-score" style={{ color: scoreColor(r.score) }}>{r.score}</span>
              <span className="exma-mockup-rate">{r.rate}</span>
            </div>
          ))}
        </div>

        <p className="exma-mockup-note">48 de 1,200+ speekers</p>
      </div>
    </section>
  );
}
