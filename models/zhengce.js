import {HTTP} from "../utils/http.js"

class ZhengceModel extends HTTP{
  getZhengceList(sCallBack) {
    this.request({
      url: 'zhengceapi',
      success: (res) => {
        sCallBack(res)
      }
    })
  }
}

export {ZhengceModel}