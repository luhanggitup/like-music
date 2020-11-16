// pages/classic/classic.js
import {ClassicModel} from '../../models/classic.js'
import{LikeModel} from '../../models/like.js'
let classicModel= new ClassicModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic:null,
    latest:true,
    first:false,
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 回调函数，获取最新期刊的数据
		classicModel.getLatest( (res) =>{
      /* this._getLikeStatus(res.id,res.type)
      *要多发一次请求，所以不用这种方法
      */
      this.setData({
        // 扩展运算符
        // ...res
        classic:res,
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
  
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
    // 点赞事件
    onLike(event){
      let behavior = event.detail.behavior
      likeModel.like(behavior,this.data.classic.id,this.data.classic.type)
     },
     // 向左
     onNext(event){
       this._upDateIndex("next")
   
     },
     // 向右点击
     onPrevious(event){
       this._upDateIndex("previous")
     
     },
     _upDateIndex(nextOrPrevious){
      let index = this.data.classic.index
      classicModel.getClassic( index,nextOrPrevious,(res) =>{
        this._getLikeStatus(res.id,res.type)
        this.setData({
          classic:res,
          latest:classicModel.isLatest(res.index),
          first:classicModel.isFirst(res.index)
        })
      }) 
     },
    //  获取点赞的数据私有函数
     _getLikeStatus(artId,category){
       likeModel.getClassicLikeStatus(artId,category, (res) => {
         this.setData({
           likeCount:res.fav_nums,
           likeStatus:res.like_status
         })
       })
     }
   
})