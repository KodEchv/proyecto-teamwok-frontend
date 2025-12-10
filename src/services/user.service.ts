import ApiClient from './api.service';
import type { User, UserProfile } from '../models/auth.model';

export const userService = {
  async getAllUsers(): Promise<User[]> {
    return ApiClient.get<User[]>('/users');
  },

  async getUserById(id: number): Promise<User> {
    return ApiClient.get<User>(`/users/${id}`);
  },

  async getUserProfile(id: number): Promise<UserProfile> {
    return ApiClient.get<UserProfile>(`/users/${id}/profile`);
  },

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    return ApiClient.put<User>(`/users/${id}`, data);
  },

  async deleteUser(id: number): Promise<void> {
    await ApiClient.delete(`/users/${id}`);
  },
};
