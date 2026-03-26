import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { speakersMock } from './data/speakers.mock';
import ExmaCursor from './ExmaCursor';
import './speaker-detail.css';

gsap.registerPlugin(ScrollTrigger);

const countryFlags: Record<string, string> = {
  'México': '🇲🇽',
  'Colombia': '🇨🇴',
  'Argentina': '🇦🇷',
  'Chile': '🇨🇱',
  'Perú': '🇵🇪',
  'España': '🇪🇸',
};

function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconVolume() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function IconMute() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

export default function SpeakerDetail() {
  const { id } = useParams<{ id: string }>();
  const speaker = speakersMock.find((s) => s.id === id);
  const pageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    if (!speaker) return;

    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);
    const rafCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCb);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.from('.spk-word', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3,
      });

      gsap.from('.spk-hero-titulo, .spk-hero-pais', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.7,
      });

      gsap.from('.spk-bio-paragraph', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.spk-bio-section',
          start: 'top 75%',
        },
      });

      gsap.to('.spk-bio-portrait', {
        y: -40,
        scrollTrigger: {
          trigger: '.spk-bio-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.from('.spk-tema-item', {
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.spk-temas-section',
          start: 'top 75%',
        },
      });

      gsap.from('.spk-cta-title .spk-char', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.spk-cta-section',
          start: 'top 75%',
        },
      });
    }, pageRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(rafCb);
      lenis.destroy();
    };
  }, [speaker]);

  if (!speaker) {
    return (
      <div className="spk-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '3rem', marginBottom: '1rem' }}>Speaker no encontrado</h1>
          <Link to="/" className="spk-back" style={{ position: 'relative', top: 'auto', left: 'auto' }}>← Back</Link>
        </div>
      </div>
    );
  }

  const ctaText = `¿Quieres a ${speaker.nombre} en tu evento?`;

  return (
    <div ref={pageRef} className="spk-page">
      <ExmaCursor />

      {/* ── HERO VIDEO ── */}
      <section className="spk-hero">
        <video
          ref={videoRef}
          className="spk-hero-video"
          src={speaker.videoConferencia}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="spk-hero-overlay" />

        <Link to="/" className="spk-back" data-cursor="hover">← Back</Link>

        <div className="spk-hero-content">
          <h1 className="spk-hero-name">
            {speaker.nombre.split(' ').map((word, i) => (
              <span key={i} className="spk-word">{word}</span>
            ))}
          </h1>
          <p className="spk-hero-titulo">{speaker.titulo}</p>
          <p className="spk-hero-pais">{countryFlags[speaker.pais] || ''} {speaker.pais}</p>
        </div>

        <button className="spk-mute-btn" onClick={toggleMute} data-cursor="hover">
          {muted ? <IconMute /> : <IconVolume />}
        </button>

        <div className="spk-hero-scroll">
          <div className="spk-hero-scroll-line" />
          <span className="spk-hero-scroll-text">Scroll</span>
        </div>
      </section>

      {/* ── BIO ── */}
      <section className="spk-bio-section">
        <div>
          <p className="spk-bio-label">Sobre el Speaker</p>
          {speaker.bio.map((paragraph, i) => (
            <p key={i} className="spk-bio-paragraph">{paragraph}</p>
          ))}
        </div>
        <div className="spk-bio-portrait-wrap">
          <img className="spk-bio-portrait" src={speaker.img} alt={speaker.nombre} />
        </div>
      </section>

      {/* ── TEMAS ── */}
      <div className="spk-temas-section-bg">
        <section className="spk-temas-section">
          <p className="spk-temas-label">Temas de Conferencia</p>
          {speaker.temas.map((tema, i) => (
            <div key={i} className="spk-tema-item">
              <span className="spk-tema-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="spk-tema-text">{tema}</span>
              <span className="spk-tema-arrow">→</span>
            </div>
          ))}
        </section>
      </div>

      {/* ── VIDEO PLACEHOLDER ── */}
      <section className="spk-video-section">
        <div className="spk-video-placeholder">
          <div className="spk-video-play-icon">▶</div>
          <span className="spk-video-label">Video próximamente</span>
        </div>
      </section>

      {/* ── REDES ── */}
      <section className="spk-redes-section">
        <p className="spk-redes-label">Síguelo en</p>
        <div className="spk-redes-list">
          <a href={speaker.redes.linkedin} target="_blank" rel="noopener noreferrer" className="spk-redes-icon" data-cursor="hover">
            <IconLinkedIn />
          </a>
          <a href={speaker.redes.instagram} target="_blank" rel="noopener noreferrer" className="spk-redes-icon" data-cursor="hover">
            <IconInstagram />
          </a>
          <a href={speaker.redes.twitter} target="_blank" rel="noopener noreferrer" className="spk-redes-icon" data-cursor="hover">
            <IconX />
          </a>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="spk-cta-section">
        <h2 className="spk-cta-title">
          {ctaText.split('').map((char, i) => (
            <span key={i} className="spk-char" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>
        <p className="spk-cta-sub">Contáctanos y hagámoslo posible</p>
        <a href="mailto:contacto@exma.com" className="spk-cta-btn" data-cursor="hover">
          Contratar Speaker
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer className="spk-footer">
        © 2026 EXMA Speakers — Powered by Hub365.AI
      </footer>
    </div>
  );
}
