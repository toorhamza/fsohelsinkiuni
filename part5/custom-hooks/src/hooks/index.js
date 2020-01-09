import {useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    
    useEffect(() => {
        axios.get(baseUrl).then((response) => setResources(response.data))
    }, [baseUrl])
  
    const create = (resource) => {
      axios.post(baseUrl, resource).then((res) => console.log(res)).catch(error => console.error(error))
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
  }


export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }