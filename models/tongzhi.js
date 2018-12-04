import { HTTP } from '../utils/http.js'

class TongzhiModel extends HTTP {
  getTongzhiList(sCallBack) {
    this.request({
      url: 'api/shows?key= c56d0e9a7ccec67b4ea131655038d604',
      success: (res) => {
        sCallBack(res)
      }
    })
  }
}

export { TongzhiModel }