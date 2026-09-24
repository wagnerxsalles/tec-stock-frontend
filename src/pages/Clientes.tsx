import { useEffect, useState } from 'react'
import { getClientes } from '../api/clientes'
import type { Cliente } from '../types/cliente'
import { Navbar } from '../components/Navbar'

export function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    getClientes()
      .then(setClientes)
      .finally(() => setCarregando(false))
  }, [])

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Clientes</h1>

        {carregando ? (
          <p className="text-white">Carregando...</p>
        ) : (
          <table className="w-full text-white">
            <thead>
              <tr className="text-left border-b border-slate-700">
                <th className="pb-2">Código</th>
                <th className="pb-2">Nome</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id} className="border-b border-slate-800">
                  <td className="py-2">{cliente.codigo}</td>
                  <td className="py-2">{cliente.nome ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}