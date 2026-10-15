import React, { useEffect, useRef } from 'react';

const styles = `
/* ---------- Clickable photo cards on the desktop ---------- */
.photo-card[role="button"] {
  cursor: zoom-in;
  transition: box-shadow 0.2s ease;
}

.photo-card[role="button"]:hover {
  box-shadow: 0 8px 20px rgba(42, 24, 21, 0.18);
}

.photo-card[role="button"]:focus-visible {
  outline: 3px solid #f2b435;
  outline-offset: 3px;
}

/* ---------- Lightbox ---------- */
@keyframes lbBackdropIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes lbFrameIn {
  from { opacity: 0; transform: translateY(12px) scale(0.94) rotate(-1deg); }
  to   { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
}

.lb-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(42, 24, 21, 0.62);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  animation: lbBackdropIn 0.2s ease both;
}

.lb-dialog {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: none;
}

.lb-frame {
  background: #fffdf8;
  padding: 12px 12px 10px;
  border-radius: 6px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
  animation: lbFrameIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) both;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 92vw;
}

.lb-img {
  display: block;
  height: min(62vh, 460px);
  max-width: calc(92vw - 24px);
  width: auto;
  object-fit: contain;
  background: #f4efe6;
  border-radius: 3px;
}

.lb-caption {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #2a1815;
}

.lb-count {
  font-weight: 500;
  color: rgba(42, 24, 21, 0.55);
}

.lb-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #2a1815;
  background: #fffdf8;
  color: #2a1815;
  cursor: pointer;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 600;
  box-shadow: 3px 3px 0 #2a1815;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
}

.lb-btn:hover {
  background: #fff3d6;
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0 #2a1815;
}

.lb-btn:active {
  transform: translate(3px, 3px);
  box-shadow: 0 0 0 #2a1815;
}

.lb-btn:focus-visible {
  outline: 3px solid #f2b435;
  outline-offset: 3px;
}

.lb-close {
  position: absolute;
  top: -18px;
  right: -18px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  font-size: 18px;
  line-height: 1;
  z-index: 2;
}

.lb-nav {
  position: absolute;
  top: 50%;
  width: 42px;
  height: 42px;
  margin-top: -33px;
  border-radius: 50%;
  font-size: 20px;
  line-height: 1;
  z-index: 2;
}

.lb-prev { left: -64px; }
.lb-next { right: -64px; }

/* Not enough room beside the photo on narrow screens: tuck arrows below */
@media (max-width: 720px) {
  .lb-nav {
    top: auto;
    bottom: -62px;
    margin-top: 0;
  }
  .lb-prev { left: calc(50% - 56px); }
  .lb-next { right: calc(50% - 56px); }
  .lb-dialog { margin-bottom: 56px; }
}

@media (prefers-reduced-motion: reduce) {
  .lb-backdrop,
  .lb-frame {
    animation: none !important;
  }
  .lb-btn,
  .photo-card[role="button"] {
    transition: none !important;
  }
}
`;

export default function PhotoLightbox({ photos, index, onClose, onChange }) {
  const dialogRef = useRef(null);
  const photo = index !== null && index !== undefined ? photos[index] : null;
  const isOpen = photo !== null;
  const hasMany = photos.length > 1;

  const go = (step) => onChange((index + step + photos.length) % photos.length);

  // Focus the dialog when it opens and hand focus back to the photo that opened it
  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.activeElement;
    dialogRef.current?.focus();
    return () => {
      if (previous && typeof previous.focus === 'function') previous.focus();
    };
  }, [isOpen]);

  // Keyboard: Esc closes, arrows browse, Tab stays inside the dialog
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && hasMany) {
        go(1);
      } else if (e.key === 'ArrowLeft' && hasMany) {
        go(-1);
      } else if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll('button');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, index]);

  return (
    <>
      <style>{styles}</style>

      {isOpen && (
        <div className="lb-backdrop" onClick={onClose}>
          <div
            ref={dialogRef}
            className="lb-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`${photo.name}, enlarged`}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lb-btn lb-close"
              onClick={onClose}
              aria-label="Close photo"
              title="Close (Esc)"
            >
              ✕
            </button>

            {hasMany && (
              <button
                type="button"
                className="lb-btn lb-nav lb-prev"
                onClick={() => go(-1)}
                aria-label="Previous photo"
                title="Previous (←)"
              >
                ←
              </button>
            )}

            <figure className="lb-frame" key={photo.id} style={{ margin: 0 }}>
              <img
                className="lb-img"
                src={photo.full || photo.src}
                alt={photo.alt || photo.name}
                draggable={false}
              />
              <figcaption className="lb-caption">
                <span>{photo.name}</span>
                {hasMany && (
                  <span className="lb-count">
                    {index + 1} / {photos.length}
                  </span>
                )}
              </figcaption>
            </figure>

            {hasMany && (
              <button
                type="button"
                className="lb-btn lb-nav lb-next"
                onClick={() => go(1)}
                aria-label="Next photo"
                title="Next (→)"
              >
                →
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
