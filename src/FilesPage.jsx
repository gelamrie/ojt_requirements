import React, { useState, useEffect, useRef } from 'react';
import PortfolioNav from './PortfolioNav';
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
const duringSubfolders = {
  'weekly-reports': {
    title: 'Weekly Reports',
    files: [
      { id: 'wr-1', type: 'file', name: 'Week 1: Weekly Progress Report', link: 'https://drive.google.com/file/d/1tZYa3mLoZUSKNSjU5qRL7qzKCpzWZuQV/view?usp=sharing' },
      { id: 'wr-2', type: 'file', name: 'Week 2: Weekly Progress Report', link: 'https://drive.google.com/file/d/1pb556r0U31hRGAHanGNtsNJHgcyEj7yb/view?usp=sharing' },
      { id: 'wr-3', type: 'file', name: 'Week 3: Weekly Progress Report', link: 'https://drive.google.com/file/d/1m-UA-A6ZGI8JPNtPAHFnwixcDgYnOuf1/view?usp=sharing' },
      { id: 'wr-4', type: 'file', name: 'Week 4: Weekly Progress Report', link: 'https://drive.google.com/file/d/1zQZRqirdjh8eSmeolGe45zEOVY_maV3N/view?usp=sharing' },
      { id: 'wr-5', type: 'file', name: 'Week 5: Weekly Progress Report', link: 'https://drive.google.com/file/d/1-_jl6SAjiCKYRw-fnRsdVpmI_rgWiu8h/view?usp=sharing' },
      { id: 'wr-6', type: 'file', name: 'Week 6: Weekly Progress Report', link: 'https://drive.google.com/file/d/1XNstsdjFJrTdI2SwSR97AS4tnD0EHePL/view?usp=sharing' },
      { id: 'wr-7', type: 'file', name: 'Week 7: Weekly Progress Report', link: 'https://drive.google.com/file/d/1DD_PbPP61OWFW9PJkD6w51dPHzm3a0Lg/view?usp=sharing' },
      { id: 'wr-8', type: 'file', name: 'Week 8: Weekly Progress Report', link: 'https://drive.google.com/file/d/15pzcejb0imETutDueTCZ3TgTVnoSyq1p/view?usp=sharing' },
      { id: 'wr-9', type: 'file', name: 'Week 9: Weekly Progress Report', link: 'https://drive.google.com/file/d/1mlSbOaB8os0e17abg4FlBD4fF22-lV6v/view?usp=sharing' },
      { id: 'wr-10', type: 'file', name: 'Week 10: Weekly Progress Report', link: 'https://drive.google.com/file/d/1d1_NEg767P_Yh2xKHBWzK4FspRpLjVDH/view?usp=sharing' },
      { id: 'wr-11', type: 'file', name: 'Week 11: Weekly Progress Report', link: 'https://drive.google.com/file/d/1czMQWvhZS6qE11BduJLMCdrsf2To4d00/view?usp=sharing' },
      { id: 'wr-12', type: 'file', name: 'Week 12: Weekly Progress Report', link: 'https://drive.google.com/file/d/1ayIx1SV2K6EF18TwB7UnIKV3OTik8zI5/view?usp=sharing' },
      { id: 'wr-13', type: 'file', name: 'Week 13: Weekly Progress Report', link: 'https://drive.google.com/file/d/1wYIiRxqjYC_rBtfNXsp71XlX2tAc0lSm/view?usp=sharing' },
      { id: 'wr-14', type: 'file', name: 'Week 14: Weekly Progress Report', link: 'https://drive.google.com/file/d/1R7ekvLZ39S_QzX18hacMiXYrngPl6L4H/view?usp=sharing' },
    ]
  },
  'photo-docs': {
    title: 'Weekly Photo Documentation',
    files: [
      { id: 'pd-1', type: 'file', name: 'Week 1: Photo Documentation', link: 'https://drive.google.com/file/d/1B-1SE9VKsg86ykcBj686AVaTuUDLb_ga/view?usp=sharing' },
      { id: 'pd-2', type: 'file', name: 'Week 2: Photo Documentation', link: 'https://drive.google.com/file/d/1F2uOuwtJx5wDNTSxQOIeienmBSNYfpSl/view?usp=sharing' },
      { id: 'pd-3', type: 'file', name: 'Week 3: Photo Documentation', link: 'https://drive.google.com/file/d/1q-7X18Yw-JEiYyPcwv2DyOTaPoi1fgm5/view?usp=sharing' },
      { id: 'pd-4', type: 'file', name: 'Week 4: Photo Documentation', link: 'https://drive.google.com/file/d/1ZuR7zWYGGE1o4i8u9k2atCi9Mczvg7oD/view?usp=sharing' },
      { id: 'pd-5', type: 'file', name: 'Week 5: Photo Documentation', link: 'https://drive.google.com/file/d/18cpNE1imjy0Zm7sUYnhbYNRhe-yFB1_x/view?usp=sharing' },
      { id: 'pd-6', type: 'file', name: 'Week 6: Photo Documentation', link: 'https://drive.google.com/file/d/1Fa8LmFUbHiyZLHzsuVn8hSn3fs1W9tII/view?usp=sharing' },
      { id: 'pd-7', type: 'file', name: 'Week 7: Photo Documentation', link: 'https://drive.google.com/file/d/1bEjPT3PdXOAeuPgYEjnF4cRQRXidN9qm/view?usp=sharing' },
      { id: 'pd-8', type: 'file', name: 'Week 8: Photo Documentation', link: 'https://drive.google.com/file/d/1T0SqRS97au8lKVJYW6M9GOz5MthLM8q4/view?usp=sharing' },
      { id: 'pd-9', type: 'file', name: 'Week 9: Photo Documentation', link: 'https://drive.google.com/file/d/1-8uDtZBqWSJTwBYoDzoCtbk0GpEFoHw8/view?usp=sharing' },
      { id: 'pd-10', type: 'file', name: 'Week 10: Photo Documentation', link: 'https://drive.google.com/file/d/1L6bhozlLJNkpu39NQysrqPCwmurdHN4l/view?usp=sharing' },
      { id: 'pd-11', type: 'file', name: 'Week 11: Photo Documentation', link: 'https://drive.google.com/file/d/1wCL4NRmYiHJbTln_aEbcpfPaaqc_RSpQ/view?usp=sharing' },
      { id: 'pd-12', type: 'file', name: 'Week 12: Photo Documentation', link: 'https://drive.google.com/file/d/16Tez9Yh61ndbxALM2GlYNsdds4w6YFbs/view?usp=sharing' },
      { id: 'pd-13', type: 'file', name: 'Week 13: Photo Documentation', link: 'https://drive.google.com/file/d/1dNJR03meU27nlMgW5hchvRsuLXkZY2i_/view?usp=sharing' },
      { id: 'pd-14', type: 'file', name: 'Week 14: Photo Documentation', link: 'PASTE_GDRAIVE_LINK_HERE' },
    ]
  }
};

