$(function () {
  // 调用取用户信息函数
  getUserinfo()
})
var layer = layui.layer
// 获取用户信息
function getUserinfo() {
  $.ajax({
    type: 'get',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('获取用户信息失败')
      }
      console.log('getUserinfo')
      //调用renderAvater函数渲染用户头像
      renderAvater(res.data)
    }
  })

  // 渲染用户头像
  function renderAvater(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    if (user.user_pic !== null) {
      $('.text-avatar').hide()
      $('.layui-nav-img').attr('src', user.user_pic)
    } else {
      $('.layui-nav-img').hide()
      $('.text-avatar').html(name[0].toUpperCase()).show()
    }
  }
  // 点击退出
  $('#quit').click(function () {
    layer.confirm('确定退出?', { icon: 3, title: '提示' }, function (index) {
      // 1.清除本地token
      localStorage.removeItem('token')
      // 2.重新跳转登录页面
      location.href = '/login.html'
      // 关闭提示框
      layer.close(index)
    })
  })
}
