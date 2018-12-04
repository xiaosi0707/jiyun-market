import { HTTP } from '../utils/http.js'

class NewsModel extends HTTP {
  getNewsList(sCallBack) {
    this.request({
      url:'xinwenapi',
      success: (res) => {
      sCallBack(res)
      }
    })
  }
}

export { NewsModel }