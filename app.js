 App({
  globalData:{
    g_isPlayingMusic:false,
    g_currentMusicPostId:null,
  },
  onLaunch: function () {
    this.globalData.user = null;
    // 获取用户信息
  },
})
 