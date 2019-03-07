// pages/activity/activitynotice/activitynotice.js
const network = require("../../../utils/network.js")
const { api } = require("../../../utils/config.js")
const timeApi = require('../../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var travelId = option.travelId;
    this.setData({
      openId : app.globalData.user.openId,
      travelId : travelId

    })

    
    network.GET({
      url:api.server+"/notice/"+travelId,
      success: res => {
        if(res.success){
          this.setData({
            noticeList:res.content
          })
        }else{
          wx.showToast({
            title: '查询失败',
            icon: 'none',
            duration: 5000
          })
        }
      }

    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    network.GET({
      url: api.server + "/notice/" + this.data.travelId,
      success: res => {
        if (res.success) {
          this.setData({
            noticeList: res.content
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
  bindInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  handleSubmit:function (e){
    network.POST({
      url:api.server+"/notice/insert",
      data:{
        openId:this.data.openId,
        travelId:this.data.travelId,
        content:this.data.content
      },
      success: res => {
        if (res.success) {
          network.GET({
            url: api.server + "/notice/" + this.data.travelId,
            success: res => {
              if (res.success) {
                this.setData({
                  noticeList: res.content
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
  handleDelete:function(e){
    var that = this
    if (e.currentTarget.dataset.notice.openId==this.data.openId){
      wx.showModal({
        title: '',
        content: '是否删除该条消息',
        showCancel: true,
        success: function(res) {
          network.GET({
            url: api.server + "/notice/delete/" + e.currentTarget.dataset.notice.noticeId,
            success: res=>{
              if(res.success){
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                });
                network.GET({
                  url: api.server + "/notice/" + that.data.travelId,
                  success: res => {
                    if (res.success) {
                      that.setData({
                        noticeList: res.content
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
              }else{
                wx.showToast({
                  title: '删除失败',
                  icon: 'success',
                  duration: 2000
                });
              }
            }
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }else{
      return
    }
  }
 
})