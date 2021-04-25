import axios from 'axios'

let baseURL = ''
baseURL = 'http://localhost:3000'
// baseURL = 'https://meeting-room-api.herokuapp.com'

export const apiHelper = axios.create({
  baseURL
})
