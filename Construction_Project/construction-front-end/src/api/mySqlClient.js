import Axios from 'axios';

//const BASE_URL = 'http://127.0.0.1:3306';
const BASE_URL = 'https://server-tasks-rf89.vercel.app';

export const axios = Axios.create({ 
    baseURL: BASE_URL,
    withCredentials: true, // Include credentials in the request (important for CORS)
    headers: {
        'Content-Type': 'application/json',
    }
});
