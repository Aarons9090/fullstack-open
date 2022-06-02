import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from "../reducers/anecdoteReducer"
import { addNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const voteAnecdote = ({id, content}) => {
        dispatch(vote(id))
        
        dispatch(addNotification(`you voted ${content}`))
         setTimeout(() => {
             dispatch(clearNotification())
         }, 5000)
        
        
      }

    return (
        <div>
            {anecdotes.sort((a, b) => { return b.votes - a.votes }).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteAnecdote(anecdote)}>vote</button>
                    </div>
                </div>


            )}
        </div>
    )
}

export default AnecdoteList