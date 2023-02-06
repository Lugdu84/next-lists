import { BehaviorSubject } from 'rxjs'
import { useEffect, useState } from 'react'

export type List = {
  id: string
  title: string
}

let myLists: List[] = []

export const lists$ = new BehaviorSubject<List[]>(myLists)

export const getLists = async (userId: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/lists/${userId}`)
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

export const addListToPrisma = async (title: string, userId: string) => {
  try {
    const response = await fetch('/api/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, userId }),
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

export const removeListFromPrisma = async (id: string) => {
  try {
    const response = await fetch(`/api/lists/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Something went wrong')
    }
  } catch (error) {
    console.error(error)
  }
}
