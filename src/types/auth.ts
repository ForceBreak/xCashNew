export interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  balance_coins: number;
}

export interface AuthSession {
  user: User;
  accessToken?: string;
}
