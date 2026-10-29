import React, { useEffect, useState } from 'react';
import PortfolioNav from './PortfolioNav';
import contactMeImg from './assets/contact-me.png';

const styles = `
@keyframes contactRise {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

.contact-img {
  animation: contactRise 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  .contact-img { animation: none !important; }
}
`;

// Keep the entire artwork visible in narrow windows, while using more of the
// available room on wide screens. The scale never exceeds 125%.
const getScale = () => {
  if (typeof window === 'undefined') return 1;
  return Math.min(1.25, Math.max(1, (window.innerWidth / window.innerHeight) * 0.6));
};

export default function ContactMe({ onNavigate }) {
  const [scale, setScale] = useState(getScale);

  useEffect(() => {
    const updateScale = () => setScale(getScale());
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onNavigate('back');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onNavigate]);

  return (
    <div
      className="canvas-board"
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#f7f4ee',
        boxSizing: 'border-box',
        padding: 0,
      }}
    >
      <style>{styles}</style>

      <PortfolioNav active="contact" onNavigate={onNavigate} />

      <img
        className="contact-img"
        src={contactMeImg}
        alt="Contact me: LinkedIn, GitHub, email and phone"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      />
    </div>
  );
}
