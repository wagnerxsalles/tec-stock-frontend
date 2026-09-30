// src/pages/BuscaCliente.tsx
import { useState, type SubmitEvent } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { getAtendimentosPorCliente } from '../api/atendimentos'
import type { Atendimento } from '../types/atendimento'

export function BuscaCliente() {
  const [codigo, setCodigo] = useState('')
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([])
  const [buscou, setBuscou] = useState(false)
  const [erro, setErro] = useState('')

  async function handleBuscar(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setErro('')
    try {
      const resultado = await getAtendimentosPorCliente(codigo)
      setAtendimentos(resultado)
      setBuscou(true)
    } catch {
      setErro('Erro ao buscar cliente.')
    }
  }

  // Equipamentos atualmente instalados: última movimentação de cada equipamento sendo INSTALADO
  const ultimaAcaoPorEquipamento = new Map<string, { equipamento: Atendimento['movimentacoes'][0]['equipamento']; acao: string }>()

  for (const atendimento of [...atendimentos].reverse()) {
    for (const mov of atendimento.movimentacoes) {
      ultimaAcaoPorEquipamento.set(mov.equipamentoId, { equipamento: mov.equipamento, acao: mov.acao })
    }
  }

  const instaladosAgora = [...ultimaAcaoPorEquipamento.values()].filter((item) => item.acao === 'INSTALADO')

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="p-8 max-w-3xl">
        <h1 className="text-2xl font-bold text-white mb-6">Buscar Cliente</h1>

        <form onSubmit={handleBuscar} className="flex gap-2 mb-6">
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Código do cliente"
            className="flex-1 p-2 rounded bg-slate-700 text-white"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Buscar
          </button>
        </form>

        {erro && <p className="text-red-400 mb-4">{erro}</p>}

        {buscou && atendimentos.length === 0 && (
          <p className="text-slate-400">Nenhum atendimento encontrado para esse código.</p>
        )}

        {atendimentos.length > 0 && (
          <>
            <div className="bg-slate-800 p-4 rounded mb-6">
              <p className="text-white">
                Cliente: <span className="font-semibold">{atendimentos[0].cliente?.codigo}</span>
              </p>
              <Link
                to={`/atendimentos/novo?codigo=${codigo}`}
                className="inline-block mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Novo atendimento para esse cliente
              </Link>
            </div>

            <h2 className="text-lg font-semibold text-white mb-2">Equipamentos instalados atualmente</h2>
            {instaladosAgora.length === 0 ? (
              <p className="text-slate-400 mb-6">Nenhum equipamento instalado.</p>
            ) : (
              <ul className="mb-6 space-y-1">
                {instaladosAgora.map((item) => (
                  <li key={item.equipamento.id} className="text-white">
                    {item.equipamento.tipo} — {item.equipamento.identificador}
                  </li>
                ))}
              </ul>
            )}

            <h2 className="text-lg font-semibold text-white mb-2">Histórico de Atendimentos</h2>
            <div className="space-y-3">
              {atendimentos.map((atendimento) => (
                <div key={atendimento.id} className="bg-slate-800 p-3 rounded">
                  <p className="text-white font-semibold">{atendimento.tipoServico}</p>
                  <p className="text-slate-400 text-sm">
                    {new Date(atendimento.data).toLocaleString('pt-BR')}
                  </p>
                  {atendimento.movimentacoes.map((mov) => (
                    <p key={mov.id} className="text-slate-300 text-sm">
                      {mov.acao}: {mov.equipamento.tipo} — {mov.equipamento.identificador}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}