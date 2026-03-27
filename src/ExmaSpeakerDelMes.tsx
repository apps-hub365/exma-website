import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExmaSpeakerDelMes() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="exma-sotm-section" id="speaker-del-mes">
      <p className="exma-sotm-eyebrow">Reconocimiento EXMA</p>
      <h2 className="exma-sotm-headline exma-headline">Speaker del Mes</h2>

      <div ref={cardRef} className="exma-sotm-card">
        <div className="exma-sotm-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop"
            alt="María González"
            className="exma-sotm-img"
          />
          <div className="exma-sotm-badge">🏆 Marzo 2026</div>
        </div>
        <div className="exma-sotm-info">
          <h3 className="exma-sotm-name exma-headline">María González</h3>
          <p className="exma-sotm-role">Liderazgo · Mujeres en Negocios · Keynote Speaker</p>
          <p className="exma-sotm-quote">
            "El verdadero liderazgo no se trata de tener todas las respuestas, sino de hacer las preguntas correctas."
          </p>
          <div className="exma-sotm-stats">
            <div className="exma-sotm-stat">
              <span className="exma-sotm-stat-num exma-headline">45+</span>
              <span className="exma-sotm-stat-label">Eventos</span>
            </div>
            <div className="exma-sotm-stat">
              <span className="exma-sotm-stat-num exma-headline">4.9</span>
              <span className="exma-sotm-stat-label">Rating</span>
            </div>
            <div className="exma-sotm-stat">
              <span className="exma-sotm-stat-num exma-headline">87</span>
              <span className="exma-sotm-stat-label">Score</span>
            </div>
          </div>
          <button className="exma-sotm-cta">Ver perfil completo</button>
        </div>
      </div>
    </section>
  );
}
