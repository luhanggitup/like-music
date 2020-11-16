import {
  HTTP
} from '../until/http.js'

// 对classic页面的业务操作

class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: '/classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.index)
        let key = this._getkey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  // 获取下一期
  getClassic(index, nextOrPrevious, sCallback) {
    let key = nextOrPrevious == 'next' ? this._getkey(index + 1) :
      this._getkey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        // es6模板字符串
        url: `/classic/${index}/${nextOrPrevious}`,
        // url:'/classic/ + index + '/' ',
        success: (res) => {
          wx.setStorageSync(
            this._getkey(res.index), res)
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }

  }

  isFirst(index) {
    return index == 1 ? true : false
  }
  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false

  }
  getMyFavor(success) {
    const params = {
      url: '/classic/favor',
      success: success
    }
    this.request(params)
  }

  getById(cid, type, success) {
    let params = {
      url: `/classic/${type}/${cid}`,
      success: success
    }
    this.request(params)
  }
  //  把最新的的期刊存在storage里
  _setLatestIndex(index) {
    wx.setStorageSync('key', index)
  }
  // 获取最新期刊号
  _getLatestIndex() {
    let index = wx.getStorageSync('key')
    return index
  }
  // 获取key值来 缓存
  _getkey(index) {
    let key = 'classic-' + index
    return key
  }
}


export {
  ClassicModel
}