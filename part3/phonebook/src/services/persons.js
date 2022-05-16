import axios from "axios"
const URL = "/api/persons"

const getAll = () => {
    const request = axios.get(URL)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(URL, newObject)
    return request.then(response => response.data)
}

const removePerson = id =>{
    const request = axios.delete(`${URL}/${id}`)
    return request.then(response => response.data)
}

const updatePerson = (id, newObject) =>{
    const request = axios.put(`${URL}/${id}`, newObject)
    return request.then(response => response.data)
}

// eslint-disable-next-line
export default { create, getAll, removePerson, updatePerson}