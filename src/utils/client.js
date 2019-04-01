import axios from 'axios'

const client = axios.create({
  baseURL: process.env.BASE_URL + 'api',
  timeout: 10000,
  headers: {}
})

export default client
