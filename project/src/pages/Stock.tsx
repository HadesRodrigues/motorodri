import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import CarCard from '../components/CarCard';
import { Filter } from 'lucide-react';
import type { Car, FilterOptions } from '../types';

export default function Stock() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});
  
  // Novo estado para a categoria
  const [category, setCategory] = useState<'moderna' | 'classica'>('moderna');
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [cars, filters, category]);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('motorcycles')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCars(data || []);
      const uniqueBrands = [...new Set(data?.map((car) => car.brand) || [])].sort();
      setBrands(uniqueBrands);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...cars];

    // Filtro por Categoria (Modernas / Clássicas)
    // Usamos (car as any) para evitar o erro de TypeScript que te apareceu
    filtered = filtered.filter((car) => {
      const carCat = ((car as any).category || 'moderna').toLowerCase();
      return carCat === category;
    });

    // Filtros de pesquisa
    if (filters.brand) {
      filtered = filtered.filter((car) => car.brand === filters.brand);
    }
    if (filters.minPrice) {
      filtered = filtered.filter((car) => car.price >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((car) => car.price <= filters.maxPrice!);
    }
    if (filters.minYear) {
      filtered = filtered.filter((car) => car.year >= filters.minYear!);
    }
    if (filters.maxYear) {
      filtered = filtered.filter((car) => car.year <= filters.maxYear!);
    }
    if (filters.fuelType) {
      filtered = filtered.filter((car) => car.fuel_type === filters.fuelType);
    }
    if (filters.transmission) {
      filtered = filtered.filter((car) => car.transmission === filters.transmission);
    }

    setFilteredCars(filtered);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string | number | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nosso Stock
          </h1>
          <p className="text-[#B8B8B8] text-lg">
            Explore toda a nossa coleção de motociclos premium
          </p>
        </div>

        {/* --- NOVO: Seletor de Categoria --- */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-1">
            <button
              onClick={() => { setCategory('moderna'); clearFilters(); }}
              className={`px-8 py-3 rounded-md font-bold text-sm tracking-wide transition-all ${
                category === 'moderna'
                  ? 'bg-[#FF6B35] text-white shadow-lg'
                  : 'text-[#B8B8B8] hover:text-white'
              }`}
            >
               Modernas
            </button>
            <button
              onClick={() => { setCategory('classica'); clearFilters(); }}
              className={`px-8 py-3 rounded-md font-bold text-sm tracking-wide transition-all ${
                category === 'classica'
                  ? 'bg-[#FF6B35] text-white shadow-lg'
                  : 'text-[#B8B8B8] hover:text-white'
              }`}
            >
               Clássicas
            </button>
          </div>
        </div>

        <div className="mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-[#1A1A1A] border border-[#2A2A2A] text-white px-6 py-3 rounded hover:border-[#FF6B35] transition-colors"
          >
            <Filter size={20} />
            <span>Filtros</span>
          </button>

          {showFilters && (
            <div className="mt-6 p-6 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#B8B8B8] mb-2">Marca</label>
                  <select
                    value={filters.brand || ''}
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-[#2A2A2A] text-white px-4 py-2 rounded focus:border-[#FF6B35] focus:outline-none"
                  >
                    <option value="">Todas</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#B8B8B8] mb-2">Preço Mínimo</label>
                  <input
                    type="number"
                    value={filters.minPrice || ''}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="0"
                    className="w-full bg-[#0B0B0B] border border-[#2A2A2A] text-white px-4 py-2 rounded focus:border-[#FF6B35] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#B8B8B8] mb-2">Preço Máximo</label>
                  <input
                    type="number"
                    value={filters.maxPrice || ''}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="999999"
                    className="w-full bg-[#0B0B0B] border border-[#2A2A2A] text-white px-4 py-2 rounded focus:border-[#FF6B35] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#B8B8B8] mb-2">Combustível</label>
                  <select
                    value={filters.fuelType || ''}
                    onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-[#2A2A2A] text-white px-4 py-2 rounded focus:border-[#FF6B35] focus:outline-none"
                  >
                    <option value="">Todos</option>
                    <option value="Gasolina">Gasolina</option>
                    <option value="Elétrico">Elétrico</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 border border-[#2A2A2A] text-[#B8B8B8] rounded hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <p className="text-[#B8B8B8]">
            {filteredCars.length} {filteredCars.length === 1 ? 'mota encontrada' : 'motos encontradas'} — {category === 'moderna' ? 'Modernas' : 'Clássicas'}
          </p>
        </div>

        {loading ? (
          <div className="text-center text-[#B8B8B8] py-20">A carregar...</div>
        ) : filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center text-[#B8B8B8] py-20">
            <p className="text-xl">Nenhuma mota {category} disponível com estes filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}