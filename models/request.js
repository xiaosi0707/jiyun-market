import {Http} from "./http.js"
let http = new Http();
class Request{
  inform(p) {  //通知
    let data = http.send("http://jy.haoyunyun.cn/api/shows", "get", {
      page: p,
      key: "c56d0e9a7ccec67b4ea131655038d604"
    });
    return data;
  }
  news(p){  //新闻
    let data = http.send("http://jy.haoyunyun.cn/xinwenapi","get",{
      page:p
    });
    return data;
  }
  system(p){  //制度
    let data = http.send("http://jy.haoyunyun.cn/zhengceapi","get",{
      page:p
    })
    return data;
  }
  activity(p){  //活动
    let data = http.send("http://jy.haoyunyun.cn/api/select","get",{
      key:"c56d0e9a7ccec67b4ea131655038d604",
      page:p
    })
    return data;
  }
  search(name){ //搜索
    let data = http.send("http://3w.houbowang.com/json/student.php","get",{
      uu:name
    });
    return data;
  }
  getGood(){  //读取喜报
    let data = http.send("http://3w.houbowang.com/json/studentList.php","get");
    return data;
  }
  setPre(name, card, phome, sex, timer, teacher,edu){  //写入预报名
    let data = http.send("http://jy.haoyunyun.cn/studentadd","get",{
      username:name,
      education:edu,
      card:card,
      tel:phome,
      sex:sex,
      date:timer,
      zsls:teacher
    })
    return data;  
  }
  recruit(){  //获取招生老师
    let data = http.send("http://jy.haoyunyun.cn/api/zsls","get");
    return data;
  }
  complain(){ //投诉
    let data = http.send("http://jy.haoyunyun.cn/wenzhangapi","get");
    return data;
  }
  //http://jy.haoyunyun.cn/api/qyjl
  login(user,pass,phome){  //登入
    let data = http.send("http://jy.haoyunyun.cn/api/login","post",{
      username:user,
      password:pass,
      tel:phome
    });
    return data;
  }
  getApply(p){ //获取就业学生
    let data = http.send("http://jy.haoyunyun.cn/studentapi","get",{page:p});
    return data;
  }
  getDef(type,id){
    console.log(type);
    let data = null;
    if (type == "集团通知"){ //通知详情
      data = http.send("http://jy.haoyunyun.cn/api/msg","get",{
        id:id,
        key: "c56d0e9a7ccec67b4ea131655038d604"
      })
    } else if (type == "集团新闻") {//新闻详情
      data = http.send("http://jy.haoyunyun.cn/xinwenshow", "get", {
        id: id
      });
    } else if (type == "优惠活动"){  //优惠活动
      data = http.send("http://jy.haoyunyun.cn/api/msgs","get",{
        id:id,
        key: "c56d0e9a7ccec67b4ea131655038d604"
      });
    } else if (type == "政策制度") {  //政策详情
      data = http.send("http://jy.haoyunyun.cn/zhengceshow", "get", {
        id: id
      });
    } else if (type == "投诉建议"){  //投诉详情
      data = http.send("http://jy.haoyunyun.cn/wenzhangshow", "get", {
        id: id
      });
    }
    return data;
  }
  getOrgan(id,type) { //获取组织结构
    var url = "";
    switch(type){
      case 5:
        url = "http://jy.haoyunyun.cn/api/qyjl";
        break;
      case 4:
        url = "http://jy.haoyunyun.cn/api/xb";
        break;
      case 3:
        url = "http://jy.haoyunyun.cn/api/zb";
        break;
      case 2:
        url = "http://jy.haoyunyun.cn/api/zsry";
        break;
    }
    let data = http.send(url, "get", {
      id: id,
      type: type
    });
    return data;
  }
  
}
export{Request}