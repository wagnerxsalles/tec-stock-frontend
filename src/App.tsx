// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { PrivateRoute } from './routes/PrivateRoute'
import { Clientes } from './pages/Clientes'
import { Equipamentos } from './pages/Equipamentos'
import { NovoEquipamento } from './pages/NovoEquipamento'
import { Atendimentos } from './pages/Atendimentos'
import { NovoAtendimento } from './pages/NovoAtendimento'
import { BuscaCliente } from './pages/BuscaClientes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/equipamentos" element={<Equipamentos />} />
          <Route path="/equipamentos/novo" element={<NovoEquipamento />} />
          <Route path="/atendimentos" element={<Atendimentos />} />
          <Route path="/atendimentos/novo" element={<NovoAtendimento />} />
          <Route path="/clientes/buscar" element={<BuscaCliente />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App