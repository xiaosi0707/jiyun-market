  // pages/forget/forget.js
import { Request } from "../../models/request.js";
let Api = new Request();
Page({
  data:{
    card:"",
    worn:"",
    news:"",
    comfirm:""
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
    let {comfirm,news,worn,card} = this.data;
    if (news != comfirm){
      wx.showModal({
        title:"提示",
        content:"密码输入不一致"
      })
      return false;
    }
    //获取openid
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: "wx4fcef327c336a273",
              secret: "c5f4ec809b3dec093add52acc0a05888",
              js_code: res.code,
              grant_type: "authorization_code"
            },
            success(res) {
              let openid = res.data.openid;
              Api.setPass(card, worn, news, openid).then(res=>{
                console.log(res);
              });
            }
          })
        }
      }
    })
  }
})