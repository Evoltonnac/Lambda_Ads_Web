import axios from '@/utils/axios'

export const queryAdvertiseMonthlyBill = (data) => {
  return axios.post('/bills/advertise/monthly', data)
}

export const queryAppMonthlyBill = (data) => {
  return axios.post('/bills/app/monthly', data)
}