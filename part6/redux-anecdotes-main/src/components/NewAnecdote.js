import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value // val based on input name --> anecdote
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content)) // --> passed to function in reducers to process --> passed to reducer via dispatch
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
          <div><input name='anecdote' /></div>
          <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm