const app = getApp()
const network = require("../../../utils/network.js")
const {
  api
} = require("../../../utils/config.js")
const timeApi = require('../../../utils/util.js');

Page({

  data: {
    showModify: 0,
    showDelete: 0,
    showJoin: 0,
    showQuit: 0
  },
  getActivityDetail: function (travelId) {
    network.GET({
      url: api.server + "/activity/selectActivityByTravelId?travelId=" + travelId,
      success: res => {
        if (res.success) {
          this.setData({
            activity: res.content
          })
          if (app.globalData.user.openId == this.data.activity.openId) {
            this.setData({
              showModify: 1,
              showDelete: 1
            })
          } else {
            network.POST({
              url: api.server + "/attendList/isExist",
              data: {
                travelId: travelId,
                openId: app.globalData.user.openId
              },
              success: res2 => {
                if (res2.success) {
                  if (res2.content == 1) {
                    this.setData({
                      showQuit: 1
                    })
                  } else if (res2.content == 0) {
                    this.setData({
                      showJoin: 1
                    })
                  }
                }
              }
            })
          }
        }
      }
    })
  },
  onLoad: function(option) {
    var travelId = option.travelId;
    this.getActivityDetail(travelId);
  },
  
  handleModify: function() {
    wx.navigateTo({
      url: '../activitymodify/activitymodify?current=' + JSON.stringify(this.data.activity)
    })
  },
  showMember: function(){
    wx.navigateTo({
      url: '../activitymember/activitymember?travelId='+ this.data.activity.travelId
    })
  },
  showNotice:function(){
    wx.navigateTo({
      url: '../activitynotice/activitynotice?travelId='+this.data.activity.travelId
    })
  },
  handleDelete: function() {
    network.GET({
      url: api.server + "/activity/delete",
      data: {
        travelId: this.data.activity.travelId
      },
      success: res => {
        if (res.success) {
          wx.navigateBack({
            delta: 1
          });
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          });

        } else {
          wx.showToast({
            title: '删除失败',
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  },
  handleJoin: function() {
    network.POST({
      url: api.server + "/attendList/insert",
      data: {
        openId: app.globalData.user.openId,
        travelId: this.data.activity.travelId
      },
      success: res => {
        if (res.success) {
          wx.showToast({
            title: '参与成功',
            icon: 'success',
            duration: 2000
          });

          this.setData({
            showQuit: 1,
            showJoin:0
          })


        } else {
          wx.showToast({
            title: '参与失败',
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  },
  handleQuit: function() {

    network.POST({
      url: api.server + "/attendList/delete",
      data: {
        openId: app.globalData.user.openId,
        travelId: this.data.activity.travelId
      },
      success: res => {
        if (res.success) {
          wx.showToast({
            title: '退出成功',
            icon: 'success',
            duration: 2000
          });
          this.setData({
            showJoin:1,
            showQuit:0
          })

        } else {
          wx.showToast({
            title: '退出失败',
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  }



})