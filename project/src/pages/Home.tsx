import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import CarCard from '../components/CarCard';
import type { Car } from '../types';

const HERO_IMAGES = [
  'https://images.alphacoders.com/848/thumb-1920-848153.jpg',
  'https://hbgpvkvsiiwpnkkqmofi.supabase.co/storage/v1/object/public/motorcycles/wallpaper2you_6188.jpg',
  'https://ridermagazine.com/wp-content/uploads/2021/12/KevinWingPhoto-9898.jpg'
];

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchFeaturedCars();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchFeaturedCars = async () => {
    try {
      const { data, error } = await supabase
        .from('motorcycles')
        .select('*')
        .eq('featured', true)
        .eq('status', 'available')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setFeaturedCars(data || []);
    } catch (error) {
      console.error('Error fetching featured cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToImage = (index: number) => setCurrentImageIndex(index);
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <section className="relative h-screen md:h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {HERO_IMAGES.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0B0B0B]"></div>
            </div>
          ))}
        </div>

        <button onClick={prevImage} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors">
          <ChevronLeft size={22} className="text-white" />
        </button>

        <button onClick={nextImage} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors">
          <ChevronRight size={22} className="text-white" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-[#FF6B35] w-8' : 'bg-white/50 hover:bg-white/75 w-3'
              }`}
            ></button>
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight">MOTORODRI</h1>
          <p className="text-lg md:text-2xl text-[#B8B8B8] mb-6 md:mb-4 font-light tracking-wide">Motos exclusivas selecionadas</p>
          <Link to="/stock" className="inline-flex items-center space-x-2 bg-[#FF6B35] text-white px-6 md:px-8 py-3 md:py-4 font-bold text-base md:text-lg tracking-wide hover:bg-[#FF8555] transition-all">
            <span>VER STOCK</span>
            <ArrowRight size={22} />
          </Link>
        </div>
      </section>

      {featuredCars.length > 0 && (
        <section className="py-12 md:py-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredCars.map((car) => <CarCard key={car.id} car={car} />)}
          </div>
        </section>
      )}
    </div>
  );
}