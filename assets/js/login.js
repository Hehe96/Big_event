$(function () {
  // 点击注册隐藏登录页面
  $('#link-reg').click(function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 点击登录隐藏注册页面
  $('#link-login').click(function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })
  // 从layui中获取form对象
  var form = layui.form
  var layer = layui.layer
  // 通过form,verify()函数自定义校验规则
  form.verify({
    //自定义pwd规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一样
    repwd: function (value) {
      // 通过形参拿到确认密码框中的内容
      // 还需拿到密码框中的内容
      // 然后进行一次等于判断
      // 如果判断失败 就return一个错误信息
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })
  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 阻止表单提交的默认事件
    e.preventDefault()
    // 发送ajax请求
    var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
    $.post('http://www.liulongbin.top:3007/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功')
      // 模拟人点击 去登录
      $('#link-login').click()
    })
  })
  // 监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    // 取消表单提交后的跳转
    e.preventDefault()
    // 发起ajax请求
    $.ajax({
      type: 'post',
      url: '/api/login',
      // 快速获取表单所有数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
        // 将登录成功后获取到的token保存到 localStorage
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })
})
