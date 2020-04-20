import axios from '@/utils/axios'

export const queryAppList = (data) => {
  return axios.post('/apps/query', data)
}

export const createApp = (data) => {
  return axios.post('/apps', data)
}

export const updateApp = (data) => {
  return axios.put(`/apps/${data._id}`, data)
}

export const deleteApp = (id) => {
  return axios.delete(`/apps/${id}`)
}