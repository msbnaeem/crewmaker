import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

const SPEEDS = ['Fast', 'Medium', 'Slow'];
const COLORS = ['Red', 'Blue', 'Green', 'Purple', 'Yellow', 'Orange', 'Pink', 'Cyan'];

export default function CreatePage({ navigateTo, loadCrewmates }) {
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name || !speed || !color) {
      alert('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('crewmates')
        .insert([{ name, speed, color }]);
      
      if (error) throw error;
      
      alert('Crewmate created successfully!');
      setName('');
      setSpeed('');
      setColor('');
      await loadCrewmates();
      navigateTo('gallery');
    } catch (error) {
      console.error('Error creating crewmate:', error);
      alert('Error creating crewmate');
    }
    setSubmitting(false);
  };

  return (
    <div className="page-container">
      <button
        onClick={() => navigateTo('home')}
        className="back-btn"
      >
        <ArrowLeft className="btn-icon" />
        Back to Home
      </button>

      <div className="form-card">
        <h2 className="form-title">Create a New Crewmate</h2>
        
        <div className="form-content">
          <div className="form-group">
            <label className="form-label">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter crewmate name"
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

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="submit-btn"
          >
            {submitting ? 'Creating...' : 'Create Crewmate'}
          </button>
        </div>
      </div>
    </div>
  );
}