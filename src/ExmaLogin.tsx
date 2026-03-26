import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface ExmaLoginProps {
  onClose: () => void;
}

export default function ExmaLogin({ onClose }: ExmaLoginProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.92, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    );
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' });
    gsap.to(modalRef.current, {
      opacity: 0, scale: 0.92, y: 20, duration: 0.25, ease: 'power2.in',
      onComplete: onClose,
    });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div ref={overlayRef} className="exma-login-overlay" onClick={handleOverlayClick}>
      <div ref={modalRef} className="exma-login-modal">
        <button className="exma-login-close" onClick={handleClose} aria-label="Close">
          ✕
        </button>

        <div className="exma-login-header">
          <img src="/exma-logo.png?v=2" alt="EXMA" className="exma-logo-img exma-login-logo-img" />
          <p className="exma-login-eyebrow">Members Area</p>
        </div>

        <h2 className="exma-login-title exma-headline">Welcome Back</h2>
        <p className="exma-login-subtitle">Sign in to access your EXMA account</p>

        <form className="exma-login-form" onSubmit={handleSubmit}>
          <div className="exma-form-group">
            <label className="exma-form-label">Email</label>
            <input
              className="exma-form-input exma-login-input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              autoFocus
            />
          </div>

          <div className="exma-form-group">
            <label className="exma-form-label">Password</label>
            <input
              className="exma-form-input exma-login-input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="exma-login-forgot">
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="exma-login-btn" disabled={loading}>
            {loading ? <span className="exma-login-spinner" /> : 'Sign In'}
          </button>
        </form>

        <p className="exma-login-register">
          Don't have an account? <a href="#">Apply as a Speaker</a>
        </p>
      </div>
    </div>
  );
}
