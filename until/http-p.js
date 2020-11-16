import { config } from '../config'
const tips = {
  1: '出现了一个错误',
  1005: 'appkey无效',
  3000: '期刊不存在'
}


class HTTP {
  // 方法 url data method 
  // promise请求数据
  request({url,data={},method="GET"}){
    return new Promise( (resolve,reject) => {
      this._request(url,resolve,reject,data,method)
    })
        
  }
  _request(url,resolve,reject,data={},method="GET") {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        // es6字符串方式 startsWith endsWith
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
            resolve(res.data)
        } else {
          // 给客户提示错误信息
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })

  }
  // 获取错误的详细信息
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })

  }
}

export { HTTP }