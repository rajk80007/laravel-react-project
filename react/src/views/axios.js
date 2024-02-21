import axios from 'axios'

const axiosClient = axios.create({
    baseURL: `${VITE_API_BASE_URL}/api`,
})

axiosClient.interceptors.request.use((config)=> {
    const token = '123'; //TODO
    config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`
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