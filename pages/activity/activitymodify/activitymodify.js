// pages/release/release.js
const app = getApp()
const network = require("../../../utils/network.js")
const { api } = require("../../../utils/config.js")
const timeApi = require('../../../utils/util.js');

Page({

  data: {
    travelId: "",
    openId: "",
    startTime: "",
    theStartTime: "",
    endTime: "",
    theEndTime: "",
    title: "",
    place: "",
    type: "",
    cost: "",
    maxNumber: "",
    description: ""
  },
  onLoad: function (option) {
    var activity = JSON.parse(option.current)
    this.setData({
      openId: app.globalData.user.openid,
      travelId: activity.travelId,
      openId: activity.openId,
      startTime: timeApi.formatDate(new Date(activity.startTime)),
      theStartTime: timeApi.formatTime(new Date(activity.startTime)),
      endTime: timeApi.formatDate(new Date(activity.endTime)),
      theEndTime: timeApi.formatTime(new Date(activity.endTime)),
      title: activity.title,
      place: activity.place,
      type: activity.type,
      cost: activity.cost,
      maxNumber: activity.maxNumber,
      description: activity.description
    })
  },
  setStartTime: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  setTheStartTime: function (e) {
    this.setData({
      theStartTime: e.detail.value
    })
  },
  setEndTime: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  setTheEndTime: function (e) {
    this.setData({
      theEndTime: e.detail.value
    })
  },
  bindInputTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  bindInputPlace: function (e) {
    this.setData({
      place: e.detail.value
    })
  },
  bindInputKind: function (e) {
    this.setData({
      type: e.detail.detail.value
    })
  },
  bindInputCost: function (e) {
    this.setData({
      cost: e.detail.value
    })
  },
  bindInputMaxNumber:function(e){
    this.setData({
      maxNumber: e.detail.value
    })
  },
  bindInputDescription: function (e) {
    this.setData({
      description: e.detail.value
    })
  },
  handleSubmit: function () {
    if (!app.globalData.user.phoneNumber) {
      wx.showToast({
        title: '完善信息后才能修改哦',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    console.log(this.data)
    network.POST({
      url: api.server + "/activity/update",
      data: {
        travelId:this.data.travelId,
        title: this.data.title,
        place: this.data.place,
        type: this.data.type,
        description: this.data.description,
        cost: this.data.cost,
        maxNumber: this.data.maxNumber,
        startTime: this.data.startTime + " " + this.data.theStartTime + ":00",
        endTime: this.data.endTime + " " + this.data.theEndTime + ":00",
        openId: this.data.openId
      },
      success: res => {
        if (res.success) {
          wx.navigateBack({
            delta: 2
          });
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          });

        } else {
          wx.showToast({
            title: '修改失败',
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  }
})
