import Axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3306';

export const axios = Axios.create({ 
    baseURL: BASE_URL,
    withCredentials: true, // Include credentials in the request (important for CORS)
    headers: {
        'Content-Type': 'application/json',
    }
});
