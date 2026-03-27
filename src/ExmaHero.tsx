import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExmaHeroProps {
  onSpeakerClick: () => void;
}

const wordStyle: React.CSSProperties = {
  display: 'inline-block',
  opacity: 0,
  transform: 'translateY(32px)',
};

export default function ExmaHero({ onSpeakerClick }: ExmaHeroProps) {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (videoRef.current) {
        gsap.fromTo(videoRef.current, { scale: 1.05 }, { scale: 1, duration: 2, ease: 'power2.out' });
      }

      gsap.to('.exma-word', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.13,
        ease: 'power3.out',
        delay: 0.2,
      });

      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 1.5,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '80vh top',
        scrub: true,
        onUpdate: (self) => {
          if (self.progress > 0 && sectionRef.current) {
            gsap.set(sectionRef.current.querySelector('.exma-hero-content'), {
              y: self.progress * 60,
              opacity: 1 - self.progress * 0.8,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="exma-hero" data-section="hero">
      <video
        ref={videoRef}
        className="exma-hero-video"
        src={`${import.meta.env.BASE_URL}videos/exma-speakers-intro.mp4`}
        autoPlay
        muted
        loop
        playsInline
        style={{ pointerEvents: 'none' }}
      />
      <div className="exma-hero-overlay" />

      <div className="exma-hero-content">
        <h1 className="exma-hero-headline exma-headline">
          <span className="exma-hero-line">
            <span className="exma-word" style={wordStyle}>Conectamos</span>
            {' '}
            <span className="exma-word" style={wordStyle}>eventos</span>
          </span>
          <span className="exma-hero-line">
            <span className="exma-word" style={wordStyle}>con</span>
            {' '}
            <span className="exma-word" style={wordStyle}>la</span>
            {' '}
            <span className="exma-word" style={wordStyle}>voz</span>
            {' '}
            <span className="exma-word exma-hero-perfecta" style={wordStyle}>perfecta</span>
          </span>
        </h1>

        <div className="exma-hero-ctas">
          <a
            className="exma-hero-cta-primary"
            onClick={() => navigate('/speakers')}
            style={{ cursor: 'pointer' }}
          >
            Explorar Speakers
          </a>
          <button className="exma-hero-cta-secondary" onClick={onSpeakerClick}>
            Soy Speaker
          </button>
        </div>
      </div>

      <div ref={scrollIndicatorRef} className="exma-scroll-indicator">
        <div className="exma-scroll-line" />
        <span className="exma-scroll-text">SCROLL</span>
      </div>
    </section>
  );
}
