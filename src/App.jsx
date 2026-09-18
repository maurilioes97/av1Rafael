import { Route, Routes } from 'react-router-dom'
import Menu from './components/Menu.jsx'
import HomePage from './pages/HomePage.jsx'
import ProdutosPage from './pages/produtos/ProdutosPage.jsx'
import ClientesPage from './pages/clientes/ClientesPage.jsx'
import TarefasPage from './pages/tarefas/TarefasPage.jsx'

export default function App() {
  return (
    <>
      <Menu />
      <main className="container">
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/produtos" element={<ProdutosPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/tarefas" element={<TarefasPage />} />
        </Routes>
      </main>
    </>
  )
}
