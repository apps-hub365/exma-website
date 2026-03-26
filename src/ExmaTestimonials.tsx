import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { quote: 'La mejor inversión que hemos hecho para nuestros eventos corporativos.', author: 'Laura Méndez', role: 'Events Director · Telefónica', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop' },
  { quote: 'Encontramos al speaker ideal en menos de 24 horas. Increíble plataforma.', author: 'Miguel Torres', role: 'CEO · TechLatam', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop' },
  { quote: 'María capturó totalmente a nuestro público. 96% de satisfacción en la evaluación.', author: 'Roberto Chen', role: 'CEO · ConferencePro', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop' },
  { quote: 'La certificación EXMA triplicó mis solicitudes de conferencias en 3 meses.', author: 'Ana García', role: 'Keynote Speaker', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
  { quote: 'El proceso fue simple. Contrato firmado en un día. Sin complicaciones.', author: 'Carlos Vega', role: 'Organizer · Forbes Summit LATAM', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop' },
  { quote: 'Mi Speaker Score pasó de 62 a 91 en 6 semanas. Los bookings se dispararon.', author: 'Sofia Reyes', role: 'AI Speaker', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop' },
  { quote: 'Transparencia total en precios y contratos. Exactamente lo que necesitábamos.', author: 'David Kim', role: 'Creative Director', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop' },
];

export default function ExmaTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((idx: number) => {
    const slide = slideRef.current;
    if (!slide) return;
    gsap.to(slide, {
      opacity: 0, y: -20, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        setCurrent(idx);
        gsap.fromTo(slide, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
      },
    });
  }, []);

  const next = useCallback(() => goTo((current + 1) % testimonials.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + testimonials.length) % testimonials.length), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [paused, next]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.exma-testi-headline', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const t = testimonials[current];

  return (
    <section
      ref={sectionRef}
      className="exma-testi-section"
      data-section="testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 className="exma-testi-headline exma-headline">
        Confiado por organizadores<br />y speakers.
      </h2>

      <div ref={slideRef} className="exma-testi-slide">
        <img src={t.avatar} alt={t.author} className="exma-testi-avatar" />
        <p className="exma-testi-quote">"{t.quote}"</p>
        <p className="exma-testi-author">{t.author}</p>
        <p className="exma-testi-role">{t.role}</p>
      </div>

      <div className="exma-testi-nav">
        <button className="exma-testi-arrow" onClick={prev}>←</button>
        <div className="exma-testi-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`exma-testi-dot ${i === current ? 'exma-testi-dot-active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button className="exma-testi-arrow" onClick={next}>→</button>
      </div>
    </section>
  );
}
