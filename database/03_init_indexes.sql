-- Índices para mejorar rendimiento en búsquedas o filtrado de datos
CREATE INDEX idx_vehicle_status ON vehicle(status) WHERE delete_at IS NULL;
CREATE INDEX idx_vehicle_model ON vehicle(id_model) WHERE delete_at IS NULL;
CREATE INDEX idx_vehicle_vin ON vehicle(vin);
CREATE INDEX idx_user_email ON "user"(email) WHERE delete_at IS NULL;
CREATE INDEX idx_model_brand ON model(id_brand) WHERE delete_at IS NULL;
CREATE INDEX idx_brand_country ON brand(id_country) WHERE delete_at IS NULL;
