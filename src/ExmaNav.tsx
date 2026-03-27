import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

interface ExmaNavProps {
  onLoginClick: () => void;
  onSpeakerClick: () => void;
}

const links = [
  { label: 'Inicio', href: '/' },
  { label: 'Directorio', href: '/speakers' },
  { label: 'Speaker del Mes', href: '#speaker-del-mes' },
  { label: 'Cómo Funciona', href: '#how' },
  { label: 'Planes', href: '/planes' },
  { label: 'Certificación', href: '#certs' },
];

export default function ExmaNav({ onLoginClick, onSpeakerClick }: ExmaNavProps) {
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayLinksRef = useRef<HTMLUListElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const [, setOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Scroll hide/show + background blur
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > 80) {
        gsap.to(nav, { y: '-100%', duration: 0.3, ease: 'power2.in' });
      } else {
        gsap.to(nav, { y: '0%', duration: 0.3, ease: 'power2.out' });
      }
      if (y > 50) {
        nav.classList.add('exma-nav-scrolled');
      } else {
        nav.classList.remove('exma-nav-scrolled');
      }
      lastScrollY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Open overlay
  const openMenu = () => {
    setOpen(true);
    const overlay = overlayRef.current;
    const items = overlayLinksRef.current?.querySelectorAll('li');
    if (!overlay || !items) return;

    gsap.set(overlay, { display: 'flex' });
    gsap.fromTo(overlay, { y: '-100%' }, { y: '0%', duration: 0.6, ease: 'power3.out' });
    gsap.fromTo(
      items,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, delay: 0.3, ease: 'power3.out' }
    );
  };

  // Close overlay
  const closeMenu = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    gsap.to(overlay, {
      y: '-100%',
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(overlay, { display: 'none' });
        setOpen(false);
      },
    });
  };

  const handleNavLink = (href: string) => {
    closeMenu();
    if (href.startsWith('#')) {
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 450);
    } else {
      setTimeout(() => navigate(href), 450);
    }
  };

  return (
    <>
      <nav ref={navRef} className="exma-nav">
        <a className="exma-nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={`${import.meta.env.BASE_URL}exma-speakers-logo.svg`} alt="EXMA" className="exma-logo-img" />
        </a>
        <div className="exma-nav-right">
          <button className="exma-nav-login" onClick={onLoginClick}>
            Iniciar Sesión
          </button>
          <button className="exma-nav-cta" onClick={onSpeakerClick}>
            Comenzar Gratis
          </button>
          <button ref={hamburgerRef} className="exma-nav-hamburger" onClick={openMenu} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Fullscreen overlay */}
      <div ref={overlayRef} className="exma-nav-overlay">
        <button className="exma-nav-overlay-close" onClick={closeMenu} aria-label="Cerrar">✕</button>
        <ul ref={overlayLinksRef} className="exma-nav-overlay-links">
          {links.map((link) => (
            <li key={link.label}>
              <a
                className="exma-nav-overlay-link exma-headline"
                onClick={() => handleNavLink(link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              className="exma-nav-overlay-link exma-headline"
              onClick={() => { closeMenu(); setTimeout(onSpeakerClick, 450); }}
            >
              Quiero ser Speaker
            </a>
          </li>
          <li>
            <a
              className="exma-nav-overlay-link exma-headline"
              href="https://exma.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ir a EXMA →
            </a>
          </li>
        </ul>
        <div className="exma-nav-overlay-bottom">
          <a href="#" className="exma-nav-overlay-social" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="#" className="exma-nav-overlay-social" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="#" className="exma-nav-overlay-social" aria-label="WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.862L.054 23.064a.75.75 0 0 0 .882.882l5.2-1.479A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.72 9.72 0 0 1-4.964-1.357l-.356-.212-3.685 1.048 1.048-3.685-.212-.356A9.72 9.72 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
          </a>
          <a href="#" className="exma-nav-overlay-social" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" className="exma-nav-overlay-social" aria-label="TikTok">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.18 8.18 0 0 0 4.78 1.52V6.72a4.85 4.85 0 0 1-1.01-.03z"/>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
