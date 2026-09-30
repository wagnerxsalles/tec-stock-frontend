
import type { Equipamento } from './equipamento'

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
}