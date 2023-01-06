import { createAnecdote } from '../reducers/anecdoteReducer'
import { settingNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const newAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value // val based on input name --> anecdote
    event.target.anecdote.value = '' // empty field

    props.createAnecdote(content) // passed to Redux
    props.settingNotification(`${content} added`, 5) // set notification
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

const mapDispatchToProps = (dispatch) => {
  return {
    settingNotification: (notification, time) => {
      dispatch(settingNotification(notification, time)) // dispatch notification
    },
    createAnecdote: content => {
      dispatch(createAnecdote(content)) // dispatch new anecdote
    }
  }
}

const connectedAnecdotes = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)


export default connectedAnecdotes