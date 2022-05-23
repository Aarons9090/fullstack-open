const Blog = ({ post }) => {
    return (
      <div>
        <p>{post.title} {post.author} {post.url} {post.likes}</p>
      </div>
    )
  }

  export default Blog