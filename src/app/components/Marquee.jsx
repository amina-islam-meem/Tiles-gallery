'use client';
import { useEffect, useState } from 'react';

export default function Marquee() {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    fetchTiles();
  }, []);

  const fetchTiles = async () => {
    try {
      const res = await fetch('/api/tiles');
      const data = await res.json();
      setTiles(data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching tiles:', error);
    }
  };

  const marqueeItems = [
    ...tiles.map(tile => `New Arrival: ${tile.title}`),
    " Weekly Feature: Modern Geometric Patterns",
    " Join 10,000+ Happy Customers",
    " Premium Quality Tiles",
    " Free Shipping on Orders $500+",
    " Award Winning Designs",
    " 4.9/5 Customer Rating"
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 overflow-hidden">
      <div className="whitespace-nowrap animate-marquee">
        {marqueeItems.map((item, index) => (
          <span key={index} className="mx-8">
            {item}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}