interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

export const useUsers = () => {
  const getUsers = async (): Promise<User[]> => {
    const response = await fetch(USERS_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };

  return { getUsers };
};

export type { User };
