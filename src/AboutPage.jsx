import React, { useEffect } from 'react';

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

/* Same look as the Desktop button on the Files page */
.about-back {
  position: absolute;
  top: 24px;
  left: 32px;
  z-index: 300;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 18px 0 14px;
  background: #fffdf8;
  color: #2a1815;
  border: 1.5px solid #2a1815;
  border-radius: 999px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 3px 3px 0 #2a1815;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
}

.about-back:hover {
  background: #fff3d6;
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0 #2a1815;
}

.about-back:active {
  transform: translate(3px, 3px);
  box-shadow: 0 0 0 #2a1815;
}

.about-back:focus-visible {
  outline: 3px solid #f0b942;
  outline-offset: 3px;
}

.about-back-arrow {
  display: inline-block;
  font-size: 18px;
  line-height: 1;
  transition: transform 0.2s ease;
}

.about-back:hover .about-back-arrow {
  transform: translateX(-4px);
}

@media (max-width: 640px) {
  .about-back { padding: 0 14px; top: 16px; left: 16px; }
  .about-back-label { display: none; }
  .about-stage { width: min(96vw, calc((100vh - 100px) * 1.6)); }
}

@media (prefers-reduced-motion: reduce) {
  .about-img {
    animation: none !important;
  }
  .about-back,
  .about-back-arrow {
    transition: none !important;
  }
}
`;

export default function AboutPage({ onBack }) {
  // Esc goes back to the desktop
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onBack();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onBack]);

  return (
    <div className="canvas-board about-page">
      <style>{styles}</style>

      <button
        type="button"
        className="about-back"
        onClick={onBack}
        title="Back to Desktop (Esc)"
        aria-label="Back to Desktop"
      >
        <span className="about-back-arrow" aria-hidden="true">←</span>
        <span className="about-back-label">Desktop</span>
      </button>

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
