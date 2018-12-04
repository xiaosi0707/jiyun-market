import {HTTP} from "../utils/http.js"

class YouhuiModel extends HTTP {
  getYouhuiList(sCallBack){
    this.request({
      url:'api/select?key= c56d0e9a7ccec67b4ea131655038d604',
      success:(res) => {
        sCallBack(res)
      }
    })
  }
}

export { YouhuiModel }