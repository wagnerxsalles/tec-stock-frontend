
import { useEffect, useState, type SubmitEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { createAtendimento } from '../api/atendimentos'
import { getClientes, criarCliente } from '../api/clientes'
import { getTecnicos } from '../api/tecnicos'
import { getEquipamentos } from '../api/equipamentos'
import type { Cliente } from '../types/cliente'
import type { Tecnico } from '../types/tecnico'
import type { Equipamento } from '../types/equipamento'

interface MovimentacaoForm {
  equipamentoId: string
  acao: 'INSTALADO' | 'REMOVIDO'
  novoStatus: string
}

export function NovoAtendimento() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [clientes, setClientes] = useState<Cliente[]>([])
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([])
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([])

  const [codigoCliente, setCodigoCliente] = useState(searchParams.get('codigo') ?? '')
  const [tecnicoId, setTecnicoId] = useState('')
  const [tipoServico, setTipoServico] = useState('INSTALACAO')
  const [observacao, setObservacao] = useState('')
  const [movimentacoes, setMovimentacoes] = useState<MovimentacaoForm[]>([])
  const [erro, setErro] = useState('')

  useEffect(() => {
    getClientes().then(setClientes)
    getTecnicos().then(setTecnicos)
    getEquipamentos().then(setEquipamentos)
  }, [])

  function adicionarMovimentacao() {
    setMovimentacoes([...movimentacoes, { equipamentoId: '', acao: 'INSTALADO', novoStatus: '' }])
  }

  function removerMovimentacao(index: number) {
    setMovimentacoes(movimentacoes.filter((_, i) => i !== index))
  }

  function atualizarMovimentacao(index: number, campo: keyof MovimentacaoForm, valor: string) {
    const novaLista = [...movimentacoes]
    novaLista[index] = { ...novaLista[index], [campo]: valor }
    setMovimentacoes(novaLista)
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setErro('')

    try {
      let cliente = clientes.find((c) => c.codigo === codigoCliente)

      if (!cliente) {
        cliente = await criarCliente({ codigo: codigoCliente })
      }

      await createAtendimento({
        clienteId: cliente.id,
        tecnicoId,
        tipoServico,
        observacao: observacao || undefined,
        movimentacoes: movimentacoes.map((mov) => ({
          equipamentoId: mov.equipamentoId,
          acao: mov.acao,
          novoStatus: mov.acao === 'REMOVIDO' ? mov.novoStatus : undefined,
        })),
      })
      navigate('/atendimentos')
    } catch {
      setErro('Erro ao criar atendimento. Confira os dados.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="p-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-white mb-6">Novo Atendimento</h1>

        <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded space-y-4">
          <div>
            <label className="block text-slate-300 mb-1">Código do Cliente</label>
            <input
              type="text"
              value={codigoCliente}
              onChange={(e) => setCodigoCliente(e.target.value)}
              placeholder="Ex: 3017245"
              className="w-full p-2 rounded bg-slate-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Técnico</label>
            <select
              value={tecnicoId}
              onChange={(e) => setTecnicoId(e.target.value)}
              className="w-full p-2 rounded bg-slate-700 text-white"
              required
            >
              <option value="">Selecione...</option>
              {tecnicos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome} {t.sobrenome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Tipo de Serviço</label>
            <select
              value={tipoServico}
              onChange={(e) => setTipoServico(e.target.value)}
              className="w-full p-2 rounded bg-slate-700 text-white"
            >
              <option value="INSTALACAO">Instalação</option>
              <option value="ALTERACAO_ENDERECO">Alteração de Endereço</option>
              <option value="TROCA_ROTEADOR">Troca de Roteador</option>
              <option value="TROCA_ONU">Troca de ONU</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Observação</label>
            <input
              type="text"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              className="w-full p-2 rounded bg-slate-700 text-white"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-slate-300">Movimentações</label>
              <button
                type="button"
                onClick={adicionarMovimentacao}
                className="bg-slate-600 text-white px-3 py-1 rounded text-sm hover:bg-slate-500"
              >
                + Adicionar
              </button>
            </div>

            {movimentacoes.map((mov, index) => (
              <div key={index} className="bg-slate-700 p-3 rounded mb-2 space-y-2">
                <div className="flex gap-2">
                  <select
                    value={mov.equipamentoId}
                    onChange={(e) => atualizarMovimentacao(index, 'equipamentoId', e.target.value)}
                    className="flex-1 p-2 rounded bg-slate-600 text-white"
                    required
                  >
                    <option value="">Equipamento...</option>
                    {equipamentos
                      .filter((eq) =>
                        mov.acao === 'INSTALADO'
                          ? eq.status === 'EM_ESTOQUE'
                          : eq.status === 'INSTALADO',
                      )
                      .map((eq) => (
                        <option key={eq.id} value={eq.id}>
                          {eq.tipo} — {eq.identificador}
                        </option>
                      ))}
                  </select>

                  <select
                    value={mov.acao}
                    onChange={(e) => atualizarMovimentacao(index, 'acao', e.target.value)}
                    className="p-2 rounded bg-slate-600 text-white"
                  >
                    <option value="INSTALADO">Instalado</option>
                    <option value="REMOVIDO">Removido</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => removerMovimentacao(index)}
                    className="bg-red-600 text-white px-3 rounded hover:bg-red-700"
                  >
                    ×
                  </button>
                </div>

                {mov.acao === 'REMOVIDO' && (
                  <select
                    value={mov.novoStatus}
                    onChange={(e) => atualizarMovimentacao(index, 'novoStatus', e.target.value)}
                    className="w-full p-2 rounded bg-slate-600 text-white"
                    required
                  >
                    <option value="">Novo status do equipamento...</option>
                    <option value="EM_ESTOQUE">Em Estoque</option>
                    <option value="COM_DEFEITO">Com Defeito</option>
                  </select>
                )}
              </div>
            ))}
          </div>

          {erro && <p className="text-red-400">{erro}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Criar Atendimento
          </button>
        </form>
      </div>
    </div>
  )
}