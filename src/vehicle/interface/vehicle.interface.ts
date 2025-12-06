export enum StatusVehicleEnum {
  'En_Transito' = 'En Transito',
  'En_Preparacion' = 'En_Preparacion',
  'Disponible' = 'Disponible',
  'Reservado' = 'Reservado',
  'Vendido' = 'Vendido',
  'Entregado' = 'Entregado',
}

export interface Vehicle {
  vin: string;
  engine_number: string;
  price: number;
  year: number;
  status: StatusVehicleEnum;
  entry_to_concessionary: Date;
  color: number;
  id_model: number;
}

export interface VehicleWithDetails {
  id_vehicle: number;
  vin: string;
  engine_number: string;
  price: number;
  year: number;
  status: StatusVehicleEnum;
  entry_to_concessionary: Date;
  color: number;
  name_color: string;
  id_model: number;
  name_model: string;
  id_brand: number;
  name_brand: string;
  made_in: string;
  engine_type: string;
  gearbox: string;
  seats: number;
  create_at: Date;
  update_at?: Date;
}
