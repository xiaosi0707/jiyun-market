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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})