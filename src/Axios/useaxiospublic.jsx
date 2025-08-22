import axios from 'axios';

const axiosPublic = axios.create({
    // baseURL: "https://micro-tasking-server.vercel.app/",
    baseURL: "https://micro-tasking-server.vercel.app/",
    // https://micro-tasking-server.vercel.app/
  });
const useaxiospublic = () => {
    return axiosPublic;
};

export default useaxiospublic;