import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a => a.id !== id ? a : changedAnecdote)
    },

    addNew (state, action){
      state.push(action.payload)
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }

  }
})

export const { vote, addNew, appendAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer