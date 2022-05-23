import { useState, useEffect } from 'react'
import blogService from "./services/blogs"
import Blog from "./components/Blog"
import loginService from "./services/login"

const Message = ( {message} ) => {
  console.log(message)
  if(message === null){
    return null
  }
  return <div className={message.class}>{message.text}</div>
}

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  useEffect(() => {
    blogService.getAll().then(data => {
      setBlogs(data)
    })
  }, [])

  // login user
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedInUser")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      
      console.log(user)
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      window.localStorage.setItem("loggedInUser", JSON.stringify(user))
      setMessage({
        text: "Logged in",
        class: "success"
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (e) {
      setMessage({
        text: "wrong username or password",
        class: "error"
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log("wrong credentials")
      console.log(e)
    }
  }

  const loginForm = () => {
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

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title, author, url
      }

      const res = await blogService.create(newBlog)
      setBlogs(blogs.concat(res))
      console.log(res)
      setTitle("")
      setAuthor("")
      setUrl("")

      setMessage({
        text: `New blog ${title} created`,
        class: "success"
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (e) {
      setMessage({
        text: e.response.data.error,
        class: "error"
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      console.log(e)
    }
  }

  const blogForm = () => {

    return (
      <div>
        <form onSubmit={handleBlogSubmit}>
          <div>
            title: <input onChange={({ target }) => { setTitle(target.value) }} value={title} />
          </div>
          <div>
            author: <input onChange={({ target }) => { setAuthor(target.value) }} value={author} />
          </div>
          <div>
            url: <input onChange={({ target }) => { setUrl(target.value) }} value={url} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
  }

  const blogPosts = () => {
    return (
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

    <div>
      <Message message={message} />
      {user === null ?
        loginForm() :
        <div>
          <button onClick={handleLogOut}>Log out</button>
          <p>Logged in as {user.name}</p>
          {blogForm()}
          {blogPosts()}
        </div>
      }
    </div>


  )
}

export default App
