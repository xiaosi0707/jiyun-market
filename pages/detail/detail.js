// pages/detail/detail.js
import {HTTP} from '../../utils/http.js'
let { wxParse } = require('../../wxParse/wxParse.js');
let http = new HTTP() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdetail:{},
    cont:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    let {id,bt} = options
    console.log(id)
    console.log(bt)
    //集团新闻
    http.request({
      url:'xinwenshow',
      data: {
        "id": id
      },
      success:(res)=> {
        console.log(res)
        if (bt == res.list.bt) {
          let text = res.list.text
          wxParse('text', 'html', text, this, 5)
          that.setData({
            listdetail: res.list,
            cont:text
          })
        }
      }
    }),
     //政策制度
        http.request({
        url: 'zhengceshow',
          data: {
            "id": id
          },
          success:(res)=> {
            console.log(res)
            if (bt == res.list.bt) {
              let text = res.list.text
              wxParse('text', 'html', text, this, 5)
              that.setData({
                listdetail: res.list
              })
            }
          }
        }),
        //投诉建议
        http.request({
        url: 'wenzhangshow',
          data: {
            "id": id
          },
          success:(res)=> {
            console.log(res)
            if (bt == res.list.bt) {
              that.setData({
                listdetail: res.list
              })
            }
          }
        })
        //集团通知  接口有问题
        // http.request({
        // url: 'api/msg',
        //   data: {
        //     "id": id,
        //     "key":"c56d0e9a7ccec67b4ea131655038d604"
        //   },
        //   success(res) {
        //     console.log(res)
        //     // if (bt == res.data.list.bt) {
        //     //   that.setData({
        //     //     listdetail: res.data.list
        //     //   })
        //     // }
        //   }
        // }),
        //优惠活动  接口有问题
        // wx.request({
        // url: 'jy.haoyunyun.cn/api/msgs',
        //   data: {
        //     "id": id,
        //     "key": "c56d0e9a7ccec67b4ea131655038d604"
        //   },
        //   success(res) {
        //     // console.log(res.data.list)
        //     if (bt == res.data.list.bt) {
        //       that.setData({
        //         listdetail: res.data.list
        //       })
        //     }
        //   }
        // })
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