import axios from 'axios'

const axiosClient = axios.create({
    baseURL: `http://localhost:8000/api`,
})

axiosClient.interceptors.request.use((config)=> {
    const token = '123'; //TODO
    config.headers.Authorization = `Bearer ${token}`
    return config

});

axiosClient.interceptors.response.use(response => {
    return response;

}, error => {
    if(error.response && error.response.status === 401) {
        router.navigate('/login')
        return error;

    }
    throw error;
})

export default axiosClient;