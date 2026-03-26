import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const rows = [
  { time: '9:00 AM', speaker: 'María González', activity: 'Keynote Apertura · 60 min', rate: '$5,000', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop' },
  { time: '11:00 AM', speaker: 'Carlos Méndez', activity: 'Panel Innovación · 45 min', rate: '$3,500', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop' },
];

const statusBadges = ['Contrato firmado', 'Presupuesto en control', 'Confirmado'];

export default function ExmaLineupDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.exma-lineup-row', {
        y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="exma-lineup-section" data-section="lineup">
      <p className="exma-lineup-eyebrow">Dashboard de Evento</p>
      <h2 className="exma-lineup-headline exma-headline">Lineup del Evento.</h2>

      <div ref={cardRef} className="exma-lineup-card">
        <div className="exma-lineup-header">
          <span className="exma-lineup-col">Hora</span>
          <span className="exma-lineup-col">Speaker</span>
          <span className="exma-lineup-col">Actividad</span>
          <span className="exma-lineup-col exma-lineup-col-right">Tarifa</span>
        </div>

        {rows.map((row) => (
          <div key={row.time} className="exma-lineup-row">
            <span className="exma-lineup-time">{row.time}</span>
            <span className="exma-lineup-speaker">
              <img src={row.img} alt={row.speaker} className="exma-lineup-avatar" />
              {row.speaker}
            </span>
            <span className="exma-lineup-activity">{row.activity}</span>
            <span className="exma-lineup-rate">{row.rate}</span>
          </div>
        ))}

        <div className="exma-lineup-status">
          {statusBadges.map((b) => (
            <span key={b} className="exma-lineup-badge">✓ {b}</span>
          ))}
        </div>

        <div className="exma-lineup-total-row">
          <span className="exma-lineup-total-label">Total del evento</span>
          <span className="exma-lineup-total-val exma-headline">$8,500</span>
        </div>
      </div>
    </section>
  );
}
