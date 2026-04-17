export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  power?: number;
  description?: string;
  main_image?: string;
  gallery_images?: string[];
  featured: boolean;
  status: string;
  reserved: boolean;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface FilterOptions {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuelType?: string;
  transmission?: string;
}