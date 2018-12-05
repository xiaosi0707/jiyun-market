class funClass{
  //合并数据
  concatData(ev,data) {
    let list = ev.data.data;
    list = list == undefined ? [] : list;
    list = list.concat(data);
    ev.setData({
      data: list
    })
  }

  //刷新数据
  loadData(ev,data) {
    ev.setData({
      data: data,
      page: 1,
      loading:false
    })
  }
}
export {funClass}