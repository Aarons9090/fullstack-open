import { useDispatch } from "react-redux"
import { addNew } from "../reducers/anecdoteReducer"
import { addNotification, clearNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addNewAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""

        const newAnecdote = await anecdoteService.addNew(content)
        dispatch(addNew(newAnecdote))

        dispatch(addNotification(`you added ${content}`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addNewAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>

    )
}

export default AnecdoteForm