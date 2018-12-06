//index.js
//获取应用实例
const app = getApp()


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
    navlist:[
      {
        title: '集团新闻',
        icon: 'icon-jituanxinwen'
       },
      {
        title: '市场通知',
        icon: 'icon-shichang'
      },
      {
        title: '优惠活动',
        icon: 'icon-youhui'
      },
      {
        title: '政策制度',
        icon: 'icon-main-'
      },
      {
        title: '就业利好',
        icon: 'icon-yeji'
      },
      {
        title: '组织结构',
        icon: 'icon-zuzhi'
      },
      {
        title: '在校查询',
        icon: 'icon-zaixiaoqingkuang'
      },
      {
        title: '报名学生',
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
        icon: 'icon-tousu'
      }
    ],
    newsData:[],
    tongzhiData:[],
    youhuiData:[],
    zhengceData:[],
    user:'积云', // 登录的姓名
    imgUrls: [
      'https://www.uu5u.cn/images/banmer-1.jpg',
      'https://www.uu5u.cn/images/banmer-2.jpg',
      'https://www.uu5u.cn/images/banmer-3.jpg',
      'https://www.uu5u.cn/images/banmer-4.jpg',
      'https://www.uu5u.cn/images/banmer-5.jpg',
      'https://www.uu5u.cn/images/banmer-6.jpg'
    ],
    indicatorDots: true,
    autoplay: true, // 自动播放
    interval: 3000,
    duration: 1000,
    circular: true // 循环播放
  },
  tap:function(event){
    let { id } = event.currentTarget
    if (id == "投诉建议"){
      console.log("Aa");
      wx.navigateTo({
        url: '../complain/list?title='+id
      })
    }else if(id == '就业利好'){
      wx.navigateTo({
        url: '../jiuyegood/jiuyegood',
      })
    }else if(id == "就业查询"){
      wx.navigateTo({
        url: '../jiuyesearch/jiuyesearch'
      })
    }else if(id == "报名学生"){
      wx.navigateTo({
        url: '/pages/studenglist/studenglist',
      })
    }else if(id == "在校查询"){
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
      // console.log(res.list.data)
      this.setData({
        newsData:res.list.data
      })
      
    })
    // 集团通知
    tongzhi.getTongzhiList((res) => {
      // console.log(res.list.list.data)
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
      // console.log(res.list.data)
      if (res.list.data.length > 3) {
        res.list.data.length = 3
      }
      this.setData({
        zhengceData: res.list.data
      })
     
    })
  }
})