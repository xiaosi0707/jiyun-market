// pages/jiuyesearch/jiuyesearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val:'',
    searchdata:[]
  },
 getval:function(event){
     this.setData({
       val: event.detail.value
     })
     console.log(this.data.val)
 },
  search:function(e){
    console.log(e)
    var that = this
    console.log(that.data.val)
    if(that.data.val){
      wx.request({
        url: 'http://3w.houbowang.com/json/student.php?uu=' + that.data.val,
        method: 'get',
        success(res) {
          console.log(res)
          that.setData({
            searchdata: res.data
          })
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请输入学生姓名',
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