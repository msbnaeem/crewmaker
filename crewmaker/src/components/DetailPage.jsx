import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

export default function DetailPage({ id, navigateTo }) {
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCrewmate();
  }, [id]);

  const loadCrewmate = async () => {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      setCrewmate(data);
    } catch (error) {
      console.error('Error loading crewmate:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!crewmate) {
    return <div className="loading">Crewmate not found</div>;
  }

  return (
    <div className="page-container">
      <button
        onClick={() => navigateTo('gallery')}
        className="back-btn"
      >
        <ArrowLeft className="btn-icon" />
        Back to Gallery
      </button>

      <div className="detail-card">
        <div className="detail-header">
          <h2 className="detail-title">{crewmate.name}</h2>
          <button
            onClick={() => navigateTo('edit', crewmate.id)}
            className="edit-btn-large"
          >
            <Edit className="btn-icon" />
            Edit
          </button>
        </div>

        <div className="detail-info">
          <div className="info-item">
            <span className="info-label">Speed:</span> {crewmate.speed}
          </div>
          <div className="info-item">
            <span className="info-label">Color:</span> {crewmate.color}
          </div>
          <div className="info-item">
            <span className="info-label">Created:</span> {new Date(crewmate.created_at).toLocaleDateString()}
          </div>
          <div className="info-item">
            <span className="info-label">ID:</span> {crewmate.id}
          </div>
        </div>
      </div>
    </div>
  );
}