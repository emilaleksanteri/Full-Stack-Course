import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecodeList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const anecdotesToFilter = useSelector(state => state.anecdotes)
  // anecdotes matching filter search (case sensitive)
  const filteredAnecdotes = anecdotesToFilter.filter(anecdote => anecdote.content.includes(filter))
  // sort by likes: High -> Low
  const anecdotesByMostLikes = filteredAnecdotes.sort((aVotes, bVotes) => bVotes.votes - aVotes.votes)

  // let user know voting was succesful
  const votingOnAnecdote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification('you voted ' + content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotesByMostLikes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() =>
            votingOnAnecdote(anecdote.id, anecdote.content) // --> passed to voting func, sends to reducer and sets notification
          } />
      )}
    </div>
  )
}

export default AnecodeList