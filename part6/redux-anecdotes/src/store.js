import { configureStore } from "@reduxjs/toolkit"
import anecdoteReducer, { initializeAnecdotes, setAnecdotes } from "./reducers/anecdoteReducer"
import notificationReducer from "./reducers/notificationReducer"
import filterReducer from "./reducers/filterReducer"
import anecdoteService from "./services/anecdotes"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


export const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notification: notificationReducer,
        filter: filterReducer
    }
})

