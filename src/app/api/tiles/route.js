import { NextResponse } from 'next/server';
import tilesData from '../../../../data/tiles.json';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured');
  const limit = searchParams.get('limit');
  const category = searchParams.get('category');

  let tiles = [...tilesData];

  // Filter by category
  if (category && category !== 'All') {
    tiles = tiles.filter((tile) => tile.category === category);
  }

  // Return featured tiles (top rated)
  if (featured === 'true') {
    tiles = tiles
      .sort((a, b) => b.rating - a.rating)
      .slice(0, parseInt(limit) || 4);
  }

  return NextResponse.json(tiles);
}