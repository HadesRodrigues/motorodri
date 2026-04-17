import { Link } from 'react-router-dom';
import { Calendar, Gauge, Fuel, Settings } from 'lucide-react';
import type { Car } from '../types';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('pt-PT').format(mileage) + ' km';
  };

  return (
    <Link to={`/car/${car.id}`} className="group block">
      <div className="relative bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden hover:border-[#FF6B35] transition-all duration-300">

        {/* Fita de Reservado — fora da div da imagem, dentro do card */}
        {car.reserved && (
          <div className="absolute top-0 right-0 z-20 pointer-events-none"
            style={{ width: '140px', height: '140px', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              top: '38px',
              right: '-48px',
              width: '220px',
              transform: 'rotate(45deg)',
              backgroundColor: '#FF6B35',
              color: '#FFFFFF',
              fontWeight: '900',
              fontSize: '12px',
              letterSpacing: '2px',
              textAlign: 'center',
              padding: '7px 0',
            }}>
              RESERVADO
            </div>
          </div>
        )}

        <div className="relative aspect-[16/10] overflow-hidden bg-[#0B0B0B]">
          {car.main_image ? (
            <img
              src={car.main_image}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#B8B8B8]">
              Sem Imagem
            </div>
          )}

          {car.featured && !car.reserved && (
            <div className="absolute top-4 left-4 bg-[#FF6B35] text-white px-3 py-1 text-xs font-bold tracking-wide">
              DESTAQUE
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FF6B35] transition-colors">
            {car.brand} {car.model}
          </h3>

          <div className="text-2xl font-bold text-[#FF6B35] mb-4">
            {formatPrice(car.price)}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 text-[#B8B8B8] text-sm">
              <Calendar size={16} className="text-[#FF6B35]" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center space-x-2 text-[#B8B8B8] text-sm">
              <Gauge size={16} className="text-[#FF6B35]" />
              <span>{formatMileage(car.mileage)}</span>
            </div>
            <div className="flex items-center space-x-2 text-[#B8B8B8] text-sm">
              <Fuel size={16} className="text-[#FF6B35]" />
              <span>{car.fuel_type}</span>
            </div>
            <div className="flex items-center space-x-2 text-[#B8B8B8] text-sm">
              <Settings size={16} className="text-[#FF6B35]" />
              <span>{car.transmission}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}