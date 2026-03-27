import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { speakersMock } from './data/speakers.mock';
import './exma-speakers.css';

const TOPICS = ['Todos', 'Innovation', 'Leadership', 'AI & Future', 'Marketing', 'Entrepreneurship', 'Design'];

export default function ExmaSpeakerDirectory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTopic, setActiveTopic] = useState('Todos');
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(headRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 });
    gsap.fromTo('.exma-dir-card', { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out', delay: 0.3 });
  }, []);

  // Re-animate cards when filter changes
  useEffect(() => {
    gsap.fromTo('.exma-dir-card', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: 'power3.out' });
  }, [activeTopic, search]);

  const filtered = useMemo(() => {
    return speakersMock.filter((s) => {
      const matchTopic = activeTopic === 'Todos' || s.tema === activeTopic;
      const matchSearch =
        search.trim() === '' ||
        s.nombre.toLowerCase().includes(search.toLowerCase()) ||
        s.tema.toLowerCase().includes(search.toLowerCase()) ||
        s.pais.toLowerCase().includes(search.toLowerCase());
      return matchTopic && matchSearch;
    });
  }, [search, activeTopic]);

  return (
    <div className="exma-page-wrapper exma-dir-page">
      {/* Nav bar simple */}
      <nav className="exma-nav exma-nav-scrolled">
        <a className="exma-nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={`${import.meta.env.BASE_URL}exma-logo.png?v=2`} alt="EXMA" className="exma-logo-img" />
        </a>
        <div className="exma-nav-right">
          <button className="exma-nav-login" onClick={() => navigate('/')}>← Home</button>
          <button className="exma-nav-cta" onClick={() => navigate('/become-a-speaker')}>
            Become a Speaker
          </button>
        </div>
      </nav>

      {/* Header */}
      <div ref={headRef} className="exma-dir-header">
        <p className="exma-dir-eyebrow">Directorio</p>
        <h1 className="exma-dir-title exma-headline">Speakers.</h1>
        <p className="exma-dir-sub">Voces que transforman escenarios.</p>

        {/* Search */}
        <div className="exma-dir-search-wrap">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.35)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className="exma-dir-search"
            placeholder="Busca por nombre, tema o país..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="exma-dir-search-clear" onClick={() => setSearch('')}>✕</button>
          )}
        </div>

        {/* Filters */}
        <div className="exma-dir-filters">
          {TOPICS.map((t) => (
            <button
              key={t}
              className={`exma-dir-filter ${activeTopic === t ? 'exma-dir-filter-active' : ''}`}
              onClick={() => setActiveTopic(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <p className="exma-dir-count">
          {filtered.length} speaker{filtered.length !== 1 ? 's' : ''} encontrados
        </p>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="exma-dir-grid">
        {filtered.length === 0 ? (
          <div className="exma-dir-empty">
            <p>Sin resultados para "<strong>{search}</strong>"</p>
          </div>
        ) : (
          filtered.map((s) => (
            <Link
              key={s.id}
              to={`/speaker/${s.id}`}
              className="exma-dir-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="exma-dir-card-img-wrap">
                <img src={s.img} alt={s.nombre} className="exma-dir-card-img" />
                <div className="exma-dir-card-overlay" />
              </div>
              <div className="exma-dir-card-info">
                <span className="exma-dir-card-topic">{s.tema}</span>
                <h3 className="exma-dir-card-name exma-headline">{s.nombre}</h3>
                <p className="exma-dir-card-title">{s.titulo}</p>
                <span className="exma-dir-card-country">{s.pais}</span>
              </div>
            </Link>
          ))
        )}
      </div>

      <footer className="exma-footer">
        © 2026 EXMA Speakers — Powered by Hub365.AI
      </footer>
    </div>
  );
}
