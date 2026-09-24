// src/components/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function Navbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-slate-800 px-6 py-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/dashboard" className="text-white hover:text-blue-400">
          Dashboard
        </Link>
        <Link to="/clientes" className="text-white hover:text-blue-400">
          Clientes
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Sair
      </button>
    </nav>
  )
}