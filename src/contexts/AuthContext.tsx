import { createContext, useContext, useState, type ReactNode } from 'react'
import { login as loginApi } from '../api/auth'

interface AuthContextType {
  token: string | null
  isAuthenticated: boolean
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

  async function login(email: string, senha: string) {
    const data = await loginApi(email, senha)
    localStorage.setItem('token', data.access_token)
    setToken(data.access_token)
  }

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider')
  }
  return context
}