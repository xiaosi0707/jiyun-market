// components/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:Object,
    title:String,
    url:String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapdetail: function (e) {
      var id = e.currentTarget.dataset.id
      var bt = e.currentTarget.dataset.bt
      console.log(this.properties.url);
      wx.navigateTo({
        url: this.properties.url + 'detail?id=' + id + '&title=' + this.properties.title,
      })
    }
  }
})
