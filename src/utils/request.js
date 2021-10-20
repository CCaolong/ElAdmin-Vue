import axios from "axios";
import Element from "element-ui";

let request = axios .create()
//添加相应拦截器
request.interceptors.response.use(response =>{
    console.log(response);
    return response
    },
   error => {
    Element.Message.error('请求失败'+error)
       return Promise.reject(error)
   })
export  default request