const folderFiles = {
  before: [
    { id: 'b1', type: 'file', name: 'Cover Page', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'b2', type: 'file', name: 'Approval Sheet', link: 'https://drive.google.com/file/d/1r914eFcCUg1QoTtWLwa6aKac09B7Awje/view?usp=sharing' },
    { id: 'b3', type: 'file', name: 'Company Profile', link: 'https://drive.google.com/file/d/1p6LacSkaIplMI1xWtUrG9vMo_6xxLcNg/view?usp=sharing' },
    { id: 'b4', type: 'file', name: 'Memorandum of Agreement', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'b5', type: 'file', name: 'Letter of Intent', link: 'https://drive.google.com/file/d/1qwoRBP3yfEGYJK3tR6srlUWCmwdCsUJQ/view?usp=sharing' },
    { id: 'b6', type: 'file', name: 'Letter of Endorsement', link: 'https://drive.google.com/file/d/1wxS2glqkuNFUzP9WS8IgafcI3zg3ClcV/view?usp=sharing' },
    { id: 'b7', type: 'file', name: 'Student Waiver', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'b8', type: 'file', name: 'Consent Form', link: 'https://drive.google.com/file/d/19q4SeCejNqVnnt0o7q7t5FNLjIkHk0xF/view?usp=sharing' },
    { id: 'b9', type: 'file', name: 'Curriculum Vitae', link: 'https://drive.google.com/file/d/1jCh-ChImizoJvjC7ol1Pqre9rstVnIY5/view?usp=sharing' },
    { id: 'b10', type: 'file', name: 'Insurance', link: 'https://drive.google.com/file/d/1jCh-ChImizoJvjC7ol1Pqre9rstVnIY5/view?usp=sharing' },
    { id: 'b11', type: 'file', name: 'Medical Certificate', link: 'https://drive.google.com/file/d/1_9It8bxDPFw2LDyd44kN_xknsGtR5ToK/view?usp=sharing' },
  ],
  during: [
    { id: 'd-dtr', type: 'file', name: 'Daily Time Record', link: 'PASTE_GDRAIVE_LINK_HERE' },
    {
      id: 'd-weekly-reports',
      type: 'folder',
      name: 'Weekly Reports',
      subfolderKey: 'weekly-reports'
    },
    {
      id: 'd-photo-docs',
      type: 'folder',
      name: 'Weekly Photo Documentation',
      subfolderKey: 'photo-docs'
    },
  ],
  after: [
    { id: 'a1', type: 'file', name: 'Training Supervisor Form', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'a2', type: 'file', name: 'HTE Performance', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'a3', type: 'file', name: 'OJT Adviser Performance', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'a4', type: 'file', name: 'Trainee Performance', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'a5', type: 'file', name: 'Performance Evaluation', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'a6', type: 'file', name: 'Certificate of Completion', link: 'PASTE_GDRAIVE_LINK_HERE' },
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
const getDisplayName = (name) => {
  if (/^Week \d+:/.test(name)) {
    return name.replace(/^(Week \d+):.*$/, '$1');
  }
  return name;
};

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

.ojt-file:focus-visible {
  outline: 2px solid #2a1815;
  outline-offset: 1px;
}

.ojt-file:hover {
  background-color: rgba(42, 24, 21, 0.06);
}

.ojt-file.is-folder:hover {
  background-color: rgba(230, 168, 56, 0.15);
}

.ojt-grid-wrapper {
  top: var(--grid-top);
  left: var(--grid-left);
  right: var(--grid-right);
  bottom: var(--grid-bottom);
}

.ojt-breadcrumb-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 6px;
  background: #fffdf8;
  border: 1px solid #2a1815;
  box-shadow: 1.5px 1.5px 0 #2a1815;
  font-size: 11px;
  font-weight: 600;
  color: #2a1815;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease, background-color 0.15s ease;
}

.ojt-breadcrumb-btn:hover {
  background: #fff3d6;
  transform: translate(0.5px, 0.5px);
  box-shadow: 1px 1px 0 #2a1815;
}

.ojt-breadcrumb-btn:active {
  transform: translate(1.5px, 1.5px);
  box-shadow: none;
}

/* Narrow screens: give the icons more room by pulling the grid left */
@media (max-width: 640px) {
  .ojt-grid-wrapper {
    left: max(2%, calc(var(--grid-left) - 10%)) !important;
    right: 2% !important;
  }
  .ojt-grid {
    grid-template-columns: repeat(auto-fill, minmax(68px, 1fr)) !important;
    gap: 6px !important;
  }
}

/* Respect reduced-motion preferences */
@media (prefers-reduced-motion: reduce) {
  .ojt-folder-img {
    animation: none !important;
  }
  .ojt-folder,
  .ojt-popup,
  .ojt-backdrop,
  .ojt-badge,
  .ojt-file {
    transition: none !important;
  }
}
`;

function FolderIcon({ style, className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', ...style }}
      className={className}
      aria-hidden="true"
    >
      {/* Folder Back Tab */}
      <path
        d="M7 17C7 14.7909 8.79086 13 11 13H24.5C25.9 13 27.2 13.7 28 14.9L30.2 18H53C55.2091 18 57 19.7909 57 22V47C57 49.2091 55.2091 51 53 51H11C8.79086 51 7 49.2091 7 47V17Z"
        fill="#e5a83b"
      />
      {/* Folder Paper sheet peek */}
      <path
        d="M12 18C12 16.8954 12.8954 16 14 16H48C49.1046 16 50 16.8954 50 18V26H12V18Z"
        fill="#ffffff"
        fillOpacity="0.8"
      />
      {/* Folder Front Pocket Body */}
      <path
        d="M7 23C7 20.7909 8.79086 19 11 19H53C55.2091 19 57 20.7909 57 23V47C57 49.2091 55.2091 51 53 51H11C8.79086 51 7 49.2091 7 47V23Z"
        fill="#f5c253"
      />
      {/* Top subtle highlight */}
      <path
        d="M7 23.5C7 21.567 8.567 20 10.5 20H53.5C55.433 20 57 21.567 57 23.5V25H7V23.5Z"
        fill="#ffffff"
        fillOpacity="0.3"
      />
      {/* Folder subtle bottom crease */}
      <rect x="7" y="48" width="50" height="2" rx="1" fill="#d99b2c" fillOpacity="0.4" />
    </svg>
  );
}

export default function FilesPage({ onNavigate }) {
  const [hoveredFolder, setHoveredFolder] = useState(null);
  const [activeFolder, setActiveFolder] = useState(null);
  const [currentSubfolder, setCurrentSubfolder] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const popupRef = useRef(null);
  const lastFocusedRef = useRef(null);

  const openFolder = (folderKey) => {
    lastFocusedRef.current = document.activeElement;
    setCurrentSubfolder(null);
    setSelectedFile(null);
    setActiveFolder(folderKey);
  };

  const closeFolder = () => {
    setActiveFolder(null);
    setCurrentSubfolder(null);
    setSelectedFile(null);
    // Return focus to whatever opened the window
    if (lastFocusedRef.current && typeof lastFocusedRef.current.focus === 'function') {
      lastFocusedRef.current.focus();
    }
  };

  // Escape closes subfolder first, or the popup
  useEffect(() => {
    if (!activeFolder) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (currentSubfolder) {
          setCurrentSubfolder(null);
          setSelectedFile(null);
        } else {
          closeFolder();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [activeFolder, currentSubfolder]);

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

  // Folders open on single click as requested.
  // Files: single click selects, double click opens. On touch, single tap opens.
  const handleItemClick = (item) => {
    setSelectedFile(item);
    if (item.type === 'folder') {
      setCurrentSubfolder(item.subfolderKey);
      setSelectedFile(null);
    } else {
      const isTouch =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(pointer: coarse)').matches;
      if (isTouch) openFile(item);
    }
  };

  const handleItemDoubleClick = (item) => {
    if (item.type === 'folder') {
      setCurrentSubfolder(item.subfolderKey);
      setSelectedFile(null);
    } else {
      openFile(item);
    }
  };

  const handleItemKeyDown = (e, item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (item.type === 'folder') {
        setCurrentSubfolder(item.subfolderKey);
        setSelectedFile(null);
      } else {
        setSelectedFile(item);
        openFile(item);
      }
    }
  };

  const handleFolderKeyDown = (e, folderKey) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openFolder(folderKey);
    }
  };

  const getBadgeText = (folderKey) => {
    if (folderKey === 'during') return '3 items';
    return `${folderFiles[folderKey]?.length || 0} files`;
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
    'aria-label': `Open ${folderTitles[folderKey]} folder, ${getBadgeText(folderKey)}`,
    'aria-haspopup': 'dialog',
  });

  const renderBadge = (folderKey) => (
    <span className="ojt-badge" style={badgePositions[folderKey]} aria-hidden="true">
      {getBadgeText(folderKey)}
    </span>
  );

  const layout = explorerLayout[activeFolder] || explorerLayout.before;

  const getActiveItems = () => {
    if (!activeFolder) return [];
    if (activeFolder === 'during' && currentSubfolder) {
      return duringSubfolders[currentSubfolder]?.files || [];
    }
    return folderFiles[activeFolder] || [];
  };

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
        backgroundColor: '#f7f4ee',
        // Keep the folder stack clear of the title + hint at the top
        boxSizing: 'border-box',
        padding: 0
      }}
    >
      <style>{pageStyles}</style>

      {/* Navigation */}
      <PortfolioNav active="files" onNavigate={onNavigate} />

      {/* Scalable Container for Folders Only */}
      <div
        style={{
          // The three stacked folders are about 0.65x as tall as they are wide, so
          // cap the width by the available height with room for navbar.
          width: 'min(90vw, 1000px, calc((100vh - 90px) * 1.53))',
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
              className="ojt-grid-wrapper"
              style={{
                '--grid-top': layout.top,
                '--grid-left': layout.left,
                '--grid-right': layout.right,
                '--grid-bottom': layout.bottom,
                position: 'absolute',
                top: layout.top,
                left: layout.left,
                right: layout.right,
                bottom: layout.bottom,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Breadcrumb Navigation when inside a subfolder */}
              {activeFolder === 'during' && currentSubfolder && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '2px 6px 8px 6px',
                    borderBottom: '1px solid rgba(42, 24, 21, 0.1)',
                    marginBottom: '6px',
                    flexShrink: 0
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentSubfolder(null);
                      setSelectedFile(null);
                    }}
                    className="ojt-breadcrumb-btn"
                    title="Back to During OJT root"
                  >
                    <span aria-hidden="true">←</span> Back
                  </button>
                  <span style={{ fontSize: '11px', color: 'rgba(42, 24, 21, 0.45)', fontWeight: 500 }}>
                    During OJT &nbsp;/
                  </span>
                  <span style={{ fontSize: '12px', color: '#2a1815', fontWeight: 700 }}>
                    {duringSubfolders[currentSubfolder]?.title}
                  </span>
                </div>
              )}

              {/* Items Grid */}
              <div
                className="ojt-grid"
                role="group"
                aria-label={
                  currentSubfolder
                    ? `${duringSubfolders[currentSubfolder]?.title} documents`
                    : `${folderTitles[activeFolder]} documents`
                }
                style={{
                  flex: 1,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))',
                  gap: '10px',
                  padding: '6px',
                  alignContent: 'start',
                  overflowY: 'auto',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {getActiveItems().map((item) => {
                  const isSelected = selectedFile?.id === item.id;
                  const isFolder = item.type === 'folder';

                  return (
                    <div
                      key={item.id}
                      className={`ojt-file ${isFolder ? 'is-folder' : ''}`}
                      role="button"
                      tabIndex={0}
                      title={
                        isFolder
                          ? `${item.name} (Folder) — click to open`
                          : `${item.name} — double-click to open`
                      }
                      aria-label={
                        isFolder
                          ? `${item.name} folder. Press Enter to open.`
                          : `${item.name}. Press Enter to open.`
                      }
                      onClick={() => handleItemClick(item)}
                      onDoubleClick={() => handleItemDoubleClick(item)}
                      onKeyDown={(e) => handleItemKeyDown(e, item)}
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
                      {isFolder ? (
                        <FolderIcon style={{ width: '42px', height: '40px', marginBottom: '6px' }} />
                      ) : (
                        <img
                          src={fileIcon}
                          alt=""
                          draggable={false}
                          style={{ width: '40px', height: '40px', objectFit: 'contain', marginBottom: '6px' }}
                        />
                      )}
                      <span
                        style={{
                          fontSize: '11px',
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
                        {getDisplayName(item.name)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
