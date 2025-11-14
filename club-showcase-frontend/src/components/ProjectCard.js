import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiThumbsUp, FiDownload } from 'react-icons/fi';

function ProjectCard({ project, onLike }) {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      const res = await axios.patch(`/api/projects/${project._id}/like`);
      setLiked(!liked);
      onLike && onLike(res.data.project);
    } catch (error) {
      console.error('Error liking project:', error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105">
      {/* Project Image */}
      {project.images && project.images[0] && (
        <img 
          src={project.images[0]} 
          alt={project.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          {project.status === 'ongoing' && (
            <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
              ONGOING
            </span>
          )}
        </div>

        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>

        <div className="flex gap-2 mb-3 flex-wrap">
          <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">
            {project.type}
          </span>
          {project.tags && project.tags.map((tag, i) => (
            <span key={i} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>

        {project.author && (
          <p className="text-gray-500 text-sm mb-3">
            By <strong>{project.author.name}</strong>
          </p>
        )}

        <div className="flex justify-between items-center">
          <button 
            onClick={handleLike}
            className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded transition"
          >
            <FiThumbsUp /> {project.upvotes}
          </button>
          {project.mediaUrl && (
            <a 
              href={project.mediaUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded transition"
            >
              <FiDownload /> Details
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
