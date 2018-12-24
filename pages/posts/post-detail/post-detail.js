var postsData = require('../../../data/posts-data.js');
var app = getApp();
Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function(option) {
    var postId = option.postId;
    var postData = postsData.postlist[postId];
    this.setData({
      postData: postData,
      currentPostId: postId
    })
    // var postCollected = {
    //   1: "true",
    //   2: "false",
    //   ...
    // }
    var postsCollected = wx.getStorageSync("postsCollected")
    if (postsCollected) {
      var postcollected = postsCollected[postId];
      this.setData({
        collected: postcollected,

      })
    } else {
      postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("postsCollected", postsCollected)
    }

    if(app.globalData.g_isPlayingMusic&&app.globalData.g_currentMusicPostId==postId){
      this.setData({
        isPlayingMusic : true
      })
    }
    this.setMusicMonitor();
  },
  setMusicMonitor() {
    var that = this;
    //监听音乐
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    })
    wx.onBackgroundAudioPause(function() {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })
  },

  onCollectionTap: function(event) {
    var postsCollected = wx.getStorageSync("postsCollected");
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync("postsCollected", postsCollected)
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },
  onShareTap: function(event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        // res.cancle 用户是不是点击了取消
        // res.tapIndex  数组元素序号， 从0开始
      }

    })
  },

  onMusicTap: function() {
    var currentPostId = this.data.currentPostId;
    var isPlayingMusic = this.data.isPlayingMusic;
    var postData = postsData.postlist[currentPostId]
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })
      this.setData({
        isPlayingMusic: true
      })
    }

  }


})