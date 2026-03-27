import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { quote: 'La mejor inversión que hemos hecho para nuestros eventos corporativos.', author: 'Laura Méndez', role: 'Events Director · Telefónica', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=800&fit=crop' },
  { quote: 'Encontramos al speaker ideal en menos de 24 horas. Increíble plataforma.', author: 'Miguel Torres', role: 'CEO · TechLatam', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop' },
  { quote: 'María capturó totalmente a nuestro público. 96% de satisfacción.', author: 'Roberto Chen', role: 'CEO · ConferencePro', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop' },
  { quote: 'La certificación EXMA triplicó mis solicitudes de conferencias en 3 meses.', author: 'Ana García', role: 'Keynote Speaker', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop' },
  { quote: 'El proceso fue simple. Contrato firmado en un día. Sin complicaciones.', author: 'Carlos Vega', role: 'Organizer · Forbes Summit LATAM', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop' },
];

export default function ExmaTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((idx: number) => {
    const slide = slideRef.current;
    if (!slide) return;
    gsap.to(slide, {
      opacity: 0, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        setCurrent(idx);
        gsap.to(slide, { opacity: 1, duration: 0.3, ease: 'power3.out' });
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

  // Scroll: circle expands, info fades in over image
  useEffect(() => {
    const section = sectionRef.current;
    const circle = circleRef.current;
    const info = infoRef.current;
    if (!section || !circle || !info) return;

    const ctx = gsap.context(() => {
      // Headline entrance
      gsap.fromTo('.exma-testi-headline', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%' },
      });

      // Circle expand + info overlay on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 30%',
          end: 'top -10%',
          scrub: 1,
        },
      });

      // Circle: from small circle to full container
      tl.fromTo(circle,
        { width: '180px', height: '180px', borderRadius: '50%' },
        { width: '100%', height: '500px', borderRadius: '20px', duration: 1 },
        0
      );

      // Info: fade in and slide up
      tl.fromTo(info,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.5
      );
    }, section);

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

      <div className="exma-testi-stage">
        {/* Expanding circle/image */}
        <div ref={circleRef} className="exma-testi-circle">
          <img src={t.avatar} alt={t.author} className="exma-testi-bg-img" />
          <div className="exma-testi-bg-overlay" />

          {/* Info overlaid on expanded image */}
          <div ref={infoRef} className="exma-testi-overlay-info" style={{ opacity: 0 }}>
            <div ref={slideRef}>
              <p className="exma-testi-quote">"{t.quote}"</p>
              <p className="exma-testi-author">{t.author}</p>
              <p className="exma-testi-role">{t.role}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
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
      </div>
    </section>
  );
}
