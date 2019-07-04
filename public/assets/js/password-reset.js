
$('#modifyForm').on('submit',function(){
  var formData = $(this).serialize();
  $.ajax({
    type:'put',//get或post
    url:'/users/password',//请求的地址
    data:formData,
    success:function(){//成功的回调函数
      // console.log(result)
      location.href = '/admin/login.html'
    }
  })
  return false;
})
