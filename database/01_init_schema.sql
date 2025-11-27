-- Tipos ENUM
CREATE TYPE engine_type AS ENUM ('Gasolina', 'Diesel', 'Electrico', 'Hibrido');
CREATE TYPE gearbox_type AS ENUM ('Manual', 'Automatica');
CREATE TYPE traction_type AS ENUM ('FWD', 'RWD', 'AWD', '4WD');
CREATE TYPE vehicle_status AS ENUM ('En_Transito', 'En_Preparacion', 'Disponible', 'Reservado', 'Vendido', 'Entregado');

-- Habilitar extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla Role
CREATE TABLE role (
    id_role SERIAL PRIMARY KEY,
    role VARCHAR(25) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT NULL,
    delete_at TIMESTAMP DEFAULT NULL
);

-- Tabla User
CREATE TABLE "user" (
    id_user UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    role INT NOT NULL REFERENCES role(id_role),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    last_login TIMESTAMP DEFAULT NULL,
    password_reset_token VARCHAR DEFAULT NULL,
    password_reset_token_expiring TIMESTAMP DEFAULT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT NULL,
    delete_at TIMESTAMP DEFAULT NULL
);

-- Tabla Country
CREATE TABLE country (
    id_country SERIAL PRIMARY KEY,
    name_country VARCHAR(25) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT NULL
);

-- Tabla Color
CREATE TABLE color (
    id_color SERIAL PRIMARY KEY,
    name_color VARCHAR NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT NULL,
    delete_at TIMESTAMP DEFAULT NULL
);

-- Tabla Brand
CREATE TABLE brand (
    id_brand SERIAL PRIMARY KEY,
    name_brand VARCHAR(20) NOT NULL,
    id_country INT NOT NULL REFERENCES country(id_country),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT NULL,
    delete_at TIMESTAMP DEFAULT NULL
);

-- Tabla Model
CREATE TABLE model (
    id_model SERIAL PRIMARY KEY,
    name_model VARCHAR(25) UNIQUE NOT NULL,
    engine_type engine_type NOT NULL,
    gearbox gearbox_type NOT NULL,
    number_of_speeds INT NOT NULL,
    maximum_speed INT NOT NULL,
    traction traction_type NOT NULL,
    cubic_capacity DECIMAL(10, 2) NOT NULL,
    width DECIMAL(10, 2) NOT NULL,
    height DECIMAL(10, 2) NOT NULL,
    power INT NOT NULL,
    battery INT DEFAULT 0,
    seats INT DEFAULT 1 NOT NULL,
    made_in INT NOT NULL REFERENCES country(id_country),
    id_brand INT NOT NULL REFERENCES brand(id_brand),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT NULL,
    delete_at TIMESTAMP DEFAULT NULL
);

-- Tabla Vehicle
CREATE TABLE vehicle (
    id_vehicle SERIAL PRIMARY KEY,
    vin VARCHAR(17) UNIQUE NOT NULL,
    engine_number VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    year INT NOT NULL,
    status vehicle_status DEFAULT 'En_Transito',
    entry_to_concessionary DATE DEFAULT CURRENT_DATE NOT NULL,
    color INT NOT NULL REFERENCES color(id_color),
    id_model INT NOT NULL REFERENCES model(id_model),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT NULL,
    delete_at TIMESTAMP DEFAULT NULL
);