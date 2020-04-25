// 投放示例接口
import axios from '@/utils/axios'

const appId = '5e93ed1dd1157c0e201b70fd'
const secret = '12345678'
const viewer = {
  environment: ['web', 'desktop'],
}

export const requestAd = () => {
  return axios.post('/public/serverlessAds', {
    appId,
    secret,
    viewer
  })
}

// 事件触发类
export class AdTrigger {
  constructor(nextUrl) {
    this.next = nextUrl
    this.current = ''
    this.loaded = false
    this.focus = false
    this.view = false
  }

  triggerEvent(event) {
    if (this.current === event) return
    else this.current = event
    if (event === 'loaded' && this.loaded) return
    if (event === 'focus' && this.focus) return
    if (event === 'blur' && !this.focus) return
    if (event === 'view' && this.view) return
    if (this.next) {
      triggerEventApi(this.next, event).then(res => {
        switch (event) {
          case "loaded":
            this.loaded = true
            break;
          case "focus":
            this.focus = true
            break;
          case "blur":
            this.focus = false
            break;
          case "view":
            this.view = true
            break;
          default:
            ;
        }
      }).finally(() => {
        this.current = ''
      })
    }
  }
}

// 触发事件接口
export const triggerEventApi = (next, event) => {
  return axios.get(`${next}/${event}`)
}