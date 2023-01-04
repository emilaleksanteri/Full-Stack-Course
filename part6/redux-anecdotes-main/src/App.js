import AnecdoteForm from './components/NewAnecdote'
import AnecodeList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initalizedAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initalizedAnecdotes())
  }, [dispatch])


  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <AnecodeList />
      <AnecdoteForm />
    </div>
  )
}

export default App