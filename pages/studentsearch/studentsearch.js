// pages/studentsearch/studentsearch.js

import { Request } from '../../models/request.js'
let http = new Request()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '', // 姓名
    nameData: [] // 基本信息

  },
  getName (e) { // 获取文本框的内容
    let { value } = e.detail
    this.setData({
      userName: value
    })
  },
  onSearchList () { // 搜索
    let user = this.data.userName
    var indata = [];  //便利后的数据
    http.getSearchData(user).then(res=> {
      let data = res.data;  //学生信息
      http.getSearchList(user).then(res => {
        let data1 = res.data;  //班级信息
        http.getSearchPrice(user).then(res => {
          let data2 = res.data; //缴费信息
          for(let i = 0;data[i]!=undefined;i++){
            let datas = {
              student_inform:[],
              The_class_inform:[],
              Payment_inform:[]
            };
            datas.student_inform.push(data[i]);

            for(let j = 0;data1[j]!=undefined;j++){
              if(data[i].StudentIdCard == data1[j].StudentIdCard){
                datas.The_class_inform.push(data1[j]);
              }
            }
            for(let k = 0;data2[k]!=undefined;k++){
              if (data[i].StudentIdCard == data2[k].StudentIdCard) {
                datas.Payment_inform.push(data2[k]);
              }
            }
            indata.push(datas);
          }
          console.log(indata);
        })
      })
    })
  }
})