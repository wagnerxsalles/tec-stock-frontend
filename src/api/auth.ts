import { api } from './axios'
import type { LoginResponse } from '../types/auth'

export async function login(email: string, senha: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', { email, senha })
  return response.data
}