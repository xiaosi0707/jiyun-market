// pages/baoming/baoming.js

import {HTTP} from '../../utils/http.js'
let http = new HTTP()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    sex:'', //性别
    sexmum:'',
    teach:'', //招生老师
    xueli:'',  //学历
    xuelinum:'',
    date: '',  //日期
    tel:'',   //手机号
    mess:'',  
    name:'',  //姓名
    card:'',  //身份证号

  },
  //注册
  zhuce: function () {
    if (this.data.name && this.data.sex && this.data.tel && this.data.card && this.data.xueli && this.data.teach && this.data.date){
      // console.log("studentadd")
      http.request({
        url:'studentadd',
        data:{
          "username":this.data.name,
          "card":this.data.card,
          "education":this.data.xuelinum,
          "tel":this.data.tel,
          "sex":this.data.sexmum,
          "date":this.data.date,
          "zsls":this.data.teach
        },
        success:(res=>{
          // console.log(res)
         if(res.status==100){
            wx.showToast({
              title: '报名成功',
              icon:'success',
              duration:100,
              success:function(res){
                console.log(res)
                wx.navigateTo({
                  url: '../studenglist/studenglist',
                })
              }
            })
         }else{
           wx.showModal({
             title: '失败',
             content: '请重新输入信息，并注册报名',
           })
         }
        })
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请输入信息',
      })
    }
  },
  //身份证号
  card:function(e){
    if (e.detail.value) {
      this.setData({
        card: e.detail.value
      })
    } 
    // else {
    //   this.setData({
    //     mess: "不能为空"
    //   })
    // }
  },
  //姓名
  name:function(e){
    if (e.detail.value) {
      this.setData({
        name: e.detail.value
      })
    } 
    // else {
    //   this.setData({
    //     mess: "不能为空"
    //   })
    // }
  },
  //招生老师
  teach:function(e){
    if(e.detail.value){
      this.setData({
        teach:e.detail.value
      })
    }
    // else{
    //   this.setData({
    //     mess:"不能为空"
    //   })
    // }
  },
  //手机号
  tel:function(e){
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
    if(e.detail.value==''){
      this.setData({
        mess:'不能为空'
      })
    }
    else if (!myreg.test(e.detail.value)) {
      
      console.log("手机号码有误，请重填");
      this.setData({
        mess:'手机号码有误，请重填'
      })
     } else{
      this.setData({
        tel: e.detail.value,
        mess: "手机号正确"
      })
      console.log(this.data.tel)
    }
   },
  //性别选择
  sex:function(e){
    let that = this
    console.log(e)
    wx.showActionSheet({
      itemList: ['男','女'],
      success:function(res){
        console.log(res)
        if(res.tapIndex==0){
          e.target.id="男"
          that.setData({
            sex:e.target.id,
            sexmum:1
          })
        }else{
          e.target.id="女"
          that.setData({
            sex:e.target.id,
            sexmum: 2
          })
        }
      }
    })
  },
  //学历
  xueli:function(e){
    let that = this
    console.log(e)
    wx.showActionSheet({
      itemList: ['小学',"初中","高中","大学","其它"],
      success:function(res){
        console.log(res)
        if(res.tapIndex==0){
          e.target.id='小学'
          that.setData({
            xueli:e.target.id,
            xuelinum:1
          })
          console.log(that.data.xuelinum)
        }else if(res.tapIndex==1){
          e.target.id="初中"
          that.setData({
            xueli: e.target.id,
            xuelinum: 2
          })
          console.log(that.data.xuelinum)
        }else if(res.tapIndex==2){
          e.target.id='高中'
          that.setData({
            xueli: e.target.id,
            xuelinum: 3
          })
          console.log(that.data.xuelinum)
        }else if(res.tapIndex==3){
          e.target.id='大学'
          that.setData({
            xueli: e.target.id,
            xuelinum: 4
          })
          console.log(that.data.xuelinum)
        }else{
          e.target.id='其它'
          that.setData({
            xueli: e.target.id,
            xuelinum: 5
          })
          console.log(that.data.xuelinum)
        }
      }
    })
  },
  //日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    console.log(this.data.date)
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