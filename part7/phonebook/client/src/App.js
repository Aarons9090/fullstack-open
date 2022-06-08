import { useState, useEffect } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import { useDispatch } from "react-redux"
import { setNotification } from "./reducers/notificationReducer"
import { initializeBlogs } from "./reducers/blogReducer"
import BlogList from "./components/BlogList"

function App() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    })

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
            const user = await loginService.login({ username, password })

            console.log(user)
            blogService.setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")
            window.localStorage.setItem("loggedInUser", JSON.stringify(user))

            dispatch(
                setNotification(
                    {
                        text: "Logged in",
                        class: "success",
                    },
                    5
                )
            )
        } catch (e) {
            dispatch(
                setNotification(
                    {
                        text: "wrong username or password",
                        class: "error",
                    },
                    5
                )
            )
            console.log("wrong credentials")
            console.log(e)
        }
    }

    const loginForm = () => {
        return (
            <div>
                <form onSubmit={handleLogin}>
                    <div>
                        username:{" "}
                        <input
                            id="username"
                            onChange={({ target }) => {
                                setUsername(target.value)
                            }}
                            value={username}
                        />
                    </div>
                    <div>
                        password:{" "}
                        <input
                            id="password"
                            type="password"
                            onChange={({ target }) => {
                                setPassword(target.value)
                            }}
                            value={password}
                        />
                    </div>
                    <div>
                        <button id="login-button" type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    const handleLogOut = () => {
        setUser(null)
        window.localStorage.removeItem("loggedInUser")
    }

    return (
        <div className="background">
            <Notification />
            {user === null ? (
                loginForm()
            ) : (
                <BlogList handleLogOut={handleLogOut} user={user} />
            )}
        </div>
    )
}

export default App
