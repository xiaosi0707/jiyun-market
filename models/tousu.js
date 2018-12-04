import {HTTP} from '../utils/http.js'

class TousuModel extends HTTP{
  getTousuData(sCallBack){
    this.request({
      url:'wenzhangapi',
      success :(res) =>{
        sCallBack(res)
      }
    })
  }
}
export {TousuModel} 