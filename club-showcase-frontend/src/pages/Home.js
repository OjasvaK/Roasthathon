import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Club <span className="text-purple-400">Showcase</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover amazing projects from club members, share your ideas, and collaborate on innovation.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              to="/projects"
              className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg text-white font-bold transition flex items-center gap-2"
            >
              Explore Projects <FiArrowRight />
            </Link>
            <Link 
              to="/forum"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-white font-bold transition flex items-center gap-2"
            >
              Discuss Ideas <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-gray-800 p-6 rounded-lg border border-purple-500">
            <h3 className="text-2xl font-bold text-purple-400 mb-3">📋 Project Gallery</h3>
            <p className="text-gray-300">
              Browse completed and ongoing projects from your club members. Filter by type, author, or status.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-blue-500">
            <h3 className="text-2xl font-bold text-blue-400 mb-3">💡 Idea Forum</h3>
            <p className="text-gray-300">
              Share, discuss, and vote on innovative ideas. Collaborate with fellow members.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-green-500">
            <h3 className="text-2xl font-bold text-green-400 mb-3">📤 Easy Upload</h3>
            <p className="text-gray-300">
              Upload your projects with images, descriptions, and links. Get featured in the gallery.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-20 text-center">
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-lg">
            <div className="text-3xl font-bold text-white">50+</div>
            <div className="text-gray-300">Projects</div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-lg">
            <div className="text-3xl font-bold text-white">200+</div>
            <div className="text-gray-300">Members</div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-lg">
            <div className="text-3xl font-bold text-white">300+</div>
            <div className="text-gray-300">Ideas</div>
          </div>
          <div className="bg-gradient-to-br from-pink-600 to-pink-800 p-6 rounded-lg">
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="text-gray-300">Community</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
