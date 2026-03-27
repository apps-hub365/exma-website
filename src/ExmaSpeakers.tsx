import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { speakersMock } from './data/speakers.mock';

gsap.registerPlugin(ScrollTrigger);

const featured = {
  name: 'María González',
  role: 'Liderazgo · Mujeres en Negocios · Keynote Speaker',
  quote: '"El verdadero liderazgo no se trata de tener todas las respuestas, sino de hacer las preguntas correctas."',
  img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=900&fit=crop',
  month: 'Marzo 2026',
  stats: [
    { num: '45+', label: 'Eventos' },
    { num: '4.9', label: 'Rating' },
    { num: '87', label: 'Score' },
  ],
};

export default function ExmaSpeakers() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Featured card entrance
      if (featuredRef.current) {
        gsap.fromTo(featuredRef.current, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: featuredRef.current, start: 'top 75%' },
        });
      }

      // Grid cards entrance
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      gsap.fromTo(cards, { y: 100, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
      });

      // Hover effects
      const handlers: Array<{ el: HTMLDivElement; enter: () => void; leave: () => void }> = [];
      cards.forEach((card) => {
        const img = card.querySelector('img');
        const info = card.querySelector('.exma-card-info');
        const enter = () => {
          if (img) gsap.to(img, { scale: 1.05, duration: 0.6, ease: 'power2.out' });
          if (info) gsap.to(info, { y: -8, duration: 0.4 });
        };
        const leave = () => {
          if (img) gsap.to(img, { scale: 1, duration: 0.4 });
          if (info) gsap.to(info, { y: 0, duration: 0.4 });
        };
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
    <section ref={sectionRef} className="exma-speakers-section" id="speaker-del-mes">
      <h2 className="exma-speakers-title exma-headline">Nuestros Speakers</h2>

      {/* Speaker del Mes — Featured */}
      <div ref={featuredRef} className="exma-featured-card">
        <div className="exma-featured-img-wrap">
          <img src={featured.img} alt={featured.name} className="exma-featured-img" />
          <div className="exma-featured-badge">Speaker del Mes</div>
        </div>
        <div className="exma-featured-info">
          <span className="exma-featured-month">{featured.month}</span>
          <h3 className="exma-featured-name exma-headline">{featured.name}</h3>
          <p className="exma-featured-role">{featured.role}</p>
          <p className="exma-featured-quote">{featured.quote}</p>
          <div className="exma-featured-stats">
            {featured.stats.map((s) => (
              <div key={s.label} className="exma-featured-stat">
                <span className="exma-featured-stat-num exma-headline">{s.num}</span>
                <span className="exma-featured-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <button className="exma-featured-cta">Ver perfil completo</button>
        </div>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="exma-speakers-grid">
        {speakersMock.map((speaker, i) => (
          <Link key={speaker.id} to={`/speaker/${speaker.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
              ref={(el) => { cardsRef.current[i] = el; }}
              className="exma-card-wrapper"
              data-cursor="play"
            >
              <img src={speaker.img} alt={speaker.nombre} loading="lazy" />
              <div className="exma-card-overlay" />
              <div className="exma-card-info">
                <h3 className="exma-card-name exma-headline">{speaker.nombre}</h3>
                <p className="exma-card-topic">{speaker.tema}</p>
                <p className="exma-card-country">{speaker.pais}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0 1rem' }}>
      </div>
    </section>
  );
}
