import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const quickReplies = ['Ver Eventos', 'Demo', 'Ser Speaker', 'Membresías'];
const autoResponses: Record<string, string> = {
  'Ver Eventos': 'Tenemos más de 500 eventos anuales. ¿Te gustaría ver el calendario?',
  'Demo': 'Puedo conectarte con nuestro equipo para una demo personalizada.',
  'Ser Speaker': 'Genial! Ve a la sección Become a Speaker y llena el formulario.',
  'Membresías': 'Ofrecemos planes gratuitos para speakers y organizadores. ¿Cuál te interesa?',
};

interface Message {
  text: string;
  from: 'bot' | 'user';
}

export default function ExmaChatbot() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [greetingDone, setGreetingDone] = useState(false);
  const [typingGreeting, setTypingGreeting] = useState('');

  const GREETING = '¡Hola! Soy Exma Robot. ¿En qué puedo ayudarte?';

  // Button pulse + appear
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    gsap.fromTo(btn, { y: 20, opacity: 0, scale: 0.8 }, {
      y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out', delay: 3,
    });
    gsap.to(btn, { scale: 1.05, duration: 1, repeat: -1, yoyo: true, ease: 'power1.inOut', delay: 3.8 });
  }, []);

  const openChat = () => {
    setOpen(true);
    const panel = panelRef.current;
    if (!panel) return;
    gsap.fromTo(panel,
      { scaleX: 0, scaleY: 0, opacity: 0 },
      { scaleX: 1, scaleY: 1, opacity: 1, duration: 0.4, ease: 'power3.out', transformOrigin: 'bottom right' }
    );
    // Typewriter greeting
    if (!greetingDone) {
      let i = 0;
      const interval = setInterval(() => {
        setTypingGreeting(GREETING.slice(0, i + 1));
        i++;
        if (i >= GREETING.length) {
          clearInterval(interval);
          setGreetingDone(true);
        }
      }, 40);
    }
  };

  const closeChat = () => {
    const panel = panelRef.current;
    if (!panel) return;
    gsap.to(panel, {
      scaleX: 0, scaleY: 0, opacity: 0, duration: 0.25, ease: 'power2.in',
      transformOrigin: 'bottom right',
      onComplete: () => setOpen(false),
    });
  };

  const handleQuickReply = (reply: string) => {
    setMessages((prev) => [...prev, { text: reply, from: 'user' }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: autoResponses[reply] || 'Conectando con un agente...', from: 'bot' }]);
    }, 800);
  };

  return (
    <div className="exma-chatbot-wrapper">
      {/* Chat panel */}
      {open && (
        <div ref={panelRef} className="exma-chatbot-panel">
          <div className="exma-chatbot-header">
            <div className="exma-chatbot-avatar">🤖</div>
            <div>
              <p className="exma-chatbot-name">Exma Robot</p>
              <p className="exma-chatbot-status">En línea</p>
            </div>
            <button className="exma-chatbot-close" onClick={closeChat}>✕</button>
          </div>

          <div className="exma-chatbot-messages">
            {/* Greeting */}
            <div className="exma-chatbot-msg exma-chatbot-msg-bot">
              {greetingDone ? GREETING : typingGreeting}
              {!greetingDone && <span className="exma-chatbot-cursor">|</span>}
            </div>

            {/* Quick replies after greeting */}
            {greetingDone && messages.length === 0 && (
              <div className="exma-chatbot-quick">
                {quickReplies.map((r) => (
                  <button key={r} className="exma-chatbot-quick-btn" onClick={() => handleQuickReply(r)}>
                    {r}
                  </button>
                ))}
              </div>
            )}

            {/* Conversation */}
            {messages.map((msg, i) => (
              <div key={i} className={`exma-chatbot-msg exma-chatbot-msg-${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="exma-chatbot-input-row">
            <input className="exma-chatbot-input" placeholder="Escribe tu mensaje..." disabled />
            <button className="exma-chatbot-send">→</button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button ref={btnRef} className="exma-chatbot-btn" onClick={open ? closeChat : openChat} style={{ opacity: 0 }}>
        🤖
      </button>
    </div>
  );
}
