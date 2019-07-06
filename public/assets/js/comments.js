$.ajax({
  type:'get',//get或post
  url:'/comments',//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    var html = template('commentsTpl',result)
    // console.log(html);
    $('#commentsBox').html(html)
  }
})

$('#commentsBox').on('click','.status',function(){
  var id = $(this).attr('data-id')
  var state = $(this).attr('data-state')
  $.ajax({
    type:'put',//get或post
    url:'/comments/'+id,//请求的地址
    data:{
      state:state == 1 ? 0:1,
    },
    success:function(result){//成功的回调函数
      location.reload()
    }
  })
  return false;
})