import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import IdeaCard from '../components/IdeaCard';
import { AuthContext } from '../App';
import { FiPlus } from 'react-icons/fi';

function ForumPage() {
  const { user } = useContext(AuthContext);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Innovation',
    tags: ''
  });

  const categories = ['Innovation', 'Events', 'Project', 'Feature', 'Other'];

  useEffect(() => {
    fetchIdeas();
  }, [category]);

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const params = category ? `?category=${category}` : '';
      const res = await axios.get(`/api/forum${params}`);
      setIdeas(res.data.ideas);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to post an idea');
      return;
    }

    try {
      const tags = formData.tags.split(',').map(t => t.trim()).filter(t => t);
      const res = await axios.post('/api/forum', {
        ...formData,
        tags
      });
      setIdeas([res.data.idea, ...ideas]);
      setFormData({ title: '', description: '', category: 'Innovation', tags: '' });
      setShowForm(false);
      alert('Idea submitted and pending approval!');
    } catch (error) {
      console.error('Error creating idea:', error);
      alert('Error creating idea. Please try again.');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Idea Forum</h1>
          {user && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <FiPlus /> Post Idea
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8 border border-blue-500">
            <h2 className="text-2xl font-bold text-white mb-4">Share Your Idea</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Idea Title"
                value={formData.title}
                onChange={handleFormChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none"
                required
              />
              <textarea
                name="description"
                placeholder="Describe your idea in detail..."
                value={formData.description}
                onChange={handleFormChange}
                rows="4"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none resize-none"
                required
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="text"
                name="tags"
                placeholder="Tags (comma-separated)"
                value={formData.tags}
                onChange={handleFormChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
                >
                  Post Idea
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8 flex gap-2 flex-wrap">
          <button
            onClick={() => setCategory('')}
            className={`px-4 py-2 rounded transition ${
              category === ''
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All Ideas
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded transition ${
                category === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Ideas List */}
        {loading ? (
          <div className="text-center text-gray-300 py-12">Loading ideas...</div>
        ) : ideas.length === 0 ? (
          <div className="text-center text-gray-300 py-12">No ideas yet. Be the first to share!</div>
        ) : (
          <div className="space-y-4">
            {ideas.map(idea => (
              <IdeaCard key={idea._id} idea={idea} onInteract={() => fetchIdeas()} />
            ))}
          </div>
        )}

        {!user && !showForm && (
          <div className="bg-blue-800 text-white p-4 rounded-lg text-center">
            <p>Login to share your ideas and participate in discussions!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForumPage;
