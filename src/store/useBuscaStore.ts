import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BuscaState {
  busca: string
  setBusca: (busca: string) => void
}

// Estado global + persistência local: o texto da busca sobrevive ao F5.
// O Zustand grava o estado no localStorage, na chave "tutorial-busca".
export const useBuscaStore = create<BuscaState>()(
  persist(
    (set) => ({
      busca: '',
      setBusca: (busca) => set({ busca }),
    }),
    { name: 'tutorial-busca' },
  ),
)