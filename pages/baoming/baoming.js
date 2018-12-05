// pages/baoming/baoming.js

import {HTTP} from '../../utils/http.js'
let http = new HTTP()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userMsg: 0, // 姓名验证提示
    userYes: 0, // 姓名验证正确
    telMsg: 0, // 手机号错误提示
    telYes: 0,  // 手机号正确提示
    cardMsg: 0, // 身份证错误提示
    cardYes: 0,  // 身份证正确提示
    sexs: [{ value: '男', id: 1, checked: 0 }, { value: '女', id: 2, checked: 0 }],
    sex:'', //性别
    teacher:'', //招生老师
    xueli:'',  //学历
    xuelinum:'',
    date: '',  //日期
    tel:'',   //手机号
    name:'',  //姓名
    card:'',  //身份证号

  },
  userFocus(e) { // 获取焦点时姓名的提示
    let { value } = e.detail
    let re = /^[\u4e00-\u9fa5]+$/
    if (!value) {
      this.setData({
        userMsg: 1,
        userYes: 0,
      })
    } else if (!re.test(value) || value.length < 2) {
      this.setData({
        userMsg: 1,
        userYes: 0,
      })
    } else if (re.test(value) && value.length > 1) {
      this.setData({
        userMsg: 0,
        userYes: 1
      })
    }

  },
  onname(e) { // 获取姓名
    let re = /^[\u4e00-\u9fa5]+$/
    let user = e.detail.value
    this.setData({
      msg: ''
    })
    if (!re.test(user)) {
      this.setData({
        userMsg: 1,
        userYes: 0
      })
    } else if (user.length < 2) {
      this.setData({
        userMsg: 1,
        userYes: 0
      })
    } else if (re.test(user) && user.length > 1) {
      this.setData({
        userMsg: 0,
        userYes: 1,
        name: user,
      })
    }
    this.setData({
      name: user,
    })
  },
  radioChange (e) { // 获取性别
    let { value } = e.detail
    console.log(value)
    this.setData({
      sex: value
    })

  },
  //报名提交
  zhuce: function () {
    let user = this.data.name
    let re = /^[\u4e00-\u9fa5]+$/ // 中文名字验证
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/; // 手机号验证
    var userCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; // 身份证验证
    if (!user) {
    wx.showModal({
      title: '提示',
      content: '请完善信息',
    })
  } else if (!re.test(user) ) {
      wx.showModal({
        title: '提示',
        content: '请输入中文姓名',
      })
    } else if (!this.data.sex || !this.data.xueli || !this.data.card) {
      wx.showModal({
        title: '提示',
        content: '请继续完善信息',
      })
    } else if (!myreg.test(this.data.tel)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确手机号',
      })
    } else if (!userCard.test(this.data.card)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确身份证号',
      })
    } else if (!this.data.teacher) {
      wx.showModal({
        title: '提示',
        content: '请输入你的招生老师',
      })
    } else if (this.data.name && this.data.sex && myreg.test(this.data.tel) && userCard.test(this.data.card) && this.data.xueli && this.data.teacher){
      // console.log("studentadd")
      http.request({
        url:'studentadd',
        data:{
          "username": user,
          "card":this.data.card,
          "education":this.data.xuelinum,
          "tel":this.data.tel,
          "sex":this.data.sex,
          "date":this.data.date,
          "zsls":this.data.teacher
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
             content: '请重新输入信息，并提交报名',
           })
         }
        })
      })
    }
  },

  oncardfocus (e) { // 身份证获取焦点验证
    let { value } = e.detail
    var userCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; // 身份证验证
    if (!value) {
      this.setData({
        cardMsg: 1, 
        cardYes:0
      })
    } else if (!userCard.test(value)) {
      this.setData({
        cardMsg: 1,
        cardYes: 0
      })
    } else if (userCard.test(value)) {
      this.setData({
        cardMsg: 0,
        cardYes: 1
      })
    }
  },
  //身份证号
  card:function(e){
    var userCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; // 身份证验证
    let { value } = e.detail
    if (!value) {
      this.setData({
        cardMsg: 1,
        cardYes: 0
      })
    } else if (!userCard.test(value)) {
      this.setData({
        cardMsg: 1,
        cardYes: 0,
        card: value
      })
    } else if (userCard.test(value)) {
      this.setData({
        cardMsg: 0,
        cardYes: 1,
        card: value
      })
    }
    
  },
  
  //招生老师
  teach:function(e){
    let { value } = e.detail
    console.log(value)
      this.setData({
        teacher: value
      })
  },

  onTelfocus () { // 手机号获取焦点提示
    let tle = this.data.tel
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
    if (!tle) {
      this.setData({
        telMsg: 1,
        telYes: 0
      })
    } else if (!myreg.test(tle)) {
      this.setData({
        telMsg: 1,
        telYes: 0
      })
    } else if (myreg.test(tle)) {
      this.setData({
        telMsg: 0,
        telYes: 1
      })
    }
  },
  //手机号
  tel:function(e){
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
    if(e.detail.value==''){
      this.setData({
        telMsg: 1,
        telYes: 0
      })
    } else if (!myreg.test(e.detail.value)) {
      
      console.log("手机号码有误，请重填");
      this.setData({
        tel: e.detail.value,
        telMsg: 1,
        telYes: 0
      })
    } else if (myreg.test(e.detail.value)){
      this.setData({
        tel: e.detail.value,
        telMsg: 0,
        telYes: 1
      })
      console.log(this.data.tel)
    }
   },
  
  //学历
  xueli:function(e){
    let that = this
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
  
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.getStorage({ // 获取的登录人的姓名
      key: 'user',
      success: function(res) {
        console.log(res)
        _this.setData({
          teacher: res.data
        })
      },
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