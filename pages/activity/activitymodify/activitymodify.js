// pages/release/release.js
const app = getApp()
const network = require("../../../utils/network.js")
const { api } = require("../../../utils/config.js")
const timeApi = require('../../../utils/util.js');

Page({

  data: {
    starttime: "",
    endtime: '',
    travelname: "",
    city: "",
    kind: "",
    description: "",
    cost: ""
  },
  onLoad: function (option) {
    var activity = JSON.parse(option.current)
    this.setData({
      openid: app.globalData.user.openid,
      travelid: activity.travelid,
      starttime: activity.starttime,
      endtime: activity.endtime,
      travelname: activity.travelname,
      city: activity.city,
      kind: activity.kind,
      description: activity.description,
      cost: activity.cost,
      authorid: activity.openid
      
    })
  },
  setStartTime: function (e) {
    this.setData({
      starttime: e.detail.value
    })
  },
  setEndTime: function (e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  bindInputTravelName: function (e) {
    this.setData({
      travelname: e.detail.detail.value
    })
  },
  bindInputCity: function (e) {
    this.setData({
      city: e.detail.detail.value
    })
  },
  bindInputKind: function (e) {
    this.setData({
      kind: e.detail.detail.value
    })
  },
  bindInputCost: function (e) {
    this.setData({
      cost: e.detail.detail.value
    })
  },
  bindInputDescription: function (e) {
    this.setData({
      description: e.detail.detail.value
    })
  },
  handleSubmit: function () {
    if (!app.globalData.user.phonenumber) {
      wx.showToast({
        title: '完善信息后才能修改任务哦',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    network.GET({
      url: api.server + "ActivitiesServlet?method=ModifyInfo",
      data: this.data,
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
