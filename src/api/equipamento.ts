
import { api } from './axios'
import type { Equipamento } from '../types/equipamento'

export async function getEquipamentos(): Promise<Equipamento[]> {
  const response = await api.get<Equipamento[]>('/equipamentos')
  return response.data
}