import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'TileGallery - Discover Your Perfect Aesthetic Tile',
  description: 'Premium tile gallery showcasing the finest ceramic, marble, and mosaic tiles for your home',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Toaster position="top-right" />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}