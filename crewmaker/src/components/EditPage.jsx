import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

const SPEEDS = ['Fast', 'Medium', 'Slow'];
const COLORS = ['Red', 'Blue', 'Green', 'Purple', 'Yellow', 'Orange', 'Pink', 'Cyan'];

export default function EditPage({ id, navigateTo, loadCrewmates }) {
  const [crewmate, setCrewmate] = useState(null);
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
      setName(data.name);
      setSpeed(data.speed);
      setColor(data.color);
    } catch (error) {
      console.error('Error loading crewmate:', error);
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    if (!name || !speed || !color) {
      alert('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('crewmates')
        .update({ name, speed, color })
        .eq('id', id);
      
      if (error) throw error;
      
      alert('Crewmate updated successfully!');
      await loadCrewmates();
      navigateTo('detail', id);
    } catch (error) {
      console.error('Error updating crewmate:', error);
      alert('Error updating crewmate');
    }
    setSubmitting(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this crewmate?')) {
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('crewmates')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      alert('Crewmate deleted successfully!');
      await loadCrewmates();
      navigateTo('gallery');
    } catch (error) {
      console.error('Error deleting crewmate:', error);
      alert('Error deleting crewmate');
    }
    setSubmitting(false);
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
        onClick={() => navigateTo('detail', id)}
        className="back-btn"
      >
        <ArrowLeft className="btn-icon" />
        Back to Details
      </button>

      <div className="form-card">
        <h2 className="form-title">Edit Crewmate</h2>
        
        <div className="form-content">
          <div className="form-group">
            <label className="form-label">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Speed:</label>
            <div className="options-grid">
              {SPEEDS.map(s => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`option-btn ${speed === s ? 'option-selected' : ''}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Color:</label>
            <div className="options-grid colors-grid">
              {COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`option-btn ${color === c ? 'option-selected' : ''}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="button-group">
            <button
              onClick={handleUpdate}
              disabled={submitting}
              className="submit-btn update-btn"
            >
              {submitting ? 'Updating...' : 'Update Crewmate'}
            </button>
            <button
              onClick={handleDelete}
              disabled={submitting}
              className="delete-btn"
            >
              <Trash2 className="btn-icon" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}