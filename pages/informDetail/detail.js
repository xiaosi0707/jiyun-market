// pages/detail/detail.js
let { wxParse } = require('../../wxParse/wxParse.js');
import { Request } from "../../models/request.js";
let Api = new Request();
import { funClass } from "../../models/class.js";
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
    Api.getDef(options.title, options.id).then(res => {  //获取详情
      this.setData({
        listdetail: res.data.list.list,
        cont: res.data.list.list.text
      })
      let datas = res.data.list.list.text;
      wxParse('datas', 'html', datas, this, 0);
    })
  }
})