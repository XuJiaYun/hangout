
const app = getApp()
const network = require("../../../utils/network.js")
const { api } = require("../../../utils/config.js")
const timeApi = require('../../../utils/util.js');

Page({

  data:{
    openid:"",
    authorid:"",
    travelid:"",
    starttime: "",
    endtime: '',
    travelname: "",
    city: "",
    kind: "",
    description: "",
    cost: "",
    totalnumber:"",
    condition:"0"
  },
  onLoad:function(option){
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
      authorid:activity.openid,
      totalnumber: activity.totalnumber
    })
    
    network.GET({
      url: api.server + "ActivitiesServlet?method=ViewDetail",
      data:{
        openid: app.globalData.user.openid,
        travelid: activity.travelid
      },
      success: res => {
        if (res.success){
          this.setData({
            flag: res.content
          })
        }
      }
    })
    
    
   
    

    
  },
  handleModify:function(){
    console.log(this.data)
    wx.navigateTo({
      url: '../activitymodify/activitymodify?current=' + JSON.stringify(this.data)
    })
  },
  handleDelete:function(){
    network.GET({
      url: api.server+"ActivitiesServlet?method=CancleActivity",
      data: {
        travelid:this.data.travelid
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
  joinIn:function(){
    network.GET({
      url: api.server + "AttendListServlet?method=AttendActivity",
      data: {
        openid: this.data.openid,
        travelid: this.data.travelid
      },
      success: res => {
        if (res.success) {
          wx.showToast({
            title: '参与成功',
            icon: 'success',
            duration: 2000
          });
          this.setData({
            flag :1
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
  quit: function () {
    if(this.data.openid==this.data.authorid){
      wx.showToast({
        title: '创建者无法退出',
        icon: 'none'
      })
      return
    }
    network.GET({
      url: api.server + "AttendListServlet?method=QuitActivity",
      data: {
        openid: this.data.openid,
        travelid: this.data.travelid
      },
      success: res => {
        if (res.success) {
          wx.showToast({
            title: '退出成功',
            icon: 'success',
            duration: 2000
          });
          this.setData({
            flag: 0
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
