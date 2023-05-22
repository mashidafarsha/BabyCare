import axios from 'axios';
import { adminBaseUrl } from '../constants/constants';


const adminAxiosInstance=(tokenName)=>{
 
  const instance = axios.create({
    baseURL: adminBaseUrl,
    headers: {
      'Content-Type': 'application/json'
    }

   
  });
  instance.interceptors.request.use((request) => {
    const token = localStorage.getItem(tokenName)
    request.headers.Authorization = `Bearer ${token}`
    return request
})
return instance
}


  export default adminAxiosInstance
  