export interface Brand {
  id_brand?: number;
  name_brand: string;
  id_country: number;
  create_at: Date;
  update_at?: Date;
  delete_at?: Date;
}

export interface BrandWithRelations {
  id_brand: number;
  name_brand: string;
  id_country: number;
  name_country: string;
  create_at: Date;
  update_at?: Date;
}

export interface BrandListItem {
  id_brand: number;
  name_brand: string;
  name_country: string;
}
