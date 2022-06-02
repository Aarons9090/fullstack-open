import { useSelector, useDispatch } from 'react-redux'
import { vote } from "../reducers/anecdoteReducer"
import { addNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state=> state.filter)
    const dispatch = useDispatch()

    const voteAnecdote = ({id, content}) => {
        dispatch(vote(id))
        
        dispatch(addNotification(`you voted ${content}`))
         setTimeout(() => {
             dispatch(clearNotification())
         }, 5000)
        
      }

    const anecdotesToShow = () => {
        return anecdotes
            .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
         
    }

    return (
        <div>
            {anecdotesToShow().map(anecdote =>
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