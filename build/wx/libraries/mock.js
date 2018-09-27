'use strit';

const mockConfig = require('./mock/mock.js');

function getLocation(href) {
  var match = href.match(/^(https?\\:)\/\/(([^:\\/?#]*)(?:\\:([0-9]+))?)([\\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
  return match && {
    href: href,
    protocol: match[1],
    host: match[2],
    hostname: match[3],
    port: match[4],
    pathname: match[5],
    search: match[6],
    hash: match[7]
  };
}

module.exports = originReq => {
  return obj => {
    const location = getLocation(obj.url);
    const host = location.host;
    const pathname = location.pathname;
    const mockData = mockConfig[host] && mockConfig[host][pathname] || mockConfig[pathname];

    if (mockData) {
      obj.header = obj.header || {};
      obj.header['origin-host'] = host;
      // 替换 url host -> 127.0.1:__mockPort
      // 请求本地 mockServer 服务
      obj.url = obj.url.replace(/^https:\/\/(([^:\\/?#]*)(?:\\:([0-9]+))?)/, `http://127.0.0.1:${global.__mockPort}`);
    }
    originReq(obj);
  };
};