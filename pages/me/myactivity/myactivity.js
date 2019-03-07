const network = require("../../../utils/network.js")
const { api } = require("../../../utils/config.js")
const timeApi = require('../../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activities: []
  },

  onLoad: function (options) {
    this.setData({
      openId:app.globalData.user.openId
    })
    network.GET({
      url: api.server + "/activity/selectJoinedActivity",
      data:{
        openId:this.data.openId
      },
      success: res => {
        if (res.success) {
          var activities = res.content;
          for (var i = 0; i < activities.length; i++) {
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
      }
    })
  },
  onTap: function (e) {
    wx.navigateTo({
      url: '../../activity/activitydetail/activitydetail?travelId=' + e.currentTarget.dataset.activity.travelId
    })
  },

})