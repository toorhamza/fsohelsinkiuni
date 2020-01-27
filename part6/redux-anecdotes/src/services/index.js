import axios from 'axios'

const getAll = async () => {
    const response = await axios.get("http://localhost:3001/anecdotes")
    return response.data
} 

const createNew = async content => {
    const obj = {content, votes: 0}
    const response = await axios.post("http://localhost:3001/anecdotes", obj)
    return response.data
  }

const updateVote = async (id, vote, content) => {
    const obj = {content: content, votes: vote}
    const response = axios.put(`http://localhost:3001/anecdotes/${id}`, obj)
    return response
}

export default {
    getAll,
    createNew,
    updateVote
}