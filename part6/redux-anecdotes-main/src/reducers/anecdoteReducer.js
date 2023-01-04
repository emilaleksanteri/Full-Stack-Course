import { createSlice } from "@reduxjs/toolkit"

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload // get id
      const voteThis = state.find(anec => anec.id === id) // get object w matching id key
      const votedAnec = { // update votes on set object
        ...voteThis,
        votes: voteThis.votes += 1
      }
      state.map(anec => anec.id !== id ? anec : votedAnec) // replace one with changed votes
      return state
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { addAnecdote, voteAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer