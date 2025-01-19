import axios from "axios";

export const axiosSecure = axios.create({
    baseURL :'http://localhost:5000'
})
const useAxiosSecure = () => {
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token');
        config.headers.authorization= `Bearer ${token}`
        console.log('request stopeb by intercepter');
        
        return config;
    })
    return axiosSecure;
};

export default useAxiosSecure;