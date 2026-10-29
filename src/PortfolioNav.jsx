import React from 'react';

const NAV_ITEMS = [
  { id: 'back', label: 'Back' },
  { id: 'home', label: 'Home' },
  { id: 'files', label: 'Files' },
  { id: 'about', label: 'About Me' },
  { id: 'contact', label: 'Contact Me' },
];

function NavIcon({ type, isActive }) {
  if (type === 'back') {
    return (
      <svg className="pnav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m15 18-6-6 6-6" />
      </svg>
    );
  }

  if (type === 'home') {
    return (
      <svg className="pnav-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.6a1.5 1.5 0 0 0-.98.37l-7.5 6.25A1.5 1.5 0 0 0 3 10.37V19.5A1.5 1.5 0 0 0 4.5 21h4.25a1 1 0 0 0 1-1v-4a2.25 2.25 0 0 1 4.5 0v4a1 1 0 0 0 1 1h4.25a1.5 1.5 0 0 0 1.5-1.5v-9.13a1.5 1.5 0 0 0-.52-1.15l-7.5-6.25A1.5 1.5 0 0 0 12 2.6z" />
      </svg>
    );
  }

  if (type === 'files') {
    return (
      <svg className="pnav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H10l2 2h7.5A1.5 1.5 0 0 1 21 8.5v10A1.5 1.5 0 0 1 19.5 20h-15A1.5 1.5 0 0 1 3 18.5Z" fill={isActive ? 'currentColor' : 'none'} fillOpacity={isActive ? 0.2 : 0} />
        {isActive && <path d="M3 10h18" strokeWidth="1.8" />}
      </svg>
    );
  }

  if (type === 'about') {
    return (
      <svg className="pnav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="7" r="4" fill={isActive ? 'currentColor' : 'none'} fillOpacity={isActive ? 0.25 : 0} />
        <path d="M19 21v-1.5a4.5 4.5 0 0 0-4.5-4.5h-5A4.5 4.5 0 0 0 5 19.5V21" />
      </svg>
    );
  }

  if (type === 'contact') {
    return (
      <svg className="pnav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="15" x="2" y="4.5" rx="2.5" fill={isActive ? 'currentColor' : 'none'} fillOpacity={isActive ? 0.2 : 0} />
        <path d="m22 7.5-8.95 5.6a2 2 0 0 1-2.1 0L2 7.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  return null;
}

export default function PortfolioNav({ active, onNavigate }) {
  const handleClick = (id) => {
    if (typeof onNavigate === 'function') {
      onNavigate(id);
    }
  };

  return (
    <>
      <style>{`
        .pnav-container {
          position: fixed;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          /* Real Translucent Glass Effect */
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.42) 0%,
            rgba(255, 255, 255, 0.18) 100%
          );
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.65);
          border-top: 1.5px solid rgba(255, 255, 255, 0.85);
          border-radius: 9999px;
          box-shadow: 
            0 12px 32px -4px rgba(42, 24, 21, 0.12),
            0 4px 12px rgba(42, 24, 21, 0.04),
            inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.85),
            inset 0 -1px 1px 0 rgba(0, 0, 0, 0.04);
          user-select: none;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .pnav-container:hover {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.52) 0%,
            rgba(255, 255, 255, 0.24) 100%
          );
          border-color: rgba(255, 255, 255, 0.8);
          border-top: 1.5px solid rgba(255, 255, 255, 0.95);
          box-shadow: 
            0 16px 36px -4px rgba(42, 24, 21, 0.15),
            0 6px 16px rgba(42, 24, 21, 0.06),
            inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.95),
            inset 0 -1px 1px 0 rgba(0, 0, 0, 0.04);
        }

        .pnav-item {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 38px;
          padding: 0 13px;
          border: 1px solid transparent;
          background: transparent;
          color: rgba(42, 24, 21, 0.7);
          border-radius: 9999px;
          cursor: pointer;
          outline: none;
          transition: all 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .pnav-item:hover {
          color: #2a1815;
          background: rgba(255, 255, 255, 0.32);
          border: 1px solid rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transform: translateY(-1px);
        }

        .pnav-item:active {
          transform: scale(0.95);
        }

        .pnav-item:focus-visible {
          box-shadow: 0 0 0 2px rgba(42, 24, 21, 0.35);
        }

        /* Active Glass Capsule */
        .pnav-item.is-active {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.72) 0%,
            rgba(255, 255, 255, 0.42) 100%
          );
          color: #2a1815;
          border: 1px solid rgba(255, 255, 255, 0.85);
          border-top: 1.5px solid rgba(255, 255, 255, 0.95);
          box-shadow: 
            0 3px 10px rgba(42, 24, 21, 0.08),
            inset 0 1px 1.5px rgba(255, 255, 255, 0.9),
            inset 0 -1px 1px rgba(0, 0, 0, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 0 16px;
        }

        .pnav-icon {
          width: 20px;
          height: 20px;
          display: block;
          transition: transform 0.2s ease;
        }

        .pnav-item:hover .pnav-icon {
          transform: scale(1.08);
        }

        .pnav-item.is-active .pnav-icon {
          transform: scale(1.05);
        }

        /* Tooltip displayed on hover */
        .pnav-tooltip {
          position: absolute;
          bottom: -34px;
          left: 50%;
          transform: translateX(-50%) translateY(-4px);
          background: rgba(42, 24, 21, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #ffffff;
          font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.3px;
          padding: 4px 10px;
          border-radius: 6px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.18s ease, transform 0.18s ease;
          box-shadow: 0 8px 18px rgba(42, 24, 21, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.15);
          z-index: 10000;
        }

        .pnav-item:hover .pnav-tooltip,
        .pnav-item:focus-visible .pnav-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        @media (max-width: 640px) {
          .pnav-container {
            top: max(14px, env(safe-area-inset-top, 14px));
            padding: 3px 6px;
            gap: 3px;
          }
          .pnav-item {
            height: 34px;
            padding: 0 10px;
          }
          .pnav-item.is-active {
            padding: 0 13px;
          }
          .pnav-icon {
            width: 17px;
            height: 17px;
          }
          .pnav-tooltip {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pnav-container,
          .pnav-item,
          .pnav-icon,
          .pnav-tooltip {
            transition: none !important;
          }
        }
      `}</style>

      <nav className="pnav-container" aria-label="Main Navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`pnav-item ${isActive ? 'is-active' : ''}`}
              onClick={() => handleClick(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <NavIcon type={item.id} isActive={isActive} />
              <span className="pnav-tooltip">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}