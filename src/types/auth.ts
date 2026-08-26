export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  role: 'user' | 'admin';
}

export interface AuthSession {
  user: User;
  accessToken?: string;
}
