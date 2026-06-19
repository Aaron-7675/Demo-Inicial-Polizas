import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function Topbar({ title, right }) {
  const ctx = useOutletContext?.() || {};
  const openSidebar = ctx.openSidebar || (() => {});

  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button className="menu-btn" onClick={openSidebar} aria-label="Abrir menú">☰</button>
        <span className="topbar-title">{title}</span>
      </div>
      {right && <div className="topbar-right">{right}</div>}
    </div>
  );
}
