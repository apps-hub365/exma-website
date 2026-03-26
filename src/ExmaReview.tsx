import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'Asistentes', end: 800, suffix: '' },
  { label: 'Satisfacción', end: 96, suffix: '%' },
  { label: 'vs. anterior', end: 12, suffix: '%', prefix: '+' },
];

export default function ExmaReview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState([0, 0, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.exma-review-quote-mark', { scale: 0.5, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.fromTo('.exma-review-text', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.fromTo('.exma-review-author', { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, delay: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      stats.forEach((stat, i) => {
        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.end,
          duration: 1.4,
          delay: i * 0.15,
          ease: 'power2.out',
          onUpdate() {
            setCounts((prev) => {
              const next = [...prev];
              next[i] = Math.round(counter.val);
              return next;
            });
          },
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="exma-review-section" data-section="review">
      <div className="exma-review-inner">
        <span className="exma-review-quote-mark exma-headline">"</span>
        <p className="exma-review-text">
          María capturó totalmente a nuestro público.<br />
          Personalizó la charla. Muy recomendada.
        </p>
        <p className="exma-review-author">Roberto Chen, CEO · ConferencePro</p>

        <div className="exma-review-stats">
          {stats.map((stat, i) => (
            <div key={stat.label} className="exma-review-stat">
              <span className="exma-review-stat-num exma-headline">
                {stat.prefix}{counts[i]}{stat.suffix}
              </span>
              <span className="exma-review-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
