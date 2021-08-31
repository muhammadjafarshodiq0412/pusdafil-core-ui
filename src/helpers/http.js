import axios from 'axios'

export const http = axios.create({
    baseURL: process.env.REACT_APP_SERVICE_API_URL,
    timeout : 20000
})