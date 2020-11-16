// 搜索组件搜索
import  {HTTP} from '../until/http-p'
class KeywordModule extends HTTP {
  key = "q"
  maxLength = 10
  getHistory(){
   const words = wx.getStorageSync(this.key)
  //  如果数组刚开始没有内容的时候返回空数组
   if(!words){
     return []
   }
   return words
  }

  getHot(){
     return this.request({
       url:'/book/hot_keyword'
     })
  }


  addHistory(keyword){
    let words = this.getHistory()
    const has = words.includes(keyword)
    if(!has){
      const length = words.length
      if(length >= this.maxLength){
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }   
  }
}
export {KeywordModule}