// pages/studentsearch/studentsearch.js


import { Request } from '../../models/request.js'
let http = new Request()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '', // 姓名
    mge: [], // 基本信息
    log: '', // 提示
    color: '' // 颜色
  },
  getName(e) { // 获取文本框的内容
    let { value } = e.detail
    this.setData({
      userName: value
    })
  }, 
  onFocus (e) { // 获取焦点
    this.setData({
      log: ''
    })
  },
  onSearchList() { // 搜索
    console.log(this.data.userName)
    let user = this.data.userName
    let reg = /^[\u4e00-\u9fa5]+$/
    user = user.replace(/(^\s+)|(\s+$)/g, "")
    var containSpecial = /[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\.\。\、\/\;\"\L\<\>\?]/g
    console.log(containSpecial.test(user))
    if (!user) {
     this.setData({
       mge: [],
       log: '请输入姓名',
       color: 'red'
     })
    } else if (containSpecial.test(user)) {
      this.setData({
        mge: [],
        log: '检测到非法字符',
        color: 'red'
      })
    } else if (!reg.test(user)) {
      this.setData({
        mge: [],
        log: '请输入中文查询',
        color: 'red'
      })
    } else if (reg.test(user) && user.length < 2) {
      this.setData({
        mge: [],
        log: '请输入全称查询，至少两个字或以上',
        color: 'red'
      })
    } else if (reg.test(user) && user.length >=2 ) {
    let user = this.data.userName
    var indata = [];  //便利后的数据
    http.getSearchData(user).then(res => {
      let data = res.data;  //学生信息
      http.getSearchList(user).then(res => {
        let data1 = res.data;  //班级信息
        http.getSearchPrice(user).then(res => {
          let data2 = res.data; //缴费信息
          for (let i = 0; data[i] != undefined; i++) {
            let datas = {
              student_inform: [],
              The_class_inform: [],
              Payment_inform: []
            };
            datas.student_inform.push(data[i]);
            let classitem = []
            for (let j = 0; data1[j] != undefined; j++) {
              if (data[i].StudentIdCard == data1[j].StudentIdCard) {
                classitem.push(data1[j])
                datas.The_class_inform = classitem.reverse()
              }
            }
            for (let k = 0; data2[k] != undefined; k++) {
              if (data[i].StudentIdCard == data2[k].StudentIdCard) {
                datas.Payment_inform.push(data2[k]);
              }
            }
            indata.push(datas);
          }
          let num = indata.length
          if (num) {
            this.setData({
              mge: indata,
              log: '查询的结果有 ' + num + ' 条',
              color: ''
            })
          } else {
            this.setData({
              mge: indata,
              log: '该同学不存在，请重新输入姓名',
              color: 'red'
            })
          }
          console.log(this.data.mge)
        })
      })
    })
    }
  }
})