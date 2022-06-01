import { useSelector, useDispatch } from 'react-redux'
import { vote } from "../reducers/anecdoteReducer"

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
    const voteAnecdote = (id) => {
        dispatch(vote(id))
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
                        <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
                    </div>
                </div>


            )}
        </div>
    )
}

export default AnecdoteList