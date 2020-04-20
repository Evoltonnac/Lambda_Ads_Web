import axios from '@/utils/axios'

export const queryChargeList = (data) => {
  return axios.post('/charges/query', data)
}

export const createCharge = (data) => {
  return axios.post('/charges', data)
}

export const updateCharge = (data) => {
  return axios.put(`/charges/${data._id}`, data)
}

export const deleteCharge = (id) => {
  return axios.delete(`/charges/${id}`)
}