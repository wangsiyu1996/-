//获取文章的数量
$.ajax({
  type:'get',//get或post
  url:'/posts/count',//请求的地址
  success:function(result){//成功的回调函数
    $('#post').html(`<strong>${result.postCount}</strong>篇文章(<strong>${result.draftCount}</strong>+篇草稿)`)
  }
})

$.ajax({
  type: 'get',
  url: '/categories/count',
  success: function(response) {
    $('#category').html(`<strong>${response.categoryCount}</strong>个分类`)
  }
})

//获取评论数量
$.ajax({
  type: 'get',
  url: '/comments/count',
  success: function(response) {
    // console.log(response)
    $('#comment').html(`<strong>${response.commentCount}</strong>条评论`);
  }
})