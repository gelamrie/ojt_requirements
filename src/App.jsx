import React, { useState } from 'react';
import './App.css';
import HeroFolder from './HeroFolder';
import FilesPage from './FilesPage'; // <-- Fixed default import

import finderIcon from './assets/finder.png';
import settingsIcon from './assets/settings.png';
import photoboothImg from './assets/photobooth.png';
import internsImg from './assets/interns.png';
import jabeeImg from './assets/jabee.png';

export default function App() {
  const [currentPage, setCurrentPage] = useState('desktop');

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
          <div className="photo-card">
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
          <div className="photo-card photobooth-card">
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
          <div className="photo-card">
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
    </div>
  );
}