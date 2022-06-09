import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { removeUser } from "../reducers/userReducer"

const NavBar = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleLogOut = () => {
        dispatch(removeUser())
        window.localStorage.removeItem("loggedInUser")
    }
    return user ? (
        <div className="nav-bar">
            <Link className="nav-bar-child" to={"/"}>
                Blogs
            </Link>
            <Link className="nav-bar-child" to={"/users"}>
                Users
            </Link>
            <p className="nav-bar-child">Logged in as {user.name}</p>
            <button className="nav-bar-logout" onClick={handleLogOut}>
                Log out
            </button>
        </div>
    ) : null
}

export default NavBar
