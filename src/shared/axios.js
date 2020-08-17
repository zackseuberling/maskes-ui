import axios from 'axios';

const instance = axios.create(
    { baseURL: 'http://142.93.99.126' }
)

export default instance;