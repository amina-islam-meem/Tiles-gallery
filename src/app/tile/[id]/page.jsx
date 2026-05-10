'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Loader from '@/app/components/Loader';
import toast from 'react-hot-toast';

export default function TileDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTileDetails();
    }
  }, [id]);

  const fetchTileDetails = async () => {
    try {
      const res = await fetch('/api/tiles');
      const data = await res.json();
      const foundTile = data.find(t => t.id === id);
      
      if (!foundTile) {
        toast.error('Tile not found');
        router.push('/all-tiles');
        return;
      }
      
      setTile(foundTile);
    } catch (error) {
      console.error('Error fetching tile details:', error);
      toast.error('Failed to load tile details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!tile) return null;

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href="/all-tiles" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
          ← Back to All Tiles
        </Link>

        {/* Tile Details Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
            
            {/* Image Section */}
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden bg-gray-50 flex justify-center items-center border border-gray-100 p-2 h-full min-h-[400px]">
                <img 
                  src={tile.image} 
                  alt={tile.name} // Updated from tile.title
                  className="w-full h-full object-cover rounded-xl shadow-sm"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6 flex flex-col justify-center">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{tile.name}</h1> {/* Updated from tile.title */}
                </div>
                
                {/* Rating & Reviews Section */}
                <div className="flex items-center gap-4 text-gray-600 mt-2">
                  <span className="font-medium">By Artisan Tile Co.</span>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-xl">★</span>
                    <span className="font-bold text-gray-700">{tile.rating}</span>
                    <span className="text-sm">({tile.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  ${tile.price}
                </span>
                {!tile.inStock && (
                  <span className="bg-red-50 border border-red-200 text-red-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="border-t border-b border-gray-100 py-6">
                <h3 className="font-bold text-gray-800 text-lg mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{tile.description}</p>
              </div>

              {/* Grid Information */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div>
                  <h4 className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-semibold">Material</h4>
                  <p className="font-bold text-gray-800">{tile.material}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-semibold">Size</h4> {/* Updated from Dimensions */}
                  <p className="font-bold text-gray-800">{tile.size}</p> {/* Updated from tile.dimensions */}
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-semibold">Category</h4>
                  <p className="font-bold text-gray-800 capitalize bg-white inline-block px-3 py-1 rounded-md shadow-sm border border-gray-200">
                    {tile.category}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-semibold">Availability</h4>
                  <p className={`font-bold flex items-center gap-2 ${tile.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    <span className={`w-2 h-2 rounded-full ${tile.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {tile.inStock ? 'In Stock Ready to Ship' : 'Currently Unavailable'}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button 
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex justify-center items-center gap-2 mt-4 ${
                  tile.inStock 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-[1.02] active:scale-95' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!tile.inStock}
              >
                {tile.inStock ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </>
                ) : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}