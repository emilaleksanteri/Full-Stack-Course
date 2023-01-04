import AnecdoteForm from './components/NewAnecdote'
import AnecodeList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecServices from './services/anecdotes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecServices
      .getAll()
      .then(anecdotes =>
        dispatch(setAnecdotes(anecdotes))
      )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


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