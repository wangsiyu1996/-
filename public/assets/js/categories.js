//添加分类
$('#addCategory').on('submit',function(){
  // console.log($(this).serialize());
  $.ajax({
    type:'post',//get或post
    url:'/categories',//请求的地址
    data:$(this).serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      // console.log(result)
      location.reload();
    }
  })
  return false
})
//展示分类列表数据
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  success:function(result){//成功的回调函数
    var html = template('categoryListTpl',{data:result})
    // console.log(result)
    $('#categoriesBox').html(html)
  }
})
//当点击编辑按钮的时候，我们就让当前这一行的内容展示在左侧的表单上面
$('#categoriesBox').on('click','.edit',function(){
  // console.log(111)
  var id = $ (this).attr('data-id');
  // console.log(id);
  $.ajax({
    type:'get',//get或post
    url:'/categories/'+ id,//请求的地址
    success:function(result){//成功的回调函数
      // console.log(result)
      var html = template('modifyFormTpl',result);
      $('#formBox').html(html);
    }
  })
})
//当我们提交修改表单的时候，提交ajax
$('#formBox').on('submit','#modifyCategory',function(){
  // console.log($(this).serialize());
  var id = $(this).attr('data-id')
$.ajax({
  type:'put',//get或post
  url:'/categories/'+id,//请求的地址
  data:$(this).serialize(),
  success:function(result){//成功的回调函数
    console.log(result)
    location.reload();
  }
})
  return false
})

//删除功能
$('#categoriesBox').on('click','.delete',function(){
  if(confirm('确定要删除吗')){
    var id = $(this).attr('data-id');
    $.ajax({
      type:'delete',//get或post
      url:'/categories/'+id,//请求的地址
      success:function(result){//成功的回调函数
        console.log(result)
        location.reload()
      }
    })
  }

})