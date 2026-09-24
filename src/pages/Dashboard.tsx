// src/pages/Dashboard.tsx
import { useAuth } from '../contexts/AuthContext'

export function Dashboard() {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Sair
        </button>
      </div>
    </div>
  )
}