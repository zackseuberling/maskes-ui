import axios from 'axios';

const instance = axios.create(
    { baseURL: 'https://skcema.org' }
)

export default instance;