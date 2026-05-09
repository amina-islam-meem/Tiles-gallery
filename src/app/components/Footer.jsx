import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TileGallery
            </h3>
            <p className="text-gray-400">
              Discover the perfect tiles for your space. Quality, style, and elegance in every piece since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/all-tiles" className="text-gray-400 hover:text-white transition">Browse Tiles</Link></li>
              <li><Link href="/my-profile" className="text-gray-400 hover:text-white transition">Profile</Link></li>
              
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">✉️ info@tilegallery.com</li>
              <li className="flex items-center gap-2">Mob : +880 1642-157979</li>
            </ul>
          </div>

          {/* Social Links & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl">
                <FaPinterest />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl">
                <FaYoutube />
              </a>
            </div>
            
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2026 TileGallery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}