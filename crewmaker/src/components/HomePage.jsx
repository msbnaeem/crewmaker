import React from 'react';
import { Plus, Users } from 'lucide-react';

export default function HomePage({ navigateTo }) {
  return (
    <div className="home-page">
      <div className="home-header">
        <h2 className="home-title">Welcome to Crewmate Manager!</h2>
        <p className="home-subtitle">Build and manage your dream team</p>
      </div>
      
      <div className="home-cards">
        <button
          onClick={() => navigateTo('create')}
          className="home-card create-card"
        >
          <Plus className="card-icon" />
          <h3 className="card-title">Create Crewmate</h3>
          <p className="card-description">Add a new member to your team</p>
        </button>
        
        <button
          onClick={() => navigateTo('gallery')}
          className="home-card gallery-card"
        >
          <Users className="card-icon" />
          <h3 className="card-title">View Gallery</h3>
          <p className="card-description">See all your crewmates</p>
        </button>
      </div>
    </div>
  );
}