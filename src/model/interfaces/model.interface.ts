export enum engineEnum {
  'Gasolina' = 'GASOLINA',
  'Diesel' = 'DIESEL',
  'Electrico' = 'ELECTRICO',
  'Hibrido' = 'HIBRIDO',
}

export enum gearboxEnum {
  'Manual' = 'MANUAL',
  'Automatico' = 'AUTOMATICO',
}

export enum tractionEnum {
  'FWD' = 'FWD',
  'RWD' = 'RWD',
  'AWD' = 'AWD',
  '4WD' = '4WD',
}

export interface Model {
  id_model?: number;
  name_model: string;
  engine_type: engineEnum;
  gearbox: gearboxEnum;
  number_of_speeds: number;
  maximum_speed: number;
  traction: tractionEnum;
  cubic_capacity: number;
  width: number;
  height: number;
  power: number;
  battery: number;
  seats: number;
  made_in: number;
  id_brand: number;
  create_at?: Date;
  update_at?: Date;
  delete_at?: Date;
}

export interface ModelWithRelations {
  id_model: number;
  name_model: string;
  engine_type: engineEnum;
  gearbox: gearboxEnum;
  number_of_speeds: number;
  maximum_speed: number;
  traction: tractionEnum;
  cubic_capacity: number;
  width: number;
  height: number;
  power: number;
  battery: number;
  seats: number;
  made_in: string;
  id_brand: number;
  brand_name: string;
  create_at: Date;
  update_at?: Date;
  delete_at?: Date;
}
