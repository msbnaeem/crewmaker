import React from 'react';
import { Home, Users, Plus } from 'lucide-react';

export default function Navbar({ navigateTo }) {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <h1 className="nav-title">
          <Users className="nav-icon" />
          Crewmate Manager
        </h1>
        <div className="nav-buttons">
          <button onClick={() => navigateTo('home')} className="nav-btn">
            <Home className="btn-icon" />
            Home
          </button>
          <button onClick={() => navigateTo('gallery')} className="nav-btn">
            <Users className="btn-icon" />
            Gallery
          </button>
          <button onClick={() => navigateTo('create')} className="nav-btn create-btn">
            <Plus className="btn-icon" />
            Create
          </button>
        </div>
      </div>
    </nav>
  );
}