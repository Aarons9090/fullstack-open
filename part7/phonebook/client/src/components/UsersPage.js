import axios from "axios"
import { useEffect, useState } from "react"

const UsersPage = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3003/api/users")
            setUsers(response.data)
        }
        fetchData()
    }, [])

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
                                    .sort(
                                        (a, b) =>
                                            b.blogs.length - a.blogs.length
                                    )
                                    .map(user => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
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
