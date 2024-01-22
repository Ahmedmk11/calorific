import axios from 'axios'

export const baseURL = 'http://[::1]:8080/'

const axiosApi = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})
export const baseURLclient = 'http://localhost:5176/'
export default axiosApi
