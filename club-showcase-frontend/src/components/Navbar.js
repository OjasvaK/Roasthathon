import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../App';

function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const logout = () => {
    handleLogout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-purple-400">
            🎨 Club Showcase
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-purple-400 transition">
              Home
            </Link>
            <Link to="/projects" className="hover:text-purple-400 transition">
              Projects
            </Link>
            <Link to="/forum" className="hover:text-purple-400 transition">
              Ideas
            </Link>
            {user && (
              <>
                <Link to="/upload" className="hover:text-purple-400 transition">
                  Upload
                </Link>
                <Link to={`/profile/${user.id}`} className="hover:text-purple-400 transition">
                  Profile
                </Link>
                <button onClick={logout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition flex items-center gap-2">
                  <FiLogOut /> Logout
                </button>
              </>
            )}
            {!user && (
              <Link to="/auth" className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-800 py-2">
            <Link to="/" className="block px-4 py-2 hover:bg-gray-700">Home</Link>
            <Link to="/projects" className="block px-4 py-2 hover:bg-gray-700">Projects</Link>
            <Link to="/forum" className="block px-4 py-2 hover:bg-gray-700">Ideas</Link>
            {user && (
              <>
                <Link to="/upload" className="block px-4 py-2 hover:bg-gray-700">Upload</Link>
                <Link to={`/profile/${user.id}`} className="block px-4 py-2 hover:bg-gray-700">Profile</Link>
                <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-700">Logout</button>
              </>
            )}
            {!user && (
              <Link to="/auth" className="block px-4 py-2 hover:bg-gray-700">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
