const paginationBev = Behavior({
  data: {
    dataArr: [],
    total: null,
    noResult: false
  },
  methods: {
    // 接受数组，用于分页页面的数据
    setNewData(dataArr) {
      const tempArr =
        this.data.dataArr.concat(dataArr)
      this.setData({
        dataArr: tempArr
      })
    },

    getCurrenStart() {
      return this.data.dataArr.length
    },

    setTotal(total) {
      this.data.total = total
      if ( total == 0) {
        this.setData({
          noResult: true
        })
      }
    },
    // 判断是否还会有新的数据还需要加载，是否要发送请求
    hasMore() {
      if (this.data.dataArr.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },
    // 清楚已经有的数据
    initLize() {
      // 更新 新的数据
      this.setData({
        dataArr: [],
        noResult:false
      })
      this.data.total = null
    }
  }
})

export {
  paginationBev
}