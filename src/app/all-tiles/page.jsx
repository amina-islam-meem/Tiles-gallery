'use client';
import { useEffect, useState } from 'react';
import TileCard from '../components/TileCard';
import Loader from '../components/Loader';

export default function AllTiles() {
  const [tiles, setTiles] = useState([]);
  const [filteredTiles, setFilteredTiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchTiles();
  }, []);

  useEffect(() => {
    filterTiles();
  }, [searchTerm, selectedCategory, tiles]);

  const fetchTiles = async () => {
    try {
      const res = await fetch('/api/tiles');
      const data = await res.json();
      setTiles(data);
      setFilteredTiles(data);
    } catch (error) {
      console.error('Error fetching tiles:', error);
    } finally {
      setLoading(false);
    }
  };

    const filterTiles = () => {
    let filtered = [...tiles];
    
    if (searchTerm) {
      filtered = filtered.filter(tile => {
        
        const tileName = tile.name || ''; 
        return tileName.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tile => tile.category === selectedCategory);
    }
    
    setFilteredTiles(filtered);
  };
  

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Hero Search Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Tile Collection</h1>
          <p className="text-white text-lg mb-6">Discover hundreds of premium tiles for your dream space</p>
          
          {/* Search Input */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Search tiles by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-xl text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>

        

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-bold text-blue-600">{filteredTiles.length}</span> of{' '}
            <span className="font-bold">{tiles.length}</span> tiles
          </p>
        </div>

        {/* Tile Grid */}
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTiles.map((tile) => (
                <TileCard key={tile.id} tile={tile} />
              ))}
            </div>
            
            {filteredTiles.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">No tiles found</h3>
                <p className="text-gray-500">Try adjusting your search or category filter</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}