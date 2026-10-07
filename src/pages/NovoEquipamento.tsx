import { useEffect, useState, type SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { criarEquipamento } from '../api/equipamentos'
import { getTecnicos } from '../api/tecnicos'
import type { Tecnico } from '../types/tecnico'

export function NovoEquipamento() {
  const navigate = useNavigate()
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([])
  const [tipo, setTipo] = useState('ONU')
  const [identificador, setIdentificador] = useState('')
  const [tecnicoId, setTecnicoId] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    getTecnicos().then(setTecnicos)
  }, [])

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setErro('')
    try {
      await criarEquipamento({ tipo, identificador, tecnicoId })
      navigate('/equipamentos')
    } catch {
      setErro('Erro ao cadastrar equipamento.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="p-8 max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6">Novo Equipamento</h1>
        <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded space-y-4">
          <div>
            <label className="block text-slate-300 mb-1">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full p-2 rounded bg-slate-700 text-white"
            >
              <option value="ONU">ONU</option>
              <option value="ROTEADOR">Roteador</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-300 mb-1">Identificador (MAC/Série)</label>
            <input
              type="text"
              value={identificador}
              onChange={(e) => setIdentificador(e.target.value)}
              className="w-full p-2 rounded bg-slate-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-1">Técnico Responsável</label>
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
          {erro && <p className="text-red-400">{erro}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}