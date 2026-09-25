
export interface Equipamento {
  id: string
  tipo: 'ONU' | 'ROTEADOR'
  identificador: string
  status: 'EM_ESTOQUE' | 'INSTALADO' | 'COM_DEFEITO'
  dataRecebimento: string
  tecnicoId: string
}