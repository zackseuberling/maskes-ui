import axios from 'axios';

const instance = axios.create(
    { baseURL: 'https://skesma.com' }
)

export default instance;