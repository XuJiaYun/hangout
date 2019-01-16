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
    network.GET({
      url: api.listActivities,
      success: res => {
        if (res.success) {
          this.setData({
            releasedTasks: res.content.activities
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
  }

})