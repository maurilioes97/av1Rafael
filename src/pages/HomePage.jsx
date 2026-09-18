import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <section className="hero">
      <h2>Tela de gerenciamento</h2>

      

      <div className="cards">
        <article className="card">
          <h3>Produtos</h3>
          <Link className="botao" to="/produtos">
            Gerenciar produtos
          </Link>
        </article>

        <article className="card">
          <h3>Clientes</h3>
          <Link className="botao" to="/clientes">
            Gerenciar clientes
          </Link>
        </article>

        <article className="card">
          <h3>Tarefas</h3>
          <Link className="botao" to="/tarefas">
            Gerenciar tarefas
          </Link>
        </article>
      </div>
    </section>
  )
}
