import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ExmaCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    document.addEventListener('mouseover', (e) => {
      if ((e.target as HTMLElement).closest('a, button')) {
        dot.classList.add('exma-cur-hover');
      } else {
        dot.classList.remove('exma-cur-hover');
      }
    });

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return createPortal(
    <div ref={dotRef} className="exma-cur-dot">
      <img src={`${import.meta.env.BASE_URL}exma-x-cursor.svg`} alt="" />
    </div>,
    document.body
  );
}
