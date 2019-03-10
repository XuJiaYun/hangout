// pages/me/mydiary/mydiary.js
const network = require("../../../utils/network.js")
const { api } = require("../../../utils/config.js")
const timeApi = require('../../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    network.GET({
      url: api.server + "/diary/selectDiaryByOpenId/" + app.globalData.user.openId,
      success: res => {
        if (res.success) {
          this.setData({
            diaryList: res.content
          })
        } else {
          wx.showToast({
            title: '查询失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  onTap:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../../diary/diarydetail/diarydetail?diaryId=' + e.currentTarget.dataset.diary.diaryId,
    })
  }
})