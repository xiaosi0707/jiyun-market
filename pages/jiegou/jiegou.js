

import { Request } from "../../models/request.js";
let Api = new Request();
Page({
  data:{
    text:"",
    dataList:[],
    upLevel:null,
    upName:"",
    value:""

  },
  click(ev){
    let index = ev.currentTarget.dataset.index;
  },
  onLoad(ev){
      let item = wx.getStorageSync("user");
      let position = "";
      let type = ev.type == undefined?item.type:ev.type;
      let id = ev.id == undefined?item.id:ev.id;
      let upName = ev.name == undefined ? item.user:ev.name;
      
      //判断职位
      type = parseInt(type);
      switch(type){
        case 5:
          position = "区域经理";
          break;
        case 4:
          position = "区办";
          break;
        case 3:
          position = "招办";
          break;
        case 2:
          position = "招生人员";
          break;
      }
      this.setData({
        text:position,
        upName:upName,
        upLevel:type
      });
      //请求人员
      
      Api.getOrgan(id,type).then(res=>{
        if(res.data.status == 404){
          wx.showToast({
            title: '没有下级用户',
            icon: 'error',
            duration: 1000,
            mask: true
          })
          setTimeout(function(){
            wx.navigateBack({ changed: true });
          },1000)
          return false;
        }
        this.setData({
          dataList:res.data.dataList,
          type:res.data.type
        });
      })
  },
  fun(ev){  //点击事件跳路由
    let index = ev.currentTarget.dataset.index;
    let dataList = this.data.dataList[index];
    let type = this.data.type;
    if (this.data.text == "招生人员")return false;
    wx.navigateTo({
      url: '/pages/jiegou/jiegou?name=' + dataList.username + "&type=" + type + "&id=" + dataList.id,
    })
  },
  onblurUser(ev){
    this.setData({
      value: ev.detail.value
    })
  },
  search(){
    let value = this.data.value;
    var user = wx.getStorageSync("user");
    console.log(user);
    Api.search_teacher(value,user.phome).then(res=>{
      console.log(res);
    })
  }
})