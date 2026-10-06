import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Cardapio from './Cardapio'
import Conta from './Conta'
import Mapa from './Mapa'
import Produtos from './Produtos'

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: 16, padding: 16 }}>
        <Link to="/">Cardápio</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/mapa">Mapa</Link>
        <Link to="/conta">Conta</Link>
      </nav>
      <main style={{ padding: '0 16px' }}>
        <Routes>
          <Route path="/" element={<Cardapio />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/conta" element={<Conta />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}