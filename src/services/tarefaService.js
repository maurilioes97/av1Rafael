const API_URL = '/api/tarefas'

export async function listarTarefas(status = '', prioridade = '') {
  const parametros = new URLSearchParams()

  if (status) parametros.append('status', status)
  if (prioridade) parametros.append('prioridade', prioridade)

  const url = parametros.toString()
    ? `${API_URL}?${parametros.toString()}`
    : API_URL

  const resposta = await fetch(url)
  if (!resposta.ok) throw new Error('Nao foi possivel listar as tarefas')
  return resposta.json()
}

export async function cadastrarTarefa(tarefa) {
  const resposta = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tarefa),
  })
  if (!resposta.ok) throw new Error('Nao foi possivel cadastrar a tarefa')
  return resposta.json()
}

export async function atualizarTarefa(id, tarefa) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tarefa),
  })
  if (!resposta.ok) throw new Error('Nao foi possivel atualizar a tarefa')
  return resposta.json()
}

export async function excluirTarefa(id) {
  const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  if (!resposta.ok) throw new Error('Nao foi possivel excluir a tarefa')
}
