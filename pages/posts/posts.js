var postsData = require('../../data/posts-data.js')
const { api } = require("../../utils/config.js")
const app = getApp()
Page({
  data: {

  },
  onShow: function () {
    // let that = this
    // let userInfo = wx.getStorageSync('userInfo')
    // if (!userInfo) {
    //   wx.navigateTo({
    //     url: "/pages/authorize/index"
    //   })
    // } else {
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // }
  },
  onLoad: function () {
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '注意',
            showCancel: false,
            confirmText: '授权',
            content: '为了您更好的体验,请先同意授权',
            success: function (res) {
              wx.navigateTo({
                url: '../index/right'
              });
            }
          })
        } else {
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo)
              app.globalData.userInfo = res.userInfo;
            }
          })
        }
      }
    })

    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var scope = this;
        // 登录
        wx.login({
          success: res => {
            console.log(res)
            network.GET({
              url: api.loginsession + "?appid=wx64f9bce9ce86f639&secret=978be1a69a8ac5cdc1355bc8fee86ddd&js_code=" + res.code + "&grant_type=authorization_code",
              success: res2 => {
                network.GET({
                  url: api.login + res2.openid,
                  success: response => {
                    if (response.success) {
                      if (response.content)
                        app.globalData.user = response.content;
                      else {
                        var infoRes = app.globalData;
                        var info = infoRes.userInfo
                        network.POST({
                          url: api.register,
                          data: {
                            username: res2.openid,
                            nickname: infoRes.userInfo.nickName,
                            gender: infoRes.userInfo.gender,
                            avatar: infoRes.userInfo.avatarUrl
                          },
                          success: registerResponse => {
                            if (registerResponse.success == true) {
                              app.globalData.user = registerResponse.content;
                            } else {
                              wx.showToast({
                                title: '注册失败',
                                icon: 'none',
                                duration: 5000
                              })
                            }
                          }
                        })
                      }
                    } else {
                      wx.showToast({
                        title: '登录失败',
                        icon: 'none',
                        duration: 5000
                      })
                    }
                  }
                })
              }
            })
          }
        })
      }
    })  
    


    
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