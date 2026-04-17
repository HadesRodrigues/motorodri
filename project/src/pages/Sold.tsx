import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import CarCard from '../components/CarCard';
import type { Car } from '../types';

export default function Sold() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSold = async () => {
      const { data } = await supabase
        .from('motorcycles')
        .select('*')
        .eq('status', 'sold')
        .order('updated_at', { ascending: false });
      setCars(data || []);
      setLoading(false);
    };
    fetchSold();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-28 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">Vendidos</h1>
          <p className="text-[#B8B8B8]">Motos que já encontraram o seu novo dono.</p>
        </div>

        {loading && (
          <div className="text-center py-20 text-[#B8B8B8]">A carregar...</div>
        )}

        {!loading && cars.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#B8B8B8] text-lg">Nenhuma moto vendida ainda.</p>
            <Link to="/stock" className="mt-4 inline-block bg-[#FF6B35] text-white px-6 py-3 rounded font-bold hover:bg-[#FF8555]">
              Ver Stock
            </Link>
          </div>
        )}

        {!loading && cars.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(car => (
            <Link to={`/car/${car.id}`} key={car.id} className="relative block">
              <div className="opacity-75">
                <CarCard car={{ ...car, featured: false, reserved: false }} />
              </div>
              <div className="absolute top-3 left-3 z-20 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Vendido
              </div>
            </Link>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}