import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import ListItem from './ListItem'
import { useLists, getLists } from '../lib/lists'
import ListForm from './ListForm'

function ListView() {
  const { data: session } = useSession()
  // useEffect(() => {
  //   if (session) {
  //     getLists()
  //   }
  // }, [session])

  const lists = useLists()

  return (
    <div className="flex flex-col space-y-3">
      {lists.length > 0 ? (
        lists.map((list) => <ListItem key={list.id} list={list} />)
      ) : (
        <div>Nous n&apos;avez pas encore de liste...</div>
      )}
      <ListForm />
    </div>
  )
}

export default ListView
