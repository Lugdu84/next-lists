import React from 'react'
import { List, removeList } from '../lib/lists'

type Props = {
  list: List
}

function ListItem({ list }: Props) {
  return (
    <div className="flex space-x-2">
      <p>{list.title}</p>
      <button type="button" onClick={() => removeList(list)}>
        X
      </button>
    </div>
  )
}

export default ListItem
