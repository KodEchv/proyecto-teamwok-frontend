import { create } from 'zustand';
import type { User } from '../models/auth.model';
import { userService } from '../services/user.service';

interface UserStore {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
  fetchAllUsers: () => Promise<void>;
  fetchUserById: (id: number) => Promise<void>;
  updateUser: (id: number, data: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  clearError: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,

  fetchAllUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const users = await userService.getAllUsers();
      set({ users, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al obtener usuarios';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  fetchUserById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const user = await userService.getUserById(id);
      set({ selectedUser: user, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al obtener usuario';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  updateUser: async (id: number, data: Partial<User>) => {
    set({ isLoading: true, error: null });
    try {
      const updatedUser = await userService.updateUser(id, data);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updatedUser : u)),
        selectedUser: updatedUser,
        isLoading: false,
      }));
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al actualizar usuario';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  deleteUser: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await userService.deleteUser(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        isLoading: false,
      }));
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al eliminar usuario';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
