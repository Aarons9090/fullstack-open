import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const UsersPage = () => {
    const users = useSelector(state => state.allUsers)
    return (
        <div>
            {users ? (
                <div>
                    <h2>Users</h2>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>Blogs created</td>
                                </tr>
                                {users
                                    .slice()
                                    .sort(
                                        (a, b) =>
                                            b.blogs.length - a.blogs.length
                                    )
                                    .map(user => (
                                        <tr key={user.id}>
                                            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                            <td>{user.blogs.length}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default UsersPage
