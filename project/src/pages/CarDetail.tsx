import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Gauge, Fuel, Settings, Zap, Phone, Mail, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Car } from '../types';

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchCar(id);
    }
  }, [id]);

  const fetchCar = async (carId: string) => {
    try {
      const { data, error } = await supabase
        .from('motorcycles') // Note: Ensure your DB table matches your type 'Car'
        .select('*')
        .eq('id', carId)
        .maybeSingle();

      if (error) throw error;
      if (data) setCar(data);
    } catch (error) {
      console.error('Error fetching car:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] pt-24 flex items-center justify-center">
        <div className="text-[#B8B8B8] text-xl animate-pulse">A carregar...</div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#B8B8B8] text-xl mb-6">Viatura não encontrada</p>
          <Link
            to="/stock"
            className="inline-flex items-center space-x-2 text-[#FF6B35] hover:text-[#FF8555] transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Voltar ao Stock</span>
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [
    car.main_image,
    ...(Array.isArray(car.gallery_images) ? car.gallery_images : []),
  ].filter(Boolean) as string[];

  const prevImage = () => setCurrentIndex((i) => (i === 0 ? allImages.length - 1 : i - 1));
  const nextImage = () => setCurrentIndex((i) => (i === allImages.length - 1 ? 0 : i + 1));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24 pb-20">
      {/* Lightbox Overlay */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button 
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-[#FF6B35] z-50"
          >
            <X size={32} />
          </button>
          
          <button onClick={() => setLightboxIndex(i => i === 0 ? allImages.length - 1 : i - 1)}
            className="absolute left-4 text-white hover:text-[#FF6B35]">
            <ChevronLeft size={48} />
          </button>

          <img
            src={allImages[lightboxIndex]}
            alt="Full view"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          />

          <button onClick={() => setLightboxIndex(i => i === allImages.length - 1 ? 0 : i + 1)}
            className="absolute right-4 text-white hover:text-[#FF6B35]">
            <ChevronRight size={48} />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <Link to="/stock" className="inline-flex items-center space-x-2 text-[#FF6B35] mb-8 hover:underline">
          <ArrowLeft size={20} />
          <span>Voltar ao Stock</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Images & Description */}
          <div className="lg:col-span-2">
            <div className="relative mb-4 group">
              <div 
                className="aspect-[16/10] bg-[#1A1A1A] rounded-lg overflow-hidden cursor-zoom-in"
                onClick={() => openLightbox(currentIndex)}
              >
                {allImages.length > 0 ? (
                  <img src={allImages[currentIndex]} alt={car.model} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">Sem Imagem</div>
                )}
              </div>
              
              {allImages.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full text-white hover:bg-[#FF6B35]">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full text-white hover:bg-[#FF6B35]">
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {allImages.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex-shrink-0 w-24 h-16 rounded-md overflow-hidden border-2 transition-all ${currentIndex === idx ? 'border-[#FF6B35]' : 'border-transparent'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                </button>
              ))}
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-4">Descrição</h2>
              <p className="text-[#B8B8B8] text-lg leading-relaxed whitespace-pre-line">
                {car.description || 'Sem descrição disponível.'}
              </p>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="lg:col-span-1">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-8 sticky top-24">
              <h1 className="text-3xl font-bold text-white mb-2">{car.brand} {car.model}</h1>
              <div className="text-3xl font-bold text-[#FF6B35] mb-8">{formatPrice(car.price)}</div>
              
              <div className="space-y-4 mb-8">
                <DetailRow icon={<Calendar size={20}/>} label="Ano" value={car.year} />
                <DetailRow icon={<Gauge size={20}/>} label="Quilómetros" value={formatMileage(car.mileage)} />
                <DetailRow icon={<Fuel size={20}/>} label="Combustível" value={car.fuel_type} />
                <DetailRow icon={<Settings size={20}/>} label="Transmissão" value={car.transmission} />
                {car.power && <DetailRow icon={<Zap size={20}/>} label="Potência" value={`${car.power} CV`} />}
              </div>

              <div className="space-y-3">
                <a
                  href="tel:+351912345678"
                  className="w-full flex items-center justify-center space-x-2 bg-[#FF6B35] text-black px-6 py-4 font-bold rounded hover:bg-[#FF8555] transition-colors"
                >
                  <Phone size={20} />
                  <span>CONTACTAR</span>
                </a>
                <Link
                  to="/contactos"
                  className="w-full flex items-center justify-center space-x-2 border-2 border-[#FF6B35] text-[#FF6B35] px-6 py-4 font-bold rounded hover:bg-[#FF6B35] hover:text-black transition-all"
                >
                  <Mail size={20} />
                  <span>PEDIR INFORMAÇÕES</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Small helper component to keep the JSX clean
function DetailRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#2A2A2A]">
      <div className="flex items-center space-x-3 text-[#B8B8B8]">
        <span className="text-[#FF6B35]">{icon}</span>
        <span>{label}</span>
      </div>
      <span className="text-white font-semibold">{value}</span>
    </div>
  );
}