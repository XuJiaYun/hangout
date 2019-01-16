// pages/me/mydata/mydata.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenumber:456,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.user)
    if(app.globalData.user.phonenumber!=-1){
      this.setData({
        phonenumber:app.globalData.user.phonenumber
      })
    }else{
      this.setData({
        phonenumber:"未设置"
      })
    }
    this.setData({
      nickname:app.globalData.user.nickname,
      gender:app.globalData.user.gender,
    
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})