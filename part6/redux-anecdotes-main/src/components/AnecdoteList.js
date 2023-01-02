import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state).sort((first, second) => second.votes - first.votes) // sort by likes
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() =>
            dispatch(voteAnecdote(anecdote.id)) // --> passed to function in reducers to process --> passed to reducer via dispatch
          } />
      )}
    </div>
  )
}

export default AnecodeList