import { useEffect, useState } from 'react'
import {
  atualizarCliente,
  cadastrarCliente,
  excluirCliente,
  listarClientes,
} from '../../services/clienteService.js'

const clienteInicial = {
  nome: '',
  email: '',
  telefone: '',
  cidade: '',
  estado: '',
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState([])
  const [cliente, setCliente] = useState(clienteInicial)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [clienteEmEdicao, setClienteEmEdicao] = useState(null)
  const [nomePesquisa, setNomePesquisa] = useState('')
  const [cidadePesquisa, setCidadePesquisa] = useState('')

  useEffect(() => {
    carregarClientes()
  }, [])

  async function carregarClientes(nome = '', cidade = '') {
    try {
      setLoading(true)
      setError('')
      const dados = await listarClientes(nome, cidade)
      setClientes(dados)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function pesquisarClientes(event) {
    event.preventDefault()
    carregarClientes(nomePesquisa, cidadePesquisa)
  }

  function alterarCampo(event) {
    setCliente({ ...cliente, [event.target.name]: event.target.value })
  }

  function iniciarEdicao(item) {
    setClienteEmEdicao(item)
    setCliente({
      nome: item.nome,
      email: item.email,
      telefone: item.telefone || '',
      cidade: item.cidade || '',
      estado: item.estado || '',
    })
    setError('')
    setMensagem('')
  }

  function cancelarEdicao() {
    setClienteEmEdicao(null)
    setCliente(clienteInicial)
  }

  async function salvarCliente(event) {
    event.preventDefault()
    try {
      setError('')
      setMensagem('')
      if (clienteEmEdicao) {
        const atualizado = await atualizarCliente(clienteEmEdicao.id, cliente)
        setClientes(clientes.map((item) => item.id === atualizado.id ? atualizado : item))
        setMensagem('Cliente atualizado com sucesso')
      } else {
        const novo = await cadastrarCliente(cliente)
        setClientes([...clientes, novo])
        setMensagem('Cliente cadastrado com sucesso')
      }
      cancelarEdicao()
    } catch (err) {
      setError(err.message)
    }
  }

  async function removerCliente(item) {
    if (!window.confirm(`Deseja excluir o cliente ${item.nome}?`)) return
    try {
      await excluirCliente(item.id)
      setClientes(clientes.filter((cliente) => cliente.id !== item.id))
      setMensagem('Cliente excluido com sucesso')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section>
      <h2>Clientes</h2>

      {error && <p className="erro">{error}</p>}
      {mensagem && <p className="sucesso">{mensagem}</p>}

      <form className="formulario" onSubmit={salvarCliente}>
        <input
          name="nome"
          placeholder="Nome"
          value={cliente.nome}
          onChange={alterarCampo}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="E-mail"
          value={cliente.email}
          onChange={alterarCampo}
          required
        />

        <input
          name="telefone"
          placeholder="Telefone"
          value={cliente.telefone}
          onChange={alterarCampo}
        />

        <input
          name="cidade"
          placeholder="Cidade"
          value={cliente.cidade}
          onChange={alterarCampo}
        />

        <input
          name="estado"
          placeholder="Estado"
          maxLength="2"
          value={cliente.estado}
          onChange={alterarCampo}
        />

        <button type="submit">
          {clienteEmEdicao ? 'Salvar alteracoes' : 'Cadastrar'}
        </button>

        {clienteEmEdicao && (
          <button type="button" onClick={cancelarEdicao}>
            Cancelar
          </button>
        )}
      </form>

      <form className="pesquisa" onSubmit={pesquisarClientes}>
        <input
          placeholder="Pesquisar por nome"
          value={nomePesquisa}
          onChange={(event) => setNomePesquisa(event.target.value)}
        />

        <input
          placeholder="Pesquisar por cidade"
          value={cidadePesquisa}
          onChange={(event) => setCidadePesquisa(event.target.value)}
        />

        <button type="submit">Pesquisar</button>
      </form>

      <div className="lista">
        <div className="lista-cabecalho">
          <h3>Clientes cadastrados</h3>
          <button
            type="button"
            onClick={() => carregarClientes(nomePesquisa, cidadePesquisa)}
          >
            Atualizar lista
          </button>
        </div>

        {loading && <p>Carregando...</p>}

        {!loading && clientes.length === 0 && (
          <p>Nenhum cliente cadastrado</p>
        )}

        {!loading && clientes.map((item) => (
          <article className="item item-cliente" key={item.id}>
            <strong>Nome: {item.nome}</strong>
            <span>E-mail: {item.email}</span>
            <span>Telefone: {item.telefone || '-'}</span>
            <span>Cidade: {item.cidade || '-'}</span>
            <span>Estado: {item.estado || '-'}</span>

            <button type="button" onClick={() => iniciarEdicao(item)}>
              Editar
            </button>

            <button
              type="button"
              className="danger"
              onClick={() => removerCliente(item)}
            >
              Excluir
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
