import axios from 'axios'

const axiosApi = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
})
export const baseURL = 'http://localhost:8080/api/'
export const baseURLclient = 'http://localhost:5176/'
export default axiosApi
