// pages/release/release.js
const app = getApp()
const network = require("../../utils/network.js")
const { api } = require("../../utils/config.js")
const timeApi = require('../../utils/util.js');

Page({

  data: {
    starttime: "",
    endtime: '',
    travelname: "",
    city: "",
    kind:"",
    description:"",
    cost:""
  },
  onLoad: function () {
    var now = timeApi.formatDate(new Date());
    var time = timeApi.formatTime(new Date());
    this.setData({
      starttime: now,
      endtime: now,
      openid: app.globalData.user.openid
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
        title: '完善信息后才能发布任务哦',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    
    network.GET({
      url: api.server+"ActivitiesServlet?method=ReleaseInfo",
      data: this.data,
      success: res => {
        if (res.success) {
          wx.navigateBack({
            delta: 1
          });
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
          });
          
        } else {
          wx.showToast({
            title: '发布失败',
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  }
})
