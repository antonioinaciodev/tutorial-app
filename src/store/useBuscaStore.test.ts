import { beforeEach, describe, expect, it } from 'vitest'
import { useBuscaStore } from './useBuscaStore'

describe('useBuscaStore', () => {
  beforeEach(() => {
    localStorage.clear()
    useBuscaStore.setState({ busca: '' })
  })

  it('guarda o texto da busca', () => {
    useBuscaStore.getState().setBusca('brownie')
    expect(useBuscaStore.getState().busca).toBe('brownie')
  })

  it('persiste no localStorage', () => {
    useBuscaStore.getState().setBusca('brownie')
    expect(localStorage.getItem('tutorial-busca')).toContain('brownie')
  })
})