// components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String
    },
    first:Boolean,
    latest:Boolean,
  },

  /**
   * 组件的初始数据
   */

  data: {
    disLeftSrc:'../images/triangle.dis@left.png',
    leftSrc:'../images/triangle@left.png',
    disRightSrc:'../images/triangle.dis@right.png',
    rightSrc:'../images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 事件监听有event参数，这里没有用
    onLeft(event){
      if(!this.properties.latest){
        this.triggerEvent('onNext','{}','{}')
      }   
    },
    onRight(){
      if(!this.properties.first){
        this.triggerEvent('onPiece','{}','{}')
      }    
    }

  }
})
