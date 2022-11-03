import axios from 'axios'

// set db url into variable
const baseUrl = 'http://localhost:3001/persons'

// gets all data in db
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// creates a new object in db
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

// remove object from db
const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(() => '')
}

// update phone # from db
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }