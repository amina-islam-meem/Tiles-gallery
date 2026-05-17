'use client';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function MyProfile() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) router.push('/login');
  }, [session, isPending, router]);

  if (isPending) return <div className="p-8 text-center">Loading...</div>;
  if (!session) return null;

  const user = session.user;

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <img 
          src={user.image || `https://ui-avatars.com/api/?name=${user.name}`}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500 object-cover"
          alt=""
        />
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-gray-600 mt-2">{user.email}</p>
        <p className="text-sm text-gray-500 mt-4">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
        
        <Link href="/my-profile/edit">
          <button className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all">
            Update Information
          </button>
        </Link>
      </div>
    </div>
  );
}