import React from 'react';
import { Users, Edit } from 'lucide-react';

export default function GalleryPage({ crewmates, loading, navigateTo }) {
  if (loading) {
    return <div className="loading">Loading crewmates...</div>;
  }

  if (crewmates.length === 0) {
    return (
      <div className="empty-state">
        <h2 className="gallery-title">Your Crewmate Gallery</h2>
        <div className="empty-card">
          <Users className="empty-icon" />
          <p className="empty-text">No crewmates yet. Start building your team!</p>
          <button
            onClick={() => navigateTo('create')}
            className="empty-btn"
          >
            Create Your First Crewmate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <h2 className="gallery-title">Your Crewmate Gallery</h2>
      <div className="gallery-grid">
        {crewmates.map(crewmate => (
          <div
            key={crewmate.id}
            className="crewmate-card"
            onClick={() => navigateTo('detail', crewmate.id)}
          >
            <div className="card-header">
              <h3 className="crewmate-name">{crewmate.name}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('edit', crewmate.id);
                }}
                className="edit-btn"
              >
                <Edit className="btn-icon" />
              </button>
            </div>
            <div className="card-info">
              <p><span className="info-label">Speed:</span> {crewmate.speed}</p>
              <p><span className="info-label">Color:</span> {crewmate.color}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}