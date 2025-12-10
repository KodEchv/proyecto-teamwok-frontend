import ApiClient from './api.service';
import type { RegisterData, LoginData, AuthResponse } from '../models/auth.model';

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    return ApiClient.post<AuthResponse>('/auth/register', data);
  },

  async login(data: LoginData): Promise<AuthResponse> {
    return ApiClient.post<AuthResponse>('/auth/login', data);
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
