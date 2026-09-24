
import { api } from './axios'
import type { Cliente } from '../types/cliente'

export async function getClientes(): Promise<Cliente[]> {
  const response = await api.get<Cliente[]>('/clientes')
  return response.data
}