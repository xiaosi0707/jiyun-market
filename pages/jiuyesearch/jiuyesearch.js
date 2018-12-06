// pages/jiuyesearch/jiuyesearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val:'',
    searchdata:[],
    msg: '', // 提示
    color: '' // 提示颜色
  },
 getval:function(event){
     this.setData({
       val: event.detail.value,
       msg: '',
       color: ''
     })
 },
  search:function(e){
    var that = this
    var user = that.data.val
    let reg = /^[\u4e00-\u9fa5]+$/
    user = user.replace(/(^\s+)|(\s+$)/g, "")
    var containSpecial = /[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\.\。\、\/\;\"\L\<\>\?]/g
    if (!user) {
      this.setData({
        msg: '请输入学生姓名',
        color: 'red'
      })
    } else if (!reg.test(user)) {
      this.setData({
        msg: '请输入中文查询，不能有字母、数字或非法字符',
        color: 'red'
      })
    } else if (containSpecial.test(user)) {
      this.setData({
        msg: '检测到有非法字符',
        color: 'red'
      })
    } else if (reg.test(user)) {
      wx.request({
        url: 'http://3w.houbowang.com/json/student.php?uu=' + that.data.val,
        method: 'get',
        success(res) {
          console.log(res)
          if (!res.data.length) {
            that.setData({
              msg: '该学生未查询到',
              color: 'blue',
              searchdata: []
            })
          } else {
            that.setData({
              msg: '',
              color: '',
              searchdata: res.data
            })
          }
        }
      })
    
    }
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