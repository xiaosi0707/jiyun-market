// pages/detail/detail.js
let { wxParse } = require('../../wxParse/wxParse.js');
import { Request } from "../../models/request.js";
let Api = new Request();
import { funClass } from "../../models/class.js";
let Class = new funClass();
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
    console.log(options);
    Api.getDef(options.title, options.id).then(res => {  //获取详情
      console.log(res);
      this.setData({
        listdetail: res.data.list,
        cont: res.data.list.text
      })
    })
  }
})