const network = require("../../utils/network.js")
const { api } = require("../../utils/config.js")
const timeApi = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContent:"南京栖霞山",
    activities:[]
  },

  onLoad: function (options) {
    network.GET({
      url: api.server+"ActivitiesServlet?method=ViewAll",
      success: res => {
        if (res.success) {
          console.log(res)
          this.setData({
            activities: res.content
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
  onTap:function(e){
    wx.navigateTo({
      url: 'activitydetail/activitydetail?current='+JSON.stringify(e.currentTarget.dataset.activity)
    })
  },
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading();

    network.GET({
      url: api.server+"ActivitiesServlet?method=ViewAll",
      success: res => {
        if (res.success) {
          
          this.setData({
            activities: res.content
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
    wx.hideNavigationBarLoading();
  },
  listenerSearchInput: function (e) {
    this.setData({
      searchInput: e.detail.value
    })

  },
  toSearch: function () {
    network.GET({
      url: api.server + "ActivitiesServlet?method=ViewBlank",
      data:{
        searchString: this.data.searchInput
      },
      success: res => {
        if (res.success) {
          this.setData({
            activities: res.content
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