const API_URL = '/api/produtos'

export async function listarProdutos(nome = '', categoria = '', ativo = '') {
  const parametros = new URLSearchParams()

  if (nome) parametros.append('nome', nome)
  if (categoria) parametros.append('categoria', categoria)
  if (ativo) parametros.append('ativo', ativo)

  const url = parametros.toString()
    ? `${API_URL}?${parametros.toString()}`
    : API_URL

  const resposta = await fetch(url)
  if (!resposta.ok) throw new Error('Nao foi possivel listar os produtos')
  return resposta.json()
}

export async function cadastrarProduto(produto) {
  const resposta = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto),
  })
  if (!resposta.ok) throw new Error('Nao foi possivel cadastrar o produto')
  return resposta.json()
}

export async function atualizarProduto(id, produto) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto),
  })
  if (!resposta.ok) throw new Error('Nao foi possivel atualizar o produto')
  return resposta.json()
}

export async function excluirProduto(id) {
  const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  if (!resposta.ok) throw new Error('Nao foi possivel excluir o produto')
}
