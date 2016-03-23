if (typeof Object.assign !== 'function') {
  Object.assign = function(org, ...dst) {
    dst.forEach(d => {
      for(var k in d) {
        org[k] = d[k];
      }
    });
  }
}


let _tc = function(type, obj) {
  return typeof obj === type;
};

let isObject = _tc.bind(this, 'object');
let isFunction = _tc.bind(this, 'function');

function addHiddenProperty(obj, name, val) {
  Object.defineProperty(obj, name, {
    writable: false,
    enumerable: false,
    value: val
  });
}

function getToken() {
  for (var t = document.cookie.split(/;\s/g), n = 0, a = t.length; a > n; n++) {
    var r = t[n].match(/([^=]+)=/i);
    if (r && "ctoken" === r[1])return t[n].substring(r[1].length + 1)
  }
  return '';
}

function appendUrl(url, data) {
  return url + (url.indexOf('?') >= 0 ? '&' : '?') + data;
}

function handleCToken(options) {
  options.url = appendUrl(options.url, '__input_charset=utf-8&ctoken=' + encodeURIComponent(getToken()));
}

function handleQuery(options) {
  if (typeof options.query !== 'object') {
    return;
  }
  var arr = [];
  for(let k in options.query) {
    arr.push(encodeURIComponent(k) + '=' + encodeURIComponent(options.query[k]));
  }
  options.url = appendUrl(options.url, arr.join('&'));
}

function handleResult(res) {
  // 这儿可以根据不同系统的情况进行统一处理.
  if (!res.success) {
    return {
      error: {
        message: res.result
      }
    }
  } else {
    return {
      data: Array.isArray(res.result) ? {
        list: res.result
      } : res.result
    }
  }
}

export {
  addHiddenProperty,
  isObject,
  isFunction,
  handleCToken,
  handleResult,
  handleQuery
}