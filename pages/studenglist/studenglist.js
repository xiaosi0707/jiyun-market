// pages/studenglist/studenglist.js
import { StudenglistModel} from '../../models/studenglist.js'
let studeng = new StudenglistModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentlist:[],
    loading: true
  },
  onBaoming () { // 跳转到 报名页
    wx.navigateTo({
      url: '/pages/baoming/baoming',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
    studeng.getstudengDataList((res) => {
      console.log(res)//有next_page_url
      this.setData({
        studentlist:res.list.data,
        loading: false
      })
      console.log(this.data.studentlist)
    })
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