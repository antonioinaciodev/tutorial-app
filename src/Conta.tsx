import { useState } from 'react'
import { supabase } from './supabase'

export default function Conta() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [msg, setMsg] = useState('')

  async function executar(acao: 'cadastrar' | 'entrar' | 'sair') {
    const credenciais = { email, password: senha }
    const { error } =
      acao === 'cadastrar'
        ? await supabase.auth.signUp(credenciais)
        : acao === 'entrar'
          ? await supabase.auth.signInWithPassword(credenciais)
          : await supabase.auth.signOut()
    setMsg(error ? error.message : 'Ok!')
  }

  return (
    <section>
      <h1>Conta</h1>
      <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />{' '}
      <input type="password" placeholder="Senha (mín. 6)" value={senha} onChange={(e) => setSenha(e.target.value)} />{' '}
      <button onClick={() => void executar('cadastrar')}>Cadastrar</button>{' '}
      <button onClick={() => void executar('entrar')}>Entrar</button>{' '}
      <button onClick={() => void executar('sair')}>Sair</button>
      {msg && <p>{msg}</p>}
    </section>
  )
}