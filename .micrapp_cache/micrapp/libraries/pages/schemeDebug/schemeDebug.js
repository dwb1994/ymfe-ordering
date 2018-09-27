/**
* @Author: 韩玉 <a1>
* @Date:   2017-07-31T10:44:38+08:00
* @Filename: schemeDebug.js
* @Last modified by:   a1
* @Last modified time: 2017-08-01T15:47:12+08:00
*/

var App = getApp();
var HistorySchemesKey = 'historySchemes';

Page({
  data: {
    pagePath: '',
    historySchemes: [],
    isEmptyHistorySchemes: true,
    screenWidth: App.globalData.deviceInfo.screenWidth
  },
  onLoad: function () {
    this.getHistorySchemes();
  },

  getHistorySchemes: function () {
    var historySchemes = wx.getStorageSync(HistorySchemesKey);
    if (historySchemes) {
      this.setData({
        historySchemes: historySchemes,
        pagePath: historySchemes[0],
        isEmptyHistorySchemes: historySchemes.length == 0
      });
    }
  },

  saveHistorySchemes: function (urlPath) {
    if (this.data.historySchemes && this.data.historySchemes.length > 0) {
      var index = this.data.historySchemes.indexOf(urlPath);
      if (index != -1) {
        this.data.historySchemes.splice(index, 1);
      }
      if (this.data.historySchemes.length > 4) {
        this.data.historySchemes.splice(this.data.historySchemes.length - 1, 1);
      }
    }
    this.data.historySchemes.unshift(urlPath);
    this.setData({
      historySchemes: this.data.historySchemes,
      isEmptyHistorySchemes: this.data.historySchemes.length == 0
    });
    wx.setStorage({
      key: HistorySchemesKey,
      data: this.data.historySchemes
    });
  },

  bindPathInput: function (e) {
    this.data.pagePath = e.detail.value;
    this.setData({ pagePath: this.data.pagePath });
  },

  jumpSchemeDebug: function () {
    if (this.data.pagePath && this.data.pagePath.length > 0) {
      //防止页面个数超过5个
      if (wx.reLaunch) {
        var that = this;
        setTimeout(function () {
          wx.reLaunch({
            url: '/home/pages/index',
            success: function () {
              setTimeout(function () {
                wx.navigateTo({
                  url: that.data.pagePath
                });
              }, 300);
            }
          });
        }, 1000);
      } else {
        wx.redirectTo({ url: this.data.pagePath });
      }
      this.saveQueryString(this.data.pagePath);
      this.saveHistorySchemes(this.data.pagePath);
    } else {
      wx.showModal({
        content: 'url不能为空',
        showCancel: false
      });
    }
  },

  //同步App.globalData.appShowOptions
  saveQueryString: function (url) {
    var obj = {};
    var index = url.indexOf('?') + 1;
    var path = url.substr(1, index - 2);
    var str = url.substr(index);
    var arr = str.split('&');
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=');
      obj[arr2[0]] = arr2[1];
    }
    App.globalData.appShowOptions = {
      path: path,
      query: obj
    };
  },

  historyClick: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      pagePath: this.data.historySchemes[index]
    });
  },

  clearHistoryClick: function () {
    var that = this;
    wx.removeStorage({
      key: HistorySchemesKey,
      success: function () {
        that.setData({
          historySchemes: [],
          isEmptyHistorySchemes: true
        });
      }
    });

  }
});
