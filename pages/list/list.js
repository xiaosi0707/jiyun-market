// pages/list/list.js
import { NewsModel } from '../../models/news.js'
import { TongzhiModel } from "../../models/tongzhi.js"
import { YouhuiModel } from "../../models/youhui.js"
import {ZhengceModel} from "../../models/zhengce.js"
import { TousuModel } from "../../models/tousu.js"


let news = new NewsModel()
let tongzhi = new TongzhiModel()
let youhui = new YouhuiModel()
let zhengce = new ZhengceModel()
let tousu = new TousuModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    title:''
  },
  tapdetail:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
    var bt = e.currentTarget.dataset.bt
    wx.navigateTo({
      url: '../detail/detail?id='+id+'&bt='+bt,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title
    })
    var that = this
    if(options.title==='集团新闻'){
      // 集团新闻
      news.getNewsList((res) => {
        console.log(res.list.data)
        let a = res.list.data
        console.log(a)
        wx.request({
          url: res.list.next_page_url,
          success(res) {
            console.log(res.data.list.data)
            let b = res.data.list.data
            console.log(b)
            let c = a.concat(b)
            console.log(c)
            that.setData({
              data: c
            })
          }
        })
      })
    }else if(options.title==="集团通知"){
      // 集团通知
      tongzhi.getTongzhiList((res) => {
        console.log(res.list.list.data)
        that.setData({
          data: res.list.list.data
        })
      })
    }else if(options.title==="优惠活动"){
      // 优惠活动
      youhui.getYouhuiList((res) => {
        console.log(res.list.list.data)
        that.setData({
          data:res.list.list.data
        })

      })
    }else if(options.title==="政策制度"){
        zhengce.getZhengceList((res) => {
          console.log(res)
          let a = res.list.data
          wx.request({
            url: res.list.next_page_url,
            success (res) {
              console.log(res)
              let b = res.data.list.data
              let c = a.concat(b)
              that.setData({
                data:c
              })
            }
          })
        })
    }else if(options.title==="投诉建议"){
      console.log(options)
      //投诉建议
      tousu.getTousuData((res) => {
        console.log(res.list.data)
        that.setData({
          data: res.list.data
        })
      })
    }
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