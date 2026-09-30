
import type { Equipamento } from './equipamento'
import type { Cliente } from './cliente'

export interface Movimentacao {
  id: string
  equipamentoId: string
  acao: 'INSTALADO' | 'REMOVIDO'
  statusNoMomento: string
  equipamento: Equipamento
}

export interface Atendimento {
  id: string
  clienteId: string
  tecnicoId: string
  tipoServico: string
  observacao: string | null
  data: string
  movimentacoes: Movimentacao[]
  cliente?: Cliente
}