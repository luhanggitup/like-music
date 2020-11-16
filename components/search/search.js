// components/search/search.js
import {
  KeywordModule
} from '../../models/keyword'
import {
  BookModel
} from "../../models/book"
import {
  paginationBev
} from "../behavior/pagination"
const keywordModule = new KeywordModule()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   * 加载部分数据，监听用户滑动在动态的加载数据
   * 使用page的onReachBottom方法
   */

  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false,
    load:false
  },

  attached() {
    const hotWords = keywordModule.getHot()
    this.setData({
      historyWords: keywordModule.getHistory()
    })
    hotWords.then(res => {
      this.setData({
        hotWords: res.hot
      })
    })

  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 动态的监听用户下滑到数据底部，然后请求新的数据
    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.data.loading) {
        return
      }
      if (this.hasMore()) {
        // 运用锁的概念，来解决多次向服务端多次请求数据的
        this.data.loading = true
        bookModel.getSearch(this.getCurrenStart(), this.data.q).then(res => {
          this.setNewData(res.books)
          this.data.loading = false
        })
      }
    },
    onCancel() {
      this.initLize() 
      this.triggerEvent('cancel', {}, {})
    },
    onDelete() {
      this.initLize() 
      this.setData({
        searching: false,
        q:""
      }) 
    },


    onConfirm(event) {
      this._showResult()
      this._showLoad()
      const q = event.detail.value || event.detail.text
      bookModel.getSearch(0, q)
        .then(res => {
          this.setNewData(res.books)
          this.setTotal(res.total)
          this.setData({
            q
          })
        })
      keywordModule.addHistory(q)
      this._hideLoad()
    },
    // 更新loading
    _showLoad(){
      this.setData({
        load:true
      })
    },
    _hideLoad(){
      this.setData({
        load:false
      })
    },

    // 加下划线表示封装的自有方法
    _showResult() {
      this.setData({
        searching: true
      })
    }

  }
})