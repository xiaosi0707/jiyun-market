// pages/studentsearch/studentsearch.js

import { Request } from '../../models/request.js'
let http = new Request()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '', // 姓名
    nameData: [] // 基本信息

  },
  getName (e) { // 获取文本框的内容
    let { value } = e.detail
    this.setData({
      userName: value
    })
  },
  onSearchList () { // 搜索
    let user = this.data.userName
    http.getSearchData(user).then(res=> {
      console.log(res.data)
      
    })
    http.getSearchList(user).then(res => {
      console.log(res.data)

    })
  }
})