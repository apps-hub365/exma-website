import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { speakersMock } from './data/speakers.mock';

gsap.registerPlugin(ScrollTrigger);

export default function ExmaSpeakers() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    ScrollTrigger.refresh();

    const enterAnim = gsap.fromTo(
      cards,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      }
    );

    const handlers: Array<{ el: HTMLDivElement; enter: () => void; leave: () => void }> = [];

    cards.forEach((card) => {
      const img = card.querySelector('img');
      const info = card.querySelector('.exma-card-info');

      const enter = () => {
        if (img) gsap.to(img, { scale: 1.05, duration: 0.6, ease: 'power2.out' });
        if (info) gsap.to(info, { y: -8, duration: 0.4 });
      };

      const leave = () => {
        if (img) gsap.to(img, { scale: 1, duration: 0.4 });
        if (info) gsap.to(info, { y: 0, duration: 0.4 });
      };

      card.addEventListener('mouseenter', enter);
      card.addEventListener('mouseleave', leave);
      handlers.push({ el: card, enter, leave });
    });

    return () => {
      handlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
      if (enterAnim.scrollTrigger) enterAnim.scrollTrigger.kill();
    };
  }, []);

  return (
    <section className="exma-speakers-section">
      <h2 className="exma-speakers-title exma-headline">Our Speakers</h2>
      <div ref={gridRef} className="exma-speakers-grid">
        {speakersMock.map((speaker, i) => (
          <Link
            key={speaker.id}
            to={`/speaker/${speaker.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              ref={(el) => { cardsRef.current[i] = el; }}
              className="exma-card-wrapper"
              data-cursor="play"
            >
              <img src={speaker.img} alt={speaker.nombre} loading="lazy" />
              <div className="exma-card-overlay" />
              <div className="exma-card-info">
                <h3 className="exma-card-name exma-headline">{speaker.nombre}</h3>
                <p className="exma-card-topic">{speaker.tema}</p>
                <p className="exma-card-country">{speaker.pais}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
