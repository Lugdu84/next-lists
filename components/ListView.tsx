import React from 'react'
import ListItem from './ListItem'
import { useLists } from '../lib/lists'
import ListForm from './ListForm'

function ListView() {
  const lists = useLists()
  return (
    <div className="flex flex-col space-y-3">
      {lists.map((list) => (
        <ListItem key={list.id} list={list} />
      ))}
      <ListForm />
    </div>
  )
}

export default ListView
