import Link from 'next/link';

export default function TileCard({ tile }) {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div className="relative overflow-hidden h-64">
        <img 
          src={tile.image} 
          alt={tile.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Out of Stock Badge */}
        {!tile.inStock && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            Out of Stock
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-blue-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md backdrop-blur-sm">
          {tile.category}
        </div>

        {/* Hover overlay for Material */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm font-medium">Material: {tile.material}</p>
        </div>
      </div>
      
      <div className="p-5">
        {/* Title / Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{tile.name}</h3> {/* <-- title.name */}
        
        {/* Price & Rating */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-blue-600">${tile.price}</span>
          <div className="flex items-center gap-1 text-sm text-gray-600 font-medium">
            <span className="text-yellow-500 text-lg">★</span> {tile.rating} ({tile.reviews})
          </div>
        </div>
        
        {/* Size Badge */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full font-medium border border-gray-200">
             Size: {tile.size}
          </span>
        </div>
        
        {/* View Details Button */}
        <Link href={`/tile/${tile.id}`}>
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-medium transition-all hover:shadow-lg hover:scale-105">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}