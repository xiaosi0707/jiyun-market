import {HTTP} from '../utils/http.js'

class StudenglistModel extends HTTP{
  getstudengDataList(sCallBack){
    this.request({
      url:"studentapi",
      success:(res)=>{
        sCallBack(res)
      }
    })
  }
}
export {StudenglistModel}