// pages/release/release.js
const app = getApp()
const network = require("../../utils/network.js")
const { api } = require("../../utils/config.js")
const timeApi = require('../../utils/util.js');

Page({

  data: {
    startTime: "",
    endTime: '',
    title: "",
    place: "",
    type:"",
    description:"",
    cost:"",
    maxNumber:""
  },
  onLoad: function () {
    var now = timeApi.formatDate(new Date());
    var time = timeApi.formatTime(new Date());
    this.setData({
      startTime: now,
      endTime: now,
      theStartTime:time,
      theEndTime:time,
      openId: app.globalData.user.openId
    })
  },
  setStartTime: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  setTheStartTime: function(e){
    this.setData({
      theStartTime:e.detail.value
    })
  },
  setEndTime: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  setTheEndTime: function(e){
    this.setData({
      theEndTime:e.detail.value
    })
  },
  bindInputTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  bindInputMaxNumber: function (e) {
    this.setData({
      maxNumber: e.detail.value
    })
  },
  bindInputPlace: function (e) {
    this.setData({
      place: e.detail.value
    })
  },
  bindInputType: function (e) {
    this.setData({
      type: e.detail.value
    })
  },
  bindInputCost: function (e) {
    this.setData({
      cost: e.detail.value
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
        title: '完善信息后才能发布任务哦',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    
    
    network.POST({
      url: api.server+"/activity/insert",
      data: {
        title:this.data.title,
        place:this.data.place,
        type:this.data.type,
        description:this.data.description,
        cost:this.data.cost,
        maxNumber:this.data.maxNumber,
        startTime: this.data.startTime + " " + this.data.theStartTime + ":00",
        endTime: this.data.endTime + " " + this.data.theEndTime + ":00",
        openId:this.data.openId
      },
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
