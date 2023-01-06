import { voteForPost } from '../reducers/anecdoteReducer'
import { settingNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

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

const AnecodeList = (props) => {
  const filter = props.filter

  const anecdotesToFilter = props.anecdotes
  // anecdotes matching filter search (case sensitive)
  const filteredAnecdotes = anecdotesToFilter.filter(anecdote => anecdote.content.includes(filter))
  // sort by likes: High -> Low
  const anecdotesByMostLikes = filteredAnecdotes.sort((aVotes, bVotes) => bVotes.votes - aVotes.votes)

  // let user know voting was succesful
  const votingOnAnecdote = (anecdote) => {
    props.voteForPost(anecdote)
    props.settingNotification(`you voted for ${anecdote.content}`, 5)
  }

  return (
    <div>
      {anecdotesByMostLikes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() =>
            votingOnAnecdote(anecdote) // --> passed to voting func, sends to reducer and sets notification
          } />
      )}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    settingNotification: (notification, time) => {
      dispatch(settingNotification(notification, time))
    },
    voteForPost: anecdote => {
      dispatch(voteForPost(anecdote))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    anecdotes: state.anecdotes
  }
}

const connectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecodeList)

export default connectedAnecdotes