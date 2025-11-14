import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';
import { FiFilter } from 'react-icons/fi';

function ProjectShowcase() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const projectTypes = [
    'Web Development',
    'AI/ML',
    'Hardware',
    'Mobile App',
    'Data Science',
    'Other'
  ];

  useEffect(() => {
    fetchProjects();
  }, [type, status, page]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (type) params.append('type', type);
      if (status) params.append('status', status);
      params.append('page', page);

      const res = await axios.get(`/api/projects?${params}`);
      setProjects(res.data.projects);
      setTotalPages(res.data.pages);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'type') setType(value === type ? '' : value);
    if (filterType === 'status') setStatus(value === status ? '' : value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Project Showcase</h1>

        {/* Filters */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FiFilter className="text-purple-400" />
            <h2 className="text-xl font-bold text-white">Filters</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Type Filter */}
            <div>
              <h3 className="text-white font-semibold mb-3">Project Type</h3>
              <div className="grid grid-cols-2 gap-2">
                {projectTypes.map(t => (
                  <button
                    key={t}
                    onClick={() => handleFilterChange('type', t)}
                    className={`px-4 py-2 rounded transition ${
                      type === t
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h3 className="text-white font-semibold mb-3">Status</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleFilterChange('status', 'ongoing')}
                  className={`px-4 py-2 rounded transition ${
                    status === 'ongoing'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Ongoing
                </button>
                <button
                  onClick={() => handleFilterChange('status', 'completed')}
                  className={`px-4 py-2 rounded transition ${
                    status === 'completed'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>

          {(type || status) && (
            <button
              onClick={() => {
                setType('');
                setStatus('');
                setPage(1);
              }}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center text-gray-300 py-12">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-gray-300 py-12">No projects found. Try different filters.</div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {projects.map(project => (
                <ProjectCard key={project._id} project={project} onLike={() => fetchProjects()} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 hover:bg-gray-600 transition"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-300">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 hover:bg-gray-600 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectShowcase;
