import React from 'react'
import { useSession } from 'next-auth/react'
// eslint-disable-next-line import/no-unresolved
import { addList, addListToPrisma } from '@/lib/lists'

function ListForm() {
  const { data: session } = useSession()
  const [title, setTitle] = React.useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addListToPrisma(title, session?.user?.id).then((response) =>
      addList({
        id: response.id,
        title: response.title,
      })
    )
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
