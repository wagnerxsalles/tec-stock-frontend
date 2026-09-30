// src/pages/Atendimentos.tsx
import { useEffect, useState } from 'react'
import { getAtendimentos } from '../api/atendimentos'
import type { Atendimento } from '../types/atendimento'
import { Navbar } from '../components/Navbar'
import { Link } from 'react-router-dom'

export function Atendimentos() {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    getAtendimentos()
      .then(setAtendimentos)
      .finally(() => setCarregando(false))
  }, [])

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Atendimentos</h1>
          <Link
            to="/atendimentos/novo"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Novo Atendimento
          </Link>
        </div>

        {carregando ? (
          <p className="text-white">Carregando...</p>
        ) : (
          <div className="space-y-4">
            {atendimentos.map((atendimento) => (
              <div key={atendimento.id} className="bg-slate-800 p-4 rounded">
                <p className="text-white font-semibold">{atendimento.tipoServico}</p>
                <p className="text-slate-400 text-sm">
                  {new Date(atendimento.data).toLocaleString('pt-BR')}
                </p>
                <p className="text-slate-300 text-sm mt-2">
                  {atendimento.movimentacoes.length} movimentação(ões)
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}