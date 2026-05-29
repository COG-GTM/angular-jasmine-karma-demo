export interface Item {
  name: string;
  description: string;
  price: string;
}

export interface User {
  id: number;
  name: string;
  username?: string;
  email?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}
