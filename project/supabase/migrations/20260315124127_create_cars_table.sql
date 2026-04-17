/*
  # Create Cars Table for MOTORODRI

  1. New Tables
    - `cars`
      - `id` (uuid, primary key)
      - `brand` (text) - Car brand/make
      - `model` (text) - Car model name
      - `year` (integer) - Manufacturing year
      - `price` (numeric) - Sale price
      - `mileage` (integer) - Kilometers
      - `fuel_type` (text) - Fuel type (Gasolina, Diesel, Elétrico, Híbrido)
      - `transmission` (text) - Transmission type (Manual, Automática)
      - `power` (integer) - Power in HP
      - `description` (text) - Detailed description
      - `main_image` (text) - URL to main image
      - `gallery_images` (jsonb) - Array of additional image URLs
      - `featured` (boolean) - Whether car is featured on homepage
      - `status` (text) - Status (available, sold, reserved)
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `cars` table
    - Add policy for public read access (anyone can view cars)
    - Add policy for authenticated users to manage cars (admin access)
*/

CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  price numeric NOT NULL,
  mileage integer NOT NULL,
  fuel_type text NOT NULL,
  transmission text NOT NULL,
  power integer,
  description text,
  main_image text,
  gallery_images jsonb DEFAULT '[]'::jsonb,
  featured boolean DEFAULT false,
  status text DEFAULT 'available',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available cars"
  ON cars
  FOR SELECT
  USING (status = 'available');

CREATE POLICY "Authenticated users can insert cars"
  ON cars
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update cars"
  ON cars
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete cars"
  ON cars
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_cars_featured ON cars(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_cars_status ON cars(status);
CREATE INDEX IF NOT EXISTS idx_cars_brand ON cars(brand);
CREATE INDEX IF NOT EXISTS idx_cars_year ON cars(year);
CREATE INDEX IF NOT EXISTS idx_cars_price ON cars(price);