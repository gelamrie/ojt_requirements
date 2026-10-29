import React, { useState } from 'react';
import './App.css';
import HeroFolder from './HeroFolder';
import FilesPage from './FilesPage';
import PhotoLightbox from './PhotoLightbox';
import AboutPage from './AboutPage';
import ContactMe from './ContactMe';
import PortfolioNav from './PortfolioNav';

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
  const [history, setHistory] = useState(['desktop']);
  const [openPhoto, setOpenPhoto] = useState(null); // index into `photos`, or null

  const currentPage = history[history.length - 1] || 'desktop';

  const navigateTo = (target) => {
    if (target === 'back') {
      setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : ['desktop']));
      return;
    }
    const resolved = target === 'home' ? 'desktop' : target;
    setHistory((prev) => {
      if (prev[prev.length - 1] === resolved) return prev;
      return [...prev, resolved];
    });
  };

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

  // Props that make a desktop folder open a page (mouse, touch and keyboard)
  const pageProps = (page, label) => ({
    role: 'button',
    tabIndex: 0,
    'aria-label': `Open ${label}`,
    onClick: () => navigateTo(page),
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigateTo(page);
      }
    },
  });

  // Renders ONLY the Files component
  if (currentPage === 'files') {
    return <FilesPage onNavigate={navigateTo} />;
  }

  // Renders ONLY the About Me page
  if (currentPage === 'about') {
    return <AboutPage onNavigate={navigateTo} />;
  }

  // Renders ONLY the Contact page
  if (currentPage === 'contact') {
    return <ContactMe onNavigate={navigateTo} />;
  }

  // Renders ONLY Desktop Landing Page
  return (
    <div className="page-wrapper">
      <main className="canvas-board">
        <PortfolioNav active="home" onNavigate={navigateTo} />
        {/* Top Left Elements */}
        <div
          className="desktop-item item-files"
          {...pageProps('files', 'files')}
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

        <div
          className="desktop-item item-about"
          {...pageProps('about', 'about me')}
          style={{ cursor: 'pointer' }}
        >
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

        {/* Contact Me folder opens the contact artwork. */}
        <div
          className="desktop-item item-contact"
          {...pageProps('contact', 'contact me')}
          style={{ cursor: 'pointer' }}
        >
          <div className="folder-icon small">
            <div className="folder-tab" />
            <div className="folder-paper" />
            <div className="folder-body" />
          </div>
          <span>contact me</span>
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
