export default function ScrollIndicator() {
  const handleClick = () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  };

  return (
    <button className="exma-scroll-indicator" onClick={handleClick} aria-label="Seguir bajando">
      <span className="exma-scroll-indicator-text">Scroll</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </button>
  );
}
