$('#logout').on('click',function(){
      var isConfirm = confirm('您真的要退出吗？')
      if(isConfirm){
        // alert('用户点击了确定按钮')
        $.ajax({
          type:'post',//get或post
          url:'/logout',//请求的地址
          success:function(result){//成功的回调函数
           location.href = 'login.html'
          },
          error:function(){
            alert('退出失败')
          }
        })
      }
    })
    
    $.ajax({
      type:'get',//get或post
      url:'/users' + userId,//请求的地址
      success:function(result){//成功的回调函数
        // console.log(result)
        console.log(userID);
        // $('.profile' .avatar).attr('src'.result.avatar);
        // $('.profile' .name).html(result.nickName);
        
      }
    })