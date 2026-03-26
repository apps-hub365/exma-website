import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export default function ExmaBecomeASpeaker() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: '',
    bio: '',
    linkedin: '',
    instagram: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="exma-page-wrapper">
      {/* Navbar */}
      <nav className="exma-navbar exma-navbar-scrolled">
        <a onClick={() => navigate('/')} className="exma-nav-logo" style={{ cursor: 'pointer' }}>
          <img src="/exma-logo.png?v=2" alt="EXMA" className="exma-logo-img" />
        </a>
        <ul className="exma-nav-links">
          <li><a onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</a></li>
          <li><a className="exma-nav-active">Become a Speaker</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="exma-speaker-form-hero">
        <div className="exma-speaker-form-hero-bg" />
        <div ref={heroRef} className="exma-speaker-form-hero-content">
          <p className="exma-speaker-form-eyebrow">EXMA Speakers 2026</p>
          <h1 className="exma-speaker-form-title exma-headline">Become a<br />Speaker</h1>
          <p className="exma-speaker-form-desc">
            Share your vision with thousands of leaders, entrepreneurs and change-makers.<br />
            Apply now and let your voice move the world.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="exma-speaker-form-section">
        <div className="exma-speaker-form-container">
          {submitted ? (
            <div className="exma-speaker-form-success">
              <div className="exma-speaker-form-success-icon">✓</div>
              <h2 className="exma-headline">Application Received</h2>
              <p>We'll review your application and reach out within 5 business days.</p>
              <button className="exma-cta-button" onClick={() => navigate('/')}>
                Back to Home
              </button>
            </div>
          ) : (
            <form ref={formRef} className="exma-speaker-form" onSubmit={handleSubmit}>
              <div className="exma-form-row">
                <div className="exma-form-group">
                  <label className="exma-form-label">Full Name</label>
                  <input
                    className="exma-form-input"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="exma-form-group">
                  <label className="exma-form-label">Email</label>
                  <input
                    className="exma-form-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="exma-form-group">
                <label className="exma-form-label">Speaking Topic / Expertise</label>
                <select
                  className="exma-form-input exma-form-select"
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your main topic</option>
                  <option value="leadership">Leadership & Management</option>
                  <option value="innovation">Innovation & Technology</option>
                  <option value="marketing">Marketing & Branding</option>
                  <option value="entrepreneurship">Entrepreneurship</option>
                  <option value="finance">Finance & Investment</option>
                  <option value="sustainability">Sustainability & Impact</option>
                  <option value="wellness">Wellness & Performance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="exma-form-group">
                <label className="exma-form-label">Bio / About You</label>
                <textarea
                  className="exma-form-input exma-form-textarea"
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Tell us about your background, achievements, and why you want to speak at EXMA..."
                  required
                />
              </div>

              <div className="exma-form-row">
                <div className="exma-form-group">
                  <label className="exma-form-label">LinkedIn Profile</label>
                  <input
                    className="exma-form-input"
                    type="url"
                    name="linkedin"
                    value={form.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div className="exma-form-group">
                  <label className="exma-form-label">Instagram Handle</label>
                  <input
                    className="exma-form-input"
                    type="text"
                    name="instagram"
                    value={form.instagram}
                    onChange={handleChange}
                    placeholder="@yourhandle"
                  />
                </div>
              </div>

              <button type="submit" className="exma-speaker-form-submit">
                Submit Application
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="exma-footer">
        © 2026 EXMA Speakers — Powered by Hub365.AI
      </footer>
    </div>
  );
}
