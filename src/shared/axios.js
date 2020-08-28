import axios from 'axios';

const baseURL = 'http://localhost:8000'

const instance = axios.create(
    {
        baseURL: baseURL,
        timeout: 5000,
        headers: {
            'Authorization': localStorage.getItem('access') ? "Bearer " + localStorage.getItem('access') : null,
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
    }
)

instance.interceptors.response.use(
    response => response,
    error => {
        const request = error.config;

        const refresh_url = '/auth/jwt/refresh/';
        // Prevent infinite loops
        if (error.response.status === 401 && request.url === refresh_url) {
            localStorage.removeItem('access');
            localStorage.removeItem('expirationDate');
            localStorage.removeItem('is_requester');
            localStorage.removeItem('is_volunteer');
            localStorage.removeItem('name');
            localStorage.removeItem('user_id');
            localStorage.removeItem('refresh');
            window.location.href = '/';
            return Promise.reject(error);
        }

        if (error.response.data.code === "token_not_valid" &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized") {

            const refresh = localStorage.getItem('refresh');

            if (refresh) {
                const tokenParts = JSON.parse(atob(refresh.split('.')[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);

                if (tokenParts.exp > now) {
                    return instance
                        .post('/auth/jwt/refresh/', { refresh: refresh })
                        .then((response) => {
                            localStorage.setItem('access', response.data.access);
                            instance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                            request.headers['Authorization'] = "Bearer " + response.data.access;
                            return instance(request);
                        })
                        .catch(error => {

                        });
                } else {
                    window.location.href = '/';
                };

            } else {
                window.location.href = '/';
            }
        }
        return Promise.reject({ ...error })
    }
);

export default instance;