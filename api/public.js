// 投放示例接口
import axios from '@/utils/axios'

const appId = '5e93ed1dd1157c0e201b70fd'
const secret = '12345678'
const viewer = {
  environment: ['web', 'desktop'],
}

export const requestAd = (data) => {
  return axios.post('/public/serverlessAds', {
    appId,
    secret,
    viewer,
    ...data
  })
}

// 事件触发类
export class AdTrigger {
  constructor(nextUrl, {
    triggerCallback
  } = {}) {
    this.next = nextUrl // 触发器地址
    this.events = ['load']
    this.loaded = false // 已加载完成
    this.focus = false // 正处于焦点
    this.view = false // 已观看
    this.triggerCallback = triggerCallback || (() => {}) //触发事件的回调
  }

  triggerEvent(event) {
    let top = this.events.length - 1
    if (this.events[top] === event) return
    if (event === 'loaded' && this.loaded) return
    if (event === 'focus' && this.focus) return
    if (event === 'blur' && !this.focus) return
    if (event === 'view' && this.view) return
    if (this.next) {
      this.events.push(event)
      this.triggerCallback(this.events.slice())
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
      }, reject => {
        this.events.splice(top + 1, 1)
      })
    }
  }
}

// 触发事件接口
export const triggerEventApi = (next, event) => {
  return axios.get(`${next}/${event}`)
}