import axios from 'axios';
import { doctorBaseUrl } from '../constants/constants';

const doctorAxiosInstance=(tokenName)=>{
 
  const instance = axios.create({
    baseURL: doctorBaseUrl,
  });
  instance.interceptors.request.use((request) => {
    const token = localStorage.getItem(tokenName)
    request.headers.Authorization = `Bearer ${token}`
    return request
})
return instance
}


  export default doctorAxiosInstance
  