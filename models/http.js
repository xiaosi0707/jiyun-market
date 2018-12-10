class Http{
  send(url,type,params){  //promise封装请求
     return new Promise((success, err)=>{
       
        wx.request({
          url:url,
          method:type,
          data:params,
          success:(res)=>{
            success(res);
          },
          fail:(res)=>{
            console.log(res)
            err(res);
          }
        })
     })
  }
  query(data){  //解析参数
    console.log(data);
    let str = "?";
    for(let item in data){
      str += item + "=" + data[item] + "&";
    }
    str = str.substr(0,str.length - 1);
    console.log(str);
    return str;
  }
}
export { Http};