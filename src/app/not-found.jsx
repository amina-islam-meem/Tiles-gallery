import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl mb-4 animate__animated animate__bounce">🔍</div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}