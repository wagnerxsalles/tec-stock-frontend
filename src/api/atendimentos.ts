
import { api } from './axios'
import type { Atendimento } from '../types/atendimento'

export async function getAtendimentos(): Promise<Atendimento[]> {
  const response = await api.get<Atendimento[]>('/atendimentos')
  return response.data
}

export async function createAtendimento(data: {
  clienteId: string
  tecnicoId: string
  tipoServico: string
  observacao?: string
  movimentacoes: { equipamentoId: string; acao: string; novoStatus?: string }[]
}): Promise<Atendimento> {
  const response = await api.post<Atendimento>('/atendimentos', data)
  return response.data
}