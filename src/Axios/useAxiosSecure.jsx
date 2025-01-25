import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../Provider/useAuth";

export const axiosSecure = axios.create({
  baseURL: "https://micro-tasking-server.vercel.app/",
});
const useAxiosSecure = () => {
    const {handlelogout}= useAuth();

    const navigate = useNavigate();
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      // console.log("request stopped by interceptor", token);

      config.headers.authorization = `Bearer ${token}`;
      // console.log('request stopeb by intercepter');

      return config;
    }, async (error) =>{
        const status = error.response.status;
        console.log("statsus error in the interceptor" , status);
        if (status===401 || status === 403) {
            await handlelogout();
             navigate('/login')
        }
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
