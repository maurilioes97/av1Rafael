const API_URL = '/api/clientes'

export async function listarClientes(nome = '', cidade = '') {
  const parametros = new URLSearchParams()

  if (nome) parametros.append('nome', nome)
  if (cidade) parametros.append('cidade', cidade)

  const url = parametros.toString()
    ? `${API_URL}?${parametros.toString()}`
    : API_URL

  const resposta = await fetch(url)
  if (!resposta.ok) throw new Error('Nao foi possivel listar os clientes')
  return resposta.json()
}

export async function cadastrarCliente(cliente) {
  const resposta = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  })
  if (!resposta.ok) throw new Error('Nao foi possivel cadastrar o cliente')
  return resposta.json()
}

export async function atualizarCliente(id, cliente) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  })
  if (!resposta.ok) throw new Error('Nao foi possivel atualizar o cliente')
  return resposta.json()
}

export async function excluirCliente(id) {
  const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  if (!resposta.ok) throw new Error('Nao foi possivel excluir o cliente')
}
