import Togglable from "./Togglable"
import { useDispatch } from "react-redux"
import { likeBlog, removeBlog } from "../reducers/blogReducer"

const Blog = ({ post, callOnLike }) => {
    const dispatch = useDispatch()

    const handleLikeButton = async event => {
        event.preventDefault()
        dispatch(likeBlog(post.id))
    }

    const handleRemoveButton = async event => {
        if (window.confirm(`Remove blog ${post.title}?`)) {
            event.preventDefault()
            dispatch(removeBlog(post.id))
        }
    }
    return (
        <div className="blog">
            <p className="blog-title">{post.title}</p>
            <Togglable viewlabel="view" cancellabel="hide">
                <div className="blog-content">
                    <p>{post.author}</p>
                    <p>{post.url}</p>
                    <p>likes {post.likes}</p>
                    <button
                        id="like-button"
                        onClick={callOnLike ? callOnLike : handleLikeButton}
                    >
                        like
                    </button>
                    <button id="remove-button" onClick={handleRemoveButton}>
                        remove
                    </button>
                </div>
            </Togglable>
        </div>
    )
}

export default Blog
