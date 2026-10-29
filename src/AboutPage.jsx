import React, { useEffect } from 'react';
import PortfolioNav from './PortfolioNav';
import aboutMeImg from './assets/about-me.png';

const styles = `
@keyframes aboutRise {
  from { opacity: 0; transform: translateY(24px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.about-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* The stage is sized to the picture itself (1440x900 = 1.6 ratio) and fills
   the window: as wide as the window allows without the height running out. */
.about-stage {
  width: min(96vw, 1500px, calc((100vh - 80px) * 1.6));
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.about-img {
  display: block;
  width: 100%;
  height: auto;
  filter: drop-shadow(0 18px 28px rgba(42, 24, 21, 0.18));
  animation: aboutRise 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  user-select: none;
}

@media (max-width: 640px) {
  .about-stage { width: min(96vw, calc((100vh - 100px) * 1.6)); }
}

@media (prefers-reduced-motion: reduce) {
  .about-img {
    animation: none !important;
  }
}
`;

export default function AboutPage({ onNavigate }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onNavigate('back');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onNavigate]);

  return (
    <div className="canvas-board about-page">
      <style>{styles}</style>

      <PortfolioNav active="about" onNavigate={onNavigate} />

      <main className="about-stage">
        <img
          className="about-img"
          src={aboutMeImg}
          alt="About Angela: Hi! I am Angela Marie De Juan, a Computer Engineering student from the Polytechnic University of the Philippines Main Campus. I am currently completing my OJT internship in Manny Pay (7th Pillar Integrated System Corp.)"
          draggable={false}
        />
      </main>
    </div>
  );
}
