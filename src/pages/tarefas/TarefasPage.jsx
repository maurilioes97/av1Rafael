import { useEffect, useState } from 'react'
import {
  atualizarTarefa,
  cadastrarTarefa,
  excluirTarefa,
  listarTarefas,
} from '../../services/tarefaService.js'

const tarefaInicial = {
  titulo: '',
  descricao: '',
  status: 'pendente',
  prioridade: 'media',
  dataLimite: '',
}

export default function TarefasPage() {
  const [tarefas, setTarefas] = useState([])
  const [tarefa, setTarefa] = useState(tarefaInicial)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null)
  const [statusPesquisa, setStatusPesquisa] = useState('')
  const [prioridadePesquisa, setPrioridadePesquisa] = useState('')

  useEffect(() => {
    carregarTarefas()
  }, [])

  async function carregarTarefas(status = '', prioridade = '') {
    try {
      setLoading(true)
      setError('')
      const dados = await listarTarefas(status, prioridade)
      setTarefas(dados)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function pesquisarTarefas(event) {
    event.preventDefault()
    carregarTarefas(statusPesquisa, prioridadePesquisa)
  }

  function alterarCampo(event) {
    setTarefa({ ...tarefa, [event.target.name]: event.target.value })
  }

  function iniciarEdicao(item) {
    setTarefaEmEdicao(item)
    setTarefa({
      titulo: item.titulo,
      descricao: item.descricao || '',
      status: item.status,
      prioridade: item.prioridade,
      dataLimite: item.dataLimite || '',
    })
    setError('')
    setMensagem('')
  }

  function cancelarEdicao() {
    setTarefaEmEdicao(null)
    setTarefa(tarefaInicial)
  }

  async function salvarTarefa(event) {
    event.preventDefault()
    const dados = { ...tarefa }
    if (!dados.dataLimite) delete dados.dataLimite
    try {
      setError('')
      setMensagem('')
      if (tarefaEmEdicao) {
        const atualizada = await atualizarTarefa(tarefaEmEdicao.id, dados)
        setTarefas(tarefas.map((item) => item.id === atualizada.id ? atualizada : item))
        setMensagem('Tarefa atualizada com sucesso')
      } else {
        const nova = await cadastrarTarefa(dados)
        setTarefas([...tarefas, nova])
        setMensagem('Tarefa cadastrada com sucesso')
      }
      cancelarEdicao()
    } catch (err) {
      setError(err.message)
    }
  }

  async function removerTarefa(item) {
    if (!window.confirm(`Deseja excluir a tarefa ${item.titulo}?`)) return
    try {
      await excluirTarefa(item.id)
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== item.id))
      setMensagem('Tarefa excluida com sucesso')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section>
      <h2>Tarefas</h2>

      {error && <p className="erro">{error}</p>}
      {mensagem && <p className="sucesso">{mensagem}</p>}

      <form className="formulario" onSubmit={salvarTarefa}>
        <input
          name="titulo"
          placeholder="Titulo"
          value={tarefa.titulo}
          onChange={alterarCampo}
          required
        />

        <input
          name="descricao"
          placeholder="Descricao"
          value={tarefa.descricao}
          onChange={alterarCampo}
        />

        <select
          name="status"
          value={tarefa.status}
          onChange={alterarCampo}
        >
          <option value="pendente">Pendente</option>
          <option value="em_andamento">Em andamento</option>
          <option value="concluida">Concluida</option>
        </select>

        <select
          name="prioridade"
          value={tarefa.prioridade}
          onChange={alterarCampo}
        >
          <option value="baixa">Baixa</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>

        <input
          name="dataLimite"
          type="date"
          value={tarefa.dataLimite}
          onChange={alterarCampo}
        />

        <button type="submit">
          {tarefaEmEdicao ? 'Salvar alteracoes' : 'Cadastrar'}
        </button>

        {tarefaEmEdicao && (
          <button type="button" onClick={cancelarEdicao}>
            Cancelar
          </button>
        )}
      </form>

      <form className="pesquisa" onSubmit={pesquisarTarefas}>
        <select
          value={statusPesquisa}
          onChange={(event) => setStatusPesquisa(event.target.value)}
        >
          <option value="">Todos os status</option>
          <option value="pendente">Pendente</option>
          <option value="em_andamento">Em andamento</option>
          <option value="concluida">Concluida</option>
        </select>

        <select
          value={prioridadePesquisa}
          onChange={(event) => setPrioridadePesquisa(event.target.value)}
        >
          <option value="">Todas as prioridades</option>
          <option value="baixa">Baixa</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>

        <button type="submit">Pesquisar</button>
      </form>

      <div className="lista">
        <div className="lista-cabecalho">
          <h3>Tarefas cadastradas</h3>
          <button
            type="button"
            onClick={() => carregarTarefas(
              statusPesquisa,
              prioridadePesquisa,
            )}
          >
            Atualizar lista
          </button>
        </div>

        {loading && <p>Carregando...</p>}

        {!loading && tarefas.length === 0 && (
          <p>Nenhuma tarefa cadastrada</p>
        )}

        {!loading && tarefas.map((item) => (
          <article className="item item-tarefa" key={item.id}>
            <strong>Titulo: {item.titulo}</strong>
            <span>Descricao: {item.descricao || '-'}</span>
            <span>Status: {item.status}</span>
            <span>Prioridade: {item.prioridade}</span>
            <span>Data limite: {item.dataLimite || '-'}</span>

            <button type="button" onClick={() => iniciarEdicao(item)}>
              Editar
            </button>

            <button
              type="button"
              className="danger"
              onClick={() => removerTarefa(item)}
            >
              Excluir
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
