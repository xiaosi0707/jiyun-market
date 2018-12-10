//index.js
//获取应用实例
const app = getApp()
import { Request } from "../../models/request.js";
let Api = new Request();
import { NewsModel } from '../../models/news.js'
import { TongzhiModel } from "../../models/tongzhi.js"
import { YouhuiModel } from "../../models/youhui.js"
import { ZhengceModel } from "../../models/zhengce.js"


let news = new NewsModel()
let tongzhi = new TongzhiModel()
let youhui = new YouhuiModel()
let zhengce = new ZhengceModel()
Page({
  data: {
    roolList:[],
    navlist:[
      {
        arr:[],
        title: '集团新闻',
        icon: 'icon-jituanxinwen',
        action:null,
       },
      {
        title: '市场通知',
        icon: 'icon-shichang',
        action: null,
      },
      {
        title: '优惠活动',
        icon: 'icon-youhui',
        action: null,
      },
      {
        title: '政策制度',
        icon: 'icon-main-',
        action: null,
      },
      {
        title: '就业喜报',
        icon: 'icon-yeji'
      },
      {
        title: '组织结构',
        icon: 'icon-zuzhi'
      },
      {
        title: '在校生查询',
        icon: 'icon-zaixiaoqingkuang'
      },
      {
        title: '准学生信息上报',
        icon: 'icon-iconfontshuxie'
      },
      {
        title: '就业查询',
        icon: 'icon-jiuye1'
      },
      {
        title: '业绩排名',
        icon: 'icon-performance'
      },
      {
        title: '会议管理',
        icon: 'icon-huiyi'
      },
      {
        title: '工资查询',
        icon: 'icon-639'
      },
      {
        title: '市场住宿',
        icon: 'icon-market'
      },
      {
        title: '费用报销',
        icon: 'icon-feiyong'
      },
      {
        title: '投诉建议',
        icon: 'icon-tousu',
        action: null,
      }
    ],
    newsData:[],
    tongzhiData:[],
    youhuiData:[],
    zhengceData:[],
    user:'积云', // 登录的姓名
    imgUrls: [
      'http://www.uu5u.cn/images/banmer-1.jpg',
      'http://www.uu5u.cn/images/banmer-2.jpg',
      'http://www.uu5u.cn/images/banmer-3.jpg',
      'http://www.uu5u.cn/images/banmer-4.jpg',
      'http://www.uu5u.cn/images/banmer-5.jpg',
      'http://www.uu5u.cn/images/banmer-6.jpg'
    ],
    indicatorDots: true,
    autoplay: true, // 自动播放
    interval: 3000,
    duration: 1000,
    circular: true, // 循环播放
  },
  tap:function(event){
    let { id } = event.currentTarget
    let index = event.currentTarget.dataset.index;
    let navlist = this.data.navlist;
    navlist[index].action = 0;
    this.setData({
      navlist
    })
    if (id == "投诉建议"){
      wx.navigateTo({
        url: '../complain/list?title='+id
      })
    } else if (id == '就业喜报'){
      wx.navigateTo({
        url: '../jiuyegood/jiuyegood',
      })
    }else if(id == "就业查询"){
      wx.navigateTo({
        url: '../jiuyesearch/jiuyesearch'
      })
    } else if (id == "准学生信息上报"){
      wx.navigateTo({
        url: '/pages/studenglist/studenglist',
      })
    }else if(id == "在校生查询"){
      wx.navigateTo({
        url: '/pages/studentsearch/studentsearch',
      })
    }else if(id == "组织结构"){
      wx.navigateTo({
        url: '/pages/jiegou/jiegou'
      })
    }else if(id == "集团新闻"){
      wx.navigateTo({
        url:'/pages/newsList/list?title='+id
      })
    } else if (id == "优惠活动") {
      wx.navigateTo({
        url: '/pages/activity/list?title=' + id
      })
    } else if (id == "政策制度") {
      wx.navigateTo({
        url: '/pages/policy/list?title=' + id
      })
    } else if (id == "投拆建议") {
      wx.navigateTo({
        url: '/pages/complain/list?title=' + id
      })
    } else if (id == "集团通知") {
      wx.navigateTo({
        url: '/pages/inform/list?title=' + id
      })
    }
   
  }, 
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    //就业喜报
    Api.getGood().then(res=>{
      let arr = [];
      for(let i = 0;i<=2;i++){
        if (res.data[i].sname.length == 3){
          res.data[i].sname = res.data[i].sname[0] + "**" + res.data[i].sname[res.data[i].sname.length - 1];
        }else{
          res.data[i].sname = res.data[i].sname[0] + "**"
        }
        arr[i] = {
          sname: res.data[i].sname,
        jsalary: res.data[i].jsalary
        }
      }
      console.log(arr);
      this.setData({
        arr
      })
    })
    //获取轮播信息
    Api.getroll().then(res=>{
      let roolList = res.data.dataList;
      this.setData({
        roolList
      })
    })
    var user = wx.getStorageSync("user")
    this.setData({
      title: options.title,
      user:user.user
    })
     // 集团新闻
    news.getNewsList((res) => {
      if(res.list.data.length>3){
       res.list.data.length=3
      } 
      this.setData({
        newsData:res.list.data
      })
      
    })
    // 集团通知
    tongzhi.getTongzhiList((res) => {
      if (res.list.list.data.length>3){
        res.list.list.data.length=3
      }
      this.setData({
        tongzhiData: res.list.list.data
      })
      
    })
  // 优惠活动
    youhui.getYouhuiList((res)=>{
      if (res.list.list.data.length>3){
        res.list.list.data.length=3
      }
      this.setData({
        youhuiData: res.list.list.data
      })
     
    })
    //政策制度
    zhengce.getZhengceList((res) => {
      if (res.list.data.length > 3) {
        res.list.data.length = 3
      }
      this.setData({
        zhengceData: res.list.data
      })
     
    })
    //获取本地缓存的退出时间
    Api.getTimes().then(res=>{
      //读取五条信息
      let { news, inform, complaint, policies, activity } = res.data.listData;
      let data = [news, inform, complaint, policies, activity];
      var timer = wx.getStorageSync("nextTime").time;
      let navList = this.data.navlist;
      for(let i = 0;data[i]!=undefined;i++){
        let time = new Date(data[i]).getTime();
        if (time > timer || (timer == undefined && i<=4)){
          if(i!=4){
            navList[i].action = 1;
          }else if(i == 4){
            navList[14].action = 1;
          }
        }
      }
      this.setData({
        navlist:navList
      })
    })
  }
})