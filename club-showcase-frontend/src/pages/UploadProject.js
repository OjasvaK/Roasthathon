import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';

function UploadProject() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Web Development',
    status: 'ongoing',
    mediaUrl: '',
    tags: '',
    images: []
  });
  const [preview, setPreview] = useState([]);

  const projectTypes = [
    'Web Development',
    'AI/ML',
    'Hardware',
    'Mobile App',
    'Data Science',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(prev => [...prev, event.target.result]);
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, event.target.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tags = formData.tags.split(',').map(t => t.trim()).filter(t => t);
      const payload = {
        ...formData,
        tags
      };

      const res = await axios.post('/api/projects', payload);
      alert('Project uploaded successfully! It will appear once approved by moderators.');
      setFormData({
        title: '',
        description: '',
        type: 'Web Development',
        status: 'ongoing',
        mediaUrl: '',
        tags: '',
        images: []
      });
      setPreview([]);
    } catch (error) {
      console.error('Error uploading project:', error);
      alert('Error uploading project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 py-12 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Please login to upload a project</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Upload Your Project</h1>

        <div className="bg-gray-800 p-8 rounded-lg border border-purple-500">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-white font-semibold mb-2">Project Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-purple-500 outline-none"
                placeholder="Enter project title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-white font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-purple-500 outline-none resize-none"
                placeholder="Describe your project in detail"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-white font-semibold mb-2">Project Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-purple-500 outline-none"
              >
                {projectTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-white font-semibold mb-2">Project Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-purple-500 outline-none"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Images */}
            <div>
              <label className="block text-white font-semibold mb-2">Project Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600"
              />
              {preview.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {preview.map((img, idx) => (
                    <img key={idx} src={img} alt={`Preview ${idx}`} className="w-full h-32 object-cover rounded" />
                  ))}
                </div>
              )}
            </div>

            {/* Media URL */}
            <div>
              <label className="block text-white font-semibold mb-2">Project Link / URL</label>
              <input
                type="url"
                name="mediaUrl"
                value={formData.mediaUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-purple-500 outline-none"
                placeholder="https://example.com/project"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-white font-semibold mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-purple-500 outline-none"
                placeholder="react, frontend, tailwind"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              {loading ? 'Uploading...' : 'Upload Project'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-800 text-white rounded">
            <p className="text-sm">
              ℹ️ Your project will be reviewed by our moderators before appearing in the showcase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadProject;
