// src/pages/Equipamentos.tsx
import { useEffect, useState } from 'react'
import { getEquipamentos } from '../api/equipamento'
import type { Equipamento } from '../types/equipamento'
import { Navbar } from '../components/Navbar'

const corDoStatus: Record<Equipamento['status'], string> = {
  EM_ESTOQUE: 'bg-yellow-600',
  INSTALADO: 'bg-green-600',
  COM_DEFEITO: 'bg-red-600',
}

export function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    getEquipamentos()
      .then(setEquipamentos)
      .finally(() => setCarregando(false))
  }, [])

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Equipamentos</h1>

        {carregando ? (
          <p className="text-white">Carregando...</p>
        ) : (
          <table className="w-full text-white">
            <thead>
              <tr className="text-left border-b border-slate-700">
                <th className="pb-2">Tipo</th>
                <th className="pb-2">Identificador</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {equipamentos.map((equipamento) => (
                <tr key={equipamento.id} className="border-b border-slate-800">
                  <td className="py-2">{equipamento.tipo}</td>
                  <td className="py-2">{equipamento.identificador}</td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${corDoStatus[equipamento.status]}`}
                    >
                      {equipamento.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}