'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Header() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    try {
      const storedUser = localStorage.getItem('tilegallery_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tilegallery_user');
    localStorage.removeItem('tilegallery_session');
    document.cookie = "tilegallery_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    setUser(null);
    toast.success('Logged out successfully!');
    window.location.href = '/';
  };

  const isActive = (path) => pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
             TileGallery
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={`${isActive('/') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'} font-medium transition-colors pb-1`}>
              Home
            </Link>
            <Link href="/all-tiles" className={`${isActive('/all-tiles') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'} font-medium transition-colors pb-1`}>
              All Tiles
            </Link>
            {user && (
              <Link href="/my-profile" className={`${isActive('/my-profile') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'} font-medium transition-colors pb-1`}>
                My Profile
              </Link>
            )}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:block">
            {!loading && (
              user ? (
                <div className="flex items-center gap-4">
                  <img 
                    src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&bold=true`} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                  />
                  <span className="text-gray-700 hidden lg:inline">{user.name}</span>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all hover:scale-105"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all hover:scale-105">
                    Login
                  </button>
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t">
            <div className="flex flex-col gap-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/all-tiles" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600">All Tiles</Link>
              {user && (
                <Link href="/my-profile" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600">My Profile</Link>
              )}
              {user ? (
                <button onClick={handleLogout} className="text-left text-red-500">Logout</button>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-blue-600">Login</Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}