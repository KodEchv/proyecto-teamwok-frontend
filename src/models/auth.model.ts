export interface RegisterData {
  email: string;
  password: string;
  role: string;
  cedula: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role?: string;
  userId?: number;
}

export interface User {
  id: number;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: number;
  cedula: string;
  firstName: string;
  lastName: string;
  phone?: string;
  authId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  role: string | null;
  userId: number | null;
  isLoading: boolean;
  error: string | null;
}
