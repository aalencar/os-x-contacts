export interface Contact {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  note: string;
}

export interface Category<T> {
  letter: string;
  list: T[];
}
