// 每次发起ajax请求之前 都会调用ajaxPrefilter这个函数
// 在这个函数中我们可以拿到ajax提供的配置信息
$.ajaxPrefilter(function (options) {
  // 拼接完整的地址
  options.url = 'http://www.liulongbin.top:3007' + options.url
  //同意为有权限的接口 设置heasers请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = { Authorization: localStorage.getItem('token') || '' }
  }
  // 全局配置complete
  // 不论ajax请求成功还是失败都会调用complete 函数
  options.complete = function (res) {
    // 在complete回调中 可以使用res.responseJSON 拿到服务器响应回来的信息
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      console.log('111111111')
      // 1.强制清空token
      localStorage.removeItem('token')
      // 2.强制跳转到登录页
      location.href = '/login.html'
    }
  }
})
