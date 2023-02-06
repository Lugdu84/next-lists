import { it, expect, describe, beforeEach } from '@jest/globals'
import { act, renderHook } from '@testing-library/react'
import { addList, useLists, lists$, removeList } from '../lib/lists'

const list = { id: '1', title: 'Ma liste' }

describe('CRUD sur une liste', () => {
  beforeEach(() => {
    // FIXME On réinitialise la liste à chaque test: Ne fonctionnne pas ...
    lists$.next([])
  })

  it('La liste est vide au début', () => {
    const { result } = renderHook(() => useLists())
    expect(result.current).toEqual([])
  })
  it('On peut ajouter un élément et le supprimer', () => {
    const { result } = renderHook(() => useLists())
    act(() => {
      addList(list)
    })
    expect(result.current).toStrictEqual([list])
    act(() => {
      removeList(list)
    })
    expect(result.current).toStrictEqual([])
  })
  it('On peut ajouter plusieurs éléments et ensuite les supprimer, en commençant par le premier élement', () => {
    const { result } = renderHook(() => useLists())
    act(() => {
      addList(list)
      addList({ id: '2', title: 'Ma liste 2' })
    })
    expect(result.current).toStrictEqual([
      { id: '1', title: 'Ma liste' },
      { id: '2', title: 'Ma liste 2' },
    ])
    act(() => {
      addList({ id: '3', title: 'Ma liste 3' })
    })
    expect(result.current).toStrictEqual([
      list,
      { id: '2', title: 'Ma liste 2' },
      { id: '3', title: 'Ma liste 3' },
    ])
    act(() => {
      removeList(list)
    })
    expect(result.current).toStrictEqual([
      { id: '2', title: 'Ma liste 2' },
      { id: '3', title: 'Ma liste 3' },
    ])
    act(() => {
      removeList({ id: '2', title: 'Ma liste 2' })
    })
    expect(result.current).toStrictEqual([{ id: '3', title: 'Ma liste 3' }])
    act(() => {
      removeList({ id: '3', title: 'Ma liste 3' })
    })
    expect(result.current).toStrictEqual([])
  })
  it("On ne peut pas supprimer un élément qui n'existe pas", () => {
    const { result } = renderHook(() => useLists())
    act(() => {
      addList(list)
    })
    expect(result.current).toStrictEqual([list])
    act(() => {
      removeList({ id: '2', title: 'Ma liste 2' })
    })
    expect(result.current).toStrictEqual([list])
  })
})
