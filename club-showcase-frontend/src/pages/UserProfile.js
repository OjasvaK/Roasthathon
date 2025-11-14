import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/api/users/${id}`);
      setUser(res.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex items-center justify-center text-white">Loading...</div>;
  }

  if (!user) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex items-center justify-center text-white">User not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 p-8 rounded-lg border border-purple-500">
          <div className="text-center mb-6">
            {user.profilePicture && (
              <img 
                src={user.profilePicture} 
                alt={user.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-purple-500"
              />
            )}
            <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
            <p className="text-gray-400">{user.email}</p>
            {user.role !== 'member' && (
              <span className="inline-block bg-purple-600 text-white px-3 py-1 rounded mt-2 capitalize">
                {user.role}
              </span>
            )}
          </div>

          {user.bio && (
            <div className="mt-6 p-4 bg-gray-700 rounded">
              <h2 className="text-white font-semibold mb-2">About</h2>
              <p className="text-gray-300">{user.bio}</p>
            </div>
          )}

          <div className="mt-6 text-center text-gray-400 text-sm">
            Member since {new Date(user.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
