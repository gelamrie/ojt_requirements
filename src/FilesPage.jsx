import React, { useState, useEffect, useRef } from 'react';

import beforeOjtImg from './assets/before-ojt.png';
import duringOjtImg from './assets/during-ojt.png';
import afterOjtImg from './assets/after-ojt.png';

// Import unique window graphics for each folder
import fileExplorerBefore from './assets/file-explorer-before.png';
import fileExplorerDuring from './assets/file-explorer-during.png';
import fileExplorerAfter from './assets/file-explorer-after.png';

// Import your custom file icon asset
import fileIcon from './assets/file-icon.png';

// Define the file items with Google Drive link placeholders for each folder
const folderFiles = {
  before: [
    { id: 'b1', name: 'Cover Page', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'b2', name: 'Approval Sheet', link: 'https://drive.google.com/file/d/1r914eFcCUg1QoTtWLwa6aKac09B7Awje/view?usp=sharing' },
    { id: 'b3', name: 'Company Profile', link: 'https://drive.google.com/file/d/1p6LacSkaIplMI1xWtUrG9vMo_6xxLcNg/view?usp=sharing' },
    { id: 'b4', name: 'Memorandum of Agreement', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'b5', name: 'Letter of Intent', link: 'https://drive.google.com/file/d/1qwoRBP3yfEGYJK3tR6srlUWCmwdCsUJQ/view?usp=sharing' },
    { id: 'b6', name: 'Letter of Endorsement', link: 'https://drive.google.com/file/d/1wxS2glqkuNFUzP9WS8IgafcI3zg3ClcV/view?usp=sharing' },
    { id: 'b7', name: 'Student Waiver', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'b8', name: 'Consent Form', link: 'https://drive.google.com/file/d/19q4SeCejNqVnnt0o7q7t5FNLjIkHk0xF/view?usp=sharing' },
    { id: 'b9', name: 'Curriculum Vitae', link: 'https://drive.google.com/file/d/1jCh-ChImizoJvjC7ol1Pqre9rstVnIY5/view?usp=sharing' },
    { id: 'b10', name: 'Insurance', link: 'https://drive.google.com/file/d/1jCh-ChImizoJvjC7ol1Pqre9rstVnIY5/view?usp=sharing' },
    { id: 'b11', name: 'Medical Certificate', link: 'https://drive.google.com/file/d/1_9It8bxDPFw2LDyd44kN_xknsGtR5ToK/view?usp=sharing' },
  ],
  during: [
    { id: 'd1', name: 'Daily Time Record', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'd2', name: 'Week 1: Weekly Progress Report', link: 'https://drive.google.com/file/d/1zQZRqirdjh8eSmeolGe45zEOVY_maV3N/view?usp=sharing' },
    { id: 'd3', name: 'Week 2: Weekly Progress Report', link: 'https://drive.google.com/file/d/1zQZRqirdjh8eSmeolGe45zEOVY_maV3N/view?usp=sharing' },
    { id: 'd4', name: 'Week 3: Weekly Progress Report', link: 'https://drive.google.com/file/d/1zQZRqirdjh8eSmeolGe45zEOVY_maV3N/view?usp=sharing' },
    { id: 'd5', name: 'Week 4: Weekly Progress Report', link: 'https://drive.google.com/file/d/1zQZRqirdjh8eSmeolGe45zEOVY_maV3N/view?usp=sharing' },
    { id: 'd6', name: 'Week 5: Weekly Progress Report', link: 'https://drive.google.com/file/d/1zQZRqirdjh8eSmeolGe45zEOVY_maV3N/view?usp=sharing' },
    { id: 'd7', name: 'Week 6: Weekly Progress Report', link: 'https://drive.google.com/file/d/1zQZRqirdjh8eSmeolGe45zEOVY_maV3N/view?usp=sharing' },
    { id: 'd8', name: 'Week 7: Weekly Progress Report', link: 'https://drive.google.com/file/d/1zQZRqirdjh8eSmeolGe45zEOVY_maV3N/view?usp=sharing' },

  ],
  after: [
    { id: 'a1', name: 'Training Supervisor Form', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'a2', name: 'HTE Performance', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'a3', name: 'OJT Adviser Performance', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'a4', name: 'Trainee Performance', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'a5', name: 'Performance Evaluation', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'a6', name: 'Certificate of Completion', link: 'PASTE_GDRAIVE_LINK_HERE' },
  ]
};

const folderTitles = {
  before: 'Before OJT',
  during: 'During OJT',
  after: 'After OJT',
};

