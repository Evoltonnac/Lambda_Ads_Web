import axios from 'axios'
import {
  message,
  notification
} from 'antd'
import router from 'next/router'

const instance = axios.create({
  // baseURL: 'https://h39wdt6zjf.execute-api.ap-southeast-1.amazonaws.com/dev',
  baseURL: 'http://localhost:13000',
  timeout: 10000,
})

// 响应阶段拦截器
instance.interceptors.response.use((response) => {
  const {
    data
  } = response

  if (data) {
    // 错误消息全局提示
    if (data.error) {
      message.error(data.error)
    } else if (Array.isArray(data.errors)) {
      notification.error({
        style: {
          whiteSpace: 'pre'
        },
        message: '验证失败',
        description: data.errors.reduce((res, cur, index) => {
          if (res) return `${res}\n${index+1}.${cur.msg}`
          else return `${index+1}.${cur.msg}`
        }, '')
      })
    }
  }
  return response.data
}, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        router.replace({
          pathname: '/'
        })
    }
  }
  return Promise.reject(error)
})

// 请求阶段拦截器
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  config.headers = {
    'Authorization': token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export default instance