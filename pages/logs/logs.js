//登录页

Page({
  data: {
    userName: '', // 获取用户姓名值
    userNum: '', // 获取用户手机号 
    userPwd: '', // 获取用户密码
    Border: '', // 姓名获取焦点显示下边框
    Num: '', // 手机号获取焦点显示下边框
    Pwd: '', //  密码获取焦点显示下边框
    logs: '' // 提示
  },
  onfocusName: function (e) { // 姓名框获取焦点
    this.setData({
      logs: '',
      Border: 'transition:all .3s ease-in-out; width: 100%;'
    })
  },
  onblurName: function (e) { // 姓名框失去焦点
    let user = e.detail.value // 获取姓名的值
    this.setData({
      userName: user,
      Border: 'transition:all .3s ease-in-out; width: 0;'
    })
  },
  onfocusNum: function () { // 手机号获取焦点
    this.setData({
      logs: '',
      Num: 'transition:all .3s ease-in-out; width: 100%;'
    })
  },
  onblurNum: function (e) { // 手机号失去焦点
    let number = e.detail.value
    this.setData({
      userNum: number,
      Num: 'transition:all .3s ease-in-out; width: 0;'
    })
  },
  onfocusPwd: function () { // 密码获取焦点
    this.setData({
      logs: '',
      Pwd: 'transition:all .3s ease-in-out; width: 100%;'
    })
  },
  onblurPwd: function (e) { // 密码失去焦点
    let pass = e.detail.value
    this.setData({
      userPwd: pass,
      Pwd: 'transition:all .3s ease-in-out; width: 0;'
    })
  },
  onlogin: function () { // 登录按钮操作
    let user = this.data.userName
    let num = this.data.userNum
    let pass = this.data.userPwd
    var that = this
    if (!user) {
      this.setData({
        logs: '请输入姓名'
      })
    } else if (!num) {
      this.setData({
        logs: '请输入手机号'
      })
    } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/).test(num)) {
      this.setData({
        logs: '请输入正确手机号'
      })
    } else if (!pass) {
      this.setData({
        logs: '请输入密码'
      })
    } else {
      wx.request({
        method: 'post',
        url: 'http://jy.haoyunyun.cn/api/login',
        data: { 'username': user, 'tel': num, 'password': pass },
        header: {
          "content-type": "application/json"
        },
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log(res.data)
          if (res.statusCode == 200) {
            let { data } = res
            if (data.status === 200) {
              wx.showToast({
                title: '登录成功',
                success: function () {
                  setTimeout(()=> {
                    wx.redirectTo({ // 路由跳转
                      url: "/pages/index/index" // 登陆成功后跳转到首页
                    })
                  }, 500)
                }
              })
              res.data.user = user;
              wx.setStorage({
                key: 'user',
                data: res.data,
              })
             
            } else {
              that.setData({
                logs: data.message
              })
            }

          } else {
            that.setData({
              logs:'登录失败'
            })
          }
          
        },
      })
    }
  }
})
