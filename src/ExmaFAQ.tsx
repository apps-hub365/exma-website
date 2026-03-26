import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: '¿Cómo funciona el proceso de contratación?', a: 'Busca el speaker ideal en nuestro directorio, revisa su perfil completo con videos y reseñas, y envía una solicitud. En menos de 24h recibirás confirmación. El contrato se firma digitalmente en la plataforma.' },
  { q: '¿Qué incluye la Certificación EXMA?', a: 'Un programa de 6 semanas (online + presencial) que cubre técnicas de oratoria, construcción de marca personal, manejo de audiencias y monetización. Al finalizar recibes la insignia EXMA reconocida en toda LATAM.' },
  { q: '¿Cuánto cobra un speaker de EXMA?', a: 'Las tarifas varían según el speaker, tema, modalidad y duración. Encontrarás opciones desde $500 USD para eventos virtuales hasta $15,000+ para keynotes presenciales. Todas las tarifas son transparentes y se muestran en el perfil.' },
  { q: '¿Puedo contratar speakers para eventos virtuales?', a: 'Sí. La mayoría de nuestros speakers ofrece modalidad virtual con tarifas especiales. Puedes filtrar por modalidad directamente en el buscador.' },
  { q: '¿Cómo funciona el Speaker Score?', a: 'Es un algoritmo que evalúa la calidad de tu perfil (video, bio, reseñas), tu historial de eventos, ratings recibidos y tu actividad en la plataforma. Un score más alto te posiciona mejor en los resultados de búsqueda.' },
  { q: '¿Los pagos son seguros?', a: 'Sí. El pago se retiene en escrow hasta que el evento se realiza satisfactoriamente. Usamos encriptación bancaria y todos los contratos están protegidos por nuestra garantía EXMA.' },
  { q: '¿Qué pasa si el speaker cancela?', a: 'Tienes garantía total: reembolso completo o reemplazo inmediato con un speaker de igual o mayor nivel. Nunca te quedas sin speaker.' },
  { q: '¿Cómo me registro como speaker?', a: "Completa tu aplicación en la sección 'Become a Speaker', sube tu video de presentación y pasa la evaluación de calidad. Si eres aprobado, tu perfil se activa en 48h." },
];

export default function ExmaFAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.exma-faq-headline', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      ScrollTrigger.batch('.exma-faq-item', {
        start: 'top 90%',
        onEnter: (batch) => gsap.fromTo(batch,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.04, duration: 0.6, ease: 'power3.out' }
        ),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggle = (i: number) => {
    const prev = openIndex;
    const isOpen = prev === i;

    // Close previous
    if (prev !== null && answerRefs.current[prev]) {
      const el = answerRefs.current[prev]!;
      gsap.to(el, { height: 0, opacity: 0, duration: 0.35, ease: 'power2.in' });
    }

    if (isOpen) {
      setOpenIndex(null);
    } else {
      setOpenIndex(i);
      const el = answerRefs.current[i];
      if (el) {
        gsap.fromTo(el,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
      }
    }
  };

  return (
    <section ref={sectionRef} className="exma-faq-section" data-section="faq">
      <h2 className="exma-faq-headline exma-headline">Preguntas frecuentes.</h2>
      <div className="exma-faq-list">
        {faqs.map((faq, i) => (
          <div key={i} className="exma-faq-item" onClick={() => toggle(i)}>
            <div className="exma-faq-question">
              <span className="exma-faq-q-text">{faq.q}</span>
              <span className="exma-faq-icon" style={{ transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
            </div>
            <div
              ref={(el) => { answerRefs.current[i] = el; }}
              className="exma-faq-answer"
              style={{ height: 0, overflow: 'hidden', opacity: 0 }}
            >
              <p className="exma-faq-answer-text">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
