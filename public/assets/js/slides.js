$('#myfile').on('change',function(){
    var formDate = new FormData;
    formDate.append('avatar',this.files[0]);
    $.ajax({
      type:'post',//get或post
      url:'/upload',//请求的地址
      data:formDate ,
      processData:false,
      contentType:false,
      success:function(result){//成功的回调函数
        // console.log(result)
        $('#preview').attr('src',result[0].avatar).show()
        $('#hiddenImg').val(result[0].avatar)
      }
    })
})
$('#slideForm').on('submit',function(){
  console.log($(this).serialize());
  $.ajax({
    type:'post',//get或post
    url:'/slides',//请求的地址
    data:$(this).serialize(),
    success:function(result){
      location.reload()
      // console.log(result);
    }
  })
  return false;
})
$.ajax({
  type:'get',//get或post
  url:'/slides',//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    var html = template('tpl',{data:result})
    // console.log(html);
    $('#slideBox').html(html)
  }
})
$('#slideBox').on('click','.delete',function(){
  if(confirm('确定要删除吗？')){
    var id = $(this).attr('data-id')
    $.ajax({
      type:'delete',//get或post
      url:'/slides/' +id,//请求的地址
      success:function(result){//成功的回调函数
        location.reload();
    }
  })
  }
})