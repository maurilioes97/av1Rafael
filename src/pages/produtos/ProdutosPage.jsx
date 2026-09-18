import { useEffect, useState } from 'react'
import {
  atualizarProduto,
  cadastrarProduto,
  excluirProduto,
  listarProdutos,
} from '../../services/produtoService.js'

const produtoInicial = {
  nome: '',
  descricao: '',
  preco: '',
  quantidadeEstoque: '',
  categoria: '',
  marca: '',
  cor: '',
  peso: '',
  altura: '',
  largura: '',
  profundidade: '',
  codigoBarras: '',
  fabricante: '',
  ativo: true,
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([])
  const [produto, setProduto] = useState(produtoInicial)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null)
  const [nomePesquisa, setNomePesquisa] = useState('')
  const [categoriaPesquisa, setCategoriaPesquisa] = useState('')
  const [ativoPesquisa, setAtivoPesquisa] = useState('')

  useEffect(() => {
    carregarProdutos()
  }, [])

  async function carregarProdutos(nome = '', categoria = '', ativo = '') {
    try {
      setLoading(true)
      setError('')
      const dados = await listarProdutos(nome, categoria, ativo)
      setProdutos(dados)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function pesquisarProdutos(event) {
    event.preventDefault()
    carregarProdutos(nomePesquisa, categoriaPesquisa, ativoPesquisa)
  }

  function alterarCampo(event) {
    const { name, value, type, checked } = event.target
    setProduto({ ...produto, [name]: type === 'checkbox' ? checked : value })
  }

  function iniciarEdicao(item) {
    setProdutoEmEdicao(item)
    setProduto({
      nome: item.nome,
      descricao: item.descricao || '',
      preco: item.preco,
      quantidadeEstoque: item.quantidadeEstoque,
      categoria: item.categoria || '',
      marca: item.marca || '',
      cor: item.cor || '',
      peso: item.peso || '',
      altura: item.altura || '',
      largura: item.largura || '',
      profundidade: item.profundidade || '',
      codigoBarras: item.codigoBarras || '',
      fabricante: item.fabricante || '',
      ativo: item.ativo ?? true,
    })
    setError('')
    setMensagem('')
  }

  function cancelarEdicao() {
    setProdutoEmEdicao(null)
    setProduto(produtoInicial)
  }

  async function salvarProduto(event) {
    event.preventDefault()
    const dados = {
      ...produto,
      preco: Number(produto.preco),
      quantidadeEstoque: Number(produto.quantidadeEstoque),
      peso: produto.peso === '' ? undefined : Number(produto.peso),
      altura: produto.altura === '' ? undefined : Number(produto.altura),
      largura: produto.largura === '' ? undefined : Number(produto.largura),
      profundidade: produto.profundidade === '' ? undefined : Number(produto.profundidade),
    }

    try {
      setError('')
      setMensagem('')
      if (produtoEmEdicao) {
        const atualizado = await atualizarProduto(produtoEmEdicao.id, dados)
        setProdutos(produtos.map((item) => item.id === atualizado.id ? atualizado : item))
        setMensagem('Produto atualizado com sucesso')
      } else {
        const novo = await cadastrarProduto(dados)
        setProdutos([...produtos, novo])
        setMensagem('Produto cadastrado com sucesso')
      }
      cancelarEdicao()
    } catch (err) {
      setError(err.message)
    }
  }

  async function removerProduto(item) {
    if (!window.confirm(`Deseja excluir o produto ${item.nome}?`)) return
    try {
      await excluirProduto(item.id)
      setProdutos(produtos.filter((produto) => produto.id !== item.id))
      setMensagem('Produto excluido com sucesso')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section>
      <h2>Produtos</h2>

      {error && <p className="erro">{error}</p>}
      {mensagem && <p className="sucesso">{mensagem}</p>}

      <form className="formulario" onSubmit={salvarProduto}>
        <input
          name="nome"
          placeholder="Nome"
          value={produto.nome}
          onChange={alterarCampo}
          required
        />

        <input
          name="descricao"
          placeholder="Descricao"
          value={produto.descricao}
          onChange={alterarCampo}
        />

        <input
          name="preco"
          type="number"
          step="0.01"
          placeholder="Preco"
          value={produto.preco}
          onChange={alterarCampo}
          required
        />

        <input
          name="quantidadeEstoque"
          type="number"
          placeholder="Quantidade"
          value={produto.quantidadeEstoque}
          onChange={alterarCampo}
          required
        />

        <input
          name="categoria"
          placeholder="Categoria"
          value={produto.categoria}
          onChange={alterarCampo}
        />

        <input
          name="marca"
          placeholder="Marca"
          value={produto.marca}
          onChange={alterarCampo}
        />

        <input
          name="cor"
          placeholder="Cor"
          value={produto.cor}
          onChange={alterarCampo}
        />

        <input
          name="peso"
          type="number"
          step="0.01"
          placeholder="Peso"
          value={produto.peso}
          onChange={alterarCampo}
        />

        <input
          name="altura"
          type="number"
          step="0.01"
          placeholder="Altura"
          value={produto.altura}
          onChange={alterarCampo}
        />

        <input
          name="largura"
          type="number"
          step="0.01"
          placeholder="Largura"
          value={produto.largura}
          onChange={alterarCampo}
        />

        <input
          name="profundidade"
          type="number"
          step="0.01"
          placeholder="Profundidade"
          value={produto.profundidade}
          onChange={alterarCampo}
        />

        <input
          name="codigoBarras"
          placeholder="Codigo de barras"
          value={produto.codigoBarras}
          onChange={alterarCampo}
        />

        <input
          name="fabricante"
          placeholder="Fabricante"
          value={produto.fabricante}
          onChange={alterarCampo}
        />

        <label>
          <input
            name="ativo"
            type="checkbox"
            checked={produto.ativo}
            onChange={alterarCampo}
          />
          Ativo
        </label>

        <button type="submit">
          {produtoEmEdicao ? 'Salvar alteracoes' : 'Cadastrar'}
        </button>

        {produtoEmEdicao && (
          <button type="button" onClick={cancelarEdicao}>
            Cancelar
          </button>
        )}
      </form>

      <form className="pesquisa" onSubmit={pesquisarProdutos}>
        <input
          placeholder="Pesquisar por nome"
          value={nomePesquisa}
          onChange={(event) => setNomePesquisa(event.target.value)}
        />

        <input
          placeholder="Pesquisar por categoria"
          value={categoriaPesquisa}
          onChange={(event) => setCategoriaPesquisa(event.target.value)}
        />

        <select
          value={ativoPesquisa}
          onChange={(event) => setAtivoPesquisa(event.target.value)}
        >
          <option value="">Todos</option>
          <option value="true">Ativos</option>
          <option value="false">Inativos</option>
        </select>

        <button type="submit">Pesquisar</button>
      </form>

      <div className="lista">
        <div className="lista-cabecalho">
          <h3>Produtos cadastrados</h3>
          <button
            type="button"
            onClick={() => carregarProdutos(
              nomePesquisa,
              categoriaPesquisa,
              ativoPesquisa,
            )}
          >
            Atualizar lista
          </button>
        </div>

        {loading && <p>Carregando...</p>}

        {!loading && produtos.length === 0 && (
          <p>Nenhum produto cadastrado</p>
        )}

        {!loading && produtos.map((item) => (
          <article className="produto" key={item.id}>
            <div className="produto-dados">
              <strong>{item.nome}</strong>
              <span>Descricao: {item.descricao || '-'}</span>
              <span>Preco: R$ {Number(item.preco).toFixed(2)}</span>
              <span>Estoque: {item.quantidadeEstoque}</span>
              <span>Categoria: {item.categoria || '-'}</span>
              <span>Marca: {item.marca || '-'}</span>
              <span>Cor: {item.cor || '-'}</span>
              <span>Peso: {item.peso || '-'}</span>
              <span>Altura: {item.altura || '-'}</span>
              <span>Largura: {item.largura || '-'}</span>
              <span>Profundidade: {item.profundidade || '-'}</span>
              <span>Codigo de barras: {item.codigoBarras || '-'}</span>
              <span>Fabricante: {item.fabricante || '-'}</span>
              <span>Ativo: {item.ativo ? 'Sim' : 'Nao'}</span>
            </div>

            <div className="produto-acoes">
              <button type="button" onClick={() => iniciarEdicao(item)}>
                Editar
              </button>

              <button
                type="button"
                className="danger"
                onClick={() => removerProduto(item)}
              >
                Excluir
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
