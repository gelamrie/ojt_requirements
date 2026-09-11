import React, { useState } from 'react';

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
    { id: 'b11', name: 'Medical Certificate', link: 'https://drive.google.com/file/d/1qwoRBP3yfEGYJK3tR6srlUWCmwdCsUJQ/view?usp=sharing' },
  ],
  during: [
    { id: 'd1', name: 'Daily Time Record', link: 'PASTE_GDRAIVE_LINK_HERE' },
    { id: 'd2', name: 'Weekly Progress Report', link: 'PASTE_GDRAIVE_LINK_HERE' },
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

export default function FilesPage({ onBack }) {
  const [hoveredFolder, setHoveredFolder] = useState(null);
  const [activeFolder, setActiveFolder] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleFileClick = (file) => {
    setSelectedFile(file);
    if (file.link && file.link !== 'PASTE_GDRAIVE_LINK_HERE') {
      window.open(file.link, '_blank');
    }
  };

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
        backgroundColor: '#f7f4ee'
      }}
    >
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        style={{
          position: 'absolute',
          top: '24px',
          left: '32px',
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '42px',
          height: '42px',
          backgroundColor: '#ffffff',
          border: '1px solid #e2ded8',
          borderRadius: '50%',
          fontSize: '18px',
          color: '#2a1815',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(42, 24, 21, 0.08)',
          transition: 'all 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(42, 24, 21, 0.12)';
          e.currentTarget.style.backgroundColor = '#faf5ee';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(42, 24, 21, 0.08)';
          e.currentTarget.style.backgroundColor = '#ffffff';
        }}
        title="Back to Desktop"
      >
        ←
      </button>

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
          onMouseEnter={() => setHoveredFolder('before')}
          onMouseLeave={() => setHoveredFolder(null)}
          onClick={() => setActiveFolder('before')}
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
            src={beforeOjtImg}
            alt="Before OJT Folder"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* ================= 2. DURING OJT FOLDER ================= */}
        <div
          onMouseEnter={() => setHoveredFolder('during')}
          onMouseLeave={() => setHoveredFolder(null)}
          onClick={() => setActiveFolder('during')}
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
            src={duringOjtImg}
            alt="During OJT Folder"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* ================= 3. AFTER OJT FOLDER ================= */}
        <div
          onMouseEnter={() => setHoveredFolder('after')}
          onMouseLeave={() => setHoveredFolder(null)}
          onClick={() => setActiveFolder('after')}
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
            src={afterOjtImg}
            alt="After OJT Folder"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </div>

      {/* ================= ROOT-LEVEL BACKDROP OVERLAY ================= */}
      {activeFolder && (
        <div
          onClick={() => { setActiveFolder(null); setSelectedFile(null); }}
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
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '85vw',
          maxWidth: '900px',
          height: 'auto',
          zIndex: 1000,
          transform: activeFolder ? 'translate(-50%, -50%) scale(1)' : getClosedTransform(),
          opacity: activeFolder ? 1 : 0,
          pointerEvents: activeFolder ? 'auto' : 'none',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          borderRadius: '12px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button overlay */}
        <button
          onClick={() => { setActiveFolder(null); setSelectedFile(null); }}
          style={{
            position: 'absolute',
            top: '22px',
            left: '26px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1010,
            outline: 'none'
          }}
          title="Close window"
        />

        {/* Explorer Background Image */}
        <img
          src={getActiveExplorerImage()}
          alt="File Explorer View"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

        {/* ================= FILE ICONS GRID OVERLAY ================= */}
        {activeFolder && (
          <div
            style={{
              position: 'absolute',
              top: '90px',
              left: '280px',
              right: '40px',
              bottom: '40px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(95px, 1fr))',
              gap: '16px',
              padding: '16px',
              alignContent: 'start',
              overflowY: 'auto'
            }}
          >
            {folderFiles[activeFolder]?.map((file) => (
              <div
                key={file.id}
                onClick={() => handleFileClick(file)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  width: '90px',
                  padding: '8px 4px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedFile?.id === file.id ? 'rgba(42, 24, 21, 0.1)' : 'transparent',
                  border: selectedFile?.id === file.id ? '1px solid rgba(42, 24, 21, 0.15)' : '1px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <img
                  src={fileIcon}
                  alt={file.name}
                  style={{ width: '42px', height: '42px', objectFit: 'contain', marginBottom: '6px' }}
                />
                <span
                  style={{
                    fontSize: '10px',
                    color: '#2a1815',
                    textAlign: 'center',
                    fontWeight: 500,
                    lineHeight: '1.2',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    width: '100%'
                  }}
                >
                  {file.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}