import { useDispatch, useSelector } from "react-redux"
import { useMatch, useNavigate } from "react-router-dom"
import { likeBlog, removeBlog } from "../reducers/blogReducer"

const BlogPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const blogs = useSelector(state => state.blogs)

    const match = useMatch("/blogs/:id")
    const blog = match ? blogs.find(blog => blog.id === match.params.id) : null
    console.log(blog)

    const handleLikeButton = async event => {
        event.preventDefault()
        dispatch(likeBlog(blog.id))
    }

    const handleRemoveButton = async event => {
        if (window.confirm(`Remove blog ${blog.title}?`)) {
            event.preventDefault()
            dispatch(removeBlog(blog.id))
            navigate("/")
        }
    }

    return (
        <div>
            {blog ? (
                <div>
                    <h1>{blog.title}</h1>
                    <h2>author: {blog.author}</h2>
                    <p>{blog.url}</p>
                    <p>likes {blog.likes}</p>
                    <p>added by {blog.user.name}</p>
                    <button id="like-button" onClick={handleLikeButton}>
                        like
                    </button>
                    <button id="remove-button" onClick={handleRemoveButton}>
                        remove
                    </button>
                </div>
            ) : null}
        </div>
    )
}

export default BlogPage
