import { v4 as uuid } from 'uuid';

export interface User {
  first_name: string;
  last_name: string;
  role: number;
  email: string;
  password: string;
}

export interface UserLogin {
  id_user: typeof uuid;
  email: string;
  password: string;
}

export interface UserWithRelations {
  first_name: string;
  last_name: string;
  role_id: number;
  role: string;
  email: string;
}
