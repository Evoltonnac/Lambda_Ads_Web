import axios from '@/utils/axios'

const totalTemplate = () => {
  let data = []
  for (let i = 1; i <= 12; i++) {
    data.push({
      name: i + '月',
      total: 0
    })
  }
  return data
}

export const queryAdvertiseTotal = (data) => {
  return axios.post('/statistics/advertise/requests', data).then((response) => {
    if (response.success) {
      const formatData = totalTemplate()
      for (let {
          _id,
          total
        } of response.data) {
        formatData[_id - 1].total = total
      }
      response.data = formatData
      return Promise.resolve(response);
    }
  })
}

export const queryAdvertiseEvents = (data) => {
  return axios.post('/statistics/advertise/events/monthly', data)
}

export const queryAppTotal = (data) => {
  return axios.post('/statistics/app/requests', data).then((response) => {
    if (response.success) {
      const formatData = totalTemplate()
      for (let {
          _id,
          total
        } of response.data) {
        formatData[_id - 1].total = total
      }
      response.data = formatData
      return Promise.resolve(response);
    }
  })
}

export const queryAppEvents = (data) => {
  return axios.post('/statistics/app/events/monthly', data)
}