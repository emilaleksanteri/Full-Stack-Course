import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecServices from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value // val based on input name --> anecdote
    event.target.anecdote.value = ''

    const newAnecdote = await anecServices.postAnecdote(content)
    dispatch(addAnecdote(newAnecdote)) // --> passed to function in reducers to process to add to state
    
    dispatch(setNotification(content + ' has been added')) // let user know anecdote created
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
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