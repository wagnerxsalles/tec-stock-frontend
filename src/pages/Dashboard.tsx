import { Navbar } from '../components/Navbar'

export function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      </div>
    </div>
  )
}