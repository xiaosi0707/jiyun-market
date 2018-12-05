// pages/jiuyegood/jiuyegood.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsdata:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
      wx.request({
        url: 'http://3w.houbowang.com/json/studentList.php',
        success(res) {
          let data = res.data;
          data = that.order(data);
          that.setData({
            goodsdata:data
          })
        }
      })
  },
  order(data) {  //强制排序顺序
  let dataList = [];
    let title = ["全栈","大数据","物联网","PHP","新媒体视觉"];  //过滤信息
    title.forEach(item=>{
      for(let i = 0;data[i]!=undefined;i++){
        if (data[i].bname === item){
          //屏蔽学生姓名信息
          data[i].sname = data[i].sname.replace(/\s/g,""); 
          console.log(data[i].sname.length);
          if(data[i].sname.length <= 2){
            data[i].sname = data[i].sname[0] + "**";
          }else{
            data[i].sname = data[i].sname[0] + "**" + data[i].sname[data[i].sname.length - 1];
          }
          dataList.push(data[i]);
        }
      }
    });
    return dataList;
  }
})