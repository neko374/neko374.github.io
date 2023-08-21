import axios from 'axios'
const API = axios.create({
    baseUrl: 'http://localhost:2333',
    timeout: 2000
})
export default API
