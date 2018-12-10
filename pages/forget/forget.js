  // pages/forget/forget.js
import { Request } from "../../models/request.js";
let Api = new Request();
Page({
  data:{
    disabled: false, // 按钮禁用
    card:"", // 证件
    worn:"", // 旧密码
    news:"", // 新密码
    comfirm:""  // 确认密码
  },
  oncard(ev){ //证件号
    this.setData({
      card: ev.detail.value
    })
  },
  wornPass(ev){ //旧密码
    this.setData({
      worn: ev.detail.value
    })
  },
  newPass(ev){  //新密码
    this.setData({
      news:ev.detail.value
    })
  },
  confirm(ev){  //确认密码
    this.setData({
      comfirm:ev.detail.value
    })
  },
  commit(){ //提交
    let { comfirm, news, worn, card } = this.data;
    var _this = this
    var userCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; // 身份证验证

    if (!card || !worn || !news || !comfirm ) {
      wx.showToast({
        title: '请完善内容',
        icon: 'none',
        duration: 2000
      });
    } else if (!userCard.test(card)) {
      wx.showModal({
        title: "提示",
        content: "请输入正确的身份证"
      })
    } else if (news != comfirm){
      wx.showModal({
        title:"提示",
        content:"新密码输入不一致"
      })
      return false;
    } else {
      _this.setData({
        disabled: true
      })
      wx.showToast({
        title: '提交中。。。',
        icon: 'loading'
      })
    //获取openid
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: "wxc7b334a8a29255af",
              secret: "bf6c885fac99f99c87e97c5810dd326d",
              js_code: res.code,
              grant_type: "authorization_code"
            },
            success(res) {
              let openid = res.data.openid;
              console.log(res)      
              Api.setPass(card, worn, news, openid).then(res=>{
                console.log(res);
               setTimeout (() => {
                 _this.setData({
                   disabled: false
                 })
                 wx.hideToast()
                 wx.showModal({
                   title: "提示",
                   content: res.data.msg
                 })
               }, 2000)
              })
            }
          })
        }
      }
    })
  }
  }
})