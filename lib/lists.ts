import { BehaviorSubject } from 'rxjs'
import { useEffect, useState } from 'react'

export type List = {
  id: number
  title: string
}

const myLists: List[] = []

export const lists$ = new BehaviorSubject<List[]>(myLists)

export const useLists = () => {
  const [lists, setListsInHook] = useState<List[]>([])

  useEffect(() => {
    const subscription = lists$.subscribe((newLists) =>
      setListsInHook([...newLists])
    )
    return () => subscription.unsubscribe()
  }, [])
  return lists
}

export const addList = (list: List) => {
  myLists.push(list)
  lists$.next(myLists)
}

export const removeList = (list: List) => {
  const index = myLists.findIndex((l) => l.id === list.id)
  if (index !== -1) {
    myLists.splice(index, 1)
    lists$.next(myLists)
  }
}
