
import { api } from './axios'
import type { Tecnico } from '../types/tecnico'

export async function getTecnicos(): Promise<Tecnico[]> {
  const response = await api.get<Tecnico[]>('/tecnicos')
  return response.data
}