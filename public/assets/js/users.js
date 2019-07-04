$('#userForm').on('submit',function(){
  //收集表单数据，表格里的name值是对应数据库里的名字
  var formData = $(this).serialize();
  // console.log(formData)
  //向服务器端发送添加用户的请求
  $.ajax({
    type:'post',//get或post
    url:'/users',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      location.reload();
    },
    error:function(){
      alert('用户添加失败');
    }
  })
  //阻止表单的默认提交行为
    return false
})
//头像上传，一定要委托给一个一直存在的元素
$('#formBox').on('change','#avatar',function(){
  // console.log(this.files[0]);
  var formData = new FormData();
  formData.append('avatar',this.files[0]);
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    processData:false,
    contentType:false,
    success:function(result){//成功的回调函数
      // console.log(result)
      $('#preview').attr('src',result[0].avatar);
      $('#hiddenAvatar').val(result[0].avatar)
    }
  })
});
//显示用户的列表
$.ajax({
  type:'get',//get或post
  url:'/users',//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    var html = template('userTpl',{data:result});
    $('#usersBox').html(html)
  }
})
$('#usersBox').on('click','.edit',function(){
    //获取被点击用户的id值
    var id = $(this).attr('data-id')
    // alert(id);
    $.ajax({
      type:'get',//get或post
      url:'/users/' + id,//请求的地址
      success:function(result){//成功的回调函数
        var html = template('modifyFormTpl',result);
        $('#formBox').html(html);
      }
    })
})
$('#formBox').on('submit','#userForm',function() {
  var formData = $(this).serialize();
  var id = $(this).attr('data-id')
  // console.log(id);
  // console.log(formData)
  $.ajax({
    type:'put',//get或post
    url:'/users/' + id,//请求的地址
    data:formData,
    success:function(result){//成功的回调函数
      location.reload()
    }
  })
  return false;
})
//删除功能
$('#usersBox').on('click','.delete',function(){
  if(confirm('您真的要删除用户吗？')){
    var id = $(this).attr('data-id');
  // alert(id) 
  $.ajax({
    type:'delete',//get或post
    url:'/users/' + id,//请求的地址
    success:function(){//成功的回调函数
      location.reload()
    }
  })
  }
})
$('#selectAll').on('change',function(){
  // console.log($(this).prop('checked'));
  var bool = $ (this).prop('checked');
  $('#usersBox').find('.status').prop('checked',bool);
  if(bool = true){
    $('#deleteMany').show();
  }else{
    $('#deleteMany').hide();
  }
})


//当tbody中的input全部选中的时候，我们就让全选也是选中的状态
$('#usersBox').on('change','.status',function(){
  if($('#usersBox').find('.status').length == $('#usersBox').find('.status').filter(':checked').length){
    $('#selectAll').prop('checked',true)
  }else{
    $('#selectAll').prop('checked',false)
  }
  if($('#usersBox').find('.status').filter(':checked').length >= 2){
    $('#deleteMany').show();
  }else{
    $('#deleteMany').hide();
  }
})
//找到所有选中的input
$('#deleteMany').on('click',function(){
  if(confirm('确定要删除吗？')){
    var selectAll = $('#usersBox').find('.status').filter(':checked');
    var arr = [];
    selectAll.each(function(index,element){
    console.log($(element).attr('data-id'));
    arr.push($(element).attr('data-id'));
  })
  $.ajax({
    type:'delete',//get或post
    url:'/users/' + arr.join('-'),//请求的地址
    success:function(result){//成功的回调函数
      location.reload();
    }
  })
  }
})