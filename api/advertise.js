import axios from '@/utils/axios'

export const queryAdvertiseList = (data) => {
  return axios.post('/advertise/query', data)
}

export const createAdvertise = (data) => {
  return axios.post('/advertise', data)
}

export const updateAdvertise = (data) => {
  return axios.put(`/advertise/${data._id}`, data)
}

export const deleteAdvertise = (id) => {
  return axios.delete(`/advertise/${id}`)
}

export const getAdvertise = (id) => {
  return axios.get(`/advertise/${id}`)
}