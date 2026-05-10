'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updateName, setUpdateName] = useState('');
  const [updateImage, setUpdateImage] = useState('');
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    try {
      const storedUser = localStorage.getItem('tilegallery_user');
      const session = localStorage.getItem('tilegallery_session');
      
      if (!storedUser || !session) {
        router.push('/login');
        return;
      }
      
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setUpdateName(userData.name);
      setUpdateImage(userData.image || '');
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    // Simulate update API call
    setTimeout(() => {
      const updatedUser = {
        ...user,
        name: updateName,
        image: updateImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(updateName)}&background=6366f1&color=fff`
      };
      localStorage.setItem('tilegallery_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setUpdating(false);
    }, 1000);
  };

  if (loading) return <Loader />;
  if (!user) return null;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center mb-8">
          <div className="inline-block relative">
            <img 
              src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=fff&color=6366f1&size=128`}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white mx-auto object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold mt-4">{user.name}</h1>
          <p className="text-white/90 mt-2">{user.email}</p>
          <p className="text-white/70 text-sm mt-1">Member since {new Date().toLocaleDateString()}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Edit Profile
          </button>
        </div>

        

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Photo URL</label>
                  <input
                    type="url"
                    value={updateImage}
                    onChange={(e) => setUpdateImage(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {updateImage && (
                    <div className="mt-2">
                      <img src={updateImage} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    {updating ? 'Updating...' : 'Update Information'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}