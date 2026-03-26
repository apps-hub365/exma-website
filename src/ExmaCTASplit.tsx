import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExmaCTASplit() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([leftRef.current, rightRef.current], { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleEnter = (side: 'left' | 'right') => {
    gsap.to(leftRef.current, { flexGrow: side === 'left' ? 1.4 : 0.6, duration: 0.5, ease: 'power3.out' });
    gsap.to(rightRef.current, { flexGrow: side === 'right' ? 1.4 : 0.6, duration: 0.5, ease: 'power3.out' });
  };

  const handleLeave = () => {
    gsap.to([leftRef.current, rightRef.current], { flexGrow: 1, duration: 0.5, ease: 'power3.out' });
  };

  return (
    <section ref={sectionRef} className="exma-ctasplit-section" data-section="cta-split">
      <div
        ref={leftRef}
        className="exma-ctasplit-half exma-ctasplit-left"
        onMouseEnter={() => handleEnter('left')}
        onMouseLeave={handleLeave}
      >
        <div className="exma-ctasplit-overlay" />
        <img src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" alt="" className="exma-ctasplit-bg" />
        <div className="exma-ctasplit-content">
          <h2 className="exma-ctasplit-headline exma-headline">¿Tienes un mensaje?</h2>
          <button className="exma-ctasplit-cta" onClick={() => navigate('/become-a-speaker')}>Soy Speaker</button>
        </div>
      </div>

      <div
        ref={rightRef}
        className="exma-ctasplit-half exma-ctasplit-right"
        onMouseEnter={() => handleEnter('right')}
        onMouseLeave={handleLeave}
      >
        <div className="exma-ctasplit-overlay" />
        <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop" alt="" className="exma-ctasplit-bg" />
        <div className="exma-ctasplit-content">
          <h2 className="exma-ctasplit-headline exma-headline">¿Buscas un speaker?</h2>
          <button className="exma-ctasplit-cta">Soy Organizador</button>
        </div>
      </div>
    </section>
  );
}
