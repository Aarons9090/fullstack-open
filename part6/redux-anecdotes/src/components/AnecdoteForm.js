import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import { connect } from "react-redux"
const AnecdoteForm = (props) => {


    const addNewAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""

        props.createAnecdote(content)

        props.setNotification(`You added ${content}`, 5)
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification,
}

const ConnectedAnecdoteForm = connect(
    mapStateToProps,
    mapDispatchToProps
    )(AnecdoteForm)

export default ConnectedAnecdoteForm