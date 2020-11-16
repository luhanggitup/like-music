import {HTTP} from '../until/http-p' 

class BookModel extends HTTP {
  getHotList(){
    return this.request({
      url:'/book/hot_list'
    })
  }

  getMyBookCount ( ) {
    return this.request(
      {
        url: `/book/favor/count`
      }
    )
  }
   getDetail (bid) {
     return this.request(
      {
        url: `/book/${bid}/detail`
      }
     )
    }

  getLikeStatus (bid) {
    return this.request(
     {
       url: `/book/${bid}/favor`
     }
    )
  }
  getComments(bid){
    return this.request(
     {
       url:`/book/${bid}/short_comment`
     }
    )
  }
// 书籍短评发送到服务器
  postComment(bid,comment){
    return this.request({
      url:'/book/add/short_comment',
      method:'POST',
      data:{
        book_id:bid,
        content:comment
      }
    })
  }

  /**
   * 搜素页面数据
   * start默认为0 开始记录数
   * q搜索的关键字
   * */ 
  getSearch(start,q){
    return this.request({
      url:'/book/search',
      data:{
        q:q,
        start:start
      }
    })
  }
}
export {BookModel}