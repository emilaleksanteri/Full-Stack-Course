import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { settingNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value // val based on input name --> anecdote
    event.target.anecdote.value = '' // empty field

    dispatch(createAnecdote(content)) // passed to Redux
    
    dispatch(settingNotification(`${content} added`, 5))
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