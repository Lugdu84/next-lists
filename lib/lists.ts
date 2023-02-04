import { BehaviorSubject } from 'rxjs'
import { useEffect, useState } from 'react'

export type List = {
  id: number
  title: string
}

let myLists: List[] = []

export const lists$ = new BehaviorSubject<List[]>(myLists)

export const getLists = async () => {
  try {
    const response = await fetch('/api/lists')
    const data = await response.json()
    myLists = data
    lists$.next(myLists)
  } catch (error) {
    console.error(error)
  }
}

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

export const addList = (list: List): List => {
  myLists.push(list)

  lists$.next(myLists)
  return list
}

export const addListToPrisma = async (title: string) => {
  try {
    const response = await fetch('/api/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(title),
    })
    const data = await response.json()
    return data
  } catch (error) {
    return null
  }
}

export const removeList = (list: List) => {
  const index = myLists.findIndex((l) => l.id === list.id)
  if (index !== -1) {
    myLists.splice(index, 1)
    lists$.next(myLists)
  }
}
