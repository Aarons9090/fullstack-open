import { useState, useEffect } from 'react'
import blogService from "./services/blogs"
import Blog from "./components/Blog"
import loginService from "./services/login"


const LoginForm = ({ username, setUsername, password, setPassword, user, setUser }) => {

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })
      console.log(user)
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      window.localStorage.setItem("loggedInUser", JSON.stringify(user))
    }catch (exception){
      console.log("wrong credentials")
      console.log(exception)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username: <input
            onChange={({ target }) => { setUsername(target.value) }}
            value={username} />
        </div>
        <div>
          password: <input
            type="password"
            onChange={({ target }) => { setPassword(target.value) }}
            value={password} />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>

    </div>
  )
}

const AddBlogForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = async () => {
    try{
      const newBlog = {
        title, author, url
      }

      const res = await blogService.create(newBlog)
      console.log(res)
    }catch(e){
      console.log(e)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          title: <input onChange={({target}) => {setTitle(target.value)}} value={title} />
        </div>
        <div>
          author: <input onChange={({target}) => {setAuthor(target.value)}} value={author} />
        </div>
        <div>
          url: <input onChange={({target}) => {setUrl(target.value)}} value={url} />
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
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(data => {
      setBlogs(data)
    })
  }, [])

  // login user
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedInUser")
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <LoginForm
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword} 
      user={user}
      setUser={setUser}/>
    )
  }

  const blogPosts = () => {
    return(
      <div>
      {blogs.map(blog => <Blog key={blog.id} post={blog} />)}
    </div>
    )
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem("loggedInUser")
  }

  return (
    
    user === null ? 
      loginForm() :
        <div>
          <button onClick={handleLogOut}>Log out</button>
          <p>Logged in as {user.name}</p>
          <AddBlogForm/>
          {blogPosts()}
        </div>

  )
}

export default App;
