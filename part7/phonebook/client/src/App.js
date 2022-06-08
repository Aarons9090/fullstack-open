import { useState, useEffect } from "react"
import Notification from "./components/Notification"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "./reducers/blogReducer"
import BlogList from "./components/BlogList"
import { logInUser, removeUser, setUser } from "./reducers/userReducer"
import UsersPage from "./components/UsersPage"
import { Routes, Route } from "react-router-dom"

function App() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    // login user
    useEffect(() => {
        const loggedUser = window.localStorage.getItem("loggedInUser")
        console.log(window.localStorage)
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            dispatch(setUser(user))
        }
    }, [])

    const user = useSelector(state => state.user)

    const handleLogin = async event => {
        event.preventDefault()

        dispatch(logInUser({ username, password }))
        setUsername("")
        setPassword("")
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
        dispatch(removeUser())
        window.localStorage.removeItem("loggedInUser")
    }
    return (
        <div>
            {" "}
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="background">
                            <Notification />
                            {user === null ? (
                                loginForm()
                            ) : (
                                <BlogList
                                    handleLogOut={handleLogOut}
                                    user={user}
                                />
                            )}
                        </div>
                    }
                />
                <Route path="/users" element={<UsersPage />} />
            </Routes>
        </div>
    )
}

export default App
