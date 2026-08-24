import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from './routes';

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/login');
  };

  return <AppRoutes user={user} setUser={setUser} handleLogout={handleLogout} />;
}