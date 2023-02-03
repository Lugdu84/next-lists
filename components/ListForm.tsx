import React from 'react'
// eslint-disable-next-line import/no-unresolved
import { addList } from '@/lib/lists'

function ListForm() {
  const [title, setTitle] = React.useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newList = {
      id: Date.now(),
      title,
    }
    addList(newList)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="border border-gray-300 rounded-md p-2"
        type="text"
        name="title"
        placeholder="Titre de la liste"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  )
}

export default ListForm
