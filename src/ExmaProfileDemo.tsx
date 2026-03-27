import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExmaProfileDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      tl.fromTo(cardRef.current, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' })
        .from('.exma-profile-badge', { scale: 0.8, opacity: 0, stagger: 0.1, ease: 'back.out(1.7)', duration: 0.5 }, '-=0.3')
        .from('.exma-profile-star', { opacity: 0, stagger: 0.1, duration: 0.2 }, '-=0.2');

      // Score counter
      const counter = { val: 0 };
      gsap.to(counter, {
        val: 87,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => setScoreDisplay(Math.round(counter.val)),
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="exma-profile-section" data-section="profile">
      <p className="exma-profile-eyebrow exma-headline">Tu speaker de clase mundial.</p>

      <div ref={cardRef} className="exma-profile-card">
        <div className="exma-profile-left">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop"
            alt="María González"
            className="exma-profile-img"
          />
          <div className="exma-profile-badges">
            <span className="exma-profile-badge">Cert. EXMA</span>
            <span className="exma-profile-badge">TEDx Ready</span>
          </div>
        </div>

        <div className="exma-profile-right">
          <h2 className="exma-profile-name exma-headline">María González</h2>
          <p className="exma-profile-title">Experta en Liderazgo · Autora · Keynote Speaker</p>

          <div className="exma-profile-stars">
            {[1,2,3,4,5].map((s) => (
              <span key={s} className="exma-profile-star" style={{ color: s <= 4 ? '#facc15' : 'rgba(255,255,255,0.15)' }}>★</span>
            ))}
            <span className="exma-profile-rating">4.9 · 12 reseñas · 45+ eventos</span>
          </div>

          <div className="exma-profile-rates">
            <div className="exma-profile-rate-box">
              <span className="exma-profile-rate-label">Keynote</span>
              <span className="exma-profile-rate-val exma-headline">$5,000</span>
            </div>
            <div className="exma-profile-rate-box">
              <span className="exma-profile-rate-label">Virtual</span>
              <span className="exma-profile-rate-val exma-headline">$2,500</span>
            </div>
          </div>

          <div className="exma-profile-score-box">
            <span className="exma-profile-score-num exma-headline">{scoreDisplay}</span>
            <div>
              <span className="exma-profile-score-label">Speaker Score</span>
              <span className="exma-profile-score-sub">Rank #14 LATAM</span>
            </div>
          </div>

          <button className="exma-profile-cta">Contratar a María</button>
        </div>
      </div>
    </section>
  );
}
