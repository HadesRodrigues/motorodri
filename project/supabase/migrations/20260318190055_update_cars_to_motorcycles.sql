/*
  # Update Cars Table for Motorcycles

  Renaming the cars table to motorcycles for better semantics
  and updating the data to reflect motorcycle specifications.
*/

ALTER TABLE cars RENAME TO motorcycles;

ALTER INDEX IF EXISTS idx_cars_featured RENAME TO idx_motorcycles_featured;
ALTER INDEX IF EXISTS idx_cars_status RENAME TO idx_motorcycles_status;
ALTER INDEX IF EXISTS idx_cars_brand RENAME TO idx_motorcycles_brand;
ALTER INDEX IF EXISTS idx_cars_year RENAME TO idx_motorcycles_year;
ALTER INDEX IF EXISTS idx_cars_price RENAME TO idx_motorcycles_price;
