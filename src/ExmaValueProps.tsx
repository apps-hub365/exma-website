import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { num: '01', title: 'Talento global', body: 'Accede a +30K speakers certificados en todo el mundo. Sin fronteras, sin barreras. El talento perfecto para tu evento, esté donde esté.', img: 'https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?w=600&h=400&fit=crop' },
  { num: '02', title: 'Decisiones con datos', body: 'Cada speaker tiene un score basado en datos reales: reseñas, impacto, engagement. Predice resultados antes de contratar.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop' },
  { num: '03', title: 'Sin costos ocultos', body: 'Tarifa fija desde el inicio. Sin comisiones sorpresa, sin letra pequeña. Lo que ves es lo que pagas.', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop' },
  { num: '04', title: 'Presupuesto optimizado', body: 'Compara precios en segundos. Encuentra speakers de clase mundial que se ajustan a tu presupuesto real.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop' },
  { num: '05', title: 'Sin complicaciones', body: 'Un solo contrato, un solo punto de contacto. Nosotros gestionamos todo: logística, pagos y coordinación.', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop' },
  { num: '06', title: 'Pagos seguros', body: 'Tu dinero está protegido hasta que el evento se realice. Garantía de satisfacción o te devolvemos el pago.', img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop' },
];

export default function ExmaValueProps() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const ctx = gsap.context(() => {
      // Headline entrance
      gsap.fromTo(headRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%' },
      });

      // Horizontal scroll pinned
      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=' + totalScroll,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="exma-value-section" data-section="value">
      <h2 ref={headRef} className="exma-value-headline exma-headline">¿Por qué Speakers?</h2>
      <div className="exma-value-track" ref={trackRef}>
        {cards.map((card) => (
          <div key={card.num} className="exma-value-card">
            <div className="exma-value-card-text">
              <h3 className="exma-value-card-title exma-headline">{card.title}</h3>
              <p className="exma-value-card-body">{card.body}</p>
            </div>
            <img src={card.img} alt={card.title} className="exma-value-card-img" />
          </div>
        ))}
      </div>
    </section>
  );
}
