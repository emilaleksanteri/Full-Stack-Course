const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

// combines string from above array into to an object key -> passes it to reducer as initial state
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data] // update existing array w new anecdote via spread

    case 'VOTE':
      const id = action.data.id // get id
      const voteThis = state.find(anec => anec.id === id) // get object w matching id key
      const votedAnec = { // update votes on set object
        ...voteThis,
        votes: voteThis.votes += 1
      }
      return state.map(anec => // update only changed object in a copy of state array, rest stay the same
        anec.id !== id ? anec : votedAnec
      )
    default:
      return state
  }
}

// used by components/NewAnecdote to dispatch for state -> new anecdote
export const addAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }
}

// used by components/AnecdoteList to dispatch for state -> vote
export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default reducer