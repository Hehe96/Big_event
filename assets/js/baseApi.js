// 每次发起ajax请求之前 都会调用ajaxPrefilter这个函数
// 在这个函数中我们可以拿到ajax提供的配置信息
$.ajaxPrefilter(function (options) {
  // 拼接完整的地址
  options.url = 'http://www.liulongbin.top:3007' + options.url
})
