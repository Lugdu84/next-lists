import ListItem from './ListItem'
import { useLists } from '../lib/lists'
import ListForm from './ListForm'

function ListView() {
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
