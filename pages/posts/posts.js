const timeApi = require('../../utils/util.js')
const network = require("../../utils/network.js")
const {
  api
} = require("../../utils/config.js")
const app = getApp()
Page({
  data: {

  },
  onShow: function() {
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
  onLoad: function() {
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '注意',
            showCancel: false,
            confirmText: '授权',
            content: '为了您更好的体验,请先同意授权',
            success: function(res) {
              wx.navigateTo({
                url: '../authorize/index'
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
        
        network.GET({
          url: api.loginsession + "?appid=wx64f9bce9ce86f639&secret=cc5e0926376f0d3e20f8d37f68a9529d&js_code=" + res.code + "&grant_type=authorization_code",
          success: res2 => {
            network.GET({
              // url: api.login + res2.openid,
              url: api.server+"/user/" + res2.openid,
              success: response => {
                if (response.success) {
                  if (response.content)
                    app.globalData.user = response.content;
                  else{
                    var infoRes = app.globalData;
                    var info = infoRes.userInfo
                    network.POST({
                      url: api.server+"/user/insert",
                      data: {
                        openId: res2.openid,
                        nickname: infoRes.userInfo.nickName,
                        gender: infoRes.userInfo.gender,
                        province: app.globalData.userInfo.province,
                        city: app.globalData.userInfo.city
                      },
                      success: registerResponse => {
                        if (registerResponse.success == 1) {
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
    network.GET({
      url: api.server + "/activity/selectAllActivity",
      success: res => {
        if (res.success) {
          var activities = res.content;
          for(var i = 0; i < activities.length;i++){
            var countDownDays = timeApi.getBetweenTime(activities[i].startTime)
            activities[i]["countDownDays"] = countDownDays
          }
          this.setData({
            activities: activities
          })
        } else {
          wx.showToast({
            title: '查询失败',
            icon: 'none',
            duration: 5000
          })
        }

        var countDownDays = timeApi.getBetweenTime(res.content[0].startTime)
      }
    })
  },
  toRelease: function() {
    wx.navigateTo({
      url: '../release/release'
    })
  },
  toReleaseDiary: function () {
    wx.navigateTo({
      url: '../diary/releasediary/releasediary'
    })
  }
  
})