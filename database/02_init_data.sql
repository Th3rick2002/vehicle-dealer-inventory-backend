-- Insertar roles
INSERT INTO role (role) VALUES
    ('Admin'),
    ('Manager'),
    ('Seller'),
    ('Viewer');

-- Insertar un usuario administrador por defecto
-- Contraseña: Admin123! (hasheada con bcrypt, salt rounds: 10)
INSERT INTO "user" (first_name, last_name, role, email, password) VALUES
    ('Admin', 'Sistema', 1, 'admin@vehicleinventory.com', '$2b$10$rKvVPZH5VVJzh4KvFLzQ8OqFEJj7nH3Cv0V.kVxgQvC0xKGz7Qg6i');

-- Insertar países
INSERT INTO country (name_country) VALUES
    ('Japón'),
    ('Alemania'),
    ('Estados Unidos'),
    ('Corea del Sur'),
    ('Italia'),
    ('Francia'),
    ('Reino Unido'),
    ('España'),
    ('Suecia'),
    ('República Checa');

-- Insertar colores
INSERT INTO color (name_color) VALUES
    ('Blanco'),
    ('Negro'),
    ('Gris'),
    ('Plata'),
    ('Rojo'),
    ('Azul'),
    ('Verde'),
    ('Amarillo'),
    ('Naranja'),
    ('Café'),
    ('Beige');

-- Insertar marcas
INSERT INTO brand (name_brand, id_country) VALUES
    ('Toyota', 1),
    ('Honda', 1),
    ('Nissan', 1),
    ('Mazda', 1),
    ('Volkswagen', 2),
    ('BMW', 2),
    ('Mercedes-Benz', 2),
    ('Audi', 2),
    ('Ford', 3),
    ('Chevrolet', 3),
    ('Tesla', 3),
    ('Hyundai', 4),
    ('Kia', 4),
    ('Ferrari', 5),
    ('Lamborghini', 5),
    ('Peugeot', 6),
    ('Renault', 6),
    ('Volvo', 9),
    ('Škoda', 10);

-- Insertar algunos modelos de ejemplo
INSERT INTO model (
    name_model, engine_type, gearbox, number_of_speeds,
    maximum_speed, traction, cubic_capacity, width, height,
    power, battery, seats, made_in, id_brand
) VALUES
      ('Hilux', 'Diesel', 'Manual', 6, 180, '4WD', 2.80, 1.85, 1.80, 204, 0, 5, 1, 1),
      ('Corolla', 'Gasolina', 'Automatica', 8, 190, 'FWD', 1.80, 1.78, 1.44, 140, 0, 5, 1, 1),
      ('RAV4 Hybrid', 'Hibrido', 'Automatica', 1, 180, 'AWD', 2.50, 1.85, 1.69, 218, 50, 5, 1, 1),
      ('Civic', 'Gasolina', 'Automatica', 8, 200, 'FWD', 1.50, 1.80, 1.41, 180, 0, 5, 1, 2),
      ('Model 3', 'Electrico', 'Automatica', 1, 261, 'RWD', 0.00, 1.85, 1.44, 283, 75, 5, 3, 11),
      ('Golf', 'Gasolina', 'Manual', 6, 210, 'FWD', 1.40, 1.79, 1.45, 150, 0, 5, 2, 5),
      ('X5', 'Diesel', 'Automatica', 8, 230, 'AWD', 3.00, 2.00, 1.75, 286, 0, 7, 2, 6);

-- Insertar algunos vehículos de ejemplo
INSERT INTO vehicle (vin, engine_number, price, year, status, color, id_model) VALUES
    ('1HGBH41JXMN109186', 'ENG-TYT-2024-001', 35000.00, 2024, 'Disponible', 1, 1),
    ('2HGBH41JXMN109187', 'ENG-TYT-2024-002', 35000.00, 2024, 'Disponible', 5, 1),
    ('3HGBH41JXMN109188', 'ENG-TYT-2024-003', 25000.00, 2024, 'Disponible', 3, 2),
    ('4HGBH41JXMN109189', 'ENG-TYT-2024-004', 38000.00, 2024, 'En_Transito', 2, 3),
    ('5HGBH41JXMN109190', 'ENG-TSL-2024-001', 45000.00, 2024, 'Disponible', 4, 5);