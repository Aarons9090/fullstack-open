import axios from "axios"

const url = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await axios.get(url)
    return response.data
}

const addNew = async (content) => {
    const obj = {content, votes: 0}
    const response = await axios.post(url, obj)
    return response.data
}

export default { getAll, addNew }