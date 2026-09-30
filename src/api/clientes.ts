import { api } from './axios'
import type { Cliente } from '../types/cliente'

export async function getClientes(): Promise<Cliente[]> {
  const response = await api.get<Cliente[]>('/clientes')
  return response.data
}

export async function criarCliente(data: { codigo: string; nome?: string }): Promise<Cliente> {
  const response = await api.post<Cliente>('/clientes', data)
  return response.data
}