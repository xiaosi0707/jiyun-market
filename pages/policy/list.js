// pages/list/list.js
import { Request } from "../../models/request.js";
let Api = new Request();
import { funClass } from "../../models/class.js";
let Class = new funClass();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    title:'',
    page: 1,
    loading:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title
    })
    Api.system(0).then(res => { //首次加载
      console.log(res);
      Class.loadData(this, res.data.list.data);
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {  //刷新
    Api.system(0).then(res => {
      Class.loadData(this, res.data.list.data);
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    Api.system(this.data.page++).then(res => { //加载数据
      Class.concatData(this, res.data.list.data);
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})