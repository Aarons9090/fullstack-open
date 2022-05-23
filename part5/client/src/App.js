import { useState, useEffect } from 'react'
import blogService from "./services/blogs"

const BlogPost = ({post}) => {
  return(
    <div>
      <p>{post.title} {post.author} {post.url} {post.likes}</p>
    </div>
  )
}

const AddBlogForm = () => {
  return (
    <div>
      <form onSubmit={() => {}}>
        <div>
          title: <input onChange={() => {}} value={""}/>
        </div>
        <div>
          author: <input onChange={() => {}} value={""}/>
        </div>
        <div>
          url: <input onChange={() => {}} value={""}/>
        </div>
        <div>
        <button type="submit">add</button>
      </div>
      </form>
    </div>
  )
}

function App() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(data => {
      setBlogs(data)
    })
  }, [])

  return (
    
    <div>
      {/* <AddBlogForm /> */}
      
      {blogs.map(blog => <BlogPost key={blog._id} post={blog}/>)}
    </div>
  );
}

export default App;
