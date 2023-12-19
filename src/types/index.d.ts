import { ObjectId } from 'mongoose';
//These are the types that are used in the application

export interface MyAuthContext {
  signIn: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}

export interface LoginFormType {
  email?: string;
  password?: string;
}

export interface RegisterFormType {
  email?: string;
  password?: string;
  password_confirmation?: string;
}

export interface BtnProp {
  id: string;
  resource: string;
}

export interface DeleteBtnProp {
  resource: string;
  id: string;
  deleteCallback?: (id?: string) => void;
}

export interface ArtistType {
  full_name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  nationality: string;
  style: string;
  birth: date;
  death: date;
}

export interface MuseumType {
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: number;
  url: string;
}
//Would be better for the user if it backend expected the name rather then the id
export interface WorkType {
  title: string;
  artist_id: ObjectId | null;
  museum_id: ObjectId | null;
}
