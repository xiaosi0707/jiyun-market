import {config} from "../config.js"

class HTTP{
  request(params){
    if(!params.method) {
      params.method = "GET"
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        "content-type": "application/json",
      },
      success: (res) => {
        console.log(res)
        params.success(res.data)
      }
    })
  }
}

export { HTTP }