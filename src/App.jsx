import React, { useState } from 'react';
import './App.css';
import HeroFolder from './HeroFolder';
import FilesPage from './FilesPage'; // <-- Fixed default import
import PhotoLightbox from './PhotoLightbox';

import finderIcon from './assets/finder.png';
import settingsIcon from './assets/settings.png';

// Small thumbnails shown on the desktop
import photoboothImg from './assets/photobooth.png';
import internsImg from './assets/interns.png';
import jabeeImg from './assets/jabee.png';

// Full-size photos shown in the enlarged viewer
import internsFull from './assets/interns-full.jpg';
import photoboothFull from './assets/photobooth-full.jpg';
import jabeeFull from './assets/jabee-full.jpg';

// Photos that open in the enlarged viewer.
// `src` is the small desktop thumbnail. `full` is what the viewer shows when you click.
const photos = [
  { id: 'interns', name: 'interns.jpg', alt: 'interns', src: internsImg, full: internsFull },
  { id: 'photobooth', name: 'photobooth.png', alt: 'photobooth', src: photoboothImg, full: photoboothFull },
  { id: 'jabee', name: 'jabee.jpg', alt: 'jabee', src: jabeeImg, full: jabeeFull },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('desktop');
  const [openPhoto, setOpenPhoto] = useState(null); // index into `photos`, or null

  // Props that make a photo card behave like a button (mouse, touch and keyboard)
  const photoProps = (id) => {
    const index = photos.findIndex((p) => p.id === id);
    return {
      role: 'button',
      tabIndex: 0,
      'aria-label': `View ${photos[index].name} larger`,
      onClick: () => setOpenPhoto(index),
      onKeyDown: (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpenPhoto(index);
        }
      },
    };
  };

  // Renders ONLY the Files component
  if (currentPage === 'files') {
    return <FilesPage onBack={() => setCurrentPage('desktop')} />; // <-- Updated component name
  }

  // Renders ONLY Desktop Landing Page
  return (
    <div className="page-wrapper">
      <main className="canvas-board">
        {/* Top Left Elements */}
        <div
          className="desktop-item item-files"
          onClick={() => setCurrentPage('files')}
          style={{ cursor: 'pointer' }}
        >
          <div className="folder-icon small">
            <div className="folder-tab" />
            <div className="folder-paper" />
            <div className="folder-body" />
          </div>
          <span>files</span>
        </div>

        <div className="desktop-item item-finder">
          <img src={finderIcon} alt="Finder" className="app-icon finder-icon" />
        </div>

        {/* Top Right Elements */}
        <div className="desktop-item item-interns">
          <div className="photo-card" {...photoProps('interns')}>
            <img src={internsImg} alt="interns" />
            <span>interns.jpg</span>
          </div>
        </div>

        <div className="desktop-item item-settings settings-container">
          <img src={settingsIcon} alt="Settings" className="app-icon settings-icon" />
        </div>

        {/* Encapsulated Central Hero Component */}
        <HeroFolder year="2026" />

        {/* Bottom Elements */}
        <div className="desktop-item item-photobooth">
          <div className="photo-card photobooth-card" {...photoProps('photobooth')}>
            <img src={photoboothImg} alt="photobooth" className="photobooth-img" />
            <span>photobooth.png</span>
          </div>
        </div>

        <div className="desktop-item item-about">
          <div className="folder-icon small">
            <div className="folder-tab" />
            <div className="folder-paper" />
            <div className="folder-body" />
          </div>
          <span>about me</span>
        </div>

        <div className="desktop-item item-jabee">
          <div className="photo-card" {...photoProps('jabee')}>
            <img src={jabeeImg} alt="jabee" />
            <span>jabee.jpg</span>
          </div>
        </div>

        <div className="desktop-item item-contact">
          <div className="folder-icon small">
            <div className="folder-tab" />
            <div className="folder-paper" />
            <div className="folder-body" />
          </div>
          <span>contact info</span>
        </div>
      </main>

      {/* Enlarged photo viewer */}
      <PhotoLightbox
        photos={photos}
        index={openPhoto}
        onClose={() => setOpenPhoto(null)}
        onChange={setOpenPhoto}
      />
    </div>
  );
}
