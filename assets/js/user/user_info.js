$(function () {
  var form = layui.form
  var layer = layui.layer
  form.verify({
    nickname: function (val) {
      if (val.length > 6) {
        return '昵称长度必须在 1 ~ 6 字符之间'
      }
    }
  })
  // 重置按钮
  $('#btnReset').click(function (e) {
    // 阻止表单默认的重置行为
    e.preventDefault()
    initUserInfo()
  })
  initUserInfo()
  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      type: 'get',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败')
        }
        // form.val 快速为表单赋值
        form.val('formUserInfo', res.data)
      }
    })
  }

  // 监听表单提交
  $('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('用户更新失败')
        }
        layer.msg('用户更新成功')
        window.parent.getUserinfo()
      }
    })
  })
})
