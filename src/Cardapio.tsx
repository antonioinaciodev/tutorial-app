import { useEffect } from 'react'
import { useBuscaStore } from './store/useBuscaStore'

const PRODUTOS = [
  { id: 1, nome: 'Brownie', preco: 5 },
  { id: 2, nome: 'Coxinha', preco: 6 },
  { id: 3, nome: 'Suco de laranja', preco: 4 },
]

// Componente com props: recebe os dados de fora e só desenha.
function ItemProduto({ nome, preco }: { nome: string; preco: number }) {
  return (
    <li>
      {nome}: R$ {preco.toFixed(2)}
    </li>
  )
}

export default function Cardapio() {
  const { busca, setBusca } = useBuscaStore()
  const lista = PRODUTOS.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()))

  // Efeito colateral: atualiza o título da aba sempre que a quantidade muda.
  useEffect(() => {
    document.title = `Cardápio (${lista.length})`
  }, [lista.length])

  return (
    <section>
      <h1>Cardápio</h1>
      <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar…" />
      <ul>
        {lista.map((p) => (
          <ItemProduto key={p.id} nome={p.nome} preco={p.preco} />
        ))}
      </ul>
    </section>
  )
}