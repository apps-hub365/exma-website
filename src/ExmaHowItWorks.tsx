import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '1.',
    title: 'Busca y filtra',
    body: '+1,200 speakers. Búsqueda con IA por tema, idioma, tarifa, país. Encuentra al speaker perfecto en segundos.',
    img: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=700&h=500&fit=crop',
  },
  {
    num: '2.',
    title: 'Revisa y compara',
    body: 'Videos, reseñas verificadas, eventos pasados. Tarifas transparentes. Speaker Score con IA para tomar mejores decisiones.',
    img: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=700&h=500&fit=crop',
  },
  {
    num: '3.',
    title: 'Contrata y gestiona',
    body: 'Contratos digitales. Dashboard completo. Nosotros manejamos la logística, pagos y coordinación.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&h=500&fit=crop',
  },
];

export default function ExmaHowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const total = steps.length;

      // Hide all except first
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i > 0) gsap.set(el, { opacity: 0, y: 60 });
      });
      imgRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i > 0) gsap.set(el, { opacity: 0, y: 60 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${(total - 1) * 100}%`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < total - 1; i++) {
        // Out: current text + image
        tl.to(textRefs.current[i], { opacity: 0, y: -60, duration: 0.5 }, `s${i}`);
        tl.to(imgRefs.current[i], { opacity: 0, y: -60, duration: 0.5 }, `s${i}`);

        // In: next text + image
        tl.fromTo(textRefs.current[i + 1],
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.5 },
          `s${i}+=0.25`
        );
        tl.fromTo(imgRefs.current[i + 1],
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.5 },
          `s${i}+=0.25`
        );


        // Breathing room between steps
        if (i < total - 2) {
          tl.to({}, { duration: 0.3 });
        }
      }

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="exma-how-section" data-section="how" id="how">
      <div className="exma-how-screen">
        <div className="exma-how-left">
          <div className="exma-how-text-area">
            {steps.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => { textRefs.current[i] = el; }}
                className="exma-how-text"
              >
                <h3 className="exma-how-title exma-headline">{step.title}</h3>
                <p className="exma-how-body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="exma-how-right">
          {steps.map((step, i) => (
            <img
              key={step.num}
              ref={(el) => { imgRefs.current[i] = el; }}
              src={step.img}
              alt={step.title}
              className="exma-how-img"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
