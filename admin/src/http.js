import Vue from "vue"
import router from "./router"
import axios from "axios"

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = `Bearer ${localStorage.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

http.interceptors.response.use(res => {
  return res
}, err => {
  const errorMessage = err.response.data.message
  const errorStatus = err.response.status
  if (errorMessage) {
    Vue.prototype.$message({
      type: 'error',
      message: errorMessage
    })
  }
  if(errorStatus === 401){
    router.push('/login')
  }
  return Promise.reject(err)
})

export default http