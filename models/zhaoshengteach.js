import {HTTP} from '../utils/http.js'

class ZhaoshengModel extends HTTP{
  getZhaoshengList(sCallBack){
    this.request({
      url:'api/zsls',
      success:(res) =>{
        sCallBack(res)
      }
    })
  }
}

export {ZhaoshengModel}