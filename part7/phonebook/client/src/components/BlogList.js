import { useDispatch, useSelector } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import Blog from "./Blog"
import { useRef } from "react"

const BlogList = ({ handleLogOut, user }) => {
    const dispatch = useDispatch()
    const blogFormRef = useRef()
    const blogs = useSelector((state) => state.blogs)

    const addBlog = async (blogObject) => {
        try {
            dispatch(createBlog(blogObject))
            dispatch(
                setNotification(
                    {
                        text: `New blog ${blogObject.title} created`,
                        class: "success",
                    },
                    5
                )
            )

            blogFormRef.current.toggleVisibility()
        } catch (e) {
            dispatch(
                setNotification(
                    {
                        text: e.text,
                        class: "error",
                    },
                    5
                )
            )
            console.log(e)
        }
    }

    const blogForm = () => {
        return (
            <Togglable
                viewlabel="new blog"
                cancellabel="cancel"
                ref={blogFormRef}
            >
                <BlogForm addBlog={addBlog} />
            </Togglable>
        )
    }

    const blogPosts = () => {
        return blogs ? (
            <div>
                {blogs
                    .slice()
                    .sort((a, b) => {
                        return b.likes - a.likes
                    })
                    .map((blog) => (
                        <Blog key={blog.id} blogs={blogs} post={blog} />
                    ))}
            </div>
        ) : null
    }

    return (
        <div>
            <button onClick={handleLogOut}>Log out</button>
            <p>Logged in as {user.name}</p>
            {blogForm()}
            {blogPosts()}
        </div>
    )
}

export default BlogList
