import axios from 'axios';

const axiosPublic = axios.create({
    // baseURL: "https://micro-task-server-plum.vercel.app/",
    baseURL: "https://micro-task-server-plum.vercel.app/",
    // https://micro-task-server-plum.vercel.app/
  });
const useaxiospublic = () => {
    return axiosPublic;
};

export default useaxiospublic;