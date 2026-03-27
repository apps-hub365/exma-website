import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 500, suffix: '+', label: 'Speakers' },
  { value: 50, suffix: '+', label: 'Países' },
  { value: 1, suffix: 'M+', label: 'Asistentes' },
];

export default function ExmaStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    stats.forEach((stat, i) => {
      const el = numberRefs.current[i];
      if (!el) return;

      const obj = { val: 0 };
      const tween = gsap.to(obj, {
        val: stat.value,
        duration: 2,
        ease: 'power2.out',
        snap: { val: 1 },
        onUpdate: () => {
          el.textContent = `${Math.floor(obj.val)}${stat.suffix}`;
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      if (tween.scrollTrigger) {
        triggers.push(tween.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="exma-stats-section">
      {stats.map((stat, i) => (
        <div key={i} style={{ display: 'contents' }}>
          {i > 0 && <div className="exma-stat-divider" />}
          <div className="exma-stat-item">
            <span
              ref={(el) => { numberRefs.current[i] = el; }}
              className="exma-stat-number exma-headline"
            >
              0{stat.suffix}
            </span>
            <span className="exma-stat-label">{stat.label}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
