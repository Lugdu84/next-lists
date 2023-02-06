import React from 'react'
import { List, removeList, removeListFromPrisma } from '../lib/lists'

type Props = {
  list: List
}

const handleDelete = (list: List) => {
  removeListFromPrisma(list.id).then(() => removeList(list))
}

function ListItem({ list }: Props) {
  return (
    <div className="flex space-x-2">
      <p>{list.title}</p>
      <button type="button" onClick={() => handleDelete(list)}>
        X
      </button>
    </div>
  )
}

export default ListItem
