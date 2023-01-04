import { createSlice } from "@reduxjs/toolkit"
import anecService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    pushAnecdote(state, action) {
      state.push(action.payload)
    }
  },
})

export const initalizedAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecService.postAnecdote(content)
    dispatch(pushAnecdote(newAnecdote))
  }
}

export const voteForPost = anecdoteToVote => {
  return async dispatch => {
    const updatedAnecdote = { ...anecdoteToVote }
    const anecdoteToPost = { ...updatedAnecdote, votes: updatedAnecdote.votes += 1 }
    const id = anecdoteToPost.id
    const updateThis = await anecService.voteAnecdote(anecdoteToPost, id)
    dispatch(voteAnecdote(updateThis))
  }
}

export const { addAnecdote, voteAnecdote, setAnecdotes, pushAnecdote } = anecdotesSlice.actions
export default anecdotesSlice.reducer