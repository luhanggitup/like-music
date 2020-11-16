// components/classic/music/musci.js
import {classicBeh} from '../classic-beh'
const mMgr = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[classicBeh],
  properties: {
    src:String
  },
  /*
   *detached,attached函数在hidden里面是不会执行的
   *切换期刊时，播放状态是正常的
   */ 
  attached(){
    this._recoverStatus()
    this._monitorSwitch()
  },
  /**
   * 组件的初始数据
   */
  data: {
    playing:false,
    pauseSrc:'images/player@pause.png',
    playSrc:'images/player@play.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(){
      if(!this.properties.playing){
        this.setData({
          playing:true
        })
        mMgr.src =this.properties.src
        mMgr.title = "这就是少年"
      }else{
        this.setData({
          playing:false
        })
        mMgr.pause()
      }
    },

    // 判断当前音乐是不是当前组件的音乐
  _recoverStatus(){
    if(mMgr.paused){
      this.setData({
        playing:false
      }) 
      return 
    }
    if(mMgr.src == this.properties.src){
      this.setData({ 
        playing:true
      })
    }
  },
// 更新音乐控制台和按钮键统一暂停
  _monitorSwitch(){
    mMgr.onPlay(()=>{
      this._recoverStatus()
    })
    // 暂停音乐
    mMgr.onPause(()=>{
      this._recoverStatus()
    })
    // 关闭控制台
    mMgr.onStop(()=>{
      this._recoverStatus()
    })
    // 一首音乐自动播放完成
    mMgr.onEnded(()=>{
      this._recoverStatus()
    })
  }
  }
})
