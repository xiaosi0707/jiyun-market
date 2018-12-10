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
  onlogin(){ // 登录按钮操作
    let ths = this;
    //登入
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid:"wx4fcef327c336a273",
              secret:"c5f4ec809b3dec093add52acc0a05888",
              js_code:res.code,
              grant_type:"authorization_code"
            },
            success(res){
              let openid = res.data.openid;
              let user = ths.data.userName;
              let num = ths.data.userNum;
              let pass = ths.data.userPwd;
              var that = ths
              if (!user) {
                ths.setData({
                  logs: '请输入姓名'
                })
              } else if (!num) {
                ths.setData({
                  logs: '请输入手机号'
                })
              } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/).test(num)) {
                ths.setData({
                  logs: '请输入正确手机号'
                })
                wx.showModal({
                  title: '提示',
                  content: '请输入正确手机号',
                })
              } else if (!pass) {
                ths.setData({
                  logs: '请输入密码'
                })
              } else {
                wx.request({
                  method: 'get',
                  url: 'http://www.uu5u.cn/api/login',
                  data: { 
                    'username': user, 
                    'tel': num, 
                    'password': pass,
                    'openid':openid
                  },
                  header: {
                    "content-type": "application/json"
                  },
                  dataType: 'json',
                  responseType: 'text',
                  success: (res) => {
                    if (res.statusCode == 200) {
                      let { data } = res
                      if (data.status === 200) {
                        wx.showToast({
                          title: '登录成功',
                          success: function () {
                            setTimeout(() => {
                              wx.redirectTo({ // 路由跳转
                                url: "/pages/index/index" // 登陆成功后跳转到首页
                              })
                            }, 500)
                          }
                        })
                        res.data.user = user;
                        res.data.tel = num
                        wx.setStorage({
                          key: 'user',
                          data: res.data,
                        })

                      } else {
                        wx.showModal({
                          title: '提示',
                          content: data.message,
                        })
                        that.setData({
                          logs: data.message
                        })
                      }

                    } else {
                      that.setData({
                        logs: '登录失败'
                      })
                    }
                  },
                })
              }
            }
          })
        }
      }
    })
  }
})
