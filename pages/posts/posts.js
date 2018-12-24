var postsData = require('../../data/posts-data.js')
Page({
  data: {

  },
  onLoad: function () {
    
    this.setData({
      posts_key: postsData.postlist
    })
  },
  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?postId="+postId
    })
  }
})