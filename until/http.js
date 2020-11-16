import {config} from '../config'
const tips = {
     1 : '出现了一个错误',
  1005 : 'appkey无效',
  3000 : '期刊不存在'
}
class HTTP{
  // 方法 url data method 
  request (params) {
    if (!params.method) {
      params.method="GET"
    }
   wx.request({
    url:config.api_base_url + params.url,
    method:params.method,
    data:params.data,
    header:{
      'content-type':'application/json',
      'appkey':config.appkey
    },
    success: (res) => {
      // es6字符串方式 startsWith endsWith
      let code = res.statusCode.toString()
      if (code.startsWith('2')) {
        params.success && 
        params.success(res.data)
      }else{
        // 给客户提示错误信息
      let error_code = res.data.error_code
       this._show_error(error_code)
      }
    },
    fail: (err) => {
      this._show_error(1)
    }
   })

  }
  // 获取错误的详细信息
  _show_error(error_code){
    if (!error_code) {
      error_code = 1      
    }
    wx.showToast({
      title: tips[error_code],
      icon:'none',
      duration:2000
    })

  }
}

export {HTTP}