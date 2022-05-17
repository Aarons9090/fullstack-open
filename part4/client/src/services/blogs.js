import axios from "axios"
const URL = "/api/blogs"

const getAll = () => {
    const request = axios.get(URL)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(URL, newObject)
    return request.then(response => response.data)
}

const removeBlog = id =>{
    const request = axios.delete(`${URL}/${id}`)
    return request.then(response => response.data)
}

const updateBlog = (id, newObject) =>{
    const request = axios.put(`${URL}/${id}`, newObject)
    return request.then(response => response.data)
}

// eslint-disable-next-line
export default { create, getAll, removeBlog, updateBlog}