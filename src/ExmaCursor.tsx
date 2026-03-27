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

    const onOver = (e: MouseEvent) => {
      const t = e.target;
      if (t instanceof Element && t.closest('a, button')) {
        dot.classList.add('exma-cur-hover');
      } else {
        dot.classList.remove('exma-cur-hover');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  return createPortal(
    <div ref={dotRef} className="exma-cur-dot">
      <img src={`${import.meta.env.BASE_URL}exma-x-cursor.svg`} alt="" />
    </div>,
    document.body
  );
}
