import { useEffect, useState, type FormEvent } from 'react'
import { supabase } from './supabase'

interface Produto {
  id: number
  nome: string
  preco: number
}

export default function Produtos() {
  const [lista, setLista] = useState<Produto[]>([])
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')

  useEffect(() => {
    // LER: um GET na API REST que o Supabase gera a partir da tabela
    const carregar = () =>
      supabase
        .from('produtos')
        .select('id, nome, preco')
        .order('id')
        .then(({ data }) => setLista((data ?? []) as Produto[]))

    void carregar()

    // TEMPO REAL: o banco avisa (WebSocket) quando a tabela muda
    const canal = supabase
      .channel('produtos-ao-vivo')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'produtos' }, () => void carregar())
      .subscribe()

    return () => {
      void supabase.removeChannel(canal)
    }
  }, [])

  // GRAVAR: um POST; o user_id é preenchido pelo próprio banco
  async function adicionar(e: FormEvent) {
    e.preventDefault()
    const { error } = await supabase.from('produtos').insert({ nome, preco: Number(preco) })
    if (error) alert(error.message)
    else {
      setNome('')
      setPreco('')
    }
  }

  return (
    <section>
      <h1>Produtos (no servidor)</h1>
      <form onSubmit={adicionar}>
        <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" required />{' '}
        <input value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço" type="number" step="0.01" required />{' '}
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {lista.map((p) => (
          <li key={p.id}>
            {p.nome}: R$ {Number(p.preco).toFixed(2)}
          </li>
        ))}
      </ul>
    </section>
  )
}