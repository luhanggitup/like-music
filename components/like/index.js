// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean
      
    },
    count:{
      type:Number
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc:"../images/likes.png",
    noSrc:"../images/like.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
		onLike () {
			let like = this.properties.like
      let count = this.properties.count
      count = like ? count-1 : count+1
      // 获取数据
      this.setData({
        count:count,
        like:!like
      })
      // like状态
      let behavior = this.properties.like ? "like" : "cancel"
       // 激活自定义事件
      this.triggerEvent('like',{
        behavior:behavior,
      },{})
    },
  }
})
