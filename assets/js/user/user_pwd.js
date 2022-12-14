$(function () {
  var form = layui.form
  var layer = layui.layer
  // 自定义密码框验证规则
  form.verify({
    pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    compass: function (val) {
      if (val === $('[name=oldpwd]').val()) {
        return '新密码不能和旧密码相同'
      }
    },
    comNewpass: function (val) {
      if (val !== $('[name=newpwd').val()) {
        return '两次密码不一致'
      }
    }
  })
  // 发送ajax请求
  $('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('修改失败')
        }
        layer.msg('修改成功')
        // 重置表单
        $('.layui-form')[0].reset()
      }
    })
  })
})
