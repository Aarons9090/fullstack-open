import Togglable from "./Togglable"
import blogService from "../services/blogs"

const Blog = ({ post, blogs, setBlogs }) => {
    const handleLikeButton = async (event) => {
        event.preventDefault()
        const newBlog = {
            ...post, likes: post.likes+1,
        }
        console.log(newBlog)

        const res = await blogService.updateBlog(post.id, newBlog)
        setBlogs(blogs.map(blog => blog.id === res.id? {...blog, likes: res.likes}: blog))
    }
    return (
        <div className="blog">
            <p className="blog-title">{post.title}</p>
            <Togglable viewlabel="view" cancellabel="hide">
                <div className="blog-content">
                    <p>{post.author}</p> 
                    <p>{post.url}</p> 
                    <p>likes {post.likes}</p> 
                    <button onClick={handleLikeButton}>like</button>
                </div>
            </Togglable>
        </div>


    )
}

export default Blog