import { api } from './axios'
import type { Equipamento } from '../types/equipamento'

export async function getEquipamentos(): Promise<Equipamento[]> {
  const response = await api.get<Equipamento[]>('/equipamentos')
  return response.data
}

export async function criarEquipamento(data: {
  tipo: string
  identificador: string
  tecnicoId: string
}): Promise<Equipamento> {
  const response = await api.post<Equipamento>('/equipamentos', data)
  return response.data
}