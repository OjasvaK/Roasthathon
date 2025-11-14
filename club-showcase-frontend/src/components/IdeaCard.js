import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiThumbsUp, FiThumbsDown, FiMessageCircle } from 'react-icons/fi';

function IdeaCard({ idea, onInteract }) {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const handleVote = async (voteType) => {
    try {
      const res = await axios.patch(`/api/forum/${idea._id}/vote`, { voteType });
      setUpvoted(voteType === 'upvote' && !upvoted);
      setDownvoted(voteType === 'downvote' && !downvoted);
      onInteract && onInteract(res.data.idea);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-white flex-1">{idea.title}</h3>
        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap ml-2">
          {idea.category}
        </span>
      </div>

      <p className="text-gray-400 mb-3">{idea.description}</p>

      {idea.author && (
        <p className="text-gray-500 text-sm mb-4">
          Posted by <strong>{idea.author.name}</strong>
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {idea.tags && idea.tags.map((tag, i) => (
          <span key={i} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-gray-700 pt-4">
        <div className="flex gap-4">
          <button 
            onClick={() => handleVote('upvote')}
            className={`flex items-center gap-1 px-3 py-2 rounded transition ${
              upvoted 
                ? 'bg-green-600' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <FiThumbsUp /> {idea.upvotes}
          </button>
          <button 
            onClick={() => handleVote('downvote')}
            className={`flex items-center gap-1 px-3 py-2 rounded transition ${
              downvoted 
                ? 'bg-red-600' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <FiThumbsDown /> {idea.downvotes}
          </button>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <FiMessageCircle /> {idea.comments ? idea.comments.length : 0} comments
        </div>
      </div>
    </div>
  );
}

export default IdeaCard;
