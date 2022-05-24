import Togglable from "./Togglable"

const Blog = ({ post }) => {
    return (
        <div className="blog">
            <p className="blog-title">{post.title}</p>
            <Togglable viewlabel="view" cancellabel="hide">
                <div className="blog-content">
                    <p>{post.author}</p> 
                    <p>{post.url}</p> 
                    <p>{post.likes}</p>
                </div>
            </Togglable>
        </div>


    )
}

export default Blog