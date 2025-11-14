import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectShowcase from './pages/ProjectShowcase';
import ForumPage from './pages/ForumPage';
import UploadProject from './pages/UploadProject';
import AuthPage from './pages/AuthPage';
import UserProfile from './pages/UserProfile';
import './App.css';

export const AuthContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token is still valid
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/api/users/me')
        .then(res => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogin, handleLogout }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectShowcase />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/upload" element={user ? <UploadProject /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
          <Route path="/profile/:id" element={<UserProfile />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
