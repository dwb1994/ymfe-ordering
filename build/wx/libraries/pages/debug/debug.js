/**
* @Author: 韩玉 <a1>
* @Date:   2017-07-28T16:42:07+08:00
* @Filename: debug.js
* @Last modified by:   a1
* @Last modified time: 2017-07-31T19:59:49+08:00
*/

Page({
  data: {
    isEdit: false,
    envInfo: '',
    envCfg: {},
    libs: []
  },
  onLoad: function () {
    var envCfg = this.getEnvCfg();
    const hasTrain = this.getHasTrain();
    this.setData({
      envCfg: envCfg,
      libs: Object.keys(envCfg.modules),
      envInfo: this.getEnvInfo(),
      hasTrain
    });
  },
  getHasTrain: function () {
    const libs = global.__lib;
    if (!!libs && libs.length > 0) {
      for (let i = 0; i < libs.length; i++) {
        if (libs[i].name === 'train') {
          return true;
        }
      }
    }
    return false;
  },
  getEnvCfg: function () {
    var envCfg = { modules: {} };
    envCfg.app = global.__envType;
    Object.keys(global.__envAllCfg.modules).forEach(function (name) {
      envCfg.modules[name] = global.__env[name].envType;
    });
    return envCfg;
  },
  getEnvInfo: function () {
    var str = `global.__envType = "${global.__envType}"\n`;
    str += `global.__env = ${JSON.stringify(global.__env, {}, 2)}`;
    return str;
  },
  setEnvToStorage: function () {
    wx.setStorage({
      key: 'debugEnvCfg',
      data: Object.assign({}, this.data.envCfg, { timestamp: Date.now() })
    });
  },
  toggleEditEnv: function () {
    if (!this.data.isEdit) {
      var envCfg = this.getEnvCfg();
      this.setData({ envCfg: envCfg });
    }
    this.setData({ isEdit: !this.data.isEdit });
  },
  saveEnv: function () {
    var envCfg = this.data.envCfg;
    global.__envType = envCfg.app || (envCfg.app = 'prod');
    global.__env = global.__envAllCfg.app[global.__envType] || {};
    this.data.libs.forEach(function (name) {
      var value = envCfg.modules[name] || (envCfg.modules[name] = 'prod');
      global.__env[name] = global.__envAllCfg.modules[name][value] || {};
      global.__env[name].envType = value;
    });
    this.setData({
      envCfg: envCfg,
      envInfo: this.getEnvInfo()
    });
    this.setEnvToStorage();
    this.toggleEditEnv();
  },
  bindEnvChange: function (e) {
    var name = e.target.dataset.name;
    var value = e.detail.value;
    var envCfg = this.data.envCfg;
    if (name === 'app') {
      var oldValue = envCfg.app;
      envCfg.app = value;
      Object.keys(envCfg.modules).forEach(name => {
        if (envCfg.modules[name] === oldValue) {
          envCfg.modules[name] = value;
        }
      });
    } else {
      envCfg.modules[name] = value;
    }
    this.setData({
      envCfg: envCfg
    });
  },
  jumpSchemeDebug: function () {
    wx.redirectTo({ url: '/libraries/pages/schemeDebug/schemeDebug' });
  },
  jumpTrainDebug: function () {
    wx.navigateTo({ url: '/train/debug/debugHome/debugHome' });
  }

});