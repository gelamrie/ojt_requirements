import React from 'react';

export default function HeroFolder({ year = "2026" }) {
  return (
    <div className="hero-center-container">
      <div className="hero-center">
        {/* Back folder body and paper insert */}
        <div className="folder-icon large folder-back">
          <div className="folder-tab" />
          <div className="folder-paper" />
          <div className="folder-body" />
        </div>

        {/* Title Typography */}
        <div className="title-text-group">
          <span className="script-title">ojt</span>
          <h1 className="bold-title">portfolio</h1>
        </div>

        {/* Front semi-transparent folder tab */}
        <div className="folder-front-overlay" />

        {/* Subtitle / Year */}
        <p className="year">( {year} )</p>
      </div>
    </div>
  );
}