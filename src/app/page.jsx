'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import TileCard from './components/TileCard';
import Loader from './components/Loader';
import Marquee from './components/Marquee';

export default function Home() {
  const [featuredTiles, setFeaturedTiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedTiles();
  }, []);

  const fetchFeaturedTiles = async () => {
    try {
      const res = await fetch('/api/tiles');
      const data = await res.json();
      setFeaturedTiles(data.filter(t => t.inStock).slice(0, 4));
    } catch (error) {
      console.error('Error fetching tiles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto px-4 py-24 md:py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate__animated animate__fadeInUp">
            Discover Your Perfect
            <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent"> Aesthetic</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate__animated animate__fadeInUp animate__delay-1s max-w-2xl mx-auto">
            Transform your space with premium tiles from around the world
          </p>
          <Link href="/all-tiles">
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg hover:shadow-xl transition-all hover:scale-105 animate__animated animate__fadeInUp animate__delay-2s">
              Browse Now →
            </button>
          </Link>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Featured Tiles Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Collections
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our most popular tiles loved by designers worldwide
            </p>
          </div>
          
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredTiles.map((tile) => (
                <TileCard key={tile.id} tile={tile} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}