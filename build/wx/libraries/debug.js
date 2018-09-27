var last = {
  update: 0,
  x: 0,
  y: 0,
  z: 0
};

function shake(callback) {
  wx.onAccelerometerChange(function (res) {
    var curTime = new Date().getTime();
    var SHAKE_THRESHOLD = 60;
    var diffTime = curTime - last.update;
    if (diffTime > 100) {
      var speed = Math.abs(res.x + res.y + res.z - last.x - last.y - last.z) / diffTime * 10000;
      // console.log(speed);
      if (speed > SHAKE_THRESHOLD && !global.__isDebuging) {
        global.__isDebuging = true;
        callback && callback();
      }
      last.update = curTime;
      last.x = res.x;
      last.y = res.y;
      last.z = res.z;
    }
  });
}

(function loadStorageEnv() {
  var storageEnvCfg = wx.getStorageSync('debugEnvCfg');
  var envAllCfg = global.__envAllCfg;
  var diffTime = Date.now() - storageEnvCfg.timestamp;
  if (diffTime < 1000 * 60 * 60 * 12) {
    global.__envType = storageEnvCfg.app;
    Object.assign(global.__env, envAllCfg.app[storageEnvCfg.app] || {});
    Object.keys(storageEnvCfg.modules).forEach(function (name) {
      if (Object.keys(global.__env).indexOf(name) !== -1) {
        global.__env[name] = envAllCfg.modules[name][storageEnvCfg.modules[name]] || {};
        global.__env[name].envType = storageEnvCfg.modules[name];
      }
    });
  }
})();

if (global.wmp && global.wmp.on) {
  global.wmp.on('app.launch', function () {
    shake(function () {
      wx.navigateTo({ url: '/libraries/pages/debug/debug' });
    });
  });
  global.wmp.on('page.show', function () {
    if (!global.__startListenDebug) {
      wx.startAccelerometer({
        success: function () {
          wx.showToast({
            title: '摇一摇 Debug',
            icon: 'success',
            duration: 2000
          });
          global.__startListenDebug = true;
        }
      });
    }
  });
  global.wmp.on('page.unload', function (param) {
    if (param.name === 'libraries/pages/debug/debug') {
      global.__isDebuging = false;
    }
  });
}