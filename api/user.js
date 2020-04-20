import axios from '@/utils/axios'

axios.interceptors.response.use((response) => {
  const {
    success,
    token
  } = response
  if (success && token) {
    localStorage.setItem('access_token', token)
  }
  return response
}, (error) => {
  return Promise.reject(error)
})

export const login = (data) => {
  return axios.post('/users/login', data)
}

export const register = (data) => {
  return axios.post('/users/register', data)
}