import { create } from 'zustand';
import type { AuthState, RegisterData, LoginData } from '../models/auth.model';
import { authService } from '../services/auth.service';

interface AuthStore extends AuthState {
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  setToken: (token: string, role?: string, userId?: number) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => {
  // Inicializar desde localStorage de forma segura
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const userIdStr = localStorage.getItem('userId');
  const userId = userIdStr ? parseInt(userIdStr) : null;

  return {
    token: token || null,
    user: null,
    role: role || null,
    userId: userId,
    isLoading: false,
    error: null,

    register: async (data: RegisterData) => {
      set({ isLoading: true, error: null });
      try {
        await authService.register(data);
        set({
          isLoading: false,
        });
      } catch (error: any) {
        const errorMessage = error.message || 'Error en el registro';
        set({ error: errorMessage, isLoading: false });
        throw error;
      }
    },

    login: async (data: LoginData) => {
      set({ isLoading: true, error: null });
      try {
        const response = await authService.login(data);
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role || '');
        localStorage.setItem('userId', response.userId?.toString() || '');
        set({
          token: response.token,
          role: response.role || null,
          userId: response.userId || null,
          isLoading: false,
        });
      } catch (error: any) {
        const errorMessage = error.message || 'Error en el login';
        set({ error: errorMessage, isLoading: false });
        throw error;
      }
    },

    logout: () => {
      authService.logout();
      set({
        token: null,
        user: null,
        role: null,
        userId: null,
        error: null,
      });
    },

    setToken: (token: string, role?: string, userId?: number) => {
      localStorage.setItem('token', token);
      if (role) localStorage.setItem('role', role);
      if (userId) localStorage.setItem('userId', userId.toString());
      set({ token, role: role || null, userId: userId || null });
    },

    clearError: () => {
      set({ error: null });
    },
  };
});
