// pages/diary/diarydetail/diarydetail.js
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
    this.setData({
      diaryId:options.diaryId
    })
    network.GET({
      url:api.server+'/diary/view/'+options.diaryId
    })

    network.GET({
      url:api.server+'/diary/'+options.diaryId,
      success:res=>{
        if(res.success){
          this.setData({
            diary:res.content,
            url:api.server+'/img/'+res.content.pictureName
          })
          network.GET({
            url: api.server + '/user/' + res.content.openId,
            success:res2=>{
              this.setData({
                authorName: res2.content.nickname
              })
            }
          })
        } else {
          wx.navigateBack({
            delta: 1
          });
          wx.showToast({
            title: '查询失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
      

    })
   
  }

  
})