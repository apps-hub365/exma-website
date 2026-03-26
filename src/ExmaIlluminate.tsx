import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORDS = ['SPEEKERS', 'THAT', 'MOVE', 'THE', 'WORLD'];

export default function ExmaIlluminate() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setear color inicial oscuro en todas las palabras
      wordsRef.current.forEach((word) => {
        if (word) gsap.set(word, { color: 'rgba(255,255,255,0.08)' });
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'top 10%',
        scrub: true,
        onUpdate: (self) => {
          const total = WORDS.length;
          wordsRef.current.forEach((word, i) => {
            if (!word) return;
            // Cada palabra ocupa 1/total del recorrido
            const wordStart = i / total;
            const wordEnd = (i + 1) / total;
            const wordProgress = Math.min(1, Math.max(0, (self.progress - wordStart) / (wordEnd - wordStart)));
            const alpha = 0.08 + wordProgress * 0.92;
            gsap.set(word, { color: `rgba(255,255,255,${alpha})` });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="exma-illuminate" data-section="illuminate">
        <div className="exma-illuminate-inner">
          <p className="exma-illuminate-badge">La plataforma #1 de speekers en Latam</p>
          <div className="exma-illuminate-words-row">
            {WORDS.map((word, i) => (
              <span
                key={word}
                ref={(el) => { wordsRef.current[i] = el; }}
                className="exma-illuminate-word"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
