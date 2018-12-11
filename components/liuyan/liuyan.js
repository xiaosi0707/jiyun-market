// components/liuyan/liuyan.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    hide: false, // 是否开启文本框
    name: '', // 用户姓名
    value: '' // 文本域的值
  },
  
  attached: function () { 
    let user = wx.getStorageSync('user')
    this.setData({
      name: user.username
    })
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    onValue(ev) { // 获取文本框的值
      let { value } = ev.detail
      this.setData({
        value
      })
    },
    onShow () { // 开启留言板
      this.setData({
        hide: true
      })
    },
    onNO () {
      this.setData({ // 关闭
        hide: false
      })
    },
    onForm() { // 提交留言
      let { value, name } = this.data
      if (!value) {
        wx.showToast({
          title: '请输入内容',
          icon: 'none'
        })
      } else {
        wx.showToast({
          icon: 'success',
          title: '留言成功'
        })
        setTimeout(() => {
          this.setData({
            hide: false
          })
        }, 1000)
      }
      console.log('aa')
    }
  }
})
