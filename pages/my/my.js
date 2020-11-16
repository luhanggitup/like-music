// pages/my/my.js
import {BookModel} from "../../models/book"
import {ClassicModel} from "../../models/classic"
const bookModel = new BookModel()
const classicModel = new ClassicModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    authorized:false,
    bookCount:0,
    classics:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },


// 自定义判断用户是否已经授权了的
  userAuthorized(){
  wx.getSetting({
   success:data => {
    //  用户已经授权
     if(data.authSetting['scope.userInfo']){
       wx.getUserInfo({
         success:data => {
           this.setData({
             authorized:true,
             userInfo:data.userInfo
           })
         }
       })
     }
   }
  })
  },
// 用图片来监听button按钮的确认功能
  onGetUserInfo (event) {
    const userInfo = event.detail.userInfo
    this.setData({
      userInfo,
      authorized:true
    })
 },
//获取喜欢页面的人数
    getMyBookCount(){
      bookModel.getMyBookCount().then( res => {
        this.setData({
          bookCount:res.count
        })
      })
    },

    getMyFavor(){
      classicModel.getMyFavor(res => {
        this.setData({
          classics:res
        })
      })

    }

})