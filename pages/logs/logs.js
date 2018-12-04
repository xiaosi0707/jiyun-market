//logs.js
import {HTTP} from '../../utils/http.js'
let http=new HTTP()

Page({
  data: {
    user:'',
    tel: '',
    pass:''
  },
  name:function(e){
    this.setData({
      user:e.detail.value
    })
  },
  tel:function(e){
    this.setData({
      tel: e.detail.value
    })
    // console.log(this.data.tel)
  },
  pass:function(e){
    this.setData({
      pass: e.detail.value
    })
    // console.log(this.data.pass)  
  },
  login:function(){
    let that = this
    wx.setStorageSync("user",that.data.user)
    if (that.data.user || that.data.tel || that.data.pass){
      http.request({
        url: 'api/login',
        method: "POST",
        data: {
          "username": that.data.user,  //陈子安
          "tel": that.data.tel,        //15010585137
          "password": that.data.pass  //admin
          // "username": "陈子安",  //陈子安
          // "tel": "15010585137",        //15010585137
          // "password": "admin"   //admin


        },
        success: (res) => {
          console.log(res)
          if(res.status===200){
            wx.showToast({
              title: '成功',
              success:function(){
                wx.navigateTo({
                  url: '../index/index',
                })
              }
            })
          }else{
            wx.showModal({
              title: '错误提示',
              content: res.message,
            })
          }
        }
      })
    }else{
      wx.showModal({
        title: '错误提示',
        content: "请输入信息",
      })
    }
  },
  onLoad: function () {
   }
})
