import { Request } from "../../models/request.js";
let Api = new Request();
import { funClass } from "../../models/class.js";
let Class = new funClass();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],  
    title:'',
    page:1,
    loading:false,
    hide: false
  },
  onLoad: function (options){
    this.setData({
      title: options.title,
      loading:true
    })
    if (options.title == '投诉建议') {
      this.setData({
        hide: true
      })
    }
    Api.complain(0).then(res => { //首次加载
      Class.loadData(this, res.data.list.data);
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    Api.complain(0).then(res => { //刷新
      Class.loadData(this, res.data.list.data);
    })
  },    

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    Api.complain(this.data.page++).then(res => {  //加载数据
      Class.concatData(this, res.data.list.data);
    })
  },
})