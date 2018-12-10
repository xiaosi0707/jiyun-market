//app.js
App({
  onHide(){
    //获取最新时间并缓存本地
    let time = new Date().getTime();
    wx.setStorageSync("nextTime",{
      time:time
    });
    wx.removeStorage({
      key: 'user',
    })
  }
})