import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
    return (
        <div className="blog">
            <p className="blog-title"><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></p>
        </div>
    )
}

export default Blog
