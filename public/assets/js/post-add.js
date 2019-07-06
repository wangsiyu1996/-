 //分页显示
 $.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType:'json',
  success:function(result){//成功的回调函数
    // console.log(result)
    var html = template('categoryTpl',{data:result});
    $('#category').html(html);
  }
})
$('#formBox').on('change','#feature',function(){
  // console.dir(this);
  var formData = new FormData()
  formData.append('avatar',this.files[0]);
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    contentType:false,
    processData:false,
    data:formData,
    success:function(result){//成功的回调函数
      // console.log(result)
      $('.thumbnail').attr('src',result[0].avatar).show()
      $('#hiddenAvatar').val(result[0].avatar)
    }
  })
  
})
//文章上传
$('#addForm').on('submit',function(){
  $.ajax({
    type:'post',//get或post
    url:'/posts',//请求的地址
    data:$(this).serialize(),
    success:function(result){//成功的回调函数
      location.href = 'posts.html'
    }
  })
  return false;
})
// console.log(getUrlParams('age'));

function getUrlParams(name) {
  var ParamsAry = location.search.substr(1).split('&');
  for(var i=0;i<ParamsAry.length;i++){
    var tmp = ParamsAry[i].split('=');
    if(tmp[0] == name){
      return tmp[1];
    }
  }
  return -1;
}

var id = getUrlParams('id');
if(id !== -1){
    $.ajax({
      type:'get',//get或post
      url:'/posts/'+id,//请求的地址
      success:function(result){//成功的回调函数
        // console.log(result)
        $.ajax({
          type:'get',//get或post
          url:'/categories',//请求的地址
          data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
          dataType:'json',
          success:function(response){//成功的回调函数
            // console.log(result)
            result.categories = response;
            var html = template('modifyTpl',result)
            $('#formBox').html(html);
          }
        })
      }
    })
}
//通过实践委托方式给修修改表单添加表单提交事件
$('#formBox').on('submit','#modifyForm',function(){
  var id=$(this).attr('data-id')
  // console.log(id);
  $.ajax({
    type:'put',//get或post
    url:'/posts/'+id,//请求的地址
    data:$(this).serialize(),
    success:function(result){//成功的回调函数
      location.href = 'posts.html'
    }
  })
  return false;
})