import { NavLink } from 'react-router-dom'

export default function Menu() {
  return (
    <header className="cabecalho">
      <strong>Sistema de Cadastros</strong>
      <nav>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/produtos">Produtos</NavLink>
        <NavLink to="/clientes">Clientes</NavLink>
        <NavLink to="/tarefas">Tarefas</NavLink>
      </nav>
    </header>
  )
}