// Where the file-count badge sits on each folder: inside the tab, right next to
// the label ("Before OJT", etc.). The During tab is on the right side, so its
// badge sits to the left of its label. Nudge these if you want it closer or further.
const badgePositions = {
  before: { left: '24%', top: '16%' },
  during: { right: '27%', top: '6%' },
  after: { left: '22%', top: '16%' },
};

// Where the icon grid sits on top of each explorer image.
// Every explorer image can have its own numbers, so if one window has a
// different sidebar width or title bar height, tune just that entry.
const explorerLayout = {
  before: { top: '12%', left: '30%', right: '4%', bottom: '6%' },
  during: { top: '12%', left: '30%', right: '4%', bottom: '6%' },
  after: { top: '12%', left: '30%', right: '4%', bottom: '6%' },
};

// "Week 3: Weekly Progress Report" -> "Week 3" (full name stays in the tooltip)
const getDisplayName = (name) => name.replace(/^(Week \d+):.*$/, '$1');

const PLACEHOLDER_LINK = 'PASTE_GDRAIVE_LINK_HERE';

const pageStyles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

.ojt-page, .ojt-page * {
  font-family: 'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
}

@keyframes ojtRise {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes ojtFade {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.ojt-folder-img {
  animation: ojtRise 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
  transition: filter 0.3s ease;
}

.ojt-folder.is-lifted .ojt-folder-img {
  filter: drop-shadow(0 18px 18px rgba(42, 24, 21, 0.28));
}

.ojt-folder:focus-visible {
  outline: 3px solid #2a1815;
  outline-offset: 4px;
  border-radius: 12px;
}

.ojt-title {
  animation: ojtFade 0.6s ease 0.1s both;
}

/* Matches the white tab labels so it reads as part of the folder */
.ojt-badge {
  position: absolute;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.22);
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0.3px;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.25s ease, transform 0.25s ease;
  pointer-events: none;
  z-index: 5;
  white-space: nowrap;
}

.ojt-folder.is-lifted .ojt-badge {
  opacity: 1;
  transform: translateX(0);
}

/* Touch screens have no hover, so keep the file-count badges visible */
@media (hover: none) {
  .ojt-badge {
    opacity: 1;
    transform: translateX(0);
  }
}

.ojt-back {
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
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 3px 3px 0 #2a1815;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
}

.ojt-back:hover {
  background: #fff3d6;
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0 #2a1815;
}

.ojt-back:active {
  transform: translate(3px, 3px);
  box-shadow: 0 0 0 #2a1815;
}

.ojt-back:focus-visible {
  outline: 3px solid #f0b942;
  outline-offset: 3px;
}

.ojt-back-arrow {
  display: inline-block;
  font-size: 18px;
  line-height: 1;
  transition: transform 0.2s ease;
}

.ojt-back:hover .ojt-back-arrow {
  transform: translateX(-4px);
}

.ojt-file:focus-visible {
  outline: 2px solid #2a1815;
  outline-offset: 1px;
}

.ojt-file:hover {
  background-color: rgba(42, 24, 21, 0.06);
}

.ojt-grid {
  top: var(--grid-top);
  left: var(--grid-left);
  right: var(--grid-right);
  bottom: var(--grid-bottom);
}

/* Narrow screens: give the icons more room by pulling the grid left */
@media (max-width: 640px) {
  .ojt-grid {
    left: max(2%, calc(var(--grid-left) - 10%));
    right: 2%;
    grid-template-columns: repeat(auto-fill, minmax(68px, 1fr)) !important;
    gap: 6px !important;
  }
  .ojt-back { padding: 0 14px; }
  .ojt-back-label { display: none; }
  .ojt-title { font-size: 18px !important; }
}

/* Respect reduced-motion preferences */
@media (prefers-reduced-motion: reduce) {
  .ojt-folder-img,
  .ojt-title {
    animation: none !important;
  }
  .ojt-back-arrow {
    transition: none !important;
  }
  .ojt-folder,
  .ojt-popup,
  .ojt-backdrop,
  .ojt-badge,
  .ojt-back,
  .ojt-file {
    transition: none !important;
  }
}
`;

export default function FilesPage({ onBack }) {
  const [hoveredFolder, setHoveredFolder] = useState(null);
  const [activeFolder, setActiveFolder] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const popupRef = useRef(null);
  const lastFocusedRef = useRef(null);

  const openFolder = (folderKey) => {
    lastFocusedRef.current = document.activeElement;
    setActiveFolder(folderKey);
  };

  const closeFolder = () => {
    setActiveFolder(null);
    setSelectedFile(null);
    // Return focus to whatever opened the window
    if (lastFocusedRef.current && typeof lastFocusedRef.current.focus === 'function') {
      lastFocusedRef.current.focus();
    }
  };

  // Escape closes the popup
  useEffect(() => {
    if (!activeFolder) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeFolder();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [activeFolder]);

  // Move focus into the popup when it opens
  useEffect(() => {
    if (activeFolder && popupRef.current) {
      popupRef.current.focus();
    }
  }, [activeFolder]);

  const getZIndex = (folderKey, baseZIndex) => {
    if (activeFolder === folderKey) return 50;
    if (hoveredFolder === folderKey && folderKey === 'after') {
      return 35;
    }
    return baseZIndex;
  };

  const getClosedTransform = () => {
    if (activeFolder === 'before') return 'translate(-50%, -130%) scale(0.15)';
    if (activeFolder === 'during') return 'translate(-50%, -50%) scale(0.15)';
    if (activeFolder === 'after') return 'translate(-50%, 30%) scale(0.15)';
    return 'translate(-50%, -50%) scale(0.15)';
  };

  const getActiveExplorerImage = () => {
    switch (activeFolder) {
      case 'before':
        return fileExplorerBefore;
      case 'during':
        return fileExplorerDuring;
      case 'after':
        return fileExplorerAfter;
      default:
        return fileExplorerBefore;
    }
  };

  const openFile = (file) => {
    if (file.link === PLACEHOLDER_LINK) {
      alert('Google Drive link has not been added for this file yet.');
      return;
    }
    window.open(file.link, '_blank', 'noopener,noreferrer');
  };

  // Desktop: single click selects, double click opens (like a real file explorer).
  // Touch devices: a single tap opens, since there is no double-click.
  const handleFileClick = (file) => {
    setSelectedFile(file);
    const isTouch =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) openFile(file);
  };

  const handleFileKeyDown = (e, file) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedFile(file);
      openFile(file);
    }
  };

  const handleFolderKeyDown = (e, folderKey) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openFolder(folderKey);
    }
  };

  const folderHandlers = (folderKey) => ({
    onMouseEnter: () => setHoveredFolder(folderKey),
    onMouseLeave: () => setHoveredFolder(null),
    onFocus: () => setHoveredFolder(folderKey),
    onBlur: () => setHoveredFolder(null),
    onClick: () => openFolder(folderKey),
    onKeyDown: (e) => handleFolderKeyDown(e, folderKey),
    role: 'button',
    tabIndex: 0,
    'aria-label': `Open ${folderTitles[folderKey]} folder, ${folderFiles[folderKey].length} files`,
    'aria-haspopup': 'dialog',
  });

  const renderBadge = (folderKey) => (
    <span className="ojt-badge" style={badgePositions[folderKey]} aria-hidden="true">
      {folderFiles[folderKey].length} files
    </span>
  );

  const layout = explorerLayout[activeFolder] || explorerLayout.before;

  return (
    <div
      className="canvas-board ojt-page"
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#f7f4ee'
      }}
    >
      <style>{pageStyles}</style>

      {/* Back Button */}
      <button
        type="button"
        className="ojt-back"
        onClick={onBack}
        title="Back to Desktop"
        aria-label="Back to Desktop"
      >
        <span className="ojt-back-arrow" aria-hidden="true">←</span>
        <span className="ojt-back-label">Desktop</span>
      </button>

      {/* Page title + hint */}
      <div
        className="ojt-title"
        style={{
          position: 'absolute',
          top: '24px',
          left: 0,
          right: 0,
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: '26px',
            fontWeight: 700,
            letterSpacing: '0.3px',
            color: '#2a1815'
          }}
        >
          My OJT Documents
        </h1>
        <p
          style={{
            margin: '6px 0 0',
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(42, 24, 21, 0.6)'
          }}
        >
          Pick a folder to browse what's inside
        </p>
      </div>

      {/* Scalable Container for Folders Only */}
      <div
        style={{
          width: '90%',
          maxWidth: '1000px',
          position: 'relative',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* ================= 1. BEFORE OJT FOLDER ================= */}
        <div
          {...folderHandlers('before')}
          className={`ojt-folder ${hoveredFolder === 'before' ? 'is-lifted' : ''}`}
          style={{
            width: '100%',
            position: 'relative',
            zIndex: getZIndex('before', 10),
            transform: hoveredFolder === 'before' ? 'translateY(-20px)' : 'translateY(0px)',
            transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
            cursor: 'pointer'
          }}
        >
          <img
            className="ojt-folder-img"
            src={beforeOjtImg}
            alt=""
            style={{ width: '100%', height: 'auto', display: 'block', animationDelay: '0.05s' }}
          />
          {renderBadge('before')}
        </div>

        {/* ================= 2. DURING OJT FOLDER ================= */}
        <div
          {...folderHandlers('during')}
          className={`ojt-folder ${hoveredFolder === 'during' ? 'is-lifted' : ''}`}
          style={{
            width: '100%',
            position: 'relative',
            marginTop: '-18%',
            zIndex: getZIndex('during', 20),
            transform: hoveredFolder === 'during' ? 'translateY(-20px)' : 'translateY(0px)',
            transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
            cursor: 'pointer'
          }}
        >
          <img
            className="ojt-folder-img"
            src={duringOjtImg}
            alt=""
            style={{ width: '100%', height: 'auto', display: 'block', animationDelay: '0.2s' }}
          />
          {renderBadge('during')}
        </div>

        {/* ================= 3. AFTER OJT FOLDER ================= */}
        <div
          {...folderHandlers('after')}
          className={`ojt-folder ${hoveredFolder === 'after' ? 'is-lifted' : ''}`}
          style={{
            width: '100%',
            position: 'relative',
            marginTop: '-18%',
            zIndex: getZIndex('after', 30),
            transform: hoveredFolder === 'after' ? 'translateY(-20px)' : 'translateY(0px)',
            transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
            cursor: 'pointer'
          }}
        >
          <img
            className="ojt-folder-img"
            src={afterOjtImg}
            alt=""
            style={{ width: '100%', height: 'auto', display: 'block', animationDelay: '0.35s' }}
          />
          {renderBadge('after')}
        </div>
      </div>

      {/* ================= ROOT-LEVEL BACKDROP OVERLAY ================= */}
      {activeFolder && (
        <div
          className="ojt-backdrop"
          onClick={closeFolder}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 999,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      {/* ================= ROOT-LEVEL POPUP FILE EXPLORER WINDOW ================= */}
      <div
        ref={popupRef}
        className="ojt-popup"
        role="dialog"
        aria-modal="true"
        aria-label={activeFolder ? `${folderTitles[activeFolder]} files` : 'File explorer'}
        aria-hidden={!activeFolder}
        tabIndex={-1}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '92vw',
          maxWidth: '900px',
          height: 'auto',
          maxHeight: '85vh',
          zIndex: 1000,
          transform: activeFolder ? 'translate(-50%, -50%) scale(1)' : getClosedTransform(),
          opacity: activeFolder ? 1 : 0,
          visibility: activeFolder ? 'visible' : 'hidden',
          pointerEvents: activeFolder ? 'auto' : 'none',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          borderRadius: '12px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          outline: 'none'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button overlay (sits over the red dot in the window artwork) */}
        <button
          type="button"
          onClick={closeFolder}
          aria-label="Close"
          title="Close window (Esc)"
          style={{
            position: 'absolute',
            top: '17px',
            left: '21px',
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1010,
            padding: 0
          }}
        />

        {/* Container wrapping image and grid natively to scale together */}
        <div style={{ position: 'relative', width: '100%', display: 'flex' }}>
          {/* Explorer Background Image */}
          <img
            src={getActiveExplorerImage()}
            alt=""
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />

          {/* ================= RESPONSIVE FILE ICONS GRID OVERLAY ================= */}
          {activeFolder && (
            <div
              className="ojt-grid"
              role="group"
              aria-label={`${folderTitles[activeFolder]} documents`}
              style={{
                '--grid-top': layout.top,
                '--grid-left': layout.left,
                '--grid-right': layout.right,
                '--grid-bottom': layout.bottom,
                position: 'absolute',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))',
                gap: '10px',
                padding: '8px',
                alignContent: 'start',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {folderFiles[activeFolder]?.map((file) => {
                const isSelected = selectedFile?.id === file.id;
                return (
                  <div
                    key={file.id}
                    className="ojt-file"
                    role="button"
                    tabIndex={0}
                    title={`${file.name} — double-click to open`}
                    aria-label={`${file.name}. Press Enter to open.`}
                    onClick={() => handleFileClick(file)}
                    onDoubleClick={() => openFile(file)}
                    onKeyDown={(e) => handleFileKeyDown(e, file)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      width: '100%',
                      padding: '8px 4px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      userSelect: 'none',
                      backgroundColor: isSelected ? 'rgba(42, 24, 21, 0.12)' : undefined,
                      border: isSelected ? '1px solid rgba(42, 24, 21, 0.2)' : '1px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img
                      src={fileIcon}
                      alt=""
                      draggable={false}
                      style={{ width: '40px', height: '40px', objectFit: 'contain', marginBottom: '6px' }}
                    />
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#2a1815',
                        textAlign: 'center',
                        fontWeight: 500,
                        lineHeight: '1.25',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        width: '100%',
                        wordBreak: 'break-word'
                      }}
                    >
                      {getDisplayName(file.name)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
