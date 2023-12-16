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
