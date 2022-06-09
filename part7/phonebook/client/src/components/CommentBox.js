import { useState } from "react"
import { useDispatch } from "react-redux"
import { addComment } from "../reducers/blogReducer"

const CommentBox = ({ blog }) => {
    const [comment, setComment] = useState("")
    const dispatch = useDispatch()

    const handleComment = async (event) => {
        event.preventDefault()
        console.log(blog.id, comment)
        dispatch(addComment(comment, blog.id))
        setComment("")
    }

    return (
        <div>
            <form onSubmit={handleComment}>

                <div>
                    add comment <input id="comment-input" onChange={({ target }) => { setComment(target.value) }} value={comment} />
                </div>
                <div>
                    <button id="submit-button" type="submit">add</button>
                </div>
            </form>
            {blog.comments.map(comment => (
                <div key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>{comment.user.name}</p>
                </div>
            ))}
        </div>
    )
}

export default CommentBox
