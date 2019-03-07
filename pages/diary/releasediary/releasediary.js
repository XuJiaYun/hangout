const network = require("../../../utils/network.js")
const { api } = require("../../../utils/config.js")
const timeApi = require('../../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    content:"",
    pictureName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  bindInputTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  bindInputContent: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  chooseImage: function(e){
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: api.server+"/file/upload", 
          filePath: tempFilePaths[0],
          name: 'file',
          success: res2 =>{
            res2 = JSON.parse(res2.data)
            if(res2.success){
              wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 5000
              })
              this.setData({
                
                pictureName: res2.content
              })
            }else{
              console.log(res2)
              wx.showToast({
                title: '添加失败',
                icon: 'none',
                duration: 5000
              })
            }
          }
        })
      }
    })
  }
})