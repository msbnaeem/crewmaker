import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CreatePage from './components/CreatePage';
import GalleryPage from './components/GalleryPage';
import DetailPage from './components/DetailPage';
import EditPage from './components/EditPage';
import { supabase } from './services/supabaseClient';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');
  const [crewmates, setCrewmates] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (page === 'gallery') {
      loadCrewmates();
    }
  }, [page]);

  const loadCrewmates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setCrewmates(data || []);
    } catch (error) {
      console.error('Error loading crewmates:', error);
      alert('Error loading crewmates');
    }
    setLoading(false);
  };

  const navigateTo = (newPage, id = null) => {
    setPage(newPage);
    setSelectedId(id);
  };

  return (
    <div className="app">
      <Navbar navigateTo={navigateTo} />
      
      <div className="container">
        {page === 'home' && <HomePage navigateTo={navigateTo} />}
        {page === 'create' && <CreatePage navigateTo={navigateTo} loadCrewmates={loadCrewmates} />}
        {page === 'gallery' && <GalleryPage crewmates={crewmates} loading={loading} navigateTo={navigateTo} />}
        {page === 'detail' && <DetailPage id={selectedId} navigateTo={navigateTo} />}
        {page === 'edit' && <EditPage id={selectedId} navigateTo={navigateTo} loadCrewmates={loadCrewmates} />}
      </div>
    </div>
  );
}