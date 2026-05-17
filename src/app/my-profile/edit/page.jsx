'use client';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function EditProfile() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) router.push('/login');
    if (session?.user) {
      setName(session.user.name || '');
      setImage(session.user.image || '');
    }
  }, [session, isPending, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await authClient.updateUser({
        name,
        image: image || undefined,
      });

      if (error) {
        toast.error(error.message || 'Update failed');
      } else {
        toast.success('Profile updated successfully!');
        await refetch(); // refresh session
        router.push('/my-profile');
        router.refresh();
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (isPending) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-center mb-8">Update Information</h1>
        
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Photo URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/photo.jpg"
            />
            {image && (
              <img src={image} alt="Preview" className="w-20 h-20 rounded-full mt-3 object-cover border" />
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Information'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}