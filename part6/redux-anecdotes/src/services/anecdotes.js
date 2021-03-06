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

const update = async (id, newObj) => {
    const response = await axios.put(`${url}/${id}`, newObj)
    return response.data
}

export default { getAll, addNew, update }